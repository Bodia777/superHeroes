let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let superheroSchema = new Schema({
    superheroNickname: String,
    superheroRealname: String,
    superheroOriginDescription: String,
    superPowers: String,
    catchPhrase: String
});
module.exports = mongoose.model('superheroes', superheroSchema);
