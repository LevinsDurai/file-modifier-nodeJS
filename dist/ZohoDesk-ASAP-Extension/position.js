var toolTip;
var bodyDimensions = document.body.getBoundingClientRect();
var lastClicked = null;
var tooltipPositions = {};


function positionBinder(elem, obj) {
    bodyDimensions = document.body.getBoundingClientRect();
    toolTip = document.getElementById("Chrome_Extension_showContentContainerId");
    elemDimensions = elem.getBoundingClientRect();
    ttDimensions = {
        height: toolTip.offsetHeight,
        width: toolTip.offsetWidth
    };
    tooltipPositions = {
        top: topPopUp(elemDimensions, ttDimensions),
        bottom: bottomPopUp(elemDimensions, ttDimensions),
        left: leftPopUp(elemDimensions, ttDimensions),
        right: rightPopUp(elemDimensions, ttDimensions)
    };
    if (obj.position != undefined) {
        if (obj.position === "top") {
            if (tooltipPositions.top.position != "topFailed") {
                return applyposition(tooltipPositions.top);
            } else {
                return defaultView()
            }
        } else if (obj.position === "bottom") {
            if (tooltipPositions.bottom.position != "bottomFailed") {
                return applyposition(tooltipPositions.bottom);
            } else {
                return defaultView()
            }
        } else if (obj.position === "left") {
            if (tooltipPositions.left.position != "leftFailed") {
                return applyposition(tooltipPositions.left);
            } else {
                return defaultView()
            }
        } else if (obj.position === "right") {
            if (tooltipPositions.right.position != "rightFailed") {
                return applyposition(tooltipPositions.right);
            } else {
                return defaultView()
            }
        }
    } else {
        return defaultView()
    }
}

function applyposition(posObj) {
    var arrow = document.getElementsByClassName('zohodesk-Tooltip-tooltiparrow')[0];
    var pop = document.getElementById("Chrome_Extension_showContentId");
    document.getElementsByClassName("zohodesk-Tooltip-showContentClass")[0].className = document.getElementsByClassName("zohodesk-Tooltip-showContentClass")[0].className.split(" zohodesk-Tooltip-tooltip-hide")[0];
    arrow.style.top = posObj.arrowTop + "px";
    arrow.style.left = posObj.arrowLeft + "px";
    arrow.style.transform = posObj.deg;
    pop.style.top = posObj.ttipTop + "px";
    pop.style.left = posObj.ttipLeft + "px";
    pop.style.visibility = "visible";
}

function defaultView() {
    if (tooltipPositions.left.position === "leftOk") {
        return applyposition(tooltipPositions.left);
    } else if (tooltipPositions.right.position === "rightOk") {
        return applyposition(tooltipPositions.right);
    } else if (tooltipPositions.top.position === "topOk") {
        return applyposition(tooltipPositions.top);
    } else if (tooltipPositions.bottom.position === "bottomOk") {
        return applyposition(tooltipPositions.bottom);
    } else {
        if (tooltipPositions.left.position != "leftFailed") {
            return applyposition(tooltipPositions.left);
        } else if (tooltipPositions.right.position != "rightFailed") {
            return applyposition(tooltipPositions.right);
        } else if (tooltipPositions.top.position != "topFailed") {
            return applyposition(tooltipPositions.top);
        } else if (tooltipPositions.bottom.position != "bottomFailed") {
            return applyposition(tooltipPositions.bottom);
        }
    }
    return "positioning failed"
}


function topPopUp(elem, ttip) {
    if (elem.top > (ttip.height + 10)) {
        if ((elem.left + (elem.width / 2)) > (ttip.width / 2) && (((bodyDimensions.right - elem.right) + (elem.width / 2)) > (ttip.width / 2))) {
            return {
                position: "topOk",
                "ttipLeft": ((elem.left + (elem.width / 2)) - (ttip.width / 2)),
                "ttipTop": (elem.top - (10 + ttip.height)),
                "arrowLeft": (ttip.width / 2) - 10,
                "arrowTop": (ttip.height - 9),
                "deg": "rotate(225deg)"
            }
        } else if ((elem.left + (elem.width / 2)) < (ttip.width / 2) && (((bodyDimensions.right - elem.right) + (elem.width)) > (ttip.width))) {
            return {
                position: "topRightOk",
                "ttipLeft": 2,
                "ttipTop": (elem.top - (10 + ttip.height)),
                "arrowLeft": (elem.width / 2) - 10,
                "arrowTop": ttip.height - 9,
                "deg": "rotate(225deg)"
            }
        } else if ((elem.left + (elem.width / 2)) > (ttip.width / 2) && (((bodyDimensions.right - elem.right) + (elem.width)) < (ttip.width))) {
            return {
                position: "topLeftOk",
                "ttipLeft": ((window.innerWidth - ttip.width)),
                "ttipTop": (elem.top - (10 + ttip.height)),
                "arrowLeft": ((elem.left - (window.innerWidth - ttip.width)) + elem.width / 2) - 10,
                "arrowTop": ttip.height - 9,
                "deg": "rotate(225deg)"
            }
        }
    }
    return {
        position: "topFailed"
    }
}

function bottomPopUp(elem, ttip) {
    if (document.getElementsByTagName('body')[0].style.margin === "") {
        var winHeight = window.innerHeight - 16;
    } else {
        var winHeight = window.innerHeight - document.getElementsByTagName('body')[0].style.margin;
    }

    if ((winHeight - elem.bottom) > (ttip.height + 10)) {
        if ((elem.left + (elem.width / 2)) > (ttip.width / 2) && (((bodyDimensions.right - elem.right) + (elem.width / 2)) > (ttip.width / 2))) {
            return {
                position: "bottomOk",
                "ttipLeft": ((elem.left + (elem.width / 2)) - (ttip.width / 2)),
                "ttipTop": (elem.bottom + 10),
                "arrowLeft": (ttip.width / 2) - 10,
                "arrowTop": -8,
                "deg": "rotate(45deg)"
            }
        } else if ((elem.left + (elem.width / 2)) < (ttip.width / 2) && (((bodyDimensions.right - elem.right) + (elem.width)) > (ttip.width))) {
            return {
                position: "bottomRightOk",
                "ttipLeft": elem.left,
                "ttipTop": (elem.bottom + 10),
                "arrowLeft": (elem.width / 2) - 10,
                "arrowTop": -8,
                "deg": "rotate(45deg)"
            }
        } else if ((elem.left + (elem.width / 2)) > (ttip.width / 2) && (((bodyDimensions.right - elem.right) + (elem.width)) < (ttip.width))) {
            return {
                position: "bottomLeftOk",
                "ttipLeft": ((elem.right - ttip.width)),
                "ttipTop": (elem.bottom + 10),
                "arrowLeft": ((elem.left - ttip.left) + elem.width / 2) - 10,
                "arrowTop": -8,
                "deg": "rotate(45deg)"
            }
        }
    }
    return {
        position: "bottomFailed"
    }
}

function leftPopUp(elem, ttip) {
    if (document.getElementsByTagName('body')[0].style.margin === "") {
        var winHeight = window.innerHeight - 16;
    } else {
        var winHeight = window.innerHeight - document.getElementsByTagName('body')[0].style.margin;
    }

    if ((elem.left) > (ttip.width + 10)) {
        if ((elem.top + (elem.height / 2)) > (ttip.height / 2) && (((winHeight - elem.bottom) + (elem.height / 2)) > (ttip.height / 2))) {
            return {
                position: "leftOk",
                "ttipLeft": ((elem.left) - (10 + ttip.width)),
                "ttipTop": ((elem.top + elem.height / 2) - (ttip.height / 2)),
                "arrowLeft": (ttip.width - 8),
                "arrowTop": (ttip.height / 2) - 5,
                "deg": "rotate(135deg)"
            }
        } else if ((elem.top + (elem.height / 2)) < (ttip.height / 2) && (((winHeight - elem.bottom) + (elem.height / 2)) > (ttip.height / 2))) {
            return {
                position: "leftBottomOk",
                "ttipLeft": ((elem.left) - (10 + ttip.width)),
                "ttipTop": 0,
                "arrowLeft": (ttip.width - 8),
                "arrowTop": (elem.top + elem.height / 2) - 5,
                "deg": "rotate(135deg)"
            }
        } else if ((elem.top + (elem.height / 2)) > (ttip.height / 2) && (((winHeight - elem.bottom) + (elem.height / 2)) < (ttip.height / 2))) {
            return {
                position: "leftTopOk",
                "ttipLeft": ((elem.left) - (10 + ttip.width)),
                "ttipTop": (window.innerHeight - ttip.height),
                "arrowLeft": (ttip.width - 8),
                "arrowTop": (ttip.height - ((window.innerHeight - elem.bottom) + elem.height / 2)) - 5,
                "deg": "rotate(135deg)"
            }
        }
    }
    return {
        position: "leftFailed"
    }
}

function rightPopUp(elem, ttip) {
    if (document.getElementsByTagName('body')[0].style.margin === "") {
        var winHeight = window.innerHeight - 16;
    } else {
        var winHeight = window.innerHeight - document.getElementsByTagName('body')[0].style.margin;
    }

    if ((bodyDimensions.right - elem.right) > (ttip.width + 10)) {
        if ((elem.top + (elem.height / 2)) > (ttip.height / 2) && (((winHeight - elem.bottom) + (elem.height / 2)) > (ttip.height / 2))) {
            return {
                position: "rightOk",
                "ttipLeft": (elem.right + 10),
                "ttipTop": ((elem.top + elem.height / 2) - (ttip.height / 2)),
                "arrowLeft": -8,
                "arrowTop": (ttip.height / 2) - 5,
                "deg": "rotate(315deg)"
            }
        } else if ((elem.top + (elem.height / 2)) < (ttip.height / 2) && (((winHeight - elem.bottom) + (elem.height / 2)) > (ttip.height / 2))) {
            return {
                position: "rightBottomOk",
                "ttipLeft": (elem.right + 10),
                "ttipTop": 0,
                "arrowLeft": -8,
                "arrowTop": (elem.top + elem.height / 2) - 5,
                "deg": "rotate(315deg)"
            }
        } else if ((elem.top + (elem.height / 2)) > (ttip.height / 2) && (((winHeight - elem.bottom) + (elem.height / 2)) < (ttip.height / 2))) {
            return {
                position: "rightTopOk",
                "ttipLeft": (elem.right + 10),
                "ttipTop": (window.innerHeight - ttip.height),
                "arrowLeft": -8,
                "arrowTop": (ttip.height - ((window.innerHeight - elem.bottom) + elem.height / 2)) - 5,
                "deg": "rotate(315deg)"
            }
        }
    }
    return {
        position: "rightFailed"
    }
}



