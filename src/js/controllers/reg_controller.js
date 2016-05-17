angular.module('LobyHome')

    .controller('regController', function ($scope, $interval, $rootScope, $routeParams, updateWxTitle, apiService, toastr) {
        $scope.stepNow = 1;
        $scope.isSend  = false;
        $scope.isRead  = false;
        $scope.cc      = 179;

        $rootScope.red = decodeURIComponent($routeParams.red);


        function checkPhoneIsReg(phone) {
            return apiService.checkReg(phone);
        }


        $scope.stepNext = function () {
            //$rootScope.Ui.turnOn('modal1');
            if (!$scope.name || !$scope.phone || !$scope.isRead) return;
            return checkPhoneIsReg($scope.phone).then(function (r) {
                if (!r) {
                    $scope.stepNow = 2;
                } else {
                    toastr.error('该手机已经注册!')
                }
            }).catch(function(e){
                toastr.error(e)
            })

        };

        $scope.sendCode = function () {
            if ($scope.isSend) return;
            $scope.isSend = true;

            apiService.getRegCheckCode($scope.phone).then(function (data) {
                toastr.info('验证码已发送,请注意查收!')
            });

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

        $scope.postReg = function (e) {
            apiService.postReg({
                phone_number: $scope.phone,
                real_name: $scope.name,
                check_code: $scope.code
            }).then(function () {
                $scope.userInfo.is_registered=1;
                $rootScope.Ui.turnOn('modal1');
            }).catch(function (e) {
                toastr.error(e)
            })
        };


    });