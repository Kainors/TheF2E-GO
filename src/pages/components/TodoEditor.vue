<template>
  <div class="todo-editor">
    <input type="text" placeholder="Type task title here..." ref="todoTitle" v-model="tempTodo.title" @click="isAdd = true">
    <div class="editor-form subtitle">
      <div class="form-group">
        <label>
          <i class="icon far fa-calendar-alt"></i>Deadline</label>
        <input type="date" v-model="tempTodo.expDate">
        <input type="time" v-model="tempTodo.expTime">
      </div>
      <div class="form-group">
        <label>
          <i class="icon far fa-file"></i>File</label>
        <input type="file">
      </div>
      <div class="form-group">
        <label>
          <i class="icon far fa-comment-dots"></i>Comment</label>
        <textarea cols="30" rows="3" placeholder="Type your memo here..." v-model="tempTodo.comment"></textarea>
      </div>
    </div>
    <div class="editor-button">
      <button class="button-cancel" @click="clickCancel">&times; Cancel</button>
      <button class="button-ok" @click="clickOk">&plus; OK</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tempTodo: {
        title: '',
        expDate: '',
        expTime: '',
        comment: ''
      }
    }
  },
  props: ['editTodo', 'onClickCancel', 'onClickOk'],
  created () {
    Object.assign(this.tempTodo, this.editTodo);
  },
  mounted(){
    this.$refs.todoTitle.focus();
  },
  methods: {
    clickOk () {
      if (this.onClickOk) {
        this.onClickOk(this.tempTodo);
      }
    },
    clickCancel () {
      if (this.onClickCancel) {
        this.onClickCancel();
      }
    }
  }
}
</script>
