var ZDTT_firstTimeFocused = true;
var ZDTT_fromError = undefined;

function errorPopupCallbackFunction(e) {
    if (e.target.id == "zd_tt_permissionErrors") {
        chrome.runtime.sendMessage({
            "zdttMsg": "zd_ATTitsEnabledStatus",
            "data": zd_ATTitsEnabled
        });
        zd_ATTitsEnabled = zd_ATTitsEnabled ? false : true;
        document.removeEventListener("mousedown", errorPopupCallbackFunction, true);
    }
}

function closeEPwithcloseExtension(e) { // We are using 'closeEPwithcloseExtension' instead of the 'errorPopupCallbackFunction'.
    chrome.runtime.sendMessage({
        "zdttMsg": "zd_ATTitsEnabledStatus",
        "data": zd_ATTitsEnabled
    }, runtimeMsgCallBack);
    zd_ATTitsEnabled = zd_ATTitsEnabled ? false : true;
    ZDTT_fromError = true;
}

var ZDesk_tooltipError = function() {
    this.disable = false;
    this.lastInd = 0;
};

function createToolTipErrorPopupBox(obj) {
    var parent;
    var position;
    if (obj.id == undefined) {
        parent = document.getElementsByTagName('html')[0];
        position = "change";
    } else {
        if (obj.id == "editorBody") {
            parent = zdttContainers.zdtt_sidePanelDirectChild;
        } else {
            parent = document.getElementById(obj.id);
        }
        position = "default";
    }
    var svgPathContainerOfErrorPopup = domElement.create({
        elemName: "div",
        attributes: {
            class: "svgIconContainerOfErrorPopup"
        },
        elementData: {
            innerHTML: `<svg xmlns="http://www.w3.org/2000/svg"><symbol id="problem-exc" viewBox="0 0 32 32"><path d="M2.535 30.465h26.943c1.884 0 3.097-1.987 2.245-3.665l-13.471-23.872c-0.929-1.858-3.587-1.858-4.516 0l-13.471 23.872c-0.826 1.677 0.387 3.665 2.271 3.665zM18.122 24.916c0 1.239-0.903 2.194-2.194 2.194s-2.194-0.955-2.194-2.194v-0.052c0-1.239 0.903-2.194 2.194-2.194s2.194 0.955 2.194 2.194v0.052zM14.741 8.787h2.529c0.697 0 1.11 0.594 1.032 1.342l-1.11 9.704c-0.077 0.697-0.542 1.136-1.187 1.136s-1.11-0.439-1.187-1.136l-1.11-9.704c-0.077-0.748 0.336-1.342 1.033-1.342z"></path></symbol></svg>`
        }
    })

    var zdtt_errorIcon = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-error-icon"
        },
        elementData: {
            innerHTML: `<svg class="zohodesk-Tooltip-Alert-Error-icon"><use xmlns:xlink="http://www.w3.org/2000/svg" xlink:href="#problem-exc"></use></svg>`
        }
    })
    if (obj.content == undefined) {
        obj.content = "sorry for the disturbance . Some technical work is ongoing . Try again some time later...";
    }
    var zdtt_errorText = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-error-text"
        },
        elementData: {
            innerHTML: obj.content
        }
    })

    var zdtt_errorHeader = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-error-header"
        },
        elementData: {
            child: [zdtt_errorIcon, zdtt_errorText]
        }
    })
    var zdtt_buttons = [];
    for (i = 0; i < obj.buttons.length; i++) {
        var btnCls = undefined;
        if (i == 0) {
            btnCls = "zohodesk-Tooltip-error-button zD-tooltip-lftBtn";
        } else {
            btnCls = "zohodesk-Tooltip-error-button zD-tooltip-rtBtn";
        }
        var btn = domElement.create({
            elemName: "div",
            attributes: {
                class: btnCls,
                id: obj.buttons[i].id
            },
            callbackList: obj.buttons[i].callbackList,
            elementData: {
                innerHTML: obj.buttons[i].content
            }
        })
        zdtt_buttons.push(btn);
    }

    var zdtt_errorFooter = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-error-footer"
        },
        elementData: {
            child: [...zdtt_buttons]
        }
    })


    var zdtt_errorPopup = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-error-message"
        },
        elementData: {
            child: [zdtt_errorHeader, zdtt_errorFooter]
        }
    })
    var zdtt_errorBackgroundLayer = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-layer"
        }
    });
    var zdtt_errorBackgroundLayerHost = domElement.create({
        elemName: "div",
        attributes: {
            id: "zdtt_errorBLPHost"
        },
        parent: parent
    });
    shadowRootCreater(zdtt_errorBackgroundLayerHost, zdtt_Temp.errorBackgroundLayer, [zdtt_errorBackgroundLayer]);

    var zdtt_errorPopupHost = domElement.create({
        elemName: "div",
        attributes: {
            id: "zdtt_errorPopupHost"
        },
        parent: parent
    })
    shadowRootCreater(zdtt_errorPopupHost, zdtt_Temp.errorPopup, [svgPathContainerOfErrorPopup, zdtt_errorPopup])
    ZD_ttErrorPopup.BindEven(zdtt_buttons, zdtt_errorBackgroundLayerHost, zdtt_errorPopupHost);
    zdtt_errorBackgroundLayer.style.zIndex = zdtt_pageMaxZIndexValue + 15;
    zdtt_errorPopup.style.zIndex = zdtt_pageMaxZIndexValue + 20; // We are using 'zdtt_errorPopup' instead of the 'divContainer'.
    if (position == "change") {
        zdtt_errorPopup.style.position = "fixed";
        zdtt_errorBackgroundLayer.style.position = "fixed"; // We are using 'zdtt_errorBackgroundLayer' instead of the 'transprentDiv'.
        zdtt_errorPopup.style.left = ((document.body.offsetWidth - 10) - zdtt_errorPopup.offsetWidth) + "px";
        zdtt_errorPopup.style.top = "10px"
    }
    if (position == "default") {
        zdtt_errorPopup.style.left = "calc(50% - 185px)";
        zdtt_errorPopup.style.top = "calc(50% - 100px)";
    }
}




ZDesk_tooltipError.prototype.tabKeyPressed = function() {
    if (this.btns != undefined && this.btns.length) {
        if (this.lastFocused != undefined) {
            this.lastFocused.className = this.lastFocused.className.split(" ZDTooltipbtnFocused").join("");
        }
        if (ZDTT_firstTimeFocused) {
            this.btns[0].className += " ZDTooltipbtnFocused";
            this.lastFocused = this.btns[0];
            this.lastInd = 1;
            ZDTT_firstTimeFocused = false;
            return
        }
        if (this.lastInd < this.btns.length) {
            this.btns[this.lastInd].className += " ZDTooltipbtnFocused";
            this.lastFocused = this.btns[this.lastInd];
            this.lastInd = this.lastInd + 1;
        } else {
            this.lastInd = this.lastInd - this.btns.length;
            this.btns[this.lastInd].className += " ZDTooltipbtnFocused";
            this.lastFocused = this.btns[this.lastInd];
            this.lastInd = this.lastInd + 1;
        }
    }
};
ZDesk_tooltipError.prototype.enterKeyPressed = function() {
    this.clearBindedEvent();
    if (this.disable) {
        errorPopupCallbackFunction({
            target: {
                id: "zd_tt_permissionErrors"
            }
        });
        this.deleteTooltipErrorPopupBox();
    } else {
        this.deleteTooltipErrorPopupBox();
    }
};
ZDesk_tooltipError.prototype.events = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.keyCode == 13) {
        this.enterKeyPressed(e);
    }
    if (e.keyCode == 27) {
        this.enterKeyPressed(e);
    }
    if (e.keyCode == 9) {
        this.tabKeyPressed(e);
    }
};
ZDesk_tooltipError.prototype.clearBindedEvent = function() {
    document.removeEventListener('keydown', this.addEvents, true);
};
ZDesk_tooltipError.prototype.BindEven = function(btns, errorBackgroundLayerHost, errorPopupHost) {
    this.errorBackgroundLayerHost = errorBackgroundLayerHost;
    this.errorPopupHost = errorPopupHost;
    this.btns = btns;
    this.addEvents = this.events.bind(this);
    document.addEventListener('keydown', this.addEvents, true);
    if (btns != undefined) {

        for (btn of btns) {
            if (btn.id == "zd_tt_permissionErrors") {
                this.disable = true;
            }
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.clearBindedEvent();
                this.deleteTooltipErrorPopupBox();
            }.bind(this))
        }
    }
};
ZDesk_tooltipError.prototype.deleteTooltipErrorPopupBox = function() {
    var transprentDiv = this.errorBackgroundLayerHost;
    var errorPopup = this.errorPopupHost;
    if (transprentDiv) {
        transprentDiv.parentElement.removeChild(transprentDiv);
    }
    if (errorPopup) {
        errorPopup.parentElement.removeChild(errorPopup);
    }
    ZDTT_firstTimeFocused = true;
    this.errorPopupHost = undefined;
    this.errorBackgroundLayerHost = undefined;
};

var ZD_ttErrorPopup = new ZDesk_tooltipError();