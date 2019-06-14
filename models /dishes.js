const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//to make use currency node module
require('mongoose-currency').loadType(mongoose);

var Currency = mongoose.Types.Currency;


var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true///name is requered field
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
    comments:[commentSchema]
},  
{
    usePushEach: true,
    timestamps: true////this will automatically add the created at and updated at, two timestamps into each document that is stored in our application and it'll automatically update these values
});


var Dishes = mongoose.model('Dish', dishSchema);//constructing the model from schema

module.exports = Dishes;