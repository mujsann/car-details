
import { AllMakesDetails, VINDetails } from "../Interfaces" // data models
import axios from 'axios';
import { json } from "stream/consumers";



// Service Methods
// 1. Get a list of all makes (e.g. Toyota, Honda, etc.)
export const findMakes = async (): Promise<string[] | string> => {

  try {

    let { data } = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json')
    let all_makes: string[] = [];
    let all_cars: AllMakesDetails[] = await data.Results
    all_cars.map(car => all_makes.push(car.Make_Name))

    return all_makes

  } catch (err) {
    return `${err}`
  }

}


// 2. Get a list of all models given a make and year
export const findModels = async (make: string, year: number): Promise<Object[] | string> => {

  try {

    let { data } = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=JSON`)
    return data.Results

  } catch (err) {
    return `${err}`
  }


}


// 3. Given a VIN, get the year, make, and model of the vehicle (e.g. for 3N1AB6AP7BL729215: 2011 Nissan Sentra)
export const getDetailsWithVIN = async (vin: string): Promise<VINDetails | [] | string> => {

  try {

    const { data } = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`)

    let result: VINDetails | []
    result = {
      year: data.Results[0].ModelYear,
      make: data.Results[0].Make,
      model: data.Results[0].Model
    }

    return result.year && result.make.length && result.model.length
      ? result : []

  } catch (err) {
    return `${err}`
  }

}



