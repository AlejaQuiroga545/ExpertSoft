import mysql from "mysql2/promise" 

// Pool is a system that allows me to create a connection pool (opens the connection, brings what I need, and closes the connection)
// I provide the location of my DB.
export const pool = mysql.createPool({
    host:"localhost",
    database:"pd_alejandra_quiroga_lovelace",
    port:"3306",
    user:"root",
    password:"Qwe.123*",
})

// I create an asynchronous function so where my code can be executed, and I include it within a try catch to handle errors.

async function tryConnectionWithDataBase() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Successful data base conection');
        connection.release();
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error.message);
    }
}
tryConnectionWithDataBase() // Test the connection
