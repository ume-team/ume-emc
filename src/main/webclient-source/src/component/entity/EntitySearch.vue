<template>
  <div>
    <ume-entity-table
      :entity-id="entityId"
      :desc="entityDesc"
      :data="entityData"
      :constraint="entityConstraint"
      @update="doUpdate"
      @delete="doDelete">
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
    <ume-dialog
      width="40%"
      top="1vh"
      :visible.sync="isShowUpdateForm"
      :close-on-click-modal="false"
      title="修改数据"
      @close="doUpdateFormClose">
      <entity-update
        :entity-id="selectedEntityId"
        :primary-keys="selectedEntityPrimaryKeys"
        @submit="doUpdateSuccessful"
        @cancel="doCancelUpdate">
      </entity-update>
    </ume-dialog>
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
  import { config, Message } from 'setaria';
  import { Notice } from '@/component/ui';
  import EntityResource from '@/model/resource/EntityResource';
  import UmeEntityTable from './UmeEntityTable';
  import EntityUpdate from './EntityUpdate';

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
        currentPage: 1,
        pageSize: config.env.TABLE_PAGE_SIZE,
        totalCount: 0,
        isShowUpdateForm: false,
        selectedEntityId: '',
        selectedEntityPrimaryKeys: null,
      };
    },
    computed: {
      entityId() {
        return this.$route.params.id;
      },
    },
    created() {
      this.doFetch();
    },
    watch: {
      $route: 'doFetch',
      currentPage: {
        handler(val) {
          this.searchCondition.theFetchStart = (val - 1) * this.pageSize;
          this.doFetch();
        },
      },
      pageSize: {
        handler(val) {
          this.searchCondition.theFetchSize = val;
          this.doFetch();
        },
      },
    },
    methods: {
      doFetch() {
        const getEmDesc = EntityResource.getEmDesc(this.entityId);
        const getEmConstraint = EntityResource.getEmConstraint(this.entityId);
        const getEmDataList = EntityResource.getEmDataWithConstraintsList(this.entityId,
          this.searchCondition);
        const getEmDataCount = EntityResource.getEmDataCount(this.entityId,
          this.searchCondition);
        Promise.all([getEmDesc, getEmConstraint, getEmDataList, getEmDataCount])
          .then((res) => {
            this.entityDesc = res[0];
            this.entityConstraint = res[1];
            this.entityData = res[2];
            this.totalCount = res[3];
          });
      },
      doSearch() {
        this.currentPage = 1;
        this.doFetch();
      },
      doResultListCurrentChange(val) {
        this.$set(this, 'currentPage', val);
      },
      doResultListSizeChange(val) {
        this.$set(this, 'pageSize', val);
      },
      doUpdate(val) {
        EntityResource.getEmPrimaryObj(this.entityId, val)
          .then((res) => {
            this.$set(this, 'selectedEntityId', this.entityId);
            this.$set(this, 'selectedEntityPrimaryKeys', res);
            this.$set(this, 'isShowUpdateForm', true);
          });
      },
      doUpdateSuccessful() {
        this.isShowUpdateForm = false;
        this.doFetch();
      },
      doCancelUpdate() {
        this.isShowUpdateForm = false;
      },
      doDelete(val) {
        Notice.showMessageBox(new Message('MBM002I'))
          .then(() => {
            EntityResource.deleteEmData(this.entityId, val)
              .then(() => {
                Notice.showMessage(new Message('MBM001I', ['', '删除']));
                this.doFetch();
              });
          })
          .catch(() => {
          });
      },
      doUpdateFormClose() {
        this.$set(this, 'selectedEntityId', '');
        this.$set(this, 'selectedEntityPrimaryKeys', {});
      },
    },
    components: {
      UmeEntityTable,
      EntityUpdate,
    },
  };
</script>
