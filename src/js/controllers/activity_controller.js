angular.module('LobyHome')

    .controller('activityController',
        ['$scope', '$timeout', '$rootScope', 'apiService', 'updateWxTitle','$cookies',
            function ($scope, $timeout, $rootScope, apiService, updateWxTitle,$cookies) {
                updateWxTitle('最新活动');

                $scope.goToDetails = function (id) {
                    location.href = '#/activity/' + id;
                };

                apiService.getActivityList().then(function (data) {
                    data.forEach(function(item){
                        var imglist=eval(item.images);
                        item.indexImg=imglist[0];
                    });
                    $scope.actList=data;
                });
                //console.log($cookies.get('nn'));
            }]);