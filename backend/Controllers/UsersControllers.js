const Qexecution = require("./query");

// Create User
exports.createUser = async (req, res) => {
    const { Name, PhoneNumber, Email } = req.body;
    const isAdmin = 0; // Always set as false
    

    const createUserSQL = `
        INSERT INTO user (Name, PhoneNumber, IsAdmin, Email)
        VALUES (?, ?, ?, ?)
    `;

    try {
        // Create new user
        const result = await Qexecution.queryExecute(createUserSQL, [Name, PhoneNumber, isAdmin, Email]);

        res.status(200).send({
            status: "success",
            message: "User created successfully.",
            userId: result.insertId,
        });
    } catch (err) {
        console.error("Error creating user:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error creating user.",
            error: err.message,
        });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    const getAllUsersSQL = `
        SELECT UserID, Name, PhoneNumber, Email 
        FROM user
        WHERE IsAdmin = 0
    `;

    try {
        // Get all users
        const users = await Qexecution.queryExecute(getAllUsersSQL);

        if (users.length === 0) {
            return res.status(404).send({
                status: "fail",
                message: "No users found.",
            });
        }

        res.status(200).send({
            status: "success",
            message: "All users fetched successfully.",
            users,
        });
    } catch (err) {
        console.error("Error fetching users:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error fetching users.",
            error: err.message,
        });
    }
};

// Get User by ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    const getUserByIdSQL = `
        SELECT UserID, Name, PhoneNumber, IsAdmin, Email 
        FROM user
        WHERE UserID = ?
        AND IsAdmin = 0
    `;

    try {
        // Get user by ID
        const users = await Qexecution.queryExecute(getUserByIdSQL, [id]);

        if (users.length === 0) {
            return res.status(404).send({
                status: "fail",
                message: "User not found.",
            });
        }

        res.status(200).send({
            status: "success",
            message: "User fetched successfully.",
            user: users[0],
        });
    } catch (err) {
        console.error("Error fetching user:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error fetching user.",
            error: err.message,
        });
    }
};

exports.getUserByEmail = async (req, res) => {
    const { email } = req.params;
    const getUserByIdSQL = `
        SELECT UserID, Name, PhoneNumber, IsAdmin, Email 
        FROM user
        WHERE Email = ?
        AND IsAdmin = 0
    `;

    try {
        // Get user by ID
        const users = await Qexecution.queryExecute(getUserByIdSQL, [email]);

        if (users.length === 0) {
            return res.status(404).send({
                status: "fail",
                message: "User not found.",
            });
        }

        res.status(200).send({
            status: "success",
            message: "User fetched successfully.",
            user: users[0],
        });
    } catch (err) {
        console.error("Error fetching user:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error fetching user.",
            error: err.message,
        });
    }
};

// Update User by ID
exports.updateUser = async (req, res) => {
    const { UserID, Name, PhoneNumber, Email } = req.body;
    const isAdmin = 0; // Always set as false

    const updateUserSQL = `
        UPDATE user
        SET Name = ?, PhoneNumber = ?, IsAdmin = ?, Email = ?
        WHERE UserID = ?
    `;

    try {
        // Update user by ID
        const result = await Qexecution.queryExecute(updateUserSQL, [Name, PhoneNumber, isAdmin, Email, UserID]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                status: "fail",
                message: "User not found.",
            });
        }

        res.status(200).send({
            status: "success",
            message: "User updated successfully.",
        });
    } catch (err) {
        console.error("Error updating user:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error updating user.",
            error: err.message,
        });
    }
};

// Delete User by ID
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const deleteUserSQL = `
        DELETE FROM user
        WHERE UserID = ?
    `;

    try {
        // Delete user by ID
        const result = await Qexecution.queryExecute(deleteUserSQL, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                status: "fail",
                message: "User not found.",
            });
        }

        res.status(200).send({
            status: "success",
            message: "User deleted successfully.",
        });
    } catch (err) {
        console.error("Error deleting user:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error deleting user.",
            error: err.message,
        });
    }
};