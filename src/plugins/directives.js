import Vue from "vue";

Vue.directive('focusNextOnEnter', { // 聚焦下一个输入器,在vue里要写成:v-focus-next-on-enter
    bind: function(el, {
      value
    }, vnode) {
      el.addEventListener('keyup', (ev) => {
        if (ev.keyCode === 13) {
          let nextInput = vnode.context.$refs[value]
          if (nextInput && typeof nextInput.focus === 'function') {
            nextInput.focus()
            nextInput.select()
          }
        }
      })
    }
  })