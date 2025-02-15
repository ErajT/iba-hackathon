const Qexecution = require("./query");

exports.createCollection = async (req, res) => {
    const { UserID, Name, Description, IsPublic, HasCollaborators, Topics } = req.body;
    const TimeCreated = new Date();

    // Convert Topics array to a comma-separated string
    const topicsString = Topics.join(',');

    const createCollectionSQL = `
        INSERT INTO Collection (UserID, Name, Description, IsPublic, HasCollaborators, TimeCreated, Topics)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        const result = await Qexecution.queryExecute(createCollectionSQL, [UserID, Name, Description, IsPublic, HasCollaborators, TimeCreated, topicsString]);

        res.status(200).send({
            status: "success",
            message: "Collection created successfully.",
            collectionId: result.insertId,
        });
    } catch (err) {
        console.error("Error creating collection:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error creating collection.",
            error: err.message,
        });
    }
};


// Get collection by ID
exports.getCollectionById = async (req, res) => {
    const { id } = req.params;

    const getCollectionSQL = `
        SELECT * FROM Collection WHERE CollectionID = ?
    `;

    try {
        const collection = await Qexecution.queryExecute(getCollectionSQL, [id]);

        if (collection.length === 0) {
            return res.status(404).send({
                status: "fail",
                message: "Collection not found."
            });
        }

        res.status(200).send({
            status: "success",
            message: "Collection retrieved successfully.",
            collection: collection[0],
        });
    } catch (err) {
        console.error("Error getting collection:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error getting collection.",
            error: err.message,
        });
    }
};

// Update collection
exports.updateCollection = async (req, res) => {
    const {  HasCollaborators } = req.body;

    const updateCollectionSQL = `
        UPDATE Collection 
        SET Name = ?, Description = ?, IsPublic = ?, HasCollaborators = ?
        WHERE CollectionID = ?
    `;

    try {
        const result = await Qexecution.queryExecute(updateCollectionSQL, [Name, Description, IsPublic, HasCollaborators, CollectionID]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                status: "fail",
                message: "Collection not found or no changes made."
            });
        }

        res.status(200).send({
            status: "success",
            message: "Collection updated successfully.",
        });
    } catch (err) {
        console.error("Error updating collection:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error updating collection.",
            error: err.message,
        });
    }
};

// Delete collection
exports.deleteCollection = async (req, res) => {
    const { id } = req.params;

    const deleteCollectionSQL = `
        DELETE FROM Collection WHERE CollectionID = ?
    `;

    try {
        const result = await Qexecution.queryExecute(deleteCollectionSQL, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                status: "fail",
                message: "Collection not found."
            });
        }

        res.status(200).send({
            status: "success",
            message: "Collection deleted successfully."
        });
    } catch (err) {
        console.error("Error deleting collection:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error deleting collection.",
            error: err.message,
        });
    }
};

// Get only public collections with the creator's name
exports.getPublicCollections = async (req, res) => {
    const getPublicCollectionsSQL = `
        SELECT c.CollectionID, c.Name, c.Description, c.TimeCreated, c.HasCollaborators, u.Name AS CreatorName
        FROM Collection c
        JOIN User u ON c.UserID = u.UserID
        WHERE c.IsPublic = TRUE
    `;

    try {
        const publicCollections = await Qexecution.queryExecute(getPublicCollectionsSQL);

        res.status(200).send({
            status: "success",
            message: "Public collections retrieved successfully.",
            publicCollections: publicCollections,
        });
    } catch (err) {
        console.error("Error getting public collections:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error getting public collections.",
            error: err.message,
        });
    }
};

// Get all collections for a specific user (including collaborations)
exports.getCollectionsByUser = async (req, res) => {
    const { id } = req.params;

    // Get user's own collections (Public and Private)
    const getUserCollectionsSQL = `
        SELECT CollectionID, Name, Description, TimeCreated, HasCollaborators, IsPublic
        FROM Collection
        WHERE UserID = ?
    `;

    // Get collections where the user is a collaborator
    const getCollaboratorCollectionsSQL = `
        SELECT c.CollectionID, c.Name, c.Description, c.TimeCreated, c.HasCollaborators, c.IsPublic, u.Name AS CreatorName
        FROM Collection c
        JOIN Collaborator col ON c.CollectionID = col.CollectionID
        JOIN User u ON c.UserID = u.UserID
        WHERE col.UserID = ?
    `;

    try {
        // Fetch user's own collections
        const userCollections = await Qexecution.queryExecute(getUserCollectionsSQL, [id]);
        const publicCollections = userCollections.filter(col => col.IsPublic);
        const privateCollections = userCollections.filter(col => !col.IsPublic);

        // Fetch collections where the user is a collaborator
        const collaboratorCollections = await Qexecution.queryExecute(getCollaboratorCollectionsSQL, [id]);

        res.status(200).send({
            status: "success",
            message: "Collections retrieved successfully.",
            publicCollections: publicCollections,
            privateCollections: privateCollections,
            collaboratorCollections: collaboratorCollections
        });
    } catch (err) {
        console.error("Error getting user collections:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error getting user collections.",
            error: err.message,
        });
    }
};
