angular.module('LobyHome')

    .controller('communityController', function ($scope, $timeout, $rootScope, updateWxTitle, apiService) {
        updateWxTitle('乐比社区');

        if($rootScope.lat && $rootScope.lon) {
            apiService.getCommunityList($rootScope.lon,$rootScope.lat).then(function (data) {
                $scope.commList = data;
                //if ($rootScope.lat && $rootScope.lon) {
                //    $scope.commList.forEach(function (item) {
                //        item.distance = '距离您' + Math.floor(getFlatternDistance(item.latitude, item.longitude, $rootScope.lat, $rootScope.lon) / 1000) + 'KM';
                //    });
                //}
            });
        }

        $scope.$on('glc', function (evt, data) {
            console.log(evt,data);
            if($rootScope.lat && $rootScope.lon) {
                apiService.getCommunityList($rootScope.lon,$rootScope.lat).then(function (data) {
                    $scope.commList = data;
                    //if ($rootScope.lat && $rootScope.lon) {
                    //    $scope.commList.forEach(function (item) {
                    //        item.distance = '距离您' + Math.floor(getFlatternDistance(item.latitude, item.longitude, $rootScope.lat, $rootScope.lon) / 1000) + 'KM';
                    //    });
                    //}
                });
            }
        });


        var EARTH_RADIUS = 6378137.0;    //单位M
        var PI = Math.PI;

        function getRad(d) {
            return d * PI / 180.0;
        }

        function getFlatternDistance(lat1, lng1, lat2, lng2) {
            var f = getRad((lat1 + lat2) / 2);
            var g = getRad((lat1 - lat2) / 2);
            var l = getRad((lng1 - lng2) / 2);

            var sg = Math.sin(g);
            var sl = Math.sin(l);
            var sf = Math.sin(f);

            var s, c, w, r, d, h1, h2;
            var a  = EARTH_RADIUS;
            var fl = 1 / 298.257;

            sg = sg * sg;
            sl = sl * sl;
            sf = sf * sf;

            s = sg * (1 - sl) + (1 - sf) * sl;
            c = (1 - sg) * (1 - sl) + sf * sl;

            w  = Math.atan(Math.sqrt(s / c));
            r = Math.sqrt(s * c) / w;
            d = 2 * w * a;
            h1 = (3 * r - 1) / 2 / c;
            h2 = (3 * r + 1) / 2 / s;

            return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
        }

        $scope.searchCommunity=function(keyword){
           apiService.searchCommunity(keyword,$rootScope.lat,$rootScope.lon).then(function(data){
               $scope.commList = data;
           })
        };

        $scope.searchKeyUp=function($event){
            if($event.keyCode==13){
                $scope.searchCommunity($scope.keyword)
            }
        };
    });