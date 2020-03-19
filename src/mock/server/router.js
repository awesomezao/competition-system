const Router = require('koa-router');
const { testData, myFavorite, singalMeeting,awesomeMeeings } = require('../data/data');
const mockRouter = new Router();
const fs = require('fs')
const path=require('path')

//上传图片
function uploadimg (ctx) {

  let file = ctx.request.files; // 获取上传文件
  
  // 创建可读流
  const reader = fs.createReadStream(file.avatar);
  let filePath =
    `/shareSource/img/my_blog_img` + `/avatar`;
  let remotefilePath =
    `http://www.xxxx.com:8887/img/my_blog_img` +
    `/aaa`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return (ctx.body = {
    url: remotefilePath,
    message: '文件上传成功',
    cc: 0
  });
}

// 登录
mockRouter.post('/login', async ctx => {
  console.log(ctx.request.body);
  let { key, password } = ctx.request.body;
  if (key === '15002320582') {
    ctx.body = {
      code: 0,
      data: {
        jwt: 'zao123123',
        user: {}
      },
      message: '登陆成功'
    };
  } else {
    ctx.body = {
      code: -99,
      data: {},
      message: '登陆失败'
    };
  }
});

// 获取验证码
mockRouter.post('/verificationCode', async ctx => {
  console.log(ctx.request.body);

  ctx.body = {
    code: 0,
    message: '获取验证码成功',
    data: {
      verificationCode: 1024
    }
  };
});

// 注册
mockRouter.post('/signup', async ctx => {
  console.log(ctx.request.body);

  ctx.body = {
    code: 0,
    message: '获取验证码成功',
    data: {}
  };
});

// 我的收藏
mockRouter.get('/preference/3', async ctx => {
  ctx.body = myFavorite;
});

// 系统消息
mockRouter.get('/getMessage', async ctx => {
  ctx.body = {
    code: 0,
    message: '获取消息',
    data: {
      message: [
        {
          id: 12,
          title: '会议发布',
          content: '尊敬的用户,你好,你的xxx会议已经成功发布'
        },
        {
          id: 13,
          title: '会议报名',
          content: '尊敬的用户,你好,你已经成功报名xxx会议'
        },
        {
          id: 14,
          title: '会议报名',
          content: '尊敬的用户,你好,你已经成功报名xxxxxxxxx会议'
        }
      ]
    }
  };
});

// 得到userjson
mockRouter.get('/info', async ctx => {
  ctx.body = {
    code: 0,
    message: 'success',
    data: {
      info: {
        userid: 17,
        realname: '吕进豪',
        username: 'L J H',
        gender: '男',
        emailaddr: '108214@qq.com',
        phone: '15086924104',
        organization: '重邮',
        avatar: '',
        password: '123456'
      }
    }
  };
});

// 修改user info
mockRouter.post('/update', async ctx => {
  console.log(ctx.request.body);
  ctx.body = {
    code: 0,
    message: '修改成功',
    data: {}
  };
});

// 发布会议
mockRouter.post('/meeting/add', async ctx => {
  console.log(ctx.request.body);
  ctx.body = {
    code: 0,
    message: '发布成功',
    data: {}
  };
});

// 获取主页分页数据
mockRouter.get('/meetings/home', async ctx => {
  console.log(ctx.query);
  ctx.body = myFavorite;
});

// 根据条件搜索数据
mockRouter.get('/meetings/dy', async ctx => {
  console.log(ctx.query);
  ctx.body = myFavorite;
});

const meetingId = [123, 124, 125, 126, 127, 128, 129];
// 根据会议id查询会议详情
meetingId.forEach(item => {
  mockRouter.get(`/meeting/${item}`, async ctx => {
    console.log(ctx.query);
    ctx.body = {
      code: 0,
      message: '请求成功',
      data: singalMeeting
    };
  });
});

// 嘉宾参加会议
mockRouter.post('/preference/2', async ctx => {
  ctx.body = {
    code: 0,
    message: '报名成功'
  };
});
// 志愿者报名会议
meetingId.forEach(item => {
  mockRouter.post(`/joinVolunteer/${item}`, async ctx => {
    ctx.body = {
      code: 0,
      message: '报名成功'
    };
  });
});

// 精彩幻灯
mockRouter.get('/meetings/my', async ctx => {
  ctx.body=awesomeMeeings
})

// 文档会议
mockRouter.get('/meetPreference/:type', async ctx => {
  ctx.body=myFavorite
});



module.exports = mockRouter;
