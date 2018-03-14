<template>
  <div>
    <component :is="componentId"
      :entity-id="entityId"
      :primary-keys="primaryKeys"
      :columns="1"
      @submit="doSubmit"
      @cancel="doCancel">
    </component>
  </div>
</template>
<script>
  import { Message, util } from 'setaria';
  import { Notice } from '@/component/ui';
  import EntityResource from '@/model/resource/EntityResource';
  import EntityForm from './EntityForm';

  const FORM_ID = 'entity-form';

  export default {
    props: {
      entityId: {
        type: String,
        required: true,
      },
      primaryKeys: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        componentId: FORM_ID,
      };
    },
    watch: {
      entityId: {
        immediate: true,
        handler(val) {
          if (!util.isEmpty(val)) {
            this.$set(this, 'componentId', FORM_ID);
          } else {
            this.$set(this, 'componentId', '');
          }
        },
      },
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
