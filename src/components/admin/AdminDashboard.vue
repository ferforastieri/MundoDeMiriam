<script setup>
import { ref } from 'vue'

const stats = ref([
  { title: 'Total de Posts', value: '0', icon: '📝', color: '#520' },
  { title: 'Fotos na Galeria', value: '0', icon: '🖼️', color: '#520' },
  { title: 'Visualizações', value: '0', icon: '👁️', color: '#520' },
  { title: 'Interações', value: '0', icon: '❤️', color: '#520' }
])
</script>

<template>
  <div class="admin-dashboard">
    <h2>Dashboard</h2>
    <div class="dashboard-grid">
      <div v-for="stat in stats" 
           :key="stat.title" 
           class="dashboard-card"
           :style="{ '--card-color': stat.color }">
        <div class="card-icon">{{ stat.icon }}</div>
        <h3>{{ stat.title }}</h3>
        <p class="card-value">{{ stat.value }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  height: 100%;
  padding: 2rem;
}

.admin-dashboard h2 {
  font-family: 'Gilda Display', serif;
  font-size: 2rem;
  color: #520;
  margin: 0 0 2rem 0;
  font-weight: normal;
  letter-spacing: 2px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.dashboard-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.dashboard-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: var(--card-color);
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
  background: #f8f9fa;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard-card:hover .card-icon {
  transform: scale(1.1);
}

.dashboard-card h3 {
  font-family: 'Gilda Display', serif;
  margin: 0 0 1rem 0;
  color: #520;
  font-size: 1.2rem;
  letter-spacing: 1px;
}

.card-value {
  font-family: 'Gilda Display', serif;
  font-size: 2.5rem;
  font-weight: normal;
  color: #520;
  margin: 0;
  letter-spacing: 1px;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 