<template>
	<div class="task-list">
		<div class="listing" v-for="(item, l) in issues" :key="l">
			<task-card v-bind:item="item"></task-card>
		</div>
  </div>
</template>

<script>
import TaskCard from './TaskCard'

export default {
  props:{
    issues:Array
  },
  components:{
    TaskCard,
  },
}
</script>
