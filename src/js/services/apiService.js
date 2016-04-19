/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('LobyHome').service('apiService', ['$http', '$q', function ($http, $q) {
    var remoteAddress='http://lobicom.com/api/';
    function httpRequest(opts) {
        var d = $q.defer();
        $http(opts).success(d.resolve).error(d.reject);
        return d.promise;
    }
    function transferData(data){
        if(data.errCode==200){
            return data.result;
        }
        return $q.reject('出错了');
    }

    //活动列表
    this.getActivityList=function(){
        return httpRequest({
            method:'GET',
            url:remoteAddress+'newest_activity'
        }).then(transferData)
    };
    this.getActivityDetails=function(id){
        return httpRequest({
            method:'GET',
            url:remoteAddress+'activity?id='+id
        }).then(transferData)
    };


    //社区列表
    this.getCommunityList=function(){
        return httpRequest({
            method:'GET',
            url:remoteAddress+'community'
        }).then(transferData)
    };


    //this.deleteInfoArt=(artId)=>httpRequest({method: 'POST', url: `/info/art/delete`, data: {art_id:artId}});
}]);