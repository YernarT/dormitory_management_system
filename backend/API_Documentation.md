# API Documentation

# 用户登录

## POST `api/user/login/`

### 请求数据

| 字段名     | 描述 | 类型     | 必填   |
| ---------- | ---- | -------- | ------ |
| `email`    | 邮箱 | `string` | `True` |
| `password` | 密码 | `string` | `True` |

### 成功的返回

状态码: `200`

```json
{
	"message": "авторизация сәтті болды",
	"token": "9YinnBAA8Bea6IZ5TkQ=*K5lmi52szS+rnPd9jR/7IQ==*tzHkWCBMMweEr/NVP7h3iA==*JRVz6Uu+9VU4y3Vo9BBJow==",
	"user": {
		"id": 8,
		"fullname": "Toktar Yernar",
		"email": "87714526555",
		"role": "tenant",
		"create_time": "2022-03-28T19:09:30.413Z"
	}
}
```

### 失败的返回

状态码: `400`

```json
{
	"message": "авторизация сәтсіз болды"
}
```

---

# 用户注册

## POST `api/user/register/`

### 请求数据

| 字段名     | 描述 | 类型                               | 必填    |
| ---------- | ---- | ---------------------------------- | ------- |
| `email`    | 邮箱 | `string`                           | `True`  |
| `fullname` | 名称 | `string`                           | `False` |
| `password` | 密码 | `string`                           | `True`  |
| `role`     | 角色 | `site admin, dorm manager, tenant` | `True`  |

### 成功的返回

状态码: `200`

```json
{
	"message": "тіркелу сәтті болды",
	"token": "9YinnBAA8Bea6IZ5TkQ=*K5lmi52szS+rnPd9jR/7IQ==*tzHkWCBMMweEr/NVP7h3iA==*JRVz6Uu+9VU4y3Vo9BBJow==",
	"user": {
		"id": 8,
		"fullname": "Toktar Yernar",
		"email": "87714526555",
		"role": "tenant",
		"create_time": "2022-03-28T19:09:30.413Z"
	}
}
```

### 失败的返回

状态码: `400`

```json
{
	"message": "Email тіркелген"
}
```

---

# 用户基本信息修改

## PUT `api/user/eidt/`

### 请求数据

| 字段名     | 描述 | 类型     | 必填    |
| ---------- | ---- | -------- | ------- |
| `email`    | 邮箱 | `string` | `False` |
| `fullname` | 名称 | `string` | `False` |

### 成功的返回

状态码: `200`

```json
{
	"message": "өзгерту сәтті болды",
	"user": {
		"fullname": "Toktar Yernar",
		"email": "87714526555"
	}
}
```

### 失败的返回

状态码: `400`

```json
{
	"message": "Email тіркелген"
}
```

---

# 用户密码修改

## PUT `api/user/change_password/`

### 请求数据

| 字段名        | 描述   | 类型     | 必填   |
| ------------- | ------ | -------- | ------ |
| `oldPassword` | 旧密码 | `string` | `True` |
| `newPassword` | 新密码 | `string` | `True` |

### 成功的返回

状态码: `200`

```json
{
	"message": "өзгерту сәтті болды"
}
```

### 失败的返回

状态码: `400`

```json
{
	"message": "Ескі құпия сөз дұрыс емес"
}
```

---