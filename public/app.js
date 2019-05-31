'use strict'

angular.module("app",['ngCookies','ngRoute','ngSanitize','ngStorage','ngLodash'])
.config(function($routeProvider,$locationProvider){
   
    console.log("aaaaaaaaaaaaa");
    $routeProvider.when("/main",{
        templateUrl:'main/main.html',
        controller:"MainCtrl"
    })
    .when("/join",{
        templateUrl:"join/join.html",
        controller:"JoinCtrl"
    })
    .otherwise({
        redirectTo:"/join"
    });
})