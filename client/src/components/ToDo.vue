<template lang="html">
  <div>
    <ul>
      <li v-for='todo in todos' :key="todo">
        <span>{{todo}}</span>
      </li>
    </ul>
    <div>
      {{ assignment }}
    </div>
  </div>
</template>
<script>
import ToDoAPI from '@/services/ToDoAPI.js'
export default {
  data () {
    return {
      todos: [],
      assignment: 'This is an assignment.',
      assignments: ['assignment1', 'assignment2']
    }
  },
  mounted () {
    this.loadTodos()
  },
  methods: {
    async loadTodos () {
      const response = await ToDoAPI.getToDos()
      this.todos = response.data
    }
  }
}
</script>
<style lang="css">
</style>
