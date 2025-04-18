<template>
  <div class="home-layout">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HomeLayout'
}
</script>

<style scoped>
.home-layout {
  min-height: 100vh;
  min-width: 100vw;
  background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}

@media (max-width: 480px) {
  .home-layout {
    padding: 20px;
  }
}
</style> 