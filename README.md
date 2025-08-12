# ExpertSoft 🖥️

This project proposes implementing a solution that allows one of ExpertSoft's clients to organize and structure their information in a SQL database, facilitating its loading, storage, and subsequent management through a CRUD system, along with key queries that meet the client's needs.

---

## Technologies used 🛠️

- Node.js
- Express.js
- MySQL
- HTML, CSS, JavaScript (Frontend)
- csv-parser (to load data from CSV files)
- vite

--- 

## Project Structure 📂
```Bash

ExpertSoft/
│
├── server/ # Backend
│   ├── data/ # CSV files for initial data loading and Relational model.
│   ├── seeders/ # Scripts to load data into the database
│   │   ├── load_clients.js
        ├── load_bill.js
        ├── load_transaction.js
│   │   └── run_seeders.js
│   ├── conection_db.js # Module for connection to the database
│   └── index.js # Main logic, endpoints and server
├── front/ # Frontend
    ├── css
    ├── js
    |   ├── main.js
├── index.html/
└── ...  
```

## Normalization 📌

**✅ 1. First Normal Form (1NF)**

**Main rule**
Each column must have atomic values (no lists or repeated data in the same cell).
There must be no duplicate rows.

**Problem**
In the "Date and Time of the Transaction" column, there is more than one value in the same cell.

❇️ Therefore, we separate those two values into different columns.  


**✅ 2. Second Normal Form (2NF)**

**Main rule**
Comply with 1NF.
All attributes must depend on the entire primary key, not just part of it (applies if the primary key is composite).

❇️ Our tables complied with 2NF  



**✅ 3. Third Normal Form (3NF)**

**Main rule**
Comply with 2NF.
There must be no transitive dependencies: a non-key attribute must not depend on another non-key attribute.

❇️ Finally, three tables have been obtained: `Client`, `Bill` and `Transaction`, each with its PK and FK complying with the 3 normalization rules.

--- 

## Installation 🔧


➡️ 1. Clone the repository:

```bash
git clone https://github.com/AlejaQuiroga545/ExpertSoft.git
cd ExpertSoft
```
➡️ 2. Install dependencies:

```bash
npm install
```

➡️ 3. Install necessary libraries
```bash
npm install mysql2
npm install csv-parser
npm install express
```
---

### Instructions for bulk upload from CSV 🧩

❇️ 1. In our seeders folder, we begin creating our documents to load our CSVs one by one.
`load_client.js`, within this file, we will import our `fs, path, csv-parser libraries`, and our database connection and it will be responsible for loading the users into the DB. Here we called the CSV File, db connection and insert our data into the main data base.

❇️ 2. Using an asynchronous function, we begin entering the data using the following things.
- `on.data` - What I want it to do with the data
- `on end` - what I want it to do after it has the data
- `on error` - Error reading the files
  
❇️ 3. Create a `run_seeders.js` which will be responsible for calling the load.
So it has to look like this
```js
import fs from 'fs'; // It allows me to read the files
import path from 'path'; // It shows me the current route
import csv from 'csv-parser';
import { pool } from "../conection_db.js"


export async function loadClientsToDataBase() {

    const pathFile = path.resolve('/home/coders/ExpertSoft/server/data/client.csv');
    const client = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(pathFile)
            .pipe(csv())
            .on("data", (row) => {
                client.push([
                    row.client_id,
                    row.name,
                    row.identification_number,
                    row.adress,
                    row.phone,
                    row.email
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO Client (client_id,name,identification_number,adress,phone,email) VALUES ?';
                    const [result] = await pool.query(sql, [client]);

                    console.log(`✅ Have been inserted ${result.affectedRows} clients.`);
                    resolve(); // Finish successful
                } catch (error) {
                    console.error('❌ Error inserting client:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error reading CSV file of client:', err.message);
                reject(err);
            });
    });
}
```
---

## Relational model 〽️

<img width="1232" height="460" alt="image" src="https://github.com/user-attachments/assets/fe781727-fcf0-4aa8-a1b8-c2c9c78504ca" />

---
## Developer
Alejandra Quiroga Greñas | Lovelace | alejandraquirogag802@gmail.com
