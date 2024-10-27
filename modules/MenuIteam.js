const mongoose = require('mongoose');

const menuIteamSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    price:{
        type: Number,
        required: true,
    },
    taste:{
        type: String,
        required: true
    },
    
    is_drink:{
        type: Boolean,
        default: true
    },
    ingredients:{
        type: [String],
        default:[]
    },
    num_sales: {
        type: Number,
        default:0
    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
})

const MenuIteam = mongoose.model('MenuIteam',menuIteamSchema);
module.exports = MenuIteam;