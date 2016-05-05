angular.module('LobyHome')

    .controller('mallOrderListController', function ($scope, $timeout, $rootScope, updateWxTitle,apiService) {
        updateWxTitle('我的订单');

        apiService.getMallOrder().then(function(data){
            console.log(data);
        })
    });