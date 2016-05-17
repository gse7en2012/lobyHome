angular.module('LobyHome')

    .controller('mallController', function ($scope, $timeout, $rootScope, updateWxTitle, apiService) {
        updateWxTitle('惠民公益');

        var baseWidth = screen.width * 0.75;

        baseWidth = 280;

        $scope.searchKeyUp=function($event){
            if($event.keyCode==13){
                $scope.searchProduct($scope.keyword)
            }
        };


        $scope.getMItemBoxUlStyle = function (len) {
            return {
                "width": (baseWidth + 15) * len + 15 + 'px',
                "height": baseWidth * 0.6 + 'px'
            };
        };


        apiService.mallIndex().then(function (data) {
            $scope.imgList    = data.banner;
            $scope.goodList = data.product;
            $scope.goodList2 = data.product;
            $scope.categories = data.categories;

            // var productCateList=[];
            $scope.productObj = {};
            data.product.forEach(function (prod) {
                if (!$scope.productObj[prod.level1_class]) {
                    $scope.productObj[prod.level1_class] = {
                        len: 0,
                        list: []
                    };
                }
                $scope.productObj[prod.level1_class].list.push(prod);
                $scope.productObj[prod.level1_class].len = $scope.productObj[prod.level1_class].len + 1;
            });


            console.log($scope.productObj);

            //$scope.mItemBoxUlStyle = {
            //    "width": (baseWidth + 12) * $scope.goodList.length + 'px',
            //    "height": baseWidth * 0.6 + 'px'
            //};
        });

        $scope.changeMenuIndex = function (index) {
            $scope.menuIndex = index
        };

        $scope.isMenuShow = false;
        $scope.menuIndex  = 1;

        $scope.mItemBoxUlStyle = {
            "width": (baseWidth + 20) * 5 + 'px',
            "height": baseWidth * 0.6 + 'px'
        };

        $scope.mItemBoxLiStyle = {
            "width": baseWidth + 'px',
            "height": baseWidth * 0.6 + 'px'
        };

        $scope.mImgBoxStyle = {
            "width": baseWidth + 'px',
            "height": baseWidth * 0.6 + 'px'
        };


        $scope.gotoMallDetails = function () {
            location.href = '#/mall/details/2'
        };


        $scope.searchProduct=function(keyword){
            if(keyword=='') return;
            location.href='#/mall/product/search?keyword='+keyword
        }

    });