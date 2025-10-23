import dotenv from 'dotenv';
import { pool } from './database.js';
import './dotenv.js'

const createTables = async () => {
    const createTablesQuery = `
    DROP TABLE IF EXISTS custom_cars;
    
    CREATE TABLE custom_cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        base_price INT NOT NULL,
        total_price INT NOT NULL,
        interior_name VARCHAR(100),
        interior_img TEXT,
        interior_cost INT,
        exterior_name VARCHAR(100),
        exterior_img TEXT,
        exterior_cost INT,
        roof_name VARCHAR(100),
        roof_img TEXT,
        roof_cost INT,
        wheels_name VARCHAR(100),
        wheels_img TEXT,
        wheels_cost INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );
    `   

    try {
        const res = await pool.query(createTablesQuery)
        console.log("Tables were created successfully 🎉")
    }
    catch (err) {
        console.error('⚠️ error creating tables', err)
    }

}

await createTables()
