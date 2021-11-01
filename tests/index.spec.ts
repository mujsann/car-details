import * as chai from 'chai';
import chaiHttp = require('chai-http');
import request from 'supertest';

import startServer from '../src/server';
const app = startServer()



chai.use(chaiHttp);
const expect = chai.expect;
const should = require('chai').should();

describe("Check server ", function () {
    it("server is up and running", function (done) {
        request(app).get("/").expect(200, done);
    });

});

describe('Car details requests', function () {

    // beforeEach(async () => {
    //     // await Products.sync();
    // })

    // afterEach(async () => {
    //     // await Products.drop();
    // })

    it("should fetch all car makes ", (done) => {
        const response = request(app).get('/api/v1/cars/makes')
        response.expect(200);
        done();
    })


    it("should return car models given make, year", (done) => {
        // const results = await setup(product_1, product_2, product_3, product_4);
        const response = request(app).get('/api/v1/cars/models/honda/2015')
        response.expect(200, done);
    })

    // it should return 404  and err message if no model is found for the make and year
    it("should return 404 if no car model was found", (done) => {
        const response = request(app).get('/api/v1/cars/models/hondu/2015')
        response.expect(404).expect({err:"No model was found for this make and year"}, done)

    })



    it('should return year make and model of a car, given the vim', function (done) {

        this.timeout(5000)
        const response = request(app).get("/api/v1/cars/details/3N1AB6AP7BL729215")
        response.expect(200)
            .expect( {data: {
                "year": "2011",
                "make": "NISSAN",
                "model": "Sentra"
            }}, done)


    });


    //it should return 404 if no details where found for the VIN provided
    it("should return 404 if no details were found, given a VIN", (done) => {
        const response = request(app).get('/api/v1/cars/details/N9KN1ABP7BL8f9215888')
        response.expect(404).expect({err:"No details were found for this VIN in the database; ensure that the VIN is correct"}, done)

    })

});







