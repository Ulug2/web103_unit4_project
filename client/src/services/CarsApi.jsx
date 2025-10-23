// Get all cars
export const getAllCars = async () => {
    try {
        const response = await fetch('/api')
        if (!response.ok) {
            throw new Error("Failed to fetch cars")
        }
        return await response.json()
    }
    catch (error) {
        console.error('Error fetching cars:', error)
        throw error
    }
}

// Get car by id
export const getCarById = async (id) => {
    try {
        const response = await fetch(`/api/${id}`)
        if (!response.ok) {
            throw new Error("Failed to fetch cars")
        }
        return await response.json()
    }
    catch (error) {
        console.error('Error fetching cars:', error)
        throw error
    }
}


// Create a car
export const createCar = async (carData) => {
    try {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carData)
        }
        const response = await fetch('/api', options)

        if (!response.ok) {
            throw new Error('Failed to create car')
        }
        return await response.json()
    }
    catch (error) {
        console.error('Error fetching cars:', error)
        throw error
    }
}

// Update car
export const updateCar = async (id, carData) => {
    try {
        const response = await fetch(`/api/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData)
        })
        if (!response.ok) {
            throw new Error('Failed to update car')
        }
        return await response.json()
    } catch (error) {
        console.error('Error updating car:', error)
        throw error
    }
}

// Delete a car
export const deleteCar = async (id) => {
    try {
        const response = await fetch(`/api/${id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error('Failed to delete car')
        }
        return await response.json()
    } catch (error) {
        console.error('Error deleting car:', error)
        throw error
    }
}