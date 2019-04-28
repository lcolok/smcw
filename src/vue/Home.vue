<template>
  <a-layout style="height: 100%;">
    <a-row type="flex" justify="center" align="middle" style="height: 100%;">
      <div>
        <a-row>
          <a-card :style="{ margin: '24px  16px',padding: 0,  background: '#fff', width: '320px'}">
            <p>
              <a-button icon="cloud" @click="$router.push({path:'/u'}) " block>上传专页</a-button>
            </p>
            <p>
              <a-button icon="drag" @click="$router.push({path:'/draggable'}) " block>Vue.Draggable专页</a-button>
            </p>
          </a-card>
        </a-row>
      </div>
    </a-row>
  </a-layout>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      //
    };
  }
};
</script>