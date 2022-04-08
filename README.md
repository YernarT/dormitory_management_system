# Django + React 全栈项目 (宿舍管理系统)

> 2021 年 ~ 2022 年, 大学四年级, 网友(Бақашқан Ә.)的毕设。

---

## 安装 & 使用

#### 环境搭建

- 前端相关

  - `Node.js` 版本 16.13.0 (及以上)

  - `Node 包管理器` 推荐使用 pnpm 6.28.0 (及以上), 退而求其次使用 yarn 1.22 (及以上)

- 后端相关
  - Python 3.9.6 (及以上)
  - Django 3.2.8 (及以上, 没有 breaking change 的兼容版本)

---

代码克隆到本地: `git clone https://github.com/YernarT/dormitory_management_system.git`

#### 前端

1. 进入 frontend 目录

2. 下载依赖: 命令行工具输入 `pnpm install`

3. 启动项目: 命令行工具输入 `pnpm dev`

4. 浏览页面: 浏览器访问 `http://localhost:3015`

#### 后端

1. 进入 backend 目录

2. 下载依赖: 命令行工具输入 `pip install -r modules.txt`

3. 运行服务器: 命令行工具输入 `python manage.py runserver`

4. 访问数据库: 待开发...

5. API 文档: 待开发...

---

## 技术选型

### 前端: `Vite 2 ` + `React 17`

### 后端: `Python 3` + `Django 3`

### 数据库: `SQLite`

---

## 在线演示

待开发...

---

## 项目截图

待开发...

---

## bugs & todos

- (前端) Antd 组件样式 按需加载
- (前端) container 公共类 宽度调整
- (前端) Login & Register 页面 less 文件整合

---

## 业务逻辑

### 数据库管理员 (Database Admin):

- 初始化 / 创建 **网站管理员**
- 删除 **网站管理员**

### 用户类型:

- **网站管理员 (Site Admin)**

  - CRUD **城市**
  - 浏览对 _机构_, _宿舍_, _城市_, _租客_ 的数据的数据可视化

- **机构管理员 (Organization Manager)**

  - CRD **宿舍管理员**
  - CRUD 宿舍
  - CRUD 宿舍价格
  - 处理 **租客** 入住申请

- **宿舍管理员 (Dormitory Admin)**

  - CRU **宿舍**
  - 处理 **租客** 入住申请

- **租客 (Tenant)**
  - 浏览 宿舍
  - CRUD 入住申请
  - 查看自己当前入住的宿舍 (只能入住一个)

### 前端路由

- 公用路由

  - /
  - /404
  - /profile
  - /auth/login
  - /auth/register

- 网站管理员路由

  - /site-admin

- 宿舍管理员路由

  - /dorm-manager

- 租客路由

  - /tenant
