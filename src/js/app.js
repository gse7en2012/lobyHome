var lobyApp = angular.module('LobyHome', [
    'ngRoute',
    'ngCookies',
    'mobile-angular-ui',
    'LobyHome.controllers.Main',
    'angular-carousel',
    'mobile-angular-ui.gestures',
    'angularBMap'
]).config(function ($routeProvider) {
    $routeProvider
        .when('/', {templateUrl: 'home.html', reloadOnSearch: false})
        .when('/activity', {templateUrl: 'home.html', reloadOnSearch: false})
        .when('/reg', {templateUrl: 'reg.html', reloadOnSearch: false})
        .when('/mall', {templateUrl: 'mall.html', reloadOnSearch: false})
        .when('/mall/shopcart', {templateUrl: 'mallShopCart.html', reloadOnSearch: false})
        .when('/mall/address', {templateUrl: 'mallAddress.html', reloadOnSearch: false})
        .when('/mall/address/add', {templateUrl: 'mallAddressAdd.html', reloadOnSearch: false})
        .when('/mall/address/edit/:aid', {templateUrl: 'mallAddressEdit.html', reloadOnSearch: false})
        .when('/mall/points', {templateUrl: 'mallPoints.html', reloadOnSearch: false})
        .when('/mall/ordersure', {templateUrl: 'mallOrderSure.html', reloadOnSearch: false})
        .when('/mall/order/list', {templateUrl: 'mallOrderList.html', reloadOnSearch: false})
        .when('/mall/order/details/:order_id', {templateUrl: 'mallOrderDetails.html', reloadOnSearch: false})
        .when('/mall/details/:good_id', {templateUrl: 'mallDetails.html', reloadOnSearch: false})
        .when('/share', {templateUrl: 'share.html', reloadOnSearch: false})
        .when('/community', {templateUrl: 'community.html', reloadOnSearch: false})
        .when('/activity/:act_id', {templateUrl: 'activity.html', reloadOnSearch: false})
        .when('/community/list', {templateUrl: 'communityList.html', reloadOnSearch: false})
        .when('/community/search', {templateUrl: 'communitySearch.html', reloadOnSearch: false})
        .when('/community/details/:cid', {templateUrl: 'communityDetails.html', reloadOnSearch: false})
        .when('/community/map', {templateUrl: 'Map.html', reloadOnSearch: false});
}).config(['angularBMapProvider', function (angularBMap) {
    //angularBMap.setDefaultPosition(121.49576, 31.240998);//设置默认中心点
}]);

lobyApp.factory('updateWxTitle', function () {
    function update_wx_title(title) {
        var body       = document.getElementsByTagName('body')[0];
        document.title = title;
        var iframe     = document.createElement("iframe");
        iframe.setAttribute("src", "images/t1.jpg");

        iframe.addEventListener('load', function () {
            setTimeout(function () {
                //iframe.removeEventListener('load');
                document.body.removeChild(iframe);
            }, 0);
        });
        document.body.appendChild(iframe);
    };
    return update_wx_title;
});
lobyApp.directive('imgLoadAutoSize', function () {
    return {
        link: function (scope, element, attrs) {
            element.bind("load", function (e) {
                if (this.naturalHeight > this.naturalWidth) {
                    this.className = "vertical";
                }
            });
        }
    }
});


