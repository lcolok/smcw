
<template></template>

<script>
export default {
  meta: {
    title: "主页"
  },
  created() {
    this.$router.push({ path: "/map" });
  }
};
</script>