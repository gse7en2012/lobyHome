/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('LobyHome').service('apiService', ['$http', '$q', function ($http, $q) {
    var remoteAddress = 'http://test.lobicom.com/api/';

    if (location.host.indexOf('test') == -1) remoteAddress = 'http://lobicom.com/api/';

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
    this.getActivityList    = function (page, size) {
        size = size || 6;
        page = page || 1;
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'newest_activity?offset=' + page + '&size=' + size
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
            url: remoteAddress + 'nearest_community?page=1&size=10&radius=1000000&latitude=' + lat + '&longitude=' + lon
        }).then(transferData)
    };
    this.getCommunityDetails = function (id) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'community?id=' + id
        }).then(transferData)
    };

    this.getCommunitySp = function (id) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'community_project?id=' + id
        }).then(transferData)
    };

    this.searchCommunity = function (ky, lat, lon) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'nearest_community?keyword=' + ky + '&latitude=' + lat + '&longitude=' + lon
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
        }).then(transferData)
    };

    this.getProductList    = function (levelType, levelClass, page, size) {
        var lvClass = levelType == 1 ? 'level1_class' : 'level2_class';
        return httpRequest({
            method: 'GET',
            url: '/api/products?' + lvClass + '=' + levelClass + '&page=' + page + '&size=' + size
        }).then(transferData)
    };
    this.searchProductList = function (keyword, page, size) {
        return httpRequest({
            method: 'GET',
            url: '/api/products?keyword=' + keyword + '&page=' + page + '&size=' + size
        }).then(transferData)
    };

    this.getProductionDetails = function (id) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'products?id=' + id
        }).then(transferData)
    };

    this.getShopCartList    = function (id) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'shoppingcart',
        }).then(transferData)
    };
    this.addToShopCart      = function (productId, buyNum, userId) {
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
    this.editShopCartNum    = function (data) {
        return httpRequest({
            method: 'PUT',
            url: remoteAddress + 'shoppingcart',
            data: data
        })
    };
    this.deleteShopCartGood = function (data) {
        return httpRequest({
            method: 'DELETE',
            url: remoteAddress + 'shoppingcart',
            data: data
        })
    };


    this.getMallOrder = function (data) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'order?order_state=0',
            data: data
        }).then(transferData)
    };

    this.getUnpayMallOrder = function () {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'order?order_state=1'
        }).then(transferData)
    };

    this.sureOrder = function (id) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'confirm_order?id=' + id
        }).then(transferData)
    };

    this.getMallOrderDetails = function (state, id) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'order_detail?order_state=' + state + '&id=' + id
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
    this.cancelPayOrder   = function (data) {
        return httpRequest({
            method: 'DELETE',
            url: remoteAddress + 'order?order_state=1'
        }).then(transferData)
    };
    this.cancelPay        = function () {
        return httpRequest({
            method: 'POST',
            url: remoteAddress + 'cancel_pay'
        }).then(transferData)
    }


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

    this.editAddress        = function (data) {
        return httpRequest({
            method: 'PUT',
            url: remoteAddress + 'address',
            data: data
        })
    };
    this.editDefaultAddress = function (data) {
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
    this.postReg         = function (data) {
        return httpRequest({
            method: 'POST',
            url: remoteAddress + 'register',
            data: data
        }).then(transferData)
    };
    this.checkReg        = function (phone) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'register?phone=' + phone
        }).then(transferData)
    };

    this.getLuckyBag = function () {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'fu_package'
        }).then(transferData)
    };

    this.getLuckyBagList = function () {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'my_cards'
        }).then(transferData);
    };

    this.getCardConfig = function () {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'coupon/card_config'
        }).then(transferData);
    };

    this.getCardExt = function () {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'coupon/card_ext'
        }).then(transferData);
    };

    this.decryptCardCode = function (cardId, encryptCode) {
        return httpRequest({
            method: 'GET',
            url: remoteAddress + 'coupon/get_code?card_id=' + cardId + '&encrypt_code=' + encryptCode
        }).then(transferData);
    };

    this.destroyCard = function (cardId, code) {
        return httpRequest({
            method: 'POST',
            url: remoteAddress + 'coupon/consume',
            data: {
                card_id: cardId,
                code: code
            }
        }).then(transferData);
    };

    //this.deleteInfoArt=(artId)=>httpRequest({method: 'POST', url: `/info/art/delete`, data: {art_id:artId}});
}]);