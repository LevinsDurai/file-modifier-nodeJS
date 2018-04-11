/* $Id$ */
ZohoDeskEditor.prototype.uploadImage = function(type) {
	var _document = document,
		editor = this,
		_imgUploadPopup,
		_imgDragNDrop,
		_imgDragNDropiTag,
		_imgDragNDropimgTag,
		_imgDragNDropDiv,
		_imgDragNDropA,
		_imgUploadPreview,
		_imgURLPreview,
		_imgURLPreviewImg,
		_imgDragNDropInput,
		_URLPreviewDiv,
		_URLPreviewInnerDiv,
		_URLPreviewInnerDiv1,
		_URLPreviewInnerDivInput,
		_URLPreviewInnerDivInput1,
		_buttonDiv,
		esckey,
		_submit,
		maxUploadSize = 20,
		selectedRange,
		hideImagePopUp,
		errorcount = 0,
		filteredFiles = undefined,
		doc = editor.doc,
		_cancel;
	esckey = function(ev) {
    	if(ev.keyCode === 27){
            editor._stopEvent(ev);
            hideImagePopUp();
    	}
    };
	if(_imgUploadPopup = _document.getElementById("KB_Editor_UploadImage_Popup")){
		_imgURLPreview = _imgUploadPopup.getElementsByClassName("KB_Editor_ImageUrlDisc")[0];
		_URLPreviewInnerDivInput1 = _imgUploadPopup.getElementsByClassName("KB_Editor_URLImage_Desc")[0];
		_URLPreviewInnerDivInput = _imgUploadPopup.getElementsByClassName("KB_Editor_URLImage_Input")[0];
		_imgURLPreviewImg = _imgUploadPopup.getElementsByClassName("KB_Editor_URLImage_Preview")[0];
		_imgDragNDrop = _imgUploadPopup.getElementsByClassName("KB_Editor_DragDropImage")[0];
		_imgDragNDropInput = _imgUploadPopup.getElementsByClassName("file_input")[0];
		_imgDragNDropA = _imgUploadPopup.getElementsByClassName("KB_Editor_UploadFromDesktop_Action")[0];
		_imgUploadPreview = _imgUploadPopup.getElementsByClassName("KB_Editor_UploadImage_Preview")[0];
		_submit = _imgUploadPopup.getElementsByClassName("KB_Editor_UploadImage_Submit")[0];
		_cancel = _imgUploadPopup.getElementsByClassName("KB_Editor_UploadImage_Cancel")[0];
	}
	else{
		_imgUploadPopup = _document.createElement("div");
		_imgUploadPopup.className = "KB_Editor_UploadImage hide";
		_imgUploadPopup.id = "KB_Editor_UploadImage_Popup";

		_imgDragNDrop = _document.createElement("div");
		_imgDragNDrop.className = "KB_Editor_DragDrop KB_Editor_DragDropImage hide";
		_imgDragNDrop.id = "KB_Editor_DragDropImage";
		_imgDragNDropiTag =_document.createElement("i");
		_imgDragNDropiTag.className = "i-tag KBEditortools-image";
		_imgDragNDropiTag.innerHTML = "<svg><use xlink:href='#KBEditortools_image'></use></svg>";
		_imgDragNDropDiv = _document.createElement("div");
		_imgDragNDropDiv.className = "dt-empty-txt mb10";
		_imgDragNDropDiv.innerText = "Drag & drop image here";
		_imgDragNDropInput = _document.createElement("input");
		_imgDragNDropInput.className = "file_input hide";
		_imgDragNDropInput.type = "file";
		_imgDragNDropInput.id = "file_input";
		_imgDragNDropInput.accept = "image/*"
		_imgDragNDropInput.multiple = "true";
		_imgDragNDropA = _document.createElement("a");
		_imgDragNDropA.className = "KB_Editor_UploadFromDesktop_Action";
		_imgDragNDropA.id = "KB_Editor_UploadFromDesktop_Action";
		_imgDragNDropA.href = "javascript:;"
		_imgDragNDropA.innerText = "or click here to browse";

		_imgUploadPreview = _document.createElement("div");
		_imgUploadPreview.className = "KB_Editor_ImageDisc hide KB_Editor_UploadImage_Preview";
		_imgUploadPreview.id = "KB_Editor_UploadImage_Preview";

		_imgURLPreview = _document.createElement("div");
		_imgURLPreview.className = "KB_Editor_ImageUrlDisc hide";
		_imgURLPreview.id = "KB_Editor_URLImage";
		_imgURLPreviewImg = _document.createElement("img");
		_imgURLPreviewImg.src = "";
		_imgURLPreviewImg.id = "KB_Editor_URLImage_Preview";
		_imgURLPreviewImg.className = "KB_Editor_URLPreviewImage_Blur KB_Editor_URLImage_Preview";
		_URLPreviewDiv = _document.createElement("div");
		_URLPreviewDiv.className = "KB_Editor_clboth";
		var _URLPreviewInnerDiv = _document.createElement("div");
		_URLPreviewInnerDiv.className = "KB_Editor_InputLabel mt30";
		var _URLPreviewInnerDiv1 = _document.createElement("div");
		_URLPreviewInnerDiv1.className = "KB_Editor_InputLabel mt30";
		var _URLPreviewInnerDivInput = _document.createElement("input");
		_URLPreviewInnerDivInput.className = "KB_Editor_AnimateInput KB_Editor_URLImage_Input";
		_URLPreviewInnerDivInput.id = "KB_Editor_URLImage_Input";
		_URLPreviewInnerDivInput.type = "text";
		_URLPreviewInnerDivInput.placeholder = "URL";
		var _URLPreviewInnerDivInput1 = _document.createElement("input");
		_URLPreviewInnerDivInput1.className = "KB_Editor_AnimateInput KB_Editor_URLImage_Desc";
		_URLPreviewInnerDivInput1.id = "KB_Editor_URLImage_Desc";
		_URLPreviewInnerDivInput1.type = "text";
		_URLPreviewInnerDivInput1.placeholder = "Description";
		_URLPreviewInnerDivInput1.autocomplete = "off";

		_buttonDiv = _document.createElement("div");
		_buttonDiv.className = "mt20 button_div";
		_submit = _document.createElement("button")
		_submit.className = "blue-btn KB_Editor_UploadImage_Submit";
		_submit.setAttribute("disabled","disabled");
		_submit.innerText = "Upload";
		_cancel = _document.createElement("button")
		_cancel.className = "btn ml7 KB_Editor_UploadImage_Cancel";
		_cancel.innerText = "Cancel";
		_document.body.appendChild(_imgUploadPopup);

		_imgUploadPopup.appendChild(_imgDragNDrop);
		_imgDragNDrop.appendChild(_imgDragNDropiTag);
		_imgDragNDrop.appendChild(_imgDragNDropDiv);
		_imgDragNDrop.appendChild(_imgDragNDropInput);
		_imgDragNDrop.appendChild(_imgDragNDropA);

		_imgUploadPopup.appendChild(_imgUploadPreview);

		_imgUploadPopup.appendChild(_imgURLPreview);
		_imgURLPreview.appendChild(_imgURLPreviewImg);
		_imgURLPreview.appendChild(_URLPreviewDiv);
		_URLPreviewDiv.appendChild(_URLPreviewInnerDiv);
		_URLPreviewDiv.appendChild(_URLPreviewInnerDiv1);
		_URLPreviewInnerDiv.appendChild(_URLPreviewInnerDivInput);
		_URLPreviewInnerDiv1.appendChild(_URLPreviewInnerDivInput1);

		_imgUploadPopup.appendChild(_buttonDiv);
		_buttonDiv.appendChild(_submit);
		_buttonDiv.appendChild(_cancel);
	}

	if(type === "url"){
		_imgUploadPopup.classList.remove('hide');
    	_URLPreviewInnerDivInput.value = "";
    	_imgURLPreviewImg.src = "";
    	_imgURLPreviewImg.style.display = "none";

    	hideImagePopUp = function() {
	    	ZohoDeskEditor.hideOverlay();
	        editor.win.focus();
	        _imgUploadPopup.classList.add('hide');
	        _imgURLPreview.classList.add('hide');
	        _URLPreviewInnerDivInput.value = "";
	        _imgURLPreviewImg.src = "";
	        _imgURLPreviewImg.style.display = "none";
	        _URLPreviewInnerDivInput1.value = "";
	        _submit.innerText = "Upload";
	        ZohoDeskEditor._removeEvent(document, "keydown", esckey); // No I18N
	        ZohoDeskEditor._removeEvent(doc, "keydown", esckey); // No I18N
	    };
    	var url_img_upload = function () {
		    var tempimgurl = _URLPreviewInnerDivInput.value;
		    _submit.removeAttribute("disabled");
		    if (tempimgurl.length == 0) {
		    	return;
		    }
		    var http = "ht" + "tp://",// No I18N
		      	https = "ht" + "tps://"; // No I18N
		    if (!(_URLPreviewInnerDivInput.value.indexOf(http) === 0) && !(_URLPreviewInnerDivInput.value.indexOf(https) === 0)) {
				var e = "error"; // No I18N
				_submit.setAttribute("data-isError", "true");
		    }
		    else if (tempimgurl && _imgURLPreviewImg.src !== tempimgurl) {
		    	_imgURLPreviewImg.src = tempimgurl;
		    	_imgURLPreviewImg.style.display = "";
		    	_imgURLPreviewImg.onerror = function () {
		    		_imgURLPreviewImg.removeAttribute("src");
		    		_imgURLPreviewImg.style.display = "none";
		    		_submit.setAttribute("data-isError", "true");
		    		return;
		    	};
		    	_imgURLPreviewImg.onload = function () {
		    		_submit.setAttribute("data-isError","false");
		    	};
		    }
    	};

    	ZohoDeskEditor.showOverlay();
	    selectedRange = editor.saveSelection();
	    editor.win.focus();
	    _imgURLPreview.classList.remove('hide');
	    _imgUploadPopup.classList.remove('hide');
	    selectedRange = editor.saveSelection();
	    ZohoDeskEditor._addEvent(document, "keydown", esckey); // No I18N
        ZohoDeskEditor._addEvent(doc, "keydown", esckey); // No I18N
    	_URLPreviewInnerDivInput.onkeyup = _URLPreviewInnerDivInput.onblur = url_img_upload;
    	_URLPreviewInnerDivInput.onpaste = _URLPreviewInnerDivInput.oncut = function () {
    		setTimeout(url_img_upload, 50);
    	};
    	_URLPreviewInnerDivInput.focus();
    }
    else{
    	var _errorcount = 0,
        	successcount = 0,
        	totalcount = 0;

	    hideImagePopUp = function() {
	    	ZohoDeskEditor.hideOverlay();
	        editor.win.focus();
	        ZohoDeskEditor._removeEvent(document, "keydown", esckey); // No I18N
	        ZohoDeskEditor._removeEvent(doc, "keydown", esckey); // No I18N
	        ZohoDeskEditor._removeEvent(_imgDragNDropInput, "change", fileInputChange);
	        _imgUploadPopup.classList.add('hide');
	    	_imgDragNDrop.classList.add('hide');
	    	_submit.innerText = "Upload";
	    	_imgUploadPreview.innerHTML = "";
	    	_imgDragNDropInput.value = "";
	        if (ZohoDeskEditor.activeEditor) {
	            delete(ZohoDeskEditor.activeEditor);
	        }
	    };
	    var hideImageSpan = function(elem) {
	    	elem.parentNode.removeChild(elem);
	    };
	    var closeImgPreviewSpan = function(ev,closeTarget){
	    	editor._stopEvent(ev);
				var closeTarget = ev.target;
				while(closeTarget.nodeName !== "SPAN"){
					closeTarget = closeTarget.parentElement;
				}
	    	var span = closeTarget.parentElement;
	    	if(span.parentElement.getElementsByClassName("ImageUploadDiv").length === 1){
	    		_imgDragNDrop.classList.remove("hide");
	    		_imgUploadPreview.classList.add("hide");
	            _imgDragNDropInput.value = "";
	    		_submit.innerText = "Upload";
	    		_submit.setAttribute("disabled", "disabled");
	    	}
	    	span.parentElement.removeChild(span);

	    }
	    var fileInputChange = function(ev,filesFromDrop) {
	    	editor._stopEvent(ev);
	    	var files = filesFromDrop || _imgDragNDropInput.files,
	    		imgURLS = [],
	    		length = files.length,
	    		count = 0,
					_closeSpan = undefined;
	    	if(length > 5 || length < 1){
	    		(length > 5) && (editor.initobj.handleAlertMessage ? editor.initobj.handleAlertMessage("Only 5 files can be uploaded") : alert("Only 5 files can be uploaded"));
	    		return;
	    	}
	    	_submit.removeAttribute("disabled");
	    	for(var i=0; i < length; i++){
	    		if (files && files[i]) {
	                var file_name = files[i].name;
	                if (file_name != "" && (/(\.(gif|jpg|jpeg|bmp|png|svg))$/i.test(file_name)) && files[i].size / (1024 * 1024) < maxUploadSize) {
	                    if(count === 0){
	                    	_imgUploadPreview.classList.remove('hide');
	                    	_imgDragNDrop.classList.add('hide');
	                    }
	                    var _imgSpan = document.createElement('span');
	                    _imgSpan.className = "ImageUploadDiv";
	                    _imgUploadPreview.appendChild(_imgSpan);
	                    _closeSpan = document.createElement('span');
	                    _closeSpan.className = "i-tag";
											_closeSpan.innerHTML = "<svg><use xlink:href='#KBEditortools_close'></use></svg>";
	                    _imgSpan.appendChild(_closeSpan);
	                    var div = document.createElement('div');
	                    div.className = "Image_fixedHeight";
	                    var span = document.createElement('span');
	                    span.className = "Image_fixedSpan";
	                    var _img = document.createElement('img');
	                    _img.src = URL.createObjectURL(files[i]);
	                    _img.className = "img_upload_preview";
	                    span.appendChild(_img);
	                    div.appendChild(span);
	                    _imgSpan.appendChild(div);
	                    var _errorDiv = document.createElement('div');
	                    _errorDiv.className = "New_Error_mgs hide";
	                    var spantext = document.createElement('span');
	                    spantext.className = "New_Error_text";
	                    spantext.innerText = "Unable To Process";
	                    _errorDiv.appendChild(spantext);
	                    _imgSpan.appendChild(_errorDiv);
	                    var _descDiv = document.createElement('div');
	                    _descDiv.className = "KB_Editor_InputLabel mt30";
	                    _imgSpan.appendChild(_descDiv);
	                    var _descInput = document.createElement('input');
	                    _descInput.className = "KB_Editor_UploadImage_Desc KB_Editor_AnimateInput";
	                    _descInput.type = "text";
	                    _descInput.autocomplete = "off";
	                    _descInput.placeholder = "Description";
	                    _descDiv.appendChild(_descInput);
	                    filteredFiles = files;
	                    count ++;
	                    ZohoDeskEditor._addEvent(_closeSpan, "click", closeImgPreviewSpan);
	                    ZohoDeskEditor.activeEditor = editor;
	                }
	            }
	    	}
	    	if(count > 0 && count != length){
	    		var msg  = length - count === 1 ? "one file is not supported" : length - count +" "+ "files are not supported";
            	editor.initobj.handleAlertMessage ? editor.initobj.handleAlertMessage(msg) : alert(msg); // No I18N
	        }
	    };

	    var handleDragover =  function(ev){
	    	editor._stopEvent(ev);
	    }
	    var handleDrop = function(ev){
	    	editor._stopEvent(ev);
	    	var filesFromDrop = ev.dataTransfer.files;
	    	fileInputChange(ev,filesFromDrop);
	    }

	    _imgDragNDropA.onclick = function(ev) {
	        if (!ZohoDeskEditor_Init.is_ie) {
	            editor._stopEvent(ev);
	            _imgDragNDropInput.click();
	        }
	    }
	    _imgDragNDrop.ondragenter = handleDragover;
	    _imgDragNDrop.ondragover = handleDragover;
	    _imgDragNDrop.ondrop = handleDrop;
	    ZohoDeskEditor._addEvent(_imgDragNDropInput, "change", fileInputChange);
	    ZohoDeskEditor._addEvent(document, "keydown", esckey); // No I18N
        ZohoDeskEditor._addEvent(doc, "keydown", esckey); // No I18N

	    ZohoDeskEditor.showOverlay();
	    selectedRange = editor.saveSelection();
	    editor.win.focus();
	    _imgDragNDrop.classList.remove('hide');
	    _imgUploadPopup.classList.remove('hide');
    }
	var insertImage = function(url, desc){
		var newrange;
		var newsel = editor._getSelection();
		try {
			if (!newsel.isCollapsed) {
				newsel.deleteFromDocument();
			}
			newrange = newsel.getRangeAt(0);
		}
		catch (e) {
			newrange = editor._createRange(newsel);
		}
		var new_img = doc.createElement("img");
		new_img.src = url;
		new_img.style.padding = "0";
		new_img.style.maxWidth = "100%";
		new_img.style.boxSizing = "border-box";
		if(desc){
			var div = doc.createElement("div");
			var span = doc.createElement("SPAN");
			var spanStyle = span.style;
			var divStyle = div.style;
			var inner = doc.createElement("SPAN");
			inner.className = "inner";
			spanStyle.position = "relative";
			spanStyle.display = "block";
			spanStyle.textAlign = "left";
			spanStyle.padding = "0 10px 10px 10px";
			spanStyle.font = "15px/20px 'ProximaNovaRegular',Arial,Helvetica,sans-serif";
			spanStyle.color = "#999";
			divStyle.margin = "20px";
			divStyle.borderRadius = "3px";
			divStyle.border = "1px solid #eee";
			divStyle.display = "inline-block";
			div.className = "KB_Editor_ImageDiscBdr";
			div.setAttribute("contenteditable","false");
			span.className = "KB_Editor_Quotedisc";
			inner.innerText = desc;
			span.appendChild(inner);
			div.appendChild(new_img);
			div.appendChild(span);
			var temp = doc.createElement("div");
			temp.className = "target_moving";
			temp.appendChild(div);
			new_img = temp;
		}
		newrange.insertNode(new_img);
		newrange.selectNode(new_img);
		newrange.collapse(false);
		newsel.removeAllRanges();
		newsel.addRange(newrange);
		editor.saveCurrentState();
	}
	var getReadyToInsertImage = function(obj, target){
		if(target && !target.offsetHeight){
			return;
		}
		var objLength = Object.keys(obj).length;
		successcount += 1;
		target && target ? target.parentElement.childNodes.length === 1 ? hideImagePopUp() : target.parentNode.removeChild(target) : "";
		if(objLength > 0){
			if (selectedRange) {
				editor.restoreSelection(selectedRange);
			}
			editor.win.focus();
			for (var x in obj){
			    if(obj.hasOwnProperty(x)){
			    	obj[x].desc.length < 1 ? insertImage(obj[x].url) : insertImage(obj[x].url, obj[x].desc);
			    }
			}
			var isDiv = doc.body.lastChild;
			if(!(isDiv.tagName === "DIV" && isDiv.firstChild.tagName === "BR")){
				var div = doc.createElement("DIV");
				div.appendChild(doc.createElement("BR"));
				doc.body.appendChild(div);
			}
		}
	}
	var handleError = function( target ){
		if(!target.offsetHeight){
			return;
		}
		target.classList.add("Upload_img_error");
		target.getElementsByClassName("Docs_Animate_Loading")[0].classList.remove("Docs_Animate_Loading");
		target.getElementsByClassName("New_Error_mgs")[0].classList.remove("hide");
        errorcount += 1;
        if(successcount + errorcount === totalcount){
        	_submit.removeAttribute("disabled");
    		_submit.innerText = "Try again";
        }
	}
	_cancel.onclick = function(ev) {
        editor._stopEvent(ev);
        hideImagePopUp();
    };
    _submit.onclick = function(ev) {
    	var imgArray = [],
    		imgJSON = [];
    	_submit.setAttribute("disabled", "disabled");
    	if(type === "url"){
    		var src = _imgURLPreviewImg.getAttribute("src");
    		if(_submit.getAttribute("data-isError") === "true"){
    			editor.initobj.handleAlertMessage ? editor.initobj.handleAlertMessage("Please enter a valid image URL") : alert("Please enter a valid image URL");
    			return false;
    		}
    		if(!src || src.trim().length < 1){
    			_cancel.click(ev);
    			return false;
    		}
    		var zde_ins_imgurl = _imgURLPreviewImg.src,
    			_descLabel = _URLPreviewInnerDivInput1.value;
    		imgJSON["0"] = {"url" : zde_ins_imgurl, "desc" : _descLabel}
    		getReadyToInsertImage(imgJSON);
    		hideImagePopUp();
	    }
    	else{
    		var target = document.getElementsByClassName("ImageUploadDiv"),
    			errorDiv = document.getElementsByClassName("New_Error_mgs"),
    			imageTags = document.getElementsByClassName("img_upload_preview"),
    			files = filteredFiles,
    			descTags = document.getElementsByClassName("KB_Editor_UploadImage_Desc"),
    			progressDiv = document.getElementsByClassName("Image_fixedHeight"),
    			length = imageTags.length,
    			i = 0;
    		totalcount = length;
    		errorcount = 0;
    		successcount = 0;
    		if(length > 0){
    			for(var i = 0; i < length; i++){
    				imgArray[i] = descTags[i].value;
    			}
    			for (i = 0; i < length; i++){
    				target[i].classList.remove("Upload_img_error");
    				errorDiv.length && errorDiv[0].classList.add('hide');
    				progressDiv[i].classList.add("Docs_Animate_Loading");
    				if(editor.initobj.imageuploadcallback){
    					editor.initobj.imageuploadcallback(files[i], getReadyToInsertImage, handleError, target[i], imgArray[i]);
    				}
    				else{
    					_cancel.click();
    				}
    			}
    		}
    	}
    };
};
ZohoDeskEditor.prototype.processInlineImages = function(file,type){
	var editor = this,
		hideProgressBar = function(){
			var progressBar = editor.toolbardiv.getElementsByClassName("KB_Editor_Progres");
			progressBar && progressBar.length && (progressBar[0].style.display = "none");
		},
		success = function(src){
			hideProgressBar();
			editor.squireInstance.insertImage(src,{"style" : "padding:0px;max-width:100%;box-sizing:border-box"});
			editor.saveCurrentState();
		},
		error = function(){
			hideProgressBar();
			editor.initobj.handleAlertMessage ? editor.initobj.handleAlertMessage("Unable to process the image file") : alert("Unable to process the image file");
		},
		callback = type === "drop" ? editor.initobj.handleInlineDropImage : editor.initobj.processPastedFile;
	editor.createProgressbar();
	type === "drop" ? callback(file, success, error) : type === "customPaste" ? callback(file, "blob",success, error) : callback(file, "dataURI",success, error);
};
ZohoDeskEditor.prototype.removeResize = function(){
	var editor = this;
	var resizableWrapper = editor.doc.getElementById("resizeablewrapper");
	var wrapperBottom = editor.doc.getElementById("wrapperbottom");
	if(resizableWrapper){
		resizableWrapper.parentNode.removeChild(resizableWrapper);
		wrapperBottom.parentNode.removeChild(wrapperBottom);
	}
};
ZohoDeskEditor.prototype.resizeimage = function(ev, _target) {
	var editor = this,
		doc = editor.doc,
		win = editor.win,
		setOriginalHeightWidth,
		createResizeDiv,
		createResizable,
		setResizable,
		setDimensions,
		smallFit,
		bestFit,
		originalFit,
		remove,
		resizeablewrapper,
		wrapperbottom,
		wrapperStyle,
		bottomStyle,
		imgStyle,
		smallspan,
		bestspan,
		originalspan,
		setResizeEvent,
		removespan,
		setCursor,
		getOffset,
		typeOfResize = "none",
		_targetWidth = "",
		_targetHeight = "",
		removeResizeOnDocumentClick;
	var tmpWidth = _target.style.width;
	var tmpHeight = _target.style.height;
	_target.style.width = "";
	_target.style.height = "";
	_targetWidth = _target.offsetWidth;
	_targetHeight = _target.offsetHeight;
	_target.style.width = tmpWidth || _targetWidth + "px";
	_target.style.height = tmpHeight || _targetHeight + "px";
	 var setOriginalHeightWidth = function(ev){
		if(_target.className.indexOf("docsimage") < 0){
			var n = (Math.random()+"").replace("0.","");
			var imgId = "img_" + n;
			_target.setAttribute('data-zdeskdocid',imgId);
			_target.parentElement.className.indexOf("KB_Editor_ImageDiscBdr") >= 0 && (_target.parentElement.setAttribute("id","desc_"+imgId));
			if(!_target.getAttribute("data-zdeskdocselectedclass")){
				_target.classList.add('docsimage');
				_target.setAttribute('data-zdeskdocselectedclass','original');
			}
		}
		else{
			_target.parentElement.className.indexOf("KB_Editor_ImageDiscBdr") >= 0 && (_target.parentElement.setAttribute("id","desc_"+_target.getAttribute("data-zdeskdocid")));
		}
		editor._stopEvent(ev);
		createResizable();
	};
	var getOffset = function(element){
		if(element){
			var rect = element.getBoundingClientRect();
			 return { top : rect.top + win.pageYOffset, left : rect.left + win.pageXOffset };
		}
		else{
			return { top : 0, left : 0 };
		}
	};
	var createResizeDiv = function(){
		var frag = doc.createDocumentFragment();
		resizeablewrapper = doc.createElement("div");
		resizeablewrapper.id = "resizeablewrapper";
		resizeablewrapper.setAttribute("contenteditable","false");
		frag.appendChild(resizeablewrapper);
		wrapperbottom = doc.createElement("div");
		wrapperbottom.id ="wrapperbottom";
		wrapperbottom.className = "spancls";
		wrapperbottom.setAttribute("contenteditable","false");
		frag.appendChild(wrapperbottom);
		smallspan = doc.createElement("span");
		smallspan.id = "contentSpan";
		smallspan.setAttribute("span-type","small");
		smallspan.innerText = "Small"            //i18N('support.solution.label.small');
		wrapperbottom.appendChild(smallspan);
		bestspan = doc.createElement("span");
		bestspan.id = "contentSpan";
		bestspan.setAttribute("span-type","best");
		bestspan.innerText = "Best"               //i18N('support.solution.label.best');
		wrapperbottom.appendChild(bestspan);
		originalspan = doc.createElement("span");
		originalspan.id = "contentSpan";
		originalspan.setAttribute("span-type","original");
		originalspan.innerText = "Original"       //i18N('support.solution.label.best');
		wrapperbottom.appendChild(originalspan);
		removespan = doc.createElement("span");
		removespan.id = "contentSpan";
		removespan.innerText = "Remove"       //i18N('crm.label.remove');
		wrapperbottom.appendChild(removespan);
		doc.body.appendChild(frag);
		wrapperStyle = resizeablewrapper.style;
		bottomStyle = wrapperbottom.style;
		imgStyle = _target.style;
		ZohoDeskEditor._addEvent(resizeablewrapper, "mousedown", setResizeEvent);
		ZohoDeskEditor._addEvent(resizeablewrapper, "mousemove", setCursor);
		ZohoDeskEditor._addEvent(resizeablewrapper, "mouseover", setCursor);
		ZohoDeskEditor._addEvent(document, "mousedown", removeResizeOnDocumentClick);
		ZohoDeskEditor._addEvent(smallspan, "click", smallFit);
		ZohoDeskEditor._addEvent(bestspan, "click", bestFit);
		ZohoDeskEditor._addEvent(originalspan, "click", originalFit);
		ZohoDeskEditor._addEvent(removespan, "click", remove);
	};
	var setCursor = function(ev){
		var cursoroffsetWidth = ev.pageX,
			cursoroffsetHeight = ev.pageY,
			imgOffset = getOffset(_target);
		if(Math.abs(cursoroffsetWidth - (imgOffset.left + _target.offsetWidth)) <= 20 && Math.abs(cursoroffsetHeight - (imgOffset.top + _target.offsetHeight)) <= 20){
			typeOfResize = "both";
			wrapperStyle.cursor = "se-resize";
		}
		else if(Math.abs(cursoroffsetWidth - (imgOffset.left + _target.offsetWidth)) <= 20){
			typeOfResize = "width";
			wrapperStyle.cursor = "ew-resize";
		}
		else if(Math.abs(cursoroffsetHeight - (imgOffset.top + _target.offsetHeight)) <= 20){
			typeOfResize = "height";
			wrapperStyle.cursor = "ns-resize";
		}
		else if(editor.initobj.needDraggableImage){
			typeOfResize = "move";
			wrapperStyle.cursor = "move";
		}
		else{
			typeOfResize = "none";
			wrapperStyle.cursor = "text";
		}
	};
	var setResizeEvent = function(ev){
		editor._stopEvent(ev);
		var cursoroffsetWidth = ev.pageX;
		var cursoroffsetHeight = ev.pageY;
		if(typeOfResize !== "none" && typeOfResize !== "move"){
			ZohoDeskEditor._removeEvent(resizeablewrapper, "mousemove", setCursor);
			ZohoDeskEditor._removeEvent(resizeablewrapper, "mouseover", setCursor);
			ZohoDeskEditor._addEvent(doc.body, "mousemove", setResizable);
			ZohoDeskEditor._addEvent(resizeablewrapper, "mousemove", setResizable);
			ZohoDeskEditor._addEvent(resizeablewrapper, "mouseup", removeResizeEvent);
			ZohoDeskEditor._addEvent(doc.body, "mouseup", removeResizeEvent);
			ZohoDeskEditor._addEvent(_target, "mouseup", removeResizeEvent);
		}
		else if(typeOfResize === "move"){
			ZohoDeskEditor._removeEvent(resizeablewrapper, "mousemove", setCursor);
			ZohoDeskEditor._removeEvent(resizeablewrapper, "mouseover", setCursor);
			removeResizeEvent(ev);
			removeResizeOnDocumentClick(ev);
			editor.dragImageInsideEditor(ev, _target);
		}
	};
	var removeResizeOnDocumentClick = function(ev){
		removeResizeEvent(ev);
		ZohoDeskEditor._removeEvent(document, "mousedown", removeResizeOnDocumentClick);
		editor.removeResize();
	};
	var removeResizeEvent = function(ev){
		editor._stopEvent(ev);
		ZohoDeskEditor._removeEvent(doc.body, "mousemove", setResizable);
		ZohoDeskEditor._removeEvent(doc.body, "mouseup", removeResizeEvent);
		ZohoDeskEditor._removeEvent(resizeablewrapper, "mousemove", setResizable);
		ZohoDeskEditor._removeEvent(resizeablewrapper, "mouseup", removeResizeEvent);
		ZohoDeskEditor._addEvent(resizeablewrapper, "mousemove", setCursor);
		ZohoDeskEditor._removeEvent(_target, "mouseup", removeResizeEvent);
	};
	var setResizable = function(ev){
		editor._stopEvent(ev);
		var imgOffset = getOffset(_target);

		if(typeOfResize === "none"){
			return;
		}
		var cursoroffsetWidth = ev.pageX - imgOffset.left;
		var cursoroffsetHeight = ev.pageY - imgOffset.top;
		cursoroffsetWidth = cursoroffsetWidth > 20 ? cursoroffsetWidth : 20;
		cursoroffsetHeight = cursoroffsetHeight > 20 ? cursoroffsetHeight : 20;
		if(typeOfResize === "width" || typeOfResize === "both"){
			imgStyle.width = cursoroffsetWidth + "px";
		}
		if(typeOfResize === "height" || typeOfResize === "both"){
			imgStyle.height = cursoroffsetHeight + "px";
		}
		wrapperStyle.top = imgOffset.top + "px";
		wrapperStyle.left = imgOffset.left + "px";
		wrapperStyle.height = _target.offsetHeight + "px";
		wrapperStyle.width = _target.offsetWidth + "px";
		bottomStyle.width = (resizeablewrapper.offsetWidth) + "px";
		bottomStyle.left = (imgOffset.left) + "px";
		bottomStyle.top = ( imgOffset.top + resizeablewrapper.offsetHeight + 3) + "px";
		_target.setAttribute('data-zdeskdocselectedclass','');
		updateSpanOption();
	};
	var createResizable = function(){
		var currImageId = _target.getAttribute("data-zdeskdocid"),
			imgOffset = getOffset(_target);
		resizeablewrapper = doc.getElementById("resizeablewrapper");
		if( resizeablewrapper && resizeablewrapper.getAttribute("data-divId") == currImageId ){
			return;
		}
		wrapperbottom = doc.getElementById("wrapperbottom");
		if(resizeablewrapper){
			resizeablewrapper.parentNode.removeChild(resizeablewrapper);
			wrapperbottom.parentNode.removeChild(wrapperbottom);
		}
		createResizeDiv();
		var selectedclass = _target.getAttribute('data-zdeskdocselectedclass');
		if(selectedclass === 'best'){
			bestFit();
		}
		else if(selectedclass === 'small'){
			smallFit();
		}
		resizeablewrapper.setAttribute("data-divId", _target.getAttribute("data-zdeskdocid"));
		wrapperStyle.left = imgOffset.left + "px";
		wrapperStyle.top = imgOffset.top + "px";
		wrapperStyle.width = _target.offsetWidth + "px";
		wrapperStyle.height = _target.offsetHeight + "px";
		bottomStyle.left = (imgOffset.left) + "px";
		bottomStyle.top = (imgOffset.top + _target.offsetHeight + 3) + "px";
		bottomStyle.width = _target.offsetWidth + "px";
		updateSpanOption();
		wrapperStyle.display = "block";
		bottomStyle.display = "block";
	};
	var updateSpanOption = function(){
		var selectedSpan = wrapperbottom.getElementsByClassName("selectedSpan")[0];
		var option = _target.getAttribute("data-zdeskdocselectedclass");
		selectedSpan && selectedSpan.classList.remove("selectedSpan");
		option && wrapperbottom.querySelectorAll("[span-type='"+option+"']")[0].classList.add("selectedSpan");
	};
	var setDimensions = function(currdoc, $currImg, $resizeablewrapper, $wrapperbottom){
		var imgOffset = getOffset(_target);
		wrapperStyle.left = imgOffset.left + "px";
		wrapperStyle.top = imgOffset.top + "px";
		wrapperStyle.width = _target.offsetWidth + "px";
		wrapperStyle.height = _target.offsetHeight + "px";
		bottomStyle.left = (imgOffset.left) + "px";
		bottomStyle.top = (imgOffset.top + resizeablewrapper.offsetHeight + 3) + "px";
		bottomStyle.width = resizeablewrapper.offsetWidth + "px";
		updateSpanOption();
	};
	var smallFit = function(ev, currdoc){
		_target.style.width = _targetWidth * 0.25 + "px";
		_target.style.height = _targetHeight * 0.35 + "px";
		_target.setAttribute("data-zdeskdocselectedclass","small");
		setDimensions();
	};
	var bestFit = function(ev, currdoc){
		_target.style.width = _targetWidth * 0.5 + "px";
		_target.style.height = "auto";
		_target.setAttribute("data-zdeskdocselectedclass","best");
		setDimensions();
	};
	var originalFit = function(ev, currdoc){
		_target.style.width = "";
		_target.style.height = "";
		_target.setAttribute("data-zdeskdocselectedclass","original");
		setDimensions();
	};
	var remove =  function(){
		var _anchorEl = _target.parentElement.nodeName === "A" ? _target.parentElement.parentElement : _target.parentElement;
		if(_anchorEl.className === "KB_Editor_ImageDiscBdr"){
			_anchorEl = _anchorEl.parentElement.className.indexOf("target_moving") >= 0 ? _anchorEl.parentElement : _anchorEl;
		}
		else if(_anchorEl.className === "target_moving"){
			_anchorEl = _target.parentElement;
		}
		else{
			_anchorEl = _target;
		}
		_anchorEl.parentNode.removeChild(_anchorEl);
		resizeablewrapper.parentNode.removeChild(resizeablewrapper);
		wrapperbottom.parentNode.removeChild(wrapperbottom);
	};
	setOriginalHeightWidth(ev);
};
ZohoDeskEditor.prototype.dragImageInsideEditor = function(ev, _targetEl){
	var editor = this,
		doc = editor.doc,
		win = editor.win,
		_target = _targetEl,
		dragEvent,
		dropEvent,
		dragOverEvent,
		_targetStyle = _target.style,
		removeEvent,
		timer,
		imgId = _target.getAttribute("data-zdeskdocid"),
		_target_mov = doc.getElementById("target_mov_"+imgId),
		_target_desc = doc.getElementById("desc_"+imgId),
		editorWidth = editor.outerdiv.offsetWidth / 3,
	    div = doc.createElement("div");
	if(_target_mov){
		_target = _target_mov;
	}
	else if(_target_desc){
		_target = _target_desc;
	}
	_targetStyle = _target.style;
	div.className = "target_moving";
	if(_target.id.indexOf("target_mov_") < 0){
		var align = undefined;
		if(_target.nodeName === "IMG"){
			align = _target.getAttribute("align");
		}
		else{
			var img = _target.getElementsByTagName("IMG")[0];
			align = img.getAttribute("align");
		}
		if(align){
			align = align === "left" || align === "right" ? "target_moving_"+align : "";
			if(align === "left"){
				div.style.float = "left";
			}
			else if(align === "right"){
				div.style.float = "right";
			}
			else if(align === "middle"){
				div.align = "middle";
			}
			align && align.length && _target.removeAttribute("align");
		}
		div.id = "target_mov_"+imgId;
		_target.insertAdjacentElement("beforebegin", div);
		_target = _target.parentElement.nodeName === "A" ? _target.parentElement : _target;
		div.appendChild(_target);
		_target = div;
		_targetStyle = _target.style;
	}
	dragEvent = function(){
		ZohoDeskEditor._addEvent(doc, "mousemove", dragOverEvent);
		ZohoDeskEditor._addEvent(doc, "mouseup", dropEvent);
	};
	dragOverEvent = function(ev){
	    clearTimeout(timer);
        timer = setTimeout(function() {
        	if(ev.target && ev.target !== _target && ev.target !== doc.body.parentElement){
		    	try{
		    		ev.target.insertAdjacentElement("afterbegin", _target);
		    	}
		    	catch(e){
		    		//do nothing.
		    	}
		    }
        }, 0);
        _target.removeAttribute("align");
        _target.removeAttribute("style");
        if(ev.pageX <= editorWidth){
        	_targetStyle.float = "left";
        }
        else if(ev.pageX <= editorWidth * 2){
        	try{
        		_target.setAttribute("align" , "middle");
        	}
        	catch(e){
        		//do nothing
        	}
        }
        else{
        	_targetStyle.float = "right";
        }
	};
	dropEvent = function(ev){
		editor._stopEvent(ev);
		doc.body.style.cursor = "";
		var targetMoving = doc.getElementsByClassName("target_moving");
		for(var i = 0; i < targetMoving.length; i += 1){
			if(targetMoving[i].childNodes.length === 0){
				targetMoving[i].parentNode.removeChild(targetMoving[i]);
				i -= 1;
			}
		}
		removeEvent();
	};
	removeEvent = function(){
		ZohoDeskEditor._removeEvent(doc, "mousemove", dragOverEvent);
		ZohoDeskEditor._removeEvent(doc, "mouseup", dropEvent);
	};
	doc.body.style.cursor = "move";
	dragEvent();
};