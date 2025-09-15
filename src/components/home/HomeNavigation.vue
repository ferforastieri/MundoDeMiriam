<template>
  <nav class="navigation">
    <CustomButton variant="outline" size="medium" full-width>
      <TranslatableText text="MAQUIAGEM ARTISTICA" />
    </CustomButton>
    <CustomButton variant="outline" size="medium" full-width>
      <TranslatableText text="MAQUIAGEM BEAUTY" />
    </CustomButton>
    <CustomButton variant="outline" size="medium" full-width>
      <TranslatableText text="FOTOGRAFIA E-COMMERCE" />
    </CustomButton>
    <CustomButton variant="outline" size="medium" full-width>
      <TranslatableText text="PARCERIAS" />
    </CustomButton>
    <CustomButton variant="outline" size="medium" full-width>
      <TranslatableText text="CONTATO" />
    </CustomButton>
  </nav>
</template>

<script>
import { TranslatableText, CustomButton } from '../common'

export default {
  name: 'HomeNavigation',
  components: {
    TranslatableText,
    CustomButton
  }
}
</script>

<style scoped>
.navigation {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 3rem;
  animation: slideUp 0.5s ease 0.2s backwards;
}

/* Estilos removidos - agora usando CustomButton */

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

/* Responsividade agora gerenciada pelo CustomButton */
</style> 