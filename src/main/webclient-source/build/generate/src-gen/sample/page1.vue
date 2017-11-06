<template>
  <div>
    <div class="page-title">查询</div>
    <ume-card class="box-card search-condition">
      <ume-form ref="form" label-width="80px" label-position="right">
        <ume-row>
          <ume-col :span="9">
            <ume-form-item label="数字" prop="number">
              <ume-number v-model="searchParam.number"></ume-number>
            </ume-form-item>
          </ume-col>
          <ume-col :span="9">
            <ume-form-item label="英文" prop="english">
              <ume-input v-model="searchParam.english"></ume-input>
            </ume-form-item>
          </ume-col>
          <ume-col :span="9">
            <ume-form-item label="英文数字" prop="halfChar">
              <ume-input v-model="searchParam.halfChar"></ume-input>
            </ume-form-item>
          </ume-col>
          <ume-col :span="9">
            <ume-form-item label="文字" prop="text">
              <ume-input v-model="searchParam.text"></ume-input>
            </ume-form-item>
          </ume-col>
        </ume-row>
      </ume-form>
    </ume-card>
  </div>
</template>
<script>
  import { Notice } from '@/component/ui';
  import Message from '@/model/Message';
  import Util from '@/model/Util';

  export default {
    /**
     * 数据绑定对象
     */
    data() {
      return {
        // 检索条件对象
        searchParam: {
          number: null,
          english: null,
          halfChar: null,
          text: null,
        },
        // 检索结果
        searchList: [],
        // 当前页号
        currentPage: 1,
        // 当前每页显示条数
        pageSize: 10,
      };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
      totalSearchListCount() {
        return this.searchList.length;
      },
    },
    /**
     * @event
     * 组件初始化事件处理
     */
    created() {
      this.doFetch();
    },
    /**
     * 数据观察对象
     */
    watch: {
      $route: 'doFetch',
    },
    /**
     * 组件逻辑处理函数
     */
    methods: {
      /**
       * 取得数据
       * @event
       */
      doFetch() {
        const param = {};
        if (!Util.isNumber(this.searchParam.theFetchStart)) {
          this.searchParam.theFetchStart = 0;
        }
        if (!Util.isNumber(this.searchParam.theFetchSize)) {
          this.searchParam.theFetchSize
            = parseInt(Util.getConfigValue('TABLE_PAGE_SIZE'), 10);
        }
        // 生成查询参数
        Object.keys(this.searchParam).forEach((key) => {
          if (Util.isNumber(this.searchParam[key])) {
            param[key] = this.searchParam[key];
          } else if (!Util.isEmpty(this.searchParam[key])) {
            param[key] = this.searchParam[key];
          }
        });

        // 根据查询条件检索数据
        this.$root.callService('EMS20001', ['Retrieve', 'EM_USER', param])
          .then((res) => {
            this.searchList = res;
          });
      },
      /**
       * 检索数据
       * @event
       */
      doSearch() {
        let theSQLCondition = '';
        Object.keys(this.emUserSearchDTO).forEach((key) => {
          if (!Util.isEmpty(this.emUserSearchDTO[key])) {
            if (theSQLCondition !== '') {
              theSQLCondition += ' AND ';
            }
            theSQLCondition += `${key} = '${this.emUserSearchDTO[key]}'`;
          }
        });
        this.searchParam.theSQLCondition = theSQLCondition;
        this.doFetch();
      },
      /**
       * 新增用户按钮点击事件处理
       * @event
       */
      doCreate() {
        this.$router.push({ name: 'UserCreate' });
      },
      /**
       * 更新按钮点击事件处理
       * @event
       * @param  {Number} index           选择的行号
       * @param  {String} options.USER_ID 选择的用户ID
       */
      doUpdate(index, { USER_ID }) {
        this.$router.push({ name: 'UserUpdate', params: { USER_ID } });
      },
      /**
       * 删除按钮点击事件处理
       * @event
       * @param  {Number} index           选择的行号
       * @param  {String} options.USER_ID 选择的用户ID
       */
      doDelete(index, { USER_ID }) {
        Notice.showMessageBox({
          message: new Message('MCM004W').getMessage(),
        }).then(() => {
          const param = {
            USER_ID,
          };
          // 调用服务删除指定用户
          this.$root.callService('EMS20001', ['Delete', 'EM_USER', param]).then(() => {
            const message = new Message('MCM003I', ['用户']);
            Notice.showMessage({
              message,
            });
          });
        });
      },
      /**
       * 修改表格每页显示条数事件处理
       * @event
       * @param  {Number} val 表格每页显示条数
       */
      pageSizeChange(val) {
        this.searchParam.theFetchSize = val;
        this.pageSize = val;
        this.doFetch();
      },
      /**
       * 翻页事件处理
       * @event
       * @param  {Number} val 当前页号
       */
      pageCurrentChange(val) {
        this.searchParam.theFetchStart = (val - 1) * this.pageSize;
        this.doFetch();
      },
    },
  };
</script>
<style scoped>
  .search-condition .search-button {
    width: 120px;
    margin-left: 10px;
  }
  .search-condition, .create-button-container {
    margin-bottom: 20px;
  }
  .search-list {
    width: 100%;
    margin-bottom: 10px;
  }
  .search-pagination {
    text-align: right;
  }
</style>
