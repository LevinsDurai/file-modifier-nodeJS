/* $Id$ */
ZohoDeskEditor.prototype.insertQuote = function() {
	var editor = this,
	doc = editor.doc,
	sel,
	range,
	fragment,
	_block,
	_div,
	_empty,
	temp_html,
	_anchorElement;

	temp_html = editor.getContent();
	// editor.win.focus();
	editor.squireInstance.focus();
	_anchorElement = editor.win.getSelection().anchorNode.parentNode;
	while (_anchorElement !== null) {
		if (_anchorElement.nodeName === "BLOCKQUOTE") {
			return true;
		} else {
			_anchorElement = _anchorElement.parentNode;
		}
	}
	sel = editor._getSelection();
	range = editor._createRange(sel);
	fragment = doc.createDocumentFragment();

	/*br before blockquote tag*/
	var _tempDiv = doc.createElement("div");
	_tempDiv.appendChild(doc.createElement("br"));
	fragment.appendChild(_tempDiv);

	/* creating blockquote start*/
	_block = doc.createElement("blockquote");
	fragment.appendChild(_block);
	/* creating blockquote end*/

	/* creating blockquote for div start*/
	_div = doc.createElement("div");
	_block.appendChild(_div);
	/* creating blockquote for div end*/

	/*br after blockquote tag*/
	fragment.appendChild(doc.createElement("br"));

	if (ZohoDeskEditor_Init.inlineQuotes) {
		//                _block.style.borderLeft = "2px solid #CCCCCC";
		//                _block.style.paddingLeft = "10px";
		_block.style.border = "1px solid #CCCCCC";
		_block.style.padding = "7px";
		_block.style.backgroundColor = "#F5F5F5";
	} else {
		_block.className = "block_quote";
	}
	if (sel.isCollapsed) {
		_div.appendChild(doc.createElement("br")); //No I18N
		range.insertNode(fragment);
		range.selectNodeContents(_div);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
	} else {
		_div.appendChild(range.cloneContents());
		var wrapperDiv = doc.createElement("div");
		wrapperDiv.appendChild(fragment);
		fragment.appendChild(doc.createElement("br"));
		editor.insertHTML(wrapperDiv.innerHTML, true);
		//var _selection = editor.win.getSelection();
		//var range = editor._createRange(_selection);
		//range.insertNode(fragment);
		//range.selectNode(_block);
		//range.collapse(false);
		/*
        _range.selectNode(_divElement);
                    _selection.removeAllRanges();
                                        _selection.addRange(_range);
                                        _selection.collapseToStart();*/

		/*
         if(!range.nextSibling)
                        {
                                _empty = doc.createTextNode(" ");
                                range.insertNode(_empty);
                                range.selectNodeContents(_empty);
                                range.collapse(false);
                                sel.removeAllRanges();
                                sel.addRange(range);
                        }*/
	}
	//editor.stack.execute(new editor.EditCommand(editor.doc.body, editor.getContent(),editor.saveCursorPosition(editor.doc.body)));			//No I18N
	editor.saveCurrentState();
};
