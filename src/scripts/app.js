var myApp = angular.module("myApp",['ngMaterial','ngAria','ngAnimate'])
    .controller("ManCtrl",["$scope","ManService",'$filter','$timeout','$window','$rootScope',function ($scope,ManService,$filter,$timeout,$window,$rootScope) {

        //更改详情页在iPhone端兼容样式
        var con = document.getElementsByClassName('content')[0];
        con.style.minHeight=$window.innerHeight +'px';
        //获取各个列表为以后添加动画准备
        var lists = document.getElementsByClassName('son-list'),time;

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
            $scope.searchText='';
            $scope.clickIcon = false;
            loadData();
        };

        //实现查询功能
        $scope.change=function (searchText) {
            var abc=$filter("filter")(users,searchText);
            $scope.users=ABCSort(abc);
        };

        //获取列表数据
        var p = ManService.getAll(),users=[];
        p.then(function (result) {
            if (result.status == 200){
                users = result.data.dateList;
                img(users);
                $rootScope.allPoint=mapList(users);
            }else{
                alert('加载数据出错');
            }
        });

        /**图片预加载 start**/
        function img(users){
            var imgList=[];
            imgList.push("resource/images/cover.jpg");

            for(var i=0;i<users.length;i++){
                imgList.push(users[i].photo,users[i].photoBg);
            }
            console.log(imgList);
            imgLoader(imgList, function (percentage) {
                var percentT = parseInt(percentage * 100);
                document.getElementById('percent').innerHTML=percentT+"%";
                if (parseInt(percentT) == 100) {
                    document.getElementById('loading').style.display='none';
                    var cover = document.getElementById('coverPic');
                    cover.style.display='block';
                    $timeout(function(){
                        document.getElementById('cover').setAttribute("class","fadeOut");
                        $timeout(function(){
                            document.getElementById('cover').style.display="none";
                        },1200);
                        loadData();
                    },3000);
                }
            });
        }
        /**图片预加载 end**/

        function loadData() {
            var newUser = [];
            newUser = ABCSort(users);
            forLists(newUser);
            //mapList(newUser)
        }

        function forLists(newUser) {
            $scope.users = [];
            for (var i=0;i<newUser.length;i++){
                $scope.users.push(newUser[i]);
            };
            requestAnimationFrame(function() {
                for (var i=0;i<10;i++){
                    time = (i*100+100)+'ms';
                    lists[i].classList.add('fadeInUpBig');
                    lists[i].style.animationDelay = time;
                };
            })
        }

        //获取排序按钮
        $scope.sortsIcon = ManService.getSort();

        //排序切换
        $scope.switch=function(name){
            $scope.showIon = false;
            if(name=='groupName'){
                var flag=name;
                var data= strSort(users,flag);
                $scope.users = data.sort(function(a,b){
                    if(a.details[0].team<b.details[0].team)
                        return -1;
                    else
                        return 1;
                })
            }
            if(name=='ABC'){
                $scope.users = ABCSort(users);
            }
        }


        function mapList(users){
            var mapList=[];
            for(var i=0;i<users.length;i++){
                mapList[i]={name:users[i].name,x:users[i].coordX,y:users[i].coordY}
            }
            return mapList;
        }

    }])