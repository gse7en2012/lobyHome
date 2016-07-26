angular.module('LobyHome')

    .controller('mallDetailsController', function ($scope, $timeout, $rootScope, $routeParams,$sce, apiService, updateWxTitle, toastr) {


        $scope.flickityOptions = {
            //freeScroll: true,
            wrapAround: true,
            cellSelector: '.mySlideClassName',
            imagesLoaded: true,
            autoPlay: true
        };


        apiService.getProductionDetails($routeParams.good_id).then(function (data) {
            var goodData        = data[0];
            $scope.price = goodData.origin_price;
            $scope.hm_price = goodData.price;
            $scope.on_sale_time = goodData.on_sale_time;
            $scope.description  = $sce.trustAsHtml(goodData.description);
            $scope.name         = goodData.name;
            $scope.inventory    = goodData.inventory;
            $scope.productId    = goodData.id;
            $scope.imgList      = eval(goodData.images);

            $timeout(function () {
                var flkty = new Flickity('.slider', $scope.flickityOptions);
            }, 0);


        });


        $scope.addToShopCarts = function () {
            if ($scope.userInfo.is_registered != 1) {
                alert('请先通过手机号码绑定用户!');
                return location.href = '#/reg?red=' + encodeURIComponent(location.href);
            }
            apiService.addToShopCart($scope.productId, $scope.buyNum).then(function (data) {
                toastr.success('已添加至购物车!')
            })
        };


        updateWxTitle('商品详情');


        $scope.buyNum       = 1;
        $scope.minusGoodNum = function () {
            if ($scope.buyNum > 0) $scope.buyNum--;
        };

        $scope.addGoodNum = function () {
            $scope.buyNum++;
        };


        function generateOrderList() {
            var r = [];
            r.push({
                product_id: $scope.productId,
                buy_number: $scope.buyNum
            });
            return r;
        }


        //立即购买
        $scope.buyNow = function () {
            if ($scope.userInfo.is_registered != 1) {
                alert('请先通过手机号码绑定用户!');
                return location.href = '#/reg?red=' + encodeURIComponent(location.href);
            }

            var orderList = generateOrderList();
            apiService.generateMallOrder(orderList).then(function (r) {
                $rootScope.orderDetails = r;
                location.href           = "#/mall/ordersure";
            }).catch(function (e) {
                alert(e.msg);
                if(e.code=='304') {
                    $rootScope.mallAddressReturnMall=location.href;
                    location.href = '#/mall/address';
                }
                if(e.code=='303') {
                    location.href = '#/mall/order/list';
                }
            });
        }

    });