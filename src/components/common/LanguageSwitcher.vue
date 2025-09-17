<template>
  <div class="language-switcher">
    <select 
      v-model="selectedLanguage" 
      @change="changeLanguage"
      class="language-select"
    >
      <option 
        v-for="lang in supportedLanguages" 
        :key="lang.code" 
        :value="lang.code"
      >
        {{ lang.flag }} {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import translationService from '../../api/translation/TranslationService.js'

const selectedLanguage = ref('pt')
const supportedLanguages = ref([])

// Carrega idiomas suportados
onMounted(() => {
  supportedLanguages.value = translationService.getSupportedLanguages()
  selectedLanguage.value = translationService.getCurrentLanguage()
})

// Função para mudar idioma
const changeLanguage = () => {
  // Marca como escolha manual do usuário
  translationService.setLanguage(selectedLanguage.value, true)
  
  // Não precisa recarregar a página - os componentes reagem automaticamente
}
</script>

<style scoped>
.language-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.language-select {
  font-family: 'Gilda Display', serif;
  padding: 8px 12px;
  border: 2px solid #520;
  border-radius: 8px;
  background-color: white;
  color: #520;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.language-select:hover {
  background-color: #520;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.language-select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(82, 0, 0, 0.2);
}

@media (max-width: 480px) {
  .language-switcher {
    top: 10px;
    right: 10px;
  }
  
  .language-select {
    padding: 6px 10px;
    font-size: 12px;
  }
}
</style>
