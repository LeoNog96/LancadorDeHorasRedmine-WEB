<template>
  <div class ="initial-page">
    <md-empty-state
      class="md-primary"
      md-icon="schedule"
      md-label="Lançador de horas"
      md-description="Sistema para lançamento de horas.">
    </md-empty-state>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>

  .md-empty-state {
    display: inline-block;
    vertical-align: middle;
    
    + .md-empty-state {
      margin-left: 16px;
    }
  }
</style>