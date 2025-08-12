/*Load bills to DB*/
import fs from 'fs'; // It allows me to read the files
import path from 'path'; // It shows me the current route
import csv from 'csv-parser';
import { pool } from "../conection_db.js"


export async function loadBillsToDataBase() { // Using an asynchronous function, we begin entering the data using the following things.

    const pathFile = path.resolve('/home/coders/ExpertSoft/server/data/bill.csv'); // I indicate the path where my CSV file is
    const bill = [];

    return new Promise((resolve, reject) => { 
        fs.createReadStream(pathFile)
            .pipe(csv())
            .on("data", (row) => { // What I want it to do with the data walking through it row by row
                bill.push([
                    row.bill_id,
                    row.client_id,
                    row.billing_period,
                    row.invoiced_amount,
                    row.amount_paid
                ]);
            })
            .on('end', async () => { // What I want it to do after it has the data
                // In the END, I want to create a SQL through an INSERT INTO to enter new records
                try {
                    const sql = 'INSERT INTO Bill (bill_id,client_id,billing_period,invoiced_amount,amount_paid) VALUES ?';
                    const [result] = await pool.query(sql, [bill]);

                    console.log(`✅ Have been inserted ${result.affectedRows} bills.`);
                    resolve(); // Finish successful
                } catch (error) {
                    console.error('❌ Error inserting bill:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error reading CSV file of bill:', err.message);
                reject(err);
            });
    });
}
