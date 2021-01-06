# data-center-ele

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
‘信鸽’找bug
2020.12.21:
    1.HJ2A、HJ2B页面会多次加载
    解决方案：数据库中的卫星数据信息（satellite_datas)有重复信息，
    删掉重复数据之后网页恢复正常（12.22日解决）
    
2020.12.22：
    1.打包到WAMPServer上，运行后，图片没有显示出来    
    解决方案：路径问题，vue.config.js中加语句：publicPath:'./' 
    2.打包部署到服务器后，登录/注册界面的验证码没有出现在浏览器的Cookies上,
    即后端中cookie里的值不能写入到浏览器的cookie里去（本地运行能够获得cookie）
    
2020.12.23:
    1.开启了POP3/SMTP服务：授权码为rzfgqjmqpbwyffia
    2.尝试邮箱发送功能（成功👍）
    
2020.12.24:
    1.邮箱验证码发送成功（赞👍）
    2.完善邮箱注册功能
