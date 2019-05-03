
<template>
  <a-layout style="height: 100%;">
    <a-row type="flex" justify="center" align="middle" style="height: 100%;">
      <div>
        <a-row>
          <a-card :style="{ margin: '24px  16px',padding: 0,  background: '#fff', width: '320px'}">
            <p v-for="(item,index) in $router.options.routes" :key="index.toString()">
              <a-button
                block
                @click="$router.push({path:item.path})"
                :disabled="$router.currentRoute.fullPath==item.path"
              >
                {{item.meta?(item.meta.title||item.name):item.name}}{{$router.currentRoute.fullPath==item.path?"(当前路由)":""}}
                <a-icon v-if="item.meta?item.meta.requiresAuth:false" v-bind="iconOption"/>
              </a-button>
            </p>
          </a-card>
        </a-row>
      </div>
    </a-row>
  </a-layout>
</template>

<script>
export default {
  name: "routerMap",
  components: {},
  data() {
    console.log("All Routers", this.$router);

    return {
      iconOption: {
        type: "safety-certificate",
        theme: "twoTone",
        twoToneColor: "#52c41a"
      }
    };
  }
};
</script>