// let helpers = require('../helpers/helpers');
let heroesModel = require('../models/heroesModel');
const router = require('express').Router();
const multer = require ('multer');
const upload = multer({dest:'uploads/'})

router.get('/', async (req, res, next) => {
    try {
        const superheroes = await heroesModel.find();
        res.json(superheroes);
    } catch (err) {
    next(err)
    }
});

router.post('/', upload.single('heroImg'), async (req, res, next) => {
    console.log(req.file);
    
    try {
        const newHero = req.body;
        
        const dublicate = await heroesModel.findOne({
            "superheroNickname": newHero.superheroNickname
        });
        
        if (!dublicate && newHero) {
            res.status(201).json(await heroesModel.create(newHero));
        } else {
            res.status(403).json({
                message: 'this hero already exists. Create new hero'});
        }
    } catch (err) {
        next(err)
    }
});
// router.delete('/', (req, res, next) => {
//     try {
//         let deleteResultOffice = req.body.arrId;
//         console.log(deleteResultOffice);
//         deleteResultOffice.forEach(async (element) => {
//             console.log(element);
//             res.status(204).json(await officesModels.findByIdAndRemove(element))
//         })
//     } catch (err) {
//         next(err)
//     }
// });

module.exports = router;