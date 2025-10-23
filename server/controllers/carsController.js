import { pool } from "../config/database.js";

const getCars = async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM custom_cars ORDER BY id ASC")
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getCarsById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const getByIdQuery = "SELECT * FROM custom_cars WHERE id = $1"

        const results = await pool.query(getByIdQuery, [id])

        if (!results.rows[0]) {
            return res.status(404).json({ error: 'Car not found' })
        }

        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const editCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const {
            name,
            base_price, total_price, 
            interior_name, interior_img, interior_cost,
            exterior_name, exterior_img, exterior_cost,
            roof_name, roof_img, roof_cost,
            wheels_name, wheels_img, wheels_cost
        } = req.body

        const editQuery = `
            UPDATE custom_cars
            SET name = $1,
                base_price = $2,
                total_price = $3,
                interior_name = $4,
                interior_img = $5,
                interior_cost = $6,
                exterior_name = $7,
                exterior_img = $8,
                exterior_cost = $9,
                roof_name = $10,
                roof_img = $11,
                roof_cost = $12,
                wheels_name = $13,
                wheels_img = $14,
                wheels_cost = $15,
                updated_at = NOW()
            WHERE id = $16
            RETURNING *
        `

        const values = [
            name,
            base_price, total_price, 
            interior_name, interior_img, interior_cost,
            exterior_name, exterior_img, exterior_cost,
            roof_name, roof_img, roof_cost,
            wheels_name, wheels_img, wheels_cost,
            id
        ]

        const result = await pool.query(editQuery, values)

        if (!result.rows[0]) {
            return res.status(404).json({ error: 'Car not found' })
        }

        res.status(200).json(result.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const result = await pool.query("DELETE FROM custom_cars WHERE id=$1 RETURNING *", [id])
        
        if (!result.rows[0]) {
            return res.status(404).json({ error: 'Car not found' })
        }
        
        res.status(200).json({ message: 'Car deleted successfully', car: result.rows[0] })
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const createCar = async (req, res) => {
    try {

        const {
            name,
            base_price, total_price, 
            interior_name, interior_img, interior_cost,
            exterior_name, exterior_img, exterior_cost,
            roof_name, roof_img, roof_cost,
            wheels_name, wheels_img, wheels_cost
        } = req.body

        const createQuery = `
            INSERT INTO custom_cars(
                name,
                base_price, total_price, 
                interior_name, interior_img, interior_cost,
                exterior_name, exterior_img, exterior_cost,
                roof_name, roof_img, roof_cost,
                wheels_name, wheels_img, wheels_cost
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            RETURNING *
        `

        const values = [
            name,
            base_price, total_price, 
            interior_name, interior_img, interior_cost,
            exterior_name, exterior_img, exterior_cost,
            roof_name, roof_img, roof_cost,
            wheels_name, wheels_img, wheels_cost
        ]

        const result = await pool.query(createQuery, values)

        res.status(200).json(result.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getCars,
    getCarsById,
    editCar,
    deleteCar,
    createCar
}