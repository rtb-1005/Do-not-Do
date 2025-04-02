import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

/**
 * 样式的定义都在底下，打包成一个文件
 * styled-components和framer-motion做的动画
 */

/**
 * 下面是背景
 */
const PageContainer = styled.div`
  min-height: 100vh;
  padding: 1rem;
  background: linear-gradient(135deg, #1e1e2e, #2d2d44);
  position: relative;
  overflow: hidden;
`
//这个是关于标题的，可以直接修改
const Title = styled(motion.h1)`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, #8a2be2, #ff6b6b, #00d2d3);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
`

const BlocksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`
//这里是每个区块的样式，是一个div，里面有一个数字和一个提示
//虽然有点扁平构图但是别动这里！！因为当堆叠太多的时候会严重变形挤出去

const Block = styled(motion.div)`
  position: relative;
  height: 400px;
  border-radius: 15px;
  background: rgba(30, 30, 46, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #8a2be2, #ff6b6b);
  }
`
//按键当间的数字是分开渲染的
const BlockNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
`
//按键映射的提示，想注释可以直接注释掉也行，实际拍摄中可能会有影响！
const KeyHint = styled.div`
  position: absolute;
  bottom: 10px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`

const Instructions = styled(motion.div)`
  background: rgba(30, 30, 46, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  margin: 0 auto 2rem auto;
  max-width: 800px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`

const FloatingCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, #8a2be2, #ff6b6b);
  filter: blur(15px);
  opacity: 0.2;
  z-index: 1;
`

/**
 * DisplayPage组件 - 显示参与者区块并处理键盘交互的页面
 * 
 * @param {Number} participantCount - 从App组件传递的参与者数量
 * 
 * 该组件负责：
 * 1. 创建对应数量
 * 2. 变色的逻辑
 * 3. 键盘映射
 * 4. 一些非常fancy的动画效果，快夸副台长嘤嘤嘤！！！
 */
const DisplayPage = ({ participantCount }) => {
  // 存储当前激活（变红）的区块状态
  const [activeBlocks, setActiveBlocks] = useState({})
  
  /**
   * 生成键盘映射
   * 创建键盘按键到区块编号的映射关系
   * 
   * @param {Number} count - 参与者数量
   * @returns {Object} 键盘按键到区块编号的映射
   */
  const generateKeyMap = (count) => {
    const keyMap = {}
    // 使用数字键 1-9 映射到前9个区块
    for (let i = 1; i <= Math.min(9, count); i++) {
      keyMap[i.toString()] = i
    }//这块注释掉可以直接填keymap里也行，注意一定是char格式！！

//这块可以自己去改映射的按键，因为多人操作会有点不舒服，毕竟隔太近了


    // 使用字母键 a-z 映射到第10个及之后的区块（应该不会那么多人吧。。。。。）
    if (count > 9) {
      const aCode = 'a'.charCodeAt(0) // 获取字母'a'的ASCII码
      for (let i = 0; i < Math.min(26, count - 9); i++) {
        const letter = String.fromCharCode(aCode + i) // 生成字母a-z
        keyMap[letter] = i + 10 // 映射到区块10及之后
      }
    }
    return keyMap
  }

  // 生成键盘按键到区块编号的映射
  const keyMap = generateKeyMap(participantCount)
  
  /**
   * 创建区块编号到键盘按键的反向映射
   * 用于在UI中显示每个区块对应的按键
   */
  const reverseKeyMap = Object.entries(keyMap).reduce((acc, [key, value]) => {
    acc[value] = key
    return acc
  }, {})

  /**
   * 设置键盘事件监听
   * 当用户按下对应按键时，激活相应区块并在3秒后恢复
   */
  useEffect(() => {
    /**
     * 处理键盘按下事件
     * @param {KeyboardEvent} e - 键盘事件对象
     */
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase() // 转为小写以支持大小写不敏感
      if (keyMap[key]) {
        const blockId = keyMap[key] // 获取按键对应的区块ID
        // 设置区块为激活状态（变红）
        setActiveBlocks(prev => ({
          ...prev,
          [blockId]: true
        }))
        
        // 3秒后恢复区块状态
        setTimeout(() => {
          setActiveBlocks(prev => ({
            ...prev,
            [blockId]: false
          }))
        }, 3000)
      }
    }

    // 监听器设计
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [keyMap]) 

  /**
   * 生成随机浮动圆圈的属性
   * 创建背景动画效果的圆形元素
   * @returns {Array} 包含圆圈属性的数组（大小、位置、动画持续时间）
   */
  const generateCircles = () => {
    const circles = []
    // 创建8个具有随机属性的圆圈
    for (let i = 0; i < 8; i++) {
      circles.push({
        size: Math.random() * 300 + 100, // 随机大小(100-400px)
        x: Math.random() * 100, // 随机水平位置(0-100%)
        y: Math.random() * 100, // 随机垂直位置(0-100%)
        duration: Math.random() * 15 + 15 // 随机动画持续时间(15-30s)
      })
    }
    return circles
  }

  const circles = generateCircles()

  return (
    <PageContainer>
      {/* 渲染背景浮动圆圈 */}
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
            x: [0, 50, -50, 0], // X轴浮动动画
            y: [0, -50, 50, 0], // Y轴浮动动画
          }}
          transition={{
            //duration: circle.duration, //不想更新的话直接设置无限
            duration: Infinity,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
      
      {/* 页面标题 - 带有淡入和向上移动的动画效果 */}
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
       不要做挑战
      </Title>
      
      {/* 使用说明 - 带有淡入动画效果 */}
      <Instructions
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        每个人头上会有一个卡，自己看不见，只能别人看见<br/>
        自己做了卡片上的内容就会被打<br/>
      </Instructions>
      
      {/* 区块容器 - 使用CSS Grid布局自适应排列区块 */}
      <BlocksContainer>
        {/* 根据参与者数量生成对应数量的区块 */}
        {Array.from({ length: participantCount }, (_, i) => i + 1).map((blockId) => (
          <Block
            key={blockId}
            className={activeBlocks[blockId] ? 'red-block' : ''}
            initial={{ opacity: 0, scale: 0.8 }} // 初始状态
            animate={{ 
              opacity: 1, 
              scale: 1,
              // 根据激活状态动态改变背景色和阴影
              backgroundColor: activeBlocks[blockId] ? 'rgba(255, 0, 0, 0.7)' : 'rgba(30, 30, 46, 0.7)',
              boxShadow: activeBlocks[blockId] ? '0 0 20px rgba(255, 0, 0, 0.5)' : '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}
            transition={{ 
              delay: blockId * 0.05, // 级联动画效果，每个区块延迟出现
              duration: 0.3,
              type: 'spring', // 使用弹簧动画效果
              stiffness: 300,
              damping: 20
            }}
            whileHover={{ scale: 1.05 }} // 鼠标悬停效果
            whileTap={{ scale: 0.95 }} // 鼠标点击效果
          >
            <BlockNumber>{blockId}</BlockNumber>
            <KeyHint>按键: {reverseKeyMap[blockId]}</KeyHint>
          </Block>
        ))}
      </BlocksContainer>
    </PageContainer>
  )
}

export default DisplayPage