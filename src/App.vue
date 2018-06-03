<template>
  <div id="container">
    <div class="current-signup">{{signupTotal}}</div>
    <div class="check-signup">
      <div class="form-group">
        <label for="eman">報名 email</label>
        <input type="email" v-model="checkEmail">
      </div>
      <button type="button" @click="doCheckSignup">查詢報名結果</button>
    </div>
    <div class="check-signup-result" v-if="checkSignup">
      <div v-if="checkSignup.success">
        報名成功
        <div>報名名稱: {{signupName}}</div>
        <div>報名時間: {{signupTime}}</div>
      </div>
      <div v-else>
        此 email 尚未報名!
      </div>
    </div>
  </div>
</template>

<script>
import f2eApi from './api/theF2E';

export default {
  data() {
    return {
      checkEmail: '',
      signupTotal: 0,
      checkSignup: null
    };
  },
  created(){

  },
  computed: {
    signupName() {
      if (this.checkSignup && this.checkSignup.nickName) return this.checkSignup.nickName;
      else return "";
    },
    signupTime() {
      if (this.checkSignup && this.checkSignup.success) {
        const time = new Date(this.checkSignup.timeStamp);
        return time;
      } else {
        return "";
      }
    }
  },
  methods: {
    async doCheckSignup(){
      const resp = await f2eApi.post('/isSignup',{email: this.checkEmail});
      if(resp.status === 200){
        this.checkSignup = resp.data;
      }
    }
  }
};
</script>
