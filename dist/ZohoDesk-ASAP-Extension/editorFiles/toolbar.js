/* $Id$ */
/* globals ZE,ZE_Init,document*/
ZohoDeskEditor.prototype.createToolbar = function() {
    "use strict"; //No I18N

    var editor = this,
        toolbarobject = {},
        toolbararray,
        //initObjToolbar = editor.initobj.toolbar,
        _document = document,
        _body = _document.body,
        I18N = ZohoDeskEditor.i18n,
        zeEditor,
        toolbardiv,
        btnonclick,
        i = 0,
        toolbarArrayLength,
        _ul,
        _ulPlain,
        _li,
        _liPlain,
        _div,
        toolbarinnerarray,
        j,
        toolbarInnerArrayLength,
        commandArray,
        commandName,
        _class,
        executeAction;
    toolbararray = ZohoDeskEditor_Init.toolbarOrder;
    /* toolbar onclick start*/
    btnonclick = function(command) {

        return function(ev) {

            editor._stopEvent(ev); //in ze.js
            //editor.win.focus();
            var sel = editor._getSelection();
            try {
                var range = editor._createRange(sel);
            } catch (e) {
                if (editor.range) {
                    editor.range.select();
                    delete editor.range;
                } else {
                    editor.win.focus();
                }
            }
            editor.execCommand(ev, command);
            return false;
        };
    };
    /* toolbar onclick end*/

    editor.toolbarobject = toolbarobject;

    /* creating toolbardiv start*/
    toolbardiv = _document.createElement("div");
    toolbardiv.className = "KB_Editor_menus";
   /* var outerdiv = document.getElementsByClassName('SolutionForm_OuterDiv')[0];
    outerdiv.appendChild(toolbardiv);*/
    editor.outerdiv.appendChild(toolbardiv);
    editor.toolbardiv = toolbardiv;
    _ul =  _document.createElement("ul");
    _ul.className = "KB_Editor_MultiTools";
    _ulPlain = _document.createElement("ul");
    _ulPlain.className = "KB_Editor_MultiTools"
    editor.toolbardiv.appendChild(_ul);
    editor.toolbardiv.appendChild(_ulPlain);

    /* creating toolbardiv end*/
    var stopEv = function(ev) {
        editor._stopEvent(ev);
        return false;
    };
    executeAction = function() {
        return function(ev) {
            editor._stopEvent(ev); //in ze.js
            var _className = ev.target.className,
                _command,
                sel = editor._getSelection();
            try {
                var range = editor._createRange(sel);
            } catch (e) {
                if (editor.range) {
                    editor.range.select();
                    delete editor.range;
                } else {
                    editor.win.focus();
                }
            }
            switch (_className) {
                case "zei-order": //No I18N
                    _command = "insertorderedlist"; //No I18N
                    break;
                case "zei-unorder": //No I18N
                    _command = "insertunorderedlist"; //No I18N
                    break;
                case "zei-textleft": //No I18N
                    _command = "j-left"; //No I18N
                    break;
                case "zei-textright": //No I18N
                    _command = "j-right"; //No I18N
                    break;
                case "zei-textfull": //No I18N
                    _command = "j-full"; //No I18N
                    break;
                case "zei-textcenter": //No I18N
                    _command = "j-center"; //No I18N
                    break;
            }
            editor.execCommand(ev, _command);
            editor.saveCurrentState();
            return false;
        };
    };
    var _alternateToolbar,
        editorWidth,
        altToolCheck = 0,
        soFarWidth = 0,
        _svgUse,
        _span;

    toolbarArrayLength = toolbararray.length;
    for (i = 0; i < toolbarArrayLength; i++) {
        commandArray = toolbararray[i]; //["bold","Bold Ctrl+B","zei-bold"]
        commandName = commandArray[0]; //bold
        _svgUse = commandArray[2]; //bold
        _class = commandArray[3]; //zei-bold
        _li = _document.createElement("li");
        _ul.appendChild(_li);
        _span = _document.createElement('span');
        _class && (_span.className = _class);
        _span.title = I18N(commandArray[1]);
         var _svgHtml = "";
         if(commandName === "heading" || commandName === "fontSize" || commandName === "insertoptions"){
            _svgHtml = commandName === "heading" ? "Normal" : commandName === "fontSize" ? "18" : "Insert";
         }
         _span.innerHTML = _svgHtml + "<svg><use xlink:href='"+ _svgUse +"' ></use></svg>";
        _li.appendChild(_span);
        if(commandName === "styletext"){
            _li.className = "KB_Editor_FullScreen";
        }
        if(commandName === "plaintext"){
            _span.appendChild(_document.createTextNode("Plain text"));
            _span.classList.remove("KB_Editor_PlainText", "KB_Editor_FullScreen");
            _span.className = "KB_Editor_PlainText";
            _li.classList.add("fright");
        }
        if(commandName === "editorexpand"){
            _li.className = "fright KB_Editor_Expand";
        }
        ZohoDeskEditor._addEvent(_span, "click", btnonclick(commandName)); //No I18N
        ZohoDeskEditor._addEvent(_span, "mousedown", stopEv); //No I18N

        toolbarobject[commandName] = _span;
    }
    /* remove comment to add Spellcheck option */
    /*for(i = 0; i < 2; i++){*/
        _liPlain =  _document.createElement("li");
        _liPlain.className = "KB_Editor_FullScreen";
        _span =  _document.createElement("span");
        /*i === 0 ?*/ _span.className = "KB_Editor_Richtext" /*: _span.className = "icon-KBEditor-spellcheck"*/;
                    _span.innerHTML = "Rich Text<svg><use xlink:href='#KBEditortools_arrow' ></use></svg>"
        /*i === 0 ?*/ /* : ""*/;
        /*if(i === 1){
            var _tempSpan = _document.createElement("span");
            var _tempSpan1 = _document.createElement("span");
            _tempSpan.className = "path1";
            _tempSpan1.className = "path2";
            _span.appendChild(_tempSpan);
            _span.appendChild(_tempSpan1);
            ZohoDeskEditor._addEvent(_span, "click", btnonclick("spellcheck")); //No I18N
        }
        else{*/
            ZohoDeskEditor._addEvent(_span, "click", btnonclick("plaintext"));
        /*}*/
        ZohoDeskEditor._addEvent(_span, "mousedown", stopEv);
        _liPlain.appendChild(_span);
        _ulPlain.appendChild(_liPlain);
    /*}*/
    _ulPlain.style.display = "none";
    if (typeof editor.afterToolbarGenerate === "function") {
        editor.afterToolbarGenerate(toolbarobject);
    }
};

ZohoDeskEditor.prototype.expandToolbar = function(ev) {
    "use strict"; //No I18N
    var editor = this,
        _anchorelement,
        _alternateToolbar,
        _document = document,
        _body = _document.body,
        _altToolbarStyle,
        removeEventListeners;

    _anchorelement = ev.currentTarget; //holds the anchor element;
    _alternateToolbar = editor.alterTool;
    _altToolbarStyle = _alternateToolbar.style;
    if (_altToolbarStyle.display !== "none") {
        _altToolbarStyle.display = "none";
        _anchorelement.parentNode.style.backgroundColor = "";
        return;
    }

    var setPositions = function() {
        var _alterToolbarStyle = editor.alterTool.style;
        _alterToolbarStyle.left = (_anchorelement.offsetParent.offsetLeft + _anchorelement.offsetLeft + _anchorelement.offsetWidth) - editor.alterTool.offsetWidth + "px"; // NO I18N
    };

    var mouseDown = function(event) { //if user clicks outside the iframe
        var alterToolbar = editor.alterTool,
            _target;
        if (ev) {
            _target = event.target;
            for (; _target !== null; _target = _target.parentNode) {
                if (_target === alterToolbar || _target === _anchorelement) {
                    break;
                }
            }
        }
        if (!_target) {
            removeEventListeners();
        }
    };

    removeEventListeners = function() {
        var alterToolbar = editor.alterTool;
        if (alterToolbar) {
            alterToolbar.style.display = "none";
            _anchorelement.parentNode.style.backgroundColor = ""; //No I18N
            ZohoDeskEditor._removeEvent(document, "mousedown", mouseDown); //No I18N
            ZohoDeskEditor._removeEvent(editor.doc, "mousedown", mouseDown); //No I18N
        }
    };
    _altToolbarStyle.display = ""; //No I18N
    _anchorelement.parentNode.style.backgroundColor = "#f1f1f1"; //No I18N
    setPositions();
    editor.removeAlterToolbar = function() {
        if (editor.alterTool.style.display !== "none") { //No I18N
            removeEventListeners();
        }
    }
    ZohoDeskEditor._addEvent(document, "mousedown", mouseDown); //No I18N
    ZohoDeskEditor._addEvent(editor.doc, "mousedown", mouseDown); //No I18N
};
