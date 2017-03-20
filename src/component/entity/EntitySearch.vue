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
    this.fetchData();
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      const entityID = this.$route.params.id;
      this.$http.post('EMWS10001', [entityID]).then((res) => {
        this.entityDesc = res.body;
        return this.$http.post('EMWS10002', [entityID]);
      }).then((res) => {
        this.entityConstraint = res.body;
        return this.$http.post('EMWS20001', ['Retrieve', entityID,
        { theOrderByCondition: 'USER_ID desc', theFetchStart: 0, theFetchSize: 10 }]);
      }).then((res) => {
        this.entityData = res.body;
      });
    },
  },
  components: {
    UmeEntityTable,
  },
};
</script>
