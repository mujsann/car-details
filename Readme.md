# CarDetails 

This is a typescript/nodeJS backend API service for retrieving car details. Upon receiving a request from the client, the API endpoints make appropriate requests to National Highway Traffic Safety Administration (NHTSA) APIs to retrieve the car's information. The API endpoints of this project are publicly available at [https://www.carshair.herokuapp.com/](https://www.carshair.herokuapp.com/)


This app has 3 endpoints:

**1. GET /api/v1/cars/makes.**  
  This endpoint calls the NHTSA's '/vehicles/GetAllMakes' to retrieve car makes and returns all car makes after filtering the raw data e.g ("toyota", "honda).  

**2. GET /api/v1/cars/models/{make}/{year}**      
This endpoint takes parameters **make** and **year** of the car's model and returns all models of cars produced by the **make** for the **year**.  
 
**3. GET /api/v1/cars/details/{VIN}**.  
This endpoint takes the VIN of a car as a parameter and returns the year, make and model of the car. 

You can check out the swagger.io API documentation [file](https://github.com/mujsann/car-details/blob/main/swagger-api.yml) for this app

## Usage

To use this project, clone this git repo.

```bash
git clone https://www.github.com/mujsann/car-details
```

Install all the dependencies. 

```bash
npm install
  ```
Now you need to declare your environment variables. In the root directory, open a **'.env'** file and type the port number in it. 

```env
PORT=5000
```

To run the app locally, run it in development mode.
```bash
npm run dev
```
You'll see in your console that the server has started running on port 5000. Now you can go to your browser and test out the three endpoints on localhost:5000 

```javascript
/** Example requests **/

// 1.localhost:5000/api/v1/cars/makes
// 2.localhost:5000/api/v1/cars/models/honda/2015
// 3.localhost:5000/api/v1/cars/details/3N1AB6AP7BL729215
```
## Run Tests
This app uses  **supertest** assertion library. Supertest provides a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API. To run the test for the app, call the test script. 
```bash
npm run test
```

## Run as a Docker Image
To run this app in a Docker Container, pull the Image from the Docker Hub registry. 

```bash
docker pull gboyebaba/car-details
```

Then you can start the app by running the Docker Image
```bash
docker run gboyebaba/car-details:latest
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
