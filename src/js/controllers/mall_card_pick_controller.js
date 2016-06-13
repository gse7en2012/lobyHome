angular.module('LobyHome')

    .controller('mallCardPickController', function ($scope, $timeout, $rootScope, updateWxTitle,apiService,toastr) {
        updateWxTitle('领取福袋');

        $scope.commit=function(){
            apiService.getLuckyBag().then(function(data){
                alert('领取'+data.name+'成功!');
                location.href='#/mall/luckybag'
            }).catch(function(e){
                toastr.error(e)
            })
        };

        $scope.cardTest=function(){
            apiService.getCardConfig().then(function(data){
                $scope.erer=JSON.stringify(data);
                wx.chooseCard({
                  //  shopId: '', // 门店Id
                  //  cardType: '', // 卡券类型
                  //  cardId: '', // 卡券Id
                    timestamp: data.timestamp, // 卡券签名时间戳
                    nonceStr: data.nonceStr, // 卡券签名随机串
                    signType: data.signType, // 签名方式，默认'SHA1'
                    cardSign: data.cardSign, // 卡券签名
                    success: function (res) {
                        alert(JSON.stringify(res));
                        $scope.rrrrr=JSON.stringify(res);
                        var cardList= res.cardList; // 用户选中的卡券列表信息
                        console.log(res);
                    },
                    fail:function(res){
                        alert(JSON.stringify(res));
                    }
                });
            })
        };


        $scope.cardAdd=function(){
            apiService.getCardExt().then(function(data){
                console.log('返回的数据:',data);
                var opts=[{
                    cardId: data.card_id,
                    cardExt: JSON.stringify({
                        timestamp:data.timestamp,
                        signature:data.signature,
                        nonce_str:data.nonce_str
                    })
                }];
               // console.log('调用的数据:',opts);
                wx.addCard({
                    cardList:opts , // 需要添加的卡券列表
                    success: function (res) {
                        console.log('success');
                        console.log(res);
                        //alert(JSON.stringify(res));
                        var cardList = res.cardList; // 添加的卡券列表信息
                    },
                    fail:function(e){
                        console.log('error');
                        console.log(e);
                    }
                });
            })
        }

    });

/*
* 微财停止服务通知
*
 感谢各位对微财的支持，出于各方面的客观原因，微财不日将停止提供服务,感谢过去712个日夜的互相陪伴。
 生活不息，牛市不停，祝诸君在未来的日子里都能从股市中获得属于自己的财富。
 挥手自兹别，萧萧班马鸣。
 再会！
*
* */

/*
还留存着初见时的容颜,此间竟已到了别离的时刻.
过去两年多的心血倾注,过往八百天的悉心雕磨.我为你付出,你予我成长.
一个产品,一群伙伴.两载光阴,数十版本.
但就如地下铁的每一站,总有新人来,亦伴旧人往.
感激这一段旅程,感谢这一路拼搏.
愿我们的下一次扬帆,镌刻着属于你的荣光!
再见,微财!
 */