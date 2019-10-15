<template>
  <div class="time-recording-dialog">
    <md-dialog :md-active.sync="showDialog"  
        :md-click-outside-to-close="false"
        :md-close-on-esc="false">
      <md-dialog-title>Lançamento de Horas</md-dialog-title>
        <md-dialog-content>
         <TimeRecordingSetps v-bind:item="item" @saved-time="close"></TimeRecordingSetps>
        </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" v-on:click="close">Fechar</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import TimeRecordingSetps from './TimeRecordingSteps'

export default {
  props: {
    showDialog: Boolean,
    item: Object, 
  },
  components:{
    TimeRecordingSetps,
  },
  methods:{
    close(){
      this.showDialog = false;

      this.$emit('close-time-recording-dialog',this.showDialog)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>