var myApp = angular.module("myApp",['ngMaterial','ngAria','ngAnimate'])
    .controller("ManCtrl",["$scope","ManService","$filter",function ($scope,ManService,$filter) {

        // 样式
        $scope.closeDe = function (id) {
            var id = 'active_'+id;
            var de = document.getElementById(id);
            de.setAttribute('class','list-detail')
        }
        $scope.flag = false;
        $scope.showSearch = function () {
            if ($scope.flag === true) {
                $scope.flag = false;
            }
            else {
                $scope.flag = true;
            }
        }

        ManService.then(function (result) {
            var users=result.data.dateList;

            /*********************
             图片预加载 start
             **********************/

            var imgList=[];
            for(var i=0;i<users.length;i++){
                imgList.push(users[i].photo);
            }
            $scope.percent=0;
            imgLoader(imgList, function (percentage) {
                var percentT = percentage * 100;
                $('#percent').html((parseInt(percentT)) + '%');

                if (parseInt(percentT) == 100) {
                    $("#loading").hide();
                    $("#coverPic").fadeIn(1000);
                }
                setTimeout(function(){ $('#cover').fadeOut(1000); },3000);
            });

            /*********************
             图片预加载 end
             **********************/

            var newUser = [];
            $scope.users = [];
            newUser = ABCSort(users);
            for (var i=0;i<newUser.length;i++){
                $scope.users.push(newUser[i]);
            };

            //实现查询功能

                $scope.$watch('searchText', function(searchText) {
                    if(searchText===""){
                        $scope.users=$filter("filter")(newUser);
                    }else{
                        var abc=$filter("filter")(users,searchText);
                        $scope.users=ABCSort(abc);

                    }
                });

        })

    }])