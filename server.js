const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/beltAng/dist')));

/// mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/belt_db');

let PetSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name is required"], minlength: [3, "Name must be at least 3 characters"], unique: [true, "Name must be unique"]},
    type: {type: String, required: [true, "Type is required"], minlength: [3, "Type must be at least 3 characters"]},
    desc: {type: String, required: [true, "Description is required"], minlength: [3, "Description must be at least 3 characters"]},
    likes: {type: Number, default: 0},
    skills: [{
                skill: {type: String}
            }]
}, {timestamps: true});
PetSchema.plugin(uniqueValidator);
mongoose.model('Pet', PetSchema);
let Pet = mongoose.model('Pet');


/// routes


// get all pets

app.get('/pets', function(req, res){

    Pet.find({}).sort('-type').exec(function(err, pets){
        if(err){
            console.log("returned error", err);
            res.json({message: "Error", error: err});
        } else {
            // sort pets ???
            res.json({message: "Success", data: pets});
        }
    });
});



// create a pet

app.post('/pets', function(req, res){
    console.log(req.body);
    var newPet = new Pet({name: req.body.name, type: req.body.type, desc: req.body.desc, skills: req.body.skills});
    newPet.save(function(err){
        if(err){
            console.log("returned error", err);
            res.json({message: "Error", error: err});
        } else {
            res.json({message: "Success"});
        }
    });
});



// get one pet
app.get('/pets/:id', function(req, res){
    Pet.findOne({_id: req.params.id}, function(err, pet){
        if(err){
            console.log("returned error", err);
            res.json({message: "Error", error: err});
        } else {
            res.json({message: "Success", data: pet});
        }
    });
});


// edit pet
app.put('/pets/:id', function(req, res){
    console.log("in put, ", req.body)
    Pet.findOne({_id: req.params.id}, function(err, pet){
        if(err){
            console.log("returned error", err);
            res.json({message: "Error", error: err});
        } else {
            pet.name = req.body.name;
            pet.type = req.body.type;
            pet.desc = req.body.desc;
            pet.skills = req.body.skills;
            pet.markModified('skills');
            pet.save(function(err){
                if(err){
                    console.log("returned error", err);
                    res.json({message: "Error", error: err});
                } else {
                    res.json({message: "Success"});
                }
            });
        }
    });
});


// update likes
app.put('/update/:id/likes', function(req, res){
    console.log('in update vote: ', req.body);
    Pet.findOne({_id: req.params.id}, function(err, pet){
        if(err){
            console.log("returned error", err);
            res.json({message: "Error", error: err});
        } else {
            console.log("in else for likes: ", pet)
            pet.likes ++;
            pet.save(function(err){
                if(err){
                    console.log("returned error", err);
                    res.json({message: "Error", error: err});
                } else {
                    res.json({message: "Success"});
                }
            });
        }
    });
});


// delete pet
app.delete('/pets/:id', function(req, res){
    console.log("in delete, here are the params: ", req.params);
    Pet.remove({_id: req.params.id}, function(err){
        if(err){
            console.log("returned error", err);
            res.json({message: "Error", error: err});
        } else {
            res.json({message: "Success"});
        }
    });
});



app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./beltAng/dist/index.html'));
});

app.listen(8000, function(){
    console.log("listening on port 8000");
});