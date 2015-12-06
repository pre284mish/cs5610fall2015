module.exports = function(app, model){

    app.get("/api/project/user/category=:category&status=:status", findAllJobsByCategoryAndStatus);
    app.get("/api/project/category/:category/job", findAllJobsByCategory);
    app.post("/api/project/user/:userId/job", createJobByUser);
//    app.delete("/api/assignment/form/:formId", deleteFormByFormId);
//    app.put("/api/assignment/form/:formId", updateFormById);
//    app.get("/api/assignment/form/:formTitle", findFormByTitle);


    function findAllJobsByCategory(req, res){
        var category = req.params.category;
        console.log("User at job.service findallForms" + category);
        model.findAllJobsByCategory(category)
        .then (function(jobs){
             res.json(jobs);
        });
    }

    function createJobByUser(req, res){
        var jobObj = req.body;
        var userId = req.params.userId;
        console.log("create form:" + JSON.stringify(jobObj, null, 4)+ "for :"+userId);
        model.createJobByUser(jobObj)
        .then (function(jobs){
             res.json(jobs);
        });
    }

     function findAllJobsByCategoryAndStatus(req, res){
            var params = {
                "category" : req.params.category,
                "status" : req.params.status
                }
                console.log("param category in job service"+ req.params.category);
                console.log("param status in job service"+ req.params.status);

            model.findAllJobsByCategoryAndStatus(params)
            .then (function(job){
                    console.log("job.service.js: "+ JSON.stringify(job, null, 4))

                    console.log("user.service.js category "+ job.category);
                    console.log("user.service.js status "+ job.status);
                res.json(job);
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
        var id = req.params.formId;
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