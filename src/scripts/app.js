var myApp = angular.module("myApp",['ngMaterial','ngAria','ngAnimate'])
    .controller("ManCtrl",["$scope","ManService","$filter",function ($scope,ManService,$filter) {

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
            $scope.search;
            newUser = ABCSort(users);
            for (var i=0;i<newUser.length;i++){
                $scope.users.push(newUser[i]);
            };

            //实现查询功能
            var inp=document.getElementById("input-0");
            inp.addEventListener("click",function(){
                $scope.$watch('searchText', function(searchText) {
                    if(searchText===""){
                        $scope.users=$filter("filter")(newUser);
                    }else{
                        $scope.users=$filter("filter")(newUser,searchText);
                        $scope.search=$filter("filter")(users,searchText);
                    }
                });
            })

        })

    }])