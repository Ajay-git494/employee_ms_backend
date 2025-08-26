# Employee Management System - Backend Setup



## Setup & Installation

1. **Clone the repository**(This is example git url because my i do not upload the project on gitgub present)
git clone https://github.com/yourusername/employee-management-backend.git
cd employee-management-backend
open project in vs code(or any development environment) 
open terminal and run following command


2. **Install dependencies**
     npm install


3. **Create a `.env` file**
cp .env.example .env


4. **Update the `.env` file with your database credentials and JWT secret:**
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=employee_management
JWT_SECRET=your_jwt_secret


---

## Database Setup

1. **Create the database**
CREATE DATABASE employee_portal;

2. **Run migrations**
npx knex migrate:latest


3. **Seed default data** (for default manager and passsword generation)
npx knex seed:run


## Running the Server

1. **Start the server**
node index.js

> if you are using nodemon then run using this command
nodemon

2. **Access the server**
http://localhost:4000

