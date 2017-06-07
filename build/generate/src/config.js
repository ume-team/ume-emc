module.exports = {
  ROOT_PATH: 'build/generate/',
  OUTPUT_PATH: 'src-gen/',
  DESIGN_FILE_PATH: 'design/UME_ResourceDefinition.xlsx',
  TEMPLATE_FOLDER: 'template/',
  OUTPUTFILE_SUFFIX: '.vue',
  SHEET_NAME: 'Page',
  PAGE_SHEET_CONFIG: {
    PAGE_TITLE: 'C3',
    PAGE_ID: 'C4',
    PAGE_FOLDER: 'C5',
    PAGE_ITEM_START_ROW: 10,
    PAGE_ITEM_MAX_ROW: 1000,
    ITEM_COLUMN: {
      ITEM_NO: 'A',
      ITEM_NAME: 'B',
      ITEM_ID: 'C',
      ITEM_COMPONENT_TYPE: 'D',
      ITEM_VALIDATE_TYPE: 'F',
      ITEM_VALIDATE_IS_NULL: 'G',
      ITEM_VALIDATE_MAX_LENGTH: 'H',
      ITEM_VALIDATE_MIN_LENGTH: 'I',
      ITEM_VALIDATE_LENGTH: 'J',
      ITEM_VALIDATE_MAX_VALUE: 'K',
      ITEM_VALIDATE_MIN_VALUE: 'L',
      ITEM_IS_SEARCH_PARAM: 'M'
    }
  },
  COMPONENT_TYPE: {
    Number: 'ume-number',
    Input: 'ume-input',
    DatePicker: 'ume-datepicker',
    TimePicker: 'ume-timepicker',
    Select: 'ume-select',
    Radio: 'ume-radio',
    Checkbox: 'ume-checkbox'
  }
};
