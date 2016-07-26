angular.module('LobyHome')

    .controller('mallCardAddController', function ($scope, $timeout, $rootScope, updateWxTitle,apiService,toastr) {
        updateWxTitle('添加福袋');

        $scope.commit=function(){
            toastr.error('等待后台开发')
        }



        //apiService.getCardExt().then(function(data){
        //    console.log('返回的数据:',data);
        //    var opts=[{
        //        cardId: data.card_id,
        //        cardExt: JSON.stringify({
        //            timestamp:data.timestamp,
        //            signature:data.signature,
        //            nonce_str:data.nonce_str
        //        })
        //    }];
        //    // console.log('调用的数据:',opts);
        //    wx.addCard({
        //        cardList:opts , // 需要添加的卡券列表
        //        success: function (res) {
        //            console.log('success');
        //            console.log(res);
        //            //alert(JSON.stringify(res));
        //            var cardList = res.cardList; // 添加的卡券列表信息
        //        },
        //        fail:function(e){
        //            console.log('error');
        //            console.log(e);
        //        }
        //    });
        //})


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

        //apiService.getCardExt().then(function(data){
        //    console.log('返回的数据:',data);
        //    var opts=[{
        //        cardId: data.card_id,
        //        cardExt: JSON.stringify({
        //            timestamp:data.timestamp,
        //            signature:data.signature,
        //            nonce_str:data.nonce_str
        //        })
        //    }];
        //    // console.log('调用的数据:',opts);
        //    wx.addCard({
        //        cardList:opts , // 需要添加的卡券列表
        //        success: function (res) {
        //            console.log('success');
        //            console.log(res);
        //            //alert(JSON.stringify(res));
        //            var cardList = res.cardList; // 添加的卡券列表信息
        //        },
        //        fail:function(e){
        //            console.log('error');
        //            console.log(e);
        //        }
        //    });
        //})


    });