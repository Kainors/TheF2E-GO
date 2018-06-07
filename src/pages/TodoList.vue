<template>
  <div id="app">
    <header>
      <nav>
        <ul class="nav-bar main-title">
          <li class="nav-item active">
            <a href="#">My Task</a>
          </li>
          <li class="nav-item">
            <a href="#">In Progress</a>
          </li>
          <li class="nav-item">
            <a href="#">Completed</a>
          </li>
        </ul>
      </nav>
    </header>
    <section class="content-wrapper main-title">
      <div class="new-todo">
        <input type="text" placeholder=" + Add Task">
      </div>
      <ul class="todo-list">
        <todo-item v-for="todo in todos" :key="todo.id" v-bind="{todoData:todo,onTodoChange:todoChange}"></todo-item>
      </ul>
      <div class="todo-counting">
        4 tasks left
      </div>
    </section>
  </div>
</template>

<script>
import sampleData from './sample.json';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';

fontawesome.library.add(solid);
fontawesome.library.add(regular);

import todoItem from './components/TodoItem';

export default {
  data () {
    return {
      todos: [],
      isEdit: false,
    };
  },
  computed: {
    filterTodos () {

    },
    todoCounting () {
      return this.todos.filter(todo => !todo.completed).length;
    }
  },
  created () {
    this.todos = sampleData;
  },
  methods: {
    todoChange (id, item) {
      const updateItme = this.todos.find(todo=>todo.id===id);
      Object.assign(updateItme,item);
      console.log(updateItme);
      console.log('change')
    }
  },
  components: { todoItem }
};
</script>
