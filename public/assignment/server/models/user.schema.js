module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var UserSchema = new Schema({
            firstName: String,
            lastName : String,
            username : String,
            password : String,
            email : String
        }, {collection: "cs5610.assignment.user"});

        return UserSchema;
};
