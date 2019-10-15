<template>
	<div>
		<md-card>
			<md-card-header>
				<div class="md-title">{{item.id}}</div>
			</md-card-header>

			<md-card-content>
				<div class="row text-center">
					<h1 v-html="aCounter"></h1>
				</div>			
			</md-card-content>

			<md-card-actions>
				<md-button v-on:click="startTime">
					<md-icon v-if="started">pause</md-icon>
					<md-icon v-else>play_arrow</md-icon>
				</md-button>
				<md-button  v-on:click="stopSave" >
					<md-icon>stop</md-icon>
				</md-button>
			</md-card-actions>
		</md-card>
	</div>
</template>

<script>

const addZero = data => {
	return (data < 10) ? '0' + data : data
}

export default {
	props:[
		'item',

	],	
  data: ()=>({
    hour: 0,
    minute: 0,
		second: 0,
		started: false,
		milisecond: 0,
		interval: '',
		counter: '',
	}),
	mounted(){
		this.load();
	},
	computed: {
		aCounter () {
			const hour = addZero(this.hour);
			
			const minute = addZero(this.minute);
			
			const second = addZero(this.second);
			
			const milisecond = addZero(this.milisecond);
			
			this.counter = hour + ':' + minute + ':' + second + '.<span class="h3">' + milisecond + '</span>'	
			
			return this.counter;
		}
	},
	methods:{
		load(){
			this.hour = this.item.hours.hour;
			
			this.minute = this.item.hours.minute;
			
			this.second = this.item.hours.second;
		},
		stopCount () {
			if (this.interval !== '') {
				clearInterval(this.interval)
				
				this.interval = ''
			}
		},
		stopSave(){
			this.stopCount();
			
			this.item.hours.hour = this.hour;
			
			this.item.hours.minute = this.minute;
			
			this.item.hours.second = this.second;

			this.$emit('close-stopwatch-card',this.item);
		},
		startTime(){
			if(this.started){

				this.started = false;

				this.stopCount();
			}else{
				this.started = true
				
				this.interval = setInterval(() => {
					this.chronometer()
				}, 10)
			}
			
		},
		chronometer () {
			this.milisecond += 1
			
			if (this.milisecond === 100) {
				this.milisecond = 0
				this.second += 1
			}

			if (this.second === 60) {
				this.second = 0
				this.minute += 1
			}
			
			if(this.minute === 60){
				this.minute = 0
				this.hour +=1
			}
		},		
	},
}
</script>

<style lang="scss" scoped>
	.md-card {
		margin: 5px;
		// width: 40%;
		flex-direction: row;
		justify-content: space-between;
	}
.content{
	padding: 45%;
	font-size: 200%
}
</style>