<template>
  <a-layout style=" height: 100%;">
    <a-row type="flex" justify="center" align="middle">
      <a-card
        hoverable
        :style="{ margin: '24px 16px',padding: 0,  background: '#fff', width: '300px'}"
      >
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          slot="cover"
        >
        <template class="ant-card-actions" slot="actions">
          <a-icon type="setting"/>
          <a-icon type="edit"/>
          <a-icon type="ellipsis"/>
        </template>
        <a-card-meta title="Card title" description="This is the description">
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-card-meta>
      </a-card>
    </a-row>
  </a-layout>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    username: "",
    password: ""
  }),
  props: {
    source: String
  },
  methods: {
    login() {
      var username = this.username;
      var password = this.password;

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