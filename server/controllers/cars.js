import { pool } from '../config/database.js'
import { calcPrice } from '../../client/src/utilities/calcPrice.js'
import { validateCar } from '../../client/src/utilities/validation.js'

// Same rules as the form, so an impossible combo is never saved even if the API is called directly.
// Price is recalculated here instead of trusting the client.
const checkedValues = async (body) => {
    const { rows: options } = await pool.query('SELECT * FROM options')
    const error = validateCar(body, options)
    if (error) throw new Error(error)
    return [body.name, body.exterior_id, body.roof_id, body.wheels_id, body.interior_id, calcPrice(body, options)]
}

export const getCars = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM cars ORDER BY id')
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getCarById = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM cars WHERE id = $1', [req.params.id])
        if (!rows[0]) return res.status(404).json({ error: 'Car not found' })
        res.status(200).json(rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createCar = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO cars (name, exterior_id, roof_id, wheels_id, interior_id, total_price)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            await checkedValues(req.body)
        )
        res.status(201).json(rows[0])
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const updateCar = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `UPDATE cars SET name = $1, exterior_id = $2, roof_id = $3, wheels_id = $4, interior_id = $5, total_price = $6
             WHERE id = $7 RETURNING *`,
            [...await checkedValues(req.body), req.params.id]
        )
        if (!rows[0]) return res.status(404).json({ error: 'Car not found' })
        res.status(200).json(rows[0])
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const deleteCar = async (req, res) => {
    try {
        await pool.query('DELETE FROM cars WHERE id = $1', [req.params.id])
        res.status(204).end()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
