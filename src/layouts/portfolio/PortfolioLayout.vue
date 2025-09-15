<template>
  <div class="portfolio-layout">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PortfolioLayout'
}
</script>

<style scoped>
.portfolio-layout {
  min-height: 100vh;
  min-width: 100vw;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  display: flex;
  justify-content: center;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}

@media (max-width: 480px) {
  .portfolio-layout {
    padding: 10px;
  }
}
</style>
