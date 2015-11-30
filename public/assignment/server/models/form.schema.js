module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var FormSchema = new Schema({
            title: String,
            userId : String
        }, {collection: "cs5610.assignment.form"});

        return FormSchema;
};