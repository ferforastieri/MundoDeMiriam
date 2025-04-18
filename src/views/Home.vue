<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="home-container">
    <div class="profile-section">
      <div class="profile-image">
        <img src="" alt="Miriam Cléres Forastieri" />
        <div class="status-dot"></div>
      </div>
      
      <div class="profile-info">
        <h1>MIRIAM CLERES FORASTIERI</h1>
        <h2>MODELO PROFISSIONAL</h2>
        
        <p class="description">
          TRANSFORMO IDEIAS EM HISTÓRIAS<br>
          VISUAIS QUE CONECTAM E INSPIRAM.
        </p>
      </div>

      <nav class="navigation">
        <button class="nav-button">AMOR EM ARTE</button>
        <button class="nav-button">CUPONS DE DESCONTOS</button>
        <button class="nav-button">PORTFÓLIO MODELO</button>
        <button class="nav-button">PORTFÓLIO UGC CREATOR</button>
        <button class="nav-button">CONTATO</button>
      </nav>

      <div class="services-section">
        <h3>Cursos e serviços</h3>
        <p>Aumente o impacto da sua profissão!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  min-width: 100vw;
  background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}

.profile-section {
  max-width: 600px;
  width: 100%;
  animation: fadeIn 0.8s ease;
}

.profile-image {
  width: 180px;
  height: 180px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  position: relative;
  border: 3px solid #520;
  padding: 5px;
  background: white;
  transition: transform 0.3s ease;
}

.profile-image:hover {
  transform: scale(1.02);
}

.profile-image img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.status-dot {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 12px;
  height: 12px;
  background-color: #520;
  border-radius: 50%;
  border: 2px solid white;
}

.profile-info {
  text-align: center;
  margin-bottom: 3rem;
  animation: slideUp 0.5s ease;
}

h1 {
  font-family: 'Gilda Display', serif;
  font-size: 3rem;
  color: #520;
  margin: 0;
  font-weight: normal;
  letter-spacing: 3px;
}

h2 {
  font-family: 'Gilda Display', serif;
  font-size: 1.1rem;
  color: #666;
  margin: 1rem 0;
  font-weight: normal;
  letter-spacing: 4px;
}

.description {
  font-family: 'Gilda Display', serif;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #520;
  margin: 2rem 0;
  letter-spacing: 1.5px;
}

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

.services-section {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  text-align: left;
  animation: slideUp 0.5s ease 0.4s backwards;
  transition: transform 0.3s ease;
}

.services-section:hover {
  transform: translateY(-5px);
}

.services-section h3 {
  font-family: 'Gilda Display', serif;
  font-size: 1.8rem;
  color: #520;
  margin: 0;
  font-weight: normal;
  letter-spacing: 1.5px;
}

.services-section p {
  font-family: 'Gilda Display', serif;
  color: #666;
  margin: 12px 0 0;
  font-style: italic;
  letter-spacing: 1px;
  font-size: 1.1rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
  .home-container {
    padding: 20px;
  }

  h1 {
    font-size: 2rem;
  }

  .profile-image {
    width: 150px;
    height: 150px;
  }

  .nav-button {
    padding: 14px;
    font-size: 13px;
  }
}
</style> 