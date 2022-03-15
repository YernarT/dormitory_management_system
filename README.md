# DRF + Vite + React + JS 全栈项目 (宿舍管理系统)

> 2021 年 ~ 2022 年, 大学四年级, 网友(Бақашқан Ә.)的毕设。

---

## 安装 & 使用

代码克隆到本地: `git clone https://github.com/YernarT/dormitory_management_system.git`

#### 前端

1. 进入 frontend 目录

2. 下载依赖: 命令行工具输入 `pnpm install`

3. 启动项目: 命令行工具输入 `pnpm dev`

4. 浏览页面: 浏览器访问 `http://localhost:3015`

#### 后端

1. 进入 backend 目录

2. 下载依赖: 命令行工具输入 `pip install -r requirements.txt`

3. 运行服务器: 命令行工具输入 `python manage.py runserver`

4. 访问数据库: 待开发...

5. API 文档: 待开发...

---

## 技术选型

### 前端: `Vite 2 React 17`

### 后端: `Python 3.9.6` `Django 3.2.8`

### 数据库: `SQLite`

---

## 功能

待编辑...

---

## 在线演示

待开发...

---

## 项目截图

待开发...

---

## bugs & todos

- antd 样式 按需加载

---

## 业务逻辑

### 数据库管理员 (Database Admin):

- 初始化 / 创建 **网站管理员**
- 删除 **网站管理员**

### 用户类型:

- **网站管理员 (Site Admin)**

  - 审批 **宿舍管理员** 的注册申请
  - 创建 **网站管理员** 账号
  - 申请删除 **网站管理员** 账号 (当前 / 其他)

- **宿舍管理员 (Dormitory Admin)**

  - CRUD **宿舍**
  - 审批 **租客** 的入住申请
  - CRUD **租客**的**居住信息**

- **租客 (Tenant)**
  - 申请入住 **宿舍**
  - 申请离开 **宿舍**
