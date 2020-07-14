import express from 'express'
import ItemsControllers from './controllers/ItemsControllers'
import PointsController from './controllers/PointsController'
import multer from 'multer'
import multerConfig from './config/multer'
import { celebrate, Joi } from 'celebrate';

const pointsController = new PointsController()
const itemsControllers = new ItemsControllers()

const routes = express.Router()
const upload = multer(multerConfig)

routes.get('/items', itemsControllers.listar)



routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)
routes.post('/points', upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()
        })
    })
    , pointsController.create)


export default routes
