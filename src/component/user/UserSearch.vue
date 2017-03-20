<template>
  <div>
    <div class="page-title">查询用户</div>
    <el-card class="box-card search-condition">
      <el-form ref="form" :model="form" label-width="80px" label-position="right">
        <el-col :span="12">
          <el-form-item label="用户名称" prop="USER_NAME">
            <el-input v-model="form.USER_NAME"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户手机" prop="USER_MOBILE">
            <el-input v-model="form.USER_MOBILE"></el-input>
          </el-form-item>
        </el-col>
        <!-- 更多项目 -->
        <el-col :span="12" :offset="6">
          <el-form-item>
            <el-button type="primary" size="large" class="search-button" native-type="submit" @click="doSearch()">查询用户</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
    <el-row justify="end" type="flex" class="create-button-container">
      <el-button type="primary" size="large" class="create-button" @click="doCreate()">新增用户</el-button>
    </el-row>
    <el-table border stripe class="search-list" :data="searchList">
      <el-table-column prop="USER_ID" label="用户识别ID">
      </el-table-column>
      <el-table-column prop="USER_NAME" label="用户名称">
      </el-table-column>
      <el-table-column prop="USER_MOBILE" label="用户手机">
      </el-table-column>
      <!-- 更多项目 -->
      <el-table-column fixed="right" label="操作" :width="200">
        <template scope="scope">
          <el-button size="small">详情</el-button>
          <el-button size="small" @click="doUpdate(scope.$index, scope.row)">更新</el-button>
          <el-button size="small" @click="doDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="search-pagination"
      @size-change="pageSizeChange"
      @current-change="pageCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next"
      :total="totalSearchListCount">
    </el-pagination>
  </div>
</template>
<script>
import ui from '@/model/ui';
import util from '@/model/util';
import resource from '@/resource';

export default {
  /**
   * 数据绑定对象
   */
  data() {
    return {
      // 检索条件表单
      form: {
        USER_NAME: '',
        USER_MOBILE: '',
      },
      // 检索结果
      searchList: [],
      // 检索条件对象(TableObject)
      searchParam: {
        theSQLCondition: '',
        theOrderByCondition: '',
        theGroupByCondition: '',
        theFetchStart: 0,
        theFetchSize: 10,
      },
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
     */
    doFetch() {
      const param = {};
      // 生成查询参数
      Object.keys(this.searchParam).forEach((key) => {
        if (util.isNumber(this.searchParam[key])) {
          param[key] = this.searchParam[key];
        } else if (!util.isEmpty(this.searchParam[key])) {
          param[key] = this.searchParam[key];
        }
      });
      // 根据查询条件进行数据检索
      resource.invoke('EMWS20001', ['Retrieve', 'EM_USER', param]).then((res) => {
        this.searchList = res;
      });
    },
    /**
     * 检索数据
     * @event
     */
    doSearch() {
      let theSQLCondition = '';
      Object.keys(this.form).forEach((key) => {
        if (!util.isEmpty(this.form[key])) {
          if (theSQLCondition !== '') {
            theSQLCondition += ' AND ';
          }
          theSQLCondition += `${key} = '${this.form[key]}'`;
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
      ui.MessageBox.confirm('此操作将删除这条数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const param = {
          USER_ID,
        };
        resource.invoke('EMWS20001', ['Delete', 'EM_USER', param]).then(() => {
          ui.Message('数据已成功删除。');
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
.search-condition, .create-button-container {
  margin-bottom: 20px;
}
.search-condition .search-button {
  width: 300px;
}
.create-button {
  width: 200px;
}
.search-list {
  width: 100%;
  margin-bottom: 10px;
}
.search-pagination {
  text-align: right;
}
</style>
