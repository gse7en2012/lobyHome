angular.module('LobyHome')

    .controller('mallCardListController', function ($scope, $timeout, $rootScope, updateWxTitle,apiService) {
        updateWxTitle('我的卡券');

        apiService.getLuckyBagList().then(function(data){
            $scope.cardsList=data;
        })

    });