<template>
  <ume-table border stripe class="ume-entity-table" :data="data">
    <ume-table-column v-for="col in header" :label="col.colName" :prop="col.colId" :key="col.colId" :width="col.$width">
    </ume-table-column>
    <ume-table-column fixed="right" label="操作" :width="controlColumnWidth">
      <template scope="scope">
        <ume-button-group>
          <ume-button size="small" v-show="isShowDetail">详情</ume-button>
          <ume-button size="small" v-show="isShowUpdate">更新</ume-button>
          <ume-button size="small" v-show="isShowDelete">删除</ume-button>
        </ume-button-group>
      </template>
    </ume-table-column>
  </ume-table>
</template>
<script>
import { util } from 'setaria';

const DEFAULT_COLUMN_WIDTH = 150;

function createTableHeader({ colCfgMap = {}, hideColSet = [],
  disableColSet = [] }, columnDispConfig = {}) {
  const ret = [];
  Object.entries(colCfgMap).forEach(([k, v]) => {
    const colItem = v;
    if (!hideColSet.includes(k) && !disableColSet.includes(k)) {
      const colDispCfg = !util.isEmpty(columnDispConfig[k]) ?
        columnDispConfig[k] : {};
      // 设置列的宽度
      colItem.$width = util.isNumber(colDispCfg.width) ?
        colDispCfg.width : DEFAULT_COLUMN_WIDTH;
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
    columnDispConfig: {
      type: Object,
      default: () => {},
    },
    accLevel: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    header() {
      return createTableHeader(this.desc, this.columnDispConfig);
    },
    isShowUpdate() {
      return this.accLevel >= 2;
    },
    isShowDelete() {
      return this.accLevel >= 4;
    },
    isShowDetail() {
      return this.accLevel >= 1;
    },
    controlColumnWidth() {
      const width = (this.accLevel * 10) + (this.accLevel * 35);
      return `${width}`;
    },
  },
};
</script>

<style>
.ume-entity-table {
  width: 100%;
}
.ume-entity-table th>.cell {
  text-overflow: initial;
  white-space: nowrap;
}
</style>
