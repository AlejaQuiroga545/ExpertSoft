/*Load clients to DB*/
import fs from 'fs'; // It allows me to read the files
import path from 'path'; // It shows me the current route
import csv from 'csv-parser';
import { pool } from "../conection_db.js"


export async function loadClientsToDataBase() { // Using an asynchronous function, we begin entering the data using the following things.

    const pathFile = path.resolve('/home/coders/ExpertSoft/server/data/client.csv'); // I indicate the path where my CSV file is
    const client = []; 

    return new Promise((resolve, reject) => { 
        fs.createReadStream(pathFile)
            .pipe(csv())
            .on("data", (row) => { // What I want it to do with the data walking through it row by row
                client.push([
                    row.client_id,
                    row.name,
                    row.identification_number,
                    row.adress,
                    row.phone,
                    row.email
                ]);
            })
            .on('end', async () => { // What I want it to do after it has the data
                // In the END, I want to create a SQL through an INSERT INTO to enter new records
                try {
                    const sql = 'INSERT INTO Client (client_id,name,identification_number,adress,phone,email) VALUES ?'; // Columns I want to insert it and the value
                    const [result] = await pool.query(sql, [client]);

                    console.log(`✅ Have been inserted ${result.affectedRows} clients.`);
                    resolve(); // Finish successful
                } catch (error) {
                    console.error('❌ Error inserting client:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => { // Error reading the files
                console.error('❌ Error reading CSV file of client:', err.message);
                reject(err);
            });
    });
}