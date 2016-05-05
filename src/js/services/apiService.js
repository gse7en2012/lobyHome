/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('LobyHome').service('apiService', ['$http', '$q', function ($http, $q) {
    var remoteAddress = 'http://test.lobicom.com/api/';

    if(location.host.indexOf('test')==-1) remoteAddress='http://lobicom.com/api/';

    function httpRequest(opts) {
        var d = $q.defer();
        $http(opts).success(d.resolve).error(d.reject);
        return d.promise;
    }

    function transferData(data) {
        if (data.errCode == 200) {
            return data.result;
        }
        return $q.reject(data.result);
    }

    //活动列表
    this.getActivityList    = function () {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'newest_activity'
        }).then(transferData)
    };
    this.getActivityDetails = function (id) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'activity?id=' + id
        }).then(transferData)
    };


    //社区列表
    this.getCommunityList    = function (lon, lat) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'nearest_community?page=1&size=10&latitude=' + lat + '&longitude=' + lon
        }).then(transferData)
    };
    this.getCommunityDetails = function (id) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'community?id=' + id
        }).then(transferData)
    };


    this.joinActivity = function (data) {
        return httpRequest({
            method: 'POST',
            url: remoteAddress + 'join_activity',
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            //transformRequest: function(obj) {
            //    var str = [];
            //    for(var p in obj)
            //        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            //    return str.join("&");
            //},
            data: data
        })
    };

    //mall homepage
    this.mallIndex = function () {
        return httpRequest({
            method: 'GET',
            url: '/api/homepage'
        })
    };

    this.getProductionDetails = function (id) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'products?id=' + id
        }).then(transferData)
    };

    this.getShopCartList   = function (id) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'shoppingcart',
        }).then(transferData)
    };
    this.addToShopCart     = function (productId, buyNum, userId) {
        return httpRequest({
            method: 'POST',
            url: remoteAddress + 'shoppingcart',
            data: {
                id: userId,
                product_id: productId,
                buy_number: buyNum
            }
        })
    };
    this.editShopCartNum   = function (data) {
        return httpRequest({
            method: 'PUT',
            url: remoteAddress + 'shoppingcart',
            data: data
        })
    };
    this.deleteShopCartGood=function(data){
        return httpRequest({
            method: 'DELETE',
            url: remoteAddress + 'shoppingcart',
            data: data
        })
    };


    this.getMallOrder = function (data) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'order',
            data: data
        }).then(transferData)
    };


    this.generateMallOrder = function (data) {
        return httpRequest({
            method: 'POST',
            url: remoteAddress + 'order',
            data: data
        }).then(transferData)
    };

    this.generatePayOrder = function (data) {
        return httpRequest({
            method: 'POST',
            url: remoteAddress + 'pay',
            data: data
        }).then(transferData)
    };


    this.getAddressList = function (id) {
        var url = (remoteAddress + 'address');
        if (id) {
            url = (remoteAddress + 'address?id=' + id);
        }
        return httpRequest({
            method: 'GET',
            url: url,
        }).then(transferData)
    };

    this.addAddress = function (data) {
        return httpRequest({
            method: 'POST',
            url: remoteAddress + 'address',
            data: data
        })
    };

    this.editAddress = function (data) {
        return httpRequest({
            method: 'PUT',
            url: remoteAddress + 'address',
            data: data
        })
    };
    this.editDefaultAddress=function(data){
        return httpRequest({
            method: 'PUT',
            url: remoteAddress + 'setdefault_address',
            data: data
        })
    };

    this.deleteAddress = function (data) {
        return httpRequest({
            method: 'DELETE',
            url: remoteAddress + 'address',
            data: data
        })
    };


    //reg
    this.getRegCheckCode = function (phone) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'check_code?phone_number=' + phone
        })
    };
    this.postReg = function (data) {
        return httpRequest({
            method: 'POST',
            url: remoteAddress + 'register',
            data:data
        }).then(transferData)
    };


    //this.deleteInfoArt=(artId)=>httpRequest({method: 'POST', url: `/info/art/delete`, data: {art_id:artId}});
}]);