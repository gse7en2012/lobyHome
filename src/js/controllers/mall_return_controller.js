angular.module('LobyHome')

    .controller('mallReturnController', function ($scope, $timeout, $rootScope, $routeParams, apiService, updateWxTitle) {
        updateWxTitle('申请退货');


        var orderId = $routeParams.order_id;

        $scope.ensureReturn = function () {
            if(!$scope.refund_reason||!$scope.refund_connection){
                return alert('请把资料填写完整!')
            }
            apiService.returnMoney({
                order_id: orderId,
                refund_reason: $scope.refund_reason,
                refund_connection: $scope.refund_connection
            }).then(function(data){
                alert(data);
                location.href='#/mall/order/list/'
            }).catch(function(e){
                alert(e)
            })
        }


    });