module.exports = function(mongoose) {

    var Schema = mongoose.Schema;
    var AddressSchema = new Schema({
            street: String,
            apt: String,
            city: String,
            state: String,
            zip: String
        });

        return AddressSchema;
};