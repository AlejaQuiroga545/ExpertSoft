# ExpertSoft

This project proposes implementing a solution that allows one of ExpertSoft's clients to organize and structure their information in a SQL database, facilitating its loading, storage, and subsequent management through a CRUD system, along with key queries that meet the client's needs.

---

## Technologies used

- Node.js
- Express.js
- MySQL
- HTML, CSS, JavaScript (Frontend)
- csv-parser (to load data from CSV files)
- vite

--- 

## Project Structure
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

## Normalization
**1. First Normal Form (1NF)**

Main rule:

Each column must have atomic values (no lists or repeated data in the same cell).

There must be no duplicate rows.
Problem:
In the "Date and Time of the Transaction" column, there is more than one value in the same cell.

Therefore, we separate those two values into different columns

**2. Second Normal Form (2NF)**

Main rule:
Comply with 1NF.
All attributes must depend on the entire primary key, not just part of it (applies if the primary key is composite).

Our tables complied with 2NF


**3. Third Normal Form (3NF)**

Main rule:
Comply with 2NF.
There must be no transitive dependencies: a non-key attribute must not depend on another non-key attribute.

Finally, three tables have been obtained: `Client`, `Bill` and `Transaction`, each with its PK and FK complying with the 3 normalization rules.

--- 

## Installation


1. Clone the repository:

```bash
git clone https://github.com/jcomte23/biblioteca-easy.git
cd biblioteca
```
2. Install dependencies:

```bash
npm install
```
