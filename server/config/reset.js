import { pool } from './database.js'

// category, name, price, swatch (CSS color used by the car preview)
const options = [
    ['exterior', 'Midnight Black', 0, '#111111'],
    ['exterior', 'Racing Red', 500, '#c0392b'],
    ['exterior', 'Ocean Blue', 500, '#2471a3'],
    ['exterior', 'Lime Green', 750, '#7dcea0'],
    ['roof', 'Hardtop', 0, null],
    ['roof', 'Convertible', 2500, null],
    ['roof', 'Sunroof', 1000, null],
    ['wheels', 'Standard 17"', 0, '#888888'],
    ['wheels', 'Sport 19"', 1200, '#d4ac0d'],
    ['wheels', 'Off-Road 18"', 1500, '#333333'],
    ['interior', 'Cloth', 0, '#7f8c8d'],
    ['interior', 'Leather', 1800, '#8b4513'],
    ['interior', 'Rear Entertainment', 3000, '#5dade2']
]

await pool.query(`
    DROP TABLE IF EXISTS cars;
    DROP TABLE IF EXISTS options;

    CREATE TABLE options (
        id SERIAL PRIMARY KEY,
        category TEXT NOT NULL,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        swatch TEXT
    );

    CREATE TABLE cars (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        exterior_id INTEGER NOT NULL REFERENCES options(id),
        roof_id INTEGER NOT NULL REFERENCES options(id),
        wheels_id INTEGER NOT NULL REFERENCES options(id),
        interior_id INTEGER NOT NULL REFERENCES options(id),
        total_price INTEGER NOT NULL
    );
`)

for (const option of options) {
    await pool.query('INSERT INTO options (category, name, price, swatch) VALUES ($1, $2, $3, $4)', option)
}

console.log('🎉 options and cars tables reset')
await pool.end()
