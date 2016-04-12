angular.module('LobyHome')

    .controller('mallOrderSureController', function ($scope, $timeout, $rootScope, updateWxTitle) {
        updateWxTitle('乐比商城');


        $scope.stepNow=1;
        $scope.submit=function(){

            if($scope.stepNow==1){
                $scope.stepNow=2;
            }else{

            }
        }
    });