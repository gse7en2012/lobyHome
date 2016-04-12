angular.module('LobyHome')

    .controller('mallShopCartController', function ($scope, $timeout, $rootScope, updateWxTitle) {
        updateWxTitle('乐比商城');

        $scope.shopCartList = [
            {
                name: '美度指挥官二代天文台认证16px',
                color: '黑盘红针14px',
                num: 1,
                price: '1399',
                choose: true,
                img: 'http://img11.360buyimg.com/n1/jfs/t2161/289/1870931866/172716/4eae4d33/567b9f2bN19086430.jpg',
                origin: '瑞士13px'
            },
            {
                name: '全新雅阁十代',
                color: '红外棕内',
                num: 1,
                price: '3699',
                choose: true,
                img: 'http://www.ghac.cn/~/media/HondaOfficial/Vehicles/Accord/Gallerys/7gallery030321.ashx?h=247&w=470',
                origin: '日本'
            },
            {
                name: '腾龙（Tamron）SP  大光圈定焦镜头（佳能卡口）',
                color: '85mm F/1.8 Di VC USD （F016）',
                num: 1,
                price: '5000',
                choose: true,
                img: 'http://img12.360buyimg.com/n7/jfs/t2344/270/2047808268/172443/e3348d49/56ecb6caNf884456a.jpg',
                origin: '中国'
            },
            {
                name: '三星 Galaxy S7 edge（G9350）32G版',
                color: '黑金版',
                num: 1,
                price: '1399',
                choose: true,
                img: 'http://img10.360buyimg.com/n7/jfs/t2068/298/2448145915/157953/7be197df/56d51a42Nd86f1c8e.jpg',
                origin: '韩国'
            },
            {
                name: '美度指挥官二代天文台认证',
                color: '黑盘红针',
                num: 1,
                price: '1399',
                choose: true,
                img: 'http://img11.360buyimg.com/n1/jfs/t2161/289/1870931866/172716/4eae4d33/567b9f2bN19086430.jpg',
                origin: '瑞士'
            },
            {
                name: '全新雅阁十代',
                color: '红外棕内',
                num: 1,
                price: '3699',
                choose: true,
                img: 'http://www.ghac.cn/~/media/HondaOfficial/Vehicles/Accord/Gallerys/7gallery030321.ashx?h=247&w=470',
                origin: '日本'
            }
        ];


        $scope.isAllChoose = true;
        $scope.chooseAll   = function () {
            $scope.isAllChoose = !$scope.isAllChoose;
            $scope.shopCartList.forEach(function (item) {
                item.choose = $scope.isAllChoose;
            })
        };

        $scope.listLen    = $scope.shopCartList.reduce(function (p, c) {
            var add = c.choose ? 1 : 0;
            return p + add
        }, 0);
        $scope.totalPrice = ($scope.shopCartList.reduce(function (prev, curr) {
            var add = curr.choose ? Number(curr.price) * curr.num : 0;
            return prev + add
        }, 0));

        $scope.edit = function () {
            $scope.isEdit       = !$scope.isEdit;
            $scope.shopCartList = $scope.shopCartList.filter(function (item) {
                return item.choose == true;
            })
        };

        $scope.minusGoodNum = function (good) {
            if (good.num > 0) good.num--;
        };

        $scope.addGoodNum = function (good) {
            good.num++;
        };

        $scope.goToPay = function () {
            if ($scope.isEdit) return;
            location.href = "#/mall/ordersure";
        };


        $scope.$watch('shopCartList', function () {
            $scope.totalPrice = ($scope.shopCartList.reduce(function (prev, curr) {
                var add = curr.choose ? Number(curr.price) * curr.num : 0;
                return prev + add
            }, 0));
            $scope.listLen    = $scope.shopCartList.reduce(function (p, c) {
                var add = c.choose ? 1 : 0;
                return p + add
            }, 0);

            if ($scope.listLen != $scope.shopCartList.length) $scope.isAllChoose = false;

        }, true)
    });