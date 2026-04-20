# Huma DAO

人类共识组织协作系统 — 以任意形态存在，创造、构建、参与，连接这个世界一切正在发生的共识。

## 项目概述

Huma DAO 是一个去中心化自治组织（DAO）协作平台的前端原型。它为各类组织提供统一的协作工具，涵盖任务赏金、治理投票、声誉沉淀、贡献记录等核心功能，支持母体/子 DAO 嵌套结构，并通过独创的双坐标标签体系（价值观 + 运行模式）来定义每个组织的"灵魂"与"制度"。

## 技术栈

| 层面 | 技术选型 |
|---|---|
| 框架 | React 18 + TypeScript |
| 构建 | Vite 6 |
| 路由 | react-router v7（lazy code-splitting） |
| UI 组件 | shadcn/ui（Radix UI 原语 + Tailwind CSS） |
| 样式 | Tailwind CSS v4 |
| 国际化 | react-i18next（中/英/日/韩 四语言） |
| 主题 | next-themes（dark/light 自动切换） |
| 图标 | lucide-react |

## 目录结构

```
src/
├── main.tsx                    # 应用入口
├── app/
│   ├── App.tsx                 # 根组件（Router + Theme + i18n）
│   ├── routes.ts               # 路由定义（全部 lazy 加载）
│   ├── hooks/
│   │   └── use-mobile.ts       # 移动端检测 hook
│   └── components/
│       ├── layout/             # 全局布局
│       │   ├── AppLayout.tsx   # 主布局（Sidebar + TopBar + Outlet）
│       │   ├── Sidebar.tsx     # 左侧导航栏（可拖拽调宽/收起）
│       │   ├── TopBar.tsx      # 顶部栏（主题/语言/钱包）
│       │   └── Logo.tsx        # Logo 组件
│       ├── ui/                 # shadcn/ui 基础组件（17 个）
│       ├── common/             # 公共业务组件
│       ├── shared/             # 跨页面共享组件
│       │   ├── ValuesRadarChart.tsx   # 价值观雷达图（SVG）
│       │   ├── SpectrumBar.tsx        # 运行光谱条
│       │   ├── ValuesTags.tsx         # 价值观缩略标签
│       │   └── SpectrumTags.tsx       # 运行光谱缩略标签
│       └── pages/              # 页面组件（按路由组织）
│           ├── HomePage.tsx
│           ├── home/           # 首页子模块
│           ├── TownHallPage.tsx
│           ├── town-hall/      # 市政厅子模块
│           ├── DAOHomePage.tsx
│           ├── dao-home/       # DAO 详情页子模块
│           ├── SubDAOPage.tsx
│           ├── CreateProjectPage.tsx
│           ├── create-project/ # 创建向导子模块
│           ├── BountyPoolPage.tsx
│           ├── BountyDetailPage.tsx
│           ├── bounty-pool/
│           ├── GovernancePage.tsx
│           ├── ProposalDetailPage.tsx
│           ├── governance/
│           ├── ContributorsPage.tsx
│           ├── contributors/
│           ├── ProfilePage.tsx
│           ├── profile/
│           ├── WorkspacePage.tsx
│           ├── workspace/
│           ├── ChatPage.tsx
│           ├── chat/
│           ├── DiscoverPage.tsx
│           ├── discover/
│           └── BookmarksPage.tsx
├── data/                       # Mock 数据
│   ├── dao.ts                  # DAO 列表 + 画像数据
│   ├── bounty.ts
│   ├── governance.ts
│   ├── contributor.ts
│   ├── workspace.ts
│   └── chat.ts
├── types/                      # TypeScript 类型定义
│   ├── dao.ts                  # DAO / DAOBrief / DAOProjectType / DAOMode
│   ├── dao-tags.ts             # 双坐标标签体系类型 + 预设模板
│   ├── bounty.ts
│   ├── governance.ts
│   ├── contributor.ts
│   ├── workspace.ts
│   └── chat.ts
├── i18n/
│   ├── index.ts                # i18n 初始化配置
│   └── locales/
│       ├── zh.json             # 中文（主语言）
│       ├── en.json             # 英文
│       ├── ja.json             # 日文
│       └── ko.json             # 韩文
├── styles/
│   └── tailwind.css            # Tailwind 入口 + 自定义工具类
└── assets/
    └── logo/                   # SVG Logo 路径数据
```

## 功能模块

### 1. 首页（/）
- Hero 区域：标题 + slogan + CTA
- Features 区：6 张特色卡片（源自白皮书核心理念）
- 统计数据 + 精选 DAO 展示

### 2. 市政厅（/town-hall）
- DAO 组织列表浏览
- 多维筛选系统：
  - **项目类型**：16 类横向可滑动 tab（社会公共/科技互联网/媒体内容...）
  - **价值观筛选**：8 维度多选（爱/共益/正义/真理/道义/价值创造/自由/秩序）
  - **协作方式筛选**：6 组光谱三档选择器
  - **折叠筛选**：参与形式/区域/排序
- 排序：参与者数量 / 活跃度（icon 切换）

### 3. DAO 详情页（/dao/:id）
- 母体/子 DAO 嵌套结构
- 多 Tab 内容：宪法 / 画像 / 组织 / 赏金 / 提案 / 更新 / 文档
- 右侧面板（lg+）：价值观雷达图 + 运行光谱条 + 贡献者
- Header：加入组织流程 + 缩略标签

### 4. 子 DAO 详情（/dao/:id/sub/:subId）
- 独立画像，可与母体不同
- 返回母体导航

### 5. 创建 DAO 向导（/create-project）
- 6 步流程：基本信息 → 分类标签 → **组织画像** → 技能需求 → 资金配置 → 链接
- 组织画像步骤：4 个预设模板 + 8 维滑块 + 实时雷达图 + 6 条光谱滑块

### 6. 赏金系统（/bounties, /bounties/:id）
- 赏金池浏览 + 筛选
- 赏金详情：生命周期、交付物、申请承接

### 7. 治理（/governance, /governance/:id）
- 提案列表 + 状态筛选
- 提案详情：投票进度、讨论、执行

### 8. 贡献者（/contributors）
- 贡献者卡片 + 技能标签

### 9. 个人主页（/profile/:id?）
- 个人资料 + 声誉面板
- 贡献列表 + 贡献时间线

### 10. 工作台（/workspace）
- 任务看板 + 统计卡片
- DAO 成员概览 + 通知面板

### 11. 聊天（/chat）
- 频道列表 + 消息区 + 成员面板

### 12. 发现（/discover）
- 热门赏金 + 趋势 DAO + 顶级贡献者

### 13. 收藏夹（/bookmarks）

## 双坐标标签体系

这是 Huma DAO 的核心设计创新，用两套坐标系定义一个组织的全貌：

### 价值观坐标系（灵魂）
8 个维度，每个 0-100 分：
- 爱 / 共益 / 正义 / 真理 / 道义 / 价值创造 / 自由 / 秩序

### 运行与分配坐标系（制度）
6 条光谱轴，每条 0-100：
- 愿景驱动 ←→ 任务驱动
- 核心协作 ←→ 开放众包
- 长期共建 ←→ 短期参与
- 平均共享 ←→ 结果分配
- 核心授权 ←→ 广泛治理
- 封闭声誉 ←→ 可迁移声誉

### 4 个预设原型
| 原型 | 价值观特征 | 运行特征 |
|---|---|---|
| 理想共同体型 | 爱+共益+道义+自由 高 | 愿景驱动、长期共建、广泛治理 |
| 项目执行型 | 价值创造+秩序+真理 高 | 任务驱动、结果分配、核心授权 |
| 众包协作型 | 自由+价值创造 高 | 任务驱动、开放众包、短期参与 |
| 公益型 | 爱+共益+正义+道义 高 | 愿景驱动、广泛治理、声誉可迁移 |

## 响应式设计

- **桌面端（lg+, 1024px+）**：完整三栏布局（侧边栏 + 主内容 + 右侧面板）
- **平板端（md-lg, 768-1024px）**：侧边栏可收起 + 主内容全宽
- **移动端（<768px）**：底部抽屉式侧边栏 + 单栏布局
- 侧边栏支持拖拽调宽和收起至 icon-only 模式

## 开发指南

### 环境要求
- Node.js >= 18
- npm >= 9

### 启动开发服务器
```bash
npm install
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 添加新页面
1. 在 `src/app/components/pages/` 下创建页面组件
2. 在 `src/app/routes.ts` 中用 `lazy` 注册路由
3. 在 4 个语言文件中添加对应 i18n 键
4. 如需侧边栏入口，在 `Sidebar.tsx` 中添加导航项

### 添加新 UI 组件
使用 shadcn/ui CLI 或手动创建。当前保留的基础组件：
`avatar`, `badge`, `button`, `card`, `collapsible`, `dropdown-menu`, `input`, `progress`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `tabs`, `textarea`, `tooltip`

### i18n 规范
- 所有用户可见文本必须通过 `t()` 函数引用
- 键名格式：`模块.子模块.具体项`（如 `townHall.filter.projectTypes.education`）
- 新增键必须同时在 zh/en/ja/ko 四个文件中添加

## 版本历史

### v0.1.0（当前）
- 完整页面框架（15 个页面路由）
- 双坐标标签体系
- 母体/子 DAO 嵌套结构
- 市政厅多维筛选
- 创建 DAO 向导（含组织画像）
- 四语言国际化
- 响应式布局
- 代码清理与优化
