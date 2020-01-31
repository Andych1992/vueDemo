# Api

> 目前所有请求的api需要上传部署到自己的服务空间，并初始化为自己的服务空间调用

## 账号

### 超级管理员注册

`cloudfunctions-aliyun/register/index.js`

> 注册status为0，permission为0（超级管理员），密码通过散列加密

**请求**

```json
{
    name: 'register',
    data: {
        username: '',// 大陆手机号码
        password: '' // 注册密码
    }
}

```

**成功响应**

```json
{
	success: true,
	code: 200,
	msg: "注册成功",
	data: {
		id: "5e342af2568a850053eedcf1"
	}
}
```

### 登录

`cloudfunctions-aliyun/login/index.js`

> 登录成功返回token和userInfo

**请求**

```json
{
    name: 'login',
    data: {
        username: '13800000000',
        password: '123456'
    }
}
```

**成功响应**

```json
{
    "success": true,
    "code": 200,
    "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjEzODAwMDAwMDAwIiwiZGF0ZSI6MTU4MDQ3NzM2Nzk3M30.bTi9uobu9JjfJ_ECCad_prcbHGqg8IsdbBBSrGnFZP4", // token
        "userInfo": {
            "_id": "5e342af2568a850053eedcf1",
            "create_time": 1580477170656,
            "username": "13800000000",
            "permission": 0,
            "status": 0
        } // 用户信息
    },
    "msg": "登录成功"
}
```

### 