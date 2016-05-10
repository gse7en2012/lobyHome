angular.module('LobyHome')

    .controller('mallCardPickController', function ($scope, $timeout, $rootScope, updateWxTitle,apiService,toastr) {
        updateWxTitle('领取福袋');

        $scope.commit=function(){
            apiService.getLuckyBag().then(function(data){
                alert('领取'+data.name+'成功!');
                location.href='#/mall/luckybag'
            }).catch(function(e){
                toastr.error(e)
            })
        }

    });