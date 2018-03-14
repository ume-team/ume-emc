<template>
  <el-menu default-active="2"
    background-color="#324157"
    text-color="#bfcbd9"
    active-text-color="#ffd04b"
    @select="doSelect"
    :default-active="activeMenu"
    :collapse="collapse">
    <system-menu-item v-for="menuItem in menuData"
      :key="menuItem.resIndex"
      :menuItemData="menuItem"
      :collapse="collapse">
    </system-menu-item>
  </el-menu>
</template>

<script>
import { util } from 'setaria';
import SystemMenuItem from '@/component/menu/SystemMenuItem';
import AuthResource from '@/model/resource/AuthResource';

const ENTITY_ADD_PREFIX = '新增';
const ENTITY_SEARCH_PREFIX = '查询';

export default {
  name: 'SystemMenu',
  props: {
    data: Array,
    activeMenu: String,
    collapse: Boolean,
  },
  computed: {
    menuData() {
      return this.createMenuData(this.$props.data);
    },
  },
  methods: {
    /**
     * 菜单项选中事件处理
     * @event
     */
    doSelect(index, indexPath) {
      this.$emit('select', index, indexPath);
    },
    /**
     * 创建菜单子项目
     */
    createEntityMenuItem(entity) {
      const children = [];
      const resIndex = entity.resIndex;
      if (AuthResource.isCanSearch(entity.resId)) {
        children.push({
          name: `${ENTITY_SEARCH_PREFIX}${entity.resName}`,
          // index: `/entity/search/${entity.resId}`,
          index: `EntitySearch/${entity.resId}`,
        });
      }
      if (AuthResource.isCanCreate(entity.resId)) {
        children.push({
          name: `${ENTITY_ADD_PREFIX}${entity.resName}`,
          index: `EntityCreate/${entity.resId}`,
        });
      }
      return {
        name: entity.resName,
        index: entity.resId,
        resIndex,
        children,
      };
    },
    /**
     * 生成菜单项目列表数据
     *
     * @public
     * @param  {array} sysUserAclList 系统用户可访问资源列表
     * @return {array} 菜单项目列表数据
     */
    createMenuData(sysUserAclList = []) {
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
              index: resGroup,
              children: [],
            });
          }
        } else {
          parentMenuItemNameList.push(resGroup);
          menuList.push(this.createEntityMenuItem(item));
        }
      });
      // 填充resGroup节点
      menuList.forEach((menuItem) => {
        // 如果是resGroup菜单的场合
        if (!util.isEmpty(menuItem.resGroup)) {
          sysUserAclList.forEach((sysUserAclItem) => {
            // 添加菜单子项目
            if (util.isEqual(sysUserAclItem.resGroup, menuItem.resGroup)) {
              // 添加Entity菜单项
              if (sysUserAclItem.resType === 1 || sysUserAclItem.resType === 90) {
                menuItem.children.push(this.createEntityMenuItem(sysUserAclItem));
              // 添加类别为外部链接的菜单项
              } else if (sysUserAclItem.resType === 91) {
                menuItem.children.push({
                  name: sysUserAclItem.resName,
                  index: sysUserAclItem.resLink,
                  type: 'link',
                });
              }
            }
          });
          // 使用resIndex进行升序排列
          if (menuItem.children.length > 0) {
            menuItem.children.sort((a, b) => a.resIndex - b.resIndex);
          }
        }
      });
      return menuList;
    },
  },
  components: {
    SystemMenuItem,
  },
};
</script>
