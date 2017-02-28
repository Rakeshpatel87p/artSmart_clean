var 
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,

var paintingAttributes = mongoose.Schema({
    image_id: { type: String },
    title: { type: String },
    date: { type: String },
    artist: {type: String},
    collecting_institution: { type: String },
    url: { type: String },
    special_notes: { type: String }
});

var PaintingAttributes = mongoose.model('PaintingAttributes', paintingAttributes)

module.exports = PaintingAttributes;