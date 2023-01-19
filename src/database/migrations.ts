import BaseDatabase from "../class/BaseDatabase"

const printError=(err: any)=> {console.log(err.sqlMessage || err.message)}

const createTable= async ()=>{ 
    await BaseDatabase.connection.raw(`
        CREATE TABLE IF NOT EXISTS Products (
            id VARCHAR(100) PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            category VARCHAR(100) NOT NULL,
            status ENUM("ACTIVE", "INACTIVE") NOT NULL,
            quantity INT NOT NULL,
            created_at DATE NOT NULL,
            updated_at DATE,
            deleted_at DATE
        );
    `)

    await BaseDatabase.connection.raw(`
        CREATE TABLE IF NOT EXISTS Customers (
            id VARCHAR(100) PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            cpf VARCHAR(20) NOT NULL UNIQUE,
            email VARCHAR(80) NOT NULL,
            birth_date DATE NOT NULL,
            status ENUM("ACTIVE", "INACTIVE") NOT NULL,
            created_at DATE NOT NULL,
            updated_at DATE,
            deleted_at DATE
        );
    `)

    await BaseDatabase.connection.raw(`
        CREATE TABLE IF NOT EXISTS Orders (
            id VARCHAR(100) PRIMARY KEY,
            created_at DATE NOT NULL,
            quantity INT NOT NULL,
            fk_products VARCHAR(100),
            fk_customers VARCHAR(100),
            FOREIGN KEY (fk_products) REFERENCES Products(id),
            FOREIGN KEY (fk_customers) REFERENCES Customers(id)                
        );
    `)
}

const finish = async () => await BaseDatabase.connection.destroy()

createTable()
.then(() => console.log("Created entities."))
.catch(()=> console.log(printError))
.finally(finish)