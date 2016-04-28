angular.module('LobyHome')

    .controller('mallDetailsController', function ($scope, $timeout, $rootScope, $routeParams, apiService, updateWxTitle) {


        apiService.getProductionDetails($routeParams.good_id).then(function (data) {
            var goodData        = data[0];
            $scope.price = goodData.price;
            $scope.on_sale_time = goodData.on_sale_time;
            $scope.description  = goodData.description;
            $scope.name         = goodData.name;
            $scope.inventory    = goodData.inventory;
            $scope.productId=goodData.id;
            $scope.imgList=eval(goodData.images);
        });


        $scope.addToShopCarts=function(){
            apiService.addToShopCart($scope.productId,$scope.buyNum).then(function(data){
                console.log(data);
                alert('已添加至购物车!')
            })
        };


        updateWxTitle('商品详情');


        $scope.buyNum      = 1;
        $scope.minusGoodNum = function () {
            if ($scope.buyNum > 0) $scope.buyNum--;
        };

        $scope.addGoodNum = function () {
            $scope.buyNum++;
        };


    });