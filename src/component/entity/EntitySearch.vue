<template>
  <div>
    <ume-entity-table :desc="entityDesc" :data="entityData" :accLevel="4">
    </ume-entity-table>
  </div>
</template>
<script>
import EntityDescResource from '@/model/resource/EntityDescResource';
import UmeEntityTable from './UmeEntityTable';

export default {
  data() {
    return {
      entityDesc: {},
      entityConstraint: {},
      entityData: [],
      entitySearchCondition: {
        theFetchStart: 0,
        theFetchSize: 10,
      },
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
      const entityId = this.$route.params.id;
      EntityDescResource.getEmDescAndData(
        entityId,
        'Retrieve',
        this.entitySearchCondition)
          .then(({ entityDesc, entityData }) => {
            this.entityDesc = entityDesc;
            this.entityData = entityData;
          });
    },
  },
  components: {
    UmeEntityTable,
  },
};
</script>
