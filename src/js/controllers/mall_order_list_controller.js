angular.module('LobyHome')

    .controller('mallOrderListController', function ($scope, $timeout, $rootScope, updateWxTitle,apiService) {
        updateWxTitle('我的订单');

        var stateList=['全部','未完成','待收货','退货单','已完成'];


        apiService.getMallOrder().then(function(data){
            $scope.orderList=data;
            if(data.length>0) {
                $scope.orderList.forEach(function (item) {
                    item.state = stateList[item.order_state]
                });
            }
        })
    });