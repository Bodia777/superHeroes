// let helpers = require('../helpers/helpers');
let heroesModel = require('../models/heroesModel');
const mongoose = require('mongoose');
const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callbackfunc) {
        callbackfunc(null, './uploads/')
    },
    filename: function (req, file, callbackfunc) {
        callbackfunc(null, new mongoose.Types.ObjectId() + file.originalname)
    }

})

const fileFilter = (req, file, callbackFunction) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf' || file.mimetype === 'image/pdf') {
        callbackFunction(null, true);
    } else {
        callbackFunction(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 15
    },
    fileFilter: fileFilter
});



router.get('/', async (req, res, next) => {
    try {
        const superheroes = await heroesModel.find();
        res.json(superheroes);
    } catch (err) {
        next(err)
    }
});

router.post('/', upload.single('heroImg'), async (req, res, next) => {
    try {
        let requestData = function () {
            return (Object.keys(req.body).join().match(/newSuperhero/) ? JSON.parse(req.body.newSuperhero) : req.body);
        }();

        let newHero;
        if (req.file) {
            newHero = new heroesModel({
                _id: new mongoose.Types.ObjectId(),
                superheroNickname: requestData.superheroNickname,
                superheroRealname: requestData.superheroRealname,
                superheroOriginDescription: requestData.superheroOriginDescription,
                superPowers: requestData.superPowers,
                catchPhrase: requestData.catchPhrase,
                heroImage: req.file.path
            });
        } else {
            newHero = new heroesModel({
                _id: new mongoose.Types.ObjectId(),
                superheroNickname: requestData.superheroNickname,
                superheroRealname: requestData.superheroRealname,
                superheroOriginDescription: requestData.superheroOriginDescription,
                superPowers: requestData.superPowers,
                catchPhrase: requestData.catchPhrase,
                heroImage: null
            })
        }
        console.log('newHero', newHero);
        const dublicate = await heroesModel.findOne({
            "superheroNickname": newHero.superheroNickname
        });

        if (!dublicate) {
            res.status(201).json(await heroesModel.create(newHero));
        } else if (dublicate) {
            res.status(403).json({
                message: 'this hero already exists. Create new hero'
            });
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