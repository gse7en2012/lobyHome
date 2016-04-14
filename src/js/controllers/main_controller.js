angular.module('LobyHome.controllers.Main', [])

    .controller('MainController', function ($scope, $timeout, $rootScope, $http, $cookies, $routeParams) {
        var appId       = 'wxc9aa23b94ca6c9bb';
        var redirectUri = encodeURIComponent('http://lobi.gushiyingxiong.com/wechat/ask_userinfo');
        var ENVDEV      = true;


        var lobiName = $cookies.get('lobi_userid');

        if (!ENVDEV && !lobiName) {
            var state     = location.hash.split('#/')[1].replace(/(\?|\/|&|=)/, ' ').split(' ')[0];
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize' +
                '?appid=' + appId + '&' +
                'redirect_uri=' + redirectUri + '&' +
                'response_type=code&' +
                'scope=snsapi_userinfo&' +
                'state=' + state + '&' +
                'connect_redirect=1#wechat_redirect'
        }

        $scope.userInfo = {
            nickname: 'Gseven',
            headImgUrl: 'http://wx.qlogo.cn/mmopen/qZRaricprfbtwkFOZtGCY8kbiasGBnDMXKM4ctHNPqia3X4WIYjXGyohZMUHjcJoGBlYop7D1PHJiaERpjCVYY8m4oQFXQfqRrOI/0',
            userid: 'ooCXtw6AvwmJI6JTcSG9KJxMCQZ4'
        };


        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;

        });

        $rootScope.$on('$routeChangeSuccess', function () {

            $timeout(function () {
                $rootScope.loading = false;
            }, 300);
            //$rootScope.loading = false;
        });

        var signUrl = (location.protocol + "//" + location.host + location.pathname + location.search);
        $http.get('http://lobi.gushiyingxiong.com/wechat/create_wx_config?url=' + encodeURI(signUrl)).success(function (data) {
            var _wxSDKConfig = {
                auth: {
                    debug: true,
                    appId: data.result.appId, // 必填，公众号的唯一标识
                    timestamp: data.result.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.result.nonceStr, // 必填，生成签名的随机串
                    signature: data.result.signature,// 必填，签名，见附录1
                    jsApiList: [
                        'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone',
                        'openLocation', 'getLocation', 'getNetworkType'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                }
            };
            wx.config(_wxSDKConfig.auth);
            wx.ready(function () {
                console.log('config s');
                wx.onMenuShareAppMessage({
                    title: 'lobitest', // 分享标题
                    desc: 'testlobi', // 分享描述
                    link: 'http://qq.com', // 分享链接
                    imgUrl: 'https://pic4.zhimg.com/7d8c15df29ce6900c80f9cf630992687_m.jpg', // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        alert('share success!')
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        alert('share error!')
                    }
                });
                console.log('getLocation canyou');
                //wx.getLocation({
                //    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                //    success: function (res) {
                //        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                //        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                //        var speed = res.speed; // 速度，以米/每秒计
                //        var accuracy = res.accuracy; // 位置精度
                //
                //        wx.openLocation({
                //            latitude: res.latitude, // 纬度，浮点数，范围为90 ~ -90
                //            longitude: res.longitude, // 经度，浮点数，范围为180 ~ -180。
                //            name: 'my location', // 位置名
                //            address: 'hahahha', // 地址详情说明
                //            scale: 27, // 地图缩放级别,整形值,范围从1~28。默认为最大
                //            infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                //        });
                //
                //
                //    }
                //});

            })
        });


        $scope.sign = function () {
            $scope.signLoading = true;
            $timeout(function () {
                $scope.signLoading = false;
            }, 500)
        };


        $scope.toggleS = function () {
            $scope.showTopNav = !$scope.showTopNav;
        };

        $scope.back              = function () {
            history.back()
        };
        $scope.goToCommunityList = function () {
            location.href = '#/community/search';
        };

        $scope.goToMap = function () {
            location.href = '#/community/map';
        };

        $scope.returnHome = function () {
            location.href = '#/'
        };


    });