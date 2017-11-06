<template>
  <div>
    <component :is="componentId" :entity-id="entityId" :primary-keys="primaryKeys"
      @submit="doSubmit" @cancel="doCancel">
    </component>
  </div>
</template>
<script>
  import { Message } from 'setaria';
  import { Notice } from '@/component/ui';
  import EntityResource from '@/model/resource/EntityResource';
  import EntityForm from './EntityForm';

  export default {
    props: {
      primaryKeys: {
        type: Object,
        required: true,
      },
    },
    computed: {
      entityId() {
        return this.$route.params.id;
      },
    },
    data() {
      return {
        componentId: 'entity-form',
      };
    },
    created() {
    },
    methods: {
      doSubmit(val) {
        EntityResource.updateEmData(this.entityId, val)
          .then(() => {
            this.$emit('submit', val);
            Notice.showMessage(new Message('MBM001I', ['', '修改']));
          });
      },
      doCancel() {
        this.$emit('cancel');
      },
    },
    components: {
      EntityForm,
    },
  };
</script>
