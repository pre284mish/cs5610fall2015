(function(){
    'use strict';
   var app =  angular.module("FormBuilderApp");
   app.config(Configure)
    app.controller('CommonController', function($scope, $routeParams, $rootScope) {
            $rootScope.role = $routeParams.role;

        });


    function Configure($routeProvider) {

            $routeProvider
                        .when("/home/:role",{
                            templateUrl: function(elem, attrs) {
                                return 'home/home-' + elem.role + '.view.html'
                            },
                            controller: 'CommonController'
                        })
                        .when("/lawn_mowing/:role", {
                            templateUrl: function(elem, attrs) {
                                return 'lawn_mowing/lawn_mowing-' + elem.role + '.view.html'
                            },
                            controller: 'CommonController'
                        })
                        .when("/add_job", {
                            templateUrl: "add_job/add_job.view.html",
                            controller: ""
                        })
                        .when("/my_jobs", {
                            templateUrl: "my_jobs/my_jobs.view.html",
                            controller: ""
                        })
                         .when("/my_listings", {
                            templateUrl: "my_listings/my_listings.view.html",
                            controller: ""
                        })
                        .when("/login", {
                            templateUrl: "login/login.view.html",
                            controller: "LoginController"
                        })
                        .when("/profile", {
                            templateUrl: "profile/profile.view.html",
                            controller: ""
                        })
                        .when("/form", {
                            templateUrl: "form/form.view.html",
                            controller: "FormController"
                        })
                        .otherwise({
                            redirectTo: "/home"
                        });
    }

}())