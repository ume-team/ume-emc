// 引入依赖模块
var XLSX = require('xlsx');
var Handlebars = require('handlebars');
var fs = require('fs');
var config = require('./src/config.js');
var utils = require('./src/utils.js');
var SearchPageData = require('./src/SearchPageData.js');

// 读取设计文件
var workbook = XLSX.readFile(config.DESIGN_FILE_PATH, {});
var sheetNames = workbook.SheetNames;
sheetNames.forEach(function(sheetName){
  if (sheetName.toLowerCase().indexOf(config.SHEET_NAME.toLowerCase()) === 0) {
    generate(workbook.Sheets[sheetName]);
  }
});

/**
 * 生成模版
 */
function generate(workSheet) {
  var pageId = workSheet[config.PAGE_SHEET_CONFIG.PAGE_ID].v;
  var pageFolder = workSheet[config.PAGE_SHEET_CONFIG.PAGE_FOLDER].v;
  var templateData = createTemplateData(workSheet);
  getTemplate('search.tmpl', function(tmplString){
    var fileContent = compileTemplate(tmplString, templateData);
    writeFile(pageFolder, pageId, fileContent);
  });
}

/**
 * 创建模版数据
 */
function createTemplateData(workSheet) {
  var pageSheetConfig = config.PAGE_SHEET_CONFIG;
  var pageTitle = workSheet[pageSheetConfig.PAGE_TITLE].v;
  var itemColumn = pageSheetConfig.ITEM_COLUMN;
  var data = new SearchPageData();
  var itemObject = null;
  data.pageTitle = pageTitle;
  data.searchCondition = [];
  for(var i = pageSheetConfig.PAGE_ITEM_START_ROW; i < pageSheetConfig.PAGE_ITEM_MAX_ROW; i++) {
    if (workSheet[itemColumn.ITEM_NO + i] && !isNaN(parseInt(workSheet[itemColumn.ITEM_NO + i].v, 10))) {
      itemObject = getItemObject(workSheet, itemColumn, i);
      // 创建检索条件
      if (itemObject.itemIsSearchParam === 'Y') {
        data.searchCondition.push(itemObject);
      }
    } else {
      break;
    }
  }
  return data;
}

/**
 * 取得指定画面项目
 */
function getItemObject(workSheet, itemColumnConfig, row) {
  var ret = {};
  // 画面项目名
  ret.itemName = utils.getCellValue(workSheet, itemColumnConfig.ITEM_NAME + row);
  // 画面项目ID
  ret.itemId = utils.getCellValue(workSheet, itemColumnConfig.ITEM_ID + row);
  // 项目类型
  ret.itemType = utils.getCellValue(workSheet, itemColumnConfig.ITEM_TYPE + row);
  // 项目是否为空
  ret.itemIsNull = utils.getCellValue(workSheet, itemColumnConfig.ITEM_IS_NULL + row);
  // HTML组件：组件类型
  ret.itemComponentType = utils.getCellValue(workSheet, itemColumnConfig.ITEM_COMPONENT_TYPE + row);
  // 组件对象
  ret.itemComponent = {
    tag: config.COMPONENT_TYPE[ret.itemComponentType]
  };
  // 校验：必须输入
  ret.itemValidateIsNull = utils.getCellValue(workSheet, itemColumnConfig.ITEM_VALIDATE_IS_NULL + row);
  // 校验：最大长度
  ret.itemValidateMaxLength = utils.getCellValue(workSheet, itemColumnConfig.ITEM_VALIDATE_MAX_LENGTH + row);
  // 校验：最小长度
  ret.itemValidateMinLength = utils.getCellValue(workSheet, itemColumnConfig.ITEM_VALIDATE_MIN_LENGTH + row);
  // 校验：长度
  ret.itemValidateLength = utils.getCellValue(workSheet, itemColumnConfig.ITEM_VALIDATE_LENGTH + row);
  // 校验：最大值
  ret.itemValidateMaxValue = utils.getCellValue(workSheet, itemColumnConfig.ITEM_VALIDATE_MAX_VALUE + row);
  // 校验：最小值
  ret.itemValidateMinValue = utils.getCellValue(workSheet, itemColumnConfig.ITEM_VALIDATE_MIN_VALUE + row);
  // 是否为检索参数
  ret.itemIsSearchParam = utils.getCellValue(workSheet, itemColumnConfig.ITEM_IS_SEARCH_PARAM + row);
  return ret;
}

/**
 * 取得指定模版
 */
function getTemplate(templateName, callFunc) {
  fs.readFile(config.ROOT_PATH + config.TEMPLATE_FOLDER + templateName, 'utf8'
    , function (err, tmplString) {
    if (err) {
      return console.log(err);
    }
    callFunc(tmplString);
  })
}

/**
 * 编辑模版
 */
function compileTemplate(tmplString, templateData) {
  var template = Handlebars.compile(tmplString);
  return template(templateData);
}

/**
 * 输出模版文件
 */
function writeFile(fileFolder, fileName, fileContent) {
  var fileFullFolder = config.ROOT_PATH + config.OUTPUT_PATH + fileFolder + '/';
  var fileFullName = fileName + config.OUTPUTFILE_SUFFIX;
  mkDir(fileFullFolder);
  fs.writeFile(fileFullFolder + fileFullName, fileContent, 'utf-8', function (err) {
    if (err) return console.log(err);
    console.log('Generate Success!');
  });
}

/**
 * 创建指定目录
 */
function mkDir(folderPath) {
  var parentFolder = getParentFolder(folderPath);
  if (!fs.existsSync(parentFolder)) {
    mkDir(parentFolder);
  }
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
}

/**
 * 取得指定目录的父目录
 */
function getParentFolder(folderPath) {
  var ret = '';
  if (folderPath.lastIndexOf('/') === folderPath.length - 1) {
    folderPath = folderPath.substring(0, folderPath.length - 1);
  }
  ret = folderPath.substring(0, folderPath.lastIndexOf('/'));
  return ret;
}
