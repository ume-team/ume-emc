<template>
  <div>
    <component :is="componentId" :entity-id="entityId" @submit="doSubmit" @cancel="doCancel">
    </component>
  </div>
</template>
<script>
  import { Message } from 'setaria';
  import { Notice } from '@/component/ui';
  import EntityResource from '@/model/resource/EntityResource';
  import EntityForm from './EntityForm';

  export default {
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
    watch: {
      $route: 'reset',
    },
    methods: {
      reset() {
        this.componentId = '';
        this.$nextTick(() => {
          this.componentId = 'entity-form';
        });
      },
      doSubmit(val) {
        EntityResource.createEmData(this.entityId, val)
          .then(() => {
            const option = Object.assign({}, new Message('MBM001I', ['', '新增']), {
              confirmButtonText: '继续添加',
              cancelButtonText: '返回一览',
            });
            Notice.showMessageBox(option)
              .then(() => {
                this.reset();
              })
              .catch(() => {
                this.$router.forwardTo('EntitySearch', this.entityId);
              });
          });
      },
      doCancel() {
        this.$router.go(-1);
      },
    },
    components: {
      EntityForm,
    },
  };
</script>
