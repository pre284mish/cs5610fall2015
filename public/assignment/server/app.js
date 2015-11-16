
module.export = function(app){
    require("./services/user.service.js")(app);
    require("./services/form.service.js")(app);
    require("./services/field.service.js")(app);
};