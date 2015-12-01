
module.exports = function(app, db, mongoose){

    var model = require("./models/user.model.js")(db, mongoose);
    require("./services/user.service.js")(app, model);
    var model = require("./models/form.model.js")(db, mongoose);
    require("./services/form.service.js")(app, model);
    require("./services/field.service.js")(app, model);
};