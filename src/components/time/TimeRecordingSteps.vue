<template>
  <div class="time-recording-steps">
    <md-steppers :md-active-step.sync="active" >
      <md-step id="first" md-label="First Step" md-description="Optional" :md-done.sync="first">
        <md-field>
          <label>Horas</label>
          <md-input v-if="sw" v-model="hours" type="time" readonly></md-input>
          <md-input v-else v-model="hours" type="time"></md-input>
        </md-field>
        <md-field>
					<label for="activities">Atividade</label>
					<md-select v-model="activity" name="activities" id="activities">
						<md-option v-for="(act,j) of activities" :key="j" :value="act.id">{{act.name}}</md-option>
					</md-select>
				</md-field>  
        <md-field>
          <label>Comentários</label>
          <md-textarea v-model="comments"></md-textarea>
        </md-field>
        <md-button class="md-raised md-primary" @click="setDone('first', 'second')">Continuar</md-button>
      </md-step>
      <md-step id="second" md-label="Second Step" :md-error="secondStepError" :md-done.sync="second">
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
						</md-field>
					</div>
					<div class="md-layout-item md-small-size-33">
						<md-field>
							<label for="project">Projeto</label>
							<md-input name="project" id="project" v-model="item.project.name" readonly/>
						</md-field>
					</div>
          <div class="md-layout-item md-small-size-33">
            <md-field>
              <label>Horas gastas</label>
              <md-input v-model="hours" type="time" readonly></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-33">
            <md-field>
              <label>Atividade</label>
              <md-input v-model="activity" readonly></md-input>
            </md-field>
          </div>
        </div>
        <md-field>
          <label>Comentários</label>
          <md-textarea v-model="comments" readonly></md-textarea>
        </md-field>
        <md-button class="md-raised md-primary" @click="save">Confirmar</md-button>
        <md-button class="md-raised md-primary" @click="setDone('second','first')">Voltar</md-button>
      </md-step>

    </md-steppers>
  </div>
</template>

<script>
import config from '../../config/config'

const addZero = data => {
	return (data < 10) ? '0' + data : data
}

export default {
  props:{
    item:Object,
    stopWatch:Boolean,
  },
  data: () => ({
    hours: '00:00',
    comments: null,
    active: 'first',
    first: false,
    second: false,
    third: false,
    secondStepError: null,
    sw: false,
    options:{
			headers:{
				Authorization: 'Basic '
			},
    },
    activities:[],
    activity:0,
  }),
  mounted(){
    this.load()
  },
  methods: {
    load(){
      this.options.headers.Authorization+= this.$store.getters.getRedmineAutorization;
      
      if(this.item.hours != null){
        this.sw = true;
        
        this.hours = addZero(this.item.hours.hour).toString() +
         ":" + addZero(this.item.hours.minute).toString();
      }
      
      this.loadActivities()
    },
    loadActivities(){      
      this.$http.get(config.APIRedmine + 'enumerations/time_entry_activities.json', this.options)
                .then( response => (this.activities = response.data.time_entry_activities));
    },
    setDone (id, index) {
      this[id] = true

      this.secondStepError = null

      if (index) {
        this.active = index
      }
    },
    save(){
      
      this.item.finalHours = this.convertHours(this.hours)
      
      this.saveRedmine();
      
      this.item.register = true;
      
      this.item.userName = this.$store.state.user.userName;
      
      var status = 0;

      this.$http.post(config.webApi, this.item)
                .then(response => (status = response.status))
                .finally(() => {
                  if(status != 201)
                    this.update(this.item)
                  
                });

      this.$emit('saved-time', true)
    },
    update(item){
      
      var status = 0;
      
      this.$http.put(config.webApi+item.id, item)
                .then(response => (status = response.status))
                .finally(() =>{
                  if(status != 204)
                    console.log('erro')
                });
    },
    saveRedmine(){
      
      var time_entry = {
        
        issue_id: this.item.id,
        
        hours: this.item.finalHours,
        
        activity_id: this.activity,
        
        comments: this.comments
      };
      
      
    },
    convertHours(hours){
      var arrayHours = hours.split(':');
      
      if(this.item.hours == null){
        
        this.item.hours = {
          
          hour: parseInt(arrayHours[0]),
        
          minute: parseInt(arrayHours[1]),
        
          second: 0,
        };
      
      }

      var m = parseFloat(arrayHours[1])/60
      
      var h = Number(arrayHours[0])

      return Math.round( (h+m) * 100) / 100 ;
    },
  },
 
}
</script>

<style lang="scss" scoped>

</style>