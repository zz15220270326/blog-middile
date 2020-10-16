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
    const list = await this.app.mysql.query(sqlList)
    // 登录校验
    if (list.length > 0) {
      // 登录成功, 对用户进行session缓存
      let openId = new Date().getTime()
      this.ctx.session.openId = { 'openId': openId }
      this.ctx.body = { 'data': '登录成功!', 'openId': openId }
    } else {
      this.ctx.body = { 'data': '登录失败!' }
    }
  }
  async getTypeInfo() {
    const typeInfo = await this.app.mysql.select('articleType')
    this.ctx.body = { data: typeInfo }
  }
  async saveArticle() {
    // 获取前台传过来的文章
    const tmpArticle = this.ctx.request.body
    // insert
    const result = await this.app.mysql.insert('tmpArticle', tmpArticle)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId
    this.ctx.body = {
      insertSuccess,
      insertId
    }
  }
}

module.exports = MainController