angular.module('LobyHome')

.controller('mallController', function($scope,$timeout,$rootScope,updateWxTitle,apiService){
    updateWxTitle('乐比城');

    var baseWidth=screen.width*0.75;

    baseWidth=280;

    apiService.mallIndex().then(function(data){
        $scope.imgList=data.result.banner;
        $scope.goodList=data.result.product;
        $scope.goodList2=data.result.product;
        $scope.categories=data.result.categories;

        console.log($scope.categories);

        $scope.mItemBoxUlStyle= {
            "width":(baseWidth + 12) * $scope.goodList.length+'px',
            "height":baseWidth*0.6+'px'
        };
    });

    $scope.changeMenuIndex=function(index){
        $scope.menuIndex=index
    };

    $scope.isMenuShow=false;
    $scope.menuIndex=1;

    $scope.mItemBoxUlStyle= {
        "width":(baseWidth + 20) * 5+'px',
        "height":baseWidth*0.6+'px'
    };

    $scope.mItemBoxLiStyle={
        "width":baseWidth+'px',
        "height":baseWidth*0.6+'px'
    };

    $scope.mImgBoxStyle={
        "width":baseWidth+'px',
        "height":baseWidth*0.6+'px'
    };


    $scope.gotoMallDetails=function(){
        location.href='#/mall/details/2'
    };


});