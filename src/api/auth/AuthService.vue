<script setup>
import { ref } from 'vue'
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth'

const auth = getAuth()
const user = ref(null)
const error = ref(null)
const loading = ref(false)

// Login com email/senha
const loginWithEmail = async (email, password) => {
  loading.value = true
  error.value = null
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
    user.value = response.user
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// Registro com email/senha
const registerWithEmail = async (email, password) => {
  loading.value = true
  error.value = null
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    user.value = response.user
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// Login com Google
const loginWithGoogle = async () => {
  loading.value = true
  error.value = null
  try {
    const provider = new GoogleAuthProvider()
    const response = await signInWithPopup(auth, provider)
    user.value = response.user
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// Logout
const logout = async () => {
  loading.value = true
  error.value = null
  try {
    await signOut(auth)
    user.value = null
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// Observador de estado de autenticação
auth.onAuthStateChanged((userData) => {
  user.value = userData
})

// Exportando as funcionalidades
defineExpose({
  user,
  error,
  loading,
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  logout
})
</script> 