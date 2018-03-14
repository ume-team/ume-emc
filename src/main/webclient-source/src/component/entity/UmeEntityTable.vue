<template>
  <div>
    <ume-table border stripe class="ume-entity-table" :data="data" ref="entityTable">
      <ume-table-column
        v-for="col in header"
        :label="col.colName"
        :key="col.colId"
        :align="getColumnAlign(col)"
        show-overflow-tooltip
        :render-header="renderHeader">
        <template slot-scope="scope">
          <span v-if="typeof scope.row[col.colId] === 'object'">{{ scope.row[col.colId].label }}</span>
          <span v-else>{{ scope.row[col.colId] }}</span>
        </template>
      </ume-table-column>
      <ume-table-column fixed="right" label="操作" :width="controlColumnWidth">
        <template slot-scope="scope">
          <div class="control-button-container">
            <ume-button type="text" @click="doUpdate(scope.row)" v-if="isShowUpdateButton">修改</ume-button>
            <span class="button-separator" v-if="isShowUpdateButton && isShowDeleteButton">|</span>
            <ume-button type="text" @click="doDelete(scope.row)" v-if="isShowDeleteButton">删除</ume-button>
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
  .control-button-container {
    text-align: center;
  }
  .control-button-container .el-button {
    padding: 0 5px;
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
  const CONTROL_COLUMN = 140;
  // Element的Table组件内header-render属性被调用 5 * list.length次

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
        controlColumnWidth: `${CONTROL_COLUMN}px`,
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
    },
    methods: {
      /**
       * 根据列名计算使其能够完全显示
       */
      renderHeader(h, { column, $index }) {
        const col = column;
        if ($index === 0) {
          this.totalColumnWidth = 0;
        }
        this.$refs.calcTextWidth.innerHTML = column.label;
        let width = this.$refs.calcTextWidth.clientWidth + 20;
        if (width < DEAULT_MIN_WIDTH) {
          width = DEAULT_MIN_WIDTH;
        }
        if (width > col.minWidth) {
          col.minWidth = width;
        }
        return h(
          'span',
          {
            domProps: {
              innerHTML: col.label,
            },
          },
        );
      },
      /**
       * 修改按钮点击事件处理
       * @event
       */
      doUpdate(row) {
        this.$emit('update', row);
      },
      /**
       * 删除按钮点击事件处理
       * @event
       */
      doDelete(row) {
        this.$emit('delete', row);
      },
      /**
       * 取得当前列的对齐方式
       */
      getColumnAlign(entityColCfg) {
        // 当前项目为数字的场合，右对齐
        return (entityColCfg.dataJdbcType === -5 ||
          entityColCfg.dataJdbcType === 2 ||
          entityColCfg.dataJdbcType === 3 ||
          entityColCfg.dataJdbcType === 4 ||
          entityColCfg.dataJdbcType === 6 ||
          entityColCfg.dataJdbcType === 7 ||
          entityColCfg.dataJdbcType === 8) ?
            'right' : 'left';
      },
    },
  };
</script>
