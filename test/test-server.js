var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

// Testing db
describe('Loading user painting', function(){
	it('gets the paintings to display to user', function(done){
		chai.request(app)
			.get('/rakesh/paintingsToDisplay')
			.end(function(err, res){
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(5);
                done();
			})
	});

	it('creates new users', function(done){
		chai.request(app)
			.post('/newUser')
			.send({'user': 'Test'}
			.end(function(err, res){
				should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('artWorksOnRotation');
                res.body.name.should.be.a('string');
                res.body.name.should.equal('Test');
                done();
			})
	});

	it('adds new pieces of artwork to db', function(done){
		chai.request(app)
			.post('/addingArt')
			.send({
				    image_id: 'sample',
        			title: 'sample',
        			date: 'sample',
        			artist: 'sample',
        			collecting_institution: 'sample',
        			url: 'sample',
        			special_notes: 'sample'
			})
			.end(function(err, res){
				should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('image_id');
                res.body.should.have.property('title');
                res.body.should.have.property('date');
                res.body.should.have.property('artist');
                res.body.should.have.property('collecting_institution');
                res.body.should.have.property('url');
                res.body.should.have.property('special_notes');
                done();
			})
	})
});