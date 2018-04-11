/* $Id $ */
/* first time this function will be called for loading the js and afterwards method in initialEditorEventsSetUp.js will be called*/
ZohoDeskEditor.create = function (initobj) {
  "use strict"; // No I18N
  if (ZohoDeskEditor_Init.loading) {
    delete ZohoDeskEditor_Init.loading;
  }
  return new ZohoDeskEditor(initobj);
};

ZohoDeskEditor.prototype.createProgressbar = function(){
    var editor = this,
        progressBar = editor.toolbardiv.getElementsByClassName("KB_Editor_Progres");
    if(progressBar && progressBar.length){
        progressBar[0].style.display = "";
    }
    else{
        progressBar = document.createElement("div");
        progressBar.id = "progress";
        progressBar.className = "KB_Editor_Progres";
        this.toolbardiv.appendChild(progressBar);
        for(var i = 0; i < 3; i ++){
            var div = document.createElement("div");
            div.className = "prgs_lbrk prgs_ldt"+(i + 1);
            progressBar.appendChild(div);
        }
    }
};
ZohoDeskEditor.prototype.afterEditorLoad = function(tempfunction) {
    "use strict";
    var editor = this;
    if (editor.state) {
        editor.initobj.callback.push(tempfunction);
    } else {
        tempfunction();
    }
};

ZohoDeskEditor.prototype.setContent = function(html, avoidNewState) {
    "use strict";
    var editor = this,
        tempfunction,
        _mode = editor.mode;
        //optionsObj = {};
    if (typeof html === "undefined") {
        return;
    }
    else{
        var nPurify = editor.NewDOMPurify;
        html = nPurify.sanitize(html, {
            ADD_ATTR: ['contenteditable']
        });
        var div = document.createElement("div");
        div.innerHTML = html;
        var isDir = div.getElementsByClassName("direction");
        if(isDir && isDir.length){
            editor.doc.body.style.direction = "rtl";
            editor.toolbarobject.direction && (editor.toolbarobject.direction.className = "KBEditortools-rtl");
            html = isDir[0].innerHTML;
        }
    }
    if (editor.state) {
        tempfunction = (function(htmlToSet) {
            return function() {
                editor.setContent(htmlToSet);
            };
        }(html));
        editor.initobj.callback.push(tempfunction);
    } else if (_mode && _mode === "plaintext") {
        editor._textarea.value = html;
    } else {
        editor.squireInstance.setHTML(html);
        editor.win.focus();
        if (!avoidNewState) {
            editor.saveCurrentState();
        }
        try {
            editor.updateToolbar();
        } catch (e) {
            // Empty block must avoid
        }
    }
    editor.initobj.setContentCallback && editor.initobj.setContentCallback();
};

ZohoDeskEditor.prototype.setProcessedContent = function(html) {
    "use strict";
    var editor = this,
        _mode = editor.mode;
    if (_mode && _mode === "plaintext") {
        html = html.replace(/\n/gi, '<br/>');
    } else {
        html = html.replace(/<br.*?>/gi, '\n');
    }
};
ZohoDeskEditor.i18n = function(key) {
    "use strict";
    var lang = ZohoDeskEditor_Init.language;
    if (!lang || lang === "en") {
        return key;
    }
    return (ZohoDeskEditor.i18nObj[key] || key);
};
ZohoDeskEditor.prototype.focusAtStart = function(avoidTimeOut) {
    "use strict";
    var editor = this,
        win = editor.win,
        doc = editor.doc,
        selection = win.getSelection() || doc.selection;

    if (selection) {
        var range = editor._createRange(selection);
        if (doc.body.firstChild) {
            range.setStart(doc.body.firstChild, 0);
            range.setEnd(doc.body.firstChild, 0);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            selection.collapse(doc.body, 0);
        }
    }
    if (avoidTimeOut) {
        win.focus();
    } else {
        setTimeout(function() {
            win.focus();
        }, 300);
    }
};
ZohoDeskEditor.prototype.getRawContent = function() {
    "use strict"; // No I18N
    var editor = this;
    if (editor.scspan && editor.scspan.style.display !== "none") {
        editor.removeSpellcheckspans();
        editor.scspan.style.display = "none"; // No I18N
    }
    return editor.getContent();
};
/* This function will get the body content inside the editor or textarea depending on its mode
 *
 * If there is spellcheck it will be removed and the original content is update in the editor/textarea
 *
 * and then the content is returned
 *
 * */
ZohoDeskEditor.prototype.getContent = function() { // Important,donot Change this Function
    "use strict"; // No I18N
    var editor = this,
        _mode = editor.mode,
        _textarea,
        textAreaValue,
        _doc,
        docValue;

    if (_mode && _mode === 'plaintext') {
        _textarea = editor._textarea;
        if (_textarea) {
            textAreaValue = _textarea.value;
            if (editor.scspan && editor.scspan.style.display !== 'none') {
                textAreaValue = editor.getSpellcheckRemovedContent('plaintext'); // No I18N
                textAreaValue = ZohoDeskEditor.getText(textAreaValue);
            }
            if (textAreaValue) {
                if (ZohoDeskEditor_Init.setContentProcessed) {
                    textAreaValue = textAreaValue.replace(/\r+/gi, '');
                    textAreaValue = textAreaValue.replace(/\n/gi, '<br />');
                }
                return textAreaValue;
            }
        }
    } else {
        _doc = editor.doc;
        if (_doc) {
            if (editor.scspan && editor.scspan.style.display !== 'none') {
                docValue = editor.getSpellcheckRemovedContent('richtext'); // No I18N
            } else {
                docValue = _doc.body.innerHTML;
            }
            if(editor.doc.body.style.direction === "rtl") {
                docValue = "<div class='direction' style='direction:rtl;text-align:right'>" + docValue + "</div";
            }
            return docValue;
        }
    }
    return '';
};

ZohoDeskEditor.prototype.confirmPlainText = function(content) {
    "use strict"; // No I18N
    var editor = this,
        I18N = ZohoDeskEditor.i18n;
    var callback = function(){
        editor.plainText(content);
    }
    if(editor.initobj.handleAlertMessage){
        editor.initobj.handleAlertMessage(I18N("When you switch to plain text mode, you will loose the formatting and images. Continue ?"),{callback : callback,title : "Switch to plaintext"});
    }
    else if (confirm(I18N("When you switch to plain text mode, you will loose the formatting and images. Continue ?"))) {
        callback();
    }
};

ZohoDeskEditor.prototype.plainText = function(content, options) {
    "use strict"; // No I18N
    var editor = this,
        uls = editor.toolbardiv.getElementsByTagName("ul"),
        ulsChild = uls[0],
        ulPlain = uls[1],
        _textarea = editor._textarea,
        options = options || {};

    editor.mode = "plaintext"; // No I18N
    ulsChild.style.display = "none"; // No I18N
    ulPlain.style.display = "";
    ulPlain.children[0].classList.remove("KB_Editor_FullScreen");
    /*ulPlain.children[1].classList.remove("KB_Editor_FullScreen");*/

    if (!_textarea) {
        _textarea = document.createElement("textarea");
        _textarea.className = "ze_area";
        editor._textarea = _textarea;
        editor.outerdiv.appendChild(_textarea);
        _textarea.onbeforedeactivate = function() {
            var sel = document.selection;
            if (sel) {
                editor.textrange = sel.createRange();
            }
        };
        ZohoDeskEditor._addEvent(_textarea, 'keyup', function() {
            var currentVal = this.value;
            if (editor.initobj.contentChanged && typeof editor.initobj.contentChanged === "function") {
                if (currentVal !== editor._textareaValue) {
                    editor._textareaValue = currentVal;
                    editor.initobj.contentChanged();
                }
            }
        });
        if (!ZohoDeskEditor_Init.avoidDropDragHandle) {
            ZohoDeskEditor._addEvent(_textarea, 'dragover', function(evt) { // No I18N
                var dt = evt.dataTransfer,
                    I18N = ZohoDeskEditor.i18n,
                    effectAllowed;
                if ((dt.types !== null || (dt.files && dt.files.length > 0))) {
                    if ((dt.files && dt.files.length > 0) ||
                        (dt.types.indexOf ? dt.types.indexOf('Files') > -1 : dt.types.contains('application/x-moz-file')) || // No I18N
                        dt.types[0] === "Files") {
                        var mask,
                            innerMask;
                        mask = document.getElementById("mask_editor");
                        effectAllowed = dt.effectAllowed;
                        dt.dropEffect = (effectAllowed === 'move' || effectAllowed === 'linkMove') ? 'move' : 'copy'; // No I18N
                        if (!mask) {
                            mask = document.createElement('div');
                            mask.contentEditable = "false";
                            mask.id = "mask_editor"; // No I18N
                            document.body.appendChild(mask);

                            ZohoDeskEditor._addEvent(mask, "dragover", function(ev) { // No I18N
                                clearTimeout(editor.dragTimer);
                                var _effectAllowed = ev.dataTransfer.effectAllowed;
                                ev.dataTransfer.dropEffect = (_effectAllowed === 'move' || _effectAllowed === 'linkMove') ? 'move' : 'copy'; // No I18N
                                editor._stopEvent(ev);
                            });

                            ZohoDeskEditor._addEvent(mask, "dragleave", function(ev) { // No I18N
                                editor.dragTimer = setTimeout(function() {
                                    var newMask = document.getElementById("mask_editor");
                                    if (newMask) {
                                        newMask.parentElement.removeChild(newMask);
                                    }
                                }, 250);
                                editor._stopEvent(ev);
                            });

                            ZohoDeskEditor._addEvent(mask, "drop", function(ev) { // No I18N
                                editor._stopEvent(ev);
                                if (mask) {
                                    mask.parentElement.removeChild(mask);
                                }
                                var files = ev.dataTransfer.files;
                                if ((!files || files.length === 0)) { // no file api support or no files are chosen
                                    return;
                                }
                                ZohoDeskEditor_Init.fileUpload(editor, files, ev);
                            });

                            var _textareaValues = editor._textarea.getBoundingClientRect();
                            mask.style.left = _textareaValues.left + "px"; // No I18N
                            mask.style.width = _textareaValues.right + "px"; // No I18N
                            mask.style.height = _textareaValues.height + "px"; // No I18N
                            mask.style.width = _textareaValues.width + "px"; // No I18N
                            mask.style.top = _textareaValues.top + "px"; // No I18N
                            mask.style.position = "absolute"; // No I18N
                            innerMask = document.createElement('div');
                            innerMask.className = "ze_drag"; // No I18N
                            innerMask.contentEditable = "false";
                            var _span = document.createElement('span'); // No I18N
                            innerMask.appendChild(_span);
                            _span.innerHTML = I18N("Drop Files to Attach"); // No I18N
                            mask.appendChild(innerMask);
                        }
                        editor._stopEvent(evt);
                    }
                }

            });
        }
    }
    if (content) {
        _textarea.value = options.plainTextData ? content : ZohoDeskEditor.getText(content);
    }
    editor._textareaValue = _textarea.value;
    editor.iframe.style.display = "none";
    _textarea.style.height = editor.iframe.style.height;
    _textarea.style.display = "";
    try {
        if (!options.avoidFocus) {
            _textarea.focus();
            if (_textarea.setSelectionRange) {
                _textarea.setSelectionRange(0, 0); // In plain text, moves the cursor at the top left of editor.
            }
        }
    } catch (e) {
        // TODO empty block need to remove
    }

};

ZohoDeskEditor.prototype.richText = function(content) {

    "use strict"; // No I18N
    var editor = this,
        uls = editor.toolbardiv.getElementsByTagName("ul"),
        ulsChild = uls[0],
        ulsPlain = uls[1],
        _textarea = editor._textarea;

    ulsPlain.style.display = "none";
    ulsPlain.children[0].classList.add("KB_Editor_FullScreen");
    /*ulsPlain.children[1].classList.add("KB_Editor_FullScreen");*/
    ulsChild.style.display = "";
    editor.mode = "richtext"; // No I18N
    _textarea.style.display = "none";
    if (content) {
        //editor.squireInstance.setHTML(content);
        var textArr = editor._textarea.value.split("\n");
        editor.setRichText(textArr);


    } else {
        editor.squireInstance.setHTML('');
    }
    if (editor.stack && editor.stack.commands.length > 0) {
        editor.stack.clearStack();
        editor.saveCurrentState({
            cursorPosition: {
                start: 0,
                end: 0
            }
        });
    }
    editor.iframe.style.height = _textarea.style.height;
    editor.iframe.style.display = "";
    setTimeout(function() {
        editor.focusAtStart(true);
        editor.squireInstance.focus();
        editor.updateToolbar();
    }, 0);
};

ZohoDeskEditor.prototype.setRichText = function(textArr){
    var editor = this,
        doc = editor.doc;
    doc.body.innerHTML = "";
    if(!textArr && !textArr.length){
        return;
    }
    for(var i = 0; i < textArr.length ; i ++){
        var div = doc.createElement("div");
        doc.body.appendChild(div);
        div.innerHTML = ZohoDeskEditor.getFormattedContent(textArr[i]);
        div.appendChild(doc.createElement("br"));
    }
};

ZohoDeskEditor.getFormattedContent = function(html) {
    "use strict"; // No I18N
    if((/<|>|&|"|'|\\/g).test(html) == true){
        html = html.replace(/&/g,'&amp;');
        html = html.replace(/</g,'&lt;');
        html = html.replace(/>/g,'&gt;');
        html = html.replace(/"/g,'&quot;');
        html = html.replace(/\\/g,'&#x5c;');
        html = html.replace(/'/g,'&#39;');
        }
    return html;
};
ZohoDeskEditor._setAttribute = function(node, propName, value) {
    "use strict";
    node.setAttribute(propName, value);
};
ZohoDeskEditor._appendChildren = function(node, childNodes) {
    "use strict";
    var len = childNodes.length;
    for (var i = 0; i < len; i++) {
        node.appendChild(childNodes[i]);
    }
};
ZohoDeskEditor.getText = function(html) {
    "use strict"; // No I18N
    if (html) {
        var htmlToText = function(resultHTML) {
            var divElem, href, i, aElem = [],
                regExArr = [],
                aTagList = [];
            var _cont = resultHTML;
            divElem = document.createElement("div");
            divElem.innerHTML = "";
            resultHTML = resultHTML.replace(/\n+/gi, '');
            resultHTML = resultHTML.replace(/\r+/gi, '');
            resultHTML = resultHTML.replace(/<!--.*?-->/gi, '');
            resultHTML = resultHTML.replace(/<head>.*?<\/head>/gi, '');

            /* special changes for huge attachment link replacement for mail team */

            aElem = resultHTML.match(/<a .*? data-hugatt="hugatt".*?<\/a>/g);
            if (!aElem) {
                aElem = resultHTML.match(/<a .*? data-hugatt="hugatt".*?<\/a>/g);
            }
            // var a = getHugeAttList(_cont);
            if (aElem) {
                for (i = 0; i < aElem.length; i++) {
                    divElem.innerHTML += aElem[i];
                    aElem[i] = aElem[i].replace(/[\(]/g, '\\(');
                    aElem[i] = aElem[i].replace(/[\)]/g, '\\)');
                    // aElem[i] = aElem[i].replace(/[\(.*?\)]/g,'\\(\\)');
                    regExArr.push(new RegExp(aElem[i]));
                    // regExArr.push(aElem[i]);
                }

                aTagList = divElem.getElementsByTagName("a");
                for (i = 0; i < aElem.length; i++) {
                    var _list = aTagList[i].innerHTML + "\n" + aTagList[i].getAttribute("href");
                    resultHTML = resultHTML.replace(regExArr[i], _list);
                }
            }
            //   resultHTML = resultHTML.replace(/<a .*? data-hugatt="hugatt".*?><\/a>/g,_list);
            resultHTML = resultHTML.replace(/<div .*? data-hugatt="hugatt".*?><\/div>/g, '');

            /* special changes for huge attachment link replacement for mail team */

            resultHTML = resultHTML.replace(/<br.*?>/gi, '\n');
            resultHTML = resultHTML.replace(/<hr.*?>/gi, '\n');
            resultHTML = resultHTML.replace(/<\/p>/gi, '\n');

            // html=html.replace(/<\/div>/gi,'\n');//replace end div tag with \n character
            resultHTML = resultHTML.replace(/<\/h[1-6]>/gi, '\n');
            resultHTML = resultHTML.replace(/<\/tr>/gi, '\n');
            resultHTML = resultHTML.replace(/<\/li>/gi, '\n');

            resultHTML = resultHTML.replace(/<\/td>/gi, ' ');
            resultHTML = resultHTML.replace(/<\/th>/gi, '');


            /* html entities start*/
            // resultHTML = resultHTML.replace(/<\/tr>/gi, '\n');
            // resultHTML = resultHTML.replace(/<br.*?>/gi, '\n');
            resultHTML = resultHTML.replace(/<.*?>/gi, '');
            resultHTML = resultHTML.replace(/&nbsp;/gi, ' ');
            resultHTML = resultHTML.replace(/&lt;/gi, '<');
            resultHTML = resultHTML.replace(/&gt;/gi, '>');
            resultHTML = resultHTML.replace(/&quot;/gi, '"');
            resultHTML = resultHTML.replace(/&amp;/gi, '&');
            /* html entities end*/
            return resultHTML;
        };

        /* converting reply blockquote to > start*/
        var isBlockQuote = html.search(/<blockquote/gi);
        if (isBlockQuote !== -1) {
            var firstIndex = html.search(/<blockquote/gi);
            var lastIndex = (html.toLowerCase()).lastIndexOf("</blockquote>");
            var blockquotehtml = html.substring(firstIndex, lastIndex + 13);
            html = html.replace(blockquotehtml, "##===###===##"); // replacing blockquotehtml by this symbol
            blockquotehtml = htmlToText(blockquotehtml);
            blockquotehtml = blockquotehtml.replace(/\n/gi, '\n > ');
            blockquotehtml = " > " + blockquotehtml;
            html = htmlToText(html);
            if (html.search(/##===###===##/gi) !== -1) {
                html = html.replace("##===###===##", blockquotehtml);
            }
            return html;
        } /* converting reply blockquote to > end*/
        return htmlToText(html);
    }
    return "";
};

ZohoDeskEditor.prototype.setMode = function(mode) {
    "use strict"; // No I18N
    var editor = this,
        _mode = editor.mode;

    if (mode === "plaintext") { // No I18N
        /* current mode and set mode are not same*/
        if (_mode !== mode) {
            editor.confirmPlainText("");
        }
    } else if (_mode !== "richtext") { // No I18N
        /* current mode and set mode are not same*/
        editor.richText("");
    }
};

ZohoDeskEditor.getCSRFParamName = function() {
    "use strict"; // No I18N
    return ZohoDeskEditor_Init.csrfParamVal; // No I18N
};

ZohoDeskEditor.getCSRFCookie = function(editor) {
    "use strict"; // No I18N

    if (ZohoDeskEditor_Init.csrfCookieVal && ZohoDeskEditor_Init.csrfParamVal) {
        return ZohoDeskEditor_Init.csrfCookieVal;
    }
    return null;
};

ZohoDeskEditor.addClass = function(element, newClass) {
    "use strict"; // No I18N
    if (element.className.indexOf(newClass) == -1) {
        if (!element.className) {
            element.className = newClass;
        } else {
            element.className += ' ' + newClass;
        }
    }
};

ZohoDeskEditor.removeClass = function(element, remClass) {
    "use strict"; // No I18N
    element.className = element.className.replace(remClass, "");
    element.className = ZohoDeskEditor.trim(element.className);
};

ZohoDeskEditor._addEvent = function(el, evname, func) {
    "use strict"; // No I18N
    if (el) {
        if (document.addEventListener) {
            el.addEventListener(evname, func, true);
        } else {
            el.attachEvent("on" + evname, func, true);
        }
    }
};

ZohoDeskEditor._removeEvent = function(el, evname, func) {
    "use strict"; // No I18N
    if (el) {
        if (document.removeEventListener) {
            el.removeEventListener(evname, func, true);
        } else {
            el.detachEvent("on" + evname, func, true);
        }
    }
};

ZohoDeskEditor.hasClass = function(element, className) {
    "use strict"; // No I18N
    if (element.className.indexOf(className) > -1) {
        return true;
    }
    return false;
};

ZohoDeskEditor.showOverlay = function() {
    "use strict"; // No I18N
    var overlayDiv;

    if (document.getElementById("KB_Editor_Overlay")) {
        return;
    }
    overlayDiv = document.createElement("div");
    overlayDiv.id = "KB_Editor_Overlay";
    overlayDiv.className = "KB_Editor_Overlay";
    document.body.appendChild(overlayDiv);
};

ZohoDeskEditor.hideOverlay = function() {
    "use strict"; // No I18N
    var overlayDiv = document.getElementById("KB_Editor_Overlay");
    overlayDiv && overlayDiv.parentNode && overlayDiv.parentNode.removeChild(overlayDiv);
};

ZohoDeskEditor.trim = function(val) {
    "use strict"; // No I18N
    val = val.replace(/^\s*(.*)/, "$1");
    val = val.replace(/(.*?)\s*$/, "$1");
    return val;
};

ZohoDeskEditor.prototype.getFormattingValues = function(_className) {
    "use strict"; // No I18N
    var editor = this;
    var selection;
    if (editor.win.getSelection) {
        selection = editor.win.getSelection();
    } else if (editor.doc.selection && editor.doc.selection.type !== "Control") { // No I18N
        selection = editor.doc.selection;
    }
    var _anchorElement = selection.anchorNode;
    var value;
    while (_anchorElement != null) {
        if (_anchorElement.className && _anchorElement.className === _className) {
            switch (_className) {
                case "size": // No I18N
                    value = _anchorElement.style.fontSize;
                    break;
                case "highlight": // No I18N
                    value = _anchorElement.style.backgroundColor;
                    break;
            }
            break;
        } else {
            _anchorElement = _anchorElement.parentNode;
        }
    }
    return value;
};

ZohoDeskEditor.prototype.saveCursorPosition = function(containerEl) {
    "use strict"; // No I18N
    var editor = this,
        win = editor.win,
        _doc = editor.doc,
        start;
    if (win.getSelection && _doc.createRange) {
        var selection = editor.win.getSelection();
        if (selection.rangeCount > 0) {
            var range = editor.win.getSelection().getRangeAt(0);
            var preSelectionRange = range.cloneRange();
            preSelectionRange.selectNodeContents(containerEl); // selecting all node contents
            preSelectionRange.setEnd(range.startContainer, range.startOffset); // setting end as range.start container
            start = preSelectionRange.toString().length;
            return {
                start: start,
                end: start + range.toString().length
            };
        }
        return {
            start: 0,
            end: 0
        };
    } else if (_doc.selection) {
        var selectedTextRange = _doc.selection.createRange();
        var preSelectionTextRange = _doc.body.createTextRange();
        preSelectionTextRange.moveToElementText(containerEl);
        preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange); // No I18N
        start = preSelectionTextRange.text.length;
        return {
            start: start,
            end: start + selectedTextRange.text.length
        };
    }
};

/* element(body) and the selection to be restored*/
ZohoDeskEditor.prototype.restoreCursorPosition = function(containerEl, savedSel) {
    "use strict"; // No I18N
    var editor = this,
        win = editor.win,
        _doc = editor.doc,
        focusAtStart = false;

    if (win.getSelection && _doc.createRange) {
        var charIndex = 0,
            range = editor.doc.createRange();
        range.setStart(containerEl, 0); // initially setting the start at start of the body
        range.collapse(true);
        /* if both are 0,then place the cursor at the start */
        if (savedSel.start == 0 && savedSel.end == 0) {
            focusAtStart = true;
        }
        var nodeStack = [containerEl],
            node,
            foundStart = false,
            stop = false;

        if (!focusAtStart) {
            while (!stop && (node = nodeStack.pop())) {
                if (node.nodeType === 3) {
                    var nextCharIndex = charIndex + node.length; // checking length of the node
                    if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                        range.setStart(node, savedSel.start - charIndex);
                        foundStart = true; // start point of the selection found
                    }
                    if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                        range.setEnd(node, savedSel.end - charIndex);
                        stop = true; // end point of the selection found
                    }
                    charIndex = nextCharIndex;
                } else {
                    var i = node.childNodes.length;
                    while (i--) {
                        nodeStack.push(node.childNodes[i]);
                    }
                }
            }
        }


        var sel = editor.win.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (_doc.selection) {
        var textRange = _doc.body.createTextRange();
        textRange.moveToElementText(containerEl);
        textRange.collapse(true);
        textRange.moveEnd("character", savedSel.end); // No I18N
        textRange.moveStart("character", savedSel.start); // No I18N
        textRange.select();
    }
};

ZohoDeskEditor.prototype.saveCurrentState = function(data) {
    "use strict"; // No I18N
    var editor = this,
        doc = editor.doc,
        cursorPosition;
    data = data || {};
    cursorPosition = data.cursorPosition;
    if (editor.stack) {
        if (!cursorPosition) {
            editor.stack.execute(new editor.EditorState(doc.body, editor.getContent(), editor.saveCursorPosition(doc.body)));
        } else { // if cursor position is explicitly specified
            editor.stack.execute(new editor.EditorState(doc.body, editor.getContent(), cursorPosition));
        }
        // triggering the app using the editor to specify that editor content is changed
        if (editor.initobj.contentChanged && typeof editor.initobj.contentChanged === "function" &&
            !data.suppressContentChange) {
            editor.initobj.contentChanged();
        }
    }
};

ZohoDeskEditor.prototype.getPosFromCursor = function(nodename, skipcount) {
    "use strict"; // No I18N
    var editor = this;
    var path = editor.squireInstance.getPath();
    var pathArr = [];
    var tempcount = (skipcount) ? skipcount : 0;
    if (path.length > 0) {
        pathArr = path.split(">");
    }

    var i,
        temp = -1;
    for (i = pathArr.length - 1; i >= 0; i--) {
        if (pathArr[i] === nodename) {
            if (tempcount === 0) {
                temp = i;
                break;
            }
            tempcount = tempcount - 1;
        }
    }
    return temp;
};
ZohoDeskEditor.prototype.fontsizeConversion = function(conversion, val) {

    "use strict"; // No I18N
    var ptToPx = {
        "8": "10",
        "10": "13",
        "12": "16",
        "14": "18",
        "18": "24",
        "24": "32",
        "36": "48"
    };
    var pxToPt = Math.round(val * 0.75);
    /* {
      "10": "8",
      "13": "10",
      "16": "12",
      "18": "14",
      "24": "18",
      "32": "24",
      "48": "36"
    }; */
    var fontvalToPt = {
        "1": "8",
        "2": "10",
        "3": "12",
        "4": "14",
        "5": "18",
        "6": "24",
        "7": "36"
    };
    var fontvalToPx = {
        "1": "10",
        "2": "13",
        "3": "16",
        "4": "18",
        "5": "24",
        "6": "32",
        "7": "48"
    };
    var fontvalToEm = {
        "1": "0.625",
        "2": "0.813",
        "3": "1",
        "4": "1.125",
        "5": "1.5",
        "6": "2",
        "7": "3",
        "8": "4"
    }

    if (conversion === "pttopx") { // No I18N
        return ptToPx[val];
    } else if (conversion === "pxtopt") { // No I18N
        return pxToPt;
    } else if (conversion === "fontvaltopt") { // No I18N
        return fontvalToPt[val];
    } else if (conversion === "fontvaltopx") { // No I18N
        return fontvalToPx[val];
    }
    else if (conversion === "pttoem") { // No I18N
        return ptToEm[val];
    }
    else if (conversion === "fontvalToEm") { // No I18N
        return fontvalToEm[val];
    }
};

ZohoDeskEditor.fsDisp = {
    "1": "8", // No I18N
    "2": "10", // No I18N
    "3": "12", // No I18N
    "4": "14", // No I18N
    "5": "18", // No I18N
    "6": "24", // No I18N
    "7": "36" // No I18N
};

ZohoDeskEditor.prototype.ffDisp = {
    "arial": "Arial", // No I18N
    "comic sans ms": "Comic Sans MS", // No I18N
    "verdana": "Verdana", // No I18N
    "georgia": "Georgia", // No I18N
    "tahoma": "Tahoma", // No I18N
    "calibri": "Calibri", // No I18N
    "courier new": "Courier New", // No I18N
    "serif": "Serif", // No I18N
    "arial narrow": "Narrow", // No I18N
    "arial black": "Wide", // No I18N
    "times new roman": "Times New Roman", // No I18N
    "garamond": "Garamond", // No I18N
    "batang": "Serif", // No I18N
    "trebuchet ms": "Trebuchet" // No I18N
};
