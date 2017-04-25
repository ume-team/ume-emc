<template>
  <el-submenu v-if="menuItemData.children" :index="menuItemData.index">
    <template slot="title">{{ menuItemData.name }}</template>
    <system-menu-item v-for="menuChildrenItem in menuItemData.children" :key="menuChildrenItem.resIndex" :menuItemData="menuChildrenItem"></system-menu-item>
  </el-submenu>
  <el-menu-item v-else-if="menuItemData" :index="menuItemData.index">
    {{ menuItemData.name }}
  </el-menu-item>
</template>

<script>
import SystemMenuItem from '@/component/menu/SystemMenuItem';

export default {
  name: 'SystemMenuItem',
  props: {
    menuItemData: Object,
  },
  components: {
    SystemMenuItem,
  },
};
</script>
