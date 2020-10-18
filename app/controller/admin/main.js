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
    const article = this.ctx.request.body
    // insert
    // const result = await this.app.mysql.insert('tmpArticle', article)
    const result = await this.app.mysql.insert('articleContent', article)
    // insertSuccess: 只要文章数据插入了一行就返回成功
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId
    this.ctx.body = {
      insertSuccess,
      insertId
    }
  }
  async updateArticle() {
    // 获取前台传过来的文章
    const article = this.ctx.request.body
    // 修改文章内容
    const result = await this.app.mysql.update('articleContent', article)
    // insertSuccess: 只要文章数据插入了一行就返回成功
    const insertSuccess = result.affectedRows === 1
    this.ctx.body = {
      insertSuccess
    }
  }
  async getArticleList() {
    const sqlList = `
      SELECT  articleContent.id as id, 
      articleContent.type_id as type_id, 
      articleContent.title as title ,
      FROM_UNIXTIME(articleContent.add_time,'%Y-%m-%d %H:%i:%s' ) as add_time,
      articleContent.view_count as view_count,
      articleType.typeName as typeName 
      from articleContent 
      LEFT JOIN articleType ON articleContent.type_id = articleType.id
      ORDER BY articleContent.id DESC
    `
    let result = await this.app.mysql.query(sqlList)
    console.log(result)
    this.ctx.body = { data: result }
  }
  async deleteArticle() {
    let id = this.ctx.params.id
    const result = await this.app.mysql.delete('articleContent', { 'id': id })
    this.ctx.body = { data: result }
  }
  async getArticleById() {
    let id = this.ctx.params.id
    const sqlList = `
      SELECT 
      articleContent.id as id,
      articleContent.type_id as type_id, 
      articleContent.title as title,
      articleContent.article_content as article_content,
      articleContent.introduce as introduce, 
      FROM_UNIXTIME(articleContent.add_time,'%Y-%m-%d' ) as add_time,
      articleContent.view_count as view_count 
      FROM articleContent 
      LEFT JOIN articleType ON articleContent.type_id = articleType.id
      WHERE articleContent.id = ${id}
    `
    const result = await this.app.mysql.query(sqlList)
    this.ctx.body = { data: result }
  }
}

module.exports = MainController