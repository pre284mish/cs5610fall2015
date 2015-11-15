var model = require("../models/form.model.js")();

module.exports = function(app){

    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.post("/api/assignment/user/:userId/form", createNewForm);
    app.delete("/api/assignment/form/:formId", deleteFormByFormId);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.get("/api/assignment/form/:formTitle", findFormByTitle);


    function findAllFormsForUser(req, res){
        var userId = req.params.userId;
        res.json(model.findAllForms(userId));
    }

    function createNewForm(req, res){
        var formObj = req.body;
        var userId = req.params.userId;
        console.log("create form:" + formObj+ "for :"+userId);
        res.json(model.createForm(userId, formObj));
    }

    function deleteFormByFormId(req, res){
        var id = req.params.formId;
        res.json(model.removeForm(id));
    }

    function findFormById(req, res){
        var id = req.params.id;
        console.log("find form:" + id);
        res.json(model.findByFormId(id));
    }

    function updateFormById(req, res){
        var id = req.params.id;
        console.log(id);
        var updatedFormObj = req.body;
        console.log(updatedFormObj);
        res.json(model.updateForm(id, updatedFormObj));
    }

    function findFormByTitle(req, res){
        var title = req.params.title;
        console.log("find form:" + id);
        res.json(model.findFormByTitle(title));
    }

};