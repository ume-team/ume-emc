<template>
  <el-submenu v-if="menuItemData.children" :index="menuItemData.index">
    <template slot="title">{{ menuItemData.name }}</template>
    <ume-menu-item v-for="menuChildrenItem in menuItemData.children" :key="menuChildrenItem.resIndex" :menuItemData="menuChildrenItem"></ume-menu-item>
  </el-submenu>
  <el-menu-item v-else-if="menuItemData" :index="menuItemData.index">
    {{ menuItemData.name }}
  </el-menu-item>
</template>

<script>
import UmeMenuItem from '@/component/menu/UmeMenuItem';

export default {
  name: 'ume-menu-item',
  props: {
    menuItemData: Object,
  },
  components: {
    UmeMenuItem,
  },
};
</script>
