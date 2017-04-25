<template>
  <div>
    <ume-entity-table :desc="entityDesc" :data="entityData" :accLevel="4">
    </ume-entity-table>
  </div>
</template>
<script>
import UmeEntityTable from './UmeEntityTable';

export default {
  data() {
    return {
      entityDesc: {},
      entityConstraint: {},
      entityData: [],
    };
  },
  created() {
    this.doFetch();
  },
  watch: {
    $route: 'doFetch',
  },
  methods: {
    doFetch() {
      const entityID = this.$route.params.id;
      this.$root.callService('EMS10001', [entityID]).then((res) => {
        this.entityDesc = res;
        return this.$root.callService('EMS10002', [entityID]);
      }).then((res) => {
        this.entityConstraint = res;
        return this.$root.callService('EMS20001', ['Retrieve', entityID,
        { theOrderByCondition: 'USER_ID desc', theFetchStart: 0, theFetchSize: 10 }]);
      }).then((res) => {
        this.entityData = res;
      });
    },
  },
  components: {
    UmeEntityTable,
  },
};
</script>
