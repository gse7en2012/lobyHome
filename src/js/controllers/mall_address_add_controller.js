angular.module('LobyHome')

    .controller('mallAddressAddController', function ($scope, $timeout, $rootScope, apiService, updateWxTitle) {
        updateWxTitle('添加地址');

        $scope.receiver_country='中国';
        $scope.addAddress = function () {

            var addressDetails = {
                receiver: $scope.receiver,
                receiver_phone_number: $scope.receiver_phone_number,
                receiver_country: $scope.receiver_country,
                receiver_province: $scope.receiver_province,
                receiver_detail_address: $scope.receiver_detail_address,
                is_default:$scope.is_default
            };

            apiService.addAddress(addressDetails).then(function (data) {
                alert('新增地址成功!');
                location.href='/#/mall/address'
            })

        }


    });