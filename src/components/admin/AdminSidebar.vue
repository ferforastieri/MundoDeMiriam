<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const activeRoute = ref(router.currentRoute.value.path)
const isMobile = ref(window.innerWidth < 768)
const touchStartX = ref(0)
const touchEndX = ref(0)
const isDragging = ref(false)

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/posts', label: 'Posts', icon: '📝' },
  { path: '/admin/gallery', label: 'Galeria', icon: '🖼️' },
  { path: '/admin/screens', label: 'Telas', icon: '🖥️' },
  { path: '/admin/settings', label: 'Configurações', icon: '⚙️' },
  { path: '/admin/instagram', label: 'Instagram', icon: '🌟' }
]

const navigateTo = (path) => {
  router.push(path)
  activeRoute.value = path
}

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
}

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
  isDragging.value = true
}

const handleTouchMove = (e) => {
  if (!isDragging.value) return
  
  touchEndX.value = e.touches[0].clientX
  const diff = touchStartX.value - touchEndX.value
}

const handleTouchEnd = () => {
  isDragging.value = false
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="sidebar-wrapper" 
       :class="{ collapsed: isCollapsed }"
       @touchstart="handleTouchStart"
       @touchmove="handleTouchMove"
       @touchend="handleTouchEnd">
    <div class="sidebar-overlay" 
         v-if="!isCollapsed && isMobile"></div>
    <nav class="admin-sidebar">
      <div class="sidebar-header">
        <h2 v-if="!isCollapsed">Menu</h2>
      </div>
      <ul class="sidebar-menu">
        <li v-for="item in menuItems" 
            :key="item.path"
            :class="{ active: activeRoute === item.path }"
            @click="navigateTo(item.path)">
          <span class="icon">{{ item.icon }}</span>
          <span class="label" v-if="!isCollapsed">{{ item.label }}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.sidebar-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1000;
  transition: all 0.3s ease;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.admin-sidebar {
  width: 200px;
  background-color: white;
  height: 100vh;
  box-shadow: 2px 0 4px rgba(0,0,0,0.05);
  animation: slideIn 0.5s ease;
  border-right: 1px solid #e9ecef;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1001;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-header h2 {
  font-family: 'Gilda Display', serif;
  margin: 0;
  font-size: 1.1rem;
  color: #520;
  letter-spacing: 2px;
}

.toggle-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #520;
  padding: 0.5rem;
  transition: transform 0.3s ease;
}

.toggle-button:hover {
  transform: scale(1.1);
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.sidebar-menu li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #520;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.3s ease;
}

.sidebar-menu li:hover {
  background-color: #f8f9fa;
}

.sidebar-menu li:hover::before {
  transform: scaleY(1);
}

.sidebar-menu li.active {
  background-color: #f0f0f0;
}

.sidebar-menu li.active::before {
  transform: scaleY(1);
}

.icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  min-width: 24px;
  text-align: center;
}

.sidebar-menu li:hover .icon {
  transform: scale(1.1);
}

.label {
  font-family: 'Gilda Display', serif;
  font-size: 0.9rem;
  color: #520;
  letter-spacing: 1px;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.sidebar-menu li:hover .label {
  color: #520;
}

.collapsed .admin-sidebar {
  width: 60px;
}

.collapsed .label {
  display: none;
}

.collapsed .sidebar-header h2 {
  display: none;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .sidebar-wrapper {
    transform: translateX(-100%);
  }

  .sidebar-wrapper.collapsed {
    transform: translateX(0);
  }

  .admin-sidebar {
    width: 200px;
  }

  .collapsed .admin-sidebar {
    width: 200px;
  }

  .sidebar-overlay {
    display: none;
  }

  .collapsed ~ .sidebar-overlay {
    display: block;
  }
}
</style> 