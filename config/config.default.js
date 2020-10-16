/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1602315711330_437';

  // add your middleware config here
  config.middleware = [];
  
  // mysql config
  config.mysql = {
    //database configuration 
    client:{
        //host 
        host:'localhost',
        //port 
        port:'3306',
        //username 
        user:'root',
        //password 
        password:'123456',
        //database 
        database:'blog-db'
    },
    //load into app,default is open //加载到应用程序，默认为打开
    app:true,
    //load into agent,default is close //加载到代理中，默认值为“关闭”
    agent:false,
  }

  // security
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: [ '*' ]
  }
  // cors
  config.cors = {
    origin: 'http://localhost:3000', //只允许这个域进行访问接口
    credentials: true,   // 开启认证, 允许Cookie跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS' // 允许的请求方式
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
