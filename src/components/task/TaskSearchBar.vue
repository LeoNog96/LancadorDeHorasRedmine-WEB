<template>
  <div class="task-search-bar md-layout md-gutter  md-small-size-50">
      <div class="projetos md-layout-item  md-small-size-100">
        <md-field>
					<label for="projects">Projeto</label>
					<md-select v-model="selectedProject" name="projects" id="projects">
						<md-option v-for="(project,j) of projects" :key="j" :value="project.id">{{project.name}}</md-option>
					</md-select>
				</md-field>  
      </div>

      <div class="md-layout-item  md-small-size-100">
        <md-field>
					<label for="issue_statuses">Status da Tarefa</label>
					<md-select v-model="selectedStatus" name="issue_statuses" id="issue_statuses">
						<md-option v-for="(st,i) of status" :key="i" :value="st.id">{{st.name}}</md-option>
					</md-select>
				</md-field> 			 
			</div>
			<div class="md-layout-item  md-small-size-100">
        <md-button id="search" v-on:click="getTask">
          <md-icon>search</md-icon>
          <md-tooltip>Buscar tarefas</md-tooltip>
        </md-button>
			</div>
    
  </div>
</template>

<script>
export default {
  props:{
    projects: Array,
    status: Array,
  },
  data:() =>({
    selectedProject: null,
    selectedStatus: null,
  }),
  methods:{
    getTask(){
      
      var params = {
        selectedProject: this.selectedProject,
        selectedStatus: this.selectedStatus
      }

      this.$emit('search', params)
    }
  }
}
</script>

<style lang="scss" scoped>
  .task-search-bar{
    margin-left: 20% !important;
     margin-right: 20% !important;
  }
  #search{
    margin-right: 100%;
    margin-top: 4%;
  }
</style>