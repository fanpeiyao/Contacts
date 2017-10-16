var myApp = angular.module("myApp",['ngMaterial','ngAria','ngAnimate'])
    .controller("ManCtrl",["$scope","ManService",'$filter','$mdDialog','$timeout','$window',
        function ($scope,ManService,$filter,$mdDialog,$timeout,$window) {

        // //更改详情页在iPhone端兼容样式
        // var con = document.getElementsByClassName('content')[0];
        // con.style.minHeight=$window.innerHeight= +'px';
        // var lists = document.getElementsByClassName('son-list'),time;

        var user = [];


        $scope.userList = [];
        $scope.users = [];
        $scope.currentUser = null;


        ManService.getUserList('json').then(function(result){
           for(var i =0;i<result.length;i++){
                result[i] = JSON.parse(result[i]);
           }
           $scope.userList = result;
           $scope.sortMethod = "ABC";
           sort($scope.userList);
        });

        //获取排序按钮
        $scope.sortsIcon = ManService.getSort();

        // 关闭详情样式
        $scope.closeDe = function (id) {
            var id = 'active_'+id;
            var de = document.getElementById(id);
            de.setAttribute('class','list-detail');
            var bar = document.getElementsByClassName('toolbar')[0];
            bar.style.display='block';
        }

        //搜索关闭
        $scope.on_clear=function () {
            $scope.searchText=null;
            $scope.clickIcon = false;
        };

        //实现查询功能
        $scope.change=function (searchText) {
            var abc=$filter("filter")($scope.userList,searchText);
            sort(abc);
        };

        //排序切换
        $scope.switch=function(name){
            $scope.showIon = false;
            $scope.sortMethod = name;
            sort($scope.userList);
        }

        function sort(list){
             if($scope.sortMethod=='groupName'){
                var flag=name;
                $scope.users = strSort(list,$scope.sortMethod);
            }
            if($scope.sortMethod=='ABC'){
                $scope.users = ABCSort(list);
            }
        }

        $scope.setCurrentUser = function(user,ev) {
            $scope.currentUser = user;

            $mdDialog.show({
                  controller: DialogController,
                  scope:$scope,
                  preserveScope: true,
                  templateUrl: 'dialog.tpl.html',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose:true,
                  locals: {
                       currentUser: $scope.currentUser
                   },
                  fullscreen: true // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
      }

    }])