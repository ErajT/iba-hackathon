const Qexecution = require("./query");
// const constants = require('./constants');
const zlib = require('zlib');
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { HfInference } = require("@huggingface/inference");
const { Pinecone } = require('@pinecone-database/pinecone');
// const {ServerlessSpec} = require('@pinecone-database/pinecone');

const postVectorsForMaterial = async (materialId) => {
    try {
        // Retrieve material from DB
        const getMaterialSQL = `
            SELECT File, Name 
            FROM Material 
            WHERE MaterialID = ?
        `;

        const materialResult = await Qexecution.queryExecute(getMaterialSQL, [materialId]);

        // Check if material exists
        if (materialResult.length === 0) {
            throw new Error("Material not found.");
        }

        const fileBuffer = zlib.unzipSync(materialResult[0].File); // Decompressing the file
        const fileName = materialResult[0].Name;

        // Parse buffer to text
        const text = fileBuffer.toString('utf8');

        // Split text into chunks
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 10000,
            chunkOverlap: 50
        });

        const output = await textSplitter.createDocuments([text]);
        console.log("Total Chunks:", output.length);

        const hf = new HfInference("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")

        const vecArr = [];

        const pc = new Pinecone({
            apiKey:"pcsk_FmhEX_Pjh4gScmq1xnmiMEQ315sd9EtSu25sUfMwy8FLF7kfZcEmKeqkpG7HfWZ687CBy"
        })

        // Index Name Based on Material ID
        const indexName = `learnflow-${materialId}`;

        // Check if the index exists
        try {
            const indexInfo = await pc.describeIndex(indexName);
            console.log(`Index ${indexName} already exists.`);
        } catch (err) {
            console.log(`Index ${indexName} does not exist. Creating now...`);

            await pc.createIndex({
                name: indexName,       
                dimension: 384,           
                metric:"cosine",
                spec: {
                    serverless: {
                      cloud: 'aws',
                      region: 'us-east-1'
                    }
                  },
                  deletionProtection: 'disabled',
                  tags: { environment: 'development' }, 
            });
        
            console.log(`Index ${indexName} created successfully.`);
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        // Generate embeddings for each chunk
        for (let i = 0; i < output.length; i++) {
            let content = output[i].pageContent;
            let obj = {
                id: `${materialId}-${i + 1}`,
                metadata: { text: content }
            };

            console.log("Processing chunk:", i + 1);

            let value = await hf.featureExtraction({
                model: "sentence-transformers/all-MiniLM-L6-v2",
                inputs: content
            });

            obj.values = value;
            vecArr.push(obj);
        }

        const index = pc.Index(indexName);

        console.log(vecArr);

        // Upload vectors to Pinecone
        const data = await index.namespace(materialId.toString()).upsert(vecArr);

        console.log("Vectors posted successfully:", data);
        return data;
    } catch (e) {
        console.error("Error posting vectors:", e.message);
        throw new Error(e.message);
    }
};


exports.createMaterial = async (req, res) => {
    const {  CollectionID, CreatedByID } = req.body;
    // Get the file from req.file
    const TimeC = new Date();
    const File = req.file;
    console.log(File)

    if (!File) {
        return res.status(400).send({
            status: "fail",
            message: "No file uploaded."
        });
    }

    try {
        // Compress the file buffer
        const compressedFile = zlib.gzipSync(File.buffer);

        console.log("1 done")

        const createMaterialSQL = `
            INSERT INTO Material (Name, File, CollectionID, CreatedByID, TimeCreated)
            VALUES (?, ?, ?, ?, ?)
        `;

        const result = await Qexecution.queryExecute(createMaterialSQL, [File.originalname, compressedFile, CollectionID, CreatedByID, TimeC]);
        console.log("2 done")
        const newMaterialId = result.insertId;

        // Call postVectorsForMaterial directly as a function
        const vectorResult = await postVectorsForMaterial(newMaterialId);
        console.log("3 done")
        res.status(200).send({
            status: "success",
            message: "Material created and vectors posted successfully.",
            materialId: newMaterialId,
        });

    } catch (err) {
        console.error("Error creating material or posting vectors:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error creating material or posting vectors.",
            error: err.message,
        });
    }
};

exports.getMaterialsByCollectionID = async (req, res) => {
    const { collectionId } = req.params;

    const getMaterialsSQL = `
        SELECT 
            m.MaterialID, 
            m.Name, 
            m.Description, 
            m.File, 
            m.CollectionID, 
            m.CreatedByID, 
            u.Name AS CreatedByName
        FROM Material m
        JOIN User u ON m.CreatedByID = u.UserID
        WHERE m.CollectionID = ?
    `;

    try {
        const materials = await Qexecution.queryExecute(getMaterialsSQL, [collectionId]);

        // Decompress the file buffers before returning
        const decompressedMaterials = materials.map(material => {
            if (material.File) {
                material.File = zlib.gunzipSync(material.File);
            }
            return material;
        });

        res.status(200).send({
            status: "success",
            message: "Materials retrieved successfully.",
            materials: decompressedMaterials
        });
    } catch (err) {
        console.error("Error getting materials:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error getting materials.",
            error: err.message,
        });
    }
};

exports.getMaterialByMaterialID = async (req, res) => {
    const { materialId } = req.params;

    const getMaterialSQL = `
        SELECT 
            m.MaterialID, 
            m.Name, 
            m.Description, 
            m.File, 
            m.CollectionID, 
            m.CreatedByID, 
            u.Name AS CreatedByName
        FROM Material m
        JOIN User u ON m.CreatedByID = u.UserID
        WHERE m.MaterialID = ?
    `;

    try {
        const material = await Qexecution.queryExecute(getMaterialSQL, [materialId]);

        if (material.length === 0) {
            return res.status(404).send({
                status: "fail",
                message: "Material not found."
            });
        }

        // Decompress the file buffer before returning
        if (material[0].File) {
            material[0].File = zlib.gunzipSync(material[0].File);
        }

        res.status(200).send({
            status: "success",
            message: "Material retrieved successfully.",
            material: material[0]
        });
    } catch (err) {
        console.error("Error getting material:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error getting material.",
            error: err.message,
        });
    }
};

exports.deleteMaterial = async (req, res) => {
    const { materialId } = req.params;

    const deleteMaterialSQL = `
        DELETE FROM Material WHERE MaterialID = ?
    `;

    try {
        await Qexecution.queryExecute(deleteMaterialSQL, [materialId]);

        res.status(200).send({
            status: "success",
            message: "Material deleted successfully."
        });
    } catch (err) {
        console.error("Error deleting material:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error deleting material.",
            error: err.message,
        });
    }
};
