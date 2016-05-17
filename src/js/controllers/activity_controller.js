angular.module('LobyHome')
    .controller('activityController',
        function ($scope, $timeout, $rootScope, apiService, updateWxTitle, $cookies) {
            updateWxTitle('活动报名');

            $scope.goToDetails = function (id) {
                location.href = '#/activity/' + id;
            };

            apiService.getActivityList().then(function (data) {
                $scope.actList = data;
            });
            //console.log($cookies.get('nn'));
        });