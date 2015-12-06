module.exports = function(mongoose) {

    var AddressSchema = require ("./address.schema.js") (mongoose);
    var UserSchema = require ("./user.schema.js") (mongoose);
    var Schema = mongoose.Schema;
    var JobSchema = new Schema({
            category: String,
            jobDescription: String,
            postedDate: Date,
            status: String,
            userId: String,
            address: AddressSchema
        }, {collection: "cs5610.project.job"});

        return JobSchema;
};