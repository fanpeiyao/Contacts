var myApp = angular.module("myApp",['ngMaterial','ngAria','ngAnimate'])
    .controller("ManCtrl",["$scope","ManService",'$filter','$mdDialog','$timeout','$window',
        function ($scope,ManService,$filter,$mdDialog,$timeout,$window) {

        $scope.userList = [];
        $scope.users = [];
        $scope.currentUser = null;
        $scope.sortMethod = "ABC";

        ManService.getUserList('json').then(function(result){
           for(var i =0;i<result.length;i++){
                result[i] = JSON.parse(result[i]);
           }
           $scope.userList = result;
           sort($scope.userList);
        });

        //获取排序按钮
        $scope.sortsIcon = ManService.getSort();

        //搜索关闭
        $scope.on_clear=function () {
            $scope.searchText=null;
            $scope.clickIcon = false;
            sort($scope.userList);
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
            }, function() {
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
     .directive('listMap',['$rootScope',function ($rootScope) {
        return {
            restrict:'A',
            link:function (scope,element,attr) {
               angular.element(document).ready(function () {
                   //console.log($rootScope.allPoint);
                   //var mapId = element.attr('id');
                   var area = attr.area;
                   // var x = attr.coordx;
                   // var y = attr.coordy;
                   // // 百度地图API功能
                   // var map = new BMap.Map(mapId);
                   // var point = new BMap.Point(x,y);
                   // map.centerAndZoom(point,13);
                   // var marker = new BMap.Marker(point);  // 创建标注
                   // map.addOverlay(marker);               // 将标注添加到地图中
                  var map = new BMap.Map("baidumap");
                   // map.centerAndZoom(new BMap.Point('120,30'), 13);
                  map.centerAndZoom("杭州",15); 
                  var local = new BMap.LocalSearch(map, {
                      renderOptions:{map: map}
                  });
                  local.search(area);
               })
            }
        }
    }])