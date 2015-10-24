(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .config(Configure);


    function Configure($routeProvider) {

            $routeProvider
                        .when("/home",{
                            templateUrl: "home/home.view.html"
                        })
                        .when("/register", {
                            templateUrl: "register/register.view.html",
                            controller: "RegisterController"
                        })
                        .when("/login", {
                            templateUrl: "login/login.view.html",
                            controller: "LoginController"
                        })
                        .when("/profile", {
                            templateUrl: "profile/profile.view.html",
                            controller: "ProfileController"
                        })
                        .when("/form", {
                            templateUrl: "form/form.view.html",
                            controller: ""
                        })
                        .otherwise({
                            redirectTo: "/home"
                        });
    }

}())