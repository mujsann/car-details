import { expect } from 'chai';
import { Application } from 'express';
import request from 'supertest';

import startServer from '../src/server';
const app:Application = startServer()

// import mock data for car models
// let mock_models: Object[] = [1,2]


describe("Check server ", function () {
    it("server is up and running", function (done) {
        request(app).get("/").expect(200, done).expect("Welcome to car details APIs");
    });

});

describe('Car details requests', function () {

    // const model_data = [
    //     {year: 2011, make:"honda", details: mock_models[1] },
    //     {year: 2011, make:"honda", details: mock_models[1] },
    //     {year: 2011, make:"honda", details: mock_models[1] },
    // ]

    // const details_data =  [
    //     {   VIN: "3A8FY58B08T128865",
    //         year: "2008",
    //         make: "CHRYSLER",
    //         model: "PT Cruiser"
    //     },

    //     {
    //         VIN : "5UXWX7C5*BA",
    //         year: "2011",
    //         make: "BMW",
    //         model: "X3"
    //     },

    //     {
    //         VIN: "1M1AA08Y1TW007911",
    //         year: "1996",
    //         make: "MACK",
    //         model: "CH"
    //     }

    // ]

    // const details_map = new Map()
    // details_data.forEach(data=>{
    //     details_map.set(data.VIN, {year:data.year, make:data.make, model:data.model})
    // })
    

    

    it("should fetch all car makes ", (done) => {
        const response = request(app).get('/api/v1/cars/makes')
        response.expect(200);
        done();
    })


    it("should return car models given make, year", (done) => {
        const response = request(app).get('/api/v1/cars/models/honda/2015')
        response.expect(200, done);
    })


    it("should return 404 if no model was found, given make and year", function (done) {
        const response = request(app).get('/api/v1/cars/models/hondu/2015')
        response.expect(404).expect({ err: "No model was found for this make and year" }, done)

    })


    it('should return year make and model of a car, given the vim', function (done) {

        this.timeout(5000)
        const response = request(app).get("/api/v1/cars/details/3N1AB6AP7BL729215")
        response.expect(200)
            .expect({
                data: {
                    "year": "2011",
                    "make": "NISSAN",
                    "model": "Sentra"
                }
            }, done)


    });

    it("should return 404 if no details were found for a car, given a VIN", (done) => {
        const response = request(app).get('/api/v1/cars/details/N9KN1ABP7BL8f9215888')
        response.expect(404).expect({ err: "No details were found for this VIN in the database; ensure that the VIN is correct" }, done)

    })

});







