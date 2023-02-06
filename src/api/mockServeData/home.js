import Mock from 'mockjs'
let List = []
export default {
    getStatisticalData: () => {
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    苹果: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    三星: Mock.Random.float(100, 8000, 0, 0),
                    魅族: Mock.Random.float(100, 8000, 0, 0),
                    华为: Mock.Random.float(100, 8000, 0, 0),
                    小米: Mock.Random.float(100, 8000, 0, 0),
                })
            )
        }
        return {
            code: 20000,
            data: {
                videoData: [
                    {
                        name: '小米',
                        value: 2999
                    },
                    {
                        name: '苹果',
                        value: 2999
                    },
                    {
                        name: '三星',
                        value: 2999
                    },
                    {
                        name: '华为',
                        value: 2999
                    },
                    {
                        name: 'oppo',
                        value: 2999
                    },
                    {
                        name: 'vivo',
                        value: 2999
                    },
                ],
                userData: [
                    {
                        date: '周一',
                        new: 5,
                        active: 200
                    },
                    {
                        date: '周二',
                        new: 10,
                        active: 500
                    },
                    {
                        date: '周三',
                        new: 12,
                        active: 550
                    },
                    {
                        date: '周四',
                        new: 60,
                        active: 800
                    },
                    {
                        date: '周五',
                        new: 65,
                        active: 550
                    },
                    {
                        date: '周六',
                        new: 53,
                        active: 770
                    },
                    {
                        date: '周日',
                        new: 33,
                        active: 170
                    },
                ],
                //折线图
                orderData: {
                    date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007',],
                    data: List
                },
                tableData: [
                    {
                        brand: "oppo",
                        daybuy: "500",
                        moonbuy: "3500",
                        totalbuy: "21000"
                    },
                    {
                        brand: "vivo",
                        daybuy: "700",
                        moonbuy: "8600",
                        totalbuy: "75220"
                    },
                    {
                        brand: "小米",
                        daybuy: "600",
                        moonbuy: "8945",
                        totalbuy: "35000"
                    },
                    {
                        brand: "三星",
                        daybuy: "320",
                        moonbuy: "2200",
                        totalbuy: "12000"
                    },
                    {
                        brand: "华为",
                        daybuy: "620",
                        moonbuy: "4000",
                        totalbuy: "25000"
                    },
                    {
                        brand: "魅族",
                        daybuy: "500",
                        moonbuy: "3500",
                        totalbuy: "21000"
                    }
                ]
            }
        }
    }
}