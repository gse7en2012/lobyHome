angular.module('LobyHome')

.controller('mallDetailsController', function($scope,$timeout,$rootScope,$routeParams,apiService,updateWxTitle){


    apiService.getProductionDetails($routeParams.good_id).then(function(data){

    });



    $scope.imgList=[
        'images/t1.jpg',
        'images/t2.jpg',
        'images/c2.jpg',
        'images/c1.jpg'
    ];

    $scope.actList=[
        {
            img:'images/t1.jpg',
            name:'国学进社',
            time:'04月03日',
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
    updateWxTitle('社区详情');
    var baseWidth=screen.width*0.75;
    $scope.cItemBoxUlStyle= {
        "width":(baseWidth + 20) * $scope.actList.length+'px',
        "height":baseWidth/2+40+'px'
    };

    $scope.cItemBoxLiStyle={
        "width":baseWidth+'px',
        "height":baseWidth/2+50+'px'
    };

    $scope.imgBoxStyle={
        "width":baseWidth+'px',
        "height":baseWidth/2+'px'
    };
    $scope.buyNum=1;
    $scope.minusGoodNum=function(){
        if($scope.buyNum>0) $scope.buyNum--;
    };

    $scope.addGoodNum=function(){
        $scope.buyNum++;
    };


});