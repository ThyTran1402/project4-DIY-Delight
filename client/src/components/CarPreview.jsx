import React from 'react'
import '../css/Car.css'

// Drawn with CSS: exterior sets the body color, roof sets the cabin shape, wheels set the rim color,
// interior sets the seat color
const CarPreview = ({ exterior, roof, wheels, interior }) => {
    const roofClass = roof?.name === 'Convertible' ? 'convertible' : roof?.name === 'Sunroof' ? 'sunroof' : ''

    return (
        <div className='car-preview' aria-label='Car preview'>
            <div className={`car-cabin ${roofClass}`} style={{ borderColor: exterior?.swatch ?? '#666' }} />
            {interior && <div className='car-seat' style={{ background: interior.swatch }} />}
            <div className='car-body' style={{ background: exterior?.swatch ?? '#666' }} />
            <div className='car-wheel front' style={{ background: wheels?.swatch ?? '#222' }} />
            <div className='car-wheel back' style={{ background: wheels?.swatch ?? '#222' }} />
        </div>
    )
}

export default CarPreview
