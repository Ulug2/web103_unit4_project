import React from 'react'
import '../App.css'
import { getCarById, deleteCar } from '../services/CarsApi'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { RotatingLines } from "react-loader-spinner";
import '../css/CarDetails.css'

const CarDetails = () => {

    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const data = await getCarById(id)
                setCar(data)
                setLoading(false)
            }
            catch (err) {
                setLoading(false)
                console.error("Unable to fetch a car. Message: ", err)
            }
        }
        fetchCar()
    }, [id])


    const handleDelete = async () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${car.name}?`)
        
        if (!confirmDelete) {
            return
        }

        try {
            await deleteCar(id)
            console.log("Deleted car:", car.name)
            navigate('/customcars')
        }
        catch (err){
            console.error("Unable to delete the car", err)
            alert("Failed to delete the car. Please try again.")
        }
    }

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

    if (!car) {
        return <div>Car not found</div>
    }
    
    return (
        <div className='car-details-container'>
            <div className='car-header'>
                <span className='car-icon'>🏎️</span>
                <h1>{car.name}</h1>
            </div>
            
            <div className='car-content'>
                <div className='left-section'>
                    <div className='price-section'>
                        <span className='coin-icon'>💰</span>
                        <span className='price'>${car.total_price}</span>
                    </div>
                    
                    <div className='buttons'>
                        <Link to={`/edit/${car.id}`} className='edit-btn'>EDIT</Link>
                        <button className='delete-btn' onClick={handleDelete}>DELETE</button>
                    </div>
                </div>
                
                <div className='images-grid'>
                    <div className='image-card'>
                        {car.exterior_img ? (
                            <img src={car.exterior_img} alt={car.exterior_name} />
                        ) : (
                            <div className='placeholder'>Exterior</div>
                        )}
                    </div>
                    <div className='image-card'>
                        {car.roof_img ? (
                            <img src={car.roof_img} alt={car.roof_name} />
                        ) : (
                            <div className='placeholder'>Roof</div>
                        )}
                    </div>
                    <div className='image-card'>
                        {car.wheels_img ? (
                            <img src={car.wheels_img} alt={car.wheels_name} />
                        ) : (
                            <div className='placeholder'>Wheels</div>
                        )}
                    </div>
                    <div className='image-card'>
                        {car.interior_img ? (
                            <img src={car.interior_img} alt={car.interior_name} />
                        ) : (
                            <div className='placeholder'>Interior</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarDetails