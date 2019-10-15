<template>
    <div class="Timer">
			<md-progress-spinner v-if="spinner" :md-diameter="300" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
			<my-task-list v-else v-bind:issues="issues"></my-task-list>
		</div>
</template>

<script>
import MyTaskList from '../components/task/MyTaskList'
import config from '../config/config'

export default {
	data: ()=>({
		issues: [],
		spinner: false
	}),
	components:{
		MyTaskList,
	},
	methods:{
		loadMyTask(){
			this.spinner = true;
			
			this.$http.get(config.webApi+this.$store.state.user.userName)
								.then(response => (this.issues = response.data))
								.finally(() => this.spinner = false);
		}
	},
	mounted(){
		this.loadMyTask()
	}
}
</script>

<style lang="scss" scoped>

</style>