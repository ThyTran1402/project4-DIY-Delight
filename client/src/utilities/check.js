// Run with: node client/src/utilities/check.js
import assert from 'node:assert'
import { calcPrice } from './calcPrice.js'
import { validateCar, conflictFor } from './validation.js'

const options = [
    { id: 1, category: 'exterior', name: 'Red', price: 500 },
    { id: 2, category: 'roof', name: 'Hardtop', price: 0 },
    { id: 3, category: 'roof', name: 'Convertible', price: 2500 },
    { id: 4, category: 'wheels', name: 'Standard 17"', price: 0 },
    { id: 5, category: 'interior', name: 'Cloth', price: 0 },
    { id: 6, category: 'interior', name: 'Rear Entertainment', price: 3000 }
]
const ok = { name: 'Zoom', exterior_id: 1, roof_id: 2, wheels_id: 4, interior_id: 5 }

assert.equal(calcPrice(ok, options), 20500)
assert.equal(calcPrice({}, options), 20000)
assert.equal(validateCar(ok, options), null)
assert.match(validateCar({ ...ok, name: ' ' }, options), /name/)
assert.match(validateCar({ ...ok, wheels_id: undefined }, options), /every feature/)
assert.match(validateCar({ ...ok, roof_id: 3, interior_id: 6 }, options), /Convertible/)
assert.ok(conflictFor(options[5], { ...ok, roof_id: 3 }, options))
assert.equal(conflictFor(options[5], ok, options), null)
console.log('utilities ok')
