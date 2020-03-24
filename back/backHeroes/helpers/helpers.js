const mongoose = require('mongoose');
const HeroesModel = require('../models/heroesModel');

const helpersHero = function (requestBody, createNewHero) {
    const requestData = function (requestBody) {
        const body = (Object.keys(requestBody).join(',').match(/newSuperhero/) ? JSON.parse(requestBody.newSuperhero) : requestBody);
        body.superheroNickname = body.superheroNickname.toUpperCase();
        return body;
    }(requestBody);
    if (createNewHero) {
        return {
            _id: new mongoose.Types.ObjectId(),
            ...requestData
        }
    } else {
        return { ...requestData }
    }
};

const helpersHeroimagePath = function ( requestFile ) {
    let result;
    requestFile ? result = requestFile.path : result = 'uploads/noimage.png';
    return result;
}

const helpersPagination = function (requestLimit, requestPage, documents) {
    const startIndex = (requestPage - 1) * requestLimit;
    const endIndex = requestPage * requestLimit;
    const pages = Math.ceil(documents / requestLimit);
    return {
        limit: requestLimit,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    }
}

const helpersDublicateChecker = async function(hero) {
    const dublicate = await HeroesModel.findOne({
        "superheroNickname": hero.superheroNickname
    });
        return dublicate;
}

const helpersInvalidParams = function(id) {
    const invalidParams = [];
    if (!id) invalidParams.push('id');
    return invalidParams.length;
}

module.exports = {
    helpersHero,
    helpersHeroimagePath,
    helpersPagination,
    helpersDublicateChecker,
    helpersInvalidParams
};