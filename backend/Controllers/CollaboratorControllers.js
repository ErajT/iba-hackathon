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



exports.addCollaborator = async (req, res) => {
  try {
    const { collectionId, userId } = req.body; // or from req.body based on your API structure

    const SQL = `
      INSERT INTO Collaborator (UserID, CollectionID) 
      VALUES (?, ?)
    `;

    const SQL1 = `SELECT Email from user WHERE UserID = ?`;

    const result = await Qexecution.queryExecute(SQL, [userId, collectionId]);

    const result1 = await Qexecution.queryExecute(SQL1, [userId]);

    const recipient = result1[0].Email;
    const subject = "Invitation to Join Collection";
    const emailBody = `You are invited to be a part of the collection named ${collectionId} by ${userId}. Please go to the URL: http://localhost:5173/collection/${collectionID} to view the collection.`;
  

    const result2 = await sendEmail(collectionId, userId, recipient, subject, emailBody);

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

exports.pending = async (req, res) => {
  try {
    const { Name, Email, CollectionID } = req.body; // or from req.body based on your API structure

    const SQL = `
      INSERT INTO Pending ( Name, Email, CollectionID) 
      VALUES (?, ?, ?)
    `;

    const SQL1 = `SELECT Email from user WHERE UserID = ?`;

    const result = await Qexecution.queryExecute(SQL, [Name, Email, CollectionID]);

    const result1 = await Qexecution.queryExecute(SQL1, [userId]);

    const recipient = result1[0].Email;
    const subject = "Invitation to Join Collection";
    const emailBody = `You are invited to be a part of the collection named ${collectionID} by ${userID}. Please go to the URL: http://localhost:2000/collection/${collectionID} to view the collection.`;
  

    const result2 = await sendEmail(collectionId, userId, recipient, subject, emailBody);

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