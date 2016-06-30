angular.module('LobyHome')
    .controller('mallProductSearchController',
        function ($scope, $timeout, $rootScope, $routeParams, apiService, updateWxTitle, $cookies) {
            var keyword = $routeParams.keyword;
            $scope.page=1;
            $scope.size=8;
            $scope.loading=false;
            $scope.noMore=false;
            $scope.loadMore=function(){
                $scope.page++;
                if(!$scope.loading&&!$scope.noMore) {
                    $scope.loading=true;
                    apiService.searchProductList(keyword, $scope.page, $scope.size).then(function (data) {
                        $scope.loading=false;
                        var isMore=data[0];
                        if(!isMore){
                            return $scope.noMore=true;
                        }
                        $scope.prodList.push(data);
                    });
                }
            };


            $scope.goToDetails = function (id) {
                location.href = '#/mall/details/' + id;
            };


            updateWxTitle('"'+keyword+'"的搜索结果');

            apiService.searchProductList(keyword,$scope.page,$scope.size).then(function (data) {
                $scope.prodList = data;
            });
            //console.log($cookies.get('nn'));
        });