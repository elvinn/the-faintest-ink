<template>
  <div class="box-background-demo">
    <div class="demo-section">
      <div class="demo-container">
        <div class="demo-box" :style="boxStyle">
          <div class="content">
            <p>这是一个 {{ implementation === 'svg' ? 'SVG图片' : 'CSS渐变' }} 实现的示例</p>
            <p>背景会自动重复填充整个区域</p>
          </div>
        </div>
      </div>
      <div class="controls">
        <label>
          实现方式：
          <select v-model="implementation">
            <option value="svg">SVG 图片</option>
            <option value="gradient">CSS 渐变</option>
          </select>
        </label>
        <label v-if="implementation === 'svg'">
          背景图片大小：
          <input type="range" v-model.number="backgroundSize" min="20" max="200" step="1" />
          {{ backgroundSize }}px
        </label>
        <label v-if="implementation === 'gradient'">
          格子大小：
          <input type="range" v-model.number="gradientSize" min="20" max="100" step="1" />
          {{ gradientSize }}px
        </label>
        <label v-if="implementation === 'gradient'">
          线条颜色：
          <input type="color" v-model="gradientColor" />
        </label>
        <label v-if="implementation === 'gradient'">
          透明度：
          <input type="range" v-model.number="gradientOpacity" min="0.05" max="0.3" step="0.01" />
          {{ gradientOpacity }}
        </label>
        <label v-if="implementation === 'gradient'">
          旋转角度：
          <input type="range" v-model.number="rotateAngle" min="-10" max="10" step="1" />
          {{ rotateAngle }}°
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoxBackgroundDemo',
  props: {
    defaultImplementation: {
      type: String,
      default: 'svg',
      validator: value => ['svg', 'gradient'].includes(value)
    }
  },
  data() {
    return {
      implementation: this.defaultImplementation,
      backgroundSize: 63,
      gradientSize: 40,
      gradientColor: '#3b82f6',
      gradientOpacity: 0.2,
      rotateAngle: -3
    }
  },
  computed: {
    boxStyle() {
      if (this.implementation === 'svg') {
        return {
          '--bg-image': 'url(/css/box-item.svg)',
          '--bg-size': `${this.backgroundSize}px auto`,
          '--bg-opacity': 0.3,
          '--bg-transform': 'none'
        }
      } else {
        const color = this.hexToRgba(this.gradientColor, this.gradientOpacity);
        return {
          '--bg-image': `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
          '--bg-size': `${this.gradientSize}px ${this.gradientSize}px`,
          '--bg-opacity': 1,
          '--bg-transform': `rotate(${this.rotateAngle}deg) scale(1.2)`
        }
      }
    }
  },
  methods: {
    hexToRgba(hex, opacity) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
  }
}
</script>

<style scoped>
.box-background-demo {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-container {
  display: flex;
  justify-content: center;
  padding: 16px;
}

.demo-box {
  position: relative;
  width: 400px;
  height: 300px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #374151;
  font-size: 14px;
  line-height: 1.5;
  transition: all 0.3s ease;
  overflow: hidden;
}

.demo-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: var(--bg-image);
  background-size: var(--bg-size);
  background-repeat: repeat;
  background-position: left top;
  opacity: var(--bg-opacity);
  border-radius: 8px;
  z-index: 1;
  transform: var(--bg-transform);
  transition: all 0.3s ease;
}

.content {
  position: relative;
  z-index: 2;
  padding: 20px;
}

.controls {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  background: white;
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.controls select {
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
}

.controls input[type="range"] {
  width: 100px;
}

.controls input[type="color"] {
  width: 32px;
  height: 32px;
  border: none;
  cursor: pointer;
}

@media (max-width: 640px) {
  .box-background-demo {
    padding: 16px;
  }
  
  .controls {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .demo-box {
    width: 250px;
    height: 150px;
  }
}
</style>