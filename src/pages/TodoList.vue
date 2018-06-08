<template>
  <div id="app">
    <header>
      <nav>
        <ul class="nav-bar main-title">
          <li class="nav-item" :class="{active:currentTab === 'All'}" @click="currentTab = 'All'">My Task</li>
          <li class="nav-item" :class="{active:currentTab === 'InProgress'}" @click="currentTab = 'InProgress'">In Progress</li>
          <li class="nav-item" :class="{active:currentTab === 'Completed'}" @click="currentTab= 'Completed'">Completed</li>
        </ul>
      </nav>
    </header>
    <section class="content-wrapper main-title">
      <div class="new-todo">
        <input type="text" placeholder=" + Add Task" v-model="tempAddTodo.title" v-if="!isAdd" @click="isAdd = true">
        <todo-editor v-if="isAdd" v-bind="{ editTodo: tempAddTodo, onClickCancel: clearAdd, onClickOk: addTodo }"></todo-editor>
      </div>
      <ul class="todo-list">
        <todo-item v-for="todo in filterTodos" :key="todo.id" v-bind="{todoData:todo,onTodoChange:updateTodo}"></todo-item>
      </ul>
      <div class="todo-counting">
        {{todoCounting}}
      </div>
    </section>
  </div>
</template>

<script>
import sampleData from './sample.json';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';

fontawesome.library.add(solid.faStar);
fontawesome.library.add(regular.faStar);
fontawesome.library.add(solid.faPencilAlt);
fontawesome.library.add(regular.faCalendarAlt);
fontawesome.library.add(regular.faFile);
fontawesome.library.add(regular.faCommentDots);

import todoItem from './components/TodoItem';
import todoEditor from './components/TodoEditor';

export default {
  data () {
    return {
      todos: [],
      isEdit: false,
      currentTab: 'All',
      tempAddTodo: {
        title: '',
        expDate: '',
        expTime: '',
        comment: ''
      },
      isAdd: false
    };
  },
  computed: {
    filterTodos () {
      this.todos.sort((a, b) => {
        let flag = 0;
        if (a.completed || b.completed) {
          flag = a.completed - b.completed;
        }
        else {
          flag = b.marked - a.marked;
        }
        return flag;
      });
      let filtered = this.todos.filter(todo => {
        if (this.currentTab === 'Completed') return todo.completed;
        else if (this.currentTab === 'InProgress') return !todo.completed;
        return true;
      });
      return filtered;
    },
    todoCounting () {
      if (this.currentTab === 'Completed') {
        return `${this.todos.filter(todo => todo.completed).length} task completed`;
      } else {
        return `${this.todos.filter(todo => !todo.completed).length} task left`;
      }
    }
  },
  created () {
    this.todos = sampleData;
  },
  methods: {
    updateTodo (id, item) {
      const updateItme = this.todos.find(todo => todo.id === id);
      Object.assign(updateItme, item);
    },
    addTodo (newTodo) {
      let defaultTodo = {
        id: Date.now(),
        title: '',
        expDate: '',
        expTime: '',
        comment: '',
        completed: false,
        marked: false
      };
      Object.assign(defaultTodo, newTodo);
      this.todos.push(defaultTodo);
      this.clearAdd();
    },
    clearAdd () {
      this.tempAddTodo.title = '';
      this.tempAddTodo.expDate = '';
      this.tempAddTodo.expTime = '';
      this.tempAddTodo.comment = '';
      this.isAdd = false;
    }
  },
  components: {
    todoItem,
    todoEditor
  }
};
</script>
