
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
    .directive('listMap',function () {
        return {
            restrict:'A',
            link:function (scope,element,attr) {
               angular.element(document).ready(function () {
                   var mapId = element.attr('id');
                   var x = attr.coordx;
                   var y = attr.coordy;
                   // 百度地图API功能
                   var map = new BMap.Map(mapId);
                   var point = new BMap.Point(x,y);
                   map.centerAndZoom(point,13);
                   var marker = new BMap.Marker(point);  // 创建标注
                   map.addOverlay(marker);               // 将标注添加到地图中
                   marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
               })
            }
        }
    })





