angular.module('LobyHome')

    .controller('mallOrderListController', function ($scope, $timeout, $rootScope, updateWxTitle) {
        updateWxTitle('乐比商城');

        $scope.orderList = [
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
                name: '新雅阁（Accord）荟萃Honda全球创新科技以“Exciting H Design”为外型设计理念，搭载全新“地球梦科技”动力总成',
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
                name: '新雅阁（Accord）荟萃Honda全球创新科技以“Exciting H Design”为外型设计理念，搭载全新“地球梦科技”动力总成',
                color: '红外棕内',
                num: 1,
                price: '3699',
                choose: true,
                img: 'http://www.ghac.cn/~/media/HondaOfficial/Vehicles/Accord/Gallerys/7gallery030321.ashx?h=247&w=470',
                origin: '日本'
            }
        ];

    });