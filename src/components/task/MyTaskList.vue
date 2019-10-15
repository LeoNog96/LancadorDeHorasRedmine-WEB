<template>
	<div class="task-list">
		<div class="listing" v-for="(item,k) in issues" :key="k">
			<my-task-card v-bind:item="item"></my-task-card>
		</div>
  </div>
</template>

<script>
import MyTaskCard from './MyTaskCard'

export default {
  props:{
    issues:Array
  },
  components:{
    MyTaskCard,
  },
}
</script>
