<template>
  <div class="curriculum-profile">
    <!-- Header Section -->
    <div class="curriculum-header">
      <button @click="goBack" class="back-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        <span><TranslatableText text="Voltar" /></span>
      </button>
      
      <div class="header-content">
        <h1 class="curriculum-title">
          <TranslatableText text="Currículo" />
        </h1>
        <button @click="downloadPDF" class="download-button" ref="downloadBtn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          <span><TranslatableText text="Baixar PDF" /></span>
        </button>
      </div>
    </div>

    <!-- Curriculum Content -->
    <div class="curriculum-content" ref="curriculumContent">
      <!-- Profile Section -->
      <div class="profile-section">
        <div class="profile-info">
          <h2 class="name">Miriam</h2>
          <p class="title">Maquiadora Profissional & Fotógrafa</p>
          <p class="website">
            <a href="https://mundodemiriam.vercel.app/" target="_blank" rel="noopener noreferrer" class="portfolio-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
              </svg>
              Meu Portfolio
            </a>
          </p>
          <p class="location">Belo Horizonte, Minas Gerais</p>
        </div>
        <div class="profile-image">
          <img src="/assets/profile/fotodalinda.jpg" alt="Miriam - Maquiadora" />
        </div>
      </div>

      <!-- About Section -->
      <div class="section">
        <h3 class="section-title">Sobre</h3>
        <div class="section-content">
          <p>
            Profissional com experiência em vendas, atendimento ao cliente e operações de loja, incluindo caixa e estoque. Habilidade em comunicação, organização e trabalho em equipe. Também possui experiência como maquiadora e fotógrafa, com conhecimento em marketing para redes sociais.
          </p>
          <p>
            Formação acadêmica inclui Ensino Médio completo e cursos técnicos em Aviação Civil e Fotografia & Marketing para redes sociais. Motivada, proativa e com facilidade para aprender e se adaptar a diferentes ambientes de trabalho.
          </p>
        </div>
      </div>

      <!-- Skills Section -->
      <div class="section">
        <h3 class="section-title">Habilidades</h3>
        <div class="skills-content">
          <div class="skill-category">
            <h4>Atendimento e Vendas</h4>
            <ul>
              <li>Atendimento ao Cliente</li>
              <li>Operação de Caixa</li>
              <li>Organização de Loja</li>
              <li>Comunicação</li>
              <li>Relacionamento com o Cliente</li>
            </ul>
          </div>
          <div class="skill-category">
            <h4>Arte e Fotografia</h4>
            <ul>
              <li>Maquiagem</li>
              <li>Fotografia Profissional</li>
              <li>Marketing para Redes Sociais</li>
              <li>Produção de Imagem</li>
            </ul>
          </div>
          <div class="skill-category">
            <h4>Operações</h4>
            <ul>
              <li>Controle de Estoque</li>
              <li>Operação de Loja</li>
              <li>Vendas</li>
              <li>Experiência em Shopping</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Education Section -->
      <div class="section">
        <h3 class="section-title">Educação</h3>
        <div class="education-content">
          <div class="education-item">
            <div class="education-header">
              <h4>Ensino Médio Completo</h4>
              <span class="period">01/2015 - 12/2018</span>
            </div>
            <p class="location">Belo Horizonte, Minas Gerais</p>
          </div>
          <div class="education-item">
            <div class="education-header">
              <h4>Curso Fotografia e Marketing para Redes Sociais</h4>
              <span class="period">01/2018 - 12/2019</span>
            </div>
            <p class="location">Belo Horizonte, Minas Gerais</p>
          </div>
          <div class="education-item">
            <div class="education-header">
              <h4>Curso Aviação Civil - Comissário de Bordo</h4>
              <span class="period">01/2020 - 12/2021</span>
            </div>
            <p class="location">Belo Horizonte, Minas Gerais</p>
          </div>
        </div>
      </div>

      <!-- Experience Section -->
      <div class="section">
        <h3 class="section-title">Experiência</h3>
        <div class="experience-content">
          <div class="experience-item">
            <div class="experience-header">
              <h4>Caixa e Operadora de Loja</h4>
              <span class="period">01/2024 - 12/2024</span>
            </div>
            <p class="company">Shopping Partage Estripulia</p>
            <p class="location">Belo Horizonte, Minas Gerais</p>
            <ul class="responsibilities">
              <li>Atuação no setor de varejo, auxiliando clientes no processo de compra e garantindo um atendimento eficiente.</li>
              <li>Responsável pela operação de caixa, controle de estoque e organização da loja.</li>
              <li>Desenvolvimento de habilidades em vendas, atendimento ao público e gestão de produtos.</li>
            </ul>
          </div>
          <div class="experience-item">
            <div class="experience-header">
              <h4>Cabeleireira e Maquiadora</h4>
              <span class="period">01/2020 - 12/2023</span>
            </div>
            <p class="company">Salão de beleza</p>
            <p class="location">Belo Horizonte, Minas Gerais</p>
            <ul class="responsibilities">
              <li>Atuação como maquiadora profissional, oferecendo serviços personalizados para eventos e ensaios fotográficos.</li>
              <li>Responsável pela captação e edição de imagens, promovendo a marca por meio de estratégias de marketing para redes sociais.</li>
              <li>Desenvolvimento de técnicas de maquiagem, fotografia profissional e branding digital.</li>
            </ul>
          </div>
          <div class="experience-item">
            <div class="experience-header">
              <h4>Atendente</h4>
              <span class="period">01/2020 - 12/2021</span>
            </div>
            <p class="company">Jadore Semijoias</p>
            <p class="location">Belo Horizonte, Minas Gerais</p>
            <ul class="responsibilities">
              <li>Atuação no setor de vendas, auxiliando clientes na escolha de produtos e garantindo um atendimento de qualidade.</li>
              <li>Responsável pela operação de caixa, controle de pagamentos e organização do ambiente de trabalho para melhor experiência do cliente.</li>
              <li>Desenvolvimento de habilidades de comunicação, negociação e fidelização de clientes.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { TranslatableText } from '../common'
import html2pdf from 'html2pdf.js'

export default {
  name: 'CurriculumProfile',
  components: {
    TranslatableText
  },
  setup() {
    const router = useRouter()
    const curriculumContent = ref(null)
    const downloadBtn = ref(null)
    
    const goBack = () => {
      router.push('/about')
    }

    const downloadPDF = async () => {
      try {
        // Mostrar loading no botão
        const originalText = downloadBtn.value.innerHTML
        downloadBtn.value.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="animate-spin">
            <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.364-6.364l-2.828 2.828M7.464 16.536l-2.828 2.828m12.728-12.728l-2.828-2.828M7.464 7.464L4.636 4.636"/>
          </svg>
          <span>Gerando PDF...</span>
        `
        downloadBtn.value.disabled = true

        // Configurações do PDF
        const opt = {
          margin: [0.2, 0.3, 0.2, 0.3],
          filename: 'curriculo-miriam.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2,
            useCORS: true,
            allowTaint: true,
            scrollX: 0,
            scrollY: 0
          },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        }

        // Aplicar estilos específicos para o PDF
        curriculumContent.value.classList.add('pdf-export')
        
        // Gerar PDF mantendo os links clicáveis
        await html2pdf().set(opt).from(curriculumContent.value).save()
        
        // Remover classe após exportação
        curriculumContent.value.classList.remove('pdf-export')

        // Restaurar botão
        downloadBtn.value.innerHTML = originalText
        downloadBtn.value.disabled = false

      } catch (error) {
        console.error('Erro ao gerar PDF:', error)
        downloadBtn.value.innerHTML = originalText
        downloadBtn.value.disabled = false
        alert('Erro ao gerar PDF. Tente novamente.')
      }
    }
    
    return {
      goBack,
      downloadPDF,
      curriculumContent,
      downloadBtn
    }
  }
}
</script>

<style scoped>
.curriculum-profile {
  max-width: 100%;
  width: 100%;
  animation: fadeIn 0.8s ease;
}

.curriculum-header {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f9fa;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: #520;
  font-family: 'Gilda Display', serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #520;
  color: white;
  transform: translateY(-2px);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.curriculum-title {
  font-family: 'Gilda Display', serif;
  font-size: 2.5rem;
  color: #520;
  margin: 0;
  font-weight: normal;
  letter-spacing: 2px;
}

.download-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #520;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-family: 'Gilda Display', serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.download-button:hover {
  background: #3d0;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.download-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.curriculum-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  font-family: 'Gilda Display', serif;
  line-height: 1.6;
  color: #333;
}

.profile-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
}

.profile-info {
  flex: 1;
}

.profile-info .name {
  font-size: 2.5rem;
  color: #520;
  margin: 0 0 0.5rem 0;
  font-weight: normal;
  letter-spacing: 1px;
}

.profile-info .title {
  font-size: 1.2rem;
  color: #666;
  margin: 0 0 0.5rem 0;
  font-style: italic;
}

.profile-info .website {
  font-size: 1rem;
  color: #520;
  margin: 0 0 0.5rem 0;
}

.profile-info .website .portfolio-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #520;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  background: rgba(82, 0, 0, 0.05);
}

.profile-info .website .portfolio-link:hover {
  background: rgba(82, 0, 0, 0.1);
  transform: translateY(-1px);
}

.profile-info .location {
  font-size: 1rem;
  color: #888;
  margin: 0;
}

.profile-image {
  margin-left: 2rem;
}

.profile-image img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #520;
}

/* Estilos específicos para PDF */
.pdf-export .profile-image img {
  width: 80px !important;
  height: 80px !important;
  object-fit: cover !important;
  object-position: center !important;
  border: 3px solid #520 !important;
}

.pdf-export .curriculum-content {
  padding-top: 0.5rem !important;
  margin-top: 0 !important;
}

.pdf-export .curriculum-header {
  margin-bottom: 1rem !important;
  padding: 1rem !important;
}

.section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.8rem;
  color: #520;
  margin: 0 0 1rem 0;
  font-weight: normal;
  letter-spacing: 1px;
  border-bottom: 2px solid #520;
  padding-bottom: 0.5rem;
}

.section-content p {
  margin-bottom: 1rem;
  text-align: justify;
}

.skills-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.skill-category h4 {
  font-size: 1.2rem;
  color: #520;
  margin: 0 0 0.5rem 0;
  font-weight: normal;
}

.skill-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.skill-category li {
  padding: 0.25rem 0;
  position: relative;
  padding-left: 1rem;
}

.skill-category li::before {
  content: "•";
  color: #520;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.education-content,
.experience-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.education-item,
.experience-item {
  border-left: 4px solid #520;
  padding-left: 1rem;
}

.education-header,
.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.education-header h4,
.experience-header h4 {
  font-size: 1.2rem;
  color: #520;
  margin: 0;
  font-weight: normal;
  flex: 1;
}

.period {
  font-size: 0.9rem;
  color: #666;
  background: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
}

.company {
  font-size: 1rem;
  color: #520;
  margin: 0 0 0.25rem 0;
  font-weight: 500;
}

.location {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 0.5rem 0;
}

.responsibilities {
  list-style: none;
  padding: 0;
  margin: 0;
}

.responsibilities li {
  padding: 0.25rem 0;
  position: relative;
  padding-left: 1rem;
}

.responsibilities li::before {
  content: "•";
  color: #520;
  font-weight: bold;
  position: absolute;
  left: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Responsive Design */
@media (max-width: 768px) {
  .curriculum-header {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
  
  .header-content {
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }
  
  .curriculum-title {
    font-size: 2rem;
  }
  
  .profile-section {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-image {
    margin: 1rem 0 0 0;
  }
  
  .skills-content {
    grid-template-columns: 1fr;
  }
  
  .education-header,
  .experience-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .curriculum-content {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .curriculum-title {
    font-size: 1.5rem;
  }
  
  .curriculum-content {
    padding: 1rem;
  }
  
  .back-button,
  .download-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>
