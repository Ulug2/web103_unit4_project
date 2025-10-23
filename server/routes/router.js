import express from 'express'
import carsController from '../controllers/carsController.js';

const router = express.Router()

router.get('/', carsController.getCars)

router.get('/:id', carsController.getCarsById)

router.post('/', carsController.createCar)

router.delete('/:id', carsController.deleteCar)

router.patch('/:id', carsController.editCar)

export default router;