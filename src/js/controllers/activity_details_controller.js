angular.module('LobyHome')

    .controller('activityDetailsController',
        function ($scope, $timeout, $rootScope, $routeParams, apiService, updateWxTitle) {
            $scope.actId   = $routeParams.act_id;
            $scope.imgList = [];


            apiService.getActivityDetails($routeParams.act_id).then(function (data) {
                var details    = data[0];
                $scope.actInfo = {
                    commName: details.sponsor_community,
                    actName: details.name,
                    location: details.address,
                    concatName: details.name_of_activity_leader,
                    time: details.time,
                    lastTime: details.duration + '分钟',
                    num: details.total_number_of_people + '人',
                    age: details.participant,
                    ctx: details.intruduce,
                    online_time: details.online_time,
                    price:details.price
                };
                $scope.imgList = eval(details.images);

                updateWxTitle(details.name);
            });


            $scope.joinActivity = function (actId) {
                apiService.joinActivity({
                    activity_id: actId,
                    user_id: $scope.userInfo.userId,
                    timestamp: $scope.timestamp,
                    nonce_str: $scope.nonceStr
                }).then(function (data) {
                    if (data.errCode != 200) {
                        return alert(data.result);
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
                })
            };


        });