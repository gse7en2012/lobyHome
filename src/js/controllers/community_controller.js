angular.module('LobyHome')

.controller('communityController', function($scope,$timeout,$rootScope,updateWxTitle,apiService){
    updateWxTitle('乐比社区');

    apiService.getCommunityList().then(function(data){
        console.log(data);
    });

    $scope.commList=[
        {
            name:'景龙社区服务中心',
            img:'images/c1.jpg',
            distance:'0.25KM',
            id:1
        },
        {
            name:'景龙社区服务中心',
            img:'images/c2.jpg',
            distance:'1.25KM',
            id:2
        },
        {
            name:'景龙社区服务中心',
            img:'images/c3.jpg',
            distance:'2.35KM',
            id:3
        },
        {
            name:'景龙社区服务中心',
            img:'images/t1.jpg',
            distance:'2.65KM',
            id:4
        },
        {
            name:'景龙社区服务中心',
            img:'images/t2.jpg',
            distance:'3.05KM',
            id:5
        }

    ]

});