import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth'

class AuthService {
  constructor() {
    this.user = null
    this.error = null
    this.loading = false
    this.auth = null
    
    // Inicializa o auth quando necessário
    this.initializeAuth()
  }

  initializeAuth() {
    try {
      this.auth = getAuth()
      
      // Observador de estado de autenticação
      this.auth.onAuthStateChanged((userData) => {
        this.user = userData
      })
    } catch (error) {
      console.error('Erro ao inicializar Auth:', error)
      this.error = 'Erro ao inicializar autenticação'
    }
  }

  // Login com email/senha
  async loginWithEmail(email, password) {
    if (!this.auth) {
      this.error = "Serviço de autenticação não inicializado"
      throw new Error("Serviço de autenticação não inicializado")
    }

    this.loading = true
    this.error = null
    try {
      const response = await signInWithEmailAndPassword(this.auth, email, password)
      this.user = response.user
      return response.user
    } catch (e) {
      this.error = "Senha ou email incorretos"
      throw e
    } finally {
      this.loading = false
    }
  }

  // Registro com email/senha
  async registerWithEmail(email, password) {
    this.loading = true
    this.error = null
    try {
      const response = await createUserWithEmailAndPassword(this.auth, email, password)
      this.user = response.user
      return response.user
    } catch (e) {
      this.error = "Erro ao criar usuário"
      throw e
    } finally {
      this.loading = false
    }
  }

  // Login com Google
  async loginWithGoogle() {
    this.loading = true
    this.error = null
    try {
      const provider = new GoogleAuthProvider()
      const response = await signInWithPopup(this.auth, provider)
      this.user = response.user
      return response.user
    } catch (e) {
      this.error = e.message
      throw e
    } finally {
      this.loading = false
    }
  }

  // Logout
  async logout() {
    this.loading = true
    this.error = null
    try {
      await signOut(this.auth)
      this.user = null
    } catch (e) {
      this.error = "Erro ao fazer logout"
      throw e
    } finally {
      this.loading = false
    }
  }

  // Getters
  getCurrentUser() {
    return this.user
  }

  getError() {
    return this.error
  }

  isLoading() {
    return this.loading
  }

  // Verifica se está autenticado
  isAuthenticated() {
    return !!this.user
  }
}

// Instância singleton
const authService = new AuthService()

export default authService
