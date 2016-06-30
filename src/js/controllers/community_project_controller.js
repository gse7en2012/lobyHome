angular.module('LobyHome')

    .controller('communityProjectController', function ($scope, $timeout, $rootScope, $routeParams, $sce, apiService, FlickityService, updateWxTitle) {


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



        apiService.getCommunitySp($routeParams.pid).then(function (data) {
            var commData = data.detail[0];
            updateWxTitle(commData.name);
            $scope.project=commData;
            $scope.project.introduce=$sce.trustAsHtml(commData.introduce);
            $timeout(function () {
                //var element = angular.element(document.getElementById('slider'));
                //FlickityService.create(element[0], element[0].id,$scope.flickityOptions);
                var flkty1 = new Flickity('.slider', $scope.flickityOptions);
            }, 0);

        });



        updateWxTitle('项目详情');


    });