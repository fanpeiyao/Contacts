
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
    .directive('listMap',['$rootScope',function ($rootScope) {
        return {
            restrict:'A',
            link:function (scope,element,attr) {
               angular.element(document).ready(function () {
                   //console.log($rootScope.allPoint);
                   var mapId = element.attr('id');
                   var area = attr.area;
                   // var x = attr.coordx;
                   // var y = attr.coordy;
                   // // 百度地图API功能
                   // var map = new BMap.Map(mapId);
                   // var point = new BMap.Point(x,y);
                   // map.centerAndZoom(point,13);
                   // var marker = new BMap.Marker(point);  // 创建标注
                   // map.addOverlay(marker);               // 将标注添加到地图中


                   var map = new BMap.Map(mapId);
                   map.centerAndZoom(new BMap.Point('120，30'), 13);
                   var local = new BMap.LocalSearch(map, {
                       renderOptions:{map: map}
                   });
                   local.search(area);


               })
            }
        }
    }])





