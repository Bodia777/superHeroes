let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let superheroSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    superheroNickname: {type: String, required: true},
    superheroRealname: {type: String, required: true},
    superheroOriginDescription: {type: String, required: true},
    superPowers: {type: String, required: true},
    catchPhrase: {type: String, required: true},
    heroImage: String
});
module.exports = mongoose.model('superheroes', superheroSchema);
