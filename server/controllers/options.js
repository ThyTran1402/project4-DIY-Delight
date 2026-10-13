import { pool } from '../config/database.js'

export const getOptions = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM options ORDER BY category, price, id')
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
