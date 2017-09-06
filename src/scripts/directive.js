
angular.module('myApp')
    .directive('listActive',function () {
        return {
            restrict:'A',
            scope:{
                listActive:'@'
            },
            link:function (scope,element) {
                element.on('click',function () {
                    var detail_target = angular.element(this).attr('data-id');
                    var de = document.getElementById(detail_target);
                    de.setAttribute('class','active list-detail')
                    angular.element(this).find('.md-card-image').addClass('aa');
                })
            }
        }
    })

