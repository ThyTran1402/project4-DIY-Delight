import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CarForm from '../components/CarForm'
import { getCar, updateCar } from '../services/CarsAPI'
import '../App.css'

const EditCar = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => { document.title = title }, [title])
    useEffect(() => {
        getCar(id).then(setCar).catch(e => setError(e.message))
    }, [id])

    const handleUpdate = async (updated) => {
        await updateCar(id, updated)
        navigate(`/customcars/${id}`)
    }

    if (error) return <p className='error'>{error}</p>
    if (!car) return <p aria-busy='true'>Loading...</p>
    return <CarForm initialCar={car} submitLabel='Save changes' onSubmit={handleUpdate} />
}

export default EditCar
