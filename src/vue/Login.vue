<template>
  <a-layout style="height: 100%;">
    <a-row type="flex" justify="center" align="middle" style="height: 100%;">
      <div>
        <a-row>
          <a-card :style="{ margin: '24px  16px',padding: 0,  background: '#fff', width: '320px'}">
            <p>
              <a-input
                placeholder="Username"
                size="large"
                v-model="userName"
                ref="userNameInput"
                v-focus-next-on-enter="'passwordInput'"
              >
                <a-icon slot="prefix" type="user"/>
                <a-icon v-if="userName" slot="suffix" type="close-circle" @click="emitEmpty"/>
              </a-input>
            </p>
            <p>
              <transition name="passwordError-transition" enter-active-class="animated shake">
                <a-input
                  placeholder="Password"
                  size="large"
                  v-model="password"
                  v-if="passwordError"
                  ref="passwordInput"
                  :type="passwordType"
                  v-focus-next-on-enter="'userNameInput'"
                >
                  <a-icon slot="prefix" type="lock"/>
                  <a-icon
                    v-if="password"
                    slot="suffix"
                    :type="passwordType=='text'?'eye-invisible':'eye'"
                    @click="visibleToggle"
                  />
                </a-input>
              </transition>
            </p>
            <p style="text-align:right">
              <a>{{ $t("Forgot password?") }}</a>
            </p>
            <transition name="passwordError-transition" enter-active-class="animated shake">
              <a-button
                v-if="loginBTN"
                :type="loginSuccess?'primary':'danger'"
                block
                @click="login"
              >{{loginSuccess?'Login':'Incorrect username or password'}}</a-button>
            </transition>
          </a-card>
        </a-row>

        <a-row type="flex" justify="center">
          <a @click="$router.push({path:'/signup'})">Creat account</a>
        </a-row>
      </div>
    </a-row>
  </a-layout>
</template>

<script>
export default {
  name: "login",
  meta: {
    title: "登录",
    order: 100
  },

  data: () => ({
    show: true,
    passwordError: true,
    loginBTN: true,
    loginSuccess: true,
    drawer: null,
    userName: "",
    password: "",
    passwordType: "password"
  }),
  props: {
    source: String
  },
  methods: {
    visibleToggle() {
      this.passwordType == "text"
        ? (this.passwordType = "password")
        : (this.passwordType = "text");
      this.$refs.passwordInput.focus();
    },
    emitEmpty() {
      this.$refs.userNameInput.focus();
      this.userName = "";
    },
    onSearch(value) {
      console.log(value);
    },
    login() {
      var username = this.username;
      var password = this.password;

      if (!password) {
        this.loginBTN = false;
        this.loginSuccess = false;
        setTimeout(() => {
          this.loginBTN = true;
        }, 0);
        setTimeout(() => {
          this.loginSuccess = true;
        }, 2000);
      }

      console.log([username, password]);

      // LeanCloud - 登录
      // https://leancloud.cn/docs/leanstorage_guide-js.html#用户名和密码登录
      this.$AV.User.logIn(username, password)
        .then(function(user) {
          // 登录成功
          console.log(user);
          app.user = user.toJSON();
          console.log(app.user);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>