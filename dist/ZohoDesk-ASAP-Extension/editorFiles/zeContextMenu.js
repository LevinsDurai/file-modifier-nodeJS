/* $Id$ */
ZohoDeskEditor.prototype.showContextMenu = function(ev, type, object) {
    var editor = this,selectedRange,
        //_anchorelement=ev.currentTarget, //holds the anchor element;
        _document = document,
        cmoptions, curtoolbarobject, fragment, _doc = editor.doc,
        ze_dropdowndiv, ul_click, mouse_down, offsets, _style, hideDropDown, _target, colors, smileys, ul_Elem, current_row, i, j, _target1 = ev.target;

    //console.log(object);
    var delete_table = function() {
        editor.win.focus();
        object.parentNode.removeChild(object);
        hideContextMenu();
        editor.win.focus();
        editor.saveCurrentState();
    };

    var delete_current_row = function() {
        editor.win.focus();
        current_row = get_current_row();
        if (!current_row) {
            return;
        }
        current_row.parentNode.removeChild(current_row);
        if (object.rows.length == 0) {
            delete_table();
            return;
        }
        hideContextMenu();
        editor.saveCurrentState();
    };
    var delete_current_column = function() {
        editor.win.focus();
        current_row = get_current_row();
        if (!current_row) {
            return;
        }
        var current_column = get_current_column();
        var currentPos = getPosition(current_row, current_column);
        var tbody = current_row.parentNode;
        var tr_list = tbody.getElementsByTagName("TR"); //No I18N
        for (i = 0; i < tr_list.length; i++) {
            var td_list = tr_list[i].getElementsByTagName("TD"); //No I18N
            tr_list[i].removeChild(td_list[currentPos]);
        }
        if (tr_list[0].getElementsByTagName("TD").length == 0) {
            delete_table();
            return;
        }
        hideContextMenu();
        editor.saveCurrentState();
    };

    var getColumnsNo = function(_current_row) {
        var td_list = _current_row.getElementsByTagName("TD");
        return td_list.length;
    };
    var constructRow = function(_col_no) {
        var temp_fragment = _doc.createDocumentFragment();
        var trEle = _doc.createElement("tr");
        temp_fragment.appendChild(trEle);
        for (i = 0; i < _col_no; i++) {
            var tdElem = _doc.createElement("td");
            var divElem = _doc.createElement("div");
            divElem.appendChild(_doc.createElement("br"));
            tdElem.appendChild(divElem);
            trEle.appendChild(tdElem);
        }
        return temp_fragment;
    };
    var insert_row_above = function() {
        editor.win.focus();
        current_row = get_current_row();
        if (!current_row) {
            return;
        }
        var col_no = getColumnsNo(current_row);
        fragment = constructRow(col_no);
        current_row.parentNode.insertBefore(fragment, current_row);
        hideContextMenu();
        if (selectedRange) {
            editor.restoreSelection(selectedRange);
        }
        editor.win.focus();
        editor.saveCurrentState();
        ////console.log("insert row above");
    };
    var insert_row_below = function() {
        editor.win.focus();
        current_row = get_current_row();
        if (!current_row) {
            return;
        }
        var col_no = getColumnsNo(current_row);
        fragment = constructRow(col_no);
        current_row.parentNode.insertBefore(fragment, current_row.nextSibling);
        hideContextMenu();
        if (selectedRange) {
            editor.restoreSelection(selectedRange);
        }
        editor.win.focus();
        editor.saveCurrentState();
    };
    var insert_column_left = function() {
        editor.win.focus();
        current_row = get_current_row();
        if (!current_row) {
            return;
        }
        var current_column = get_current_column();
        var currentPos = getPosition(current_row, current_column);
        var tbody = current_row.parentNode;
        var tr_list = tbody.getElementsByTagName("TR");
        for (i = 0; i < tr_list.length; i++) {
            var td_list = tr_list[i].getElementsByTagName("TD");
            var tdElem = _doc.createElement("td");
            var divElem = _doc.createElement("div");
            divElem.appendChild(_doc.createElement("br"));
            tdElem.appendChild(divElem);
            tr_list[i].insertBefore(tdElem, td_list[currentPos]);
        }
        hideContextMenu();
        editor.saveCurrentState();
    };
    var getPosition = function(_current_row, _current_column) {
        var td_list = _current_row.getElementsByTagName("TD");
        for (i = 0; i < td_list.length; i++) {
            if (_current_column === td_list[i]) {
                return i;
            }
        }
    };
    var get_current_row = function() {
        _target = _target1;
        //console.log("iam the target in get_current col"+_target1);
        if (_target.nodeName != "TR") {
            for (; _target !== null; _target = _target.parentNode) {
                if (_target.nodeName == "TR") {
                    break;
                }
            }
        }
        return _target;
    };
    var get_current_column = function() {
        _target = _target1;
        //console.log("iam the target in get_current col"+_target1);
        if (_target.nodeName != "TD") {
            for (; _target !== null; _target = _target.parentNode) {
                if (_target.nodeName == "TD") {
                    break;
                }
            }
        }
        //  //console.log(_target);
        //current_row=_target;
        //_target.parentNode.removeChild(_target);
        return _target;
    };
    var insert_column_right = function() {
        editor.win.focus();
        current_row = get_current_row();
        //console.log(current_row);
        if (!current_row) {
            return;
        }
        var current_column = get_current_column();
        //console.log("current column"+current_column);
        var currentPos = getPosition(current_row, current_column);
        //console.log(currentPos);
        var tbody = current_row.parentNode;
        var tr_list = tbody.getElementsByTagName("TR");
        for (i = 0; i < tr_list.length; i++) {
            var td_list = tr_list[i].getElementsByTagName("TD");
            var tdElem = _doc.createElement("td");
            var divElem = _doc.createElement("div");
            divElem.appendChild(_doc.createElement("br"));
            tdElem.appendChild(divElem);
            tr_list[i].insertBefore(tdElem, td_list[currentPos].nextSibling);
        }
        hideContextMenu();
        editor.saveCurrentState();
    };
    var edit_table = function() {
        var _table = object;
        editor.createTable(_table);
        hideContextMenu(1);
    };
    var ContextMenu = {
        "table": [
            [{ //No I18N
                    "cmd": "Insert Rows Above", //No I18N
                    "id": "insert_row", //No I18N
                    "class": "li_class", //No I18N
                    "method": insert_row_above //No I18N
                }, {
                    "cmd": "Insert Rows Below", //No I18N
                    "class": "li_class", //No I18N
                    "method": insert_row_below //No I18N
                },
                {
                    "cmd": "Insert Column left", //No I18N
                    "class": "li_class", //No I18N
                    "method": insert_column_left //No I18N
                },
                {
                    "cmd": "Insert Column right", //No I18N
                    "class": "li_class", //No I18N
                    "method": insert_column_right //No I18N
                }
                //{"ircEvent": "PRIVMSG", "method": "deleteURI", "regex": "^delete.*"}
            ],
            [{
                "cmd": "Delete Row", //No I18N
                "id": "delete_row", //No I18N
                "method": delete_current_row //No I18N
            }, {
                "cmd": "Delete Column", //No I18N
                "class": "li_class", //No I18N
                "method": delete_current_column //No I18N

            }, {
                "cmd": "Delete Table", //No I18N
                "method": delete_table //No I18N
            }],
            [{
                "cmd": "Edit Table",
                "method": edit_table
            }]
        ]
    };
    var executeFunction = function(temp_val, temp_list) {
        ////console.log(temp_list[temp_val]["method"]);
        //temp_list[temp_val]["method"]();
        temp_list[temp_val].method();
    };
    switch (type) {
        //context menu can be used for other elements if needed
        case "table": //No I18N
            if (!get_current_row()) { //to ensure that click is made in one of the rows in table and not on border
                return;
            }
            cmoptions = ContextMenu.table;
            break;
    }

    var hideContextMenu = function(editorFocus) {

        if (!editorFocus) {
            if (selectedRange) {
                editor.restoreSelection(selectedRange);
            }
            editor.win.focus();
        }
        ze_dropdowndiv = document.getElementById("ze_contextMenudd");
        if (ze_dropdowndiv) {
            document.body.removeChild(ze_dropdowndiv);
            ZohoDeskEditor._removeEvent(_document, "mousedown", mouse_down); //No I18N
            ZohoDeskEditor._removeEvent(_doc, "mousedown", mouse_down); //No I18N
            ZohoDeskEditor._removeEvent(_doc, "keydown", mouse_down); //No I18N
        }
    };
    var mouse_down = function(ev) { //if user clicks outside the iframe
        ze_dropdowndiv = document.getElementById("ze_contextMenudd");
        if (ev) {
            _target = ev.target;
            for (; _target !== null; _target = _target.parentNode) {
                if (_target === ze_dropdowndiv) {
                    break;
                }
            }
        }
        if (!_target) {
            hideContextMenu();
            //hide the context menu
        }
    };
    var setPositions = function(ev) {
        var posx = 0;
        var posy = 0,
            $document = document,
            $body = document.body,
            $documentElement = $document.documentElement,
            scrollTopValue = Math.max($body.scrollTop, $documentElement.scrollTop);

        var value1 = editor.iframe.getBoundingClientRect();
        var value2 = _target1.getBoundingClientRect();
        if (ev.pageX || ev.pageY) {
            posx = value1.left + value2.left + (ev.pageX - value2.left);
            if (editor.win.scrollY) {
                posy = value1.top + value2.top + (ev.pageY - value2.top) - editor.win.scrollY;
            } else {
                posy = value1.top + value2.top + (ev.pageY - value2.top) - editor.win.pageYOffset;
            }
        } else {
            posx = value1.left + value2.left + (ev.clientX - value2.left);
            if (editor.win.scrollY) {
                posy = value1.top + value2.top + (ev.clientY - value2.top) - editor.win.scrollY;
            } else {
                posy = value1.top + value2.top + (ev.clientY - value2.top) - editor.win.pageYOffset;
            }
        }
        posy = posy + (scrollTopValue || 0);
        ze_dropdowndiv.style.left = parseInt(posx) + "px";
        ze_dropdowndiv.style.top = parseInt(posy) + "px";

        var editor_pos = ZohoDeskEditor.getPos(editor.outerdiv),
            _style = ze_dropdowndiv.style;
        var ze_dropdowndiv_offsetheight = ze_dropdowndiv.offsetHeight;
        var _docWidth = document.body.getBoundingClientRect().width;

        if (posx + ze_dropdowndiv.offsetWidth + 10 > _docWidth) {
            _style.left = "auto"; //No I18N
            posx = window.innerWidth - posx;
            _style.right = parseInt(posx) + "px"; //No I18N
        }

        if (posy + ze_dropdowndiv_offsetheight > (window.innerHeight - 20)) {
            var tempTop = posy - ze_dropdowndiv_offsetheight;
            if (tempTop < 10) {
                _style.top = "40px";
            } else {
                _style.top = parseInt(tempTop) + "px";
            }
        }

    };
    //constructContextMenu(cmoptions);
    editor.constructContextMenu(cmoptions, "ze_contextMenudd"); //No I18N
    editor.win.focus();
    selectedRange = editor.saveSelection();
    ze_dropdowndiv = document.getElementById("ze_contextMenudd");
    setPositions(ev);

    //event listeners when mouse clicked outside of the menu or key is pressed
    ZohoDeskEditor._addEvent(_document, "mousedown", mouse_down); //No I18N
    ZohoDeskEditor._addEvent(_doc, "mousedown", mouse_down); //No I18N
    ZohoDeskEditor._addEvent(_doc, "keydown", mouse_down); //No I18N


};
ZohoDeskEditor.prototype.constructContextMenu = function(options, id, ul_click) {
    var editor = this;
    var mainDivElem, divElem, ulElem, liElem, i, j, optlen = options.length;
    mainDivElem = document.createElement("div");
    mainDivElem.className = "zde_dd shw notrans ze_tbdr";
    mainDivElem.id = id;
    divElem = document.createElement("div");
    //divElem.className = "ze_PUcen";
    ulElem = document.createElement("ul");
    //ulElem.className = "ze_PUhr";
    for (i = 0; i < optlen; i++) {
        var menu_block = options[i];
        for (j = 0; j < menu_block.length; j++) {
            liElem = document.createElement("li");
            liElem.innerHTML = menu_block[j].cmd;
            if (menu_block[j].id) {
                liElem.id = menu_block[j].id;
            }
            if (menu_block[j]["class"]) { // jshint ignore:line
                liElem.className = menu_block[j]["class"]; // jshint ignore:line
            }
            ulElem.appendChild(liElem);
            liElem.setAttribute("data-value", j);
            if (menu_block[j]["data-i"]) { // jshint ignore:line
                liElem.setAttribute("data-i", menu_block[j]["data-i"]); // jshint ignore:line
            }
            if (menu_block[j].color) {
                liElem.style.color = menu_block[j].color;
            }
            if (menu_block[j].fontWeight) { // jshint ignore:line
                liElem.style.fontWeight = menu_block[j].fontWeight; // jshint ignore:line
            }
            if (menu_block[j].method) {
                liElem.onclick = menu_block[j].method;
            }
        }
        liElem = document.createElement("li");
        liElem.className = "zde_lne"; //NO I18N
        ulElem.appendChild(liElem);
    }
    divElem.appendChild(ulElem);
    mainDivElem.appendChild(divElem);
    document.body.appendChild(mainDivElem);
    if (ul_click) {
        ZohoDeskEditor._addEvent(ulElem, "click", ul_click); //No I18N
    }
    mainDivElem.addEventListener("contextmenu", function(ev) {
        editor._stopEvent(ev);
        return false;
    }, false);
};
