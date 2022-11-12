### DOCUMENTATION
This API was built with NodeJS, Express, MongoDB, and Typescript. It is a delivery API that creates orders for customers and keeps track of them. It also includes user authentication and sessions using JWT "RS256" algorithm.

### Models
A model represents the documents that will be present in the MongoDB database. These models are created using schemas.
 
### Schemas
Schemas are used to create data constructs. If these schemas are called within the application, and a data construct that does not match the previously defined schema is received, the application will throw an error. The Zod npm package was used to create the schemas.

### Services
All services are described in their respective files in the Service folder. 
The services are helper functions that perform CRUD (Create, Find, Update and Delete) operations. They make use of Mongoose functions such as create, findOne, findOneAndUpdate, and deleteOne. The service is the part of the application that directly communicates with the MongoDB database to make any changes to it.

### Controllers
This is where the logic of the application is stored. The controllers are functions that combine the helper functions from the services file to perform functions upon hitting an endpoint.

### Middleware
These are functions with access to the application's request-response cycle, and can only be applied using routes. We can access and modify request and response data using middleware.

### Routes
A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.), a URL path/pattern, and a function that is called to handle that pattern. ~ MDN docs

### APP Life Cycle
User registers by entering their username, email, password, and password confirmation. These fields are not optional. They are needed to create the User Model in MongoDB, and an error will be thrown if the schema does not match this. The created user will not have administrator permissions, therefore some routes in the app will be inaccessible to them. The user will then log in, which creates JWT access and refresh tokens using the RS256 algorithm. The user can then update their profile if they would like to and log out by setting the access and refresh tokens to null. The user can create a cart, add products to the cart, and finally create an order.