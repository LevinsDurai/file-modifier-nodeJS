/* $Id$ */
ZohoDeskEditor.prototype.insertCode = function() {
	var editor = this,
	sel,
	startnode,
	class_set,
	range,
	_parent,
	ols,
	ols_length,
	i,
	addStyle;

	editor.doc.execCommand("insertorderedlist", false, " "); //No I18N

	sel = editor.win.getSelection();
	startnode = sel.anchorNode;
	addStyle = function(startnode){
		var style = startnode.style;
		startnode.removeAttribute("style");
		style.listStylePosition = "outside";
		style.listStyleType = "decimal";
		style.padding = "0 30px";
	};
	if (startnode.nodeName === "OL") {
		addStyle(startnode);
		return;
	}

	class_set = false;

	for (; startnode !== null && startnode.nodeName !== "BODY"; startnode = startnode.parentNode) {
		if (startnode.nodeName === "OL") {
			addStyle(startnode);
			class_set = true;
			break;
		}
	}
	if (startnode.nodeName === "LI") {
		var style = startnode.style;
		startnode.removeAttribute("style");
		style.backgroundColor = "#f5f5f5";
		style.borderLeft = "2px solid #ccc";
		style.margin = "1px";
		style.padding = "2px";
	}
	else{
		var lis = startnode.getElementsByTagName("LI");
		if(lis && lis.length > 0){
			for(var i = 0; i < lis.length; i += 1){
				var li = lis[i];
				var style = li.style;
				li.removeAttribute("style");
				style.backgroundColor = "#f5f5f5";
				style.borderLeft = "2px solid #ccc";
				style.margin = "1px";
				style.padding = "2px";
			}
		}
	}
	if (!class_set) {
		range = sel.getRangeAt(0);
		_parent = range.commonAncestorContainer;

		if (_parent.nodeType !== 1) {
			for (; _parent !== null && _parent.nodeName !== "BODY"; _parent = _parent.parentNode) {
				if (_parent.nodeType === 1) {
					break;
				}
			}
		}
		if (_parent.nodeType === 1) {
			ols = _parent.getElementsByTagName("ol");
			ols_length = ols.length;
			for (i = 0; i < ols_length; i++) {
				if (sel.containsNode(ols[i], true)) {
					addStyle(ols[i]);
					break;
				}
			}
		}
	}
};