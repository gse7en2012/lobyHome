angular.module('LobyHome')

    .controller('mallOrderSureController', function ($scope, $timeout, $rootScope, updateWxTitle,apiService) {
        updateWxTitle('乐比商城');


        $scope.stepNow=1;
        $scope.submit=function(){

            if($scope.stepNow==1){
                $scope.stepNow=2;
            }else{

            }
        };

        $scope.order_id=$rootScope.orderDetails.order_id;
        $scope.total_fee=$rootScope.orderDetails.total_fee;
        $scope.freight=$rootScope.orderDetails.freight;
        $scope.total_pay=Number($scope.total_fee)+Number($scope.freight);
        $scope.receiver=$rootScope.orderDetails.address.receiver;
        $scope.receiver_city=$rootScope.orderDetails.address.receiver_city;
        $scope.receiver_country=$rootScope.orderDetails.address.receiver_country;
        $scope.receiver_detail_address=$rootScope.orderDetails.address.receiver_detail_address;
        $scope.receiver_phone_number=$rootScope.orderDetails.address.receiver_phone_number;
        $scope.receiver_province=$rootScope.orderDetails.address.receiver_province;

        $scope.jumpToAddress=function(){
            location.href='#/mall/address?from=order'
        };

        $scope.ensurePay=function(){
            apiService.generatePayOrder({
                user_id:$scope.userInfo.userId,
                timestamp: $scope.timestamp,
                nonce_str: $scope.nonceStr
            }).then(function(data){
                if (data.is_need_pay == 1) {
                    var wxPayConfig = {
                        timestamp: $scope.timestamp.toString(), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: data.nonceStr.toString(), // 支付签名随机串，不长于 32 位
                        package: data.package.toString(), // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        signType: data.signType.toString(), // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: data.paySign.toString(), // 支付签名
                        success: function (res) {
                            alert('付款成功!');
                            // 支付成功后的回调函数
                            $rootScope.Ui.turnOn('modal3');
                        }
                    };
                    wx.chooseWXPay(wxPayConfig);
                }else{
                    alert('免费购买!');
                }
            })
        }
    });