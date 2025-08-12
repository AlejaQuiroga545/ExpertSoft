CREATE DATABASE pd_alejandra_quiroga_lovelace;
USE pd_alejandra_quiroga_lovelace;

CREATE TABLE Client (
	client_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (200) NOT NULL,
    identification_number VARCHAR (15) NOT NULL,
    adress VARCHAR (500) NOT NULL,
    phone VARCHAR (50) NOT NULL,
    email VARCHAR (200) NOT NULL
);

CREATE TABLE Bill (
	bill_id VARCHAR (10) NOT NULL PRIMARY KEY,
    client_id INT,
    billing_period VARCHAR (50) NOT NULL,
    invoiced_amount DECIMAL NOT NULL,
    amount_paid DECIMAL NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Client(client_id) on delete cascade on update cascade
);

CREATE TABLE Transaction (
	transaction_id VARCHAR (10) NOT NULL PRIMARY KEY,
    bill_id VARCHAR (10),
    transaction_date VARCHAR(50) NOT NULL,
    transaction_time VARCHAR(50) NOT NULL,
    amount DECIMAL NOT NULL,
    state ENUM ('Pending' , 'Failed' , 'Complete' ) NOT NULL,
    transaction_type VARCHAR (100) NOT NULL,
    FOREIGN KEY (bill_id) REFERENCES Bill (bill_id) on delete set null on update cascade
);