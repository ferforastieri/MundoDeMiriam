<script setup>
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AdminDashboard from '@/components/admin/AdminDashboard.vue'

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
  <AdminLayout>
    <AdminDashboard />
  </AdminLayout>
</template>

<style scoped>
.admin-dashboard {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.dashboard-card {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.dashboard-card h3 {
  margin: 0 0 1rem 0;
  color: #1a1a1a;
  font-size: 1.2rem;
}
</style>