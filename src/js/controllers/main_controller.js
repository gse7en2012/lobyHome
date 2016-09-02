angular.module('LobyHome.controllers.Main', [])

    .controller('MainController', function ($scope, $timeout, $rootScope, $http, $cookies, apiService) {

        var signUrl = encodeURIComponent(location.href.split('#')[0]);
        var appId   = 'wxc9aa23b94ca6c9bb';
        var appIdProduct = 'wxe50a5e6792ceecc2';
        var redirectUri = encodeURIComponent(location.protocol + "//" + location.host + '/wechat/ask_userinfo');
        var ENVDEV = false;
        var lobiUid = $cookies.get('lobi_userid');

        if (redirectUri.indexOf('test') == -1) appId = appIdProduct;


        $scope.getShareInfo=function(){
            $scope.shareInfo={
                title: $cookies.get('lobi_title'), // 分享标题
                desc: $cookies.get('lobi_desc'), // 分享描述
                link:  $cookies.get('lobi_link'), // 分享链接
                imgUrl:  $cookies.get('lobi_img_url'), // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            };
            wx.onMenuShareAppMessage($scope.shareInfo);
            wx.onMenuShareTimeline($scope.shareInfo);
        };



        if (!ENVDEV && !lobiUid) {
            var state;
            var hashList = location.hash.split('#/');
            if (hashList.length <= 1) {
                state = '/'
            } else {
                state = hashList[1];
                //state = hashList[1].replace(/(\?|\/|&|=)/, ' ').split(' ')[0];
            }
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize' +
                '?appid=' + appId + '&' +
                'redirect_uri=' + redirectUri + '&' +
                'response_type=code&' +
                'scope=snsapi_userinfo&' +
                'state=' + state + '&' +
                'connect_redirect=1#wechat_redirect'
        }

        $scope.userInfo = {
            nickname: $cookies.get('lobi_nickname'),
            headImgUrl: $cookies.get('lobi_headimgurl'),
            userId: lobiUid,
            is_registered:$cookies.get('is_registered')
        };
        console.log($scope.userInfo);

        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;

        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.loading = false;
            $timeout($scope.getShareInfo,500)
        });

        $scope.scanQRCode=function(){
            wx.scanQRCode({
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                }
            });
        };


        $http.get('/wechat/create_wx_config?url=' + (signUrl)).success(function (data) {
            var _wxSDKConfig = {
                auth: {
                    debug: false,
                    appId: data.result.appId, // 必填，公众号的唯一标识
                    timestamp: data.result.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.result.nonceStr, // 必填，生成签名的随机串
                    signature: data.result.signature,// 必填，签名，见附录1
                    jsApiList: [
                        'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone',
                        'openLocation', 'getLocation', 'getNetworkType', 'chooseWXPay','chooseCard','addCard','openCard','scanQRCode'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                }
            };
            $scope.timestamp = data.result.timestamp;
            $scope.nonceStr  = data.result.nonceStr;

            wx.config(_wxSDKConfig.auth);
            wx.ready(function () {
                //wx.onMenuShareAppMessage({
                //    title: 'lobitest', // 分享标题
                //    desc: 'testlobi', // 分享描述
                //    link: 'http://qq.com', // 分享链接
                //    imgUrl: 'https://pic4.zhimg.com/7d8c15df29ce6900c80f9cf630992687_m.jpg', // 分享图标
                //    type: 'link', // 分享类型,music、video或link，不填默认为link
                //    success: function () {
                //        // 用户确认分享后执行的回调函数
                //        alert('share success!')
                //    },
                //    cancel: function () {
                //        // 用户取消分享后执行的回调函数
                //        alert('share error!')
                //    }
                //});

                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        var speed = res.speed; // 速度，以米/每秒计
                        var accuracy = res.accuracy; // 位置精度

                        $scope.lat = latitude;
                        $scope.lon = longitude;

                        $rootScope.lat = latitude;
                        $rootScope.lon = longitude;
                        console.log('getLocationSuccess!');
                        $scope.$broadcast('glc', {msg: 'OK'});
                    }
                });

            })
        });


        $scope.showLocation = function (lat, lon, name, desc) {
            console.log(lat, lon, name, desc);
            wx.openLocation({
                latitude: lat || $scope.lat, // 纬度，浮点数，范围为90 ~ -90
                longitude: lon || $scope.lon, // 经度，浮点数，范围为180 ~ -180。
                name: name, // 位置名
                address: desc, // 地址详情说明
                scale: 12, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            });
        };


        $scope.sign = function () {
            $scope.signLoading = true;
            $timeout(function () {
                $scope.signLoading = false;
            }, 500)
        };

        $scope.logout = function () {
            $cookies.remove('lobi_userid');
            $cookies.remove('lobi_nickname');
            $cookies.remove('lobi_headimgurl');
            location.href = '/';
            location.reload();
        };


        $scope.toggleS = function () {
            $scope.showTopNav = !$scope.showTopNav;
        };

        $scope.back = function () {
            history.back()
        };

        $scope.goToCommunityList = function () {
            location.href='#/community/list';
            //location.href = '#/community/search';
        };

        $scope.goToMap = function () {
            location.href = '#/community/map';
        };

        $scope.returnHome = function () {
            location.href = '#/'
        };


        $scope.$on('acts', function (evt, data) {
            console.log('acts got');
            $rootScope.actInfo = data;
            console.log($rootScope.actInfo);
        });

        $scope.regSuccessClick=function(){
            console.log('333',$rootScope.red);
            location.href = $rootScope.red;
        }

    });