var myApp = angular.module("myApp",['ngMaterial','ngAria','ngAnimate'])
    .controller("ManCtrl",["$scope","ManService","$filter",'$timeout','$window',function ($scope,ManService,$filter,$timeout,$window) {


        var con = document.getElementsByClassName('content')[0];
        con.style.minHeight=$window.innerHeight +'px';
        // 样式
        $scope.closeDe = function (id) {
            var id = 'active_'+id;
            var de = document.getElementById(id);
            de.setAttribute('class','list-detail');
            var bar = document.getElementsByClassName('toolbar')[0];
            bar.style.display='block';
        }
        $scope.on_clear=function () {
            $scope.searchText='';
            $scope.clickIcon = false;
        }


        $scope.clickIcon = false;
        $scope.showSearch = function() {
            if ($scope.clickIcon === false) {
                $scope.clickIcon = true;
            }
            else {
                $scope.clickIcon = false;
            }
        };


        ManService.then(function (result) {
            var users=result.data.dateList;

            /*********************
             图片预加载 start
             **********************/

            var imgList=[];
            imgList.push("resource/images/cover.jpg");
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
                $timeout(function(){
                    $('#cover').fadeOut(1000);
                    loadData();
                },3000);
            });

            /*********************
             图片预加载 end
             **********************/

            function loadData() {
                var newUser = [];
                $scope.users = [];
               // newUser = ABCSort(users);
                var timeStr="groupName";
                newUser =strSort(users,timeStr);
                console.log(newUser);
                var lists = document.getElementsByTagName('md-list'),time;

                //console.log(lists.length)
                for (var i=0;i<newUser.length;i++){
                    $scope.users.push(newUser[i]);
                    //Cannot read property 'style' of undefined,本来lists[i]应该单独写循环，虽报错不影响
                    time = (i*100)+'ms';
                    lists[i].style.animationDelay = time;
                };


                //实现查询功能
                // $scope.$watch('searchText', function(searchText) {
                //     if(searchText===""){
                //         $scope.users=$filter("filter")(newUser);
                //     }else{
                //         var abc=$filter("filter")(users,searchText);
                //         $scope.users=ABCSort(abc);
                //     }
                // });
            }

        })

    }])