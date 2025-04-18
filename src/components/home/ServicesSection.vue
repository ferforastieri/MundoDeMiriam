<template>
  <div class="services-section">
    <div class="services-content">
      <div class="text-content">
        <h2 class="title">Cursos e serviços</h2>
        <p class="subtitle">Aumente o impacto da sua profissão!</p>
        <a href="#" class="cta-button">CLIQUE AQUI</a>
      </div>
      <div class="image-content">
        <img src="../../assets/profile/fundo-cursos.jpg" alt="Miriam Cléres - Cursos e Serviços" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServicesSection'
}
</script>

<style scoped>
.services-section {
  width: 100%;
  margin: 2rem 0;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  transition: transform 0.3s ease;
}

.services-section:hover {
  transform: translateY(-5px);
}

.services-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.text-content {
  flex: 1;
}

.image-content {
  width: 180px;
  height: 180px;
  border-radius: 16px;
  overflow: hidden;
  border: 3px solid #520;
  padding: 3px;
  background: white;
}

.image-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.title {
  font-family: 'Gilda Display', serif;
  font-size: 2rem;
  color: #520;
  margin: 0;
  font-weight: normal;
  letter-spacing: 2px;
}

.subtitle {
  font-family: 'Gilda Display', serif;
  font-size: 1.2rem;
  color: #666;
  margin: 1rem 0 2rem;
  font-style: italic;
  letter-spacing: 1.5px;
}

.cta-button {
  display: inline-block;
  width: 100%;
  max-width: 250px;
  padding: 14px;
  border: 2px solid #520;
  border-radius: 8px;
  background-color: transparent;
  color: #520;
  text-decoration: none;
  font-family: 'Gilda Display', serif;
  font-size: 15px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.cta-button:hover {
  background-color: #520;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 480px) {
  .services-section {
    padding: 1.5rem;
  }

  .services-content {
    flex-direction: column-reverse;
    gap: 1.5rem;
    text-align: center;
  }

  .image-content {
    width: 150px;
    height: 150px;
    margin: 0 auto;
  }

  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1rem;
    margin: 0.8rem 0 1.5rem;
  }

  .cta-button {
    max-width: 220px;
    padding: 12px;
    font-size: 13px;
  }
}
</style> 