var myApp = angular.module("myApp",['ngMaterial','ngAria','ngAnimate'])
    .controller("ManCtrl",["$scope","ManService","$filter",'$timeout',function ($scope,ManService,$filter,$timeout) {

        // 样式
        $scope.closeDe = function (id) {
            var id = 'active_'+id;
            var de = document.getElementById(id);
            de.setAttribute('class','list-detail')
        }


        ManService.then(function (result) {
            var users=result.data.dateList;
            var newUser = [];
            $scope.users = [];
            newUser = ABCSort(users);
            for (var i=0;i<newUser.length;i++){
                $timeout(function () {
                    $scope.users.push(newUser[i]);
                }, 1000 * i);

            };

            //实现查询功能
                $scope.$watch('searchText', function(searchText) {
                    if(searchText===""){
                        $scope.users=$filter("filter")(newUser);
                    }else{
                        var abc=$filter("filter")(users,searchText);
                        $scope.users=ABCSort(abc);
                        console.log( $scope.users);

                    }
                });
        })

    }])