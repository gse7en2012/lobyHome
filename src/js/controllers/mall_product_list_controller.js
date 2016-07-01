angular.module('LobyHome')
    .controller('mallProductListController',
        function ($scope, $timeout, $rootScope, $routeParams, apiService, updateWxTitle, $cookies) {

            $scope.goToDetails = function (id) {
                location.href = '#/mall/details/' + id;
            };


            $scope.page=1;
            $scope.size=6;
            $scope.loading=false;
            $scope.noMore=false;
            $scope.loadMore=function(){
                $scope.page++;
                if(!$scope.loading&&!$scope.noMore) {
                    $scope.loading=true;
                    apiService.getProductList(levelType,levelClass,$scope.page,$scope.size).then(function (data) {
                        $scope.loading=false;
                        var isMore=data[0];
                        if(!isMore){
                            return $scope.noMore=true;
                        }
                        $scope.prodList=$scope.prodList.concat(data);
                    });
                }
            };


            var levelClass = $routeParams.lv_class;
            var levelType=$routeParams.type;
            updateWxTitle(levelClass);

            apiService.getProductList(levelType,levelClass,$scope.page,$scope.size).then(function (data) {
                $scope.prodList = data;
            });
            //console.log($cookies.get('nn'));
        });