angular.module('LobyHome')

.controller('mallController', function($scope,$timeout,$rootScope,updateWxTitle){
    updateWxTitle('乐比城');

    $scope.isMenuShow=false;
    $scope.menuIndex=1;
    $scope.imgList=[
        'images/t1.jpg',
        'images/t2.jpg',
        'images/c2.jpg',
        'images/c1.jpg'

    ];

    $scope.goodList=[
        {
            img:'images/t1.jpg',
            name:'国学进社16px',
            id:1,
        },
        {
            img:'images/t2.jpg',
            name:'贫困山区支教',
            id:1,
        },
        {
            img:'images/c3.jpg',
            name:'开心植树节',
            id:1,
        },
        {
            img:'images/c1.jpg',
            name:'爱心敬老院',
            id:1,
        }
    ];

    $scope.goodList2=[
        {
            img:'images/c1.jpg',
            name:'国学进社',
            id:1,
        },
        {
            img:'images/c3.jpg',
            name:'贫困山区支教',
            id:1,
        },
        {
            img:'images/t2.jpg',
            name:'开心植树节',
            id:1,
        },
        {
            img:'images/t1.jpg',
            name:'爱心敬老院',
            id:1,
        }
    ];


    var baseWidth=screen.width*0.75;
    $scope.mItemBoxUlStyle= {
        "width":(baseWidth + 20) * $scope.goodList.length+'px',
        "height":baseWidth*0.6+'px'
    };

    $scope.mItemBoxLiStyle={
        "width":baseWidth+'px',
        "height":baseWidth*0.6+'px'
    };

    $scope.mImgBoxStyle={
        "width":baseWidth+'px',
        "height":baseWidth*0.6+'px'
    }

    $scope.gotoMallDetails=function(){
        location.href='#/mall/details/2'
    }


    $scope.imgList=[
        'images/t1.jpg',
        'images/t2.jpg',
        'images/c2.jpg',
        'images/c1.jpg'
    ];

    $scope.actList=[
        {
            img:'images/t1.jpg',
            name:'国学进社20px',
            time:'04月03日16px',
            id:1,
            link:'#/community/details/'
        },
        {
            img:'images/t2.jpg',
            name:'贫困山区支教',
            time:'05月03日',
            id:1,
            link:'#/community/details/'
        },
        {
            img:'images/c3.jpg',
            name:'开心植树节',
            time:'06月03日',
            id:1,
            link:'#/community/details/'
        },
        {
            img:'images/c1.jpg',
            name:'爱心敬老院',
            time:'07月03日',
            id:1,
            link:'#/community/details'
        }
    ];

});