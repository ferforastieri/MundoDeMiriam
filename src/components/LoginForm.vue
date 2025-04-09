<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '../api/auth/AuthService.vue'

const router = useRouter()
const authService = ref(null)
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const focusedInput = ref(null)

const handleLogin = async () => {
  try {
    if (!authService.value) {
      error.value = 'Serviço de autenticação não inicializado'
      return
    }

    loading.value = true
    error.value = ''
    await authService.value.loginWithEmail(email.value, password.value)
    
    if (authService.value.user) {
      console.log('Login bem sucedido')
      router.push('/admin')
    } else if (authService.value.error) {
      error.value = authService.value.error
    }
  } catch (e) {
    error.value = e.message || 'Erro ao fazer login'
    console.error('Erro de login:', e)
  } finally {
    loading.value = false
  }
}

const handleLogout = async () => {
  await authService.value.logout()
}

const setFocus = (inputName) => {
  focusedInput.value = inputName
}

const clearFocus = () => {
  focusedInput.value = null
}
</script>

<template>
  <div class="login-container">
    <AuthService ref="authService" />
    
    <div class="login-form">
      <div class="form-header">
        <h2>Área Administrativa</h2>
        <p class="subtitle">Portfólio & Conteúdo</p>
      </div>
      
      <div v-if="error" class="error-message">
        <span class="error-icon">!</span>
        {{ error }}
      </div>
      
      <form @submit.prevent="handleLogin">
        <div 
          class="form-group"
          :class="{ 'focused': focusedInput === 'email', 'filled': email }"
        >
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required
            :disabled="loading"
            @focus="setFocus('email')"
            @blur="clearFocus"
          />
          <label for="email">Email</label>
          <div class="input-line"></div>
        </div>
        
        <div 
          class="form-group"
          :class="{ 'focused': focusedInput === 'password', 'filled': password }"
        >
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required
            :disabled="loading"
            @focus="setFocus('password')"
            @blur="clearFocus"
          />
          <label for="password">Senha</label>
          <div class="input-line"></div>
        </div>
        
        <button 
          type="submit" 
          :disabled="loading"
          :class="{ 'loading': loading }"
        >
          <span class="button-text">{{ loading ? 'Entrando...' : 'Entrar' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Reset básico para garantir que não há margens indesejadas */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
  margin: 0;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}

.login-form {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transform: translateY(0);
  transition: all 0.3s ease;
  animation: slideUp 0.5s ease;
}

.login-form:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

h2 {
  font-family: 'Gilda Display', serif;
  text-align: center;
  margin-bottom: 20px;
  color: #1a1a1a;
  font-size: 28px;
  letter-spacing: 1px;
}

.subtitle {
  font-family: 'Gilda Display', serif;
  color: #666;
  margin-top: 8px;
  font-size: 16px;
  letter-spacing: 2px;
}

.error-message {
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  animation: fadeIn 0.3s ease;
}

.error-icon {
  background-color: #dc3545;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-weight: bold;
  font-size: 12px;
}

.form-group {
  position: relative;
  margin-bottom: 24px;
}

.form-group input {
  width: 100%;
  padding: 12px 0;
  font-size: 16px;
  border: none;
  outline: none;
  background: transparent;
  transition: all 0.3s ease;
}

.form-group label {
  font-family: 'Gilda Display', serif;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 16px;
  transition: all 0.3s ease;
  pointer-events: none;
  letter-spacing: 0.5px;
}

.input-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #ddd;
  transition: all 0.3s ease;
}

.form-group.focused label,
.form-group.filled label {
  top: -10px;
  font-size: 12px;
  color: #1a1a1a;
}

.form-group.focused .input-line {
  height: 2px;
  background-color: #1a1a1a;
}

button {
  font-family: 'Gilda Display', serif;
  width: 100%;
  padding: 16px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  background-color: #1a1a1a;
  color: white;
  font-size: 16px;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

button:hover:not(:disabled) {
  background-color: #333;
  transform: translateY(-2px);
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button.loading {
  background-color: #1a1a1a;
}

button.loading .button-text {
  animation: pulse 1.5s ease infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
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
  .login-form {
    padding: 30px 20px;
  }
}
</style> 