<template>
  <div class="task-dialog">
    <md-dialog :md-active.sync="showDialog"  
        :md-click-outside-to-close="false"
        :md-close-on-esc="false"
        class=" md-layout-item  md-small-size-100">
      <md-dialog-title>Informações da tarefa</md-dialog-title>
        <md-dialog-content>
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
							<md-tooltip>{{item.project.name}}</md-tooltip>
						</md-field>
					</div>
					<div class="md-layout-item md-small-size-100">
						<md-field>
							<label for="priority">Prioridade</label>
							<md-input name="priority" id="priority" v-model="item.priority.name" readonly/>
						</md-field>
					</div>
					<div class="md-layout-item md-small-size-100">
						<md-field>
							<label for="author">Autor</label>
							<md-input name="author" id="author" v-model="item.author.name" readonly/>
						</md-field>
					</div>
					<div class="md-layout-item md-small-size-100">
						<md-field>
							<label for="fixed_version">Versão</label>
							<md-input name="fixed_version" id="fixed_version" v-model="item.fixed_version.name" readonly/>
						</md-field>
					</div>
                    <div class="md-layout-item md-small-size-100">
						<md-field>
							<label for="created_on">Criado Em</label>
							<md-input name="created_on" id="created_on" v-model="item.created_on" readonly/>
						</md-field>
					</div>
					<div class="md-layout-item md-small-size-100">
						<md-field>
							<label for="updated_on">Atualizado Em</label>
							<md-input name="updated_on" id="updated_on" v-model="item.updated_on" readonly/>
						</md-field>
					</div> 
					<div class="md-layout-item md-small-size-100" v-for="field in item.custom_fields" :vid-id="field" :key="field" >
						<md-field>
							<label for="fixed_version">{{field.name}}</label>
							<md-input name="fixed_version" id="fixed_version" v-model="field.value" readonly/>
						</md-field>
					</div>
                    <div class="md-layout-item md-small-size-100">
						<md-field>
							<label for="done_ratio">% Terminado:</label>
							<md-progress-bar name="done_ratio" id="done_ratio" v-model="item.done_ratio" readonly></md-progress-bar>
						</md-field>
					</div>
				</div>
                <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label for="description">Descrição</label>
                        <md-textarea name="description" id="description" v-model="item.description" readonly></md-textarea>
                    </md-field>
                </div>
        </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" v-on:click="close">Fechar</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  export default {
    name: 'DialogCustom',
    props: {
     showDialog: Boolean,
     item: Object, 
	},
	methods:{
		close(){
			this.showDialog = false;

			this.$emit('close-task-dialog',this.showDialog)
		}
	},
  }
</script>

<style lang="scss" scoped>

</style>