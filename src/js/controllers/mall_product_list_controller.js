angular.module('LobyHome')
    .controller('mallProductListController',
        function ($scope, $timeout, $rootScope, $routeParams, apiService, updateWxTitle, $cookies) {

            $scope.goToDetails = function (id) {
                location.href = '#/mall/details/' + id;
            };

            var levelClass = $routeParams.lv_class;
            updateWxTitle(levelClass);

            apiService.getProductList(levelClass).then(function (data) {
                $scope.prodList = data;
            });
            //console.log($cookies.get('nn'));
        });