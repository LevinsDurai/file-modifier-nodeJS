//$Id$
ZohoDeskEditor.prototype.insertObj = function() {
	var editor = this,
	_document = document,
	ze_ins_obj_div = _document.getElementById("ze_ins_obj"), //for first time it is undefined
	_textArea,
	I18N = ZohoDeskEditor.i18n,
	hideObjdiv,
	esckey,
	tmp,
	div1,
	close,
	_input1;

	//editor.freeze();
	ZohoDeskEditor.showOverlay();

	hideObjdiv = function() {
		ze_ins_obj_div.style.display = "none";
		_textArea.value = "";
		//editor.hideFreeze();
		ZohoDeskEditor.hideOverlay();
		editor.win.focus();
		_document.removeEventListener("keydown", esckey, true);
	};

	esckey = function(ev) {
		if (ev.keyCode === 27) {
			editor._stopEvent(ev);
			hideObjdiv();
		}
	};

	if (ze_ins_obj_div) {
		ze_ins_obj_div.style.display = "";
	} else {
		tmp = "<div class='zdeskEditor_PUheader'>";
		tmp += I18N("Insert HTML")+"<i class='zdei-close'><svg><use xlink:href='#KBEditortools_close'></use></svg></i></div>"; //No I18N

		tmp += '<div class="zdeskEditor_PUbody"><span><textarea class="ze_objecttxt"></textarea></span></div>';

		tmp += '<div class="zdeskEditor_PUbtm"><input type="submit" class="blue-btn" value=' + I18N("Insert") + ' /><input type="submit" class="btn" value=' + I18N("Cancel") + ' /></div>';

		div1 = _document.createElement("div");
		div1.className = "zdeskEditor_popup";
		div1.innerHTML = tmp;
		div1.id = "ze_ins_obj";
		document.body.appendChild(div1);
		ze_ins_obj_div = div1;
	}
	/* setting the position*/
	ZohoDeskEditor.setPosition(ze_ins_obj_div, editor.outerdiv);

	_textArea = ze_ins_obj_div.getElementsByTagName("textarea")[0];

	/* setting the focus*/
	_textArea.focus();

	_input1 = ze_ins_obj_div.getElementsByTagName("input");
	close = ze_ins_obj_div.getElementsByTagName("i")[0];
	/* event handling start for close*/
	close.onclick = _input1[1].onclick = function(ev) {
		editor._stopEvent(ev);
		hideObjdiv();
	};

	/* event handling for insert button*/
	_input1[0].onclick = function(ev) {
		editor._stopEvent(ev);
		var val = _textArea.value;
		val = ZohoDeskEditor.trim(val);

		if (val.length === 0) {
			var msg  = I18N("Please Enter some HTML");
			editor.initobj.handleAlertMessage ? editor.initobj.handleAlertMessage(msg) : alert(msg); // No I18N
			_textArea.focus();
			return false;
		}
		editor.win.focus();
		editor.insertHTML(val); //No I18N
		editor.initobj.styletext && editor.insertTOC();
		hideObjdiv();
	};
	_document.addEventListener("keydown", esckey, true);
};
