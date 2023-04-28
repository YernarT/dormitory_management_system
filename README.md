# Жатақхана Басқару Жүйесі

> 这是一个基于 `React.js` 和 `Django Rest Framework` 的全栈项目，使用到了 `server-sent events` 技术 以及 `Mysql` 和 `Redis` 数据库作为数据存储和缓存。

---

## 项目描述

这是针对单一大学宿舍的管理系统 (真实数据均获取自 [KazATU 大学](https://kazatu.edu.kz/))。

### 核心业务

- 学生入住管理：

  - 学生的入住信息，包括入住时间、宿舍楼号、房间号等等。

- 宿舍信息管理

  - 管理宿舍的信息，包括楼号、房间号、床位数量、房间状态等等。

- 维修报修管理

  - 学生可以通过系统提交维修报修请求，并记录和追踪维修的进度和状态。

- 评分系统

  - 学生评分宿舍：学生可以通过系统对宿舍的卫生、环境、设备等进行评分，从而反映宿舍的整体情况。可以通过记录历史评分数据并加以分析，及时发现宿舍管理问题，并采取措施进行改进。

  - 宿舍评分学生：宿舍管理人员可以对学生的宿舍卫生、环境卫生、物品保管等进行评分，以激励学生积极参与宿舍管理，营造良好的宿舍文化。同时，这种评分制度也能让学生更加认真地对待宿舍卫生等方面的问题。

- 公共设施预约管理

  - 学生可以通过系统预约公共设施（如洗衣房、健身房、会议室等等）的使用时间。

- 消息通知

  - 系统可以向学生和宿舍管理员发送通知、提醒和重要信息。

- 数据统计和分析

  - 系统可以对入住情况、维修报修情况、设施使用情况等数据进行统计和分析，以便更好地管理和优化宿舍管理。

- 数据备份和恢复
  - 系统应该定期备份数据，以便在意外数据丢失或系统崩溃时进行恢复。

---

### 数据库设计：

学生信息表（students） - 学生 ID (student_id) - 学生姓名 (name) - 学生性别 (gender) - 学生班级 (class) - 入住时间 (checkin_time) - 宿舍楼号 (building_no) - 房间号 (room_no) - 联系电话 (phone)

宿舍信息表（dormitories） - 宿舍 ID (dormitory_id) - 宿舍楼号 (building_no) - 房间号 (room_no) - 床位数量 (beds) - 房间状态 (status)

维修报修信息表（repair_orders） - 报修 ID (repair_id) - 报修时间 (repair_time) - 报修人 ID (student_id) - 报修宿舍楼号 (building_no) - 报修房间号 (room_no) - 维修人员 ID (repairman_id) - 维修状态 (status)

楼层巡检信息表（inspections） - 巡检 ID (inspection_id) - 巡检人员 ID (inspector_id) - 巡检时间 (inspection_time) - 巡检宿舍楼号 (building_no) - 巡检房间号 (room_no) - 巡检结果 (result)

公共设施预约信息表（reservations） - 预约 ID (reservation_id) - 预约人 ID (student_id) - 预约设施 (facility) - 预约时间 (reservation_time) - 预约状态 (status)

消息通知信息表（notifications） - 消息 ID (notification_id) - 消息内容 (content) - 消息类型 (type) - 消息时间 (notification_time) - 接收人 ID (recipient_id)

数据统计和分析信息表（statistics） - 统计 ID (statistic_id) - 统计时间 (statistic_time) - 入住人数 (checkin_count) - 维修报修数量 (repair_count) - 设施预约数量 (reservation_count) - 楼层巡检数量 (inspection_count)

数据备份和恢复信息表（backups） - 备份 ID (backup_id) - 备份时间 (backup_time) - 备份文件路径 (backup_path)

评分项表：记录评分项的基本信息，如评分项名称、评分项说明等；

评分项ID（主键）
评分项名称
评分项说明
...
宿舍评分表：记录宿舍的评分信息，如评分项、评分时间、评分人等；

宿舍评分ID（主键）
宿舍ID（外键）
评分项ID（外键）
评分时间
评分人ID（外键）
分值
...
学生评分表：记录学生的评分信息，如评分项、评分时间、被评分人等；

学生评分ID（主键）
学生ID（外键）
评分项ID（外键）
评分时间
评分人ID（外键）
分值
...

## 安装 & 使用

#### 环境搭建

- `Visual Studio Code` 最新版
- `Google Chrome` 最新版
- `Node.js` 版本 16.13.0 (及以上, 没有 breaking change 的兼容版本)
- `Node 包管理器` 推荐使用 `pnpm` 6.28.0 (及以上), 退而求其次使用 `yarn` 1.22 (及以上)

克隆代码库: `git clone https://github.com/YernarT/dormitory_management_system.git`

---

#### 前端

1. 进入 frontend 目录

2. 下载依赖: 命令行工具输入 `pnpm install`

3. 启动项目: 命令行工具输入 `pnpm dev`

4. 浏览页面: 浏览器访问 `http://localhost:3000`

#### 后端

1. 进入 backend 目录

2. 下载依赖: 命令行工具输入 `pnpm install`

3. 运行服务器: 命令行工具输入 `pnpm dev`

4. 访问数据库: 待开发...

5. API 文档: 待开发...

---

## 技术选型

### 前端: `Vite 2 ` + `React 17`

### 后端: `Node 16` + `Express 4`

### 数据库: `MongoDB`

---

## 在线演示

待开发...

---

## 项目截图

待开发...

---

## bugs & todos

- 前端: 丰富 Landing Page 内容

## License

此 `repo` 是 [MIT 许可](./LICENSE)
