/* $Id$ */
/* global ZE */
ZohoDeskEditor.prototype.htmlView = function() {
            "use strict";
            var editor = this,
            sqInstance = editor.squireInstance,
            _document = document,
            zde_htmlview_div = _document.getElementById("zde_htmlview"), //for first time it is undefined
            _textarea,
            _iframe,
            firstspan,
            secondspan,
            html = editor.getContent(),
            _input,
            hideHtmlViewDiv,
            esckey,
            initialise,
            load,
            close,
            xmlhttp;

            //editor.freeze();
            ZohoDeskEditor.showOverlay();
            hideHtmlViewDiv = function() {
                zde_htmlview_div.style.display = "none";
                //editor.hideFreeze();
                ZohoDeskEditor.hideOverlay();
                editor.win.focus();
                _document.removeEventListener("keydown", esckey, true);
            };

            esckey = function(ev) {
                if (ev.keyCode === 27) {
                    editor._stopEvent(ev);
                    hideHtmlViewDiv();
                }
            };

            /* this function will initialise the local variables*/
            initialise = function() {
                _textarea = zde_htmlview_div.getElementsByTagName("textarea")[0];
                _iframe = zde_htmlview_div.getElementsByTagName("iframe")[0];
                _input = zde_htmlview_div.getElementsByTagName("input");
                var _span = zde_htmlview_div.getElementsByTagName("span");
                firstspan = _span[0];
                secondspan = _span[1];
                close = zde_htmlview_div.getElementsByTagName("i")[0];
            };

            load = function() {
                firstspan.className = "zde_edit_sel";
                secondspan.className = "zde_edit";
                _iframe.style.display = "none";
                _textarea.style.display = "";
            };

            if (zde_htmlview_div) {
                initialise();
                _textarea.value = html;
                load();
                zde_htmlview_div.style.display = "";
            } else {
                (function() {
                    var I18N = ZohoDeskEditor.i18n,
                    tmp,
                    div;

                    tmp = "<div class='zdeskEditor_PUheader'>";
                    tmp += I18N('Edit HTML') + '<i class="zdei-close"><svg><use xlink:href="#KBEditortools_close"></use></svg></i></div>'; //No I18N

                    tmp += "<div class='zdeskEditor_PUbody'><div class='zde_menu_tab'><span class='zde_edit_sel'>" + I18N("HTML") + "</span>";
                    tmp += "<span class='zde_edit'>" + I18N("Preview") + "</span></div>";

                    tmp += "<textarea class='ze_ed_txtarea '>" + html + "</textarea>";
                    tmp += "<iframe class='zde_ed_ifr' style='display:none;'></iframe></div>";

                    tmp += "<div class='zdeskEditor_PUbtm'><input type='submit' class='blue-btn' value='" + I18N("Insert") + "'/>";
                    tmp += "<input type='submit' class='btn' value='" + I18N("Cancel") + "'/>";

                    div = _document.createElement("div");
                    div.className = "zdeskEditor_popup";
                    div.innerHTML = tmp;
                    div.id = "zde_htmlview";
                    document.body.appendChild(div);
                    zde_htmlview_div = div;
                    initialise();
                }());
            }

            /* positioning the div*/
            ZohoDeskEditor.setPosition(zde_htmlview_div, editor.outerdiv);

            /* setting the focus*/
            _textarea.focus();

            try {
                xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", "/support/ze/formatTag", true);
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState === 4) {
                        if (xmlhttp.status === 200) {
                            var response = xmlhttp.responseText;
                            if (response) {
                                response=JSON.parse(response);
                                _textarea.value = response.content || html;
                            }
                        }
                    }
                };
                xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                xmlhttp.send(encodeURI("&content=" + encodeURIComponent(html) + "&"+ZohoDeskEditor.getCSRFParamName()+"=" + ZohoDeskEditor.getCSRFCookie(editor))); //No I18N
            } catch (e) {}

            firstspan.onmousedown = function() {
                load();
                _textarea.focus();
                return false;
            };

            secondspan.onmousedown = function() {
                firstspan.className = "zde_edit";
                secondspan.className = "zde_edit_sel";
                _textarea.style.display = "none";
                var nPurify = editor.NewDOMPurify;
                var html = nPurify.sanitize(_textarea.value, {
                    ADD_ATTR: ['contenteditable']
                });
                var _iframedoc = _iframe.contentWindow.document,
                css,
                _head,
                _iframedoc_body,
                loadPreviewCss = function() { // No I18N
                    var _head = _iframedoc.getElementsByTagName("head")[0]; // No I18N
                    var css = _iframedoc.createElement("link"); // No I18N
                    css.type = 'text/css'; // No I18N
                    css.rel = 'stylesheet'; // No I18N
                    css.href = ZohoDeskEditor_Init.cssurl+"ZohoDeskEditor.min.css"; // No I18N

                    /* mac safari 3.2 will not have head tag*/
                    if (!_head) {
                        _iframedoc.body.parentNode.insertBefore(_iframedoc.createElement("head"), _iframedoc.body); // No I18N
                        _head = _iframedoc.getElementsByTagName("head")[0]; // No I18N
                    }
                    if (_head) {
                        _head.appendChild(css);
                    }
                };

                _iframedoc.open();
                _iframedoc.write(html);
                loadPreviewCss();
                _iframedoc.close();

                _iframe.style.display = "";
                _iframe.contentWindow.focus();
                return false;
            };

            /* event handling start for close*/
            close.onclick = _input[1].onclick = function(ev) {
                editor._stopEvent(ev);
                hideHtmlViewDiv();
            };

            /* event handling for insert*/
            _input[0].onclick = function(ev) {
                editor._stopEvent(ev);
                editor.setContent(_textarea.value);
                editor.initobj.styletext && editor.insertTOC();
                sqInstance.addTextLinks(editor.doc.body, editor.doc.body, sqInstance);
                hideHtmlViewDiv();
            };

            _document.addEventListener("keydown", esckey, true);
};
