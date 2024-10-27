// set up Passport with a local authentication strategy, using a Person model for 

const Passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./modules/person');  // Adujest the path as needed
const passport = require('passport');

passport.use(new localStrategy(async(USERNAME, password, done) => {
    try {
        console.log('Received credentials:', USERNAME, password);
        const user = await Person.findOne({ username : USERNAME });
        console.log('User found:', user); // Check if the user is retrieved correctly

        if(!user)
            return done(null, false, {message: 'Incoreect username.'});

        const isPasswordMatch = user.password === password ? true : false;
        if(isPasswordMatch)
            return done(null, user);
        else 
            return done(null, false, { message: 'Incoreect password.'});
    } catch (error) {
        console.log("show error");
        
        return done(error);
    }
}));

module.exports = passport;
