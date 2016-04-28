angular.module('LobyHome')

    .controller('mallShopCartController', function ($scope, $timeout, $rootScope, apiService, updateWxTitle) {
        updateWxTitle('购物车');


        $scope.shopCartList = [];

        apiService.getShopCartList().then(function (data) {
            data.forEach(function (item) {
                $scope.shopCartList.push({
                    name: item.product_info.name,
                    num: item.buy_number,
                    price: item.product_info.price,
                    img: item.product_info.icon_url,
                    origin: '',
                    choose: true,
                    color: '',
                    shop_cart_id: item.id
                })
            })
        });


        //$scope.shopCartList = [
        //    {
        //        name: '美度指挥官二代天文台认证16px',
        //        color: '黑盘红针14px',
        //        num: 1,
        //        price: '1399',
        //        choose: true,
        //        img: 'http://img11.360buyimg.com/n1/jfs/t2161/289/1870931866/172716/4eae4d33/567b9f2bN19086430.jpg',
        //        origin: '瑞士13px'
        //    }
        //];


        function editItem(good) {
            $scope.editDataObj[good.shop_cart_id] = good.num;
        }
        function transferEditData(){
            Object.keys($scope.editDataObj).forEach(function(key){
                $scope.editData.push({
                    id:key,
                    buy_num:$scope.editDataObj[key]
                })
            });
        }

        //存放修改过的订单数组
        $scope.editDataObj = {};
        $scope.editData    = [];

        $scope.isAllChoose = true;
        $scope.chooseAll   = function () {
            $scope.isAllChoose = !$scope.isAllChoose;
            $scope.shopCartList.forEach(function (item) {
                item.choose = $scope.isAllChoose;
            })
        };

        $scope.listLen    = $scope.shopCartList.reduce(function (p, c) {
            var add = c.choose ? 1 : 0;
            return p + add
        }, 0);
        $scope.totalPrice = ($scope.shopCartList.reduce(function (prev, curr) {
            var add = curr.choose ? Number(curr.price) * curr.num : 0;
            return (prev + add).toFixed(2)
        }, 0));

        $scope.edit = function () {
            $scope.isEdit       = !$scope.isEdit;
            $scope.shopCartList = $scope.shopCartList.filter(function (item) {
                return item.choose == true;
            });
            if(!$scope.isEdit) {
                transferEditData();
                apiService.editShopCartNum($scope.editData).then(function(){
                    $scope.editData=[];
                });
            }
        };


        $scope.deleteGood=function(good){
            good.choose=!good.choose;
            if(!good.choose){
                good.num=0;
                editItem(good);
            }
        };

        $scope.minusGoodNum = function (good) {
            if (good.num > 0) good.num--;
            editItem(good);
        };

        $scope.addGoodNum = function (good) {
            good.num++;
            editItem(good);
        };

        $scope.goToPay = function () {
            if ($scope.isEdit) return;
            location.href = "#/mall/ordersure";
        };


        $scope.$watch('shopCartList', function () {
            $scope.totalPrice = ($scope.shopCartList.reduce(function (prev, curr) {
                var add = curr.choose ? Number(curr.price) * curr.num : 0;
                return prev + add
            }, 0));
            $scope.listLen    = $scope.shopCartList.reduce(function (p, c) {
                var add = c.choose ? 1 : 0;
                return p + add
            }, 0);

            if ($scope.listLen != $scope.shopCartList.length) $scope.isAllChoose = false;

        }, true)
    });