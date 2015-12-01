module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var FieldSchema = new Schema({
            label: String,
            fieldType: {
                type: String,
                enum: ["TEXT", "TEXTAREA", "RADIO", "CHECKBOX", "SELECT", "DATE", "EMAIL", "OPTIONS"]
                },
            options: [{
                label: {type: String},
                value: {type: String}
                }],
            placeholder: {type: String, default: "TEXT"}

        });

        return FieldSchema;
};