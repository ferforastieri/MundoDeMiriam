<script setup>
import { ref } from 'vue'

const stats = ref([
  { title: 'Total de Posts', value: '0', icon: '📝', color: '#1a1a1a' },
  { title: 'Fotos na Galeria', value: '0', icon: '🖼️', color: '#1a1a1a' },
  { title: 'Visualizações', value: '0', icon: '👁️', color: '#1a1a1a' },
  { title: 'Interações', value: '0', icon: '❤️', color: '#1a1a1a' }
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
  background-color: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  animation: slideUp 0.5s ease;
}

.admin-dashboard h2 {
  font-family: 'Gilda Display', serif;
  font-size: 2rem;
  color: #1a1a1a;
  margin: 0 0 2rem 0;
  font-weight: normal;
  letter-spacing: 2px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.dashboard-card {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.dashboard-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: var(--card-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.dashboard-card:hover::before {
  transform: scaleX(1);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.dashboard-card:hover .card-icon {
  transform: scale(1.1);
}

.dashboard-card h3 {
  font-family: 'Gilda Display', serif;
  margin: 0 0 0.5rem 0;
  color: #1a1a1a;
  font-size: 1.1rem;
  letter-spacing: 1px;
}

.card-value {
  font-family: 'Gilda Display', serif;
  font-size: 1.8rem;
  font-weight: normal;
  color: #1a1a1a;
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