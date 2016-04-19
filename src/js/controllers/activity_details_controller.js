angular.module('LobyHome')

    .controller('activityDetailsController', function ($scope, $timeout, $rootScope,$routeParams,apiService,updateWxTitle) {
        $scope.actId=$routeParams.act_id;
        $scope.imgList=[];

        apiService.getActivityDetails($routeParams.act_id).then(function(data){
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

            updateWxTitle(details.name);
        })


    });