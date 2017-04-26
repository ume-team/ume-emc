<template>
  <el-date-picker
    :size="size"
    :format="format"
    :readonly="readonly"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    :popperClass="popperClass"
    :editable="editable"
    :align="align"
    :value="internalValue"
    :rangeSeparator="rangeSeparator"
    :pickerOptions="internalPickerOptions"
    :type="type"
    @input="doInput">
  </el-date-picker>
</template>
<script>
  import Util from '@/model/Util';

  export default {
    name: 'UmeDatePicker',
    props: {
      size: String,
      format: String,
      readonly: Boolean,
      placeholder: String,
      disabled: Boolean,
      clearable: {
        type: Boolean,
        default: true,
      },
      popperClass: String,
      editable: {
        type: Boolean,
        default: true,
      },
      align: {
        type: String,
        default: 'left',
      },
      value: {},
      rangeSeparator: {
        default: ' - ',
      },
      pickerOptions: Object,
      type: {
        type: String,
        default: 'Date',
      },
      valueFormat: String,
    },
    computed: {
      internalValue() {
        // bugfix: 解决firefox下如果输入值为字符串并且格式为YYYY-MM-DD HH:mm:ss时，日期控件无法显示输入值的问题
        let ret = null;
        if (Util.isArray(this.value)) {
          ret = this.value.map(item => this.stringToDate(item));
        } else {
          ret = this.stringToDate(this.value);
        }
        return ret;
      },
      internalPickerOptions() {
        let ret = {};
        if (this.type === 'datetimerange' ||
            this.type === 'daterange') {
          if (!Util.isEmpty(this.pickerOptions)) {
            ret = this.pickerOptions;
          } else {
            ret = {
              shortcuts: [
                {
                  text: '今天',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    picker.$emit('pick', [start, end]);
                  },
                },
                {
                  text: '最近一周',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - (3600 * 1000 * 24 * 7));
                    picker.$emit('pick', [start, end]);
                  },
                },
                {
                  text: '最近一个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - (3600 * 1000 * 24 * 30));
                    picker.$emit('pick', [start, end]);
                  },
                },
                {
                  text: '最近三个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - (3600 * 1000 * 24 * 90));
                    picker.$emit('pick', [start, end]);
                  },
                },
              ],
            };
          }
        }
        return ret;
      },
    },
    methods: {
      doInput(val) {
        let ret = null;
        if (Util.isArray(val)) {
          const isEmpty = val.every(item => !Util.isDate(item));
          ret = isEmpty ?
            null : val.map(item => this.formatValue(item, this.valueFormat));
        } else {
          ret = this.formatValue(val, this.valueFormat);
          ret = (ret === '') ? null : ret;
        }
        this.$emit('input', ret);
      },
      formatValue(val, valueFormat) {
        let ret = val;
        if (!Util.isEmpty(valueFormat)) {
          ret = Util.formatDate(val, valueFormat);
        }
        return ret;
      },
      stringToDate(val) {
        return Util.isDate(val) ? val : Util.toDate(val);
      },
    },
  };
</script>
