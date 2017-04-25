<template>
  <el-table border stripe class="ume-entity-table" :data="data">
    <el-table-column v-for="col in header" :label="col.colName" :prop="col.colId" :key="col.colId" :width="col.$width">
    </el-table-column>
    <el-table-column fixed="right" label="操作" :width="controlColumnWidth">
      <template scope="scope">
        <el-button size="small" v-show="isShowDetail">详情</el-button>
        <el-button size="small" v-show="isShowUpdate">更新</el-button>
        <el-button size="small" v-show="isShowDelete">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Util from '@/model/Util';

const DEFAULT_COLUMN_WIDTH = 150;

function createTableHeader({ colCfgMap = {}, hideColSet = [],
  disableColSet = [] }, columnDispConfig = {}) {
  const ret = [];
  Object.entries(colCfgMap).forEach(([k, v]) => {
    const colItem = v;
    if (!hideColSet.includes(k) && !disableColSet.includes(k)) {
      const colDispCfg = !Util.isEmpty(columnDispConfig[k]) ?
        columnDispConfig[k] : {};
      // 设置列的宽度
      colItem.$width = Util.isNumber(colDispCfg.width) ?
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
      const width = (this.accLevel * 10) + (this.accLevel * 40);
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
