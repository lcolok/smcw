<template>
  <a-layout style="height: 100%;">
    <a-row type="flex" justify="center" align="middle" style="height: 100%;">
      <div>
        <a-row>
          <a-card :style="{ margin: '24px  16px',padding: 0,  background: '#fff', width: '320px'}">
            <transition name="passwordError-transition" enter-active-class="animated shake">
              <a-button block @click="test">{{"test the API"}}</a-button>
            </transition>
          </a-card>
        </a-row>
      </div>
    </a-row>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    test() {
      this.$AV.Cloud.run("test", {}).then(r => {
        console.log(r);
      });
    }
  }
};
</script>