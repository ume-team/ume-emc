<template>
  <div>
    <ume-table border stripe class="ume-entity-table" :data="data">
      <ume-table-column
        v-for="col in header"
        :label="col.colName"
        :prop="col.colId"
        :key="col.colId"
        show-overflow-tooltip
        :render-header="renderHeader">
      </ume-table-column>
      <ume-table-column fixed="right" label="操作" width="140px">
        <template scope="scope">
          <div class="control-button-container">
            <ume-button type="text" @click="doUpdate(scope.row)" v-if="isShowUpdateButton">修改</ume-button>
            <span class="button-separator" v-if="isShowUpdateButton && isShowDeleteButton">|</span>
            <ume-button type="text" v-if="isShowDeleteButton">删除</ume-button>
          </div>
        </template>
      </ume-table-column>
    </ume-table>
    <div class="calc-text-width" ref="calcTextWidth">
    </div>
  </div>
</template>
<style>
  .ume-entity-table {
    width: 100%;
  }
  .ume-entity-table th>.cell {
    text-overflow: initial;
    white-space: nowrap;
  }
  .control-button-container {
    text-align: center;
  }
  .calc-text-width {
    position: absolute;
    visibility: hidden;
    height: auto;
    width: auto;
    white-space: nowrap;
  }
</style>
<script>
  import AuthResource from '@/model/resource/AuthResource';

  const DEAULT_MIN_WIDTH = 120;

  function createTableHeader({ colCfgMap = {}, hideColSet = [],
    disableColSet = [] }) {
    const ret = [];
    Object.entries(colCfgMap).forEach(([k, v]) => {
      // 不显示隐藏列和不可用列
      if (!hideColSet.includes(k) && !disableColSet.includes(k)) {
        ret.push(v);
      }
    });
    return ret;
  }

  export default {
    props: {
      desc: {
        type: Object,
        required: true,
      },
      constraint: Object,
      data: {
        type: Array,
        required: true,
      },
      entityId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
      };
    },
    computed: {
      header() {
        return createTableHeader(this.desc);
      },
      isShowUpdateButton() {
        return AuthResource.isCanUpdate(this.entityId);
      },
      isShowDeleteButton() {
        return AuthResource.isCanDelete(this.entityId);
      },
      controlColumnWidth() {
        return '30px';
      },
    },
    methods: {
      /**
       * 根据列名计算使其能够完全显示
       */
      renderHeader(h, { column }) {
        const col = column;
        this.$refs.calcTextWidth.innerHTML = column.label;
        let width = this.$refs.calcTextWidth.clientWidth + 1;
        if (width < DEAULT_MIN_WIDTH) {
          width = DEAULT_MIN_WIDTH;
        }
        if (width > column.minWidth && width > column.realWidth) {
          width += 18;
          col.width = width;
          col.realWidth = width;
        }
        return h(
          'div',
          {
            domProps: {
              innerHTML: col.label,
            },
          },
        );
      },
      doUpdate(row) {
        this.$emit('update', row);
      },
    },
  };
</script>
