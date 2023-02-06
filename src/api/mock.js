import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'
Mock.mock('/API/home/getData', homeApi.getStatisticalData)

Mock.mock('/API/user/add', 'post', user.createUser)
Mock.mock('/API/user/edit', 'post', user.updateUser)
Mock.mock('/API/user/del', 'post', user.deleteUser)
Mock.mock(/API\/user\/getUser/, user.getUserList)

Mock.mock(/API\/permission\/getMenu/, 'post', permission.getMenu)