# 竞赛系统
+ 整体采用react hooks  
+ 简单封装了axios  
+ 简单封装了react-router-dom  
+ 简单进行了api统一管理  
+ 简单进行了路由鉴权
+ 简单的进行了docker部署

由于服务器这边安全性较差，***我就删掉了代理的路径***，不过接口这些都比较简单

由于比较忙，又是我一个人单独开发，给的时间还挺紧，后来又被砍掉了啊😭，我很难受，浪费了时间，没时间写单侧，做ci，代码也比较狂放，写到后面完全就在乱写了，特别是表单，还请见谅


## 启动项目

```shell
  yarn start
  或者
  docker build -t ms .
  docker run --name meeting-system -d -p 80:80 ms
```

