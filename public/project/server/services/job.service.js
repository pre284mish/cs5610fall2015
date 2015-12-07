module.exports = function(app, model){

    app.get("/api/project/user/category=:category&status=:status", findAllJobsByCategoryAndStatus);
    app.get("/api/project/category/:category/job", findAllJobsByCategory);
    app.get("/api/project/user/:userId/job", findAllJobsByUserId);
    app.post("/api/project/user/:userId/job", createJobByUser);
    app.put("/api/project/job/id=:id", updateJob);
    app.put("/api/project/completedjob/id=:id", markCompleted);
    app.get("/api/project/acquiredBy/:userId/job", findAllJobsByAcquiredBy);


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

    function findAllJobsByUserId(req, res){
        var userId = req.params.userId;
        console.log("User at JobService findallJobs" + userId)
        model.findAllJobsByUserId(userId)
        .then (function(jobs){
             res.json(jobs);
        });
    }

    function findAllJobsByAcquiredBy(req, res){
        var userId = req.params.userId;
        console.log("AcquiredBy User at JobService findAllJobsByAcquiredBy" + userId)
        model.findAllJobsByAcquiredBy(userId)
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

     function updateJob(req, res){
            var id = req.params.id;
            console.log(id);
            var updatedJobObj = req.body;
            console.log(JSON.stringify(updatedJobObj, null, 4));
            model.updateJob(id, updatedJobObj)
            .then (function(job){
                res.json(job);
            });
        }


        function markCompleted(req, res){
            var id = req.params.id;
            console.log(id);
            var updatedJobObj = req.body;
            console.log(JSON.stringify(updatedJobObj, null, 4));
            model.markCompleted(id, updatedJobObj)
            .then (function(job){
                res.json(job);
            });
        }

};