/**
 * Created by zhuzhipeng on 16/4/27.
 */
angular.module('LobyHome')

    .controller('activityDetailsController',
        function ($scope,$rootScope) {
            $scope.actInfo = {};
            $scope.actInfo.actName = $rootScope.actInfo.actName;
            $scope.actInfo.online_time = $rootScope.actInfo.online_time;
        });