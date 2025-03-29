const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//User schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [6, 'Email must be longer than 6 characters'],
        maxLength: [50, 'Email must not be longer than 50 characters']
    },

    password: {
        type: String,
        select: true
    }
})

//encrypting the password
userSchema.statics.hashPassword = async (password)=>{
    return await bcrypt.hash(password, 10);
}

//method for comparing password
userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

//method for creating a JWT token
userSchema.methods.generateJWT = function() {
    return jwt.sign({ email: this.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

const User = mongoose.model('user', userSchema);

module.exports = User;