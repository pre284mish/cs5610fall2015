var model = require("../models/form.model.js")();

module.exports = function(app){

    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);


    function getFieldsForForm(req, res){
        var formId = req.params.formId;
        res.json(model.getFieldsForForm(formId));
    }

    function createFieldForForm(req, res){
        var fieldObj = req.body;
        var formId = req.params.formId;
        console.log("create form:" + fieldObj+ "for :"+formId);
        res.json(model.createFieldForForm(formId, fieldObj));
    }

    function deleteFieldFromForm(req, res){
        var formId = req.params.formId;
        console.log("Service formid: "+ formId);
        var fieldId = req.params.fieldId;
        console.log("Service fieldid: "+ fieldId);
        res.json(model.deleteFieldsFromForm(formId, fieldId));
    }

    function getFieldForForm(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.getFieldForForm(formId, fieldId));
    }

    function updateField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        res.json(model.updateField(formId, fieldId, field));
    }



};