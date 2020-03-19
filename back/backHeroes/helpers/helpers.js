const mongoose = require('mongoose');

const hero = function (requestBody) {
    let requestData = function (requestBody) {
        return (Object.keys(requestBody).join(',').match(/newSuperhero/) ? JSON.parse(requestBody.newSuperhero) : requestBody);
    }(requestBody);
    return {
    _id: new mongoose.Types.ObjectId(),
    ...requestData
    }
};

const heroimagePath = function(heroImage, requestFile, anotherResult) {
requestFile ? heroImage = requestFile.path : anotherResult;
}
const pagination = function (requestLimit, requestPage, documents) {
        const startIndex = (requestPage - 1) * requestLimit;
        const endIndex = requestPage * requestLimit;
        // const results = {};
        // if (endIndex < documents) {
        //     results.next = {
        //         page: requestPage + 1,
        //         limit: requestLimit
        //     };
        // }
        // if (startIndex > 0)
        //     results.previous = {
        //         page: requestPage - 1,
        //         limit: requestLimit
        //     };
        const pages = Math.ceil(documents/requestLimit);
        return {
            limit: requestLimit,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        }
        }

module.exports = { hero, heroimagePath, pagination };
