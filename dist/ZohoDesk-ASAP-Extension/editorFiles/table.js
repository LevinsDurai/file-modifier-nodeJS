/* $Id$ */
ZohoDeskEditor.prototype.createTable = function(_object) {
    var editor = this,
        _document = document,
        ze_ins_table_div = _document.getElementById("ze_ins_table"), //for first time it is undefined
        I18N = ZohoDeskEditor.i18n,
        hideTableDiv,
        esckey,
        tblhtml,
        div1,
        _input,
        row_input,
        buttons,
        close_button,
        selectedRange,
        title,
        _errorspan;

    var hideTableDiv = function() {
        var _form = ze_ins_table_div.getElementsByTagName("form")[0];
        _document.removeEventListener("keydown", esckey, true);
        ze_ins_table_div.parentNode.removeChild(ze_ins_table_div);
        ZohoDeskEditor.hideOverlay();
        (_form) && (_form.reset());
        editor.win.focus();
        if (editor.range) {
            editor.range.select();
            delete(editor.range);
        }
    };
    var initialize = function() {
        var row_value,
            column_input,
            column_value,
            width_input,
            width_value,
            border_input,
            border_value,
            table_width,
            element,
            cellPadding_input,
            cellSpacing_input;

        row_input.value = _object.rows.length;
        row_input.disabled = true;

        column_input = _input[1];
        column_input.value = _object.rows[0].cells.length;
        column_input.disabled = true;

        width_input = _input[2];
        table_width = _object.style.width || _object.width;
        element = ze_ins_table_div.getElementsByTagName("select")[0];
        if (table_width.indexOf('%') != -1) {
            element.selectedIndex = "0";
        } else {
            element.selectedIndex = "1";
        }
        if (table_width) {
            width_input.value = parseInt(table_width);
        }
        width_input.focus();



        cellPadding_input = _input[3];
        if (_object.cellPadding) {
            cellPadding_input.value = _object.cellPadding;
        } else {
            cellPadding_input.value = "0";
        }


        cellSpacing_input = _input[4];
        if (_object.cellSpacing) {
            cellSpacing_input.value = _object.cellSpacing;
        } else {
            cellSpacing_input.value = "0";
        }

        border_input = _input[5];
        border_value = _object.style.border || _object.border;
        if (border_value) {
            border_input.value = parseInt(border_value);
        } else {
            border_input.value = "0";
        }

    };

    var esckey = function(ev) {
        if (ev.keyCode === 27) {
            editor._stopEvent(ev);
            hideTableDiv();
        }
        if (ev.keyCode === 13) {
            editor._stopEvent(ev);
            okButton(ev);
        }
    };


    if (_object) {
        title = "Edit Table"; //No I18N
    } else {
        title = "Insert Table"; //No I18N
    }
    tblhtml = '<div class="zdeskEditor_PUheader">' + I18N(title) + '<i class="zdei-close"><svg><use xlink:href="#KBEditortools_close"></use></svg></i></div>';
    tblhtml += '<div class="zdeskEditor_PUbody">';
    tblhtml += '<form><table class="zde_ptble New_Table_popup"><tr><td>' + I18N("Rows") + '</td><td><input type="text" class="ze_m20" value="2" maxlength="2" size="2"></td></tr><tr><td>' + I18N("Columns") + '</td><td><input type="text" value="2" maxlength="2" size="2"></td></tr>';
    tblhtml += '<tr><td>' + I18N("Width") + '</td><td><input type="text" value="100" maxlength="4" size="2"/></td></tr><tr><td colspan="2"><div class="zde_select"><select class="select"><option value="%">%</option><option value="px">' + I18N("px") + '</option></select></div></td></tr>'; // No I18N
    if (_object) {
        tblhtml += '<tr><td>' + I18N("Cell Padding") + '</td><td><input type="text" maxlength="2" size="2"/></td><td>' + I18N("Cell Spacing") + '</td><td><input type="text" maxlength="2" size="2"/></td></tr>'; // No I18N
    }
    tblhtml += '<tr><td>' + I18N("Border") + '</td><td><input type="text" value="1" maxlength="2" size="2"/></td></tr>'; // No I18N
    tblhtml += '<tr><td></td></tr><tr><td colspan="4"><p class="ze_iiSnF"><span class="ze_popuperrmsg"style="display:none;">this is temp text</span></p></td></tr></table></form></div>'; //No I18N
    tblhtml += '<div class="zdeskEditor_PUbtm"><span class="blue-btn">' + I18N("OK") + '</span><span class="btn">' + I18N("Cancel") + '</span></div>';


    ZohoDeskEditor.showOverlay();
    editor.win.focus();
    selectedRange = editor.saveSelection();
    div1 = _document.createElement("div");
    div1.setAttribute("class", "zdeskEditor_popup zep_arrb");
    div1.innerHTML = tblhtml;
    div1.id = "ze_ins_table";

    ze_ins_table_div = div1;
    document.body.appendChild(div1);

    /*setting the position*/
    ZohoDeskEditor.setPosition(ze_ins_table_div, editor.outerdiv);

    /* variables caching for components inside div*/
    _input = ze_ins_table_div.getElementsByTagName("input");
    row_input = _input[0];
    buttons = ze_ins_table_div.getElementsByTagName("span");
    _errorspan = buttons[0];
    close_button = ze_ins_table_div.getElementsByClassName("zdei-close")[0];

    if (_object) {
        initialize();
    } else {
        row_input.focus();
        var temp = row_input.value;
        row_input.value = "";
        row_input.value = temp;
    }
    /* focus start*/


    /* event handling start for close*/
    close_button.onclick = buttons[2].onclick = function(ev) {
        editor._stopEvent(ev);
        hideTableDiv();
    };

    var insertTableErrorMsg = function(msg) {
        _errorspan = ze_ins_table_div.getElementsByTagName("span");
        _errorspan[0].style.display = "";
        _errorspan[0].innerHTML = msg;
    };

    /* event handling for ok*/
    buttons[1].onclick = okButton;

    function okButton(ev) {

        editor._stopEvent(ev);
        var row_value,
            column_input,
            column_value,
            width_input,
            width_value,
            border_input,
            border_value,
            _doc,
            element,
            fragment,
            _table,
            _tbody,
            i,
            j,
            row,
            cell,
            sel,
            range,
            _initobj = editor.initobj,
            outGoingFontFamily = ZohoDeskEditor_Init.outGoingFontFamily,
            tableStyle,
            cellPadding_input,
            cellSpacing_input,
            cellPadding_value,
            cellSpacing_value;

        if (selectedRange) {
            editor.restoreSelection(selectedRange);
        }
        row_value = row_input.value;
        if (!(row_value > 0 && row_value < 100)) {
            insertTableErrorMsg(I18N('Specify valid number for Rows')); //No I18N
            row_input.focus();
            row_input.select();
            return false;
        }

        column_input = _input[1];
        column_value = column_input.value;
        if (!(column_value > 0 && column_value < 100)) {
            insertTableErrorMsg(I18N('Specify valid number for Columns')); //No I18N
            column_input.focus();
            column_input.select();
            return false;
        }

        width_input = _input[2];
        width_value = width_input.value;
        if (!(width_value > 1 && width_value < 10000)) {
            insertTableErrorMsg(I18N('Specify valid number for Width')); //No I18N
            width_input.focus();
            width_input.select();
            return false;
        }
        border_input = _input[3];
        if (_object) {
            cellPadding_input = _input[3];
            cellPadding_value = cellPadding_input.value;
            if (cellPadding_value == "" || !(cellPadding_value >= 0 && cellPadding_value < 100)) {
                insertTableErrorMsg(I18N('Specify valid number for Cell Padding')); //No I18N
                cellPadding_input.focus();
                cellPadding_input.select();
                return false;
            }

            cellSpacing_input = _input[4];
            cellSpacing_value = cellSpacing_input.value;
            if (cellSpacing_value == "" || !(cellSpacing_value >= 0 && cellSpacing_value < 100)) {
                insertTableErrorMsg(I18N('Specify valid number for Cell Spacing')); //No I18N
                cellSpacing_input.focus();
                cellSpacing_input.select();
                return false;
            }
            border_input = _input[5];
        }

        border_value = border_input.value;
        if (border_value == "" || !(border_value >= 0 && border_value < 100)) {
            insertTableErrorMsg(I18N('Specify valid number for Border')); //No I18N
            border_input.focus();
            border_input.select();
            return false;
        }

        _doc = editor.doc;
        element = ze_ins_table_div.getElementsByTagName("select")[0];

        if (_object) {
            tableStyle = _object.style;
            /*tableStyle.borderCollapse = "collapse";*/
            if (_object.width) {
                _object.width = "";
            }
            tableStyle.width = width_value + element.options[element.selectedIndex].value;
            if (_object.style.border) {
                _object.style.border = "";
            }
            _object.border = border_value;
            _object.cellPadding = cellPadding_value;
            _object.cellSpacing = cellSpacing_value;
            editor.win.focus();
        } else {

            fragment = _doc.createDocumentFragment();
            fragment.appendChild(_doc.createElement("br"));

            _table = _doc.createElement("table");
            tableStyle = _table.style;
            /*tableStyle.borderCollapse = "collapse";*/
            tableStyle.width = width_value + element.options[element.selectedIndex].value;
            tableStyle.fontSize = _initobj.defaultfontsize || ZohoDeskEditor_Init.defaultFontSize || "";
            tableStyle.fontFamily = _initobj.defaultfontfamily || ZohoDeskEditor_Init.defaultFontFamily || "";
            _table.cellPadding = "0";
            _table.cellSpacing = "0";
            _table.border = border_value;

            var changeColor = function() {
                var msg  = "from changeColor";
                editor.initobj.handleAlertMessage ? editor.initobj.handleAlertMessage(msg) : alert(msg); // No I18N
            }
            _tbody = _doc.createElement("tbody");
            for (i = 0; i < row_value; i++) {

                row = _doc.createElement("tr");
                for (j = 0; j < column_value; j++) {
                    cell = _doc.createElement("td");
                    var newDiv = _doc.createElement("div");
                    newDiv.appendChild(_doc.createElement("br"))
                    cell.appendChild(newDiv);
                    /*cell.style.height = "50px";
                    cell.style.border = "1px solid #555";*/
                    row.appendChild(cell);
                }
                _tbody.appendChild(row);
            }

            _table.appendChild(_tbody);
            fragment.appendChild(_table);
            fragment.appendChild(_doc.createElement("br"));
            editor.win.focus();
            sel = editor._getSelection();
            range;
            try {

                if (!sel.isCollapsed) {
                    sel.deleteFromDocument();
                }
                range = sel.getRangeAt(0);
            } catch (e) {
                range = editor._createRange(sel);
            }
            try {
                range.insertNode(fragment); //to insert the position where cursor is availabale=
                sel.collapseToStart();
                //ZE._addEvent(_table,"contextmenu",function(ev) {  editor._stopEvent(ev); editor.showContextMenu(ev,"table",_table);  return false; });    // No I18N

            } catch (e1) {
                insertTableErrorMsg(I18N('Exception in inserting table')); //No I18N
            }
        }

        hideTableDiv();
        editor.saveCurrentState();
        return false;
    };
    ZohoDeskEditor._addEvent(_document, "keydown", esckey); // No I18N
};
