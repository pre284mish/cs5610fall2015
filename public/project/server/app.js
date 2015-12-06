
module.exports = function(app, db, mongoose){

    var model = require("./models/user.model.js")(db, mongoose);
    require("./services/user.service.js")(app, model);
    var model = require("./models/job.model.js")(db, mongoose);
    require("./services/job.service.js")(app, model);
//    require("./services/field.service.js")(app, model);
};