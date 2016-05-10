angular.module('LobyHome')

    .controller('mallAddressController', function ($scope, $timeout, $rootScope, $routeParams, apiService, updateWxTitle) {
        updateWxTitle('地址管理');
        var from = $routeParams.from;
        console.log(from);
        $scope.addressList = [];

        apiService.getAddressList().then(function (data) {
            $scope.addressList = data;
            $scope.addressList.forEach(function (item) {
                item.receiver_phone_number = item.receiver_phone_number.slice(0, 3) + '****' + item.receiver_phone_number.slice(7, 11)
            })
        });


        $scope.addressBack = function () {

            if (from == 'order') {
                location.href = '#/mall/ordersure'
            } else {
                history.back()
            }
        };

        $scope.chooseOrderAddress = function () {
            if(from=='order'){
                location.href = '#/mall/ordersure'
            }
        };


        $scope.changeDefault = function (id) {
            $scope.addressList.forEach(function (item) {
                if (item.id != id) {
                    item.is_default = 0;
                } else {
                    item.is_default = 1;
                }
            });
            apiService.editDefaultAddress({
                id: id,
                is_default: 1
            })
        };

        $scope.deleteAddress = function (id) {
            if (confirm('确定删除该地址?')) {
                apiService.deleteAddress({id: id})
            }
        }
    });