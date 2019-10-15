<template>
  <div class="stop-wacth-dialog">
    <md-dialog :md-active.sync="showDialog"  
        :md-click-outside-to-close="false"
        :md-close-on-esc="false"
        class=" md-layout-item  md-small-size-100">
      <md-dialog-title>Cronometro</md-dialog-title>
      <md-dialog-content>
        <StopWatchCard v-bind:item="item" @close-stopwatch-card="close"></StopWatchCard>
      </md-dialog-content>
        
    </md-dialog>
  </div>
  
</template>

<script>
import StopWatchCard from './StopWatchCard'

export default {
  props: {
    showDialog: Boolean,
    item: Object, 
  },
  components:{
    StopWatchCard,
  },
  methods:{
    close(item){
      this.showDialog = false;

      this.$emit('close-stopwatch-dialog',{showDialog: this.showDialog, item:item})
    }
  },
}
</script>

<style lang="scss" scoped>

</style>