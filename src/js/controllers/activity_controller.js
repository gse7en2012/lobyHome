angular.module('LobyHome')
    .controller('activityController',
        function ($scope, $timeout, $rootScope, apiService, updateWxTitle, $cookies) {
            updateWxTitle('活动报名');

            $scope.goToDetails = function (id) {
                location.href = '#/activity/' + id;
            };

            $scope.page=1;
            $scope.size=6;
            $scope.loading=false;
            $scope.noMore=false;

            apiService.getActivityList().then(function (data) {
                $scope.actList = data;
            });
            //console.log($cookies.get('nn'));



            $scope.loadMore=function(){
                $scope.page++;
                if(!$scope.loading&&!$scope.noMore) {
                    $scope.loading = true;

                    apiService.getActivityList($scope.page, $scope.size).then(function (data) {
                        $scope.loading = false;
                        var isMore     = data[0];
                        if (!isMore) {
                            return $scope.noMore = true;
                        }
                        $scope.actList = $scope.actList.concat(data);
                    });
                }
            }
        });