# Express Registration Validation

This Express application provides a registration endpoint with data validation for first name, last name, password, email, and phone number.

## Getting Started

1. Clone the this repository
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## API Endpoint

- **POST /register**: Endpoint for user registration.
  - Request Body:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "password": "StrongPassword123!",
      "email": "john.doe@example.com",
      "phoneNumber": "1234567890"
    }
    ```
  - Response (Success):
    ```json
    {
      "message": "User registered successfully!"
    }
    ```
  - Response (Error):
    ```json
    {
      "error": "Error message here"
    }
    ```

## Middleware Functions

### Data Validation Middleware (`valRegistration`)

- Validates the input data for registration:
  - First name and last name must start with a capital letter.
  - Password must be at least 8 characters long and contain at least one special character, one uppercase letter, and one numeric character.
  - Email must be in a valid format.
  - Phone number must have a minimum length of 10 digits.

## Error Handling

- Validation errors are handled using middleware to provide descriptive error messages in the response.
- Other errors are handled with a generic 500 error message.

## Dependencies

- [Express](https://www.npmjs.com/package/express): Web framework for Node.js.
- [Validator](https://www.npmjs.com/package/validator): Library for data validation.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.


