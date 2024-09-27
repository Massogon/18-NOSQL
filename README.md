# Thoughts and Users API

This project is a **MERN stack** (MongoDB, Express, React, Node.js) application that allows users to create thoughts, react to others' thoughts, and manage friendships. Users can create accounts, post thoughts, add reactions to thoughts, and manage a friends list.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Models](#models)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Installation

To run the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```

3. Install server dependencies:
   ```bash
   npm install
   ```

4. Set up MongoDB:
   Ensure MongoDB is running locally or provide a remote MongoDB URI.

5. Start the server:
   ```bash
   npm start
   ```

6. (Optional) For development, use nodemon to automatically restart the server on changes:
   ```bash
   npm run dev
   ```

## Usage

After starting the server, you can interact with the API through a tool like **Postman**, **Insomnia**, or directly through **HTTP requests**.

The app provides various functionalities, such as:

- **Creating a user account**
- **Posting thoughts**
- **Adding reactions to thoughts**
- **Managing friends (adding/removing friends)**

### Example Usage

1. **Create a user:**
   ```bash
   POST /users
   {
     "username": "johndoe",
     "email": "john@example.com"
   }
   ```

2. **Post a thought:**
   ```bash
   POST /users/:userId/thoughts
   {
     "thoughtText": "This is a new thought!"
   }
   ```

3. **Add a reaction to a thought:**
   ```bash
   POST /thoughts/:thoughtId/reactions
   {
     "reactionBody": "Great thought!",
     "username": "johndoe"
   }
   ```

## API Routes

Here are the key routes for interacting with the API:

### Users

- **GET /users**: Get all users
- **GET /users/:id**: Get a single user by ID
- **POST /users**: Create a new user
- **PUT /users/:id**: Update user information
- **DELETE /users/:id**: Delete a user

#### Friends

- **POST /users/:userId/friends/:friendId**: Add a friend
- **DELETE /users/:userId/friends/:friendId**: Remove a friend

### Thoughts

- **GET /thoughts**: Get all thoughts
- **GET /thoughts/:id**: Get a single thought by ID
- **POST /users/:userId/thoughts**: Create a new thought for a user
- **PUT /thoughts/:id**: Update a thought by ID
- **DELETE /thoughts/:id**: Delete a thought by ID

#### Reactions

- **POST /thoughts/:thoughtId/reactions**: Add a reaction to a thought
- **DELETE /thoughts/:thoughtId/reactions/:reactionId**: Remove a reaction from a thought

## Models

### User Model

```js
{
  username: String,  // Unique username
  email: String,     // Unique and valid email
  thoughts: [Thought],  // Array of thoughts posted by the user
  friends: [User],   // Array of user friends
}
```

### Thought Model

```js
{
  thoughtText: String,   // Text content of the thought (max 280 chars)
  createdAt: Date,       // Date when the thought was created
  username: String,      // Username of the user who posted the thought
  reactions: [Reaction], // Array of reactions on the thought
}
```

### Reaction Subdocument

```js
{
  reactionId: ObjectId,  // Unique reaction ID
  reactionBody: String,  // Text content of the reaction (max 280 chars)
  username: String,      // Username of the user who posted the reaction
  createdAt: Date        // Date when the reaction was created
}
```

## Technologies

- **Node.js**
- **Express.js**
- **MongoDB / Mongoose**
- **Apollo Client** (for front-end GraphQL interaction)
- **Chakra UI** (for UI components, if you're using React in the frontend)
- **GraphQL** (for API queries and mutations)



## License

This project is licensed under the MIT License.
