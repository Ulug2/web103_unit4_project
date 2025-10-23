import React from 'react'
import '../App.css'
import useRoofModal from '../modals/RoofModal'
import useWheelsModal from '../modals/WheelsModal'
import useInteriorModal from '../modals/InteriorModal'
import useExteriorModal from '../modals/ExteriorModal'
import { getCarById, deleteCar, updateCar } from '../services/CarsApi'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { RotatingLines } from "react-loader-spinner";
import '../css/EditCar.css'

const EditCar = () => {

    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)

    const [showExterior, setShowExterior] = useState(false)
    const [showRoof, setShowRoof] = useState(false)
    const [showWheels, setShowWheels] = useState(false)
    const [showInterior, setShowInterior] = useState(false)

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

    const { ExteriorModal, choice: exteriorChoice, resetChoice: resetExterior } = useExteriorModal(showExterior)
    const { RoofModal, choice: roofChoice, resetChoice: resetRoof } = useRoofModal(showRoof, car?.convertible)
    const { WheelsModal, choice: wheelsChoice, resetChoice: resetWheels } = useWheelsModal(showWheels)
    const { InteriorModal, choice: interiorChoice, resetChoice: resetInterior } = useInteriorModal(showInterior)

    // Calculate total price dynamically
    const [currentPrice, setCurrentPrice] = useState(0)
    
    useEffect(() => {
        if (car) {
            const basePrice = 75000
            const exteriorCost = exteriorChoice?.cost ?? car.exterior_cost ?? 0
            const roofCost = roofChoice?.cost ?? car.roof_cost ?? 0
            const wheelsCost = wheelsChoice?.cost ?? car.wheels_cost ?? 0
            const interiorCost = interiorChoice?.cost ?? car.interior_cost ?? 0
            
            setCurrentPrice(basePrice + exteriorCost + roofCost + wheelsCost + interiorCost)
        }
    }, [car, exteriorChoice, roofChoice, wheelsChoice, interiorChoice])

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

    const handleExterior = () => {
        setShowExterior(true)
        setShowRoof(false)
        setShowWheels(false)
        setShowInterior(false)
    }
    
    const handleRoof = () => {
        setShowExterior(false)
        setShowRoof(true)
        setShowWheels(false)
        setShowInterior(false)
    }
    
    const handleWheels = () => {
        setShowExterior(false)
        setShowRoof(false)
        setShowWheels(true)
        setShowInterior(false)
    }
    
    const handleInterior = () => {
        setShowExterior(false)
        setShowRoof(false)
        setShowWheels(false)
        setShowInterior(true)
    }

    const handleUpdate = async () => {
        setShowExterior(false)
        setShowRoof(false)
        setShowWheels(false)
        setShowInterior(false)

        const payload = {
              name: car.name,
              base_price: 75000,
              total_price: currentPrice,
              interior_name: interiorChoice?.name ?? car.interior_name,
              interior_img: interiorChoice?.img ?? car.interior_img,
              interior_cost: interiorChoice?.cost ?? car.interior_cost,
              exterior_name: exteriorChoice?.name ?? car.exterior_name,
              exterior_img: exteriorChoice?.img ?? car.exterior_img,
              exterior_cost: exteriorChoice?.cost ?? car.exterior_cost,
              roof_name: roofChoice?.name ?? car.roof_name,
              roof_img: roofChoice?.img ?? car.roof_img,
              roof_cost: roofChoice?.cost ?? car.roof_cost,
              wheels_name: wheelsChoice?.name ?? car.wheels_name,
              wheels_img: wheelsChoice?.img ?? car.wheels_img,
              wheels_cost: wheelsChoice?.cost ?? car.wheels_cost,
            }
            try {
              const res = await updateCar(id, payload)
              console.log('Updated car:', res)
              
              setCar(res)
              
              resetExterior()
              resetRoof()
              resetWheels()
              resetInterior()
              
              navigate('/customcars')

            }
            catch (err) {
              console.error('Failed to update car:', err)
              alert('Failed to update car. Please try again.')
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

            <div id="customization-options" className="car-options">
                <button className="btn btn-primary" onClick={handleExterior}>EXTERIOR</button>
                <button className="btn btn-primary" onClick={handleRoof}>ROOF</button>
                <button className="btn btn-primary" onClick={handleWheels}>WHEELS</button>
                <button className="btn btn-primary" onClick={handleInterior}>INTERIOR</button>
            </div>

            <ExteriorModal />
            <RoofModal />
            <WheelsModal />
            <InteriorModal />
            
            <div className='car-content'>
                <div className='left-section'>
                    <div className='price-section'>
                        <span className='coin-icon'>💰</span>
                        <span className='price'>${currentPrice}</span>
                    </div>
                    
                    <div className='buttons'>
                        <button className='delete-btn' onClick={handleUpdate}>UPDATE</button>
                        <button className='delete-btn' onClick={handleDelete}>DELETE</button>
                    </div>
                </div>
                
                <div className='images-grid'>
                    <div className='image-card'>
                        {(exteriorChoice?.img || car.exterior_img) ? (
                            <img src={exteriorChoice?.img || car.exterior_img} alt={exteriorChoice?.name || car.exterior_name} />
                        ) : (
                            <div className='placeholder'>Exterior</div>
                        )}
                    </div>
                    <div className='image-card'>
                        {(roofChoice?.img || car.roof_img) ? (
                            <img src={roofChoice?.img || car.roof_img} alt={roofChoice?.name || car.roof_name} />
                        ) : (
                            <div className='placeholder'>Roof</div>
                        )}
                    </div>
                    <div className='image-card'>
                        {(wheelsChoice?.img || car.wheels_img) ? (
                            <img src={wheelsChoice?.img || car.wheels_img} alt={wheelsChoice?.name || car.wheels_name} />
                        ) : (
                            <div className='placeholder'>Wheels</div>
                        )}
                    </div>
                    <div className='image-card'>
                        {(interiorChoice?.img || car.interior_img) ? (
                            <img src={interiorChoice?.img || car.interior_img} alt={interiorChoice?.name || car.interior_name} />
                        ) : (
                            <div className='placeholder'>Interior</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCar