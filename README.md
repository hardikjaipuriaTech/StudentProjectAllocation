![image](https://github.com/user-attachments/assets/32586bea-de3c-46fd-86e0-9986f3789f3c)

Front-End Architecture (Angular)
The front-end of the application is structured using Angular's component-based architecture. Different components are created for various UI elements, such as login, signup, project list view, project proposal, etc. Each component represents a specific part of the application's user interface.

Angular services are used to manage data and perform actions that are shared across multiple components. Services handle interactions with the backend, such as retrieving project data, submitting project choices, and user authentication. Services ensure separation of concerns and reusable code.

Angular pipes are used for data transformation and formatting. Pipes are used to format dates, display user-friendly text, and filter project lists based on various criteria.

Backend Application
This repository contains the backend of the application, built using Node.js and Express. The backend serves as the core of the application, handling API requests, processing data, and interacting with the database. It is designed to be efficient, scalable, and easy to integrate with the frontend.

Features
RESTful API: Built using Express to handle HTTP requests and responses.

Non-blocking Operations: Leverages Node.js for efficient, asynchronous server-side operations.

Database Integration: Uses MongoDB as the NoSQL database to store user data, project information, and allocation details.

ODM Library: Utilizes Mongoose for defining schemas, models, and interacting with MongoDB.

JSON Data Exchange: Data is exchanged between the frontend and backend in JSON format for seamless communication.
