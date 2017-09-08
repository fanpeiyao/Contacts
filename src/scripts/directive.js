
angular.module('myApp')
    .directive('listActive',['$window',function ($window) {
        return {
            restrict:'A',
            scope:{
                listActive:'@'
            },
            link:function (scope,element) {
                element.on('click',function () {
                    var detail_target = angular.element(this).attr('data-id');
                    var ty = $window.innerHeight/2 - element[0].offsetTop -4;
                    angular.element(this).attr('style',"transform: translateY(" + ty + "px)");
                    var de = document.getElementById(detail_target);
                    de.setAttribute('class','active list-detail')
                    angular.element(this).find('.md-card-image').addClass('aa');
                })
            }
        }
    }])

