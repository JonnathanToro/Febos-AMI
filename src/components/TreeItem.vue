<template>
  <div>
    <div
      v-if="isFolder"
      :class="{bold: isFolder}"
      @click="toggleFolder()"
    >
      <slot name="folder-description" v-bind:item="item" v-bind:isOpen="isOpen">
        {{ item.name }} <span>[{{ isOpen ? '-' : '+' }}]</span>
      </slot>
    </div>
    <div v-if="!isFolder" @click="selectItem">
      <slot name="item-description" v-bind:item="item">
        {{ item.name }}
      </slot>
    </div>
    <ul v-show="isOpen" v-if="isFolder" class="level">
      <tree-item
        class="item"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        @open-folder="$emit('open-folder', $event)"
        @add-item="$emit('add-item', $event)"
        @select-item="$emit('select-item', $event)"
      >
        <template slot="folder-description" slot-scope="{item, isOpen}">
          <slot name="folder-description" v-bind:item="item" v-bind:isOpen="isOpen">
            {{ item.name }} <span>[{{ isOpen ? '-' : '+' }}]</span>
          </slot>
        </template>
        <template slot="item-description" slot-scope="{item}">
          <slot name="item-description" v-bind:item="item">
            {{ item.name }}
          </slot>
        </template>
      </tree-item>
      <!--      TODO: habilitar cuando se tenga opcion para agregar nuevos items-->
      <!--      <li v-if="isFolder" class="add" @click="$emit('add-item', item)"-->
      <!--          @mouseover="isFolder?hover = true:null"-->
      <!--          @mouseleave="isFolder?hover = false:null"-->
      <!--      > - <span v-show="hover">Agregar Item a : {{ item.name }} </span></li>-->
    </ul>
  </div>
</template>
<script>
export default {
  name: 'tree-item',
  props: {
    item: Object
  },
  data() {
    return {
      isOpen: true,
      hover: false
    };
  },
  computed: {
    isFolder() {
      return this.item
         && this.item.children
         && this.item.children.length;
    }
  },
  methods: {
    toggleFolder() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
        this.$emit('open-folder', this.item);
      }
    },
    makeFolder() {
      if (!this.isFolder) {
        this.$emit('make-folder', this.item);
        this.isOpen = true;
      }
    },
    selectItem() {
      if (!this.isFolder) {
        this.$emit('select-item', this.item);
        this.isOpen = true;
      }
    }
  }
};
</script>

<style scoped>
  .item {
    cursor: pointer;
  }

  .level {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
    border-left: 1px gray solid;
  }

  .bold {
    font-weight: bold;
  }
</style>
