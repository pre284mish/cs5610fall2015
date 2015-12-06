//var model = require("../models/form.model.js")();


module.exports = function(app, model){

    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);


    function getFieldsForForm(req, res){
        var formId = req.params.formId;
        console.log("Field.service formId: "+formId);
        model.getFieldsForForm(formId)
        .then (function(fields){
            console.log("fielsService fields:: "+ fields);
              res.json(fields);
          });
    }

    function createFieldForForm(req, res){
        var fieldObj = req.body;
        var formId = req.params.formId;
        console.log("create form:" + JSON.stringify(fieldObj, null, 4)+ "for :"+formId);
        model.createFieldForForm(formId, fieldObj)
        .then (function(field){
            console.log("return fields to service server: "+ field);
              res.json(field);
          });
    }

    function deleteFieldFromForm(req, res){
        var formId = req.params.formId;
        console.log("Service formid: "+ formId);
        var fieldId = req.params.fieldId;
        console.log("Service fieldid: "+ fieldId);
        model.deleteFieldsFromForm(formId, fieldId)
        .then (function(fields){
              res.json(fields);
          });
    }

    function getFieldForForm(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.getFieldForForm(formId, fieldId)
        .then (function(field){
              res.json(field);
          });
    }

    function updateField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        model.updateField(formId, fieldId, field)
        .then (function(fields){
              res.json(fields);
          });
    }



};