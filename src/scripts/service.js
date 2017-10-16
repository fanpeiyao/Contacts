

angular.module("myApp")
    .service("ManService",function ($http,$q) {

        this.getAll = function () {
            //通过$q服务注册一个延迟对象 q
            var q=$q.defer();
            //通过q，可以得到一个承诺promise，而promise会返回当前任务的完成结果
            var obj=q.promise;

            $http({url:"resource/resource.json",method:"get"}).then(function (e) {
                q.resolve(e);
            });

            return obj;
        };
        //筛选
        this.getSort = function () {
            var sorts = [
                {
                    name:'groupName',
                    iconName:'contacts',
                    tag:''
                },
                {
                    name:'ABC',
                    iconName:'sort_by_alpha',
                    pink:true,
                    tag:''
                }
            ];
            return sorts;
        }

        this.getUserList = function(param){

            var deffered = $q.defer();
            $http({
                method:"GET",
                url:"server/getList.php?keyCode=json",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
                }
                //data:"keyCode="+encodeURIComponent(param)
            }).then(function(response){

                deffered.resolve(response.data);
            })
            return deffered.promise;
        }

    })

