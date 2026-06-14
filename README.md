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

## Future Enhancements

* MongoDB Integration
* JWT Authentication
* Input Validation
* User Authorization
* Cloud Deployment



GitHub: https://github.com/KChakritha143
