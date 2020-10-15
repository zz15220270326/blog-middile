'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = `<h3>index</h3>`
  }
  async list() { 
    let sqlList = `
      select articleContent.id as id ,
      articleContent.type_id as type_id, 
      articleContent.title as title ,
      articleContent.article_content as article_content,
      FROM_UNIXTIME(articleContent.add_time,'%Y-%m-%d %H:%i:%s' ) as add_time,
      articleContent.view_count as view_count,
      articleContent.introduce as introduce,
      articleType.typeName as typeName 
      from articleContent LEFT JOIN articleType ON articleContent.type_id = articleType.id
    `
    let dateTime = Date.parse(new Date()).toString().substr(0, 10)
    console.log(dateTime)
    const list = await this.app.mysql.query(sqlList)
    this.ctx.body = {data: list}
  }
  async selectArticleById () {
    // 获取前台传递过来的id
    let id = this.ctx.params.id
    console.log(id)
    // 使用mysql语句查询
    let sqlList = `
      select articleContent.id as id ,
      articleContent.type_id as type_id, 
      articleContent.title as title ,
      articleContent.article_content as article_content,
      FROM_UNIXTIME(articleContent.add_time,'%Y-%m-%d %H:%i:%s' ) as add_time,
      articleContent.view_count as view_count,
      articleContent.introduce as introduce,
      articleType.typeName as typeName, 
      articleType.id as type_id
      from articleContent LEFT JOIN articleType ON articleContent.type_id = articleType.id 
      WHERE articleContent.id = 
    ` + id
    let list = await this.app.mysql.query(sqlList)
    console.log(list);
    this.ctx.body = {data: list}
  }
  async getAdvImages () {
    let sqlList = `
      SELECT advImage.adv_number as adv_number,
      advImage.adv_name as adv_name,
      advImage.adv_image as adv_image 
      from advImage
    `
    let list = await this.app.mysql.query(sqlList)
    this.ctx.body = {data: list}
  }
  // 获取类别名称和编号
  async getTypeInfo () {
    let sqlList = `
      SELECT articleType.id as id, 
      articleType.typeName as typeName 
      FROM articleType
    `
    let list = await this.app.mysql.query(sqlList)
    this.ctx.body = {data: list}
  }
  // 根据id获取列表数据信息
  async getListByList () {
    const id = this.ctx.params.id
    let sqlList = `
      select articleContent.id as id ,
      articleContent.type_id as type_id, 
      articleContent.title as title ,
      articleContent.article_content as article_content,
      FROM_UNIXTIME(articleContent.add_time,'%Y-%m-%d %H:%i:%s' ) as add_time,
      articleContent.view_count as view_count,
      articleContent.introduce as introduce,
      articleType.typeName as typeName, 
      articleType.id as type_id
      from articleContent LEFT JOIN articleType ON articleContent.type_id = articleType.id 
      WHERE type_id = 
    ` + id
    let list = await this.app.mysql.query(sqlList)
    this.ctx.body = {data: list}
  }
}

module.exports = HomeController
