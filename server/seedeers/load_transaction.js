/*Load transactions to DB*/
import fs from 'fs'; // It allows me to read the files
import path from 'path'; // It shows me the current route
import csv from 'csv-parser';
import { pool } from "../conection_db.js"


export async function loadTransactionsToDataBase() { // Using an asynchronous function, we begin entering the data using the following things.

    const pathFile = path.resolve('/home/coders/ExpertSoft/server/data/transaction.csv'); // I indicate the path where my CSV file is
    const transaction = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(pathFile)
            .pipe(csv())
            .on("data", (row) => { // What I want it to do with the data walking through it row by row
                transaction.push([
                    row.transaction_id,
                    row.bill_id,
                    row.transaction_date,
                    row.transaction_time,
                    row.amount,
                    row.state,
                    row.transaction_type
                ]);
            })
            .on('end', async () => { // What I want it to do after it has the data
                // In the END, I want to create a SQL through an INSERT INTO to enter new records
                try {
                    const sql = 'INSERT INTO Transaction (transaction_id,bill_id,transaction_date,transaction_time,amount,state,transaction_type) VALUES ?';
                    const [result] = await pool.query(sql, [transaction]);

                    console.log(`✅ Have been inserted ${result.affectedRows} transactions.`);
                    resolve(); // Finish successful
                } catch (error) {
                    console.error('❌ Error inserting transaction:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error reading CSV file of transaction:', err.message);
                reject(err);
            });
    });
}