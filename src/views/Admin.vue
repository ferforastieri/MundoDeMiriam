<script setup>
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

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
  <div class="admin">
    <header class="admin-header">
      <h1>Painel Administrativo</h1>
      <button @click="handleLogout" class="logout-button">Sair</button>
    </header>
    
    <div class="admin-content">
      <p>Bem-vindo, {{ auth.currentUser?.email }}</p>
      <!-- Aqui você pode adicionar o conteúdo administrativo -->
    </div>
  </div>
</template>

<style scoped>
.admin {
  padding: 20px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.logout-button {
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c82333;
}

.admin-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>