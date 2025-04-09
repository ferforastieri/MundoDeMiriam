<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="home">
    <div class="profile-container">
      <div class="profile-image">
        <!-- Substitua o src pela URL da imagem real -->
        <img src="" alt="Jéssica Alice" />
      </div>
      
      <h1>MIRIAM CLERES FORASTIERI</h1>
      <h2>MODELO PROFISSIONAL</h2>
      
      <p class="description">
        TRANSFORMO IDEIAS EM HISTÓRIAS<br>
        VISUAIS QUE CONECTAM E INSPIRAM.
      </p>

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
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  text-align: center;
  background-color: #f5f5f5;
}

.profile-container {
  max-width: 600px;
  width: 100%;
}

.profile-image {
  width: 200px;
  height: 200px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #40E0D0;
  position: relative;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-image::after {
  content: '';
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  background-color: #40E0D0;
  border-radius: 50%;
}

h1 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: bold;
}

h2 {
  font-size: 1.2rem;
  color: #666;
  margin: 0.5rem 0 2rem;
}

.description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  font-weight: 500;
}

.navigation {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
}

.nav-button {
  padding: 1rem;
  border: none;
  border-radius: 25px;
  background-color: #e0e0e0;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  font-size: 1rem;
}

.nav-button:hover {
  background-color: #d0d0d0;
}

.services-section {
  text-align: left;
  padding: 2rem;
  background-color: #e0e0e0;
  border-radius: 15px;
}

.services-section h3 {
  color: #4a4a4a;
  font-size: 1.5rem;
  margin: 0;
  font-weight: bold;
}

.services-section p {
  color: #666;
  margin: 0.5rem 0 0;
  font-style: italic;
}
</style> 