<template>
  <el-menu default-active="2" theme="dark" :router="true" :default-active="activeMenu">
    <ume-menu-item v-for="menuItem in menuData" :key="menuItem.resIndex" :menuItemData="menuItem"></ume-menu-item>
  </el-menu>
</template>

<script>
import UmeMenuItem from '@/common/component/UMEMenuItem';
import util from '@/common/util';

const ENTITY_ADD_PREFIX = '新增';
const ENTITY_SEARCH_PREFIX = '查询';

function createEntityMenuItem(entity) {
  const children = [];
  const resIndex = entity.resIndex;
  if (entity.accLevel > 0) {
    children.push({
      name: `${ENTITY_SEARCH_PREFIX}${entity.resName}`,
      index: `/entity/search/${entity.resId}`,
    });
    if (entity.accLevel === 4) {
      children.push({
        name: `${ENTITY_ADD_PREFIX}${entity.resName}`,
        index: `/entity/create/${entity.resId}`,
      });
    }
  }
  return {
    name: entity.resName,
    index: `entity-${entity.resName}`,
    resIndex,
    children,
  };
}

/**
 * 生成菜单项目列表数据
 *
 * @public
 * @param  {array} sysUserAclList 系统用户可访问资源列表
 * @return {array} 菜单项目列表数据
 */
function createMenuData(sysUserAclList = []) {
  const menuList = [];
  const parentMenuItemNameList = [];
  // 创建菜单父节点
  sysUserAclList.forEach((item) => {
    const resGroup = item.resGroup;
    const resIndex = item.resIndex;
    if (!util.isEmpty(resGroup)) {
      if (!parentMenuItemNameList.includes(resGroup)) {
        parentMenuItemNameList.push(resGroup);
        menuList.push({
          resGroup,
          resIndex,
          name: resGroup,
          index: `parent-${resGroup}`,
          children: [],
        });
      }
    } else {
      parentMenuItemNameList.push(resGroup);
      menuList.push(createEntityMenuItem(item));
    }
  });
  // 填充resGroup节点
  menuList.forEach((menuItem) => {
    // 如果是resGroup菜单的场合
    if (!util.isEmpty(menuItem.resGroup)) {
      sysUserAclList.forEach((sysUserAclItem) => {
        // 添加Entity菜单项
        if (util.isEqual(sysUserAclItem.resGroup, menuItem.resGroup)) {
          menuItem.children.push(createEntityMenuItem(sysUserAclItem));
        }
      });
      // 使用resIndex进行升序排列
      if (menuItem.children.length > 0) {
        menuItem.children.sort((a, b) => a.resIndex - b.resIndex);
      }
    }
  });

  return menuList;
}

export default {
  name: 'ume-menu',
  props: {
    data: Array,
    activeMenu: String,
  },
  computed: {
    menuData() {
      const menuData = createMenuData(this.$props.data);
      return menuData;
    },
  },
  components: {
    UmeMenuItem,
  },
};
</script>
