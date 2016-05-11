angular.module('LobyHome')
    .controller('mallProductSearchController',
        function ($scope, $timeout, $rootScope, $routeParams, apiService, updateWxTitle, $cookies) {

            $scope.goToDetails = function (id) {
                location.href = '#/mall/details/' + id;
            };

            var keyword = $routeParams.keyword;
            updateWxTitle('"'+keyword+'"的搜索结果');

            apiService.searchProductList(keyword).then(function (data) {
                $scope.prodList = data;
            });
            //console.log($cookies.get('nn'));
        });