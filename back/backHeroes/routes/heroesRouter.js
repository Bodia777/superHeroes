const mongoose = require('mongoose');
const router = require('express').Router();
const multer = require('multer');
const { createHero, getHeroes, getHero, deleteHero, changeHero } = require('../controllers/heroes-controller');

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

router.get('/', getHeroes);
router.get('/:id', getHero);
router.post('/', upload.single('heroImg'), createHero);
router.delete('/:id', deleteHero);
router.put('/:id', upload.single('heroImg'), changeHero);


module.exports = router;
