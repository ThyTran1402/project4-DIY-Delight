import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CarPreview from '../components/CarPreview'
import { getAllCars, getOptions, deleteCar } from '../services/CarsAPI'
import { CATEGORIES, selectedOptions } from '../utilities/calcPrice'
import '../App.css'

const ViewCars = ({ title }) => {
    const [cars, setCars] = useState(null)
    const [options, setOptions] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => { document.title = title }, [title])
    useEffect(() => {
        Promise.all([getAllCars(), getOptions()])
            .then(([cars, options]) => { setCars(cars); setOptions(options) })
            .catch(e => setError(e.message))
    }, [])

    const handleDelete = async (id) => {
        if (!confirm('Delete this car?')) return
        await deleteCar(id)
        setCars(cars.filter(car => car.id !== id))
    }

    if (error) return <p className='error'>{error}</p>
    if (!cars) return <p aria-busy='true'>Loading...</p>
    if (cars.length === 0) {
        return (
            <article className='car-detail'>
                <h3>No custom cars yet.</h3>
                <Link to='/' role='button'>Build one</Link>
            </article>
        )
    }

    return (
        <div className='car-list'>
            {cars.map(car => {
                const selected = selectedOptions(car, options)
                return (
                    <article key={car.id}>
                        <header><h3>🏎️ {car.name}</h3></header>
                        <CarPreview {...selected} />
                        {CATEGORIES.map(c => <p key={c}><strong>{c}:</strong> {selected[c]?.name}</p>)}
                        <p><strong>${car.total_price.toLocaleString()}</strong></p>
                        <footer>
                            <Link to={`/customcars/${car.id}`} role='button'>Details</Link>
                            <Link to={`/edit/${car.id}`} role='button'>Edit</Link>
                            <button onClick={() => handleDelete(car.id)}>Delete</button>
                        </footer>
                    </article>
                )
            })}
        </div>
    )
}

export default ViewCars
