import express, { Request, Response } from "express";
import * as carService from '../services'
import { VINDetails} from '../Interfaces'

export const router = express.Router()



//test route
router.get('/', async(req:Request, res:Response)=>{
 return res.status(200).json({msg:"test route works"})
})



// @route GET /api/v1/cars/makes 
// @desc Returns all makes
// @access PUBLIC
// @return [make_1, make_2 ... make_n] */
router.get('/api/v1/cars/makes', async(req: Request, res: Response)=>{

    try { 

        const makes: string[] | string =  await carService.findMakes();

        return makes.length ? res.status(200).json({data: makes}) : 
                              res.status(404).json("no car makes found")

    }catch(err) {
        return res.status(500).send({err})
    }

})



// @route GET /api/v1/cars/models/:make/:year
// @desc Returns all makes
// @access PUBLIC
// @return [{}{}...{}] */
router.get('/api/v1/cars/models/:make/:year', async(req:Request, res:Response)=>{
    
    try {

        const make : string = req.params.make;
        const year : number = parseInt(req.params.year)
        const models : Object[] | string = await carService.findModels(make, year)
        
        return models.length ? res.status(200).json({data: models}) : 
                               res.status(404).json({err: "No model was found for this make and year"})

    }catch(err){

        return res.status(500).json({err})

    }
    

})



// @route GET /api/v1/cars/:id 
// @desc - return year  car make and model given the VIN 
// @access - PUBLIC
// @Return [{yr, make, model }]
router.get('/api/v1/cars/details/:vin', async(req:Request, res:Response)=>{
    
    try {

        const vin: string = req.params.vin
        const details: VINDetails | [] | string = await carService.getDetailsWithVIN(vin)

        
        return Object.keys(details).length !== 0 
        && typeof(details) !== 'string'
        ? res.status(200).json({data:details})
        :res.status(404).json({err:"No details were found for this VIN in the database; ensure that the VIN is correct"})

    } catch(err) {
        return res.status(500).json({err})
    }

})




