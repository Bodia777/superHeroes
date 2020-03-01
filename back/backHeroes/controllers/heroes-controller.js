const HeroesModel = require('../models/heroesModel');
const mongoose = require('mongoose');

const createHero = async (req, res, next) => {
    try {
        let requestData = function () {
            return (Object.keys(req.body).join().match(/newSuperhero/) ? JSON.parse(req.body.newSuperhero) : req.body);
        }();

        let newHero= {
            _id: new mongoose.Types.ObjectId(),
            ...requestData,
        };
        // console.log(req.file.path);

        const dublicate = await HeroesModel.findOne({
            "superheroNickname": newHero.superheroNickname
        });

        if (dublicate) {
            res.status(403).json({
                message: 'this hero already exists. Create new hero'
            });
        }
        
        if (req.file) newHero.heroImage = req.file.path;
        
        const hearoForSave = new HeroesModel(newHero);
        const savedHero = await HeroesModel.create(hearoForSave);
        // console.log('newHero', newHero);
      
       res.status(201).json(savedHero);
        
    } catch (err) {
        next(err)
    }
}

const getHeroes = async (req, res, next)=> {
    try {
        const superheroes = await HeroesModel.find();
        res.json(superheroes);
    } catch (err) {
        next(err)
    }
}

const deleteHero = async (req, res, next) => {
    const id = req.params.id;
    console.log('id>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', id);
    
    const invalidParams=[];
    if (!id)  invalidParams.push('id');

    try{
     if (invalidParams.length) {
        res.status(401).json({
            message: `invalid params ${invalidParams.join(', ')}`
        });
     }

        await HeroesModel.findOneAndRemove({ _id : id }, function(err) {
            if (err) console.log(err);
        });
        res.status(204).json({result: 'success'});
     
    } catch(err) {
        console.log(err, '<<<<<<<<<<<<<<<<<')
        next(err);
    } 
}

module.exports = {
    createHero, getHeroes, deleteHero
}