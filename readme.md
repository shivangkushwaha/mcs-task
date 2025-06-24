
# Collaborative Task Manager API

This is a simple **RESTful API** built with **Node.js (Express.js)** for a task management system. It supports user authentication (register/login) and task management, including CRUD operations and filtering tasks by status.

## Tech Stack

- **Backend:** Node.js (LTS), Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Password Hashing:** bcrypt
- **Validation:** Joi
- **Security:** Helmet, Input Sanitization
- **Testing:** Postman / cURL

## API Endpoints

### Authentication Endpoints

#### 1. **Register a User**

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

- **cURL Example:**
  ```bash
  curl -X POST http://localhost:5000/api/auth/register   -H "Content-Type: application/json"   -d '{"name": "John Doe", "email": "john.doe@example.com", "password": "password123"}'
  ```

- **Response:**
  ```json
  {
    "token": "your_jwt_token_here"
  }
  ```

#### 2. **Login a User**

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

- **cURL Example:**
  ```bash
  curl -X POST http://localhost:5000/api/auth/login   -H "Content-Type: application/json"   -d '{"email": "john.doe@example.com", "password": "password123"}'
  ```

- **Response:**
  ```json
  {
    "token": "your_jwt_token_here"
  }
  ```

---

### Task Management Endpoints (Requires JWT Authentication)

#### 1. **Create a Task**

- **URL:** `/api/tasks`
- **Method:** `POST`
- **Headers:** 
  - `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:**
  ```json
  {
    "title": "Complete project documentation",
    "description": "Document all the features of the project",
    "status": "in-progress",
    "assignedTo": "userId"  # Optional, replace with actual user ID
  }
  ```

- **cURL Example:**
  ```bash
  curl -X POST http://localhost:5000/api/tasks   -H "Authorization: Bearer <JWT_TOKEN>"   -H "Content-Type: application/json"   -d '{
    "title": "Complete project documentation",
    "description": "Document all the features of the project",
    "status": "in-progress",
    "assignedTo": "userId"  # Optional
  }'
  ```

- **Response:**
  ```json
  {
    "_id": "taskId",
    "title": "Complete project documentation",
    "description": "Document all the features of the project",
    "status": "in-progress",
    "createdBy": "userId",
    "assignedTo": "userId",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

#### 2. **Get All Tasks with Pagination & Status Filter**

- **URL:** `/api/tasks`
- **Method:** `GET`
- **Query Parameters:**
  - `page`: Page number (default: 1)
  - `limit`: Number of tasks per page (default: 10)
  - `status`: Status of tasks to filter by (optional: 'pending', 'in-progress', 'done')

- **cURL Example:**
  ```bash
  curl -X GET "http://localhost:5000/api/tasks?page=1&limit=10&status=pending"   -H "Authorization: Bearer <JWT_TOKEN>"
  ```

- **Response:**
  ```json
  [
    {
      "_id": "taskId",
      "title": "Complete project documentation",
      "description": "Document all the features of the project",
      "status": "pending",
      "createdBy": "userId",
      "assignedTo": "userId",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
  ```

#### 3. **Update a Task**

- **URL:** `/api/tasks/:id`
- **Method:** `PUT`
- **Headers:** 
  - `Authorization: Bearer <JWT_TOKEN>`
- **Request Body:**
  ```json
  {
    "title": "Update documentation",
    "description": "Add new section for task management",
    "status": "done",
    "assignedTo": "userId"  # Optional
  }
  ```

- **cURL Example:**
  ```bash
  curl -X PUT http://localhost:5000/api/tasks/<TASK_ID>   -H "Authorization: Bearer <JWT_TOKEN>"   -H "Content-Type: application/json"   -d '{
    "status": "done"
  }'
  ```

- **Response:**
  ```json
  {
    "_id": "taskId",
    "title": "Update documentation",
    "description": "Add new section for task management",
    "status": "done",
    "assignedTo": "userId",
    "createdBy": "userId",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

#### 4. **Delete a Task**

- **URL:** `/api/tasks/:id`
- **Method:** `DELETE`
- **Headers:** 
  - `Authorization: Bearer <JWT_TOKEN>`
- **cURL Example:**
  ```bash
  curl -X DELETE http://localhost:5000/api/tasks/<TASK_ID>   -H "Authorization: Bearer <JWT_TOKEN>"
  ```

- **Response:**
  ```json
  {
    "message": "Task deleted"
  }
  ```

---

## Error Handling

If a request is invalid (e.g., missing required fields, invalid JWT token), the API will respond with appropriate error messages.

### Example Error Responses:
- **Validation Errors:**
  ```json
  {
    "message": ""name" is required"
  }
  ```

- **Unauthorized Errors (Invalid Token):**
  ```json
  {
    "message": "Access denied"
  }
  ```

- **Forbidden Errors (Not Authorized to Access):**
  ```json
  {
    "message": "Not authorized"
  }
  ```

---

## Running the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-manager-api.git
   cd task-manager-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add your **MongoDB URI** and **JWT secret**:
   ```plaintext
   MONGO_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
