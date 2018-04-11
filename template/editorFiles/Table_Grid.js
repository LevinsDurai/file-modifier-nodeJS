/* $Id$*/
/*  Table Grid  */
/* global ZE */
ZohoDeskEditor.prototype._createTableGrid = function(ev, command) {
    "use strict";
    var editor = this,
        _document = document,
        _doc = editor.doc,
        _anchorElement = ev.currentTarget,
        _initobj = editor.initobj,
        maxRow = 5,
        maxCol = 5,
        _target,
        rowCount,
        tr,
        td,
        colCount,
        tableGrid,
        selectedRange,
        gridRows = [],
        deleteRow = 0,
        deleteCol = 0,
        _offset,
        tableGridid,
        sel,
        range,
        clickAction,
        mouseMove,
        removeEvents,
        curtoolbarobject;
    curtoolbarobject = editor.toolbarobject[command];
    ZohoDeskEditor.addClass(curtoolbarobject, "ze_dn ze_Sel");
    var CONSTANTS = {
        TABLEID: "tablegen_div",
        DROPDOWNID: "ze_dropdown",
        ROWATTR: "data-row_num",
        COLATTR: "data-col_num"
    };
    selectedRange = editor.saveSelection();

    var setProperty = function(node, propName, value) {
        node.setAttribute(propName, value);
    };

    var fillGrid = function(_rowCount, _colCount) {
        var i, j;
        for (i = 0; i < maxRow; i++) {
            for (j = 0; j < maxCol; j++) {
                if (i < _rowCount && j < _colCount) {
                    var displayDiv = _document.getElementById("displayDiv");
                    displayDiv.innerHTML = _rowCount + "x" + _colCount;
                    gridRows[i].childNodes[j].style.backgroundColor = "#F4F4F4";
                } else {
                    gridRows[i].childNodes[j].style.backgroundColor = "#fff";
                }
            }
        }
    };

    var insertTable = function() {
        var gridTable = _document.createElement("div");
        gridTable.id = CONSTANTS.DROPDOWNID;
        gridTable.className = "zde_dd shw ze_dropDown";
        var displayDiv = _document.createElement("div");
        displayDiv.innerHTML = "1 x 1";
        displayDiv.align = "center";
        displayDiv.id = "displayDiv";
        displayDiv.className = "ze_tableDtl";
        var tablegenDiv = document.createElement("table");
        setProperty(tablegenDiv, "id", CONSTANTS.TABLEID);
        tablegenDiv.className = "ze_mainTable";
        for (var row = 1; row <= maxRow; row++) {
            tr = _document.createElement("tr");
            for (var col = 1; col <= maxCol; col++) {
                td = _document.createElement("td");
                td.className = "ze_tableGridCol";
                ZohoDeskEditor._setAttribute(td, CONSTANTS.ROWATTR, row);
                ZohoDeskEditor._setAttribute(td, CONSTANTS.COLATTR, col);
                ZohoDeskEditor._appendChildren(tr, [td]);
            }
            gridRows.push(tr);
            ZohoDeskEditor._appendChildren(tablegenDiv, [tr]);
        }
        var ulLists = _document.createElement("ul");
        var ul1 = _document.createElement("li");
        ul1.className = "iTable";
        ZohoDeskEditor._appendChildren(ul1, [displayDiv, tablegenDiv]);
        ZohoDeskEditor._appendChildren(ulLists, [ul1]);
        ZohoDeskEditor._appendChildren(gridTable, [ulLists]);
        return gridTable;
    };

    tableGrid = insertTable();
    _offset = ZohoDeskEditor.getPos(_anchorElement);
    tableGrid.style.left = _offset.offsetLeft + "px";
    tableGrid.style.top = _offset.offsetTop + _anchorElement.offsetHeight + "px";
    _document.body.appendChild(tableGrid);
    var tablegenDivId = _document.getElementById(CONSTANTS.TABLEID);

    var mouseDown = function(event) {

        tableGrid = document.getElementById(CONSTANTS.DROPDOWNID);
        if (event) {
            _target = event.target;
            for (; _target !== null && _target !== tableGrid;) {
                _target = _target.parentNode;
            }
        }
        if (!_target) {
            removeEvents();
            tableGrid.parentElement.removeChild(tableGrid);
        }
    };

    mouseMove = function(event) {
        var tableRows, tableRow;
        if (rowCount) {
            deleteRow = rowCount;
        }

        if (colCount) {
            deleteCol = colCount;
        }

        rowCount = event.target.dataset.row_num;
        colCount = event.target.dataset.col_num;
        if (Number(deleteRow) > Number(rowCount)) {
            if (Number(deleteRow) >= 5) {
                tableGridid = _document.getElementById(CONSTANTS.TABLEID);
                maxRow--;
                tableGridid.deleteRow(maxRow);
                gridRows.pop();
            }
        } else if (Number(rowCount) === maxRow) {
            if (maxRow !== 10) {
                tableGridid = _document.getElementById(CONSTANTS.TABLEID);
                tr = _document.createElement("tr");
                tr.style.border = "2";
                maxRow++;
                for (var rows = 0; rows < maxCol; rows++) {
                    td = _document.createElement("td");
                    td.className = "ze_tableGridCol";
                    ZohoDeskEditor._setAttribute(td, CONSTANTS.ROWATTR, maxRow);
                    ZohoDeskEditor._setAttribute(td, CONSTANTS.COLATTR, rows + 1);
                    tr.appendChild(td);
                }
                gridRows.push(tr);
                tableGridid.insertBefore(tr, tableGridid.lastChild.nextSibling);
            }
        }
        if (Number(deleteCol) > Number(colCount)) {
            if (Number(deleteCol) >= 5) {
                tableRows = _document.getElementsByTagName("TR");
                var maxcols;
                for (var _rows = 0; _rows < tableRows.length; _rows++) {
                    maxcols = maxCol;
                    var tabCols = tableRows[_rows].getElementsByTagName("TD");
                    for (var _cols = 0; _cols < 1; _cols++) {
                        tableRows[_rows].removeChild(tabCols[maxcols - 1]);
                        maxcols--;
                    }
                }
                maxCol--;
            }
        } else if (Number(colCount) === Number(maxCol)) {
            if (maxCol !== 10) {
                gridRows = [];
                maxCol += 1;
                var cols = maxCol;
                tableRow = _document.getElementsByTagName("TR");
                tableGridid = _document.getElementById(CONSTANTS.TABLEID);
                for (var k = 0; k < tableRow.length; k++) {
                    td = _document.createElement("td");
                    var tableCol = tableRow[k].getElementsByTagName("TD");
                    td.className = "ze_tableGridCol";
                    ZohoDeskEditor._setAttribute(td, CONSTANTS.ROWATTR, k + 1);
                    ZohoDeskEditor._setAttribute(td, CONSTANTS.COLATTR, cols);
                    tableRow[k].insertBefore(td, tableCol[tableCol.length - 1].nextSibling);
                    gridRows.push(tableRow[k]);
                }
            }
        }
        if (!rowCount && !colCount) {
            fillGrid(deleteRow, deleteCol);
        } else if (!rowCount) {
            fillGrid(deleteRow, colCount);
        } else if (!colCount) {
            fillGrid(rowCount, deleteCol);
        } else {
            fillGrid(rowCount, colCount);
        }
    };

    var drawTable = function(_rowCount, _colCount) {
        var i, j;
        editor.win.focus();
        if (selectedRange) {
            editor.restoreSelection(selectedRange);
        }
        var fragment = _doc.body.ownerDocument.createDocumentFragment();
        fragment.appendChild(_document.createElement("br"));

        var _table = _document.createElement("table");
        var tableStyle = _table.style;
        tableStyle.fontSize = _initobj.defaultfontsize || ZohoDeskEditor_Init.defaultFontSize || "";
        tableStyle.fontFamily = _initobj.defaultfontfamily || ZohoDeskEditor_Init.defaultFontFamily || "";
        tableStyle.width = "100%";
        tableStyle.borderStyle = "solid";
        tableStyle.borderCollapse = "collapse";
        _table.cellPadding = "2";
        _table.cellSpacing = "2";
        _table.cellPadding = "2";
        _table.cellSpacing = "2";
        _table.border = "1";
        var row,
            cell;
        var _tbody = _document.createElement("tbody");
        for (i = 0; i < _rowCount; i++) {
            row = _document.createElement("tr");
            for (j = 0; j < _colCount; j++) {
                cell = _document.createElement("td");
                var newDiv = _document.createElement("div");
                newDiv.appendChild(_document.createElement("br"));
                cell.appendChild(newDiv);
                row.appendChild(cell);
            }
            _tbody.appendChild(row);
        }
        _table.appendChild(_tbody);
        fragment.appendChild(_table);
        fragment.appendChild(_document.createElement("br"));
        editor.win.focus();
        sel = editor._getSelection();
        try {
            if (!sel.isCollapsed) {
                sel.deleteFromDocument();
            }
            range = sel.getRangeAt(0);
        } catch (e) {
            range = editor._createRange(sel);
        }
        try {
            editor.win.focus();
            range.insertNode(fragment);
        } catch (e1) {}
        editor.saveCurrentState();
    };

    removeEvents = function() {
        ZohoDeskEditor.removeClass(curtoolbarobject, "ze_dn");
        ZohoDeskEditor._removeEvent(tablegenDivId, "click", clickAction);
        ZohoDeskEditor._removeEvent(tablegenDivId, "mousemove", mouseMove);
        ZohoDeskEditor._removeEvent(_document, "mousedown", mouseDown);
        ZohoDeskEditor._removeEvent(_doc, "mousedown", mouseDown);
        ZohoDeskEditor._removeEvent(_doc, "keydown", mouseDown);
    };

    clickAction = function(event) {
        editor._stopEvent(ev);
        if (event.target.hasAttribute(CONSTANTS.ROWATTR) && event.target.hasAttribute(CONSTANTS.COLATTR)) {
            drawTable(rowCount, colCount);
        } else {
            drawTable(deleteRow, deleteCol);
        }
        tableGrid = _document.getElementById(CONSTANTS.DROPDOWNID);
        removeEvents();
        tableGrid.parentElement.removeChild(tableGrid);
    };

    ZohoDeskEditor._addEvent(_document, "mousedown", mouseDown);
    ZohoDeskEditor._addEvent(_doc, "mousedown", mouseDown);
    ZohoDeskEditor._addEvent(_doc, "keydown", mouseDown);
    ZohoDeskEditor._addEvent(tablegenDivId, "click", clickAction);
    ZohoDeskEditor._addEvent(tablegenDivId, "mousemove", mouseMove);

};