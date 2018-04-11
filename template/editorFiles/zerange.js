/* $Id$ */
ZohoDeskEditor.prototype.saveSelection = function() {
    var editor = this,
        _document = document,
        _doc = editor.doc;
    editor.win.focus();
    var sel = editor.win.getSelection ? editor.win.getSelection() : _doc.selection;
    var range;
    try {
        if (sel) {
            if (sel.createRange) {
                range = sel.createRange();
            } else if (sel.getRangeAt) {
                if (sel.rangeCount == 0) {
                    //  console.log("iam called range count");
                    editor.focusAtStart(true);
                } else {
                    range = sel.getRangeAt(0);
                }

            } else if (sel.anchorNode && sel.focusNode && _doc.createRange) {

                range = _doc.createRange();
                range.setStart(sel.anchorNode, sel.anchorOffset);
                range.setEnd(sel.focusNode, sel.focusOffset);

                // Handle the case when the selection was selected backwards (from the end to the start in the
                // document)
                if (range.collapsed !== sel.isCollapsed) {
                    range.setStart(sel.focusNode, sel.focusOffset);
                    range.setEnd(sel.anchorNode, sel.anchorOffset);
                }
            }
        }
    } catch (e) {}
    return range;
};

ZohoDeskEditor.prototype.restoreSelection = function(range) {
    var editor = this,
        _document = document,
        _doc = editor.doc;
    var sel = editor.win.getSelection ? editor.win.getSelection() : _doc.selection;
    //  console.log(range);
    //  console.log(sel);
    if (sel && range) {
        if (range.select) {
            //  console.log("range select");
            range.select();
        } else if (sel.removeAllRanges && sel.addRange) {
            //  console.log("range removeall and addRange");
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
    //console.log(sel);
};

ZohoDeskEditor.prototype._getSelection = function() {
    return this.win.getSelection();
};

ZohoDeskEditor.prototype._createRange = function(sel) {
    try {
        return sel.getRangeAt(0);
    } catch (e) {
        return this.doc.createRange();
    }
};
ZohoDeskEditor.prototype._getSelectedText = function() {
    try {
        var s = this._getSelection();
        if (s) {
            return s.toString();
        }
    } catch (e) {
        return undefined;
    }
};

ZohoDeskEditor.prototype.getParentElement = function() {
    var editor = this,
        sel = editor._getSelection(), //present above  --> returns the selected area
        range = editor._createRange(sel), //present above
        p = range.commonAncestorContainer; /*returns deepest node that contains both Range.startContainer and Range.endContainer*/
    try {
        /*range.collapsed specifies whether the start and end position of the selection are same*/
        /*The Range.startOffset read-only property returns a number representing where in the startContainer the Range starts.
        If the startContainer is a Node of type Text, Comment, or CDATASection, then the offset is the number of characters from the start of the startContainer to the boundary point of the Range. For other Node types, the startOffset is the number of child nodes between the start of the startContainer and the boundary point of the Range.*/
        /*endOffset  = start of the endContainer to the boundary point of the Range. */

        if (!range.collapsed && range.startContainer == range.endContainer && range.startOffset - range.endOffset <= 1 && range.startContainer.hasChildNodes()) {
            p = range.startContainer.childNodes[range.startOffset];
        }
        while (p.nodeType == 3) //nodeType 3 is textNode
        {
            p = p.parentNode; //getting the parent of that textNoe
        }
        return p;
    } catch (e) {
        return undefined;
    }
};

ZohoDeskEditor.prototype.pasteHTML = function(html) {
    var sel, range;
    var editor = this;
    var _win = editor.win;

    if (_win.getSelection) {
        // IE9 and non-IE
        sel = _win.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = editor.doc.createElement("div");
            el.innerHTML = html;
            var frag = editor.doc.createDocumentFragment(),
                node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (editor.doc.selection && editor.doc.selection.type != "Control") { //No I18N
        editor.doc.selection.createRange().pasteHTML(html);
    }
};

ZohoDeskEditor.prototype.insertHTML = function(html, saveState) {
    var editor = this,
        _mode = editor.mode;
    if (_mode && _mode === "plaintext") {
        editor.insertText(html);
    } else {
        editor.win.focus();
        var temp_content,
            new_content,
            temp_content = editor.getContent(),
            nPurify = editor.NewDOMPurify;
        html = nPurify.sanitize(html, {
            ADD_ATTR: ['contenteditable']
        });
        if (editor.squireInstance) {
            editor.squireInstance.insertHTML(html);
        } else {
            editor.pasteHtml(html);
        }
        new_content = editor.getContent();
        if (new_content != temp_content && !saveState) {
            //editor.stack.execute(new editor.EditCommand(editor.doc.body,editor.getContent(),editor.saveCursorPosition(editor.doc.body)));
            editor.saveCurrentState();
        }
        editor.initobj.insertHTMLCallback && editor.initobj.insertHTMLCallback();
        var sqInstance = editor.squireInstance;
        sqInstance.addTextLinks(editor.doc.body, editor.doc.body, sqInstance);
    }
};

/* used for inserting html in the textarea mode*/
ZohoDeskEditor.prototype.insertText = function(text) {
    var editor = this,
        _textarea = editor._textarea,
        _textarea_value = _textarea.value,
        _selectionStart = _textarea.selectionStart,
        _selectionEnd = _textarea.selectionEnd;

    if (_textarea) {
        text = ZohoDeskEditor.getText(text);
        if (_selectionStart || _selectionStart === 0) {
            _textarea.value = _textarea_value.substring(0, _selectionStart) + text + _textarea_value.substring(_selectionEnd, _textarea_value.length);
        } else {
            _textarea.value += text;
        }
        _textarea.focus();
    }
};
