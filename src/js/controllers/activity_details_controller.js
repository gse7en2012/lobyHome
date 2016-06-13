angular.module('LobyHome')

    .controller('activityDetailsController',
        function ($scope, $timeout, $rootScope, $routeParams,$sce, apiService, updateWxTitle, toastr) {
            $scope.actId   = $routeParams.act_id;
            $scope.imgList = [];


            $scope.flickityOptions={
                //freeScroll: true,
                wrapAround: true,
                cellSelector: '.mySlideClassName',
                imagesLoaded: true,
                autoPlay:true
            };


            apiService.getActivityDetails($routeParams.act_id).then(function (data) {
                var details    = data[0];
                $scope.actInfo = {
                    commName: details.sponsor_community,
                    actName: details.name,
                    location: details.address,
                    concatName: details.name_of_activity_leader,
                    start_time:details.start_time,
                    phone_number_of_activity_leader:details.phone_number_of_activity_leader,
                    time: details.time,
                    lastTime: details.duration,
                    num: details.total_number_of_people + '人',
                    age: details.participant,
                    ctx: $sce.trustAsHtml(details.introduce),
                    online_time: details.online_time,
                    price: details.price,
                    is_need_registered: details.is_need_registered,
                    longitude:details.longitude,
                    latitude:details.latitude
                };
                $scope.imgList = eval(details.images);

                $scope.$emit('acts', {
                    actName: details.name,
                    online_time: details.online_time
                });

                $timeout(function() {
                    var flkty = new Flickity( '.slider', $scope.flickityOptions);
                },0);

                updateWxTitle(details.name);
            });


            $scope.joinActivity = function (actId) {
                if ($scope.actInfo.is_need_registered && $scope.userInfo.is_registered == 0) {
                    alert('请先通过手机号码绑定用户!');
                    return location.href = '#/reg?red=' + encodeURIComponent(location.href);
                }
                apiService.joinActivity({
                    activity_id: actId,
                    user_id: $scope.userInfo.userId,
                    timestamp: $scope.timestamp,
                    nonce_str: $scope.nonceStr
                }).then(function (data) {
                    if (data.errCode != 200) {
                        return toastr.error(data.result);
                    }
                    if (data.result.is_need_pay == 1) {
                        var wxPayConfig = {
                            timestamp: $scope.timestamp.toString(), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: data.result.nonceStr.toString(), // 支付签名随机串，不长于 32 位
                            package: data.result.package.toString(), // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                            signType: data.result.signType.toString(), // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: data.result.paySign.toString(), // 支付签名
                            success: function (res) {
                                // 支付成功后的回调函数
                                $rootScope.Ui.turnOn('modal2');
                            }
                        };
                        wx.chooseWXPay(wxPayConfig);
                    }
                    if (data.result.is_need_pay == 0) {
                        $rootScope.Ui.turnOn('modal2');
                    }
                }).catch(function (e) {
                    toastr.error(e)
                })
            };


        });