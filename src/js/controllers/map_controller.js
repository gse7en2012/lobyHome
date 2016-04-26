/**
 * Created by zhuzhipeng on 16/4/20.
 */
angular.module('LobyHome')

    .controller('mapController', function ($scope, $timeout, $rootScope, updateWxTitle,angularBMap) {
        angularBMap.geoLocation().then(function(r){
            alert(JSON.stringify(r));
            console.log(r);
        })

    });