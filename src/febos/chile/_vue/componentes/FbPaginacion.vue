<template>
  <vs-row
    vs-type="flex"
    vs-justify="space-between"
    vs-w="12">
    <vs-col
      class="vs-pagination--mb"
      vs-type="flex"
      vs-justify="flex-start"
      vs-align="center"
      vs-lg="6"
      vs-sm="12"
      vs-xs="12" >
      <div v-if="description">
        <span
          style="margin-right:5px"
        >
          {{ descriptionTitle }}: {{ minRows }} - {{ maxRows }}
          {{ descriptionConnector }} {{ sizeArray }} | {{ descriptionBody }}:

        </span>
        <ul class="vs-pagination--array">
          <li
            v-for="(row,index) in descriptionItems"
            :key="index">
            <span
              :style="styleDescription"
              :class="[`vs-description-${color}`,{ 'vs-pagination--bold': (index==indexRows)}]"
              @click="changeRowMaxItems(index)">
              {{ row }}
            </span>
            <span
              v-if="index !== (descriptionItems.length - 1)">
              ,
            </span>
          </li>
        </ul>
      </div>
    </vs-col>
    <vs-col
      class="vs-pagination--mb"
      vs-type="flex"
      vs-justify="flex-end"
      vs-align="center"
      vs-lg="6"
      vs-sm="12"
      vs-xs="12" >
      <div
        :style="stylePagination"
        :class="[`vs-pagination-${color}`]"
        class="con-vs-pagination">
        <nav class="vs-pagination--nav">
          <button
            :class="{disabled:current <= 1 ? 'disabled' : null}"
            :disabled="current === 1"
            class="vs-pagination--buttons btn-prev-pagination vs-pagination--button-prev"
            @click="prevPage">
            <vs-icon
              :icon-pack="iconPack"
              :icon="prevIcon ? prevIcon : defaultPrevIcon"
            ></vs-icon>
          </button>
          <ul class="vs-pagination--ul">
            <li
              v-for="(page, index) in pages"
              :key="index"
              :class="{'is-current': page === current}"
              class="item-pagination vs-pagination--li"
              @click="goTo(page)">
              <span>
                {{ page }}
              </span>

              <div class="effect"></div>
            </li>
          </ul>
          <!-- :style="styleBtn" -->
          <button
            :class="{disabled:current === total ? 'disabled' : null}"
            :disabled="current === total"
            class="vs-pagination--buttons btn-next-pagination vs-pagination--button-next"
            @click="nextPage">
            <vs-icon
              :icon-pack="iconPack"
              :icon="nextIcon ? nextIcon : defaultNextIcon"
            ></vs-icon>
          </button>
        </nav>
      </div>
    </vs-col>
  </vs-row>
</template>

<script>

export default {
  name: 'FbPaginacion',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    total: {
      type: [String, Number],
      required: true
    },
    value: {
      type: Number,
      required: false,
      default: 1
    },
    max: {
      type: Number,
      default: 9
    },
    description: {
      type: String,
      default: ''
    },
    goto: {
      type: Boolean
    },
    type: {
      type: String
    },
    prevIcon: {
      type: String,
      default: 'chevron_left'
    },
    nextIcon: {
      type: String,
      default: 'chevron_right'
    },
    iconPack: {
      type: String,
      default: 'material-icons'
    },
  },
  data: () => ({
    pages: [],
    current: 0,
    go: 0,
    prevRange: '',
    nextRange: '',
    hoverBtn1: false
  }),
  computed: {
    stylePagination() {
      const style = {};
      return style;
    },
  },
  watch: {
    current() {
      this.getPages();
      this.$emit('input', this.current);
      this.$emit('change', this.current);
    },
    total() {
      this.getPages();
    },
    value(val) {
      const value = val;
      // eslint-disable-next-line no-nested-ternary
      const pageNum = value < 1 ? 1 : (value <= this.total ? value : this.total);
      this.goTo(pageNum);
    }
  },
  mounted() {
    this.go = this.value;
    this.current = this.go;
    this.getPages();
  },
  methods: {
    isEllipsis(page) {
      return page === '...';
    },
    goTo(page) {
      if (page === '...') {
        return;
      }
      if (typeof page.target === 'undefined') {
        this.current = page;
      } else {
        const value = parseInt(page.target.value, 10);
        this.go = (
          // eslint-disable-next-line no-nested-ternary
          value < 1 ? 1 : (value <= this.total ? value : this.total)
        );
        this.current = this.go;
      }
    },
    getPages() {
      if (this.total <= this.max) {
        this.pages = this.setPages(1, this.total);
        return;
      }
      const even = this.max % 2 === 0 ? 1 : 0;
      if (this.total < 6) {
        this.prevRange = Math.floor(this.max / (this.max / 2));
      } else {
        this.prevRange = Math.floor(this.max / 2);
      }
      this.nextRange = this.total - this.prevRange + 1 + even;
      if (this.current >= this.prevRange && this.current <= this.nextRange) {
        const start = this.current - this.prevRange + 2;
        const end = this.current + this.prevRange - 2 - even;
        this.pages = [1, '...', ...this.setPages(start, end), '...', this.total];
      } else if (this.total < 6) {
        this.pages = [
          ...this.setPages(1, this.total)
        ];
      } else {
        this.pages = [
          ...this.setPages(1, this.prevRange),
          '...',
          ...this.setPages(this.nextRange, this.total)
        ];
      }
    },
    setPages(startParam, end) {
      let start = startParam;
      const setPages = [];
      // eslint-disable-next-line no-plusplus,no-const-assign
      for (start > 0 ? start : 1; start <= end; start++) {
        setPages.push(start);
      }
      return setPages;
    },
    nextPage() {
      if (this.current < this.total) {
        // eslint-disable-next-line no-plusplus
        this.current++;
      }
    },
    prevPage() {
      if (this.current > 1) {
        // eslint-disable-next-line no-plusplus
        this.current--;
      }
    }
  }
};
</script>

<style scoped>

</style>
