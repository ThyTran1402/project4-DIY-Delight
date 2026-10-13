import React, { useEffect, useState } from 'react'
import CarPreview from './CarPreview'
import { getOptions } from '../services/CarsAPI'
import { CATEGORIES, calcPrice, selectedOptions } from '../utilities/calcPrice'
import { validateCar, conflictFor } from '../utilities/validation'

const CarForm = ({ initialCar = { name: '' }, submitLabel, onSubmit }) => {
    const [options, setOptions] = useState([])
    const [car, setCar] = useState(initialCar)
    const [error, setError] = useState(null)

    useEffect(() => {
        getOptions().then(setOptions).catch(e => setError(e.message))
    }, [])

    const price = calcPrice(car, options)
    const selected = selectedOptions(car, options)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const message = validateCar(car, options)
        if (message) return setError(message)
        try {
            await onSubmit({ ...car, total_price: price })
        } catch (e) {
            setError(e.message)
        }
    }

    const pick = (category, id) => {
        setCar({ ...car, [`${category}_id`]: id })
        setError(null)
    }

    return (
        <form className='car-form' onSubmit={handleSubmit}>
            <article>
                <CarPreview {...selected} />
                <h3>${price.toLocaleString()}</h3>
            </article>

            <article>
                <label>
                    Car name
                    <input value={car.name} placeholder='My dream car'
                        onChange={e => setCar({ ...car, name: e.target.value })} />
                </label>

                {CATEGORIES.map(category => (
                    <fieldset key={category}>
                        <legend>{category}</legend>
                        {options.filter(o => o.category === category).map(option => {
                            const conflict = conflictFor(option, car, options)
                            return (
                                <label key={option.id} className={conflict ? 'blocked' : ''}>
                                    <input type='radio' name={category}
                                        checked={car[`${category}_id`] === option.id}
                                        disabled={!!conflict}
                                        onChange={() => pick(category, option.id)} />
                                    {option.name} (+${option.price.toLocaleString()})
                                    {conflict && <small> ({conflict})</small>}
                                </label>
                            )
                        })}
                    </fieldset>
                ))}

                {error && <p role='alert' className='error'>⚠️ {error}</p>}
                <input type='submit' value={submitLabel} />
            </article>
        </form>
    )
}

export default CarForm
