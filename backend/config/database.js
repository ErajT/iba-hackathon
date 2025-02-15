const mysql = require('mysql');
//Database Connection

const connection=mysql.createPool({
    connectionLimit: 6,
    host: "learn-2.mysql.database.azure.com",
    user: "learn",
    password: "Delib2005",
    database: "iba",
    port: 3306,
    ssl: true,
    connectionLimit: 10,
    multipleStatements: true,
    acquireTimeout: 1000000,
    connectTimeout: 1000000,
    timeout: 1000000,
    supportBigNumbers: true,
    bigNumberStrings: true,
    charset: 'utf8mb4',
    // Set maxAllowedPacket size here
    maxAllowedPacket: 64 * 1024 * 1024 * 1024 // 64 MB
})
connection.getConnection((err,connection)=>{
    if (err){
        return console.log(err);
    }
    connection.release();
    console.log("Database connected successfully!");
})

module.exports = connection;