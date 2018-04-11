/* $Id$ */
/* globals ZE,ZE_Init */
/* This function will create the link dialog and its handling*/
ZohoDeskEditor.prototype.createLink = function() {
    "use strict"; // No I18N
    var editor = this,
        _document = document,
        $zeLinkDiv = _document.getElementById("ze_link"), // No I18N
        I18N = ZohoDeskEditor.i18n,
        selectedText = editor._getSelectedText(),
        _input,
        urlRadio,
        emailRadio,
        textInput,
        urlInput,
        emailInput,
        subjectInput,
        textSpan,
        urlSpan,
        emailSpan,
        subjectSpan,
        isLink,
        existingLink,
        isImage,
        linkhtml,
        buttons,
        closeButton,
        selectedRange,
        keyEventHandler,
        linkFlag = true,
        okButton;

    /* for first time zeLinkDiv it is undefined*/
    /*  getParentElement() is in zerange.js */


    for (existingLink = editor.getParentElement(); existingLink !== null && existingLink.nodeName !== "BODY"; // No I18N
        existingLink = existingLink.parentNode) {
        if(linkFlag && existingLink.children.length && (existingLink.getElementsByTagName("IMG").length === 1)){
            existingLink = existingLink.getElementsByTagName("IMG")[0];
        }
        if (existingLink.nodeName === "A") { // No I18N
            isLink = true;
            break;
        }
        else if (existingLink.nodeName === "IMG") { // No I18N
            isImage = true;
            if (existingLink.parentNode.nodeName === "A") { // No I18N
                isLink = true;
                existingLink = existingLink.parentNode;
            }
            break;
        }
        linkFlag = false;
    }

    var hideLinkDiv = function() {
        var _form = $zeLinkDiv.getElementsByTagName("form")[0]; // No I18N
        ZohoDeskEditor._removeEvent(_document, "keydown", keyEventHandler); // No I18N
        $zeLinkDiv.parentNode && $zeLinkDiv.parentNode.removeChild($zeLinkDiv);
        ZohoDeskEditor.hideOverlay();
        if (_form) {
            _form.reset();
        }
    };

    keyEventHandler = function(ev) {
        if (ev.keyCode === 27) {
            editor._stopEvent(ev);
            hideLinkDiv();
        }
        if (ev.keyCode === 13) {
            editor._stopEvent(ev);
            okButton(ev);
        }
    };

    var urlMode = function() {
        urlRadio.checked = true;
        emailRadio.checked = false;
        emailSpan.style.display = subjectSpan.style.display = "none"; // No I18N
        urlSpan.style.display = "";
    };

    var emailMode = function() {
        urlRadio.checked = false;
        emailRadio.checked = true;
        urlSpan.style.display = "none"; // No I18N
        emailSpan.style.display = subjectSpan.style.display = "";
    };
    var setFocus = function() {
        if (urlRadio.checked && (isImage || selectedText)) {
            urlInput.focus();
        } else if (emailRadio.checked && (isImage || selectedText)) {
            emailInput.focus();
        } else {
            textInput.focus();
        }
    };

    /* this function will initialise the local variables and the dialog init*/
    var createLinkSelection = function(_urlValue, textValue) {

        var sel,
            range,
            atag;
        editor.doc.execCommand("createlink", false, _urlValue); // No I18N
        try {
            sel = editor._getSelection();
            sel.collapseToEnd();
            atag = editor.getParentElement();
            if (atag.tagName === "A") { // No I18N
                if (!ZohoDeskEditor_Init.preventTargetBlank) {
                    atag.target = "_blank"; // No I18N

                    if (editor.initobj.anchorReferer) {
                        atag.rel = "noreferrer";
                    }
                }
                // var a = 10;
                // if(a){
                //   atag.rel="noreferrer";
                // }

                if (atag.textContent !== textValue && !atag.getElementsByTagName("img")) { // No I18N
                    atag.textContent = textValue;
                }
                range = editor._createRange(sel);
                range.selectNode(atag);
                sel.removeAllRanges();
                sel.addRange(range);
                sel.collapseToEnd();
            }
        } catch (e) {
            if (editor.range) {
                editor.range.select();
                delete editor.range;
            }
            editor.doc.execCommand("createlink", false, _urlValue); // No I18N
            atag = editor.getParentElement();
            if (atag.tagName === "A") { // No I18N
                if (!ZohoDeskEditor_Init.preventTargetBlank) {
                    atag.target = "_blank"; // No I18N
                    if (editor.initobj.anchorReferer) {
                        atag.rel = "noreferrer";
                    }
                }
                if (atag.innerText !== textValue && !atag.getElementsByTagName("img")) { // No I18N
                    atag.innerText = textValue;
                }
                sel = editor._getSelection();
                range = editor._createRange(sel);
                range.moveToElementText(atag);
                range.collapse(false);
                range.select();
            }

        }
        var range1 = editor.doc.createRange();
        range1.setStart(atag, 0);
        range1.setEndAfter(atag);
        range1.selectNode(atag);
        var selection = editor.iframe.contentWindow.getSelection();
        selection.removeAllRanges();
        selection.addRange(range1);
        editor.win.focus();
        editor.iframe.contentWindow.getSelection().collapseToEnd();
        editor.saveCurrentState();
    };

    var initialise = function() {

        var _tr,
            href,
            split1,
            split2;
        /* variable initialisation start*/
        _input = $zeLinkDiv.getElementsByTagName("input"); // No I18N
        urlRadio = _input[0];
        emailRadio = _input[1];
        textInput = _input[2];
        urlInput = _input[3];
        emailInput = _input[4];
        subjectInput = _input[5];
        // tooltip_input = _input[6];

        buttons = $zeLinkDiv.getElementsByTagName("span"); // No I18N
        closeButton = $zeLinkDiv.getElementsByClassName("zdei-close")[0]; // No I18N

        _tr = $zeLinkDiv.getElementsByTagName("tr"); // No I18N

        textSpan = _tr[1];
        urlSpan = _tr[2];
        emailSpan = _tr[3];
        subjectSpan = _tr[4];
        /* variable initialisation start*/

        if (isImage) {
            textSpan.style.display = "none"; // No I18N
        } else {
            textSpan.style.display = "";
        }

        /* updating the link parameters in the dilog*/
        if (isLink) {
            if (!isImage) {
                textInput.value = existingLink.textContent;
            }

            if (existingLink.protocol === "mailto:") { // No I18N
                emailMode();
                href = existingLink.href;
                split1 = href.split("mailto:"); // No I18N
                split2 = split1[1].split("?subject="); // No I18N
                emailInput.value = split2[0] || "";
                subjectInput.value = split2[1] || "";
            } else {
                urlMode();
                urlInput.value = existingLink.href;
            }
            // tooltip_input = existingLink.title || "";
        } else {
            urlMode();
            if (!isImage) {
                textInput.value = selectedText || "";
            }
        }
    };

    var regexEmail = new RegExp("^[\\w]([\\w\-\\.\\+\\']*)@([\\w\\-\\.]*)(\\.[a-zA-Z]{2,22}(\\.[a-zA-Z]{2}){0,2})$"); // No I18N
    var regexUrl = new RegExp("^(ht|f)tp(s?)\\:\\/\\/[-.\\w]*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\:\\'\\/\\\\\\+=&amp;%\\$#_@]*)?$"); // No I18N

    var _selectedText = ZohoDeskEditor.trim(selectedText);
    if (regexEmail.test(_selectedText) && !isLink) {
        createLinkSelection("mailto:" + _selectedText, _selectedText); // No I18N
        return;
    } else if (regexUrl.test(_selectedText) && !isLink) {
        createLinkSelection(_selectedText, _selectedText);
        return;
    }
    ZohoDeskEditor.showOverlay();
    /* showOverlay is in initialEditorSetUp.js*/
    editor.win.focus();
    selectedRange = editor.saveSelection();
    linkhtml = '<div class="zdeskEditor_PUheader">' + I18N("Insert Link") + '<i class="zdei-close"><svg><use xlink:href="#KBEditortools_close"></use></svg></i></div>'; // No I18N
    linkhtml += '<div class="zdeskEditor_PUbody">'; // No I18N
    linkhtml += '<form><table class="zde_ptble">'; // No I18N
    linkhtml += '<tr class="mb30"><td>' + // No I18N
        I18N("Link") + // No I18N
        '</td><td><input type="radio" id="ze_link_url" checked="true"/><label for="ze_link_url">' + // No I18N
        I18N("URL") + // No I18N
        '</label><input id="ze_link_email" type="radio"/><label for="ze_link_email">' + // No I18N
        I18N("Email") + // No I18N
        '</label></td>'; // No I18N

    linkhtml += '<tr><td>' + I18N("Selected text") + '&nbsp;</td><td><input type="text"></td></tr>'; // No I18N
    linkhtml += '<tr><td>' + I18N("Web address") + '</td><td><input type="text"></td></tr>'; // No I18N
    linkhtml += '<tr style="display:none;"><td>' + // No I18N
        I18N("Email address") + // No I18N
        '</td><td><input type="text"></td></tr>'; // No I18N
    linkhtml += '<tr style="display:none;"><td>' + I18N("Subject") + '</td><td><input type="text"></td></tr>'; // No I18N
    linkhtml += '</table></form></div>'; // No I18N
    linkhtml += '<div class="zdeskEditor_PUbtm"><span class="blue-btn">' + // No I18N
        I18N("OK") + // No I18N
        '</span><span class="btn" data-val="Cancel">' + // No I18N
        I18N("Cancel") + '</span></div></div>'; // No I18N

    var div1 = _document.createElement("div"); // No I18N
    div1.className = "zdeskEditor_popup"; // No I18N
    div1.innerHTML = linkhtml;
    div1.id = "ze_link"; // No I18N
    document.body.appendChild(div1);
    $zeLinkDiv = div1;
    initialise();

    /* setting the position*/
    ZohoDeskEditor.setPosition($zeLinkDiv, editor.outerdiv);
    setFocus();

    /* event handling for url click start*/
    urlRadio.onclick = function() {
        urlMode();
        setFocus();
    };

    emailRadio.onclick = function() {
        emailMode();
        setFocus();
    };
    /* event handling for url click end*/

    /* event handling start for close*/
    closeButton.onclick = buttons[1].onclick = function(ev) {
        editor._stopEvent(ev);
        hideLinkDiv();
    };


    /* event handling start for click*/
    okButton = function(ev) {

        var http = "ht" + // No I18N
            "tp://", // No I18N
            https = "ht" + // No I18N
            "tps://"; // No I18N
        editor._stopEvent(ev);

        /* getting the url value to update,remove or creating link*/
        var textValue = textInput.value,
            urlValue,
            subjectValue,
            sel,
            range,
            imglnk,
            anchorElement;

        if (selectedRange) {
            editor.restoreSelection(selectedRange);
        }
        if (urlRadio.checked) {
            urlValue = urlInput.value;
            urlValue = ZohoDeskEditor.trim(urlValue);
        } else if (emailRadio.checked) {
            urlValue = emailInput.value;
            urlValue = ZohoDeskEditor.trim(urlValue);
        }

        subjectValue = subjectInput.value;
        // tooltip_value = tooltip_input.value;

        /* link exists removal or modification*/
        if (isLink) {
            /* removing link*/
            if (!urlValue) {
                var callback = function(){
                    sel = editor._getSelection();
                    range = editor._createRange(sel);
                    range.selectNode(existingLink);
                    editor.doc.execCommand("unlink", false, null); // No I18N
                    hideLinkDiv();
                };
                if(editor.initobj.handleAlertMessage){
                    editor.initobj.handleAlertMessage("Please confirm that you want to unlink this element." + "\n" + "\n" + "Link points to:" + " " + decodeURI(existingLink.href),{callback : callback,title : "Unlink"})
                }
                else if (confirm("Please confirm that you want to unlink this element." + "\n" + "\n" + "Link points to:" + " " + decodeURI(existingLink.href))) {
                    callback();
                }
            } else { // modifying link
                if (urlRadio.checked) {
                    if (!((urlValue.indexOf(http) === 0) ||
                            (urlValue.indexOf(https) === 0) ||
                            (urlValue.indexOf("ftp://") === 0) || // No I18N
                            (urlValue.indexOf("ssh://") === 0))) {
                        urlValue = http + urlValue;
                    }
                } else if (emailRadio.checked) {
                    urlValue = "mailto:" + urlValue; // No I18N
                    if (subjectValue) {
                        urlValue += "?subject=" + subjectValue; // No I18N
                    }
                }
                existingLink.href = urlValue;
                existingLink.setAttribute("href", existingLink.href); // To avoid punycode encrypt
                /* adding target */
                if (!ZohoDeskEditor_Init.preventTargetBlank) {
                    existingLink.target = "_blank"; // No I18N
                    if (editor.initobj.anchorReferer) {
                        existingLink.rel = "noreferrer";
                    }
                }
                if (!isImage && existingLink.textContent !== textValue) {
                    existingLink.textContent = textValue;
                }
                range = editor.doc.createRange();
                range.setStart(existingLink, 0);
                range.setEndAfter(existingLink);
                range.selectNode(existingLink);
                var selection = editor.iframe.contentWindow.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                editor.win.focus();
                if (selectedRange) {
                    editor.restoreSelection(selectedRange);
                }
                editor.saveCurrentState();
            }
        } else { // creating new link for text or image
            textValue = ZohoDeskEditor.trim(textValue);
            if (!textValue && !isImage) {
                var msg  = I18N("You must Select or ENTER Some text to create link");
                editor.initobj.handleAlertMessage ? editor.initobj.handleAlertMessage(msg) : alert(msg); // No I18N
                textInput.focus();
                return false;
            }

            if (urlRadio.checked) {
                if (!urlValue) {
                    var msg  = I18N("Please enter URL to make a link");
                    editor.initobj.handleAlertMessage ? editor.initobj.handleAlertMessage(msg) : alert(msg); // No I18N
                    urlInput.focus();
                    return false;
                }
                if (!((urlValue.indexOf(http) === 0) ||
                        (urlValue.indexOf(https) === 0) ||
                        (urlValue.indexOf("ftp://") === 0) || // No I18N
                        (urlValue.indexOf("ssh://") === 0))) { // No I18N
                    urlValue = http + urlValue;
                }
            } else if (emailRadio.checked) {
                if (!urlValue) {
                    var msg  = I18N("Please enter Email to make a link");
                    editor.initobj.handleAlertMessage ? editor.initobj.handleAlertMessage(msg) : alert(msg); // No I18N
                    emailInput.focus();
                    return false;
                }
                urlValue = "mailto:" + urlValue; // No I18N
                if (subjectValue) {
                    urlValue += "?subject=" + subjectValue; // No I18N
                }
            }

            if (isImage) {

                editor.doc.execCommand("createlink", false, urlValue); // No I18N
                sel = editor._getSelection();
                sel.collapseToEnd();
                imglnk = editor.getParentElement();
                if (imglnk && imglnk.tagName.toLowerCase() === "a") { // No I18N
                    /* adding target */
                    if (!ZohoDeskEditor_Init.preventTargetBlank) {
                        imglnk.target = "_blank"; // No I18N
                        if (editor.initobj.anchorReferer) {
                            imglnk.rel = "noreferrer";
                        }
                    }
                    // var a = 10;
                    // if(a){
                    //   imglnk.rel = "noreferrer";
                    // }
                    // if(editor.initobj.)
                }
                var atag = imglnk.parentElement;
                range = editor._createRange(sel);
                range.selectNode(atag);
                sel.removeAllRanges();
                sel.addRange(range);
                sel.collapseToEnd();
            } else if (selectedText && selectedText.length !== 0) {
                createLinkSelection(urlValue, textValue);
            } else {
                var tmp = "<a id='an_link'"; // No I18N
                if (!ZohoDeskEditor_Init.preventTargetBlank) {
                    tmp += "target='_blank'"; // No I18N
                    if (editor.initobj.anchorReferer) {
                        tmp += "rel='noreferrer'";
                    }
                }
                // var a = 10;
                // if(a){
                //   tmp += "rel = 'noreferrer'";
                // }
                tmp += "></a>"; // No I18N
                editor.win.focus();
                editor.pasteHTML(tmp);
                anchorElement = editor.doc.getElementById("an_link"); // No I18N
                /* To deal with relative link issue,while inserting link of same domain,when no selection is there*/
                if (anchorElement) {
                    anchorElement.appendChild(editor.doc.createTextNode(textValue));
                    anchorElement.setAttribute("href", urlValue); // No I18N
                    anchorElement.setAttribute("target","_blank");
                    anchorElement.removeAttribute("id"); // No I18N
                }
                editor.saveCurrentState();
            }
        }
        hideLinkDiv();
        return false;
    };
    buttons[0].onclick = okButton;
    ZohoDeskEditor._addEvent(_document, "keydown", keyEventHandler); // No I18N
};

/* called when link is clicked*/
ZohoDeskEditor.prototype.showAnchorTag = function(_target) {
    "use strict"; // No I18N
    var _anchorTarget = _target,
        editor = this,
        _document = document,
        I18N = ZohoDeskEditor.i18n,
        mouseDownHandler,
        $zeLink,
        removeEventListeners,
        keyDownHandler,
        saveAndRestoreFocus,
        removeAnchor,
        setPositions,
        anchorEle,
        mainSpan,
        goTospan;
    // editor.win.focus();

    var selectedRange = editor.saveSelection();

    mouseDownHandler = function(ev) { // if user clicks outside the iframe
        $zeLink = document.getElementById("zde_linkBlock"); // No I18N
        if (ev) {
            _target = ev.target;
            for (; _target !== null; _target = _target.parentNode) {
                if (_target === $zeLink) {
                    break;
                }
            }
        }
        if (!_target) {
            removeEventListeners();
        }
    };
    keyDownHandler = function() {
        removeEventListeners();
    };
    removeEventListeners = function() {
        $zeLink = document.getElementById("zde_linkBlock"); // No I18N
        if ($zeLink) {
            document.body.removeChild($zeLink);
            ZohoDeskEditor._removeEvent(_document, "mousedown", mouseDownHandler); // No I18N
            ZohoDeskEditor._removeEvent(editor.doc, "mousedown", mouseDownHandler); // No I18N
            ZohoDeskEditor._removeEvent(editor.doc, "keydown", keyDownHandler); // No I18N
        }
    };
    saveAndRestoreFocus = function() {
        var range = editor.doc.createRange();
        range.setStart(_anchorTarget, 0);
        range.setEndAfter(_anchorTarget);
        range.selectNode(_anchorTarget);
        var selection = editor.iframe.contentWindow.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        editor.win.focus();
        if (selectedRange) {
            editor.restoreSelection(selectedRange);
        }
    };

    removeAnchor = function() {
        var range = editor.doc.createRange();
        range.setStart(_anchorTarget, 0);
        range.setEndAfter(_anchorTarget);
        range.selectNode(_anchorTarget);
        var selection = editor.iframe.contentWindow.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        editor.win.focus();
        editor.doc.execCommand("unlink", false, null); // No I18N
        editor.iframe.contentWindow.getSelection().collapseToStart();
        removeEventListeners();
        editor.saveCurrentState();
    };
    setPositions = function() {
        var $zeLinkDom = document.getElementById("zde_linkBlock"); // No I18N
        var editorPos = ZohoDeskEditor.getPos(editor.outerdiv),
            _style = $zeLinkDom.style,
            $document = document,
            $body = document.body,
            $documentElement = $document.documentElement;
        // setting position
        var posx = 0;
        var posy = 0;
        var value1 = editor.iframe.getBoundingClientRect();
        var value2 = _anchorTarget.getBoundingClientRect();
        var _docWidth = document.body.getBoundingClientRect().width;
        var blockWidth;
        posx = value1.left + value2.left;
        posy = value1.top + value2.top + _anchorTarget.offsetHeight + (Math.max($body.scrollTop, $documentElement.scrollTop) || 0);
        //if (posx < _docWidth / 2) {
        _style.left = parseInt(posx) + "px"; // No I18N
        _style.top = parseInt(posy) + "px"; // No I18N
        _style.right = "auto"; // No I18N
        blockWidth = (posx + $zeLinkDom.offsetWidth);
        //} else {
//            _style.left = "auto"; // No I18N
//            _style.top = parseInt(posy) + "px"; // No I18N
//            posx = window.innerWidth - posx - _anchorTarget.offsetWidth;
//            _style.right = parseInt(posx) + "px"; // No I18N
//            blockWidth = (posx + $zeLinkDom.offsetWidth);
//        }
        if (blockWidth >= _docWidth) {
            var tempRef = anchorEle.innerHTML;
            if (tempRef.length > 55) {
                tempRef = tempRef.substring(0, 54) + "..."; // No I18N
            }
            anchorEle.innerHTML = tempRef;
        }
        if (posy + $zeLinkDom.offsetHeight > editor.outerdiv.offsetHeight + editorPos.offsetTop) {
            // var tempTop = posy - _offsetheight;
            _style.top = "auto"; // No I18N
            posy = window.innerHeight - posy + _anchorTarget.offsetHeight;
            _style.bottom = parseInt(posy) + "px"; // No I18N
        }
        $zeLinkDom.getElementsByTagName("A")[0].style.maxWidth = (0.60 * editor.outerdiv.offsetWidth) + "px";
    };
    // creating menu for anchor element


    $zeLink = document.getElementById("zde_linkBlock"); // No I18N
    if ($zeLink) {
        removeEventListeners();
    }
    mainSpan = document.createElement("span"); // No I18N
    mainSpan.id = "zde_linkBlock"; // No I18N
    mainSpan.className = "zde_Link_spell"; // No I18N

    anchorEle = document.createElement("a"); // No I18N
    if (_anchorTarget.href.indexOf("mailto") < 0) { // No I18N
        if (editor.initobj.anchorReferer) {
            anchorEle.rel = "noreferrer";
        }
    }
    anchorEle.setAttribute("href", _anchorTarget.href);
    goTospan = document.createElement("span"); // No I18N
    goTospan.innerHTML = I18N("Go to:"); // No I18N
    anchorEle.appendChild(editor.doc.createTextNode(_anchorTarget.href));
    anchorEle.target = "_blank";
    mainSpan.appendChild(anchorEle);
    var changeAnchor = document.createElement("span"); // No I18N
    changeAnchor.className = "KBEditortools-pen2"; // No I18N
    changeAnchor.innerHTML = "<svg><use xlink:href='#KBEditortools_pen'></use></svg>";
    var _removeAnchor = document.createElement("span"); // No I18N
    _removeAnchor.className = "KBEditortools-removelink-black"; // No I18N
    _removeAnchor.innerHTML = "<svg><use xlink:href='#KBEditortools_removelink_black'></use></svg>";

    mainSpan.appendChild(goTospan);
    mainSpan.appendChild(anchorEle);
    mainSpan.appendChild(changeAnchor);
    mainSpan.appendChild(_removeAnchor);
    document.body.appendChild(mainSpan);
    setPositions();

    // event listeners for li elements
    ZohoDeskEditor._addEvent(_removeAnchor, "click", removeAnchor); // No I18N
    ZohoDeskEditor._addEvent(changeAnchor, "click", function() { // No I18N
        if (selectedRange) {
            editor.restoreSelection(selectedRange);
        }
        editor.win.focus();
        editor.createLink(_anchorTarget);
        removeEventListeners();
    });

    editor.updateToolbar();
    // event listeners when clicked outside menu
    ZohoDeskEditor._addEvent(_document, "mousedown", mouseDownHandler); // No I18N
    ZohoDeskEditor._addEvent(editor.doc, "mousedown", mouseDownHandler); // No I18N
    ZohoDeskEditor._addEvent(editor.doc, "keydown", keyDownHandler); // No I18N
};
