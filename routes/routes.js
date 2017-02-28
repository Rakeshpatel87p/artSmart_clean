// Creates New User Profile, adding start-kit artworks
var
    express = require('express'),
    app = module.exports = express(),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    UserProfile = require('../models/userProfile'),
    PaintingAttributes = require('../models/paintingAttributes'),
    getDateService = require('../services/services')

app.post('/newUser', function(req, response) {
    UserProfile.create({
        user: req.body.user,
        dateRotationWasUpdate: getDateService.getDate()
    }, function(err, newUser) {
        if (err) {
            return response.status(500).json(err)
        }

        PaintingAttributes.find({ special_notes: "starter_kit" }, function(err, starter_kit) {
            if (err) {
                return response.status(500).json(err)
            }
            console.log('this is the starter_kit', starter_kit)
            urls = starter_kit.map(function(obj) {
                return obj.url;
            })
            UserProfile.update({ _id: newUser._id }, { artWorksOnRotation: starter_kit }, function(err, updatedUser) {
                if (err) {
                    console.log(err, 'error');
                }
            });
        })
        response.status(201).json(newUser)
        console.log('new user created--------', newUser)
    })
});

// Adds new pieces of artwork to mongoose
app.post('/addingArt', function(req, response) {
    var newItem = new PaintingAttributes({
        image_id: req.body.image_id,
        title: req.body.title,
        date: req.body.date,
        artist: req.body.artist,
        collecting_institution: req.body.institution,
        url: req.body.url,
        special_notes: req.body.special_notes

    });
    newItem.save(function(err, newPaintingAdded) {
        if (err) {
            response.json(err)
        }

        response.status(201).json(newPaintingAdded)
    })
});

// Gets artwork from artsy
app.get('/artworks/:id', function(req, response) {
    var id = req.params.id;
    unirest.post('https://api.artsy.net/api/tokens/xapp_token')
        .headers({ 'Accept': 'application/json' })
        .send({ "client_id": "cd7051715d376f899232", "client_secret": "de9378d3d12c2cbfb24221e8b96d212c" })
        .end(function(res) {
            unirest.get('https://api.artsy.net/api/artworks/' + id)
                .headers({ 'Accept': 'application/json', 'X-XAPP-Token': res.body.token })
                .end(function(res_) {
                    console.log(res_.body)
                    response.json(res_.body)
                })
        });
});

app.get('/:user/paintingsToDisplay', function(req, response) {
    var user = req.params.user
    UserProfile.findOne({ user: user }, function(err, user) {
        if (err) {
            return response.status(500).json(err)
        }
        console.log('returning response', user)
        response.status(201).json(user.artWorksOnRotation)
    })
});