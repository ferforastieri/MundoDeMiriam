<template>
  <span v-if="!loading">{{ translatedText }}</span>
  <span v-else class="loading-text">{{ originalText }}</span>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import translationService from '../../api/translation/TranslationService.js'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: 'span'
  }
})

const originalText = ref(props.text)
const translatedText = ref(props.text)
const loading = ref(false)

// Função para traduzir o texto
const translateText = async () => {
  if (!props.text) return
  
  loading.value = true
  
  try {
    const translated = await translationService.translateText(props.text)
    translatedText.value = translated
  } catch (error) {
    console.warn('Erro ao traduzir:', error)
    translatedText.value = props.text
  } finally {
    loading.value = false
  }
}

// Traduz quando o componente é montado
onMounted(() => {
  translateText()
})

// Traduz quando o texto muda
watch(() => props.text, () => {
  originalText.value = props.text
  translatedText.value = props.text
  translateText()
})

// Escuta mudanças de idioma em tempo real
let handleLanguageChange

onMounted(() => {

  handleLanguageChange = () => {
    console.log('Language changed, retranslating:', props.text)
    translateText()
  }
  
  window.addEventListener('languageChanged', handleLanguageChange)
})

onUnmounted(() => {
  if (handleLanguageChange) {
    window.removeEventListener('languageChanged', handleLanguageChange)
  }
})
</script>

<style scoped>
.loading-text {
  opacity: 0.7;
  position: relative;
}

.loading-text::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  background-color: #520;
  border-radius: 50%;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}
</style>
