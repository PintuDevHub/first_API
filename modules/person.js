const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Define the Person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required:true,
        unique: true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    address: {
        type: String,
    },
    salary:{
        type: Number,
    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }

});

personSchema.pre('save', async function(next){
    const person = this;

    // Hash the password only if it has been modified  (or is new)
    if(!person.isModified('password')) return next();

    try 
    {
        // Salt passowrd generate 
        const salt = await bcrypt.genSalt(10);


        // hash password generate 
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //override the plain password with the hashed one
        person.password = hashedPassword;

        next();
    } catch (error) 
    
    {
        return next(error)
    }
})

personSchema.methods.comparePassword = async function (candiatePassword){
    try {
        // use bcrypt to compare the provided password with the hashed password 
        const isMatch = await bcrypt.compare(candiatePassword, this.password)
        return isMatch;
    } catch (error) {
        throw error;
    }
}


/// Create Person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;