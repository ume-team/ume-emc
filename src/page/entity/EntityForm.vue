<template>
  <div>
    <ume-dynamic-form
      class="ume-entity-form"
      :model="formData"
      :schema="schema"
      :ui-schema="uiSchema"
      label-width="180px"
      :columns="columns"
      @submit="doSubmit">
      <div slot="button" class="form-button-container">
        <ume-button class="form-button" type="primary" native-type="submit">保存</ume-button>
        <ume-button class="form-button" @click="doCancel">返回</ume-button>
      </div>
    </ume-dynamic-form>
  </div>
</template>
<style>
  .ume-entity-form .el-dynamic-form--component {
    width: 50% !important;
    min-width: 300px;
  }
  .ume-entity-form  .form-button-container {
    margin-left: 180px;
  }
  .ume-entity-form  .form-button-container .form-button {
    width: 100px;
  }
</style>
<script>
import { util } from 'setaria';
import EntityResource from '@/model/resource/EntityResource';

export default {
  props: {
    entityId: String,
    primaryKeys: Object,
    columns: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      schema: {},
      uiSchema: null,
      formData: null,
    };
  },
  created() {
    this.doFetch();
  },
  methods: {
    doFetch() {
      // EntityResource.getEmDataByPrimaryKey(this.entityId, this.primaryKeys)
      //   .then((entityData) => {
      //     console.log(entityData);
      //   });
      EntityResource.getEmDescSchema(this.entityId)
        .then((res) => {
          // 新增数据的场合，创建空的数据对象
          if (util.isEmpty(this.primaryKeys)) {
            this.formData = {};
            Object.keys(res.schema.properties).forEach((key) => {
              this.$set(this.formData, key, null);
            });
            this.schema = res.schema;
            this.uiSchema = res.uiSchema;
          } else {
            EntityResource.getEmDataByPrimaryKey(this.entityId, this.primaryKeys)
              .then((data) => {
                this.formData = data;
                this.schema = res.schema;
                this.uiSchema = res.uiSchema;
              });
          }
        });
    },
    doSubmit() {
      this.$emit('submit', this.formData);
    },
    doCancel() {
      this.$emit('cancel');
    },
  },
};
</script>
