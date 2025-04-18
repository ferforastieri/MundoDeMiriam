<template>
  <div class="login-layout">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LoginLayout'
}
</script>

<style scoped>
.login-layout {
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
</style> 