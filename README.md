![Alt text](https://res.cloudinary.com/dklv0c2br/image/upload/v1724438577/zamzamshop_ellk01.png)

Here's a good description you can use for your GitHub repository that includes both the frontend and backend .env.example files, detailing the necessary environment variables:

Environment Variables
This project contains both frontend and backend configurations. To ensure the application runs smoothly, please configure the following environment variables in the appropriate .env files for both the frontend and backend.

Frontend Environment Variables (.env.example):
MONGODB_URI:
The MongoDB connection string to connect the frontend to the database.
Example: MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority

TOKEN_SECRET_KEY:
The secret key used for token encryption and signing. Make sure to use a strong, random value.
Example: TOKEN_SECRET_KEY=your-secret-key

FRONTEND_URL:
The primary base URL of your frontend application.
Example: FRONTEND_URL=https://your-frontend-url.com

FRONTEND_URL2, FRONTEND_URL3, FRONTEND_URL4:
Additional frontend URLs if your app uses multiple environments (e.g., staging, development).
Example: FRONTEND_URL2=https://your-staging-url.com

PORT:
The port number on which the frontend application will run.
Example: PORT=3000

Backend Environment Variables (.env.example):
REACT_APP_CLOUD_NAME_CLOUDINARY:
The Cloudinary cloud name for accessing the media storage service.
Example: REACT_APP_CLOUD_NAME_CLOUDINARY=your-cloud-name

REACT_APP_UPLOAD_PRESET_CLOUDINARY:
The Cloudinary upload preset, required for securely uploading files.
Example: REACT_APP_UPLOAD_PRESET_CLOUDINARY=your-upload-preset
