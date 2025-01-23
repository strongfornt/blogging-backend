
## Blog Project
The Blog Project is a backend system designed for a blogging platform where users can write, update, and delete their blogs. The platform includes two roles: Admin and User. Admins have special permissions to manage users and their blogs, while users can perform CRUD operations on their own blogs. The backend is secured with authentication, role-based access control, and provides a public API for viewing blogs with search, sort, and filter functionalities.

## Admin credentials

- "email": "admin@example.com",
-  "password": "admin123"


##  API Endpoints
### Production base url -
- https://blogginbackend.vercel.app/
###  Authentication
- POST /api/auth/register - Register a new user.
- POST /api/auth/login - Login endpoint.

### Blog Management (user)
- POST & GET /api/blogs - For create and Get blogs. 
- PATCH & DELETE /api/blogs/:id - For update a specific blog and delete. 

### Admin Action
- POST /api/admin/users/:userId/block - For block a user
- DELETE /api/admin/blogs/:id -Delete specific blog


## Data Formet

- You have to follow this formet to send data via payload
- {
    "body": {
  "title": "Updated Blog Title",
  "content": "Updated content."
}
}


## Features

- Authentication: Secure user login and registration.
- Role-Based Access Control: Differentiated permissions for Admin and User roles.
- CRUD Operations: Users can create, update, and delete their blogs.
- Public API: Allows searching, sorting, and filtering blogs.
- Admin Actions: Admins can block users and delete any blog.
- Error Handling: Consistent error responses for validation, authentication, and server errors.

## 3. Technologies Used

- Backend Framework: Express.js with TypeScript
- Database: MongoDB with Mongoose
- Environment Management: dotenv
- Validation: Zod


## Locally Project Setup Instructions
### Clone the Repository:
- git clone https://github.com/strongfornt/blogging-backend.git
- cd blogging-backend

### Install Dependencies:
- npm install
### Configure Environment Variables:
- Create a .env file in the root directory.
#### Add the following variables:
- NODE_ENV= development

- PORT=3000

- DB_URL= mongodb+srv://:@cluster0.v2tnkbl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

- BCRYPT_SALT_ROUND=12

- JWT_ACCESS_SECRET = a074962f76557adc274843192e6fb82696f515ee103243b8e788d2c3885dc2aa

- JWT_ACCESS_EXPIRES_IN = 1d

### Run the Application:
- tsc --watch
- node dist/server.js (another terminal)