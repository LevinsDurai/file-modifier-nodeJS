/* $Id$ */
ZohoDeskEditor.prototype.insertTextStyles = function(ev) {
	var editor = this,
	    doc = editor.doc,
	    body = doc.body,
	    role = ev.target.nodeName === "I" ? ev.target.parentElement.getAttribute('role') : ev.target.getAttribute('role'),
		selection = undefined,
		range = undefined,
		span = false,
		_spanElement = undefined,
	    commonContainer = undefined,
	    nodeName = undefined,
	    fragment = undefined,
	    length = undefined,
	    highLights = undefined,
	    emptyHighLights = undefined,
	    spanLastChild = undefined,
	    i = 0;

	editor.squireInstance.focus();
	selection = editor.win.getSelection();
	if(!selection.valueOf().toString()){
		return;
	}
	fragment = doc.createDocumentFragment();
	span = doc.createElement("SPAN");
	span.id = "KB_Editor_Container";
	span.className = role ? role+" KB_Editor_Highlights" : "KB_Editor_Highlights";
	fragment.appendChild(span);

	range = selection.getRangeAt(0);
	commonContainer = range.commonAncestorContainer;
	nodeName = commonContainer ? commonContainer.nodeName : "";
	var insertHighLights = function(){
		_spanElement = doc.createElement("DIV");
		range.insertNode(_spanElement);
		_spanElement.appendChild(fragment);
		highLights = span.getElementsByClassName("KB_Editor_Highlights");
		var emptyHighLights = body.getElementsByClassName("KB_Editor_Highlights");
		var spanLastChild = span.lastChild;
		for(var i = 0; i < emptyHighLights.length; i++){
			!emptyHighLights[i].innerText.trim().length && emptyHighLights[i].parentElement.parentNode.removeChild(emptyHighLights[i].parentElement);
		}
		while( highLights[0] ){
			var oldSpan = highLights[0].children;
			var oldSpanParent = highLights[0].parentNode;
			var tempEl = doc.createElement("div");
			_spanElement = highLights[0].children;
			while ( oldSpan[0]){
				fragment.appendChild(oldSpan[0]);
			}
			tempEl.appendChild(fragment);
			oldSpanParent.insertAdjacentHTML("beforebegin",tempEl.innerHTML);
			highLights[0].parentNode.removeChild(highLights[0]);
			oldSpanParent.parentNode && oldSpanParent.nodeName === "DIV" && oldSpanParent.parentNode.removeChild(oldSpanParent);
		}
		if( body.lastChild === span.parentElement ){
			body.appendChild(doc.createElement("div"));
			body.lastChild.appendChild(doc.createElement("br"));
		}
		spanLastChild && spanLastChild.nodeName === "DIV" && spanLastChild.childNodes && spanLastChild.childNodes.length === 1 && spanLastChild.firstChild.nodeName === "BR" && spanLastChild.parentNode.removeChild(spanLastChild);
		SolutionForm.textHighLightsFromTarget(ev);
		selection = doc.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
		editor.saveCurrentState();
	};
	var checkForSameNode = function( frag ){
		var common = frag.childNodes;
			length = common.length,
			i = 1;
		while( i < length ){
			if(common[0].nodeName !== common[i].nodeName){
				range.insertNode(frag);
				selection = doc.getSelection();
				doc.getSelection().removeAllRanges();
				selection.addRange(range);
				return false;
			}
			i ++;
		}
		return true;
	}
	if(nodeName === "#text" || ["UL", "OL", "DIV", "H1", "H2", "H3", "TABLE", "SPAN", "P", "PRE"].indexOf(nodeName) >= 0 || commonContainer.getAttribute("id") === "KB_Editor_Container"){
		var ListContainer = commonContainer,
			highLightedContainer = commonContainer,
			tableContainer = commonContainer;
		if(["TABLE", "UL", "OL"].indexOf(nodeName) < 0 && (!(nodeName === "SPAN" && commonContainer.getAttribute("id") === "KB_Editor_Container"))){
			while(ListContainer.parentNode !== body && ["UL","OL"].indexOf(ListContainer.parentNode.nodeName) < 0){
				ListContainer = ListContainer.parentNode;
			}
			while(tableContainer.parentNode !== body && ["TABLE"].indexOf(tableContainer.parentNode.nodeName) < 0){
				tableContainer = tableContainer.parentNode;
			}
			while(highLightedContainer.parentNode !== body && highLightedContainer.parentNode.getAttribute("id") !== "KB_Editor_Container"){
				highLightedContainer = highLightedContainer.parentNode;
			}
			while( commonContainer.parentNode !== body && ["DIV", "H1", "H2", "H3", "TD", "SPAN", "P", "PRE"].indexOf(commonContainer.parentNode.nodeName) < 0){
				commonContainer = commonContainer.parentNode;
			}
			commonContainer = commonContainer.parentNode !== body ? commonContainer.parentNode : commonContainer;
		}
		if(highLightedContainer.parentNode.getAttribute("id") === "KB_Editor_Container"){
			var oldSpan = highLightedContainer.parentNode;
			var oldSpanParent = highLightedContainer.parentNode.parentNode;
			fragment.firstChild.innerHTML = oldSpan.innerHTML;
			oldSpan.parentNode.removeChild(oldSpan);
			oldSpanParent && oldSpanParent.nodeName === "DIV" && oldSpanParent.parentNode.removeChild(oldSpanParent);
		}
		else if(["TABLE"].indexOf(tableContainer.parentNode.nodeName) >= 0){
			fragment.firstChild.appendChild(tableContainer.parentNode);
		}
		else if(["UL","OL"].indexOf(ListContainer.parentNode.nodeName) >= 0){
			fragment.firstChild.appendChild(ListContainer.parentNode);
		}
		else if(commonContainer.getAttribute("id") === "KB_Editor_Container"){
			var oldSpan = commonContainer;
			var oldSpanParent = commonContainer.parentNode;
			fragment.firstChild.innerHTML = oldSpan.innerHTML;
			oldSpan.parentNode.removeChild(oldSpan);
			oldSpanParent && oldSpanParent.nodeName === "DIV" && oldSpanParent.parentNode.removeChild(oldSpanParent);
		}
		else{
			fragment.firstChild.appendChild(commonContainer);
		}
		insertHighLights();
	}
	else if(["TABLE", "TBODY", "TR", "TD"].indexOf(nodeName) >= 0){
		while(commonContainer.parentNode !== body && commonContainer.parentNode.nodeName !== "TABLE"){
			commonContainer = commonContainer.parentNode;
		}
		var highLightedContainer = commonContainer;
		while(highLightedContainer.parentNode !== body && highLightedContainer.parentNode.getAttribute("id") !== "KB_Editor_Container"){
			highLightedContainer = highLightedContainer.parentNode;
		}
		if(highLightedContainer.parentNode.getAttribute("id") === "KB_Editor_Container"){
			var oldSpan = highLightedContainer.parentNode;
			var oldSpanParent = highLightedContainer.parentNode.parentNode;
			fragment.firstChild.innerHTML = oldSpan.innerHTML;
			oldSpan.parentNode.removeChild(oldSpan);
			oldSpanParent && oldSpanParent.nodeName === "DIV" && oldSpanParent.parentNode.removeChild(oldSpanParent);
		}
		else{
			commonContainer = commonContainer.parentNode !== body ? commonContainer.parentNode : commonContainer;
			fragment.firstChild.appendChild(commonContainer);
		}
		insertHighLights();
	}
	else{
		var frag = editor.squireInstance.extractCommonContainer(range, commonContainer, body);
		if(checkForSameNode(frag)){
			fragment.firstChild.appendChild(frag);
		}
		else if(commonContainer === body){
			commonContainer = commonContainer.children;
			while(commonContainer[0]){
				fragment.firstChild.appendChild(commonContainer[0]);
			}
		}
		else{
			fragment.firstChild.appendChild(commonContainer);
		}
		insertHighLights();
	}
};
ZohoDeskEditor.prototype.handleContentStyles = function(){
	var editor = this,
	    doc = editor.doc,
		selection = doc.getSelection(),
		isHeading = ["h1","h2","h3","heading 1","heading 2","heading 3"].indexOf(doc.queryCommandValue("formatblock").toLowerCase()) > -1 ? true : false,
		anchor = undefined;
		var text = selection.valueOf().toString().trim(),
		isTextSelected = text.length && text !== "\u200B";
	text.length && text === "\u200B" && selection.getRangeAt(0).collapse();
	if(SolutionForm.isExpanded || document.getElementsByClassName("SolutionForm_Content_Property_Tab")[0].offsetHeight === 0){
		anchor = selection.anchorNode && ((selection.anchorNode.nodeName !== "BODY" && selection.anchorNode.nodeName !== "#text") ? selection.anchorNode : selection.anchorNode.parentElement);
		var tagName = anchor ? anchor.tagName : "";
		if( !isHeading && isTextSelected){
			var _span = editor.toolbardiv.getElementsByClassName("KBEditortools-txtbgclr")[0];
			if(_span.className.indexOf("ze_Sel") < 0){
				_span.click();
			}
		}
	}
	else{
		anchor = selection.anchorNode && ((selection.anchorNode.nodeName !== "BODY" && selection.anchorNode.nodeName !== "#text") ? selection.anchorNode : selection.anchorNode.parentElement);
		var tagName = anchor ? anchor.tagName : "";
		if(isHeading){
	    	document.getElementById("SolutionForm_Anchor_Property_Tab").click();
	    }
		else if(SolutionForm.imgClicked || SolutionForm.tableClicked || (anchor && anchor.id === "KB_Editor_Container") ||  isTextSelected || (SolutionForm.imgClicked && anchor && anchor.nodeName !== "BODY" && anchor.nodeName !== "#text" && anchor.getElementsByTagName("img").length)){
			document.getElementById("SolutionForm_Content_Property_Tab").click();
			SolutionForm.imgClicked ? SolutionForm.imgClicked = false : "";
		}
		else{
			document.getElementById("SolutionForm_Article_Property_Tab").click();
		}
	}
};
ZohoDeskEditor.prototype.insertTOC = function() {
    var editor = this,
    	_document = editor.doc,
    	headingElements = _document.querySelectorAll('h1,h2,h3'),
    	textArr = [],
    	length = headingElements.length,
    	i,
    	id,
        titleTag,
        divElement = document.getElementById('SolutionForm_Anchor_Property').children[0],
        childDiv,
        anchorElement,
        count = 0;
		divElement.innerHTML = "";
    var renameDuplicates = function(callback){

    	var map = {};
    	var countJson = undefined;
    	var result = textArr;
    	var checkRenamingCompleted = function(resultArr){
		    return (new Set(resultArr)).size !== resultArr.length;
    	};
    	var countMap = function(val) {
    	    return map[val] = (typeof map[val] === "undefined") ? 0 : map[val] + 1;
    	};
    	var resultMap = function(val, index) {
    	    return val + ( (map[val] > 0 && countJson[index] > 0) ? '_' + countJson[index] : '' );
    	};
    	do{
    		map = {};
	    	countJson = result.map(countMap);
	    	result = result.map(resultMap);
    	}while(checkRenamingCompleted(result));
    	textArr = result;
    	callback && callback(textArr);
    }
    for(var i=0; i<headingElements.length;i++){
    	headingElements[i].textContent.trim().length && textArr.push(headingElements[i].textContent.trim().replace(/ /g,"_").replace(/[^a-zA-Z0-9_-]/g,''));
    }
    renameDuplicates();
    var iTagClick = function(ev){
    	var lastChild = ev.target.parentElement.parentElement.lastChild;
    	if(!lastChild.children){
    		return;
    	}
    	ev.target.classList.toggle("SolutionForm_Rotate0")
    	lastChild.classList.toggle("hide");
    },
    handleAnchor = function(ev){
    	var target = ev.target,
    		href = target.href;
    	if(href && href.length){
    		_document.body.scrollTop = _document.getElementById(href).offsetTop;
    	}

    },
    checkSizeSpan = function(target){
    	var length = target.children.length;
    	var spanLength = target.getElementsByClassName("size").length;
    	if(length > 0 && spanLength > 0 && (spanLength + 1 === length || spanLength === length) ){
    		return false;
    	}
    	else{
    		return true;
    	}
    };
    if (length > 0) {
	    for (i = 0; i < length; i++) {
	    	var tag = headingElements[i];
	    	var tagName = headingElements[i].tagName;
	    	var text = headingElements[i].innerText.trim();

	        if (text.length < 1) {
	        	headingElements[i].removeAttribute("id");
	        	headingElements[i].removeAttribute("class");
	            count += 1;
	        } else {
	        	headingElements[i].id = textArr[i - count];
	        	headingElements[i].setAttribute("class","toc_anchors");
	            anchorElement = document.createElement('div');
	            anchorElement.href = headingElements[i].id;
	            anchorElement.id = "anchor_" + headingElements[i].tagName.toLowerCase();
	            anchorElement.className = "temp_class";
	            anchorElement.textContent = text;
	            divElement.appendChild(anchorElement);
	        }
	    }
	    if(count === length){
	    	SolutionForm && SolutionForm.showEmptyTOC(divElement);
	    }
	    else{
	    	var headings = divElement.getElementsByClassName("temp_class");
	    	var length = headings.length;
	    	var i =0;
	    	var max = headings[i].id;
	    	var anchorList;
	    	var anchorTitle, iTag;
	    	for(i = 0; i < length; i++){
	    		var heading = headings[0];
	    		var id = heading.id;
	    		if(max < id){
	    			heading.className = "SolutionForm_comList";
	    			anchorList.lastChild.appendChild(heading);
	    		}
	    		else{
	    			anchorList = document.createElement("div");
	    			divElement.appendChild(anchorList);
	    			anchorList.className = "SolutionForm_Anchor_ListDiv";
	    			heading.className = "SolutionForm_Anchor_Title";
	    	    	iTag = document.createElement("i");
	    	    	iTag.className = "icon-Block-down-arrow i-tag";
	    	    	anchorList.appendChild(heading);
	    	    	heading.appendChild(iTag);
	    	    	ZohoDeskEditor._addEvent(iTag, "click", iTagClick);
	    	    	anchorList.appendChild(document.createElement("div"));
	    	    	max = id;
	    		}
	    		ZohoDeskEditor._addEvent(heading, "click", handleAnchor);
	    	}
	    }
	    count = 0;
	}
    else{
    	SolutionForm && SolutionForm.showEmptyTOC(divElement);
    }
};
ZohoDeskEditor.getQuoteHTML = function(doc,text,className,contentEdit,cursor){
	var doc = editor.doc,
		className = className || "KB_Editor_QuoteBGclr KB_Editor_Highlights",
		div = doc.createElement("div"),
		span = doc.createElement("span"),
		contentEdit = contentEdit || false;
	div.innerHTML =  text;
	span.id = "KB_Editor_Container";
	span.className = className;
	span.appendChild(div);
	span.contentEditable=false;
	span.style.cursor=cursor || "default";
	return sapn.outerHTML;
};
ZohoDeskEditor.prototype.insertReplyText = function(text,className,contentEdit,cursor) {
	try{
		var editor = this,
			_mode = editor.mode,
			doc = editor.doc;
		if(text.trim().length && (_mode && _mode !== "plaintext")){
			var span = ZohoDeskEditor.getQuoteHTML(doc,text,className,contentEdit,cursor);
			editor.insertHTML(document.createElement("br").outerHTML+span, true);
			editor.saveCurrentState();
			editor.win.focus();
		}
	}catch(e){
		//do nothing
	}
};