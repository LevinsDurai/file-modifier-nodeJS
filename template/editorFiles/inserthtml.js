/* $Id$ */
/* globals ZE,NewDOMPurify*/
ZohoDeskEditor.prototype.showInsertHTMLDialog = function(ev) {
    "use strict"; // No I18N
    var editor = this,
        _document = document,
        wrapperDOM = editor.doc.getElementById('ze_ins_insertHtml'), // NO I18N
        I18N = ZohoDeskEditor.i18n,
        closeButton,
        buttons,
        textArea,
        _okButton,
        _cancelButton,
        escKeyHandler;

    var getDOM = function() {
        return [
            '<div class="zep_PUtt">' + I18N('Insert HTML') + '<i class="zdei-close"><svg><use xlink:href="#KBEditortools_close"></use></svg></i></div>', // NO I18N
            '<div class="zep_PUcen">', // NO I18N
            '<table class="zde_ptble">', // NO I18N
            '<tbody>', // NO I18N
            '<tr>', // NO I18N
            '<td>', // NO I18N
            '<textarea style="width:500px;height:250px;resize:none;">', // NO I18N
            '</textarea>', // NO I18N
            '</td>', // NO I18N
            '</tr>', // NO I18N
            '</tbody>', // NO I18N
            '</table>', // NO I18N
            '</div>', // NO I18N
            '<div class="zep_PUbtm">', // NO I18N
            '<span class="sel">' + I18N('OK') + '</span>', // NO I18N
            '<span data-val="Cancel">' + I18N('Cancel') + '</span>', // NO I18N
            '</div>' // NO I18N
        ].join('');
    };

    var hideDialog = function() {
        _document.removeEventListener('keydown', escKeyHandler, true); // NO I18N
        wrapperDOM.parentNode.removeChild(wrapperDOM);
        ZohoDeskEditor.hideOverlay();
    };

    escKeyHandler = function(event) {
        if (event.keyCode === 27) {
            editor._stopEvent(event);
            hideDialog();
        }
    };

    var onOk = function() {
        var value = textArea.value;
        var hookMethod;
        hideDialog();
        editor.insertHTML(value);
    };

    if (wrapperDOM) {
        return;
    }

    ZohoDeskEditor.showOverlay();
    wrapperDOM = _document.createElement('div'); // NO I18N
    wrapperDOM.id = 'ze_ins_insertHtml'; // NO I18N
    wrapperDOM.className = 'zep_PU zep_arrb'; // NO I18N
    wrapperDOM.innerHTML = getDOM();
    _document.body.appendChild(wrapperDOM);
    ZohoDeskEditor.setPosition(wrapperDOM, editor.outerdiv);
    textArea = wrapperDOM.getElementsByTagName('textarea')[0]; // NO I18N
    closeButton = wrapperDOM.getElementsByClassName('zdei-close')[0]; // NO I18N
    buttons = wrapperDOM.getElementsByTagName('span'); // NO I18N
    _okButton = buttons[0];
    _cancelButton = buttons[1];
    textArea.focus();
    _cancelButton.onclick = closeButton.onclick = function(event) {
        editor._stopEvent(event);
        hideDialog();
    };

    _okButton.onclick = function(event) {
        editor._stopEvent(event);
        onOk();
    };

    ZohoDeskEditor._addEvent(_document, 'keydown', escKeyHandler); // NO I18N
};
