<template>
  <div class="row">
    <div class="col-2">
      <button class="btn btn-secondary button" @click="sort">To original order</button>
    </div>

    <div class="col-6">
      <h3>Transition</h3>

      <a-card title="Card Title">
        <draggable
          class="list-group"
          v-model="list"
          v-bind="dragOptions"
          :sort="false"
          :move="checkMove"
          @start="drag = true"
          @end="drag = false"
        >
          <!-- <transition-group type="transition" :name="!drag ? 'flip-list' : null"> -->
          <a-card-grid
            style="width:33%;textAlign:'center';height: 33vw;"
            class="list-group-item"
            v-for="element in list"
            :key="element.order"
            @dragend="dragend"
            @dragenter="dragenter"
          >
            <i
              :class="
                element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
              "
              @click="element.fixed = !element.fixed"
              aria-hidden="true"
            ></i>
            {{ element.name }}
          </a-card-grid>
          <!-- </transition-group> -->
        </draggable>
      </a-card>
    </div>

    <rawDisplayer class="col-3" :value="list" title="List"/>
  </div>
</template>

<script>
import draggable from "vuedraggable";
const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs",
  "apple"
];
export default {
  name: "transition-example-2",
  display: "Transitions",
  components: {
    draggable
  },
  data() {
    return {
      list: message.map((name, index) => {
        return { name, order: index + 1 };
      }),
      drag: false
    };
  },
  methods: {
    dragend: function(evt) {
      // console.log("dragend",evt);
    },
    dragenter: evt => {
      console.log("dragend", evt);
      console.log(evt.srcElement);
    },
    checkMove: function(evt) {
      // console.log(evt);
      return evt.draggedContext.element.name !== "apple";
    },
    sort() {
      this.list = this.list.sort((a, b) => a.order - b.order);
    }
  },
  computed: {
    dragOptions() {
      return {
        touchStartThreshold: 0, // px, how many pixels the point should move before cancelling a delayed drag event
        group: "dashboard",
        disabled: false,
        // ghostClass: "custom_sortable_ghost", // Class name for the drop placeholder
        // chosenClass: "custom_sortable_chosen", // Class name for the chosen item
        // dragClass: "custom_sortable_drag", // Class name for the dragging item
        animation: 200, // ms, animation speed moving items when sorting, `0` — without animation
        // easing: "cubic-bezier(1, 0, 0, 1)" // Easing for animation. Defaults to null. See https://easings.net/ for examples.
        draggable: ".list-group-item", // Specifies which items inside the element should be draggable
        dragoverBubble: true
      };
    }
  }
};
</script>

<style>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.custom_sortable_ghost {
  opacity: 0.8;
  background: #c8ebfb;
}
.custom_sortable_chosen {
  opacity: 0.8;
  background: #fbc8c8;
}
.custom_sortable_drag {
  opacity: 0.8;
  background: #cefbc8;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>