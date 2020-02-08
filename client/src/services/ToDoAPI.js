import API from '@/services/API'

export default {
  getToDos () {
    return API().get('todos')
  },

  addTodo (todo) {
    return API().post('addTodo', {
      todo: todo // add our data to the request body
    })
  }
}
