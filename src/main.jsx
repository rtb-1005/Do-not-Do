import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * React应用程序的入口点
 * 
 * 这里使用了React 18的新特性createRoot API来渲染应用
 * React.StrictMode启用了严格模式，帮助开发者发现潜在问题
 * 整个应用挂载在id为'root'的DOM元素上
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)