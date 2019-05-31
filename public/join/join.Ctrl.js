(function(){
    'use strict';

    angular.module("app").controller("JoinCtrl",JoinCtrl);
    JoinCtrl.$inspect=["$location","$scope","$localStorage","socket"];
    function JoinCtrl($location,$scope,$localStorage,socket){
        $scope.name="";
        var nickName;
        $scope.join=function(){
            nickName=$scope.name;
            $localStorage.nickName=$scope.name;
            console.log("$localStorage = ",$localStorage);
            socket.emit("join",{
                nickName:nickName
            });
            $location.path("/main");
        }
    }
   
})();