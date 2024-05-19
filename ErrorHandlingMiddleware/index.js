const express = require('express');
const validator = require("validator")

const app = express();
const port = 3000;

app.use(express.json());

// Error handling middleware for validation errors
app.use((err, req, res, next) => {
    res.status(400).json({ error: err.message });
});

// Data validation middleware
function valRegistration(req,res,next){
    const { firstName, lastName , password ,email , phoneNumber} = req.body;

    // Check name
    if (firstName[0] !== firstName[0].toUpperCase() || lastName[0] !== lastName[0].toUpperCase()) {
        return res.status(400).json({ error: 'First name and last name must start with a capital letter.' });
    }

    // Check password
    if(password.length<8){
        return res.status(400).json({ error: 'Password minimum length shoul be 8' });
    }
    if(!isValidPassword(password)){
        return res.status(400).json({ error: 'Password contains at least one special character, one uppercase letter, and one numeric character' });
    }

    // Check email
    if(!validator.isEmail(email)){
        return res.status(400).json({ error: 'Invalid email address format' });
    }

    // Check phone number 
    if(phoneNumber.length<10){
        return res.status(400).json({error:'phone number has a minimum length of 10 digits.'})
    }
    next();
}

// name and last name
app.post('/register',valRegistration, (req, res) => {
    res.status(201).json({ message: 'User registered successfully!' });
});

// Error handling middleware for other errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

//Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function isValidPassword(password){
    let hasUpperCase = false;
    let hasNumeric = false;
    let hasSpecialChar = false;

    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;

    for(let i=0;i<password.length;i++){
        const char = password[i];

        if(!hasUpperCase && char>= 'A' && char<='Z'){
            hasUpperCase=true;
        }
        else  if(!hasNumeric && char>= '0' && char<='9'){
            hasNumeric=true;
        }
        else if(!hasSpecialChar && specialChars.test(char)){
            hasSpecialChar=true;
        }

        if(hasUpperCase && hasNumeric && hasSpecialChar){
            return true;
        }
    }
    return false;
}