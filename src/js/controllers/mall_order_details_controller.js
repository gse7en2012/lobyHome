angular.module('LobyHome')

    .controller('mallOrderDetailsController', function ($scope, $timeout, $rootScope, $routeParams,updateWxTitle, apiService) {
        updateWxTitle('订单详情');
        var stateList=['全部','未完成','待收货','退货单','已完成'];
        var orderId=$routeParams.order_id;
        var state=$routeParams.order_state;

        apiService.getMallOrderDetails(state,orderId).then(function(data){
            data = data[0];
            data.state= stateList[data.order_state];
            $scope.orderDetails=data;
            $scope.total_pp=Number($scope.orderDetails.total_price)+Number($scope.orderDetails.freight)
        })


    });