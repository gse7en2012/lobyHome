angular.module('LobyHome')

    .controller('activityDetailsController', function ($scope, $timeout, $rootScope,$routeParams,apiService,updateWxTitle) {
        $scope.imgList = [
            'images/t1.jpg',
            'images/t2.jpg',
            'images/c1.jpg',
            'images/c2.jpg'
        ];


        //document.title=$scope.actInfo.actName;
        //console.log($routeParams.art_id);

        apiService.getActivityDetails($routeParams.art_id).then(function(data){
            var details=data[0];
            $scope.actInfo = {
                commName: details.sponsor_community,
                actName: details.name,
                location: details.address,
                concatName: details.name_of_activity_leader,
                time: details.time,
                lastTime: details.duration+'分钟',
                num: details.total_number_of_people+'人',
                age: details.participant,
                ctx:details.intruduce
            };
            $scope.imgList = eval(details.images);

            updateWxTitle(details.actName);
        })


    });