<template>
	<div class="task">
		<task-search-bar @search="getTask" v-bind:projects="projects" v-bind:status="issue_statuses"></task-search-bar>
		<md-progress-spinner v-if="spinner" :md-diameter="300" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
		<task-list v-else v-bind:issues="tasks"></task-list>
	</div>

</template>

<script>
import config from '../config/config'
import Qs from 'qs'
import TaskList from '../components/task/TaskList'
import TaskSearchBar from '../components/task/TaskSearchBar'

export default {
	components:{
		TaskList,
		TaskSearchBar,
	},
	data: () => ({
		spinner: false,
		projects:[],
		issue_statuses:[],
		tasks:[],
		options:{
			headers:{
				Authorization: 'Basic '
			},
		}
	}),
	methods:{
		init(){
			this.options.headers.Authorization+= this.$store.getters.getRedmineAutorization; 
		},
		getProjects(){
			this.$http.get(config.APIRedmine + "projects.json",this.options)
								.then(response => (this.projects = response.data.projects));
		},
		getStatus(){
			this.$http.get(config.APIRedmine + "issue_statuses.json",this.options)
								.then(response => (this.issue_statuses = response.data.issue_statuses));
		},
		getTask(parameters){
			this.spinner = true;

			var params = this.getParams(parameters)
			
			this.$http.get(config.APIRedmine+"issues.json?"+params,this.options)
								.then(response => (this.tasks = response.data.issues))
								.finally(() => this.spinner = false);
		},
		getParams(params){
			
			if(params.selectedProject == null && params.selectedStatus == null){
				return '';
			}
			
			if(params.selectedProject == null){
				return Qs.stringify({status_id: params.selectedStatus}, {arrayFormat: 'repeat'});
			}

			if(params.selectedStatus == null){
				return Qs.stringify({project_id: params.selectedProject}, {arrayFormat: 'repeat'});
			}

			return Qs.stringify({project_id: params.selectedProject, status_id: params.selectedStatus}, {arrayFormat: 'repeat'});
		},
	},
	mounted(){
		this.init()
		this.getProjects()
		this.getStatus()
  }
}
</script>

<style lang="scss" scoped>

	.task{
		text-align: center;
	}
	.filter{
		color: #8c8c8d;
	}
</style>