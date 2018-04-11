/* $Id$*/
ZohoDeskEditor.prototype.showDropDown = function(ev, command, action) {
    var editor = this,
        _anchorelement = ev.currentTarget, //holds the anchor element;
        _document = document,
        curtoolbarobject,
        _doc = editor.doc,
        ze_dropdowndiv,
        ul_click,
        mouse_down,
        _style,
        ddoptions,
        hideDropDown,
        _target,
        colors,
        smileys,
        selectedRange;

    colors = ["#ffffff", "#cceeff", "#ccccff", "#e5ccff", "#ffccff", "#ffccee", "#ffcccc", "#ffe5cc", "#ffffcc", "#ccffcc", "#ccffff", //No I18N
        "#cccccc", "#99ccff", "#9999ff", "#cc99ff", "#ff99ff", "#ff99cc", "#ff9999", "#ffcc99", "#ffff99", "#99ff99", "#99ffff", //No I18N
        "#c0c0c0", "#66ccff", "#6666ff", "#b266ff", "#ff66fe", "#ff66b2", "#ff6666", "#ffb266", "#feff66", "#66ff66", "#66feff", //No I18N
        "#999999", "#399cfd", "#3333ff", "#9933ff", "#ff33fe", "#ff3398", "#ff3333", "#ff9933", "#feff33", "#33ff33", "#33feff", //No I18N
        "#666666", "#3399ff", "#0000ff", "#7700ff", "#ff00ee", "#ff0077", "#ff0000", "#ff7f00", "#feff00", "#00ff00", "#00feff", //No I18N
        "#444444", "#0065cc", "#0000cc", "#6600cc", "#cc00cb", "#cc00cb", "#cc0000", "#cc6600", "#cbcc00", "#00cc00", "#00cbcc", //No I18N
        "#333333", "#004c99", "#000099", "#4B0099", "#990098", "#99004c", "#990000", "#994c00", "#989900", "#009900", "#009899", //No I18N
        "#000000", "#003366", "#000066", "#330066", "#660066", "#660032", "#660000", "#663300", "#666600", "#006600", "#006666"
    ]; //No I18N

    smileys = [{
        "htm": "<i class='KB_Editor_smilenew'></i>"
    }, {
        "htm": "<i class='KB_Editor_sad'></i>"
    }, {
        "htm": "<i class='KB_Editor_lol'></i>"
    }, {
        "htm": "<i class='KB_Editor_angry'></i>"
    }, {
        "htm": "<i class='KB_Editor_tongueout'></i>"
    }, {
        "htm": "<i class='KB_Editor_coolnew'></i>"
    }, {
        "htm": "<i class='KB_Editor_winknew'></i>"
    }, {
        "htm": "<i class='KB_Editor_meh'></i>"
    }, {
        "htm": "<i class='KB_Editor_tearofjoy'></i>"
    }, {
        "htm": "<i class='KB_Editor_shocked'></i>"
    }, {
        "htm": "<i class='KB_Editor_loveit'></i>"
    }, {
        "htm": "<i class='KB_Editor_neutral'></i>"
    }, {
        "htm": "<i class='KB_Editor_worried'></i>"
    }, {
        "htm": "<i class='KB_Editor_yummy'></i>"
    }, {
        "htm": "<i class='KB_Editor_sleepy'></i>"
    }, {
        "htm": "<i class='KB_Editor_dizzy'></i>"
    }, {
        "htm": "<i class='KB_Editor_sick'></i>"
    }, {
        "htm": "<i class='KB_Editor_injured'></i>"
    }, {
        "htm": "<i class='KB_Editor_idea'></i>"
    }, {
        "htm": "<i class='KB_Editor_doubtful'></i>"
    }, {
        "htm": "<i class='KB_Editor_tensed'></i>"
    }, {
        "htm": "<i class='KB_Editor_searching'></i>"
    }, {
        "htm": "<i class='KB_Editor_anxious'></i>"
    }, {
        "htm": "<i class='KB_Editor_lipssealed'></i>"
    }, {
        "htm": "<i class='KB_Editor_halo'></i>"
    }, {
        "htm": "<i class='KB_Editor_like'></i>"
    }, {
        "htm": "<i class='KB_Editor_dislike'></i>"
    }, {
        "htm": "<i class='KB_Editor_claps'></i>"
    }, {
        "htm": "<i class='KB_Editor_yoyo'></i>"
    }, {
        "htm": "<i class='KB_Editor_ontarget'></i>"
    }];

    curtoolbarobject = editor.toolbarobject[command];

    hideDropDown = function() {
        if (ze_dropdowndiv) {
            editor.toolbardiv.removeChild(ze_dropdowndiv);
            ZohoDeskEditor.removeClass(curtoolbarobject, "ze_dn");
            if (command != "attach") {
                ZohoDeskEditor.removeClass(curtoolbarobject, "ze_Sel");
            }
            ZohoDeskEditor._removeEvent(_document, "mousedown", mouse_down); //No I18N
            ZohoDeskEditor._removeEvent(_doc, "mousedown", mouse_down); //No I18N
            ZohoDeskEditor._removeEvent(_doc, "keydown", mouse_down); //No I18N
        }
    };

    mouse_down = function(ev) {
        ze_dropdowndiv = editor.toolbardiv.getElementsByClassName("KB_Editor_common_DropDown")[0];
        if (ev) {
            _target = ev.path[0];
            for (; _target !== null && _target !== ze_dropdowndiv;) {
                _target = _target.parentNode;
            };
        }
        if (!_target) {
            hideDropDown();
        }
    };

    ul_click = function(ev) {
        var _target = ev.path[0];
        if (editor.mode == "richtext") {
            if (selectedRange) {
                editor.win.focus();
                editor.restoreSelection(selectedRange);
            }
        }
        switch (command) {
            case "fontfamily": //No I18N
                editor.win.focus(); //No I18N
                editor.updateFontfamily(_target, curtoolbarobject);
                break;
            case "fontSize": //No I18N
                editor.win.focus();
                editor.updateFontsize(_target, curtoolbarobject, command);
                break;
            case "forecolor": //No I18N
            case "backcolor": //No I18N
                editor.win.focus(); //No I18N
                editor.updateColor(_target, _anchorelement, command);
                break;
            case "alignoptions": //No I18N
            case "listoptions": //No I18N
            case "indentoptions": //No I18N
            case "insertoptions":
            case "direction" :
                _target && editor.updateFormatoptions(_target, curtoolbarobject, action, ev);
                break;
            case "otheroptions": //No I18N
                editor.updateOtheroptions(_target, action);
                break;
            case "heading":
                editor.heading(_target,editor,curtoolbarobject);
                break;
            case "smiley": //No I18N
                editor.insertSmiley(_target);
                break;
            case "moreoptions":
                editor.updateMoreOptions(_target, curtoolbarobject, action, ev);
                break;
            case "styletext":
                editor.insertTextStyles(ev);
                break;
        }

        hideDropDown();
    };

    switch (command) {
        // case "spellcheck":
        //      editor.spellcheckOptions(ev,command);
        case "fontfamily": //No I18N

            ddoptions = {
                "type": command,
                "list": ZohoDeskEditor_Init[command]
            }; //No I18N
            var _queryCommandFontFamilyValue = editor.doc.queryCommandValue("fontname"), //No I18N
                _firstFontFamilyValue,
                fontFamilyLiArrayLength = ZohoDeskEditor_Init[command].length,
                count;

            if (_queryCommandFontFamilyValue) {
                _firstFontFamilyValue = _queryCommandFontFamilyValue.split(",")[0].toLowerCase();
                for (count = 0; count < fontFamilyLiArrayLength; count++) {
                    var fontFamilyLiObj = ZohoDeskEditor_Init[command][count];
                    if (fontFamilyLiObj.ff.split(",")[0].toLowerCase() === _firstFontFamilyValue) {
                        //if (fontFamilyLiObj.ff.indexOf(_firstFontFamilyValue)!=-1){
                        fontFamilyLiObj.liClass = "sel"; //No I18N
                    } else {
                        fontFamilyLiObj.liClass = "";
                    }
                }
            }
            break;
        case "fontSize":

            ddoptions = {
                "type": command,
                "list": ZohoDeskEditor_Init[command]
            }; //No I18N
            var _fontSizeValue = editor.doc.queryCommandValue("fontSize"),
                i, data_size; //No I18N
            var fontSizeAnchorArray = ZohoDeskEditor_Init[command];
            var fontSizeAnchorArrayLength = fontSizeAnchorArray.length;

            if (!_fontSizeValue) {
                _fontSizeValue = editor.getFormattingValues("size");
            }

            if (_fontSizeValue) {
                switch (_fontSizeValue) {
                    case "1":
                    case 1:
                    case "10px": // to deal with chrome  //No I18N
                        data_size = "1";
                        break;
                    case "2":
                    case 2:
                    case "13px": //No I18N
                        data_size = "2";
                        break;
                    case "3":
                    case 3:
                    case "16px": //No I18N
                        data_size = "3";
                        break;

                    case "4":
                    case 4:
                    case "18px": //No I18N
                        data_size = "4";
                        break;

                    case "5":
                    case 5:
                    case "24px": //No I18N
                        data_size = "5";
                        break;

                    case "6":
                    case 6:
                    case "32px": //No I18N
                        data_size = "6";
                        break;

                    case "7":
                    case 7:
                    case "48px": //No I18N
                        data_size = "7";
                        break;

                }
                for (i = 0; i < fontSizeAnchorArrayLength; i++) {
                    if (fontSizeAnchorArray[i].datAttr === data_size) {
                        fontSizeAnchorArray[i].liClass = "sel";
                    } else {
                        fontSizeAnchorArray[i].liClass = "";
                    }
                }
            } else {
                for (i = 0; i < fontSizeAnchorArrayLength; i++) {
                    fontSizeAnchorArray[i].liClass = "";
                }
            }
            break;
        case "forecolor": //No I18N
        case "backcolor": //No I18N
            ddoptions = {
                "type": "colorpicker",
                "ulClass": "zde_cb",
                "list": colors
            }; //No I18N
            break;
        case "smiley": //No I18N
            ddoptions = {
                "type": command,
                "ulClass": "zde_sb",
                "list": smileys
            }; //No I18N
            break;
        case "otheroptions":
            //No I18N
            ddoptions = {
                "type": action,
                "list": ZohoDeskEditor_Init[action],
                "editr": editor
            }; //No I18N
            ddoptions.ulClass = "ze_ddr"; //No I18N
            break;
        case "alignoptions": //No I18N
        case "listoptions": //No I18N
        case "indentoptions":
        case "insertoptions":
        case "heading":
        case "moreoptions" :
        case "direction" :
            ddoptions = {
                "type": action,
                "list": ZohoDeskEditor_Init[action]
            };
            break;
        case "directionoptions":
            ddoptions = {
                "type": action,
                "list": ZohoDeskEditor_Init[action]
            };
            break;
        case "attach": //No I18N
            ddoptions = {
                "type": command,
                "list": ZohoDeskEditor_Init.attachDrop
            }; //No I18N
            break;
        case "styletext":
            ddoptions = {
                "type": command
            };
            break;
    }
    editor.win.focus();
    if (editor.mode == "richtext") {
        selectedRange = editor.saveSelection(); //save the selection since selection gets lost in ie
    }
    ZohoDeskEditor.conDrop(ddoptions, editor);
    /*for ie save the selection because when clicked outside the selection gets lost*/

    ze_dropdowndiv = editor.toolbardiv.getElementsByClassName("KB_Editor_common_DropDown")[0];
    if (command == "fontfamily") {
        ze_dropdowndiv.style.width = "175px";
    } else if (command == "fontSize") { //No I18N
        ze_dropdowndiv.style.width = "60px";
    }
    ZohoDeskEditor.addClass(curtoolbarobject, "ze_dn");
    ZohoDeskEditor.addClass(curtoolbarobject, "ze_Sel");

    /*ul_click present above  */

    ZohoDeskEditor._addEvent(ze_dropdowndiv, "click", ul_click); //No I18N
    ZohoDeskEditor._addEvent(_document, "mousedown", mouse_down); //No I18N
    ZohoDeskEditor._addEvent(_doc, "mousedown", mouse_down); //No I18N
    ZohoDeskEditor._addEvent(_doc, "keydown", mouse_down); //No I18N
    while (_anchorelement.nodeName !== null && _anchorelement.nodeName !== "LI") { //No I18N
        _anchorelement = _anchorelement.parentNode;
    }
    _style = ze_dropdowndiv.style;
    var _slideBarArrowStyle = ze_dropdowndiv.getElementsByClassName("KB_Editor_Slidebar_Arrow")[0].style,
        _anchorLeft = _anchorelement.offsetLeft,
        _anchorTop = _anchorelement.offsetTop,
        _anchorWidth = _anchorelement.offsetWidth,
        _anchorHeight = _anchorelement.offsetHeight;
    var left = _anchorLeft + (_anchorWidth / 2) - ( ze_dropdowndiv.offsetWidth / 2);
    if(left + ze_dropdowndiv.offsetWidth > editor.outerdiv.offsetWidth){
        _style.right = ZohoDeskEditor_Init.dropDownLeftPadding + "px";
    }
    else if(left < 0){
        _style.left = ZohoDeskEditor_Init.dropDownLeftPadding + "px";
    }
    else{
        _style.left = left + "px";
    }
    _style.top = _anchorTop + _anchorHeight + ZohoDeskEditor_Init.dropDownTopPadding + "px";
    left = (_anchorLeft - ze_dropdowndiv.offsetLeft - 5) + _anchorWidth / 2;
    _slideBarArrowStyle.left  = left < 0 ? "15px" : left + "px";
    if(command === "styletext"){
        SolutionForm.hideBg();
        SolutionForm.needBg();
    }
};
function attachOnClick(_list,_editor) {
    return function() {
        _list.clk(_editor);
    };
};
ZohoDeskEditor.conDrop = function(options, _editor) {
    var divElem, ulElem, liElem, i, optlen = options.list ? options.list.length : 0;
    divElem = document.createElement("div");
    divElem.id = "ze_dropdown";
    divElem.className = "KB_Editor_common_DropDown";
    ulElem = document.createElement("ul");
    if (options.ulClass) {
        ulElem.className = options.ulClass;
    }
    if(["insertoptions","direction","moreoptions"].indexOf(options.type) > -1){
         divElem.classList.add("KB_Editor_Morediv");
    }
    if(options.type === "attach"){
        divElem.classList.add("KB_Editor_imagediv");
    }
    if(options.type === "align" || options.type === "indent" || options.type === "list"){
        divElem.classList.add("KB_Editor_DropDown_Icons");
    }
    //if(["heading", "colorpicker", "fontSize", "insertoptions", "moreoptions", "styletext", "align", "list", "indent", "attach"].indexOf(options.type) >= 0){
    var _span = document.createElement('span');
    _span.className = ZohoDeskEditor_Init.slidebarClass || "KB_Editor_DropDown_Slidebar";
    var _spanArrow = document.createElement('span');
    _spanArrow.className = "KB_Editor_Slidebar_Arrow";
    _span.appendChild(_spanArrow);
    if(options.type === "styletext"){
        divElem.appendChild(_span);
    }
    else{
        ulElem.appendChild(_span);
    }
    //}
    for (i = 0; i < optlen; i++) {
        liElem = document.createElement("li");
        if (options.type == "fontSize") {
            liElem.setAttribute("data-size", options.list[i].datAttr);
        } else if (options.type == "fontfamily") { //No I18N
            liElem.style.fontFamily = options.list[i].ff;
        } else if (options.type == "colorpicker") { //No I18N
            liElem.style.backgroundColor = options.list[i];
        } else if (["insertoptions","direction","moreoptions","align","list","indent","textDir","others","heading"].indexOf(options.type) > -1) { //No I18N
            liElem.setAttribute("data-" + options.type, options.list[i].datAttr);
        }
        if (options.list[i].htm) {
            if (options.list[i].datAttr && options.list[i].datAttr == "switchmode") {
                if (!_editor.initobj.avoidPlainText) {
                    if (options.editr.mode == "richtext") {
                        liElem.innerHTML = "Plain Text mode"; //No I18N
                    } else if (options.editr.mode == "plaintext") { //No I18N
                        liElem.innerHTML = "Rich Text mode"; //No I18N
                    }
                } else {
                    continue;
                }
            }
            else if(options.type === "heading" && options.list[i].datAttr != "div"){
                var hTag = document.createElement(options.list[i].datAttr);
                hTag.innerHTML = options.list[i].htm;
                liElem.appendChild(hTag);
            }
            else if(options.list[i].svgId){   //options.list[i].iconClass
                var iconSpan = document.createElement("span"),
                    textSpan = document.createElement("span"),
                    listName = options.list[i].datAttr;
                iconSpan.className = options.list[i].iconClass;
                textSpan.className = "KB_Editor_text";
                textSpan.innerHTML = options.list[i].htm;
                iconSpan.innerHTML = "<svg><use xlink:href='"+ options.list[i].svgId +"' ></use></svg>";
                liElem.appendChild(iconSpan);
                liElem.appendChild(textSpan);
            }
            else {
                liElem.innerHTML = options.list[i].htm;
            }
        }
        if (options.list[i].liClass) {
            liElem.className = options.list[i].liClass;
        }
        ulElem.appendChild(liElem);
        if (options.list[i].clk) {
            var _list = options.list[i];
            ZohoDeskEditor._addEvent(liElem, "click", attachOnClick(_list,_editor)); //No I18N
        }
    }
    if(options.type === "styletext"){
        var elem = document.getElementById("SolutionForm_Content_Text_Property").children[0].cloneNode(true);
        divElem.appendChild(elem);
        elem = document.getElementsByClassName("SolutionForm_openBg")[0].cloneNode(true);
        divElem.appendChild(elem);
    }
    else{
        divElem.appendChild(ulElem);
    }
    _editor.toolbardiv.appendChild(divElem);
};

ZohoDeskEditor.prototype.updateFontfamily = function(_target, curtoolbarobject) {
    var selaction, editor = this,
        _doc = editor.doc,
        temp_html = editor.getContent(),
        newContent;;
    selaction = _target.style.fontFamily;
    editor.win.focus();
    editor.squireInstance.setFontFace(selaction);
    editor.saveCurrentState();
};

ZohoDeskEditor.prototype.updateFontsize = function(_target, curtoolbarobject, command) {
    var editor = this,
        _doc = editor.doc,
        temp_html = editor.getContent(),
        newContent;
    if(ZohoDeskEditor_Init.changedTools.indexOf(command) < 0){
        curtoolbarobject.innerHTML = _target.innerHTML + curtoolbarobject.innerHTML.substring(curtoolbarobject.innerHTML.indexOf("<"));
    }
    editor.win.focus();
    var dataAtt = _target.getAttribute("data-size");
    editor.squireInstance.setFontSize(editor.fontsizeConversion("fontvaltopx", dataAtt) + "px"); //No I18N
    editor.saveCurrentState();
};
ZohoDeskEditor.prototype.updateColor = function(_target, _anchorelement, command) {
    var col, i, collen, editor = this,
        _doc = editor.doc,
        temp_html = editor.getContent(),
        newContent;
    col = _target.style.backgroundColor;
    col = col.replace(/rgb\(|\)/g, "").split(",");
    collen = col.length;
    for (i = 0; i < collen; i++) {
        col[i] = parseInt(col[i], 10).toString(16);
        col[i] = (col[i].length == 1) ? '0' + col[i] : col[i];
    }
    col = '#' + col.join("");
    editor.win.focus();
    if (command == "backcolor") { //No I18N
        editor.squireInstance.setHighlightColour(col);
    } else if (command == "forecolor") { //No I18N
        editor.squireInstance.setTextColour(col);
    }
    /*if (command == "backcolor") {
        var value = _doc.queryCommandValue("backcolor"); //No I18N
        if (typeof(value) == "number") { //for ie the query returns a number
            _anchorelement.firstChild.style.borderBottom = "3px rgb(" + (value & 0xFF) + "," + ((value >> 8) & 0xFF) + "," + ((value >> 16) & 0xFF) + ") solid"; //No I18N
        } else { //for other browsers
            if (value == "transparent") {
                value = editor.getFormattingValues("highlight") || "white"; //No I18N
            }
            _anchorelement.firstChild.style.borderBottom = "3px " + value + " solid"; //No I18N
        }
    } else {
        var value = _doc.queryCommandValue("forecolor"); //No I18N
        if (typeof(value) == "number") { //for ie the query returns a number
            _anchorelement.firstChild.style.color = "rgb(" + (value & 0xFF) + "," + ((value >> 8) & 0xFF) + "," + ((value >> 16) & 0xFF) + ")";
        } else { //for other browsers
            _anchorelement.firstChild.style.color = _doc.queryCommandValue("forecolor");
        }
    }*/
    editor.saveCurrentState();
};

ZohoDeskEditor.prototype.updateMoreOptions = function(_target, curtoolbarobject, action, ev){
    var editor = this;
    if(_target){
        editor.updateFormatoptions(_target, curtoolbarobject, action, ev);
        editor.updateOtheroptions(_target, curtoolbarobject, action, ev);
    }
};
ZohoDeskEditor.prototype.updateFormatoptions = function(_target, curtoolbarobject, action, ev) {
    var selaction, editor = this,
        _doc = editor.doc;

    while(_target.nodeName != "LI"){
        _target = _target.parentElement;
    }
    selaction = _target.getAttribute("data-" + action);
    editor.win.focus();
    switch (selaction) {
        case "justifyleft": //No I18N
            editor.squireInstance.setTextAlignment("left");
            action === "align" && (curtoolbarobject.innerHTML = "<svg><use xlink:href='#KBEditortools_align_left'></use></svg>"); // No I18N
            break;
        case "justifyright": //No I18N
            editor.squireInstance.setTextAlignment("right");
            action === "align" && (curtoolbarobject.innerHTML = "<svg><use xlink:href='#KBEditortools_align_right'></use></svg>"); // No I18N
            break;
        case "justifyfull": //No I18N
            editor.squireInstance.setTextAlignment("full");
            action === "align" && (curtoolbarobject.innerHTML = "<svg><use xlink:href='#KBEditortools_align_justify'></use></svg>"); // No I18N
            break;
        case "justifycenter": //No I18N
            editor.squireInstance.setTextAlignment("center");
            action === "align" && (curtoolbarobject.innerHTML = "<svg><use xlink:href='#KBEditortools_align_center'></use></svg>"); // No I18N
            break;
        case "rtl":
        case "ltr":
            editor.doc.body.style.direction = selaction;
            action === "direction" && (curtoolbarobject.innerHTML = "<svg><use xlink:href='#KBEditortools_"+selaction+"'></use></svg>");
            break;
        case "insertunorderedlist": //No I18N
            editor.insertListOperation("UL");
            action === "list" && (curtoolbarobject.innerHTML = "<svg><use xlink:href='#KBEditortools_list_round'></use></svg>"); // No I18N
            break;
        case "insertorderedlist": //No I18N
            editor.insertListOperation("OL");
            action === "list" && (curtoolbarobject.innerHTML = "<svg><use xlink:href='#KBEditortools_list_number'></use></svg>"); // No I18N
            break;
        case "removelist":
            editor.squireInstance.removeList();
            break;
        case "indent": //No I18N
            if (editor.doc.queryCommandState("insertOrderedList") || editor.doc.queryCommandState("insertUnOrderedList")) {
                editor.squireInstance.increaseListLevel();
            } else {
                editor.squireInstance.increaseQuoteLevel();
                action === "indent" && (curtoolbarobject.innerHTML = "<svg><use xlink:href='#KBEditortools_increaseindent'></use></svg>");
            }
            break;
        case 'table': //No I18N
            editor.createTable();
            break;
        case 'object': //No I18N
            editor.insertObj();
            break;
        case 'code': //No I18N
            editor.insertCode();
            break;
        case 'edithtml': //No I18N
            editor.htmlView();
            break;
        case 'inserthorizontalrule':
            editor.doc.execCommand(selaction, false, undefined);
            editor.updateToolbar();
            break;
        case "outdent": //No I18N
            if (editor.doc.queryCommandState("insertOrderedList") || editor.doc.queryCommandState("insertUnOrderedList")) {
                editor.squireInstance.decreaseListLevel();
            }
            else{
                editor.squireInstance.decreaseQuoteLevel();
                action === "indent" && (curtoolbarobject.innerHTML = "<svg><use xlink:href='#KBEditortools_decreaseindent'></use></svg>"); // No I18N
            }
            break;
        case 'link': //No I18N
        case 'unlink' :
            editor.execCommand(ev, selaction);
            break;
        case "embed":
            editor.insertVideo();
            break;
    }

    editor.saveCurrentState();
};
ZohoDeskEditor.prototype.insertVideo = function() {
    var editor = this,
        html = undefined,
        $zeLinkDiv = undefined,
        close = undefined,
        cancel = undefined,
        insert = undefined,
        okButton = undefined,
        hideLinkDiv = undefined,
        keyEventHandler = undefined,
        input = undefined;
    var convertMedia = function(url) {
        url = url.trim();
        var vimeo = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/(?:channels\/)?(?:staffpicks\/)?(.+)/g;
        var dailyMotion = /(?:http?s?:\/\/)?(?:www\.)?(?:dailymotion\.com)\/(?:video)\/?(.+)/g;
        var youtube = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(youtube);
        var replacement = "",
            html = "";
        if (vimeo.test(url)) {
            replacement = '<iframe width="640" height="360" src="https://player.vimeo.com/video/$1" frameborder="0" allowfullscreen></iframe>';
            html = url.replace(vimeo, replacement);
        } else if (match && match[0].indexOf("youtu") > -1 && match.length) {
            replacement = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + match[2] + '" frameborder="0" allowfullscreen></iframe>';
            html = url.replace(youtube, replacement);
        } else if (dailyMotion.test(url)) {
            replacement = '<iframe width="480" height="270" src="//www.dailymotion.com/embed/video/$1" frameborder="0" allowfullscreen></iframe>';
            html = url.replace(dailyMotion, replacement);
        } else {
            html = '<iframe width="560" height="315" src="' + url + '" allowfullscreen></iframe>';
        }
        return html;
    };
    okButton = function(ev) {
        var urlValue = input.value;
        if (urlValue && urlValue.length) {
            var regex = /^(https?:)?\/\/((www\.youtube\.com)|(www\.youtube-nocookie\.com)|(([a-z\-]+\.)?flowplayer\.org)|(www\.screencast\.com)|(www\.useloom\.com)|(([a-z\-]+\.)?vimeo\.com)|(www\.dailymotion\.com)|(fast\.wistia\.net\/(embed\/)?(iframe\/)?[a-zA-Z0-9&amp;;:%=_#!\-\/\.\?]*)|(w\.soundcloud\.com)|((?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/plugins\/(page|post).php(\?([a-zA-Z0-9&amp;:%=_#!\-\/\.](&amp;amp;)?)*)?)|(whatfix\.com)|([a-z\-]+\.zoho\.com)|([a-z\-]+\.google\.com)|([a-z\-]+\.efficientforms\.com)).*$/;
            if (!regex.test(urlValue)) {
                editor.initobj.handleAlertMessage ? editor.initobj.handleAlertMessage("We don't support this URL for security purposes") : alert("We don't support this URL for security purposes");
            } else {
                editor._stopEvent(ev);
                editor.insertHTML(convertMedia(urlValue));
                hideLinkDiv();
            }
        } else {
            editor.initobj.handleAlertMessage ? editor.initobj.handleAlertMessage("URL value should not be empty") : alert("URL value should not be empty");
        }
    };
    hideLinkDiv = function() {
        ZohoDeskEditor._removeEvent(document, "keydown", keyEventHandler); // No I18N
        $zeLinkDiv.parentNode && $zeLinkDiv.parentNode.removeChild($zeLinkDiv);
        ZohoDeskEditor.hideOverlay();
        editor.win.focus();
    };
    keyEventHandler = function(ev) {
        if (ev.keyCode === 27) {
            editor._stopEvent(ev);
            hideLinkDiv();
        }
        if (ev.keyCode === 13) {
            editor._stopEvent(ev);
            okButton(ev);
        }
    };
    ZohoDeskEditor.showOverlay();
    html = '<div class="zdeskEditor_PUheader">Insert embed video url<i class="zdei-close"><svg><use xlink:href="#KBEditortools_close"></use></svg></i></div>'; // No I18N
    html += '<div class="zdeskEditor_PUbody">'; // No I18N

    html += '<div class="embed"><span>URL</span><span><input type="text"></span></div></div>';

    html += '<div class="zdeskEditor_PUbtm"><span class="blue-btn">Insert</span><span class="btn" data-val="Cancel">Cancel</span></div></div>'; // No I18N

    var div1 = document.createElement("div"); // No I18N
    div1.className = "zdeskEditor_popup"; // No I18N
    div1.innerHTML = html;
    div1.id = "ze_link"; // No I18N
    document.body.appendChild(div1);
    $zeLinkDiv = div1;
    ZohoDeskEditor.setPosition($zeLinkDiv, editor.outerdiv);
    input = $zeLinkDiv.getElementsByTagName("input")[0];
    $zeLinkDiv.getElementsByClassName("zdei-close")[0].onclick = $zeLinkDiv.getElementsByClassName("btn")[0].onclick = hideLinkDiv;
    $zeLinkDiv.getElementsByClassName("blue-btn")[0].onclick = okButton;
    ZohoDeskEditor._addEvent(document, "keydown", keyEventHandler); // No I18N
    setTimeout(function() {
        input.focus();
    }, 0);
};
ZohoDeskEditor.prototype.heading = function(target, editor, curtoolbarobject){
    var doc = editor.doc,
        selection = doc.getSelection(),
        range = selection.getRangeAt(0);
    curtoolbarobject.innerHTML = target.innerText + curtoolbarobject.innerHTML.substring(curtoolbarobject.innerHTML.indexOf("<"));
    var tagName = target.getAttribute("data-heading") || target.parentElement.getAttribute("data-heading");
    editor.win.focus();
    if(!(doc.execCommand("formatblock", false, tagName))){
        doc.execCommand("formatblock", false, "<"+tagName+">");  //No I18N
    }
    if(tagName.toLowerCase() === "p"){
        var anchor = editor._getSelection().anchorNode;
        var oldEl = anchor.nodeName !== "P" ? anchor.parentElement : anchor;
        var newEl = editor.doc.createElement('div');
        oldEl.parentNode.insertBefore(newEl,oldEl);
        newEl.innerHTML = oldEl.innerHTML;
        selection = doc.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        range.selectNode(newEl);
        oldEl.parentNode.removeChild(oldEl);;
    }
    editor.saveCurrentState();
    editor.updateToolbar();
    editor.initobj.styletext && !editor.isExpanded && editor.handleContentStyles();
};
ZohoDeskEditor.prototype.updateOtheroptions = function(_target, action) {

    var editor = this;
    // var selaction = _target.getAttribute("data-" + action);
    //console.log(editor.mode);
    editor.win.focus();
    if (action == "plainText" || _target.innerText === "Plain Text") {
        if (editor.mode == "richtext") {
            editor.confirmPlainText(editor.getContent());
            //editor.plainText(editor.getContent());
        } else if (editor.mode == "plaintext") { //No I18N
            editor.richText(ZohoDeskEditor.getFormattedContent(editor.getContent()));
        }
    } else if (action == "spellcheck" || _target.innerText === "Spell Check") { //No I18N
        editor.spellcheck();
    }
};


ZohoDeskEditor.prototype.insertSmiley = function(_target) {
    var editor = this,
        value,
        imgStyles = "margin: 0px 10px; vertical-align:middle; width:24px; height:24px;"; //No I18N

    editor.win.focus();
    if (_target.nodeName == "LI") {
        _target = _target.firstChild;
    }
    if (_target.className.indexOf("KB_Editor_") != 0 || _target.nodeName != "I") {
        return;
    }
    value = _target.className.replace("KB_Editor_", ""); //No I18N
    //editor.pasteHTML("<IMG style='" + imgStyles + "' src='" + imgPath + value + ".gif'></IMG>"); //No I18N
    editor.squireInstance.insertImage(ZohoDeskEditor_Init.imgurl+value + ".gif",{"style": imgStyles});
    editor.saveCurrentState();
};