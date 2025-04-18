<template>
  <nav class="navigation">
    <button class="nav-button">MAQUIAGEM ARTISTICA</button>
    <button class="nav-button">MAQUIAGEM BEAUTY</button>
    <button class="nav-button">FOTOGRAFIA E-COMMERCE</button>
    <button class="nav-button">PARCERIAS</button>
    <button class="nav-button">CONTATO</button>
  </nav>
</template>

<script>
export default {
  name: 'HomeNavigation'
}
</script>

<style scoped>
.navigation {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 3rem;
  animation: slideUp 0.5s ease 0.2s backwards;
}

.nav-button {
  font-family: 'Gilda Display', serif;
  padding: 16px;
  border: 2px solid #520;
  border-radius: 8px;
  background-color: transparent;
  color: #520;
  font-size: 15px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-button:hover {
  background-color: #520;
  color: white;
  transform: translateY(-2px);
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

@media (max-width: 480px) {
  .nav-button {
    padding: 14px;
    font-size: 13px;
  }
}
</style> 