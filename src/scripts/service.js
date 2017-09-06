

angular.module("myApp")
    .factory("ManService",function ($http,$q) {

        var q=$q.defer();
        var obj=q.promise;

        $http({url:"../resource/resource.json",method:"get"}).then(function (e) {
            q.resolve(e);
        })
        return obj;

    })

