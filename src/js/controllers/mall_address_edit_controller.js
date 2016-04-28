angular.module('LobyHome')

    .controller('mallAddressEditController', function ($scope, $timeout, $rootScope, $routeParams, apiService, updateWxTitle) {
        updateWxTitle('修改地址');


        apiService.getAddressList($routeParams.aid).then(function (data) {
            $scope.receiver                = data[0].receiver;
            $scope.receiver_phone_number = data[0].receiver_phone_number;
            $scope.receiver_country      = data[0].receiver_country;
            $scope.receiver_province     = data[0].receiver_province;
            $scope.receiver_detail_address = data[0].receiver_detail_address;
            $scope.is_default              = data[0].is_default;
        });


        $scope.receiver_country = '中国';
        $scope.editAddress      = function () {
            var addressDetails = {
                receiver: $scope.receiver,
                receiver_phone_number: $scope.receiver_phone_number,
                receiver_country: $scope.receiver_country,
                receiver_province: $scope.receiver_province,
                receiver_detail_address: $scope.receiver_detail_address,
                is_default: $scope.is_default,
                id:$routeParams.aid
            };

            apiService.editAddress(addressDetails).then(function (data) {
                alert('修改地址成功!');
                location.href = '/#/mall/address';
            })

        }


    });