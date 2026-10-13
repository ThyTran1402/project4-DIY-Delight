const handleResponse = async (response) => {
    if (response.status === 204) return null
    const data = await response.json()
    if (!response.ok) throw new Error(data.error)
    return data
}

const withBody = (method, body) => ({
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
})

export const getAllCars = () => fetch('/api/cars').then(handleResponse)
export const getCar = (id) => fetch(`/api/cars/${id}`).then(handleResponse)
export const createCar = (car) => fetch('/api/cars', withBody('POST', car)).then(handleResponse)
export const updateCar = (id, car) => fetch(`/api/cars/${id}`, withBody('PATCH', car)).then(handleResponse)
export const deleteCar = (id) => fetch(`/api/cars/${id}`, { method: 'DELETE' }).then(handleResponse)

export const getOptions = () => fetch('/api/options').then(handleResponse)
