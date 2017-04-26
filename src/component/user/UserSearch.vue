<template>
  <div>
    <div class="page-title">查询用户</div>
    <ume-card class="box-card search-condition">
      <ume-form ref="form" :model="emUserSearchDTO" :rules="emUserSearchFormRule" label-width="80px" label-position="right" @submit="doSearch">
        <ume-row>
          <ume-col :span="9">
            <ume-form-item label="用户名称" prop="USER_NAME">
              <ume-input v-model="emUserSearchDTO.USER_NAME"></ume-input>
            </ume-form-item>
          </ume-col>
          <ume-col :span="9">
            <ume-form-item label="用户手机" prop="USER_MOBILE">
              <ume-input v-model="emUserSearchDTO.USER_MOBILE"></ume-input>
            </ume-form-item>
          </ume-col>
          <ume-col :span="6">
            <ume-button type="primary" class="search-button" native-type="submit">查询用户</ume-button>
          </ume-col>
        </ume-row>
      </ume-form>
    </ume-card>
    <ume-row justify="end" type="flex" class="create-button-container">
      <ume-button type="primary" class="create-button" @click="doCreate()">新增用户</ume-button>
    </ume-row>
    <ume-table border stripe class="search-list" :data="searchList">
      <ume-table-column prop="USER_ID" label="用户识别ID">
      </ume-table-column>
      <ume-table-column prop="USER_NAME" label="用户名称">
      </ume-table-column>
      <ume-table-column prop="USER_MOBILE" label="用户手机">
      </ume-table-column>
      <!-- 更多项目 -->
      <ume-table-column fixed="right" label="操作" :width="200">
        <template scope="scope">
          <ume-button size="small">详情</ume-button>
          <ume-button size="small" @click="doUpdate(scope.$index, scope.row)">更新</ume-button>
          <ume-button size="small" @click="doDelete(scope.$index, scope.row)">删除</ume-button>
        </template>
      </ume-table-column>
    </ume-table>
    <ume-pagination
      class="search-pagination"
      @size-change="pageSizeChange"
      @current-change="pageCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next"
      :total="totalSearchListCount">
    </ume-pagination>
  </div>
</template>
<script>
import { Notice } from '@/component/ui';
import EmUserSearchDTO from '@/model/dto/EmUserSearchDTO';
import TableObjectDTO from '@/model/dto/TableObjectDTO';
import emUserSearchFormRule from '@/model/rule/EmUserSearchFormRule';
import Message from '@/model/Message';
import Util from '@/model/Util';

export default {
  /**
   * 数据绑定对象
   */
  data() {
    return {
      // 检索条件表单
      emUserSearchDTO: new EmUserSearchDTO(),
      emUserSearchFormRule,
      // 检索结果
      searchList: [],
      // 检索条件对象(TableObject)
      searchParam: new TableObjectDTO(),
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
