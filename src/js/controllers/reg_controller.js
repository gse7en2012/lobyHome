angular.module('LobyHome')

    .controller('regController', function ($scope, $interval, $rootScope,updateWxTitle) {
        $scope.stepNow = 1;
        $scope.isSend  = false;
        $scope.isRead  = false;
        $scope.cc      = 59;


        $scope.stepNext = function () {
            if (!$scope.name || !$scope.phone || !$scope.isRead) return;
            $scope.stepNow = 2;
        };

        $scope.sendCode = function () {
            if ($scope.isSend) return;
            $scope.isSend=true;
            var timer = $interval(function () {
                $scope.cc--;
                if ($scope.cc == 0) {
                    $interval.cancel(timer);
                    $scope.isSend = false;
                    $scope.cc     = 59;
                }
            }, 1000, 60);
        };


        updateWxTitle('成为乐比居民');

        $scope.lastStep = function (e) {
            console.log(33);

        }
    });