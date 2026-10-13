export const BASE_PRICE = 20000
export const CATEGORIES = ['exterior', 'roof', 'wheels', 'interior']

// The option objects currently picked for a car, keyed by category
export const selectedOptions = (car, options) =>
    Object.fromEntries(CATEGORIES.map(c => [c, options.find(o => o.id === car[`${c}_id`])]))

export const calcPrice = (car, options) =>
    BASE_PRICE + Object.values(selectedOptions(car, options)).reduce((sum, o) => sum + (o?.price ?? 0), 0)
