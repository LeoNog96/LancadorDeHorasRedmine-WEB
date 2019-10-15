<template>
	<div class="task-card">
		<md-card class="md-layout-item  md-small-size-100">
			<md-card-header>
				<div class="md-title">Tarefa</div>
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
							<label for="tracker">Tipo</label>
							<md-input name="tracker" id="tracker" v-model="item.tracker.name" readonly/>
						</md-field>
					</div>
					<div class="md-layout-item md-small-size-100">
						<md-field>
							<label for="status">Status</label>
							<md-input name="status" id="status" v-model="item.status.name" readonly/>
							<md-tooltip>{{item.status.name}}</md-tooltip>
						</md-field>
					</div>
				
				</div>
			</md-card-content>
			<md-card-actions>
				<md-button @click="showTaskDialog = true">
					<md-icon>info</md-icon>
					<md-tooltip>Informações da Tarefa</md-tooltip>
				</md-button>
				<md-button v-on:click="saveMyTask">
					<md-icon>add_box</md-icon>
					<md-tooltip>Add em minhas tarefas</md-tooltip>
				</md-button>
				<md-button @click="showTimeRecordingDialog = true">
					<md-icon>schedule</md-icon>
					<md-tooltip>Lançar horas</md-tooltip>
				</md-button>
			</md-card-actions>
		</md-card>
		<task-dialog v-bind:showDialog="showTaskDialog" @close-task-dialog="taskDialogManeger" v-bind:item="item"></task-dialog>
		<time-recording-dialog v-bind:showDialog="showTimeRecordingDialog" @close-time-recording-dialog="timeRecordingDialogManeger" v-bind:item="item"></time-recording-dialog>
		<md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbarOk" md-persistent>
      <span>Tarefa adicionada em minhas tarefas!</span>
      <md-button class="md-primary" @click="showSnackbarOk = false">Ok</md-button>
    </md-snackbar>
		<md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbarError" md-persistent>
      <span>Error!</span>
      <md-button class="md-primary" @click="showSnackbar = false">Ok</md-button>
    </md-snackbar>
	</div>
</template>

<script>
import TaskDialog from './TaskDialog'
import TimeRecordingDialog from '../time/TimeRecordingDialog'
import Api from '../../config/config'

export default {

	props:{
		item:	Object
	},
	data: () =>({
		showTaskDialog: false,
		showSnackbarOk: false,
		showSnackbarError: false,
		showTimeRecordingDialog: false,
		options:{
			headers:{
				Authorization: 'Basic '
			},
		}
	}),
	components:{
		TaskDialog,
		TimeRecordingDialog,
	},
	mounted(){
		init => {
			this.options.headers.Authorization+= this.$store.getters.getRedmineAutorization;
		}
	},
	methods:{
		taskDialogManeger(shTaskDialog){
			this.showTaskDialog = shTaskDialog;
		},
		timeRecordingDialogManeger(shTimeRecordingDialog){
			this.showTimeRecordingDialog = shTimeRecordingDialog;
		},
		saveMyTask(){
			var myTask = {
				id: this.item.id,
				
				subject: this.item.subject,
				
				hours: {
					hour:0,
					minute:0,
					second:0
				},
				
				project: this.item.project,
				
				status: this.item.status,
				
				userName: this.$store.state.user.userName
			};
			
			var status = 0;
			
			this.$http.post(Api.webApi, myTask)
								.then(response => (status = response.status))
								.finally(() => {
									this.showSnackbarOk = (status == 201);
									this.showSnackbarError = (status != 201);
								});
		}
	}
}
</script>

<style lang="scss" scoped>
	.md-card {
		margin: 5px;
		// width: 40%;
		display: inline-block;
		vertical-align: top;
		flex-direction: row;
		justify-content: space-between;
	}
</style>