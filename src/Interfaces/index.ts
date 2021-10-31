import { Interface } from "readline";


export interface Car {
   
    vin : number
    make: string
    model: string
    year:string
       
} 

export interface Cars {
    [key:number] : Car
}





export interface AllMakesDetails {
    Make_ID: number
    Make_Name : string
}

export interface VINDetails {

    year : number
    make : string
    model : string

}





