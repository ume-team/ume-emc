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
      const serviceList = [
        {
          id: 'EMS10001',
          param: [entityID],
        },
        {
          id: 'EMS10002',
          param: [entityID],
        },
        {
          id: 'EMS20001',
          param: ['Retrieve', entityID, { theFetchStart: 0, theFetchSize: 10 }],
        },
      ];
      this.$service.callMulti(serviceList)
        .then((res) => {
          this.entityDesc = res[0];
          this.entityConstraint = res[1];
          this.entityData = res[2];
        });
    },
  },
  components: {
    UmeEntityTable,
  },
};
</script>
