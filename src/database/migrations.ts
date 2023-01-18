import BaseDatabase from "../class/BaseDatabase"

const printError=(err: any)=> {console.log(err.sqlMessage || err.message)}

const createTable= async ()=>{ 
    await BaseDatabase.connection.raw(`
        CREATE TABLE IF NOT EXISTS Products (
            id VARCHAR(100) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            category ENUM("ACTIVE", "INACTIVE") NOT NULL,
            quantity INT NOT NULL,
            created_at DATE NOT NULL,
            updated_at DATE NOT NULL,
            deleted_at DATE NOT NULL
        );
    `)
}

const finish = async () => await BaseDatabase.connection.destroy()

createTable()
.then(() => console.log("Entity created."))
.catch(()=> console.log(printError))
.finally(finish)