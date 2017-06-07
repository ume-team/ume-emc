exports.getCellValue = function(sheet, cellPosition) {
  return sheet[cellPosition] ? sheet[cellPosition].v : null;
}
