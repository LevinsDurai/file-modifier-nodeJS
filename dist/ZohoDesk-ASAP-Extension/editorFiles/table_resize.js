/* $Id$*/
/* For Resizing the Table */
/* global ZE */
/* global ZE */
ZohoDeskEditor.prototype.resizeTable = function(_target) {
    "use strict"; // No I18N
    var editor = this,
        _doc = editor.doc,
        _document = document,
        _anchorTarget = _target,
        mouseDown,
        stopDrag,
        keyDown,
        doDrag,
        values,
        posx,
        posy,
        removeEvents,
        removeListeners,
        addEvents,
        resizeDiv, // name for creating the resize div (ie the small div in the left corner of the table)
        resize, // to find the div with the id resizeDiv
        _enclosingDiv, // name for generating the enclosing div (ie . div around the table)
        _encloseDiv; // To find the div with the id enclosingDiv
    _encloseDiv = _doc.getElementById("_enclosingDiv");
    resize = _doc.getElementById("resizeDiv");
    _enclosingDiv = _document.createElement("div");
    _enclosingDiv.id = "_enclosingDiv";
    var setValues = function() {
        values = _anchorTarget.getBoundingClientRect();
        posx = values.left;
        posy = values.top;
        if (editor.win.scrollX) {
            _enclosingDiv.style.left = (posx + editor.win.scrollX) + "px";
        } else {
            _enclosingDiv.style.left = (posx + editor.win.pageXOffset) + "px";
        }
        if (editor.win.scrollY) {
            _enclosingDiv.style.top = (values.top + editor.win.scrollY) + "px";
        } else {
            _enclosingDiv.style.top = (values.top + editor.win.pageYOffset) + "px";
        }
        if (editor.win.scrollY) {
            posy += editor.win.scrollY;
        } else {
            posy += editor.win.pageYOffset;
        }

        if (editor.win.scrollX) {
            posx += editor.win.scrollX;
        } else {
            posx += editor.win.pageXOffset;
        }
    };
    addEvents = function() {
        ZohoDeskEditor._addEvent(_document, "mousedown", mouseDown);
        ZohoDeskEditor._addEvent(_doc, "mousedown", mouseDown);
        ZohoDeskEditor._addEvent(_doc, "keydown", keyDown);
    };
    removeEvents = function() {
        ZohoDeskEditor._removeEvent(_doc, "mousedown", mouseDown);
        ZohoDeskEditor._removeEvent(_document, "mousedown", mouseDown);
        ZohoDeskEditor._removeEvent(_doc, "keydown", keyDown);
    };
    removeListeners = function() {
        ZohoDeskEditor._removeEvent(_doc, "mousemove", doDrag);
        ZohoDeskEditor._removeEvent(_doc, "mouseup", stopDrag);
        ZohoDeskEditor._removeEvent(_document, "mouseup", stopDrag);

    };
    keyDown = function() {
        var value = _anchorTarget.getBoundingClientRect();
        if(resizeDiv){
            resizeDiv.style.top = (value.height + posy) - 4 + "px";
            resizeDiv.style.left = (value.width + value.left) - 4 + "px";
        }
    };
    var initDrag = function(ev) {
        _encloseDiv = _doc.getElementById("_enclosingDiv");
        var height = ev.clientY;
        var width = ev.clientX;
        var values1 = _anchorTarget.getBoundingClientRect();
        var startHeight = values1.height;
        var startWidth = values1.width;
        stopDrag = function() {
            removeListeners();
            resize = _doc.getElementById("resizeDiv");
            if (resize !== null && _encloseDiv !== null) {
                _anchorTarget.style.width = _encloseDiv.offsetWidth - 4 + "px";
                _anchorTarget.style.height = _encloseDiv.offsetHeight - 4 + "px";
                // resize.parentElement.removeChild(resize);
                var value = _anchorTarget.getBoundingClientRect();
                resizeDiv.style.top = (value.height + posy) - 4 + "px";
                resizeDiv.style.left = (value.width + value.left) - 4 + "px";
                _encloseDiv.parentElement.removeChild(_encloseDiv);
                // _doc.body.appendChild(resizeDiv);
                // resizeDiv.addEventListener("mousedown", initDrag, false);
                addEvents();
            }
        };
        doDrag = function(event) {
            _encloseDiv.style.width = (startWidth + event.clientX - width) + "px";
            if (parseInt(_encloseDiv.style.width) <= 25) {
                _encloseDiv.style.width = "25px";
            }
            _encloseDiv.style.height = (startHeight + event.clientY - height) + "px";
            if (parseInt(_encloseDiv.style.height) <= 25) {
                _encloseDiv.style.height = "25px";
            }
            var value = _encloseDiv.getBoundingClientRect();
            setValues();
            resizeDiv.style.top = (value.height + posy) - 4 + "px";
            resizeDiv.style.left = (posx + value.width) - 4 + "px";


        };
        removeEvents();
        ZohoDeskEditor._addEvent(_doc, "mousemove", doDrag);
        ZohoDeskEditor._addEvent(_doc, "mouseup", stopDrag);
        ZohoDeskEditor._addEvent(_document, "mouseup", stopDrag);
    };
    mouseDown = function(ev) {
        resizeDiv = _doc.getElementById("resizeDiv");
        if (ev.target.id === "resizeDiv") {
            removeEvents();
            removeListeners();
            setValues();
            _enclosingDiv.style.height = (values.height) + "px";
            _enclosingDiv.style.width = (values.width) + "px";
            _doc.body.appendChild(_enclosingDiv);
            editor._stopEvent(ev);
            initDrag(ev);
        } else if (resizeDiv) {
            resizeDiv.parentElement.removeChild(resizeDiv);
            removeListeners();
            removeEvents();
        }
        if(ev.target.ownerDocument !== document){
            editor._getSelection().getRangeAt(0).collapse();
            ev.target.focus();
        }
    };
    setValues();
    _enclosingDiv.style.position = "absolute";
    _enclosingDiv.style.border = "2px dashed #555";
    resizeDiv = _document.createElement("div");
    resizeDiv.id = "resizeDiv";
    _doc.body.appendChild(resizeDiv);
    resizeDiv.style.top = (values.height + posy) - 4 + "px";
    resizeDiv.style.left = (posx + values.width) - 4 + "px";
    resizeDiv.style.height = "16px";
    resizeDiv.style.width = "16px";
    // resizeDiv.style.border = "2px solid #696969";
    // resizeDiv.style.backgroundColor = "#696969";
    resizeDiv.style.position = "absolute";
    resizeDiv.style.backgroundRepeat = "no-repeat";
    resizeDiv.style.cursor = "se-resize";
    resizeDiv.contentEditable = false;
    //  resizeDiv.style.backgroundPosition = "center";
    addEvents();
};
