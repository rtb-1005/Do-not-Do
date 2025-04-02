import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import InputPage from './pages/InputPage'
import DisplayPage from './pages/DisplayPage'

/**
 * App 组件 - 应用程序的主入口点
 * 
 * 该组件负责：
 * 1. 设置应用的路由结构
 * 2. 管理参与者数量的全局状态
 * 3. 在InputPage和DisplayPage之间传递状态
 * 4. 实现路由保护，确保用户必须先输入人数才能访问显示页面
 */
function App() {
  // 存储参与者数量的状态，初始值为0
  // 这个状态将被传递给InputPage进行设置，然后传递给DisplayPage进行使用
  const [participantCount, setParticipantCount] = useState(0)

  return (
    <Router>
      <Routes>
        {/* 主页路由 - 显示输入页面，用户可以在此设置参与者数量 */}
        <Route 
          path="/" 
          element={<InputPage setParticipantCount={setParticipantCount} />} 
        />
        {/* 显示页面路由 - 包含路由保护逻辑 */}
        <Route 
          path="/display" 
          element={
            // 路由保护：只有当参与者数量大于0时才能访问显示页面
            // 否则重定向回主页
            participantCount > 0 ? 
              <DisplayPage participantCount={participantCount} /> : 
              <Navigate to="/" />
          } 
        />
      </Routes>
    </Router>
  )
}

export default App