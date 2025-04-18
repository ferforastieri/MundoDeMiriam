<script setup>
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const auth = getAuth()
const router = useRouter()
const isSidebarCollapsed = ref(false)
const isMobile = ref(window.innerWidth < 768)

const handleLogout = async () => {
  try {
    await signOut(auth)
    router.push('/login')
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
  }
}

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="admin-layout">
    <AdminSidebar 
      :is-collapsed="isSidebarCollapsed"
      :is-mobile="isMobile"
      @toggle="toggleSidebar" />
    <div class="admin-content" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <header class="admin-header">
        <div class="header-content">
          <div class="header-left">
            <button class="toggle-sidebar" @click="toggleSidebar">
              <span class="toggle-icon">{{ isSidebarCollapsed ? '→' : '←' }}</span>
            </button>
            <img src="/android-chrome-512x512.png" alt="Logo" class="header-logo" />
            <h1>Painel Administrativo</h1>
          </div>
          <div class="user-info">
            <span>{{ auth.currentUser?.email }}</span>
            <button @click="handleLogout" class="logout-button">Sair</button>
          </div>
        </div>
      </header>
      
      <main class="admin-main">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
  animation: fadeIn 0.8s ease;
  width: 100%;
}

.admin-content {
  flex: 1;
  margin-left: 200px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
}

.admin-layout :deep(.collapsed) ~ .admin-content {
  margin-left: 60px;
}

.admin-header {
  background-color: #520;
  color: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  animation: slideDown 0.5s ease;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-logo {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;
}

.header-logo:hover {
  transform: scale(1.05);
}

.admin-header h1 {
  font-family: 'Gilda Display', serif;
  font-size: 1.8rem;
  margin: 0;
  font-weight: normal;
  letter-spacing: 2px;
  position: relative;
  padding-left: 1.5rem;
}

.admin-header h1::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 70%;
  background: rgba(255,255,255,0.3);
  border-radius: 2px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(255,255,255,0.1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.user-info span {
  font-family: 'Gilda Display', serif;
  letter-spacing: 1px;
}

.logout-button {
  font-family: 'Gilda Display', serif;
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.admin-main {
  flex: 1;
  background: #f8f9fa;
  padding: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.toggle-sidebar {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  background: rgba(255,255,255,0.1);
}

.toggle-sidebar:hover {
  background: rgba(255,255,255,0.2);
  transform: scale(1.05);
}

.toggle-icon {
  display: inline-block;
  transition: transform 0.3s ease;
}

.admin-content.sidebar-collapsed {
  margin-left: 60px;
}

@media (max-width: 768px) {
  .admin-content {
    margin-left: 0;
    width: 100%;
  }

  .admin-layout :deep(.collapsed) ~ .admin-content,
  .admin-layout :deep(.mobile-closed) ~ .admin-content {
    margin-left: 0;
  }

  .header-content {
    padding: 0;
  }

  .admin-header {
    padding: 1rem;
  }

  .admin-header h1 {
    font-size: 1.4rem;
  }

  .header-logo {
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }

  .user-info {
    padding: 0.25rem 0.5rem;
    gap: 0.75rem;
  }

  .user-info span {
    display: none;
  }

  .logout-button {
    padding: 6px 12px;
    font-size: 0.9rem;
  }

  .toggle-sidebar {
    width: 28px;
    height: 28px;
    font-size: 1rem;
  }
}
</style> 