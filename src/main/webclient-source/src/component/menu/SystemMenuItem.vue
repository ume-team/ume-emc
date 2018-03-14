<template>
  <el-submenu v-if="menuItemData.children" :index="menuItemData.index">
    <template slot="title">
      <i class="el-icon-menu"></i>
      <span>{{ menuItemData.name }}</span>
    </template>
    <el-menu-item-group :title="menuItemData.name" v-if="collapse">
      <system-menu-item
        v-for="menuChildrenItem in menuItemData.children"
        :key="menuChildrenItem.resIndex"
        :menuItemData="menuChildrenItem">
      </system-menu-item>
    </el-menu-item-group>
    <system-menu-item
      v-for="menuChildrenItem in menuItemData.children"
      :key="menuChildrenItem.resIndex"
      :menuItemData="menuChildrenItem"
      v-else>
    </system-menu-item>
  </el-submenu>
  <el-menu-item v-else-if="menuItemData" :index="menuItemData.index">
    <template v-if="menuItemData.type === 'link'">
      <i class="fa fa-link" aria-hidden="true"></i> {{ menuItemData.name }}
    </template>
    <template v-else>
      {{ menuItemData.name }}
    </template>
  </el-menu-item>
</template>
<style>
  .el-menu--collapse .el-menu-item-group__title {
    height: 30px;
    font-weight: 900;
  }
</style>
<script>
import SystemMenuItem from '@/component/menu/SystemMenuItem';

export default {
  name: 'SystemMenuItem',
  props: {
    menuItemData: Object,
    collapse: Boolean,
  },
  components: {
    SystemMenuItem,
  },
};
</script>
