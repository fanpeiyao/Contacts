var myApp = angular.module("myApp",['ngMaterial','ngAria','ngAnimate'])
    .controller("ManCtrl",["$scope","ManService","$filter",'$timeout','$window',function ($scope,ManService,$filter,$timeout,$window) {


        var con = document.getElementsByClassName('content')[0];
        con.style.minHeight=$window.innerHeight +'px';
        var lists = document.getElementsByClassName('son-list'),time;
        var newUser = [];
        $scope.users = [];
        newUser = ABCSort(users);
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
        $scope.change=function () {
            if(searchText===""){
                $scope.users=$filter("filter")(newUser);
            }else{
                var abc=$filter("filter")(users,searchText);
                $scope.users=ABCSort(abc);
            }
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
                // var newUser = [];
                // $scope.users = [];
                // newUser = ABCSort(users);

                forLists(newUser);

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
            function forLists(newUser) {
                for (var i=0;i<newUser.length;i++){
                    console.log($scope.users)
                    $scope.users.push(newUser[i]);
                    time = (i*100+100)+'ms';
                    lists[i].style.animationDelay = time;
                };
            }
            //排序切换
            $(".switchSort").click(function(){
                $scope.users=[];
                var flag=$(this).attr("sort");
                if(flag=="groupName"){
                    var data= strSort(users,flag);
                    var datalist=[];
                    for(var i=0;i<data.length;i++){
                        datalist.push(data[i].details[0].team)
                    }
                    function sortarr(arrlist,dataSort){
                        for(i=0;i<arrlist.length-1;i++){
                            for(j=0;j<arrlist.length-1-i;j++){
                                if(arrlist[j]>arrlist[j+1]){
                                    var temp=arrlist[j];
                                    arrlist[j]=arrlist[j+1];
                                    arrlist[j+1]=temp;

                                    var sortdata=dataSort[j];
                                    dataSort[j]=dataSort[j+1];
                                    dataSort[j+1]=sortdata;
                                }
                            }
                        }
                        return dataSort;
                    }
                    $scope.users=sortarr(datalist,data);
                    console.log($scope.users);
                    forLists($scope.users);


                    //console.log($scope.users)


                    //time = (i*100+100)+'ms';
                    //lists[i].style.animationDelay = time;
                }
                if(flag=="ABC"){
                    $scope.users=ABCSort(users);
                }
            })

        })
    }])