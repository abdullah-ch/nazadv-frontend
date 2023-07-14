# Frontend Code README

This README file provides information on the frontend code for the project. It includes details about the technology stack, features, and instructions on how to run the code.

## Technology Stack

The frontend code is built using the following technologies:

- React: A JavaScript library for building user interfaces.
- Formik: A library for building forms in React.
- Tailwind CSS: A utility-first CSS framework for styling user interfaces.
- Yup: A JavaScript schema validation library for form validation.

## Features

The frontend code includes the following features:

1. Retrying Failed APIs with Stale Access Token in Axios: The code handles failed API requests by automatically retrying them with a stale access token, ensuring a smoother user experience.
2. Create, Update, Delete, and Get Product List: The code provides functionality for creating, updating, deleting, and retrieving a list of products.
3. Multilingual Feature (Arabic and English): The code supports a multilingual feature, allowing the user to switch between Arabic and English languages.

## How to Run

To run the frontend code, follow these steps:

1. Install dependencies: Open a terminal window and navigate to the project directory. Run the command `npm install` to install all the necessary dependencies.

2. Set up environment variables: Create a `.env` file in the root directory of the project and add the following line:

   ```
   REACT_APP_API=http://localhost:5000/
   ```

   This environment variable sets the API endpoint to `http://localhost:5000/`. Adjust the URL as needed if your API is hosted elsewhere.

3. Start the development server: Run the command `npm start` to start the development server. This will compile the code and open the application in your default browser.

   The development server provides hot reloading, meaning any changes you make to the code will automatically reflect in the browser without the need to restart the server.

4. Access the application: Once the development server is running, you can access the application by visiting the provided URL in your browser. You can interact with the features of the application from there.

## Additional Information

If you encounter any issues or need further assistance, please refer to the documentation or reach out to the project team for support.

Thank you for using our application!
