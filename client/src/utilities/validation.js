import { selectedOptions } from './calcPrice.js'

// Pairs of option names that can't be built together
const INCOMPATIBLE = [
    ['Convertible', 'Rear Entertainment', "Convertibles can't fit the rear entertainment screens."],
    ['Convertible', 'Off-Road 18"', 'The off-road package needs a fixed roof for its roll cage.']
]

const chosenNames = (car, options) =>
    Object.values(selectedOptions(car, options)).map(o => o?.name)

// Returns an error message, or null if the car can be built
export const validateCar = (car, options) => {
    if (!car.name?.trim()) return 'Give your car a name.'
    const names = chosenNames(car, options)
    if (names.includes(undefined)) return 'Pick an option for every feature.'
    const conflict = INCOMPATIBLE.find(([a, b]) => names.includes(a) && names.includes(b))
    return conflict ? conflict[2] : null
}

// Stretch: the reason an option is blocked by the current picks, or null
export const conflictFor = (option, car, options) => {
    const names = chosenNames(car, options)
    const conflict = INCOMPATIBLE.find(([a, b]) =>
        (option.name === a && names.includes(b)) || (option.name === b && names.includes(a)))
    return conflict ? conflict[2] : null
}
