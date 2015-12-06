module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var UserSchema = new Schema({
            firstname: String,
            lastname : String,
            username : String,
            password : String,
            email : String,
            zipcode: String,
            role: String
        }, {collection: "cs5610.project.user"});

        return UserSchema;
};
