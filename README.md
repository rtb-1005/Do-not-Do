# 不要做挑战 - 大屏幕显示应用

在电视台的那个综艺录制下做不要做挑战，发现惩罚者无法明确惩罚，并且有些信息不太清楚，就想着大屏幕上可以显示一些东西能更加清晰

## 功能特点

- **动态分区显示**：根据输入的参与人数，自动生成对应数量的显示区块
- **键盘交互**：按下对应的键盘按键，使相应区块变红并持续3秒
- **华丽UI**：使用渐变色、动画效果和现代设计元素
- **响应式布局**：适配不同屏幕尺寸
（上面这一切是ai瞎编的，我只是喜欢react的语法糖而已，是真的甜）

## 使用方法

1. 在首页输入参与挑战的人数
2. 点击"开始挑战"按钮进入显示页面
3. 按下键盘上对应的按键（数字1-9对应前9个区块，字母a-z对应后续区块）这个按键映射可以在`src/components/Display/Display.tsx`中修改
4. 对应的区块会变红并持续3秒

## 外部调用

- React 18 （真的很甜--）
- Vite （端口管理）
- React Router
- Ant Design
- Framer Motion (动画效果)
- Styled Components (样式管理)

## 项目安装与运行指南

### 什么是npm？

npm（Node Package Manager）是Node.js的包管理工具，它允许开发者安装、共享和管理项目依赖。通过npm，你可以轻松地安装本项目所需的所有依赖包，并使用预定义的脚本命令来运行、构建和预览项目。

### 前置条件

在开始之前，请确保你的电脑上已安装：

- [Node.js](https://nodejs.org/) (v14.0.0或更高版本)
- npm (通常随Node.js一起安装)

你可以通过以下命令检查它们是否已安装：

```bash
node -v
npm -v
```

### 安装依赖

首先，克隆或下载本项目到你的本地电脑，然后在项目根目录下打开终端，运行以下命令安装所有依赖：

```bash
npm install
```

这个命令会读取`package.json`文件中列出的所有依赖，并将它们安装到`node_modules`文件夹中。
其实这里是这样的，就是其实我在github上已经上传了一份搞好的node_modules，所以项目体积其实很大，全是别人的东西。不过就放在这里就行了
你们只需要下载src文件夹和package.json文件就行了，其他的都不用管。

### 开发模式运行

安装完依赖后，你可以启动开发服务器：

```bash
npm run dev
```

这个命令会启动一个本地开发服务器（通常在http://localhost:5173），并且支持热重载——这意味着当你修改代码时，浏览器会自动刷新以显示最新的更改，无需手动刷新页面。

如果你实在不熟悉npm，也可以直接用vscode的插件，这个插件会自动安装依赖，并且会自动打开浏览器，并且会自动刷新页面。
### 常见npm命令

除了上述命令外，npm还提供了许多有用的功能：

- `npm list`：列出已安装的所有依赖
- `npm update`：更新所有依赖到最新版本
- `npm outdated`：检查过时的依赖
- `npm uninstall <包名>`：卸载指定的依赖
- `npm install <包名> --save`：安装并添加到dependencies
- `npm install <包名> --save-dev`：安装并添加到devDependencies

### 常见问题解决

- **安装依赖失败**：尝试使用`npm cache clean --force`清除npm缓存，然后重新运行`npm install`
- **端口冲突**：如果5173端口被占用，Vite会自动尝试使用下一个可用端口
- **依赖版本冲突**：可以尝试删除`node_modules`文件夹和`package-lock.json`文件，然后重新运行`npm install`

## 注意事项

-仅供NEU浑南电视台内部使用
