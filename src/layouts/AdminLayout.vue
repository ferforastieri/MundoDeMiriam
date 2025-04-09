<script setup>
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'

const auth = getAuth()
const router = useRouter()

const handleLogout = async () => {
  try {
    await signOut(auth)
    router.push('/login')
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
  }
}
</script>

<template>
  <div class="admin-layout">
    <AdminSidebar />
    <div class="admin-content">
      <header class="admin-header">
        <div class="header-content">
          <h1>Painel Administrativo</h1>
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
  background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
  display: flex;
  animation: fadeIn 0.8s ease;
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
  background-color: #1a1a1a;
  color: white;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  animation: slideDown 0.5s ease;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-header h1 {
  font-family: 'Gilda Display', serif;
  font-size: 1.8rem;
  margin: 0;
  font-weight: normal;
  letter-spacing: 2px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-info span {
  font-family: 'Gilda Display', serif;
  letter-spacing: 1px;
}

.logout-button {
  font-family: 'Gilda Display', serif;
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
}

.logout-button:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.admin-main {
  flex: 1;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
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

@media (max-width: 768px) {
  .admin-content {
    margin-left: 0;
  }

  .admin-layout :deep(.collapsed) ~ .admin-content {
    margin-left: 0;
  }

  .header-content {
    padding: 0 1rem;
  }

  .admin-header h1 {
    font-size: 1.4rem;
  }

  .user-info {
    gap: 1rem;
  }

  .user-info span {
    display: none;
  }
}
</style> 