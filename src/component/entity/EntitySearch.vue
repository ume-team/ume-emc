<template>
  <div>
    <ume-collapse v-model="collapseValue" class="search-condition">
      <ume-collapse-item title="搜索" name="search">
        <ume-dynamic-form
          class="entity-search-form"
          label-width="80px"
          :schema="entitySearchFormSchema"
          :ui-schema="entitySearchFormUiSchema"
          :model="searchCondition"
          @submit="doSearch">
          <ume-button class="search-button" type="primary" slot="button" native-type="submit">搜索</ume-button>
        </ume-dynamic-form>
      </ume-collapse-item>
    </ume-collapse>
    <ume-entity-table :desc="entityDesc" :data="entityData" :accLevel="4">
    </ume-entity-table>
    <div class="search-result-pagination">
      <ume-pagination
        :page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="currentPage"
        :total="totalCount"
        @current-change="doResultListCurrentChange"
        @size-change="doResultListSizeChange">
      </ume-pagination>
    </div>
  </div>
</template>
<style scoped>
  .search-condition {
    margin-bottom: 10px;
  }
  .search-button {
    width: 100px;
  }
  .search-result-pagination {
    text-align: right;
    margin-top: 10px;
  }
</style>
<script>
import EntityDescResource from '@/model/resource/EntityDescResource';
import BizUtil from '@/model/BizUtil';
import UmeEntityTable from './UmeEntityTable';

export default {
  data() {
    return {
      collapseValue: 'search',
      entityDesc: {},
      entityConstraint: {},
      entityData: [],
      searchCondition: {
        theSQLCondition: '',
        theFetchStart: 0,
        theFetchSize: 10,
      },
      entitySearchFormSchema: {
        properties: {
          theSQLCondition: {
            type: 'string',
            title: '搜索条件',
          },
        },
      },
      entitySearchFormUiSchema: {
        theSQLCondition: {
          'ui:widget': 'textarea',
        },
      },
      currentPage: 1,
      pageSize: parseInt(BizUtil.getConfigValue('TABLE_PAGE_SIZE'), 10),
      totalCount: 0,
    };
  },
  created() {
    this.doFetch();
  },
  watch: {
    $route: 'doFetch',
    currentPage: {
      immediate: true,
      handler(val) {
        this.searchCondition.theFetchStart = (val - 1) * this.pageSize;
      },
    },
    pageSize: {
      immediate: true,
      handler(val) {
        this.searchCondition.theFetchSize = val;
      },
    },
  },
  methods: {
    doFetch() {
      const entityId = this.$route.params.id;
      const getEmDesc = EntityDescResource.getEmDesc(entityId);
      const getEmData = EntityDescResource.getEmData(entityId,
        this.searchCondition);
      const getEmDataCount = EntityDescResource.getEmDataCount(entityId,
        this.searchCondition);
      Promise.all([getEmDesc, getEmData, getEmDataCount])
        .then((res) => {
          this.entityDesc = res[0];
          this.entityData = res[1];
          this.totalCount = res[2];
        });
    },
    doSearch() {
      this.currentPage = 1;
      this.doFetch();
    },
    doResultListCurrentChange(val) {
      this.currentPage = val;
      this.doFetch();
    },
    doResultListSizeChange(val) {
      this.pageSize = val;
      this.doFetch();
    },
  },
  components: {
    UmeEntityTable,
  },
};
</script>
