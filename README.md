# The Data Hub

A RESTful API server built with Node.js and Express.js that demonstrates CRUD (Create, Read, Update, Delete) operations for blog posts. The project uses an in-memory data store and supports API testing through Postman and automated test scripts.

## Features

* RESTful API Architecture
* Create Blog Posts
* Retrieve All Blog Posts
* Retrieve a Single Blog Post
* Update Existing Blog Posts
* Delete Blog Posts
* JSON Request and Response Handling
* Automated API Testing
* Postman API Testing Support

## Technologies Used

* Node.js
* Express.js
* JavaScript
* REST API
* Postman

## Project Structure

```text
The-Data-Hub/
│
├── server.js
├── test-api.js
├── package.json
├── package-lock.json
└── node_modules/
```

## Installation

1. Clone the repository

```bash
git clone https://github.com/KChakritha143/The-Data-Hub.git
```

2. Navigate to the project directory

```bash
cd The-Data-Hub
```

3. Install dependencies

```bash
npm install
```

## Running the Server

Start the server using:

```bash
node server.js
```

Server runs on:

```text
http://localhost:5000
```

## API Endpoints

### Get All Posts

```http
GET /posts
```

### Get Single Post

```http
GET /posts/:id
```

### Create Post

```http
POST /posts
```

Example Request Body:

```json
{
  "id": "1",
  "title": "Node.js Basics",
  "content": "Learning REST APIs",
  "author": "Chakritha"
}
```

### Update Post

```http
PUT /posts/:id
```

Example Request Body:

```json
{
  "title": "Advanced Node.js",
  "content": "Updated CRUD Operations Tutorial",
  "author": "Chakritha"
}
```

### Delete Post

```http
DELETE /posts/:id
```

## Testing with Postman

The API can be tested using Postman with the following workflow:

1. POST /posts
2. GET /posts
3. GET /posts/:id
4. PUT /posts/:id
5. DELETE /posts/:id

## Automated Testing

Run automated API tests using:

```bash
node test-api.js
```

This script validates API functionality and ensures CRUD operations work correctly.

## Architecture Flow

```text
Client (Postman)
       ↓
HTTP Request
       ↓
Express Server
       ↓
Route Handler
       ↓
In-Memory Database (blogPosts)
       ↓
JSON Response
       ↓
Client
```

## Live URL 

https://the-data-hub-zwil.onrender.com

## Screenshots

### Local Host : 5000
<img width="1912" height="1088" alt="Screenshot 2026-06-15 191155" src="https://github.com/user-attachments/assets/bc93584f-af5d-4a75-bba3-bebd5c39e0c3" />

## CRUD (Create,Read,Update and Delete) Operations

### POST
<img width="1918" height="1137" alt="Screenshot 2026-06-14 093233" src="https://github.com/user-attachments/assets/78dca12b-3638-4423-92a0-924686ad11fb" />

### GET all posts
<img width="1918" height="1143" alt="Screenshot 2026-06-14 093323" src="https://github.com/user-attachments/assets/29fbff71-838a-4033-bf68-9391ec14d636" />

### GET Single post
<img width="1917" height="1147" alt="Screenshot 2026-06-14 093302" src="https://github.com/user-attachments/assets/62ea4b66-204e-46e7-8b3e-d25e3e11597a" />

### Update post
<img width="1918" height="1143" alt="Screenshot 2026-06-14 102515" src="https://github.com/user-attachments/assets/6edf1015-bf05-4b8d-8176-39d9b8acccd1" />

### Delete Post
<img width="1915" height="1137" alt="Screenshot 2026-06-14 093345" src="https://github.com/user-attachments/assets/3dc14aa0-580e-4b0d-818a-22007515cfbb" />

### 404 NOT FOUND Error
<img width="1918" height="1137" alt="Screenshot 2026-06-14 102538" src="https://github.com/user-attachments/assets/6f130ed8-b335-4cc9-973d-e479e1fcd352" />

## Future Enhancements

* MongoDB Integration
* JWT Authentication
* Input Validation
* User Authorization
* Cloud Deployment
