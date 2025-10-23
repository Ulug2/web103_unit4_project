import React, { useState, useEffect } from 'react'
import useRoofModal from '../modals/RoofModal'
import useWheelsModal from '../modals/WheelsModal'
import useInteriorModal from '../modals/InteriorModal'
import useExteriorModal from '../modals/ExteriorModal'
import '../App.css'
import { createCar } from '../services/CarsApi'
 
const CreateCar = () => {
  const [isConvertible, setConvertable] = useState(false)

  const [showExterior, setShowExterior] = useState(false)
  const [showRoof, setShowRoof] = useState(false)
  const [showWheels, setShowWheels] = useState(false)
  const [showInterior, setShowInterior] = useState(false)
  const [price, setPrice] = useState(75000)
 
  const { ExteriorModal, choice: exteriorChoice, resetChoice: resetExterior } = useExteriorModal(showExterior)
  const { RoofModal, choice: roofChoice, resetChoice: resetRoof } = useRoofModal(showRoof, isConvertible)
  const { WheelsModal, choice: wheelsChoice, resetChoice: resetWheels } = useWheelsModal(showWheels)
  const { InteriorModal, choice: interiorChoice, resetChoice: resetInterior } = useInteriorModal(showInterior)

  const [name, setName] = useState("")
  

  // Update price when choices change
  useEffect(() => {
    const basePrice = 75000
    const totalPrice = basePrice +
      (exteriorChoice?.cost || 0) +
      (roofChoice?.cost || 0) +
      (wheelsChoice?.cost || 0) +
      (interiorChoice?.cost || 0)
    setPrice(totalPrice)
  }, [exteriorChoice, roofChoice, wheelsChoice, interiorChoice])
 
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
 
  const handleCreate = async () => {
    setShowExterior(false)
    setShowRoof(false)
    setShowWheels(false)
    setShowInterior(false)
    const payload = {
      name,
      base_price: 75000,
      total_price: price,
      interior_name: interiorChoice?.name ?? null,
      interior_img: interiorChoice?.img ?? null,
      interior_cost: interiorChoice?.cost ?? 0,
      exterior_name: exteriorChoice?.name ?? null,
      exterior_img: exteriorChoice?.img ?? null,
      exterior_cost: exteriorChoice?.cost ?? 0,
      roof_name: roofChoice?.name ?? null,
      roof_img: roofChoice?.img ?? null,
      roof_cost: roofChoice?.cost ?? 0,
      wheels_name: wheelsChoice?.name ?? null,
      wheels_img: wheelsChoice?.img ?? null,
      wheels_cost: wheelsChoice?.cost ?? 0,
    }
    try {
      const res = await createCar(payload)
      console.log('Created car:', res)
    
      setName("")
      setConvertable(false)
      setPrice(75000)
      
      resetExterior()
      resetRoof()
      resetWheels()
      resetInterior()
    } catch (err) {
      console.error('Failed to create car:', err)
    }
  }
 
  return (
    <div>
      <div className='create-car'>
        <label className='convertible'>
          <input 
            type="checkbox" 
            className='isconvertible'
            checked={isConvertible}
            onChange={(e) => {
              setConvertable(e.target.checked)
            }}
          />
          Convertible
        </label>
 
        <div id="customization-options" className="car-options">
          <button className="btn btn-primary" onClick={handleExterior}>EXTERIOR</button>
          <button className="btn btn-primary" onClick={handleRoof}>ROOF</button>
          <button className="btn btn-primary" onClick={handleWheels}>WHEELS</button>
          <button className="btn btn-primary" onClick={handleInterior}>INTERIOR</button>
        </div>
 
        <div className="create-car-name">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="My New Car"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button
            type="button"
            className="btn btn-primary create-car-button"
            onClick={handleCreate}
          >
            CREATE
          </button>
        </div>
      </div>
 
      <ExteriorModal />
      <RoofModal />
      <WheelsModal />
      <InteriorModal />
 
      <div className="price-badge">
        <span className="price-icon">🪙</span>
        <span className="price-value">${price}</span>
      </div>
 
    </div>
  )
}
 
export default CreateCar