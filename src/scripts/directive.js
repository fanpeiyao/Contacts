
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
                    var de = document.getElementById(detail_target);
                    de.setAttribute('class','active list-detail');
                    //ios端tabbar样式不能删除
                    var bar = document.getElementsByClassName('toolbar')[0];
                    bar.style.display='none';

                    angular.element(this).find('.md-card-image').addClass('aa');
                })
            }
        }
    }])

