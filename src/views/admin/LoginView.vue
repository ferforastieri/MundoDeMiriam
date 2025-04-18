<template>
  <LoginLayout>
    <LoginForm />
  </LoginLayout>
</template>

<script>
import LoginLayout from '@/layouts/LoginLayout.vue'
import LoginForm from '@/components/admin/LoginForm.vue'

export default {
  name: 'LoginView',
  components: {
    LoginLayout,
    LoginForm
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.login-content {
  width: 100%;
  max-width: 500px;
  text-align: center;
}

h1 {
  color: #520;
  margin-bottom: 2rem;
  font-family: 'Gilda Display', serif;
}
</style> 