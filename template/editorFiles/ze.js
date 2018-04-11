/* $Id$*/
/* globals ZE,ZE_Init,Squire,ze_Undo*/
ZohoDeskEditor.prototype.updateToolbar = function() {
    "use strict"; // No I18N
    var editor = this,
        toolbarobject = editor.toolbarobject,
        doc = editor.doc,
        j,
        color,
        value;
    editor.win.focus();
    for (j in toolbarobject) {
        switch (j) {
            case "bold": // No I18N
            case "italic": // No I18N
            case "underline": // No I18N
            case "strikethrough": // No I18N
            case "superscript": // No I18N
            case "subscript": // No I18N
            case "insertorderedlist": // No I18N
            case "insertunorderedlist": // No I18N
                if (doc.queryCommandState(j)) {
                    if (toolbarobject[j].className.search("KB_Editor_sel") < 0) { // No I18N
                        ZohoDeskEditor.addClass(toolbarobject[j].parentElement, "KB_Editor_sel"); // No I18N
                    }
                } else {
                    ZohoDeskEditor.removeClass(toolbarobject[j].parentElement, "KB_Editor_sel"); // No I18N
                }
                break;
            case "alignoptions": // No I18N
                if (doc.queryCommandState("justifyright")) { // No I18N
                    toolbarobject[j].innerHTML = "<svg><use xlink:href='#KBEditortools_align_right'></use></svg>"; // No I18N
                } else if (doc.queryCommandState("justifycenter")) { // No I18N
                     toolbarobject[j].innerHTML = "<svg><use xlink:href='#KBEditortools_align_center'></use></svg>"; // No I18N
                } else if (doc.queryCommandState("justifyfull")) { // No I18N
                     toolbarobject[j].innerHTML = "<svg><use xlink:href='#KBEditortools_align_justify'></use></svg>"; // No I18N
                } else {
                     toolbarobject[j].innerHTML = "<svg><use xlink:href='#KBEditortools_align_left'></use></svg>"; // No I18N
                }
                break;
            case "listoptions": // No I18N
                if(doc.queryCommandState("insertunorderedlist")) {
                  toolbarobject[j].innerHTML = "<svg><use xlink:href='#KBEditortools_list_round'></use></svg>";
                }
                else if(doc.queryCommandState("insertorderedlist")) {
                toolbarobject[j].innerHTML = "<svg><use xlink:href='#KBEditortools_list_number'></use></svg>";
                }
                break;
            case "forecolor": // No I18N
                /*var fontcolor = doc.queryCommandValue("forecolor") || "black"; // No I18N
                value = fontcolor;
                if (typeof value === "number") {
                    toolbarobject[j].firstChild.style.color = "rgb(" + (value & 0xFF) + "," + ((value >> 8) & 0xFF) + "," + ((value >> 16) & 0xFF) + ")"; // No I18N
                } else {
                    toolbarobject[j].firstChild.style.color = fontcolor;
                }*/
                break;
            case "backcolor": // No I18N
                /*try {
                    color = doc.queryCommandValue("backcolor") || doc.queryCommandValue("hilitecolor"); // No I18N

                    if (/transparent/i.test(color)) { // firefox returns transparent
                        color = editor.getFormattingValues("highlight") || "white"; // No I18N
                    } else if (color === "rgba(0, 0, 0, 0)") { //  Mozilla and Chrome // No I18N
                        color = "white"; // No I18N
                    }
                    value = color;
                    if (typeof value === "number") { // No I18N
                        parseInt(value + "");
                        toolbarobject[j].firstChild.style.borderBottom = "3px rgb(" + (value & 0xFF) + "," + ((value >> 8) & 0xFF) + "," + ((value >> 16) & 0xFF) + ") solid"; // No I18N
                    } else {
                        toolbarobject[j].firstChild.style.borderBottom = "3px " + color + " solid"; // No I18N
                    }
                } catch (e) {
                    // Empty block statement
                }*/
                break;
            case "fontfamily": // No I18N
                if(ZohoDeskEditor_Init.changedTools.indexOf(j) < 0){
                    // try {
                    //             //   var fname = doc.queryCommandValue("fontname") || ZE_Init.defaultFontFamily;     //No I18N
                    //             //   toolbarobject[j].firstChild.style.fontFamily = fname;
                    //             //   fname = fname.split(",")[0];
                    //             //   fname = fname.replace(/['"]/gi, '');
                    //             //   toolbarobject[j].firstChild.innerHTML = ZE.ffDisp[fname.toLowerCase()];
                    // } catch (e) {
                    //   // Empty Block Statement
                    // }
                    try {
                        var fname = doc.queryCommandValue("fontName"); // No I18N
                        if (fname) {
                            toolbarobject[j].firstChild.innerHTML = ZohoDeskEditor.fsDisp[fname];
                        } else {
                            var fontname = editor.getFormattingValues("fontName"); // No I18N


                            // if (fontname) {
                            //   toolbarobject[j].firstChild.innerHTML = editor.fontsizeConversion("pxtopt", parseInt(fontsize));// No I18N
                            // } else if (fsize === 0) {
                            //   toolbarobject[j].firstChild.innerHTML = ZE.fsDisp[2];
                            // } else {
                            toolbarobject[j].firstChild.innerHTML = parseInt(ZohoDeskEditor_Init.defaultFontFamily);
                            // }
                        }
                    } catch (e) {
                        // Empty Block Statement
                    }
                    break;
                }
            case "fontSize": // No I18N
                if(ZohoDeskEditor_Init.changedTools.indexOf(j) < 0){
                    try {
                        var fsize = doc.queryCommandValue("fontsize"); // No I18N
                        var tag = toolbarobject[j].innerHTML.substring(toolbarobject[j].innerHTML.indexOf("<"));
                        if (fsize) {
                            toolbarobject[j].innerHTML = ZohoDeskEditor.fsDisp[fsize] + tag; //No I18N
                        } else {
                            var fontsize = editor.getFormattingValues("size"); // No I18N
                            if (fontsize) {
                                toolbarobject[j].innerHTML = editor.fontsizeConversion("pxtopt", parseInt(fontsize)) + tag; // No I18N
                            } else if (fsize === 0) {
                                toolbarobject[j].innerHTML = ZohoDeskEditor.fsDisp[2] + tag; //No I18N
                            } else {
                                toolbarobject[j].innerHTML = ZohoDeskEditor_Init.defaultFontSize + tag; //No I18N
                            }
                        }
                    } catch (e) {
                        // Empty Block Statement
                    }
                    break;
                }
            case "heading":
                if(ZohoDeskEditor_Init.changedTools.indexOf(j) < 0){
                    var heading = doc.queryCommandValue('formatblock');
                    var tag = toolbarobject[j].innerHTML.substring(toolbarobject[j].innerHTML.indexOf("<"));
                    if(Number(heading.charAt(heading.length - 1))){
                        toolbarobject[j].innerHTML = ZohoDeskEditor_Init.heading[Number(heading.charAt(heading.length - 1)) - 1].htm + tag;
                    }
                    else {
                        toolbarobject[j].innerHTML = ZohoDeskEditor_Init.heading[3].htm + tag;
                    }
                    break;
                    }
            }
    }
};

ZohoDeskEditor.prototype.createEditor = function() {
    "use strict"; // No I18N
    var editor = this,
        _document = document,
        _iframe,
        _initobj = editor.initobj,
       // parentDiv = _document.getElementById(_initobj.id),
        constructIframe,
        handleDragOver,
        handleEditorDrop,
        handleEditorPasteImages,
        handleDragLeave;
    ZohoDeskEditor.is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1; // No I18N
    /* creating editor start */
    _iframe = _document.createElement('iframe'); // No I18N
    editor.iframe = _iframe;
    _iframe.className = "KB_Editor_iframe"; // No I18N
    _iframe.setAttribute("name","deskEditor_New");
    constructIframe = function() {

        var win = _iframe.contentWindow,
            doc = win.document || _iframe.contentDocument,
            docBody = doc.body,
            _initobjContent = _initobj.content,
            _replyText = _initobj.replyText || {},
            setClassOnBody,
            fontFamily,
            fontSize,
            margin,
            padding,
            lineHeight,
            backgroundColor,
            _div,
            loadEditorCss;
        editor.win = win;
        editor.doc = doc;
        _iframe.onload = null;
        // if (doc.write) {
        //   doc.open();
        //   doc.write("<!DOCTYPE html><html><body><div><br/></div></body></html>"); // No I18N
        //   doc.close();
        // }
        loadEditorCss = function(fileName) { // No I18N
            var _head = doc.getElementsByTagName("head")[0]; // No I18N
            var css = doc.createElement("link"); // No I18N
            css.type = 'text/css'; // No I18N
            css.rel = 'stylesheet'; // No I18N
            css.href = ZohoDeskEditor_Init.cssPath+fileName; // No I18N

            /* mac safari 3.2 will not have head tag*/
            if (!_head) {
                docBody.parentNode.insertBefore(doc.createElement("head"), docBody); // No I18N
                _head = doc.getElementsByTagName("head")[0]; // No I18N
            }
            if (_head) {
                _head.appendChild(css);
            }
        };
        editor.doc.body.contentEditable = true;

        /* setting event listeners for document*/
        ZohoDeskEditor._addEvent(doc, "mousedown", function(ev) { // No I18N
            var _anchorElement = ev.target;
            var flag = true;
            while (_anchorElement !== null) {
                if (_anchorElement.nodeName === "IMG") { // No I18N
                    editor.initobj.trackimgclick && editor.initobj.trackimgclick(_anchorElement);
                    editor.resizeimage(ev, _anchorElement);
                    if(editor.initobj.styletext){
                        document.getElementById('SolutionForm_Content_Property_Tab').click();
                    }
                    editor._stopEvent(ev);
                    flag = false;
                    return false;
                }
                if(_anchorElement.id === "resizeablewrapper" || _anchorElement.id === "wrapperbottom"){
                    flag = false;
                }
                else if(["TD","TR","TBODY","TABLE"].indexOf(_anchorElement.nodeName) > -1){
                    editor.initobj.styletext && editor.initobj.tracktableclick(ev.target);
                    flag = false;
                    return false;
                }
                _anchorElement = _anchorElement.parentNode;
            }
            if(flag){
                editor.initobj.styletext && (SolutionForm.tableClicked = false);
                editor.removeResize(ev);
            }
            /*var target_moving = doc.getElementsByClassName("target_moving");
            var target_moving_length = target_moving ? target_moving.length : 0;
            if(target_moving_length){
                for(var i = 0; i < target_moving_length; i++){
                    !target_moving.childNodes ? target_moving.parentNode.removeChild(target_moving); : !target_moving.childNodes.length && target_moving.parentNode.removeChild(target_moving);
                }
            }*/  //Check upload image remove = function() and remove this
        });

        /* handles mouse move event listeners for document */
//        ZohoDeskEditor._addEvent(doc, "mousemove", function(ev){
//          editor.updateToolbar();
//          var _anchorTarget = ev.target;
//          if (doc.getElementById("_resizecolDivs")) {
//              var _resize = doc.getElementById("_resizecolDivs");
//              _resize.parentElement.removeChild(_resize);
//          }
//          while(_anchorTarget !== null){
//              if(_anchorTarget.nodeName === "TABLE"){
//                  editor.resizeColumn(_anchorTarget);
//                  break;
//              }
//              else {
//                  _anchorTarget = _anchorTarget.parentNode;
//              }
//          }
//          if (doc.getElementById("_resizecolDivs")) {
//              var _resize = doc.getElementById("_resizecolDivs");
//              _resize.parentElement.removeChild(_resize);
//          }
//        });

        /* hanldes mouse up event listeners for the document*/
        ZohoDeskEditor._addEvent(doc, "mouseup", function(ev) { // No I18N
            editor.updateToolbar(); // present above
            if (doc.getElementById("_enclosingDiv")) {
                return false;
            }
            if(doc.getElementsByClassName("enc").length >= 1){
                return false;
            }
            if(doc.getElementById("_colEncloseDiv")){
                return false;
            }
            var _anchorElement = ev.target,
                timer;
            while (_anchorElement !== null) {
                if (_anchorElement.nodeName === "A") { // No I18N
                    if (_anchorElement.hasAttribute("data-hugatt")) {
                        return false;
                    } else {
                        editor._stopEvent(ev);
                        editor.showAnchorTag(_anchorElement, ev);
                        return false;
                    }
                } else if (_anchorElement.nodeName === "IMG") { // No I18N
                    if (_anchorElement.parentNode.nodeName === "A") { // No I18N
                        editor._stopEvent(ev);
                        editor.showAnchorTag(_anchorElement.parentNode, ev);
                    }
                    return false;
                } else if (_anchorElement.nodeName === "TABLE") {
                    if (doc.getElementById("_enclosingDiv")) {
                        return false;
                    } else {
                        editor.resizeTable(_anchorElement);
                        //editor.initobj.styletext && editor.handleContentStyles();
                        return false;
                    }
                }
                else {
                    _anchorElement = _anchorElement.parentNode;
                }
            }
            clearTimeout(timer);
            timer = setTimeout(function() {
                editor.initobj.styletext && editor.handleContentStyles();
            }, 10);
        });
        handleDragOver = function(evt) { // No I18N
            var dt = evt.dataTransfer,
                I18N = ZohoDeskEditor.i18n,
                effectAllowed;
            editor.win.focus();
            if ((dt.types !== null || (dt.files && dt.files.length > 0)) && !evt.fromPaste) {
                if ((dt.files && dt.files.length > 0) ||
                    (dt.types.indexOf ? dt.types.indexOf('Files') !== -1 : dt.types.contains('application/x-moz-file')) || // No I18N
                    dt.types[0] === "Files") { // No I18N
                    clearTimeout(editor.dragTimer);
                    effectAllowed = dt.effectAllowed;
                    dt.dropEffect = (effectAllowed === 'move' || effectAllowed === 'linkMove') ? 'move' : 'copy'; // No I18N
                    var _selection;
                    _selection = editor.saveSelection();
                    var $mask,
                        maskStyle,
                        $maskSpan;

                    $mask = doc.getElementById("mask_editor"); // No I18N
                    if (!$mask) {
                        $mask = doc.createElement('div'); // No I18N
                        $mask.contentEditable = "false"; // No I18N
                        $mask.id = "mask_editor"; // No I18N
                        $maskSpan = doc.createElement('span');
                        $maskSpan.innerHTML = I18N("Drop Files to Attach");
                        $mask.appendChild($maskSpan);
                        doc.body.appendChild($mask);
                        maskStyle = $mask.style;
                        maskStyle.height = editor.doc.body.offsetHeight + "px"; // No I18N
                        maskStyle.left = "0px"; // No I18N
                        maskStyle.position = "absolute"; // No I18N
                        if (_selection) {
                            editor.restoreSelection(_selection);
                        }
                        editor.win.focus();
                    }
                }
                editor._stopEvent(evt);
            }
        };

        handleDragLeave = function(evt) { // No I18N
            editor.dragTimer = setTimeout(function() {
                var mask = doc.getElementById("mask_editor"); // No I18N
                if (mask) {
                    mask.parentElement.removeChild(mask);
                }
            }, 250);
            editor._stopEvent(evt);
        };
        handleEditorPasteImages = function(evt){
             for (var items = evt.dataTransfer.items, itemsLength = items.length, i = 0; itemsLength > i; i++){
                 if ("file" === items[i].kind && "image/png" === items[i].type) {
                     editor.processInlineImages(items[i].getAsFile(),"customPaste");
                 }
             }
        };
        handleEditorDrop = function(evt) {
            var files = evt.dataTransfer.files;
            if (files) {
                editor._stopEvent(evt);
                var mask = doc.getElementById("mask_editor"),
                    length = 0,
                    count = 0; // No I18N
                if (mask) {
                    mask.parentElement.removeChild(mask);
                }
                editor.win.focus();
                if(evt.editorCustomPaste){
                    editor.initobj.processPastedFile && handleEditorPasteImages(evt);
                    return;
                }
                length = files.length;
                if(length > 5){
                    editor.initobj.handleAlertMessage ? editor.initobj.handleAlertMessage("Only 5 files are allowed") : alert("Only 5 files are allowed");
                    return;
                }
                for (var i = 0; i < files.length; i++) {
                    if (!files[i].type || files[i].type.indexOf("image") < 0 || files[i].size/(1024*1024) > 20) { // No I18N
                        count ++;
                        break;
                    }
                    else{
                        editor.processInlineImages(files[i],"drop");
                    }
                }
                if(count > 0){
                    var msg  = count === 1 ? "one file is not supported" : count +" "+ "files are not supported";
                    editor.initobj.handleAlertMessage ? editor.initobj.handleAlertMessage(msg) : alert(msg);
                }
            }
            else if(evt.editorCustomPaste){
                editor.initobj.processPastedFile && handleEditorPasteImages(evt);
                return;
            }
        };
        if(editor.initobj.handleInlineDropImage){
            ZohoDeskEditor._addEvent(doc, 'drop', handleEditorDrop); // No I18N
            ZohoDeskEditor._addEvent(doc, 'dragover', handleDragOver); // No I18N
            ZohoDeskEditor._addEvent(doc, 'dragleave', handleDragLeave); // No I18N
        }

        var stack;
        var initializeUndo = function() {
            // editor.initiateUndoRedo();
            editor.stack = ZohoDeskEditor.ze_Undo;
            stack = editor.stack;
            editor.EditorState = {};
            editor.EditorState = function(textarea, newValue, _currentselection) {
                this.textarea = textarea;
                this.newValue = newValue;
                this._currentselection = _currentselection;

                this.undo = function() {
                    //editor.setContent(this.newValue, true);
                    editor.squireInstance._setHTML(this.newValue);
                };
                this.redo = function() {
                    //editor.setContent(this.newValue, true);
                    editor.squireInstance._setHTML(this.newValue);
                };
                this.setFocus = function() {
                    var _object = this._currentselection;
                    editor.restoreCursorPosition(editor.doc.body, _object);
                    editor.win.focus();
                };
            };
            var startValue = editor.getContent(),
                timer;
            if (editor.initobj.handleAutoFill) {
                editor.mentionsHandler();
            }
            ZohoDeskEditor._addEvent(doc, "keyup", function(ev) { // No I18N
                var kcode = ev.keyCode;
                kcode !== 13 && editor.squireInstance._hasZWS && editor.squireInstance._removeZWS();
                if (kcode === 33 || kcode === 34) {
                    ev.stopPropagation();
                    editor.initobj.styletext && editor.handleContentStyles();
                }
                if (editor.undo || editor.redo) {
                    startValue = editor.getContent();
                    editor.initobj.styletext && editor.handleContentStyles();
                    return;
                }
                editor.initobj.styletext && editor.handleContentStyles();
                editor.doc.getElementById("resizeablewrapper") && editor.removeResize();
                clearTimeout(timer);
                timer = setTimeout(function() {
                    var newValue = editor.getContent();
                    /* ignore meta key presses*/
                    if (newValue !== startValue) {
                        // key = String.fromCharCode(kcode).toLowerCase();
                        startValue = newValue;
                        editor.saveCurrentState();
                    }
                }, 250);
            });
        };

        initializeUndo();

        ZohoDeskEditor._addEvent(doc, "keydown", function(ev) { // No I18N
            /* variables caching*/

            var kcode = ev.keyCode,
                shift = ev.shiftKey,
                meta = ev.metaKey,
                alt = ev.altKey,
                ctrl = ev.ctrlKey,
                key,
                editorStack = editor.stack;

            editor.undo = editor.redo = false;

            if ((ctrl || meta) && !alt && !shift) {
                key = String.fromCharCode(kcode).toLowerCase();
                switch (key) {
                    case 'b': // No I18N
                        editor.execCommand(ev, "bold"); // No I18N
                        break;
                    case 'u': // No I18N
                        editor.execCommand(ev, "underline"); // No I18N
                        break;
                    case 'i': // No I18N
                        editor.execCommand(ev, "italic"); // No I18N
                        break;
                    case 'l': // No I18N
                        editor.execCommand(ev, "j-left"); // No I18N
                        break;
                    case 'e': // No I18N
                        editor.execCommand(ev, "j-center"); // No I18N
                        break;
                    case 'r': // No I18N
                        editor.execCommand(ev, "j-right"); // No I18N
                        break;
                    case 'j': // No I18N
                        editor.execCommand(ev, "j-full"); // No I18N
                        break;
                    case 'k': // No I18N
                        editor.execCommand(ev, "link"); // No I18N
                        break;
                    case 'z': // No I18N
                        editor._stopEvent(ev);
                        if (editorStack.canUndo()) {
                            editorStack.undo();
                        }
                        doc.body.classList.remove("highlight_container");
                        editor.undo = true;
                        break;
                    case 'y': // No I18N
                        editor._stopEvent(ev);
                        if (editorStack.canRedo()) {
                            editorStack.redo();
                        }
                        editor.redo = true;
                        break;
                    case 's':
                        ev.preventDefault();
                        editor.saveCurrentState();
                        editor.initobj.saveEditorContentCallback && editor.initobj.saveEditorContentCallback();
                        break;
                }
            }

            editor.updateToolbar();
        });

        setClassOnBody = function(_fontFamily, _fontSize,_margin, _padding, _lineHeight, bg) { // No I18N
            var _style,
                FontSize,
                PtToPx = {
                    8: 10,
                    10: 13,
                    12: 16,
                    14: 18,
                    18: 24,
                    24: 32,
                    36: 48
                };

            if (_fontSize.indexOf("px") !== -1) { // No I18N
                FontSize = _fontSize;
            } else {
                FontSize = PtToPx[parseInt(_fontSize)] + "px"; // No I18N
            }

            _style = editor.doc.createElement("style"); // No I18N
            _style.type = "text/css"; // No I18N
            _style.innerHTML = "body{font-family:" + _fontFamily + ";font-size:" + FontSize + ";margin:"+_margin+";line-height:"+_lineHeight+";padding:"+_padding+";background-color:"+bg+"}"; // No I18N
            var _head = editor.doc.getElementsByTagName("head")[0]; // No I18N

            if (_head) {
                _head.appendChild(_style);
            }
        };
        fontFamily = _initobj.defaultfontfamily || "'ProximaNovaRegular',Arial,Helvetica,sans-serif";
        fontSize = _initobj.defaultfontsize || "15px";
        margin = _initobj.margin || " 0 ";
        padding = _initobj.padding || " 15px 20px ";
        lineHeight = _initobj.lineHeight || "140%";
        backgroundColor = _initobj.backgroundColor || "#fff";
        setClassOnBody(fontFamily, fontSize, margin, padding,lineHeight,backgroundColor);
        delete editor.state;
        loadEditorCss("ZohoDeskEditor.min.css");
        var forceRepaint = function(containerEl) {
            var temp = containerEl.createElement("span"); // No I18N
            containerEl.body.appendChild(temp);

            setTimeout(function() {
                temp.parentNode.removeChild(temp);
            }, 100);
        };
        ZohoDeskEditor._addEvent(editor.doc, "focus", function() { // No I18N
            _initobj.focusCallback && _initobj.focusCallback();
        });
        if (ZohoDeskEditor_Init.is_safari && window.onblur) {
            ZohoDeskEditor._addEvent(editor.doc.body, "focus", function() { // No I18N
                forceRepaint(document);
            });
            ZohoDeskEditor._addEvent(editor.doc.body, "blur", function() { // No I18N
                var _selection = editor.win.getSelection();
                if (_selection.isCollapsed) {
                    if (editor.pasteHTML) {
                        editor.pasteHTML("<span id='temp_123paint'></span>"); // No I18N
                    }
                    var temp1 = editor.doc.getElementById("temp_123paint"); // No I18N
                    if (temp1) {
                        temp1.parentNode.removeChild(temp1);
                    }
                }
            });
        }

        ZohoDeskEditor._addEvent(editor.win, "scroll", function() { // No I18N
            var zeLinkBlock = document.getElementById("zde_linkBlock"); // No I18N
            if (zeLinkBlock) {
                document.body.removeChild(zeLinkBlock);
            }
        });

        ZohoDeskEditor._addEvent(editor.doc.body, "contextmenu", function(ev) { // No I18N
            var _anchorElement = ev.target;
            while (_anchorElement !== null) {
                if (_anchorElement.nodeName === "TABLE" && // No I18N
                    ZohoDeskEditor.getAttribute(_anchorElement, "data-avoidContext") !== "true") { // No I18N
                    editor._stopEvent(ev);
                    editor.showContextMenu(ev, "table", _anchorElement); // No I18N
                    return false;
                } else {
                    _anchorElement = _anchorElement.offsetParent;
                }
            }
        });

        editor.squireInstance = new Squire(editor.doc, {
            getEditorInstance: function() {
                return editor;
            }
        });
        if(editor.initobj.handleInlineDropImage){
            editor.squireInstance.addEventListener("dragover", function(ev) { // No I18N
                editor._stopEvent(ev);
            });
            editor.squireInstance.addEventListener("drop", handleEditorDrop); // No I18N
        }
        if (_initobj.mode !== "plaintext") { // No I18N
            var replyTextHTML = "";
            if(_replyText && _replyText.value && _initobj.contentType !== "plaintext"){
                var html = ZohoDeskEditor.getQuoteHTML(editor.doc,_replyText.value,_replyText.className,_replyText.contentEdit,_replyText.cursor);
                replyTextHTML = html;
            }
          var nPurify = editor.NewDOMPurify;
                _initobjContent = nPurify.sanitize(_initobjContent || "", {
                    ADD_ATTR: ['contenteditable']
                });
            if (!_initobjContent) {
                _initobjContent = replyTextHTML; // No I18N
                editor.squireInstance.setHTML(_initobjContent);
            }
            else if(_initobj.contentType === "plaintext"){
                var textArr = _initobjContent.split("\n");
                editor.setRichText(textArr);
            }
            else{
                var div = document.createElement("div");
                div.innerHTML = _initobjContent;
                var isDir = div.getElementsByClassName("direction");
                if(isDir && isDir.length){
                    editor.doc.body.style.direction = "rtl";
                    _initobjContent = isDir[0].innerHTML;
                }
                replyTextHTML.length && (_initobjContent = replyTextHTML + _initobjContent);
                editor.squireInstance.setHTML(_initobjContent);
            }
            var parsedContent = nPurify.sanitize(_initobj.parsedContent || "", {
                        ADD_ATTR: ['contenteditable']
                    });
            if(parsedContent){
              editor.doc.body.innerHTML += parsedContent;
            }
        }
        if (editor.mode === "richtext") { // No I18N
            if (editor.initobj.needEditorFocus) {
                win.focus();
                editor.squireInstance.focus();
            }
            editor.updateToolbar();
        }
        editor.saveCurrentState({
            cursorPosition: {
                start: 0,
                end: 0
            },
            suppressContentChange: true
        });
        if (!editor.initobj.needEditorFocus && editor.mode === "richtext") { // No I18N
            var selection = win.getSelection() || editor.doc.selection;
            selection.removeAllRanges();
            editor.squireInstance.blur();
        }
        if (editor.initobj.callback) {
            editor.initobj.callback(editor);
        }
        delete editor.initobj.callback;
    };
    _iframe.onload = constructIframe;
    editor.outerdiv.appendChild(_iframe);
};


ZohoDeskEditor.prototype._stopEvent = function(ev) {
    "use strict"; // No I18N
    try {
        ev.preventDefault(); // preventing the default action happening
        ev.stopPropagation(); // preventing events of parent node
    } catch (e1) {
        ev.cancelBubble = true;
        ev.returnValue = true;
    }
};

ZohoDeskEditor.getAttribute = function(element, attrName) {
    "use strict"; // No I18N
    if (element.hasAttribute(attrName)) {
        return element.getAttribute(attrName);
    }
};

/* updates undo redo stack html at any specific point */
ZohoDeskEditor.prototype.updateStateHTML = function(stackPosition, html) {
    "use strict"; // NO I18N
    var editor = this;
    editor.stack.commands[stackPosition].newValue = html;
};