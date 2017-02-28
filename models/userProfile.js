var 
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,

var userProfile = mongoose.Schema({
    user: { type: String },
    artWorksOnRotation: [],
    artWorksLiked: [{ type: String }],
    dateRotationWasUpdate: { type: String }
});

var UserProfile = mongoose.model('UserProfile', userProfile);

module.exports = UserProfile;
