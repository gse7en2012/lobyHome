angular.module('LobyHome')

    .controller('mallCardAddController', function ($scope, $timeout, $rootScope, updateWxTitle,apiService,toastr) {
        updateWxTitle('添加福袋');

        $scope.commit=function(){
            toastr.error('等待后台开发')
        }

    });