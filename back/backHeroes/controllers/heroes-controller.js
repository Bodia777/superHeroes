const HeroesModel = require('../models/heroesModel');
const { hero, heroimagePath, pagination } = require('../helpers/helpers');

const createHero = async (req, res, next) => {
    try {
        const newHero = hero(req.body);
        const dublicate = await HeroesModel.findOne({
            "superheroNickname": newHero.superheroNickname
        });
        if (dublicate) {
            res.status(403).json({
                message: 'this hero already exists. Create new hero'
            });
        } else {
            newHero.heroImage = heroimagePath( req.file, 'uploads/noimage.png');
            const heroForSave = new HeroesModel(newHero);
            console.log('heroForSave', heroForSave);
            
            const savedHero = await HeroesModel.create(heroForSave);
            res.status(201).json(savedHero);
        }
    } catch (err) {
        next(err)
    }
}

const getHeroes = async (req, res, next) => {
    try { 
        const documents = await HeroesModel.countDocuments();
        const paginationRequirments = pagination(parseInt(req.query.limit), parseInt(req.query.page), documents);
        if (paginationRequirments.endIndex > paginationRequirments.pages * paginationRequirments.limit || paginationRequirments.startIndex < 0 ) {
            res.status(401).json({
                message: 'wrong page'
            });
        } else {
             const superheroes = await HeroesModel.find().limit(paginationRequirments.limit).skip(paginationRequirments.startIndex);
             const responseData = [superheroes, paginationRequirments.pages];
             // res.set('Pages', `${pages}`)
             // .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Pages, Accept")
             res.json(responseData);
        }
    } catch (err) {
        next(err)
    }
}

const getHero = async (req, res, next) => {
    try {
        const id = req.params.id;
        const invalidParams = [];
        if (!id) invalidParams.push('id');
        if (invalidParams.length) {
            res.status(401).json({
                message: `invalid params ${invalidParams.join(', ')}`
            });
        } else {
            const superhero = await HeroesModel.findOne({_id: id});
            if (superhero) res.json(superhero);
        }
    } catch (err) {
        next(err)
    }
}

const deleteHero = async (req, res, next) => {
    const id = req.params.id;
    const invalidParams = [];
    if (!id) invalidParams.push('id');
    try {
        if (invalidParams.length) {
            res.status(401).json({
                message: `invalid params ${invalidParams.join(', ')}`
            });
        }
        await HeroesModel.findOneAndRemove({
            _id: id
        }, function (err) {
            if (err) next(err);
        });
        res.status(204).json({
            result: 'success'
        });

    } catch (err) {
        next(err);
    }
}

const changeHero = async (req, res, next) => {
    const id = req.params.id;
    const invalidParams = [];
    if (!id) invalidParams.push('id');
    try {
        if (invalidParams.length) {
            res.status(401).json({
                message: `invalid params ${invalidParams.join(', ')}`
            });
        }
        let requestData = function () {
            return (Object.keys(req.body).join(',').match(/newSuperhero/) ? JSON.parse(req.body.newSuperhero) : req.body);
        }();

        let newHero = {
            ...requestData,
        };
        const dublicate = await HeroesModel.findOne({
            "superheroNickname": newHero.superheroNickname
        });
        if (dublicate) {
            if (JSON.stringify(dublicate._id) !== JSON.stringify(id)) {
                res.status(403).json({
                    message: 'this hero already exists. Change new hero nickname'
                });
            } else {
                if (req.file) {
                    newHero.heroImage = req.file.path;
                }
                await HeroesModel.updateOne({
                    _id: id
                }, newHero, function (err) {
                    if (err) next(err);
                });
                res.status(204).json({
                    result: 'success'
                });
            }
        } else {
            if (req.file) {
                newHero.heroImage = req.file.path;
            }
            await HeroesModel.updateOne({
                _id: id
            }, newHero, function (err) {
                if (err) next(err);
            });
            res.status(204).json({
                result: 'success'
            });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createHero,
    getHeroes,
    getHero,
    deleteHero,
    changeHero
}