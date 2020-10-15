'use strict';

const Controller = require('egg').Controller

class MainController extends Controller {
  async index () {
    this.ctx.body = 'hi index'
  }
  async checkLogin () {
    // 获取前台传过来的用户名和密码
    let userName = this.ctx.request.body.userName
    let password = this.ctx.request.body.password
    // 数据库查询
    const sqlList = `
      SELECT userName from adminInfo 
      WHERE userName = "${userName}" 
      AND
      password = "${password}"
    `
    // const sqlList = " SELECT userName FROM adminInfo WHERE userName = '"+userName +
    // "' AND password = '"+password+"'"
    const list = await this.app.mysql.query(sqlList)
    console.log(list);
    // 登录校验
    if (list.length > 0) {
      // 登录成功, 对用户进行session缓存
      let openId=new Date().getTime()
      this.ctx.session.openId={ 'openId':openId }
      this.ctx.body={'data':'登录成功!','openId':openId}
    } else {
      this.ctx.body={'data': '登录失败!'}
    }
  }
}

module.exports = MainController