var lastPrivewedElem = undefined;
var latestPositionOfMouse = undefined;
var mouseOverDone = true;

var TooltipExtension = {};
var zdttASAPopenArticle;

function mouseLatestLocationFinder(e) {
    latestPositionOfMouse = e.target;
}

function stopMouseOverTemporary(e) {
    mouseOverDone = false;
}

function RestartMouseOver(e) {
    mouseOverDone = true;
}


function Chrome_Extension_RequireFunctionFlow(ConfigureObjects) {
    for (var i = 0; i < ConfigureObjects.length; i++) {
        for (var j = 0; j < ConfigureObjects[i].triggers.length; j++) {
            var Element = document.querySelector(ConfigureObjects[i].triggers[j].element);
            if (Element != null) {
                var SplitClass = Element.className;
                if (SplitClass.indexOf("configureElementsClass") == -1) {
                    Element.className += " configureElementsClass";
                    Element.setAttribute("zdtt_obj_id", ConfigureObjects[i].id);
                    Element.addEventListener('mouseover', stopMouseOverTemporary, true);
                    Element.addEventListener('mouseleave', RestartMouseOver, true);
                    if (ConfigureObjects[i].triggers[j].event == "HOVER") {
                        Element.addEventListener('mouseover', elementMouseOver, true);
                        Element.addEventListener('mouseleave', elementMouseOut, true);
                    } else if (ConfigureObjects[i].triggers[j].event == "CLICK") {
                        Element.addEventListener('click', elementMouseOverListener, true);
                    }
                }
            }
        }
    }
    document.addEventListener("mouseover", mouseLatestLocationFinder);
};

function elementMouseOverListener(e) {
    lastPrivewedElem = undefined;
    clearInterval(removeTimerVar);
    var currentObj = undefined;
    var obj = {};
    var id = e.currentTarget.getAttribute("zdtt_obj_id");
    if (id != undefined) {
        for (var i = 0; i < listOfTriggersObj.length; i++) {
            if (id == listOfTriggersObj[i].id) {
                currentObj = listOfTriggersObj[i];
                obj["object"] = listOfTriggersObj[i];
                obj["ind"] = i;
                break
            }
        }
        if (currentObj.dontEdit == true) {
            obj = undefined;
        }
        if (currentObj != undefined) {
            if (typeof(currentObj.preferences) != "object") {
                currentObj.preferences = JSON.parse(currentObj.preferences);
            }
            var Chrome_Extension_TooltipSize = currentObj.preferences.viewSize == "LARGE" ? "zohodesk-Tooltip-popup-large" : currentObj.preferences.viewSize == "MEDIUM" ? "zohodesk-Tooltip-popup-medium" : "zohodesk-Tooltip-popup-small";
            Chrome_Extension_tooltipPopup(currentObj.components[0].content, e.currentTarget, Chrome_Extension_TooltipSize, currentObj.preferences, currentObj.components["0"].solutionId, obj);
            var smallMutaionOfPU = setInterval(function() {
                var elem = document.getElementById("Chrome_Extension_showContentContainerId");
                if (elem != undefined) {
                    clearInterval(smallMutaionOfPU);
                    elem.tabIndex = -1;
                    elem.focus();
                    elem.onblur = zdtt_popupBlurFunc;
                }
            }, 500);
        }
    }
};

function zdtt_popupBlurFunc(e) {
    document.getElementById("Chrome_Extension_showContentContainerId").removeEventListener("blur", zdtt_popupBlurFunc);
    removeZDTTPU();
};


function TTPUChecker(id, elem) {
    if (elem == null || elem == undefined) {
        return false
    }
    if (elem.localName == "body" || elem.localName == "html") {
        return false
    };

    if (elem.id != undefined) {
        if (elem.id == id) {
            return true
        } else {
            return TTPUChecker(id, elem.parentElement)
        }
    } else {
        return TTPUChecker(id, elem.parentElement)
    }
}

function parentElemChecker(old, newElem) {
    if (newElem == null || newElem == undefined) {
        return false
    }
    if (newElem.localName == "body" || newElem.localName == "html") {
        return false
    };
    if (old == newElem) {
        return true
    } else {
        return parentElemChecker(old, newElem.parentElement)
    }
}

function elementMouseOver(e) {
    clearInterval(removeTimerVar);
    var popup = document.getElementById("Chrome_Extension_showContentContainerId");
    if (popup != null) {
        popup.blur();
    }
    e.preventDefault();
    e.stopPropagation();
    var res = false;
    var obj = {};
    if (lastPrivewedElem != undefined) {
        res = parentElemChecker(lastPrivewedElem, e.target);
    }
    if (res != true) {
        var currentObj = undefined;
        var id = e.currentTarget.getAttribute("zdtt_obj_id");
        if (id != undefined) {
            for (var i = 0; i < listOfTriggersObj.length; i++) {
                if (id == listOfTriggersObj[i].id) {
                    currentObj = listOfTriggersObj[i];
                    obj["object"] = listOfTriggersObj[i];
                    obj["ind"] = i;
                    break
                }
            }
            if (currentObj.dontEdit == true) {
                obj = undefined;
            }
            if (currentObj != undefined) {
                if (typeof(currentObj.preferences) != "object") {
                    currentObj.preferences = JSON.parse(currentObj.preferences);
                }
                lastPrivewedElem = e.currentTarget;
                elementMouseMoveDeBounce(currentObj, e.currentTarget, obj);
            }
        }
    }
};


var removeTimerVar;

function elementMouseOut(e) {
    var res = parentElemChecker(lastPrivewedElem, e.relatedTarget);
    if (res != true) {
        lastPrivewedElem = undefined;
        clearInterval(zd_tt_interval);
        removeTimerVar = setTimeout(zd_tt_clearTTPU, 700);
    }
}


function removeZDTTPU() {
    var ttpu = document.querySelectorAll(".zohodesk-Tooltip-showContentClass");
    var len = ttpu.length;
    if (ttpu.length != 0) {
        for (var i = 0; i < len; i++) {
            ttpu[i].removeEventListener("blur", zdtt_popupBlurFunc);
            ttpu[i].parentElement.removeChild(ttpu[i]);
        }
    }
}

function zd_tt_clearTTPU() {
    var zdttdesition = TTPUChecker("Chrome_Extension_showContentId", latestPositionOfMouse);
    if (zdttdesition != true) {
        removeZDTTPU();
    } else {
        document.getElementById("Chrome_Extension_showContentId").addEventListener("mouseleave", function() {
            setTimeout(zd_tt_clearTTPU, 200)
        })
    }
}

var zd_tt_interval;

function hex2rgba_convert(hex) {
    hex = hex.replace('#', '');
    r = parseInt(hex.substring(0, hex.length / 3), 16);
    g = parseInt(hex.substring(hex.length / 3, 2 * hex.length / 3), 16);
    b = parseInt(hex.substring(2 * hex.length / 3, 3 * hex.length / 3), 16);
    if (r >= 215 && g >= 215 && b >= 215) {
        return true
    }
    return false;
}
var iconMoreOptColor = "#ffffff";

function elementMouseMoveDeBounce(obj, e, editPUobj) {
    clearInterval(zd_tt_interval);
    var Chrome_Extension_TooltipSize = obj.preferences.viewSize == "LARGE" ? "zohodesk-Tooltip-popup-large" : obj.preferences.viewSize == "MEDIUM" ? "zohodesk-Tooltip-popup-medium" : "zohodesk-Tooltip-popup-small";
    zd_tt_interval = setTimeout(function() {
        Chrome_Extension_tooltipPopup(obj.components[0].content, e, Chrome_Extension_TooltipSize, obj.preferences, obj.components["0"].solutionId, editPUobj)
    }, 400);
}


function Chrome_Extension_popupdesign(editPUobj) {
    if (document.querySelectorAll("#Chrome_Extension_showContentContainerId").length == 0) {
        var Chrome_Extension_ttdesign = document.createElement("div");
        Chrome_Extension_ttdesign.setAttribute("id", "Chrome_Extension_showContentId");
        Chrome_Extension_ttdesign.setAttribute("class", "zohodesk-Tooltip-showContentClass zohodesk-Tooltip-tooltip-hide");
        document.body.appendChild(Chrome_Extension_ttdesign);
        document.getElementById("Chrome_Extension_showContentId").innerHTML = `<div class='zohodesk-Tooltip-popup-header' id="zdtt_popupIconParent"><span class='zohodesk-Tooltip-close'>
        <svg class="zohodesk-tooltip-svg-icon icon zohodesk-tooltip-cl-white" id="zohodesk_Tooltip_close_tooltip"  style='color:` + iconMoreOptColor + `'>
                <use xmlns:xlink="http://www.w3.org/2000/svg" xlink:href="#Tooltip-close"></use>
              </svg></span></div><span class='zohodesk-Tooltip-tooltiparrow'></span><div class='zohodesk-Tooltip-tooltipcontText' id='Chrome_Extension_showContentContainerId'><p class='zohodesk-Tooltip-para' id='Chrome_Extension_showContentContainerSpanId'></p><div id="Chrome_Extension_ToolTip_View_More"></div></div>`;
    } else {
        document.getElementById("zohodesk_Tooltip_close_tooltip").style.color = iconMoreOptColor;
        var editIcon = document.getElementById("zdtt_popupIconParent").querySelector(".zohodesk-ttpuEdit");
        if (editIcon != undefined) {
            editIcon.parentElement.removeChild(editIcon);
        }
    }
    if (zd_TT_sidePanelViewed == true) {
        if (editPUobj != undefined) {
            var editIcon = document.createElement("span");
            editIcon.className = "zohodesk-Tooltip-close zohodesk-ttpuEdit";
            editIcon.innerHTML = "<svg class='zohodesk-tooltip-svg-icon zdatt-icon-class zohodesk-tooltip-cl-white' style='color:" + iconMoreOptColor + "'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#edit'></use></svg>";
            editIcon.onmousedown = function(e) {
                e.preventDefault();
                e.stopPropagation()
            };
            editIcon.onmouseup = function(e) {
                e.preventDefault();
                e.stopPropagation()
            };
            editIcon.onclick = withoutSidepanelEditOpt(editPUobj.object);
            document.getElementById("zdtt_popupIconParent").prepend(editIcon);
        }
    }
}

function Chrome_Extension_tooltipPopup(Chrome_Extension_tooltipContent, Chrome_Extension_node, Chrome_Extension_size, preferences, Chrome_Extension_ArticleId, editPUobj) {
    iconMoreOptColor = "#ffffff";
    if (hex2rgba_convert(preferences.bgColor)) {
        iconMoreOptColor = "rgba(0, 0, 0, 0.30)";
    }
    Chrome_Extension_popupdesign(editPUobj);
    document.getElementById("Chrome_Extension_showContentContainerSpanId").innerHTML = Chrome_Extension_tooltipContent;
    document.getElementById("Chrome_Extension_ToolTip_View_More").innerHTML = `<div class="zohodesk-Tooltip-popup-button zohodesk-Tooltip-popup-button-small" id="Chrome_Extension_showContentContainerHrefId" style='color:` + iconMoreOptColor + `'><span></span>View more</div>`;
    if (Chrome_Extension_ArticleId != "") {
        document.getElementById("Chrome_Extension_showContentContainerHrefId").setAttribute("data-zohohc-asap-article", Chrome_Extension_ArticleId);
        document.getElementById("Chrome_Extension_showContentContainerHrefId").setAttribute("onclick", "zdattViewMoreCB('" + Chrome_Extension_ArticleId + "')");
        if (preferences.selector != undefined && preferences.selector != "undefined") {
            document.getElementById("Chrome_Extension_showContentContainerHrefId").setAttribute("data-zohohc-asap-article-hash", preferences.selector);
        }
    }
    document.getElementById("Chrome_Extension_showContentContainerId").className += " " + Chrome_Extension_size;
    document.getElementById("Chrome_Extension_showContentContainerId").style.backgroundColor = preferences.bgColor;
    document.getElementsByClassName("zohodesk-Tooltip-tooltiparrow")[0].style.backgroundColor = preferences.bgColor;
    document.getElementById("zohodesk_Tooltip_close_tooltip").onclick = function(e) {
        removeZDTTPU();
        clearInterval(removeTimerVar);
        if (CloseIconMouseOverAction == true) {
            EditorListener = true;
        }
    }
    Chrome_Extension_ele = document.getElementsByClassName("zohodesk-Tooltip-showContentClass")[0];
    Chrome_Extension_leng = Chrome_Extension_ele.classList;
    if (Chrome_Extension_leng == 0) {
        Chrome_Extension_ele.className += "zohodesk-Tooltip-tooltip-hide"
    } else {
        Chrome_Extension_inde = Chrome_Extension_ele.className.indexOf("zohodesk-Tooltip-tooltip-hide");
        if (Chrome_Extension_inde == -1) {
            Chrome_Extension_ele.className += " zohodesk-Tooltip-tooltip-hide"
        }
    }

    if (Chrome_Extension_tooltipContent != undefined) {
        positionBinder(Chrome_Extension_node, {});
    } else {
        Chrome_Extension_ele = document.getElementsByClassName("zohodesk-Tooltip-showContentClass")[0];
        Chrome_Extension_leng = Chrome_Extension_ele.classList;
        if (Chrome_Extension_leng == 0) {
            Chrome_Extension_ele.className += "zohodesk-Tooltip-tooltip-hide"
        } else {
            Chrome_Extension_inde = Chrome_Extension_ele.className.indexOf("zohodesk-Tooltip-tooltip-hide");
            if (Chrome_Extension_inde == -1) {
                Chrome_Extension_ele.className += " zohodesk-Tooltip-tooltip-hide"
            }
        }
    }
}




function overAllElementEventsRemover(obj) {
    if (obj != undefined && obj.length != 0) {
        for (var k = 0; k < obj.length; k++) {
            zdttElementEventRemover(obj[k]);
        }
    }
}

function zdttElementEventRemover(obj) {
    for (var j = 0; j < obj.triggers.length; j++) {
        singleElementEventRemover(obj.triggers[j].element, obj.triggers[j].event);
    }
}

function singleElementEventRemover(elementSelector, event) {
    var element = document.querySelector(elementSelector);
    if (element != undefined) {
        element.removeEventListener('mouseover', stopMouseOverTemporary, true);
        element.removeEventListener('mouseleave', RestartMouseOver, true);
        if (event == "HOVER") {
            element.removeEventListener('mouseover', elementMouseOver, true);
            element.removeEventListener('mouseleave', elementMouseOut, true);
        } else if (event == "CLICK") {
            element.removeEventListener('click', elementMouseOverListener, true);
        } else if (event == undefined) {
            element.removeEventListener('mouseover', elementMouseOver, true);
            element.removeEventListener('mouseleave', elementMouseOut, true);
            element.removeEventListener('click', elementMouseOverListener, true);
        }
        element.className = element.className.split(" configureElementsClass").join("");
        mouseOverDone = true;
        removeZDTTPU();
    }
}