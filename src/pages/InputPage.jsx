import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Input, Button, message } from 'antd'

/**
 * 样式组件定义
 * 使用styled-components和framer-motion创建具有动画效果的UI组件
 */

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #1e1e2e, #2d2d44);
  position: relative;
  overflow: hidden;
`

const StyledCard = styled(motion.div)`
  background: rgba(30, 30, 46, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
`

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(90deg, #8a2be2, #ff6b6b, #00d2d3);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
`

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #f8f8f2;
  opacity: 0.8;
`

const StyledInput = styled(Input)`
  padding: 1rem 1.5rem;
  border: 2px solid #44475a;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #f8f8f2;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  height: auto;

  &:focus {
    border-color: #8a2be2;
    box-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
  }
`

const StyledButton = styled(Button)`
  height: auto;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 50px;
  background: linear-gradient(45deg, #8a2be2, #ff6b6b);
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  width: 100%;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(-1px);
  }
`

const FloatingCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, #8a2be2, #ff6b6b);
  filter: blur(15px);
  opacity: 0.3;
  z-index: 1;
`

/**
 * InputPage组件 - 用户输入参与者数量的页面
 * 
 * @param {Function} setParticipantCount - 从App组件传递的设置参与者数量的函数
 * 
 * 该组件负责：
 * 1. 收集用户输入的参与者数量
 * 2. 验证输入的有效性
 * 3. 在验证通过后导航到显示页面
 * 4. 提供美观的UI和动画效果
 */
const InputPage = ({ setParticipantCount }) => {
  // 存储用户输入的参与者数量
  const [count, setCount] = useState('')
  // 用于页面导航的hook
  const navigate = useNavigate()

  /**
   * 处理表单提交
   * 验证输入的参与者数量，设置全局状态，并导航到显示页面
   */
  const handleSubmit = () => {
    // 将输入转换为整数
    const parsedCount = parseInt(count, 10)
    // 验证输入是否为有效数字且大于0
    if (isNaN(parsedCount) || parsedCount <= 0) {
      message.error('请输入有效的人数！')
      return
    }
    // 当人数过多时显示警告信息
    if (parsedCount > 26) {
      message.warning('人数过多可能影响显示效果，建议不超过26人')
    }
    // 更新App组件中的参与者数量状态
    setParticipantCount(parsedCount)
    // 导航到显示页面
    navigate('/display')
  }

  /**
   * 处理键盘按键事件
   * 当用户按下Enter键时提交表单
   * @param {Event} e - 键盘事件对象
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  /**
   * 生成随机浮动圆圈的属性
   * 创建背景动画效果的圆形元素
   * @returns {Array} 包含圆圈属性的数组（大小、位置、动画持续时间）
   */
  const generateCircles = () => {
    const circles = []
    // 创建10个具有随机属性的圆圈
    for (let i = 0; i < 10; i++) {
      circles.push({
        size: Math.random() * 200 + 50, // 随机大小(50-250px)
        x: Math.random() * 100, // 随机水平位置(0-100%)
        y: Math.random() * 100, // 随机垂直位置(0-100%)
        duration: Math.random() * 10 + 10 // 随机动画持续时间(10-20s)
      })
    }
    return circles
  }

  const circles = generateCircles()

  return (
    <PageContainer>
      {circles.map((circle, index) => (
        <FloatingCircle
          key={index}
          style={{
            width: circle.size,
            height: circle.size,
            left: `${circle.x}%`,
            top: `${circle.y}%`
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
      <StyledCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          不要做挑战
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          请输入参与挑战的人数
        </Subtitle>
        <StyledInput
          size="large"
          placeholder="请输入人数"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          onKeyPress={handleKeyPress}
          type="number"
          min="1"
        />
        <StyledButton 
          type="primary" 
          onClick={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          开始挑战
        </StyledButton>
      </StyledCard>
    </PageContainer>
  )
}

export default InputPage