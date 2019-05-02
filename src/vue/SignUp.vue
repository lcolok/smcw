<template>
  <a-layout style="height: 100%;">
    <a-row type="flex" justify="center" align="middle" style="height: 100%;">
      <div>
        <a-row>
          <a-card :style="{ margin: '24px  16px',padding: 0,  background: '#fff', width: '320px'}">
            <a-row v-for="(item,index) in inputs" :key="index.toString()" :span="24">
              <p>
                <a-input
                  placeholder="Username"
                  size="large"
                  v-model="item.val"
                  ref="userNameInput"
                  v-focus="focusIndex === index"
                  @pressEnter="nextFocus(index)"
                >
                  <a-icon slot="prefix" type="user"/>
                  <a-icon v-if="userName" slot="suffix" type="close-circle" @click="emitEmpty"/>
                </a-input>
              </p>
            </a-row>
            <p>
              <transition name="passwordError-transition" enter-active-class="animated shake">
                <a-input
                  placeholder="Password"
                  size="large"
                  v-model="password"
                  v-if="passwordError"
                  ref="passwordInput"
                  :type="passwordType"
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
              <a>Forgot password?</a>
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
  meta: {
    title: "注册页"
  },
  directives: {
    focus: {
      inserted: function(el, obj) {
        //这是需要页面刚加载就能进行聚焦操作使用的钩子函数,可以省略的，视具体需求而定
        //console.log(obj);
        if (obj.value) {
          //对值进行判断
          // 聚焦元素
          el.focus();
        }
      },
      // 当指令所在组件的 VNode 及其子 VNode 全部更新后调用
      componentUpdated: function(el, obj) {
        //这是每当绑定的值发生改变时触发的钩子函数
        //console.log(obj);  //可以打印看一下
        if (obj.value) {
          el.focus();
        }
      }
    }
  },
  data() {
    return {
      focusIndex: 0, //用来存放下一个应该聚焦的index值
      inputs: [
        {
          val: 1
        },
        {
          val: 2
        },
        {
          val: 3
        },
        {
          val: 4
        }
      ],

      show: true,
      passwordError: true,
      loginBTN: true,
      loginSuccess: true,
      drawer: null,
      userName: "",
      password: "",
      passwordType: "password"
    };
  },
  props: {
    source: String
  },
  methods: {
    nextFocus(index) {
      console.log(index);
      return (this.focusIndex = index + 1);
    },
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