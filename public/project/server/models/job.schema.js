module.exports = function(mongoose) {

    var AddressSchema = require ("./address.schema.js") (mongoose);
    var UserSchema = require ("./user.schema.js") (mongoose);
    var Schema = mongoose.Schema;
    var JobSchema = new Schema({
            category: String,
            jobDescription: String,
            postedDate: {type: Date, default: Date.now},
            status: String,
//            userId : String,
            postedBy: UserSchema,
            address: AddressSchema,
//            acquiredById: String,
            acquiredBy: UserSchema
        }, {collection: "cs5610.project.job"});

        return JobSchema;
};