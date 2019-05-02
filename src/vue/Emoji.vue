<template>
  <div id="app">
    <VEmojiPicker :pack="pack" @select="selectEmoji" />
  </div>
</template>

<script>
import VEmojiPicker from 'v-emoji-picker';
import packData from 'v-emoji-picker/data/emojis.json';

export default {
  name: 'Demo',
  components: {
    VEmojiPicker
  },
  data: () => ({
    pack: packData
  }),
  methods: {
    selectEmoji(emoji) {
      console.log(emoji)
    }
  }
}
</script>