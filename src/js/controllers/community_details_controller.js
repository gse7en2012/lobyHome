angular.module('LobyHome')

    .controller('communityDetailsController', function ($scope, $timeout, $rootScope, $routeParams, apiService, updateWxTitle) {


        apiService.getCommunityDetails($routeParams.cid).then(function (data) {
            var commData = data.detail;
            updateWxTitle(commData.name);

            $scope.address = commData.address;
            $scope.introduce = commData.introduce;

            $scope.name_of_community_leader = commData.name_of_community_leader;
            $scope.closeing_time            = commData.closeing_time;
            $scope.opening_time             = commData.opening_time;
            $scope.latitude                 = commData.latitude;
            $scope.longitude                = commData.longitude;
            $scope.imgList                  = eval(commData.images);

            $scope.actList=data.list;

            $scope.mItemBoxUlStyle= {
                "width":(baseWidth + 12) * $scope.actList.length+'px',
                "height":baseWidth*0.6+'px'
            };


        });



        updateWxTitle('社区详情');

        var baseWidth = screen.width * 0.75;
        baseWidth=280;

        $scope.cItemBoxUlStyle = {
            "width": (baseWidth + 12) * 5 + 'px',
            "height": baseWidth / 2 + 40 + 'px'
        };

        $scope.cItemBoxLiStyle = {
            "width": baseWidth + 'px',
            "height": baseWidth / 2 + 50 + 'px'
        };

        $scope.imgBoxStyle = {
            "width": baseWidth + 'px',
            "height": baseWidth / 2 + 'px'
        }

    });