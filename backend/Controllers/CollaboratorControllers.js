const Qexecution = require('./query');
const nodemailer = require("nodemailer");

const sendEmail = async (collectionID, userID, recipient, subject, emailBody) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "nashkaisar@gmail.com", // TBC with CloudID
      pass: "mvjt aoeq ioql hpeb", // Make sure to use an App Password or environment variable for security
    },
  });

  try {
    let info = await transporter.sendMail({
      from: "nashkaisar@gmail.com", // TBC with CloudID
      to: recipient,
      subject: subject,
      text: emailBody,
    });
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


exports.addCollaborators = async (req, res) => {
  try {
    const { collectionId, collaborators } = req.body; 
    // collaborators should be a comma-separated string of user IDs, e.g., "1,2,3"

    // Split the string into an array of user IDs
    const userIds = collaborators.split(',').map(id => id.trim());

    if (userIds.length === 0) {
      return res.status(400).json({ message: 'No collaborators provided' });
    }

    // Prepare the values for bulk insert
    const values = userIds.map(userId => `(${userId}, ${collectionId})`).join(',');

    const insertSQL = `
      INSERT INTO Collaborator (UserID, CollectionID) 
      VALUES ${values}
    `;

    // Fetch details for the first user to send the email
    const SQL1 = `
      SELECT 
        u.Name AS UserName, 
        u.Email, 
        c.Name AS CollectionName
      FROM User u
      JOIN Collection c ON c.CollectionID = ?
      WHERE u.UserID = ?
    `;

    const result1 = await Qexecution.queryExecute(SQL1, [collectionId, userIds[0]]);

    const result = await Qexecution.queryExecute(insertSQL);

    if (result.affectedRows > 0) {
      // Send emails to all collaborators
      for (let userId of userIds) {
        const SQL2 = `
          SELECT Email 
          FROM User 
          WHERE UserID = ?
        `;
        const userResult = await Qexecution.queryExecute(SQL2, [userId]);
        const recipient = userResult[0].Email;
        const subject = "Invitation to Join Collection";
        const emailBody = `You are invited to be a part of the collection named ${result1[0].CollectionName} by ${result1[0].UserName}. Please go to the URL: http://localhost:5173/collection/${collectionId} to view the collection.`;

        await sendEmail(collectionId, userId, recipient, subject, emailBody);
      }

      res.status(200).json({ message: 'Collaborators added successfully' });
    } else {
      res.status(400).json({ message: 'Failed to add collaborators' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.pending = async (req, res) => {
  try {
    const { UserID, Name, Email, CollectionID } = req.body; // or from req.body based on your API structure

    const SQL = `
      INSERT INTO Pending ( Name, Email, CollectionID) 
      VALUES (?, ?, ?)
    `;

    const result = await Qexecution.queryExecute(SQL, [Name, Email, CollectionID]);

    const SQL1 = `
          SELECT 
              u.Name AS UserName, 
              u.Email, 
              c.Name AS CollectionName
          FROM User u
          JOIN Collection c ON c.CollectionID = ?
          WHERE u.UserID = ?
      `;

      const result1 = await Qexecution.queryExecute(SQL1, [CollectionID, UserID]);


    const recipient = result1[0].Email;
    const subject = "Invitation to Join Collection";
    const emailBody = `You are invited to be a part of the collection named ${result1[0].CollectionName} by ${result1[0].UserName}. Please go to the URL: http://localhost:5173/login to signup to the system and view the collection.`;
  

    const result2 = await sendEmail(CollectionID, UserID, recipient, subject, emailBody);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Collaborator added successfully' });
    } else {
      res.status(400).json({ message: 'Failed to add collaborator' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.deleteCollaborator = async (req, res) => {
    try {
      const { collectionId, userId } = req.body; // or from req.body based on your API structure
      console.log(collectionId,userId)
      const SQL = `
        DELETE FROM collaborator
        WHERE UserID = ? AND CollectionID = ?
      `;
  
      const result = await Qexecution.queryExecute(SQL, [userId, collectionId]);
  console.log(result)
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Collaborator deleted successfully' });
      } else {
        res.status(404).json({ message: 'Collaborator not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };