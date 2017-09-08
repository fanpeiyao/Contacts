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

        // var inp=document.getElementById("input-0").value;
        // $scope.clear=function () {
        //    inp.value="";
        //
        // }

        ManService.then(function (result) {
            var users=result.data.dateList;
            var newUser = [];
            $scope.users = [];
            $scope.search;
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
                        console.log( $scope.users);

                    }
                });
        })

    }])