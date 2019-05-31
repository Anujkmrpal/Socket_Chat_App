(function(){
    'use strict';

    angular.module("app").controller("MainCtrl",MainCtrl);
    MainCtrl.$inspect=["$scope","$localStorage","socket","lodash"];
    function MainCtrl($scope,$localStorage,socket,lodash){
        $scope.message='';
        $scope.messages=[];
        $scope.users=[];
$scope.likes=[];

        $scope.mynickname=$localStorage.nickName;
        var nickName=$scope.mynickname;

        $scope.joinPrivate=function(){
            socket.emit('join-private',{
                nickname:nickName
            });
        }

        $scope.groupPm=function(){
            socket.emit('private-chat',{
                message:'hello everyBody!'
            });
        }

        socket.on("show-message",function(data){
            console.log("datra = ",data);
        })

        socket.emit('get-users');

        socket.on('all-users',function(data){
            console.log(data);
            $scope.users= data.filter(function(item){
                return item.nickName!==nickName;
            });
        });


        socket.on('message-received',function(data){
            $scope.messages.push(data);
        })


        socket.on('user-liked',function(data){
            $scope.likes.push(data.from);
        })

        $scope.sendMessage=function(data){
            var newMessage={
                message:$scope.message,
                from:nickName
            }
            socket.emit("send-message",newMessage);
            $scope.message='';
            // $scope.messages.push(newMessage);
        }
      
            $scope.sendLike=function(user){
                console.log("qqqqqqqq   = ",user);
                var id=lodash.get(user,'socketId');
                var likeObj={
                    from:nickName,
                    like:id
                }

                socket.emit('send-like',likeObj);
            }

    };
   
})();