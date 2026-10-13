import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CarPreview from '../components/CarPreview'
import { getCar, getOptions, deleteCar } from '../services/CarsAPI'
import { CATEGORIES, BASE_PRICE, selectedOptions } from '../utilities/calcPrice'
import '../App.css'

const CarDetails = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [options, setOptions] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => { document.title = title }, [title])
    useEffect(() => {
        Promise.all([getCar(id), getOptions()])
            .then(([car, options]) => { setCar(car); setOptions(options) })
            .catch(e => setError(e.message))
    }, [id])

    const handleDelete = async () => {
        if (!confirm('Delete this car?')) return
        await deleteCar(id)
        navigate('/customcars')
    }

    if (error) return <p className='error'>{error}</p>
    if (!car) return <p aria-busy='true'>Loading...</p>

    const selected = selectedOptions(car, options)
    return (
        <article className='car-detail'>
            <header><h2>🏎️ {car.name}</h2></header>
            <CarPreview {...selected} />
            <p>Base price: ${BASE_PRICE.toLocaleString()}</p>
            {CATEGORIES.map(c => (
                <p key={c}><strong>{c}:</strong> {selected[c]?.name} (+${selected[c]?.price.toLocaleString()})</p>
            ))}
            <h3>Total: ${car.total_price.toLocaleString()}</h3>
            <footer>
                <Link to={`/edit/${car.id}`} role='button'>Edit</Link>
                <button onClick={handleDelete}>Delete</button>
            </footer>
        </article>
    )
}

export default CarDetails
