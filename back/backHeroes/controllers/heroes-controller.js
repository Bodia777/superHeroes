const HeroesModel = require('../models/heroesModel');
const {
    helpersHero,
    helpersHeroimagePath,
    helpersPagination,
    helpersDublicateChecker,
    helpersInvalidParams
} = require('../helpers/helpers');


const createHero = async (req, res, next) => {
    try {
        const newHero = helpersHero(req.body, createNewHero = true);
        const dublicate = await helpersDublicateChecker(newHero);
        if (dublicate) {
            res.status(403).json({
                message: 'this hero already exists. Create new hero'
            });
        } else {
            newHero.heroImage = helpersHeroimagePath(req.file);
            const heroForSave = new HeroesModel(newHero);
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
        const paginationRequirments = helpersPagination(parseInt(req.query.limit), parseInt(req.query.page), documents);
        if (paginationRequirments.endIndex > paginationRequirments.pages * paginationRequirments.limit || paginationRequirments.startIndex < 0) {
            res.status(401).json({
                message: 'wrong page'
            });
        } else {
            const superheroes = await HeroesModel.find().limit(paginationRequirments.limit).skip(paginationRequirments.startIndex);
            const responseData = [superheroes, paginationRequirments.pages];
            res.json(responseData);
        }
    } catch (err) {
        next(err)
    }
}

const getHero = async (req, res, next) => {
    try {
        const invalidParams = helpersInvalidParams(req);
        if (invalidParams) {
            res.status(401).json({
                message: `invalid params ${invalidParams.join(', ')}`
            });
        } else {
            const superhero = await HeroesModel.findOne({
                _id: id
            });
            if (superhero) res.json(superhero);
        }
    } catch (err) {
        next(err)
    }
}

const deleteHero = async (req, res, next) => {
    try {
    const id = req.params.id;
        const invalidParams = helpersInvalidParams(id);
        if (invalidParams) {
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
    async function response (newHero, req, res, id) {
        if (req.file) {
            newHero.heroImage = helpersHeroimagePath(req.file);
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
    try {
        const id = req.params.id;
        const invalidParams = helpersInvalidParams(id);
        if (invalidParams) {
            res.status(401).json({
                message: `invalid params ${invalidParams.join(', ')}`
            });
        }
        const newHero = helpersHero(req.body, createNewHero = false);
        const dublicate = await helpersDublicateChecker(newHero);
        if (dublicate) {
            if (JSON.stringify(dublicate._id) !== JSON.stringify(id)) {
                res.status(403).json({
                    message: 'this hero already exists. Change new hero nickname'
                });
            } else {
                response(newHero, req, res, id);
            }
        } else {
            response(newHero, req, res, id);
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