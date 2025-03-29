const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');
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
        select: false
    }
})

//encrypting the password
userSchema.statics.hashPassword = async (password)=>{
    return await bcrpyt.hash(password, 10);
}

//method for comparing password
userSchema.methods.isValidPassword = async ()=>{
    return await bcrpyt.compare(passsword, this.password);
}

//method for creating a JWT token
userSchema.methods.generateJWT = () => {
  return jwt.sign({ email: this.email }, process.env.JWT_SECRET);
}


const User = mongoose.model('user', userSchema);

module.exports = User;