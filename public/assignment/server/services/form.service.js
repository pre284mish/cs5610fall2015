//var model = require("../models/form.model.js")();

module.exports = function(app, model){

    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.post("/api/assignment/user/:userId/form", createNewForm);
    app.delete("/api/assignment/form/:formId", deleteFormByFormId);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.get("/api/assignment/form/:formTitle", findFormByTitle);


    function findAllFormsForUser(req, res){
        var userId = req.params.userId;
        console.log("User at FormService findallForms" + userId)
        model.findAllForms(userId)
        .then (function(forms){
             res.json(forms);
        });
    }

    function createNewForm(req, res){
        var formObj = req.body;
        var userId = req.params.userId;
        console.log("create form:" + formObj+ "for :"+userId);
        model.createForm(formObj)
        .then (function(forms){
             res.json(forms);
        });
    }

    function deleteFormByFormId(req, res){
        var id = req.params.formId;
        model.removeForm(id)
        .then (function(forms){
            res.json(forms);
        })
    }

    function findFormById(req, res){
        var id = req.params.id;
        console.log("find form:" + id);
        model.findByFormId(id)
        .then (function(form){
              res.json(form);
          })
    }

    function updateFormById(req, res){
        var id = req.params.id;
        console.log(id);
        var updatedFormObj = req.body;
        console.log(updatedFormObj);
        model.updateForm(id, updatedFormObj)
        .then (function(form){
              res.json(form);
          })
    }

    function findFormByTitle(req, res){
        var title = req.params.title;
        console.log("find form:" + id);
        model.findFormByTitle(title)
        .then (function(form){
              res.json(form);
          })
    }

};