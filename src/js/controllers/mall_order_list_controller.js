angular.module('LobyHome')

    .controller('mallOrderListController', function ($scope, $timeout, $rootScope, updateWxTitle, apiService) {
        updateWxTitle('我的订单');

        var stateList = ['全部', '未完成', '未发货', '退货单', '已完成','已发货'];


        apiService.getMallOrder().then(function (data) {
            $scope.orderList = data;
            if (data.length > 0) {
                $scope.orderList.forEach(function (item) {
                    item.state = stateList[item.order_state]
                });
            }
        });

        $scope.confirm = function (id) {
            apiService.sureOrder(id).then(function (d) {
                $scope.orderList.forEach(function (item) {
                    if (item.order_id == id) {
                        item.order_state = 4;
                        item.state = stateList[item.order_state];

                    }
                })
            })
        };

        $scope.gotoPay=function(){
            location.href='#/mall/ordersure';
        };

        $scope.cancelOrder=function(){
            if(confirm('确定取消该订单?')){
                apiService.cancelPayOrder().then(function(data){
                    alert('取消订单成功!');
                    window.reload();
                })
            }
        }

    });