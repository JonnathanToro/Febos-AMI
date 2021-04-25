<template>
  <li>
    <div
      class="parent"
      :class="{bold: isFolder}"
    >
      <span v-if="isFolder" @click="toggle">
        <vs-icon
          size="small"
          icon="keyboard_arrow_right"
          v-if="!isOpen"
        />
        <vs-icon
          size="small"
          icon="keyboard_arrow_down"
          v-if="isOpen"
        />
      </span>
      <span>
         <vs-icon
           icon="approval"
           size="small"
           v-tooltip="'Es Oficina'"
           v-if="ifOffice"
         />
         <vs-icon
           icon="badge"
           size="small"
           v-tooltip="'Es División'"
           v-if="isDivision"
         />
         <vs-icon
           icon="group"
           size="small"
           v-tooltip="'Es grupo'"
           v-if="checkGroup"
         />
      </span>
      <span
        style="font-size: 14px;padding-left: 4px;"
        @click="getChildren"
      >
        {{ item.nombre }}
      </span>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <tree-item
        class="item"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        @add-item="$emit('add-item', $event)"
        @get-children="$emit('get-children', $event)"
      ></tree-item>
      <!--
      <li class="add" @click="$emit('add-item', item)">
        <vs-chip color="primary">
          <vs-avatar icon="add" />
          Agregar
        </vs-chip>
      </li>
       -->
    </ul>
  </li>
</template>
<script>
export default {
  name: 'tree-item',
  props: {
    item: Object
  },
  data() {
    return {
      isOpen: true
    };
  },
  computed: {
    isFolder() {
      return this.item.children && this.item.children.length;
    },
    checkGroup() {
      return (this.item.esDivision === 'N' && this.item.esOficina === 'N');
    },
    ifOffice() {
      return this.item.esOficina === 'Y';
    },
    isDivision() {
      return this.item.esDivision === 'Y';
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    getChildren() {
      this.$emit('get-children', this.item);
    }
  }
};
</script>
<style>
.item {
  cursor: pointer;
  list-style: none;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
