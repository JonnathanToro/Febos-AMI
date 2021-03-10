<template>
  <li>
    <div
      class="parent"
      :class="{bold: true}"
      @dblclick="makeFolder"
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
           icon="folder_open"
           size="small"
           v-if="isFolder"
         />
         <vs-icon
           icon="file_present"
           size="small"
           v-if="isDocument"
         />
      </span>
      <span
        style="font-size: 14px;padding-left: 4px;"
        @click="getChildren();getDetail()"
      >
        {{ item.nombre }}
      </span>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <tree-documents
        class="item"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        @make-folder="$emit('make-folder', $event)"
        @add-item="$emit('add-item', $event)"
        @get-children="$emit('get-children', $event)"
        @get-detail="$emit('get-detail', $event)"
      ></tree-documents>
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
  name: 'tree-documents',
  props: {
    item: Object
  },
  data() {
    return {
      isOpen: true,
      selected: false,
      itemSelect: {}
    };
  },
  computed: {
    isFolder() {
      return (this.item.children && this.item.children.length) || this.item.type === 'folder';
    },
    isDocument() {
      return this.item.type === 'document';
    },
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    getChildren() {
      this.$emit('get-children', this.item);
    },
    getDetail() {
      this.$emit('get-detail', this.item);
    },
    makeFolder() {
      if (!this.isFolder) {
        this.$emit('make-folder', this.item);
        this.isOpen = true;
      }
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
.selected {
  color: red ;
}
</style>
