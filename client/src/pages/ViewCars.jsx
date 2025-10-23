import React from 'react'
import '../App.css'
import { getAllCars } from '../services/CarsApi'
import { useState, useEffect } from 'react'
import { RotatingLines } from "react-loader-spinner";
import '../css/ViewCars.css'
import { Link } from 'react-router-dom';

const ViewCars = () => {

    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchCars = async () => {
            try {
                const data = await getAllCars()
                setCars(data)
                setLoading(false)
            }
            catch(err){
                console.error('Error fetching cars:', err)
                setLoading(false)
            }
        }
        fetchCars()
    }, [])

    if (loading) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    )
}
    
    return (
        <div className='cars-container'>
            <div >
                {cars.map((car) => (
                    <div key={car.id} className='seperate-car'>
                        <header className='header'><h2>{car.name}</h2><h2>🏎️</h2></header>
                        <div className='bottom-part'>
                            <div className='exterior-roof'>
                                <p><span>🖌️ Exterior: </span>{car.exterior_name}</p>
                                <p><span>😎 Roof: </span>{car.roof_name}</p>
                            </div>
                            <div className='interior-wheels'>
                                <p><span>🛴 Wheels: </span>{car.wheels_name}</p>
                                <p><span>💺 Interior:</span> {car.interior_name}</p>
                            </div>
                            <div className='price-details'>
                                <p>${car.total_price}</p>
                                <Link to={`/customcars/${car.id}`} className='details'>Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default ViewCars