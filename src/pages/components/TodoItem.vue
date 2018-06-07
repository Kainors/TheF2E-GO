<template>
  <li class="todo-item" :class="{marked: isMarked,completed: todo.completed}">
    <label class="checkbox-wrapper">
      <input type="checkbox" :id="`todo_${todo.id}`" :checked="todo.completed" @change="todo.completed=!todo.completed">
      <span class="checkbox-marker"></span>
    </label>
    <label :for="`todo_${todo.id}`" class="todo-title">
      {{todo.title}}
    </label>
    <div class="toolbox">
      <span class="star-button" @click="todo.marked=!todo.completed && !todo.marked">
        <span v-show="isMarked"><i class="fas fa-star"></i></span>
        <span v-show="!isMarked"><i class="far fa-star"></i></span>
      </span>
      <span class="edit-button">
        <i class="fas fa-pencil-alt"></i>
      </span>
    </div>
    <div class="tips-content remark">
      <div class="deadline" v-if="todo.expTime || todo.expDate">
        <i class="far fa-calendar-alt"></i>
        {{todo.expDate}} {{todo.expTime}}
      </div>
      <div class="file-item" v-if="todo.file">
        <i class="far fa-file"></i>
      </div>
      <div class="comment" v-if="todo.comment">
        <i class="far fa-comment-dots"></i>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  data () {
    return {
      todo: {
        id: '',
        title: '',
        expTime: '',
        file: null,
        comment: '',
        marked: false,
        completed: false
      }
    }
  },
  computed:{
    isMarked(){
      return this.todo.marked && !this.todo.completed;
    }
  },
  props: ['todoData', 'onTodoChange'],
  created () {
    Object.assign(this.todo, this.todoData);
  },
  updated () {
    this.onTodoChange(this.todo.id, this.todo);
  },
  methods: {
  }
}
</script>

