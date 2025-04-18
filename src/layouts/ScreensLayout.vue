<script setup>
import AdminLayout from './AdminLayout.vue';
</script>

<template>
  <AdminLayout>
    <div class="screens-page">
      <div class="page-header">
        <h1>Gerenciamento de Telas</h1>
        <p>Gerencie as telas que serão exibidas no portfólio</p>
      </div>
      <div class="content-section">
        <slot></slot>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.screens-page {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  color: #520;
  margin-bottom: 0.5rem;
  font-family: 'Gilda Display', serif;
  font-size: 2rem;
  letter-spacing: 1px;
}

.page-header p {
  color: #6c757d;
  font-size: 1.1rem;
}

.content-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style> 