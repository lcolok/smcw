
<template></template>

<script>
export default {
  meta: {
    staticPath:"/",
    title: "主页"
  },
  created() {
    this.$router.push({ path: "/map" });
  }
};
</script>