const Qexecution = require('./query');

exports.addCollaborator = async (req, res) => {
  try {
    const { collectionId, userId } = req.body; // or from req.body based on your API structure

    const SQL = `
      INSERT INTO Collaborator (UserID, CollectionID) 
      VALUES (?, ?)
    `;

    const result = await Qexecution.queryExecute(SQL, [userId, collectionId]);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'Collaborator added successfully' });
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