class TranslationService {
  constructor() {
    this.cache = new Map()
    this.baseLanguage = 'pt' // Idioma base do site
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
      // Tenta múltiplas APIs gratuitas
      const translatedText = await this.translateWithMultipleAPIs(text)
      
      // Salva no cache
      this.cache.set(text, translatedText)
      
      return translatedText
    } catch (error) {
      console.warn('Erro na tradução:', error.message)
    }

    // Se falhar, retorna o texto original
    return text
  }

  // Tenta traduzir com múltiplas APIs gratuitas
  async translateWithMultipleAPIs(text) {
    // Lista de APIs gratuitas para tentar
    const apis = [
      () => this.translateWithGoogleTranslateProxy(text),
      () => this.translateWithLibreTranslate(text),
      () => this.translateWithSimpleDict(text)
    ]

    // Tenta cada API até uma funcionar
    for (const api of apis) {
      try {
        const result = await api()
        if (result && result !== text) {
          return result
        }
      } catch (error) {
        console.warn('API falhou, tentando próxima:', error.message)
        continue
      }
    }

    // Se todas falharem, retorna o texto original
    return text
  }

  // Google Translate via proxy (sem CORS)
  async translateWithGoogleTranslateProxy(text) {
    const proxyUrl = 'https://api.allorigins.win/raw?url='
    const translateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${this.baseLanguage}&tl=${this.currentLanguage}&dt=t&q=${encodeURIComponent(text)}`
    
    const response = await fetch(proxyUrl + encodeURIComponent(translateUrl))
    
    if (response.ok) {
      const data = await response.json()
      if (data && data[0] && data[0][0] && data[0][0][0]) {
        return data[0][0][0]
      }
    }
    throw new Error('Google Translate proxy failed')
  }

  // LibreTranslate (gratuito e open source)
  async translateWithLibreTranslate(text) {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: this.baseLanguage,
        target: this.currentLanguage,
        format: 'text'
      })
    })

    if (response.ok) {
      const data = await response.json()
      return data.translatedText
    }
    throw new Error('LibreTranslate failed')
  }



  // Dicionário simples como fallback
  async translateWithSimpleDict(text) {
    const translations = {
      'en': {
        'SOBRE MIM': 'ABOUT ME',
        'MAQUIAGEM ARTISTICA': 'ARTISTIC MAKEUP',
        'MAQUIAGEM BEAUTY': 'BEAUTY MAKEUP',
        'FOTOGRAFIA E-COMMERCE': 'E-COMMERCE PHOTOGRAPHY',
        'PARCERIAS': 'PARTNERSHIPS',
        'Voltar': 'Back',
        'Sobre Mim': 'About Me',
        'Conheça minha história e paixão pela arte da maquiagem': 'Learn about my story and passion for makeup art',
        'Maquiadora Profissional & Fotógrafa': 'Professional Makeup Artist & Photographer',
        'Especialidades': 'Specialties',
        'Entre em Contato': 'Get in Touch',
        'Fale Comigo': 'Contact Me',
        'WhatsApp: (15) 92002-9139': 'WhatsApp: (15) 92002-9139'
      },
      'es': {
        'SOBRE MIM': 'SOBRE MÍ',
        'MAQUIAGEM ARTISTICA': 'MAQUILLAJE ARTÍSTICO',
        'MAQUIAGEM BEAUTY': 'MAQUILLAJE BELLEZA',
        'FOTOGRAFIA E-COMMERCE': 'FOTOGRAFÍA E-COMMERCE',
        'PARCERIAS': 'ASOCIACIONES',
        'Voltar': 'Volver',
        'Sobre Mim': 'Sobre Mí',
        'Conheça minha história e paixão pela arte da maquiagem': 'Conoce mi historia y pasión por el arte del maquillaje',
        'Maquiadora Profissional & Fotógrafa': 'Maquilladora Profesional y Fotógrafa',
        'Especialidades': 'Especialidades',
        'Entre em Contato': 'Ponte en Contacto',
        'Fale Comigo': 'Háblame',
        'WhatsApp: (15) 92002-9139': 'WhatsApp: (15) 92002-9139'
      },
      'fr': {
        'SOBRE MIM': 'À PROPOS DE MOI',
        'MAQUIAGEM ARTISTICA': 'MAQUILLAGE ARTISTIQUE',
        'MAQUIAGEM BEAUTY': 'MAQUILLAGE BEAUTÉ',
        'FOTOGRAFIA E-COMMERCE': 'PHOTOGRAPHIE E-COMMERCE',
        'PARCERIAS': 'PARTENARIATS',
        'Voltar': 'Retour',
        'Sobre Mim': 'À Propos de Moi',
        'Conheça minha história e paixão pela arte da maquiagem': 'Découvrez mon histoire et ma passion pour l\'art du maquillage',
        'Maquiadora Profissional & Fotógrafa': 'Maquilleuse Professionnelle et Photographe',
        'Especialidades': 'Spécialités',
        'Entre em Contato': 'Contactez-moi',
        'Fale Comigo': 'Parlez-moi',
        'WhatsApp: (15) 92002-9139': 'WhatsApp: (15) 92002-9139'
      }
    }

    const langTranslations = translations[this.currentLanguage]
    if (langTranslations && langTranslations[text]) {
      return langTranslations[text]
    }
    
    // Se não encontrar no dicionário, retorna o texto original
    return text
  }

  // Fallback simples - retorna o texto original se todas as APIs falharem
  simpleTranslate(text) {
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
