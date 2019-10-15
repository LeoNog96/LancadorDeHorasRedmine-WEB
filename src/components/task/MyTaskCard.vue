<template>
  <div class="my-task-card">
    <md-card class="md-layout-item  md-small-size-100">
			<md-card-header>
				<div class="md-layout md-gutter">
					<div class="md-layout-item md-small-size-50">
						<div class="md-title">Tarefa</div>
					</div>
					<md-icon class="md-size-2x" id="done" v-if="item.register">done</md-icon>
				</div>	
			</md-card-header>
			<md-card-content>
				<div class="md-layout md-gutter">
					<div class="md-layout-item md-small-size-100">
						<md-field>
							<label for="id">Id</label>
							<md-input name="id" id="id" v-model="item.id" readonly/>
						</md-field>
					</div>
					<div class="md-layout-item md-small-size-100">
						<md-field>
							<label for="subject">Titulo</label>
							<md-input name="subject" id="subject" v-model="item.subject" readonly/>
							<md-tooltip>{{item.subject}}</md-tooltip>
						</md-field>
					</div>
					<div class="md-layout-item md-small-size-100">
						<md-field>
							<label for="project">Projeto</label>
							<md-input name="project" id="project" v-model="item.project.name" readonly/>
							<md-tooltip>{{item.project.name}}</md-tooltip>
						</md-field>
					</div>		
          <div class="md-layout-item md-small-size-100">
						<md-field>
							<label for="status">Status</label>
							<md-input name="status" id="status" v-model="item.status.name" readonly/>
							<md-tooltip>{{item.status.name}}</md-tooltip>
						</md-field>
					</div>
					<div class="md-layout-item md-small-size-100">
						<h1 v-html="aCounter"></h1>						
					</div>		
				</div>
			</md-card-content>
			<md-card-actions>
				<md-button v-if="!item.register" @click="showTaskDialog = true">
					<md-icon>timer</md-icon>
					<md-tooltip>Abrir cronometro</md-tooltip>
				</md-button>
				<md-button v-if="!item.register" @click="showTimeRecordingDialog = true">
					<md-icon>schedule</md-icon>
					<md-tooltip>Lançar horas</md-tooltip>
				</md-button>
			</md-card-actions>
		</md-card>
		<StopWatchDialog @close-stopwatch-dialog="taskDialogManeger" v-bind:showDialog="showTaskDialog" v-bind:item="item" ></StopWatchDialog>
		<time-recording-dialog @close-time-recording-dialog="timeRecordingDialogManeger" v-bind:stopWatch="true" v-bind:showDialog="showTimeRecordingDialog" v-bind:item="item"></time-recording-dialog>
		<md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbarOk" md-persistent>
      <span>Erro ao atualizar tarefa!</span>
      <md-button class="md-primary" @click="showSnackbarOk = false">Ok</md-button>
    </md-snackbar>
	</div>
</template>

<script>
import StopWatchDialog from '../time/StopWatchDialog'
import TimeRecordingDialog from '../time/TimeRecordingDialog'
import config from '../../config/config'

export default {
  props:{
		item: Object,
	},
	components:{
		StopWatchDialog,
		TimeRecordingDialog,
	},
	data: () =>({
		showTaskDialog: false,
		showTimeRecordingDialog: false,
		counter: null,
		showSnackbarOk: false,
	}),
	computed: {
		aCounter () {

			this.counter = this.item.hours.hour + ':' + this.item.hours.minute + ':' + this.item.hours.second
	
			return this.counter
		}
	},
	methods:{
		taskDialogManeger(item){			
			this.showTaskDialog = item.showDialog;
			
			this.save(item.item);
		},
		timeRecordingDialogManeger(shTimeRecordingDialog){
			this.showTimeRecordingDialog = shTimeRecordingDialog;
		},
		save(item){
			this.item = item;
			
			var status = 0;
			
			this.$http.put(config.webApi+this.item.id, this.item, this.options)
								.then(response => (status = response.status))
								.finally(() => {
									this.showSnackbarOk = (status != 204);
								});
		}
	},
}
</script>

<style lang="scss" scoped>
	.md-card {
		margin: 5px;
		display: inline-block;
		vertical-align: top;
		flex-direction: row;
		justify-content: space-between;
	}
	div{
		text-align: center;
	}
	#done{
		color: green;
		margin-right: 2%;
	}
</style>