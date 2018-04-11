/* $Id$ */
ZohoDeskEditor.prototype.insertOptions = function(ev) {
    var editor = this,
        _document = document,
        _anchorelement = ev.currentTarget, //holds the anchor element;
        ze_insert_options = _document.getElementById("ze_insert_options"), //for first time it is undefined
        _doc = editor.doc,
        hideInsertOptions,
        ul_click,
        _mousedown,
        _className,
        I18N,
        fragment,
        _ul,
        initobj_insertoptions = editor.initobj.insertoptions,
        _options_array,
        i,
        len,
        temp,
        displaytext,
        _li,
        _a,
        _span,
        _img,
        offsets,
        _style,
        tempOffLeft,
        tempLeft;

    hideInsertOptions = function(ev) {
        if (ev && ev.type !== "keydown") {
            editor._stopEvent(ev);
        }
        ze_insert_options.style.display = "none";
        ze_insert_options.removeEventListener("click", ul_click, true);
        _document.removeEventListener("mousedown", _mousedown, true);
        _doc.removeEventListener("mousedown", hideInsertOptions, true);
        _doc.removeEventListener("keydown", hideInsertOptions, true);
        _anchorelement.removeAttribute("class");
    };

    ul_click = function(ev) {
        editor._stopEvent(ev);
        var _target = ev.target; //holds the li element
        if (_target.nodeName === "IMG") {
            _target = _target.parentNode;
        }
        if (_target.nodeName === "SPAN") {
            _target = _target.parentNode;
        }
        if (_target.nodeName === "A") {
            editor.execCommand(ev, _target.getAttribute("data-command"));
            hideInsertOptions();
        }
    };

    _mousedown = function(ev) {
        editor._stopEvent(ev);
        var _target = ev.target;
        if (_target === _anchorelement || _target === _anchorelement.lastChild) {
            return false;
        }
        for (_target; _target !== null && _target !== ze_insert_options;) {
            _target = _target.parentNode;
        };
        if (_target === null) {
            hideInsertOptions();
        }
    };

    _className = _anchorelement.className;
    if (_className && _className === "ze_selected") {
        hideInsertOptions();
        return false;
    } else {
        _anchorelement.className = "ze_selected";
    }

    if (ze_insert_options) {
        ze_insert_options.style.display = "";
        if (ZohoDeskEditor_Init.needEditorStats) {
            editor.updateCount("ino"); //No I18N
        }
    } else {
        I18N = ZohoDeskEditor.i18n;
        fragment = _document.createDocumentFragment();
        _ul = _document.createElement("ul");
        _ul.className = "ze_ddio";
        _ul.id = "ze_insert_options";
        ze_insert_options = _ul;
        fragment.appendChild(_ul);

        if (initobj_insertoptions) {
            _options_array = ZohoDeskEditor_Init.insertOptionsGenerate(initobj_insertoptions);
        } else {
            _options_array = ZohoDeskEditor_Init.insertOptions;
        }

        for (i = 0, len = _options_array.length; i < len; i++) {
            temp = _options_array[i];
            displaytext = temp[1];

            _li = _document.createElement("li");
            _a = _document.createElement("a");
            _a.href = _a.title = I18N(displaytext);
            _a.setAttribute("data-command", temp[0]);

            _span = _document.createElement("span");

            _img = _document.createElement("img");
            _img.src = ZohoDeskEditor_Init.imgurl+"spacer.gif";
            _img.className = "ze_tabmenuicon " + temp[2] + "1";
            _span.appendChild(_img);

            _a.appendChild(_span);
            _a.appendChild(_document.createTextNode(I18N(displaytext)));

            _li.appendChild(_a);
            _ul.appendChild(_li);
        }
        document.body.appendChild(fragment);
        if (ZohoDeskEditor_Init.needEditorStats) {
            editor.updateCount("ino"); //No I18N
        }
    }

    /* registering Events*/
    ze_insert_options.addEventListener("click", ul_click, true);
    _document.addEventListener("mousedown", _mousedown, true);
    _doc.addEventListener("mousedown", hideInsertOptions, true);
    _doc.addEventListener("keydown", hideInsertOptions, true);

    /* positioning the divs*/
    offsets = ZohoDeskEditor.getPos(_anchorelement);
    _style = ze_insert_options.style;
    tempOffLeft = offsets.offsetLeft;
    tempLeft = tempOffLeft - ze_insert_options.offsetWidth + _anchorelement.offsetWidth;

    if (tempLeft < 0) {
        _style.left = tempOffLeft + "px";
    } else {
        _style.left = tempLeft + "px";
    }
    _style.top = offsets.offsetTop + _anchorelement.offsetHeight + "px";
};