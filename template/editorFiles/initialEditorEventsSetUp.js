/* $Id $ */
/*global ZE*/
function ZohoDeskEditor(initobj) {
    "use strict";
    this.NewDOMPurify = newPurify(window);
    // if (__PRODUCTION__){
    //     __webpack_public_path__ = ZohoDeskEditor_Init.jsurl.replace("/js/","");
    // }else{
    //     __webpack_public_path__ = 'htt' + 'ps://shakil-zt81.tsi.zohocorpin.com:5555/build';
    // }
    this.state = "loading";
    this.mode = "richtext";
    this.initobj = initobj || {};
    this.outerdiv = initobj.id ? document.getElementById(initobj.id) : initobj.shadowElement;
    // let _ownerDoc = this.outerdiv.ownerDocument;
    // if(!_ownerDoc.getElementById("ZohoDeskEditorTools")){
    //   let css = _ownerDoc.createElement("link");
    //   css.type = 'text/css';
    //   css.rel = 'stylesheet';
    //   css.href = ZohoDeskEditor_Init.cssurl+"ZohoDeskEditorTools.min.css";
    //   css.setAttribute("id","ZohoDeskEditorTools");
    //   _ownerDoc.getElementsByTagName("head")[0].appendChild(css);
    // }
    if (initobj && initobj.mode === "plaintext"){
        this.mode = "plaintext";
    }
    this.outerdiv.className = "KB_Editor";
    addSVGString(this.outerdiv);
    this.toolbardiv = undefined;
    this.toolbarobject = undefined;
    this.toolbar = undefined;
    this.isExpanded = false;
    this.createToolbar();
    this.createEditor();
    if (ZohoDeskEditor_Init.needEditorStats) {
      this.clickCount = {};
    }
    if (!this.initobj.avoidPlainText) {
        var avoidFocus = !initobj.needEditorFocus;
        if (this.mode === "plaintext") {
          this.plainText(initobj.content, {
                avoidFocus: avoidFocus,
                plainTextData: ZohoDeskEditor_Init.plainTextDataDef
            });
        }
    }
};
ZohoDeskEditor.create = function (initobj) {
  "use strict"; // No I18N
  if (ZohoDeskEditor_Init.loading) {
    delete ZohoDeskEditor_Init.loading;
  }
  return new ZohoDeskEditor(initobj);
};

ZohoDeskEditor.prototype.execCommand = function(ev, command) {

    "use strict";

    var editor = this,
        elem,
        ty,
        oldTempContent = editor.getContent();
    editor._stopEvent(ev);
    switch (command) {
        case 'forecolor': //No I18N
        case 'backcolor': //No I18N
        case 'fontfamily': //No I18N
        case 'fontSize': //No I18N
            editor.showDropDown(ev, command);
            break;
        case 'strikethroguh':
            editor.squireInstance.strikethrough();
            break;
        case 'direction':
            editor.showDropDown(ev, command, "direction");
            break;
        case 'rtl':
            editor.squireInstance.setTextDirection(command);
            break;
        case 'ltr':
            editor.squireInstance.setTextDirection(command);
            break;
        case 'alignoptions': //No I18N
            editor.showDropDown(ev, command, 'align'); //No I18N
            break;
        case 'listoptions': //No I18N
            editor.showDropDown(ev, command, 'list'); //No I18N
            break;
        case 'directionoptions': //No I18N
            editor.showDropDown(ev, command, 'textDir');
            break;
        case 'indentoptions': //No I18N
            editor.showDropDown(ev, command, 'indent'); //No I18N
            break;
        case 'otheroptions': //No I18N
            editor.showDropDown(ev, command, 'others'); //No I18N
            break;
        case 'moreoptions':
            editor.showDropDown(ev, command, command);
            break;
        case 'heading': //No I18N
            editor.showDropDown(ev, command, 'heading'); //No I18N
            break;
            /*editor.createHeadingDiv(ev);
            break;*/
        case "toc" :
            editor.insertTOC(ev,command);
            break;
        case 'smiley': //No I18N
            editor.showDropDown(ev, command);
            break;
        case 'link': //No I18N
            editor.createLink();
            if (ZohoDeskEditor_Init.needEditorStats) {
                editor.updateCount(command);
            }
            break;
        case 'articlelink':
            KbAddArticleLink.createPopUp();
            break;
        case 'tableGrid':
            editor._createTableGrid(ev, command);
            if (ZohoDeskEditor_Init.needEditorStats) {
                editor.updateCount(command);
            }
            break;
        case 'image': //No I18N
            editor.uploadImage();
            if (ZohoDeskEditor_Init.needEditorStats) {
                editor.updateCount(command);
            }
            break;
        case 'save': //No I18N
            if (editor.initobj.saveContent) {
                var _doc = editor.doc;
                var editor_content = '<html><head>' + _doc.getElementsByTagName('head')[0].innerHTML + '</head><body>' + _doc.body.innerHTML + '</body></html>'; //No I18N
                editor.initobj.saveContent(editor_content);
            }
            break;
        /*case 'spellcheck'://No I18N
            editor.spellcheck(ev);
            if (ZohoDeskEditor_Init.needEditorStats) {
                editor.updateCount(command);
            }
            break;*/
            // case 'spellcheckoptions': //No I18N
            //   editor.spellcheckOptions(ev,command);
            //   if (ZohoDeskEditor_Init.needEditorStats) {
            //     editor.updateCount(command);
            //   }
            //   break;

        case 'insertoptions': //No I18N
            editor.showDropDown(ev, command, 'insertoptions');
            break;
        case 'quote': //No I18N
            editor.insertQuote();
            if (ZohoDeskEditor_Init.needEditorStats) {
                editor.updateCount(command);
            }
            break;
        case 'more': //No I18N
            editor.expandToolbar(ev);
            break;
        case 'attach': //No I18N
            editor.showDropDown(ev, 'attach'); //No I18N
            break;
        case 'spellcheck':
            elem = ev.target || ev.srcElement;
            if (ZohoDeskEditor.hasClass(elem, 'zei-arrow')) {
                editor.spellcheckOptions(ev, command);
            } else {
                editor.spellcheck(ev);
            }
            break;
        case 'plaintext':
            editor.updateOtheroptions(ev.target, "plainText");
            if (ZohoDeskEditor_Init.needEditorStats) {
                editor.updateCount(command);
            }
            break;
        case 'bold': //No I18N
            var currentState = editor.doc.queryCommandState('bold');
            currentState ? editor.squireInstance.removeBold() : editor.squireInstance.bold();
            editor.saveCurrentState();
            editor.updateToolbar();
            break;
        case 'italic': //No I18N
            var currentState = editor.doc.queryCommandState('italic');
            currentState ? editor.squireInstance.removeItalic() : editor.squireInstance.italic();
            editor.saveCurrentState();
            editor.updateToolbar();
            break;
        case 'underline': //No I18N
            var currentState = editor.doc.queryCommandState('underline');
            currentState ? editor.squireInstance.removeUnderline() : editor.squireInstance.underline();
            editor.saveCurrentState();
            editor.updateToolbar();
            break;
        case 'j-left': //No I18N
        case 'j-right': //No I18N
        case 'j-center': //No I18N
        case 'j-full': //No I18N
            editor.squireInstance.setTextAlignment(command.split('-')[1]);
            editor.saveCurrentState();
            editor.updateToolbar();
            break;
        case 'insertorderedlist': //No I18N
            editor.insertListOperation('OL'); //No I18N
            editor.saveCurrentState();
            break;
        case 'insertunorderedlist': //No I18N
            editor.insertListOperation('UL'); //No I18N
            editor.saveCurrentState();
            break;
        case 'insertHTML':
            editor.showInsertHTMLDialog();
            break;
        case "styletext" :
            editor.showDropDown(ev, command);
            break;
        case 'editorexpand' :
            //togglePopupEditor(this);
            editor.toggleEditorView();
            break;
        case "removeFormat":
            if(editor._getSelectedText().trim().length){
                var newContent,
                oldContent = editor.getContent();
                editor.win.focus();
                editor.squireInstance.removeAllFormatting(null);
                editor.removeStyleTextFormat(command);
                newContent = editor.getContent();
                if (newContent != oldContent) {
                    editor.saveCurrentState();
                }
                editor.updateToolbar();
                editor.initobj.styletext && editor.handleContentStyles();
            }
            break;
        default:
            editor.doc.execCommand(command, false, undefined);
            editor.updateToolbar();
            if (ZohoDeskEditor_Init.needEditorStats) {
                editor.updateCount(command);
            }
    }
};
ZohoDeskEditor.prototype.toggleEditorView = function(){
    var editor = this,
        outerDiv = document.getElementsByClassName('SolutionForm_OuterDiv')[0];
    if(outerDiv.classList.contains('KB_Editor_FullView')){
        outerDiv.classList.remove('KB_Editor_FullView');
        editor.initobj.trackeditorexpansion && editor.initobj.trackeditorexpansion(false);
    editor.toolbarobject.editorexpand.innerHTML = "<svg><use xlink:href='#KBEditortools_expand'></use></svg>";
        editor.isExpanded = false;
        editor.toolbarobject.editorexpand.setAttribute("orgtitle","Normal view");

        var dropdown = editor.toolbardiv.getElementsByClassName('KB_Editor_common_DropDown');
        while(dropdown[0]){
            dropdown[0].parentNode.removeChild(dropdown[0]);
        }
        editor.initobj.styletext && !editor.isExpanded && editor.handleContentStyles();
    }
    else{
        editor.initobj.trackeditorexpansion && editor.initobj.trackeditorexpansion(true);
        outerDiv.classList.add('KB_Editor_FullView');
        editor.isExpanded = true;
        editor.toolbarobject.editorexpand.setAttribute("orgtitle","Expanded view");
    editor.toolbarobject.editorexpand.innerHTML = "<svg><use xlink:href='#KBEditortools_collapse'></use></svg>";
        editor.initobj.styletext && editor.handleContentStyles();
    }
};
ZohoDeskEditor.prototype.removeStyleTextFormat = function() {
    var editor = this,
        doc = editor.doc,
        selection = doc.getSelection(),
        value = selection.valueOf().toString(),
        range = selection.getRangeAt(0),
        container = undefined;
    container = range.commonAncestorContainer;
    var frag = doc.createDocumentFragment();
    if(container.nodeName !== "BODY"){
        var flag = true;
        var checkForHeading = function(container){
            if (container.nodeName.toLowerCase().indexOf("h") === 0){
                var newEl = doc.createElement('div');
                container.parentNode.insertBefore(newEl,container);
                newEl.innerHTML = container.innerHTML;
                container.parentNode.removeChild(container);
                container = newEl;
            }
        }
        while(container && container.nodeName !== "BODY"){
            if(flag && container.childNodes.length){
                flag = false;
                var spanEl = container.getElementsByClassName("SolutionForm_Highlights");
                while ( spanEl.length ){
                    var span = spanEl[0],
                        childNodes = span.childNodes;
                    frag.appendChild(childNodes[0]);
                    spanEl[0].parentNode.insertBefore(frag,spanEl[0]);
                    spanEl[0].parentNode.removeChild(spanEl[0]);
                }
                var dirEle = container.querySelectorAll("div[dir]");
                var length = dirEle ? dirEle.length : 0;
                for(var i = 0; i < dirEle.length; i++){
                    dirEle[0].removeAttribute("dir");
                }
                container.removeAttribute("dir");
            }
            else if(container.id === "SolutionForm_Container"){
                var childNodes = container.childNodes;
                frag.appendChild(childNodes[0]);
                container.parentNode.insertBefore(frag,container);
                container.parentNode.removeChild(container);
            }
            else if(container.nodeName !== "#text" && container.getAttribute("dir")){
                container.removeAttribute("dir");
            }
            checkForHeading(container);
            container = container.parentElement;
        }
    }
    editor.updateToolbar();
    if (ZohoDeskEditor_Init.needEditorStats) {
        editor.updateCount(command);
    }
    selection = doc.getSelection();
    doc.getSelection().removeAllRanges();
    selection.addRange(range);
};
ZohoDeskEditor.prototype.insertListOperation = function(command) {
    var editor = this;
    switch (command) {
        case 'UL': //No I18N
            var olparent = editor.getPosFromCursor('OL');
            var ulparent = editor.getPosFromCursor('UL');
            if (olparent == -1 && ulparent == -1) {
                editor.squireInstance.makeUnorderedList();
            } else if (olparent > ulparent) {
                editor.squireInstance.makeUnorderedList();
            } else if (ulparent > olparent) {
                if (olparent > 0 || editor.getPosFromCursor('UL', 1) > 0) {
                    editor.squireInstance.decreaseListLevel();
                } else {
                    editor.squireInstance.removeList();
                }
            }
            editor.updateToolbar();
            break;
        case 'OL': //No I18N
            var olparent = editor.getPosFromCursor('OL');
            var ulparent = editor.getPosFromCursor('UL');
            if (olparent == -1 && ulparent == -1) {
                editor.squireInstance.makeOrderedList();
            } else if (ulparent > olparent) {
                editor.squireInstance.makeOrderedList();
            } else if (olparent > ulparent) {
                if (ulparent > 0 || editor.getPosFromCursor('OL', 1) > 0) {
                    editor.squireInstance.decreaseListLevel();
                } else {
                    editor.squireInstance.removeList();
                }
            }
            break;
    }
};
/*used to set the dialog at the center of the screen*/
ZohoDeskEditor.setPosition = function(div, editordiv) {
    var _document = document,
        _body = _document.body,
        _documentElement = _document.documentElement,
        _style = div.style,
        temp;
    if (ZohoDeskEditor_Init.is_ie) //Checking for IE
    {
        temp = (_body.clientHeight - div.offsetHeight) / 3 + Math.max(_body.scrollTop, _document.documentElement.scrollTop);
    } else {
        temp = (Math.min(_body.clientHeight, _documentElement.clientHeight) - div.offsetHeight) / 3 + Math.max(_body.scrollTop, _documentElement.scrollTop);
    }

    if (temp < 0) {
        temp = 10;
    }
    _style.top = temp + 'px';

    temp = (_body.clientWidth - div.offsetWidth) / 3 + ZohoDeskEditor.getPos(editordiv).offsetLeft / 2;
    if (temp < 50) {
        temp = 100;
    }
    _style.left = temp + 'px';
};

/* For focussing the editor/textarea only for services team*/
ZohoDeskEditor.prototype.focus = function() {
    var editor = this;
    if (editor.mode === 'plaintext') {
        editor._textarea.focus();
    } else {
        editor.win.focus();
    }
};

ZohoDeskEditor.getPos = (function() {

    var docElementRect = {};
    docElementRect.left = 0;
    docElementRect.top = 0;
    if (navigator.userAgent.toLowerCase().indexOf("ie") !== -1) {
        docElementRect = document.documentElement.getBoundingClientRect(); // IE 7 handling
    }
    return function(e1) {
        var clientRect = e1.getBoundingClientRect(),
            scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop, //Mulitple browser support
            scrollX = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;

        return {
            offsetLeft: clientRect.left + scrollX - docElementRect.left,
            offsetTop: clientRect.top + scrollY - docElementRect.top
        };
    };
})();

ZohoDeskEditor.prototype.updateCount = function(command) {
    var editor = this;
    switch (command) {
        case 'bold': //No I18N
            command = 'b'; //No I18N
            break;
        case 'italic': //No I18N
            command = 'i'; //No I18N
            break;
        case 'underline': //No I18N
            command = 'u'; //No I18N
            break;
        case 'strikethrough': //No I18N
            command = 'st'; //No I18N
            break;
        case 'justifyleft': //No I18N
            command = 'jl'; //No I18N
            break;
        case 'justifyright': //No I18N
            command = 'jr'; //No I18N
            break;
        case 'justifyfull': //No I18N
            command = 'jf'; //No I18N
            break;
        case 'justifycenter': //No I18N
            command = 'jc'; //No I18N
            break;
        case 'insertunorderedlist': //No I18N
            command = 'ul'; //No I18N
            break;
        case 'insertorderedlist': //No I18N
            command = 'ol'; //No I18N
            break;
        case 'outdent': //No I18N
            command = 'od'; //No I18N
            break;
        case 'indent': //No I18N
            command = 'id'; //No I18N
            break;
        case 'removeformat': //No I18N
            //command = 'rf';       //No I18N
            break;
        case 'link': //No I18N
            command = 'li'; //No I18N
            break;
        case 'unlink': //No I18N
            command = 'uli'; //No I18N
            break;
        case 'table': //No I18N
            command = 'ta'; //No I18N
            break;
        case 'inserthorizontalrule': //No I18N
            command = 'hr'; //No I18N
            break;
        case 'quote': //No I18N
            command = 'qu'; //No I18N
            break;
        case 'image': //No I18N
            command = 'img'; //No I18N
            break;
        case 'spellcheck': //No I18N
            command = 'sp'; //No I18N
            break;
        case 'subscript': //No I18N
            command = 'ss'; //No I18N
            break;
        case 'superscript': //No I18N
            command = 'sps'; //No I18N
            break;
        case 'forecolor': //No I18N
            command = 'fc'; //No I18N
            break;
        case 'hilitecolor': //No I18N
            command = 'bc'; //No I18N
            break;
        case 'object': //No I18N
            command = 'ihtm'; //No I18N
            break;
        case 'edithtml': //No I18N
            command = 'ehtm'; //No I18N
            break;
        case 'code': //No I18N
            command = 'cod'; //No I18N
            break;
    }
    if (editor.clickCount[command]) {
        editor.clickCount[command]++;
    } else {
        editor.clickCount[command] = 1;
    }
};

ZohoDeskEditor.prototype.resize = function(obj) {
    var editor = this,
        _iframe = editor.iframe,
        _editordiv = editor.outerdiv;
    if (obj.height) {
        _editordiv.style.height = obj.height + 'px';
        _iframe.style.height = obj.height + 'px';
    }
    if (obj.width) {
        _editordiv.style.height = obj.height + 'px';
        _iframe.style.height = obj.height + 'px';
    }
};
