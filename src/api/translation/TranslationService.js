import axios from 'axios'

class TranslationService {
  constructor() {
    this.cache = new Map()
    this.baseLanguage = 'pt' // Idioma base do site
    this.apiUrl = 'https://api.mymemory.translated.net/get' // API gratuita
    this.userLanguagePreference = null // Preferência manual do usuário
    
    // Carrega preferência salva ou detecta idioma
    this.currentLanguage = this.loadUserPreference() || this.detectLanguage()
    
    // Escuta mudanças de idioma do navegador (apenas se não houver preferência manual)
    this.setupLanguageChangeListener()
  }

  // Carrega preferência de idioma salva no localStorage
  loadUserPreference() {
    try {
      const saved = localStorage.getItem('userLanguagePreference')
      if (saved) {
        this.userLanguagePreference = saved
        return saved
      }
    } catch (error) {
      console.warn('Erro ao carregar preferência de idioma:', error)
    }
    return null
  }

  // Salva preferência de idioma no localStorage
  saveUserPreference(langCode) {
    try {
      localStorage.setItem('userLanguagePreference', langCode)
      this.userLanguagePreference = langCode
    } catch (error) {
      console.warn('Erro ao salvar preferência de idioma:', error)
    }
  }

  // Detecta o idioma do navegador do usuário
  detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage
    const langCode = browserLang.split('-')[0]
    
    // Idiomas suportados
    const supportedLanguages = ['pt', 'en', 'es', 'fr', 'de', 'it']
    
    if (supportedLanguages.includes(langCode)) {
      return langCode
    }
    
    return 'pt' // Fallback para português
  }

  // Configura listener para mudanças de idioma
  setupLanguageChangeListener() {
    // Escuta mudanças no idioma do navegador (apenas se não houver preferência manual)
    window.addEventListener('languagechange', () => {
      // Só muda automaticamente se o usuário não definiu uma preferência manual
      if (!this.userLanguagePreference) {
        const newLanguage = this.detectLanguage()
        if (newLanguage !== this.currentLanguage) {
          this.setLanguage(newLanguage)
          // Dispara evento para notificar componentes
          window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: newLanguage }
          }))
        }
      }
    })

    // Verifica mudanças periodicamente (fallback) - apenas se não houver preferência manual
    setInterval(() => {
      if (!this.userLanguagePreference) {
        const newLanguage = this.detectLanguage()
        if (newLanguage !== this.currentLanguage) {
          this.setLanguage(newLanguage)
          window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: newLanguage }
          }))
        }
      }
    }, 5000) // Verifica a cada 5 segundos
  }

  // Verifica se o texto precisa ser traduzido
  needsTranslation(text) {
    if (!text || typeof text !== 'string') return false
    if (this.currentLanguage === this.baseLanguage) return false
    if (this.cache.has(text)) return false
    
    // Não traduz textos muito curtos
    if (text.length < 3) return false
    
    // Permite tradução de textos em maiúscula (como os botões do menu)
    return true
  }

  // Traduz um texto usando API gratuita
  async translateText(text) {
    if (!this.needsTranslation(text)) {
      return text
    }

    // Verifica cache primeiro
    if (this.cache.has(text)) {
      return this.cache.get(text)
    }

    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          q: text,
          langpair: `${this.baseLanguage}|${this.currentLanguage}`
        },
        timeout: 5000 // 5 segundos de timeout
      })

      if (response.data && response.data.responseStatus === 200) {
        const translatedText = response.data.responseData.translatedText
        
        // Salva no cache
        this.cache.set(text, translatedText)
        
        return translatedText
      }
    } catch (error) {
      console.warn('Erro na tradução:', error.message)
    }

    // Se falhar, retorna o texto original
    return text
  }

  // Traduz múltiplos textos
  async translateTexts(texts) {
    const promises = texts.map(text => this.translateText(text))
    return await Promise.all(promises)
  }

  // Muda o idioma atual
  setLanguage(langCode, isUserChoice = false) {
    this.currentLanguage = langCode
    
    // Se for uma escolha manual do usuário, salva a preferência
    if (isUserChoice) {
      this.saveUserPreference(langCode)
    }
    
    // Limpa o cache para forçar nova tradução
    this.cache.clear()
    
    // Dispara evento para notificar componentes sobre mudança de idioma
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language: langCode }
    }))
  }

  // Obtém o idioma atual
  getCurrentLanguage() {
    return this.currentLanguage
  }

  // Obtém idiomas suportados
  getSupportedLanguages() {
    return [
      { code: 'pt', name: 'Português', flag: '🇧🇷' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
      { code: 'it', name: 'Italiano', flag: '🇮🇹' }
    ]
  }

  // Limpa a preferência do usuário (volta ao comportamento automático)
  clearUserPreference() {
    try {
      localStorage.removeItem('userLanguagePreference')
      this.userLanguagePreference = null
      // Volta para detecção automática
      const newLanguage = this.detectLanguage()
      this.setLanguage(newLanguage)
    } catch (error) {
      console.warn('Erro ao limpar preferência de idioma:', error)
    }
  }
}

// Instância singleton
const translationService = new TranslationService()

export default translationService
