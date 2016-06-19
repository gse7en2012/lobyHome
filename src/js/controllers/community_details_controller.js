angular.module('LobyHome')

    .controller('communityDetailsController', function ($scope, $timeout, $rootScope, $routeParams, $sce, apiService, FlickityService, updateWxTitle) {


        $scope.flickityOptions = {
            //freeScroll: true,
            wrapAround: true,
            cellSelector: '.mySlideClassName',
            imagesLoaded: true,
            autoPlay: true,
            cellAlign: 'left',
            prevNextButtons: false
        };


        $scope.listFlickityOptions = {
            //freeScroll: true,
            wrapAround: true,
            cellSelector: '.mall-show-list',
            imagesLoaded: true,
            autoPlay: true,
            cellAlign: 'left',
            prevNextButtons: false
        };



        apiService.getCommunitySp($routeParams.cid).then(function(data){

            $scope.proList=data;
            console.log(data);
            //$timeout(function () {
            //
            //    var projectFlkty = new Flickity('.projectSlider', $scope.listFlickityOptions);
            //
            //}, 0);

        });


        apiService.getCommunityDetails($routeParams.cid).then(function (data) {
            var commData = data.detail;
            updateWxTitle(commData.name);
            $scope.address   = commData.address;
            $scope.introduce = commData.introduce;

            $scope.name_of_community_leader = commData.name_of_community_leader;
            $scope.closeing_time            = commData.closeing_time;
            $scope.opening_time             = commData.opening_time;
            $scope.latitude                 = commData.latitude;
            $scope.longitude                = commData.longitude;
            $scope.imgList                  = eval(commData.images);
            $scope.phone                    = commData.phone_number_of_community_leader;
            $scope.introduce                = $sce.trustAsHtml(commData.introduce);


            $scope.actList          = data.list;
            $scope.projectList = data.project_list;
            $scope.mItemBoxUlStyle1 = {
                "width": (baseWidth + 12) * $scope.actList.length + 'px',
                "height": baseWidth * 0.6 + 'px'
            };

            $scope.mItemBoxUlStyle2 = {
                "width": (baseWidth + 12) * $scope.projectList.length + 'px',
                "height": baseWidth * 0.6 + 'px'
            };
            //
            //var element = angular.element(document.getElementById('slider'));
            //FlickityService.create(element[0], element[0].id,$scope.flickityOptions);
            //console.log('eee');
            $timeout(function () {
                //var element = angular.element(document.getElementById('slider'));
                //FlickityService.create(element[0], element[0].id,$scope.flickityOptions);
                var flkty = new Flickity('.slider', $scope.flickityOptions);


                //idList.forEach(function(item){
                var listFlkty = new Flickity('.actSlider', $scope.listFlickityOptions);
                var listFlkty2 = new Flickity('.projectSlider', $scope.listFlickityOptions);
                //})


            }, 0);

        });


        //angular.element(document).ready(function(){
        //    var element = angular.element(document.getElementById('slider'));
        //    FlickityService.create(element[0], element[0].id,$scope.flickityOptions);
        //});


        updateWxTitle('社区详情');

        var baseWidth = screen.width * 0.75;
        baseWidth     = 280;

        $scope.cItemBoxUlStyle1 = {
            "width": (baseWidth + 12) * 5 + 'px',
            "height": baseWidth / 2 + 40 + 'px'
        };
        $scope.cItemBoxUlStyle2 = {
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