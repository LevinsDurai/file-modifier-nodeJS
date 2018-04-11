var zdttTriggerOldFocused = undefined;
var CloseIconMouseOverAction;
var zdtt_lastHighlightedObj = undefined;
var ArticlesObject = undefined;
var LastFocusedBC = undefined;
var lastSelectedColorOptionNode = undefined;
var zd_TT_sidePanelViewed = true;
var zd_ATTitsEnabled = false;
var requestAPI = undefined;
var organitationID = undefined;

var commomDomainNameForAPI = "desk.zoho.com";

var zd_tt_triggerListing = "ALL";
var zdTT_user = {};
var lastLoadingElem = undefined;
var zd_tt_articleSelected = undefined;
var zd_tt_selectedArticleTitle = undefined;
var extensionI18N = undefined ;
var ConfigureObjects = undefined;
var TriggerListAllObjMaintanense = [];
var listOfTriggersObj = undefined;
var finalizedColor = "rgb(250,250,250)";

function findHighestZIndex(elem) {
    var elems = document.getElementsByTagName(elem);
    var highest = 0;
    for (var i = 0; i < elems.length; i++) {
        var zindex = document.defaultView.getComputedStyle(elems[i]).getPropertyValue("z-index");
        if ((parseInt(zindex) > highest) && (zindex != 'auto')) {
            highest = parseInt(zindex);
        }
    }
    return highest;
}

var zdtt_pageMaxZIndexValue = parseInt(findHighestZIndex('div'));

/* shadow dom creater function */
function shadowRootCreater(hostElem, template, childrens) {
    if (hostElem) {
        var shadowRoot = hostElem.createShadowRoot();
        if (template) {
            shadowRoot.appendChild(template.content.cloneNode(true));
        }
        if (childrens) {
            for (child of childrens) {
                shadowRoot.appendChild(child);
            }
        }
    }
}
/* shadow dom creater function end */

/* 
    ElementCreater function sample argument structure :- 
    ----------------------------------------------------
    {
        elemName: "element name" ,
        attributes : {
            id:"element id name" ,
            class:"element Class name"  
        },
        elementData:{
            innerHTML : "",
            innerText : "",
            value     : ""
        },
        parent : "parent element id" or return created element ,
        callbackList : callBack List Of Obj
    }

    if you need to add any attribute for the elemet , add the attribute name in the attributes obj ...
*/


var zdttDomElement = function() {}
zdttDomElement.prototype.create = function(obj) {
    if (obj.elemName != undefined) {
        if (obj.elemName == "svg") {
            var element = document.createElementNS("http://www.w3.org/2000/svg", obj.elemName);
        } else {
            var element = document.createElement(obj.elemName);
        }
        obj.attributes != undefined && this.setAttributes(element, obj.attributes);
        obj.callbackList != undefined && this.bindEvents(element, obj.callbackList);
        obj.elementData != undefined && this.setData(element, obj.elementData);
        if (typeof(obj.parent) == "undefined") {
            return element
        } else if (typeof(obj.parent) == "string") {
            document.getElementById(obj.parent).appendChild(element);
        } else if (obj.parent instanceof Element) {
            obj.parent.appendChild(element);
        }
        return element
    }
};
zdttDomElement.prototype.setData = function(el, obj) {
    if (obj.innerHTML) {
        el.innerHTML = obj.innerHTML;
    } else if (obj.innerText) {
        el.innerText = obj.innerText;
    } else if (obj.value) {
        el.value = obj.value;
    }
    if (obj.child) {
        for (child of obj.child) {
            if(child){
                el.appendChild(child);
            }
        }
    }
}
zdttDomElement.prototype.setAttributes = function(el, attrs) {
    for (var key in attrs) {
        if (attrs[key] != undefined) {
            el.setAttribute(key, attrs[key]);
        }
    }
}
zdttDomElement.prototype.bindEvents = function(el, eventArray) {
    for (eventObj of eventArray) {
        for (var key in eventObj) {
            el.addEventListener(key, eventObj[key]);
        }
    }
}
var domElement = new zdttDomElement();
/* ElementCreater ended ...  */

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.zdttMsg === "zd_tt_asapTTenabledStatus") {
        chrome.runtime.sendMessage({
                "zdttMsg": "zd_ATTitsEnabledStatus",
                "data": zd_ATTitsEnabled
            },
            runtimeMsgCallBack
        );
        zd_ATTitsEnabled = zd_ATTitsEnabled ? false : true;
    } else if (request.zdttMsg === "cookieGet") {
        var cookieRes = JSON.parse(request.cookieValue);
        if (cookieRes.csrf != "cookieNotFound" && cookieRes.agent != "cookieNotFound") {
            requestAPI = apiCallerCreater(cookieRes.csrf);
            portalAPI();
        } else {
            createToolTipErrorPopupBox({
                buttons: [{
                    id: "zd_tt_permissionErrors",
                    content: "Close",
                    callbackList: [{
                        mousedown: closeEPwithcloseExtension
                    }]
                }],
                content: "Unable to verify your login to Zoho Desk. Please check if you are logged into your Zoho Desk portal."
            });
        }
    }
})


function zdttLoading(elem) {
    const mesKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "desk.asap.extention.loading";
    return {
        inject: function(obj) {
            var loading = `<div class="loading-area" id="zdtt_loadingContainer">
                <div class="loading-content">
                    <div class="loading-item"></div>
                </div>
                <div class="zdattfw500">` + extensionI18N.get(mesKey) + `...</div>
            </div>`;
            if (!obj) {
                elem.innerHTML = loading;
            } else {
                elem.scrollTop = 0;
                if (elem.className.indexOf("zohodesk-Tooltip-panel-contentplur") == -1) {
                    elem.className += " zohodesk-Tooltip-panel-contentplur";
                }
                var lpattripute = {
                    class: "loading-area",
                    id: "zdtt_loadingContainer"
                };
                var pdattripute = {
                    class: "zohodesk-Tooltip-plurdiv"
                };
                if (obj.ptop != undefined) {
                    pdattripute.style = "top:" + obj.ptop + "px"
                }
                if (obj.pleft != undefined) {
                    lpattripute.style = "left:" + obj.pleft + "px"
                }
                if (obj.pzi) {
                    lpattripute.style = lpattripute.style ? lpattripute.style + ";z-index:" + obj.pzi : "z-index:" + obj.pzi;
                }
                let plrDiv = zdttContainers.zdtt_sidepanelSwitchingComp.querySelector(".zohodesk-Tooltip-plurdiv");
                if (plrDiv) {
                    this.plurdiv = plrDiv;
                    this.plurdiv.style.top = obj.ptop + "px";
                } else {
                    this.plurdiv = domElement.create({
                        elemName: "div",
                        attributes: pdattripute
                    })
                }
                var loadingParent = domElement.create({
                    elemName: "div",
                    attributes: lpattripute,
                    elementData: {
                        innerHTML: loading
                    }
                });
                elem.appendChild(this.plurdiv);
                elem.appendChild(loadingParent);
            }
        },
        remove: function() {
            var loadingElem = elem.querySelector("#zdtt_loadingContainer");
            if (this.plurdiv) {
                elem.className = elem.className.split(" zohodesk-Tooltip-panel-contentplur").join("");
                this.plurdiv.parentElement.removeChild(this.plurdiv);
            }
            if (loadingElem) {
                elem.removeChild(loadingElem);
            }
            lastLoadingElem = undefined;
        }
    }
}
function deleteTheConfiguredTriggerEventFromRemoveEvent(element, event, zdtt_elementSelectorObj) {
    return function(e) {
        e.preventDefault();
        e.stopPropagation();
        singleElementEventRemover(element, event);
        var parent = document.querySelector(element);
        var path = fullPath(parent);
        zdtt_elementSelectorObj.elementsArrayCreater({
            "type": "remove",
            "elemSelector": path
        });
    }
}

/* highlight the element code */

function removeHighlightedElemFromObj(element, event, zdtt_elementSelectorObj) {
    return function(e) {
        e.preventDefault();
        e.stopPropagation();
        singleElementEventRemover(element, event);
        zdtt_elementSelectorObj.elementsArrayCreater({
            "type": "remove",
            "elemSelector": element
        });
    }
};

/* highlight the element code end */ 


function zdATTupdatedElemetsHighlighter(currentObj) {
    var ind = 0;
    let needDelete = false;
    if (zdtt_nowStatus == "update") {
        needDelete = true;
    }
    _zdattElemHighlighter.singleTooltipHighlighter(currentObj, false, needDelete)
}

function unHighlightTheOld() {
    if (zdttTriggerOldFocused) {
        zdttTriggerOldFocused.className = zdttTriggerOldFocused.className.split(" zohodesk-Tooltip-triggerlist-FocusedTriggerDetails").join("");
        if (zdtt_lastHighlightedObj) {
            delete zdtt_lastHighlightedObj["dontEdit"]
        }
        zdttTriggerOldFocused = undefined;
    }
}

function zdttHighlightTriggerElems(elem) {
    return function() {
        unHighlightTheOld();
        _zdattElemHighlighter.remove();
        var zd_tt_ConfSelectedTrigger;
        if (elem.className.indexOf("zohodesk-Tooltip-triggerlist-FocusedTriggerDetails") == -1) {
            elem.className += " zohodesk-Tooltip-triggerlist-FocusedTriggerDetails";
            zdttTriggerOldFocused = elem;
        }
        for (trigger of listOfTriggersObj) {
            if (elem.id == trigger.id) {
                trigger["dontEdit"] = true;
                zdtt_lastHighlightedObj = trigger;
                break;
            }
        }
        zdATTupdatedElemetsHighlighter(trigger);
    }
}



function ZohoDesk_tooltip_triggerList_creator(obj) {
    var toggleElement = zdttContainers.zdtt_sidepanelSwitchingComp;
    if (toggleElement.className.indexOf("zohodesk-Tooltip-height") != -1) {
        toggleElement.className = toggleElement.className.split("zohodesk-Tooltip-height").join("");
    }
    var parent = domElement.create({
        elemName: "ul",
        attributes: {
            class: "zohodesk-Tooltip-list zohodesk-TriggerListParentUl"
        }
    })
    if (obj != undefined) {
        for (var i = 0; i < obj.length; i++) {
            var nothing = 0;
            var currentObj = obj[i];
            var countMsg = "(" + currentObj.triggers.length + ")";
            let triggerNamePlate = domElement.create({
                elemName: "div",
                attributes: {
                    class: "zohodesk-Tooltip-ArticleName",
                    title: currentObj.name + " ( " + currentObj.triggers.length + " )"
                },
                elementData: {
                    innerHTML: currentObj.name + countMsg
                }
            });
            let iconsAndCountParent = domElement.create({
                elemName: "div",
                attributes: {
                    class: "zohodesk-Tooltip-editDeleteCount-Parent"
                },
                elementData: {
                    innerHTML: `<div class="zohodesk-Tooltip-editDeleteIcons-Parent"></div>
                    <div class="zohodesk-Tooltip-ArticleViews" title="` + longNimberConverter(parseInt(currentObj.viewCount)) + ` ` + extensionI18N.get('desk.asap.extention.triggers.views') + `">` + longNimberConverter(parseInt(currentObj.viewCount)) + `</div>`
                }
            });
            var editIcon = domElement.create({
                elemName: "svg",
                attributes: {
                    class: "zohodesk-Tooltip-deleteIcn"
                },
                elementData: {
                    innerHTML: `<title>` + extensionI18N.get('desk.asap.extention.triggers.edit') + `</title><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#edit"></use>`
                },
                parent: iconsAndCountParent.querySelector(".zohodesk-Tooltip-editDeleteIcons-Parent")
            });
            var deleteIcon = domElement.create({
                elemName: "svg",
                attributes: {
                    class: "zohodesk-Tooltip-deleteIcn"
                },
                elementData: {
                    innerHTML: `<title>` + extensionI18N.get('desk.asap.extention.delete') + `</title><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#delete"></use>`
                },
                parent: iconsAndCountParent.querySelector(".zohodesk-Tooltip-editDeleteIcons-Parent")
            });
            let firstRow = domElement.create({
                elemName: "div",
                attributes: {
                    class: "zohodesk-Tooltip-ArticleNameParent"
                },
                elementData: {
                    child: [triggerNamePlate, iconsAndCountParent]
                }
            });
            let secoundRow = domElement.create({
                elemName: "div",
                attributes: {
                    class: "zohodesk-Tooltip-urlPathPlate",
                    title: decodeURI(currentObj.triggers["0"].url)
                },
                elementData: {
                    innerHTML: decodeURI(currentObj.triggers["0"].url)
                }
            });
            let authorName = domElement.create({
                elemName: "div",
                attributes: {
                    class: "zohodesk-Tooltip-AuthorDetails",
                    title: "Created by " + currentObj.modifiedBy.name
                },
                elementData: {
                    innerHTML: currentObj.modifiedBy.name
                }
            });
            let createdTime = domElement.create({
                elemName: "div",
                attributes: {
                    class: "zohodesk-Tooltip-AuthorDetails"
                },
                elementData: {
                    innerHTML: ""
                }
            });
            let thiredRow = domElement.create({
                elemName: "div",
                attributes: {
                    class: "zohodesk-Tooltip-AuthorDetails-parent"
                },
                elementData: {
                    child: [authorName, createdTime]
                }
            });
            var div1 = domElement.create({
                elemName: "div",
                attributes: {
                    class: "zohodesk-Tooltip-columnone"
                },
                elementData: {
                    child: [firstRow, secoundRow, thiredRow]
                }
            })

            var li = domElement.create({
                elemName: "li",
                attributes: {
                    class: "zohodesk-Tooltip-cl-both zohodesk-Tooltip-triggerlist",
                    id: currentObj.id,
                    inf: i
                },
                elementData: {
                    child: [div1]
                }
            });
            var deleteTriggerSuccessCB = zdttDeleteTrigger(li);
            li.onclick = zdttHighlightTriggerElems(li);
            deleteIcon.onclick = confirmationMessagePopup(extensionI18N.get('desk.asap.extention.triggers.deleteconfirmation'), deleteTriggerSuccessCB);
            editIcon.onclick = zdUpdateTrigger(currentObj);
            parent.appendChild(li);
        }
        var list = domElement.create({
            elemName: "div",
            elementData: {
                child: [parent]
            }
        })
        return list;
    } else {
        var list = domElement.create({
            elemName: "div",
            elementData: {
                child: [parent]
            }
        })
        return list;
    }
};


function confirmationMessagePopup(text, cbForSuccess, cbForUnsuccess) {
  // for get a confirmation of any action ...
    return function() {
        createToolTipErrorPopupBox({
            id: "editorBody",
            buttons: [
                {
                    content: extensionI18N.get("desk.asap.extention.delete"),
                    callbackList: [
                        {
                            mouseup: function mouseup(e) {
                                setTimeout(function() {
                                    if (cbForSuccess) {
                                        cbForSuccess(e);
                                    }
                                }, 200);
                            }
                        }
                    ]
                },
                {
                    content: extensionI18N.get("desk.asap.extention.cancel"),
                    callbackList: [
                        {
                            mouseup: function mouseup(e) {
                                setTimeout(function() {
                                    if (cbForUnsuccess) {
                                        cbForUnsuccess(e);
                                    }
                                }, 200);
                            }
                        }
                    ]
                }
            ],
            content: text
        });
    };
}





function zdttDeleteTrigger(elem) {
    return function(event) {
        event.preventDefault();
        event.stopPropagation();
        var positionStatus = "Right";
        var sidePanel = zdttContainers.zdtt_sidePanelDirectChild;
        if (sidePanel.className.indexOf("zohodesk-Tooltip-panel-left") != -1) {
            positionStatus = "Left";
        }
        if (elem.id != "" || elem.id != null || elem.id != undefined) {
            var animClass = "";
            if (positionStatus == "Left") {
                animClass += " zohodesk-Tooltip-animat-left";
            } else {
                animClass += " zohodesk-Tooltip-animat";
            }
            elem.className += animClass;
            setTimeout(function() {
                if (elem.className.indexOf("zohodesk-Tooltip-animat") != -1) {
                    elem.className += " zohodesk-Tooltip-heightAnim";
                }
            }, 400);
            var callBack = deleteCallBackCreater(elem, animClass);
            var Zohodesk_Chrome_Extension_Delete_Configured_Snippet_URL = "https://" + commomDomainNameForAPI + "/api/web/extensions/" + ExtensionProjectId + "/messages/" + elem.id + "?orgId=" + organitationID ;
            zdaTTcommonAPIcaller( Zohodesk_Chrome_Extension_Delete_Configured_Snippet_URL , "del" , callBack );
        }
    };
}

function zdUpdateTrigger(currentObj) {
    return function() {
        var focusedTriggerObj;
        var ind = 0;
        for (var obj of listOfTriggersObj) {
            if (obj.id == currentObj.id) {
                focusedTriggerObj = obj;
                zd_tt_focusedElementInd = ind;
            }
            ind++
        }
        if (focusedTriggerObj != undefined) {
            lastObjectOfUpdatedTriggerFUB = JSON.parse(JSON.stringify(focusedTriggerObj));
            ConfigureObjectForEdit = JSON.parse(JSON.stringify(focusedTriggerObj));
            zd_tt_addNewTrigger("update");
        }
    }
}

function listFilterCreater() {
    var filterOptText = (zd_tt_triggerListing == "CREATED_BY_ME") ? extensionI18N.get('desk.asap.extention.createdbyme') : extensionI18N.get('desk.asap.extention.all');
    zdttContainers.filterSwitch = domElement.create({
        elemName: "span",
        attributes: {
            class: "zohodesk-Tooltip-panel-form-selectbox  zohodesk-Tooltip-CategoryName",
            id: "zdtt_spanDropDown"
        },
        elementData: {
            innerHTML: filterOptText
        },
        parent: zdttContainers.zdtt_sidepanelSwitchingComp.querySelector(".zohodesk-Tooltip-Category")
    })
    var popup = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-Selectbox-dropdown",
            id: "triggerTapDropdown"
        },
        elementData: {
            innerHTML: `<div class="zohodesk-Tooltip-dropdown-content">
                    <ul class="zohodesk-Tooltip-list"></ul>
                </div>`
        },
        parent: zdttContainers.zdtt_sidepanelSwitchingComp.querySelector(".zohodesk-Tooltip-Category")
    })
    var callBackOfAllBtn = zd_tt_triggerListFilter("ALL");
    var callBackOfcrtbymeBtn = zd_tt_triggerListFilter("CREATED_BY_ME");
    var allBtn = domElement.create({
        elemName: "li",
        attributes: {
            class: "zohodesk-Tooltip-dropdown-options",
            id: "zd_tt_TriggerAll"
        },
        elementData: {
            innerHTML: extensionI18N.get('desk.asap.extention.all')
        },
        callbackList: [{
            mousedown: callBackOfAllBtn
        }],
        parent: popup.querySelector(".zohodesk-Tooltip-list")
    })
    var crtByMeBtn = domElement.create({
        elemName: "li",
        attributes: {
            class: "zohodesk-Tooltip-dropdown-options",
            id: "zd_tt_CreatedByMe"
        },
        elementData: {
            innerHTML: extensionI18N.get('desk.asap.extention.createdbyme')
        },
        callbackList: [{
            mousedown: callBackOfcrtbymeBtn
        }],
        parent: popup.querySelector(".zohodesk-Tooltip-list")
    })
    var popupCallback = zdtt_popupShow(popup);
    zdttContainers.filterSwitch.onclick = popupCallback;
}

function zdttCommonListPage(child = "") {
    zdttContainers.zdtt_sidepanelSwitchingComp.innerHTML = `<div class="zohodesk-Tooltip-TriggersTitle zohodesk-Tooltip-cl-both" id="zohoDeskAsapListPageHeader">
            <div class="zohodesk-Tooltip-TriggersTitlelft">
                <div class="zohodesk-Tooltip-Category"></div>
            </div>
        </div>`;
    let addTriggerBtn = domElement.create({
        elemName: "span",
        attributes: {
            class: "zohodesk-asapTT-guideListPage-addBtn"
        },
        callbackList:[{click:addNewTabClicked}],
        elementData: {
            innerHTML: extensionI18N.get('desk.asap.extention.add')
        }
    });
    domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-TriggersTitlert"
        },
        elementData: {
            child: [ addTriggerBtn ]
        },
        parent: zdttContainers.zdtt_sidepanelSwitchingComp.querySelector("#zohoDeskAsapListPageHeader")
    })
    listFilterCreater();
    zdttContainers.ListParent = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-panel-content zohodesk-Tooltip-trigger-content",
            id: "zd_tt_listParent"
        },
        elementData: {
            child: [child]
        },
        parent: zdttContainers.zdtt_sidepanelSwitchingComp
    })
}

function zd_tt_triggerListInitiater(obj, loading) {
    if (obj.length != 0) {
        var triggerLists = ZohoDesk_tooltip_triggerList_creator(obj);
        if (loading) {
            loading.remove();
        }
        zdttCommonListPage(triggerLists);
    } else {
        emptyListPageCreater()
        if (loading) {
            loading.remove();
        }
    }
}


function getConfiguredMessages(filter, loading) {
    var currentDomainName = encodeURI(decodeURI(window.location.hostname));
    let url = "https://" + commomDomainNameForAPI + "/api/web/extensions/" + ExtensionProjectId + "/messages?" + filter + "isEnabled=true&orgId=" + organitationID;
    zdaTTcommonAPIcaller( url , "get" , getConfiguredMessageSuccessCB );
}

function postContentIntotheEditor(article, obj, injectTheIframeValue, zd_tt_editerInnerConent) {
    let url = 'https://' + commomDomainNameForAPI + '/api/web/solutionsnippet/snippets/' + article.id + '?orgId=' + organitationID;
    let getSnippetAPI_successCB = getSnippetAPI_successCBmaker(article, obj, injectTheIframeValue, zd_tt_editerInnerConent);
    zdaTTcommonAPIcaller(url, "get", getSnippetAPI_successCB);
}

function zdttArticleSelectorBinder(id) {
    return function(e) {
        var obj = undefined;
        var injectTheIframeValue = zdttContainers.zdtt_sidepanelSwitchingComp.querySelector(".KB_Editor_iframe");
        if (zdtt_nowStatus == "new") {
            obj = zd_tt_addTooltipObj;
        } else if (zdtt_nowStatus == "update") {
            obj = ConfigureObjectForEdit;
        }
        var zd_tt_editerInnerConent = obj.components["0"].content.split(" ").join("");
        for (article of ArticlesObject) {
            if (id == article.id) {
                zdttContainers.searchInp.value = article.title;
                postContentIntotheEditor(article, obj, injectTheIframeValue, zd_tt_editerInnerConent)
                zdtt_popupHide(zdttContainers.searchRes);
                zd_tt_articleSelected = true;
                zd_tt_selectedArticleTitle = article.title;
                var articleErrorElem = zdttContainers.zdtt_sidepanelSwitchingComp.querySelector("#zd_tt_artInpError");
                if (articleErrorElem.className.indexOf("mesaageHideAnim") == -1) {
                    articleErrorElem.className += " mesaageHideAnim";
                }
                articleErrorElem.innerText = "";
                zdttContainers.searchInp.parentElement.className = zdttContainers.searchInp.parentElement.className.split(" zd_tt_notfilledErrorStyle").join('');
                window.postMessage({
                    name: "SingleArticle",
                    article: e.target.id
                }, "*");
            }
        }
    }
}

window.addEventListener("message", event => {
    if (event.data.type === "Asap_Not_Found") {
        createToolTipErrorPopupBox({
            buttons: [{
                id: "zd_tt_permissionErrors",
                content: "ok",
                callbackList: [{
                    mousedown: closeEPwithcloseExtension
                }]
            }],
            content: "Please install the Zoho Desk ASAP add-on in your website to start using this extension."
        });
    }
    if (event.data.type === "toolTip_orgId") {
        organitationID = event.data.orgId;
        AsapId = event.data.AsapId;
        AsapName = event.data.AsapName;
        asapPortalID = event.data.asapPortalID;
    } else if (event.data.type == "ASAP_not_LOADED") {
        createToolTipErrorPopupBox({
            buttons: [{
                id: "zd_tt_permissionErrors",
                content: "ok",
                callbackList: [{
                    mousedown: closeEPwithcloseExtension
                }]
            }],
            content: "ASAP not loaded . please wait a minite. and use the extension"
        });
    } else if (event.data.name == "Zohodesk_Chrome_Extension_AsapDetails") {
        let filter = "";
        if (event.data.filter != undefined) {
            filter = event.data.filter;
        }
        lastLoadingElem = zdttLoading(zdttContainers.zdtt_sidepanelSwitchingComp);
        lastLoadingElem.inject();
        getConfiguredMessages(filter, lastLoadingElem);
    } else if (event.data.name == "articleSearchResult") {
        ArticlesObject = event.data.value;
        const parentDiv = zdttContainers.searchRes.querySelector("#zohodesk_Tooltip_dropdown_articles_parent_id1");
        parentDiv.innerHTML = "";

        const container = domElement.create({
            elemName: "ul",
            attributes: {
                class: "zohodesk-Tooltip-list"
            }
        });
        if (ArticlesObject == "emptyResponse") {
            var child = domElement.create({
                elemName: "li",
                attributes: {
                    class: "zohodesk-Tooltip-searchNoResultFound-Li"
                },
                elementData: {
                    child: [document.createTextNode("No results found .")]
                },
                parent: container
            });
            parentDiv.appendChild(container);
            zdtt_popupShow(zdttContainers.searchRes)()
            return;
        }
        if (ArticlesObject != undefined) {
            for (article of ArticlesObject) {
                var child = domElement.create({
                    elemName: "li",
                    attributes: {
                        class: "zohodesk-Tooltip-dropdown-options",
                        id: article.id
                    },
                    elementData: {
                        child: [document.createTextNode(article.title)]
                    },
                    callbackList: [{
                        click: zdttArticleSelectorBinder(article.id)
                    }],
                    parent: container
                });
            }
            parentDiv.appendChild(container);
            zdtt_popupShow(zdttContainers.searchRes)()
        }
    } else if (event.data.name == "SingleArticleObject") {
        let element;
        if (zdtt_nowStatus == "new") {
            zd_tt_addTooltipObj.components[0].solutionId = event.data.value.id;
            if (zd_tt_addTooltipObj.preferences["selector"] != undefined) {
                delete zd_tt_addTooltipObj.preferences["selector"];
            }
        } else if (zdtt_nowStatus == "update") {
            ConfigureObjectForEdit.components[0].solutionId = event.data.value.id;
            if (ConfigureObjectForEdit.preferences["selector"] != undefined) {
                delete ConfigureObjectForEdit.preferences["selector"];
            }
        }
    }
})

function ZT_HexColorValue() {};
ZT_HexColorValue.prototype.rgbToHex = function(r, g, b) {
    return `#${this.componentToHex(r)}${this.componentToHex(g)}${this.componentToHex(b)}`;
};
ZT_HexColorValue.prototype.componentToHex = function(c) {
    this.hex = c.toString(16);
    return this.hex.length == 1 ? `0${this.hex}` : this.hex;
}
ZT_HexColorValue.prototype.RGBAtoRGB = function(r, g, b, a, r2, g2, b2) {
    var r3 = Math.round(((1 - a) * r2) + (a * r))
    var g3 = Math.round(((1 - a) * g2) + (a * g))
    var b3 = Math.round(((1 - a) * b2) + (a * b))
    return `rgb(${r3},${g3},${b3})`;
}

var zd_colorValueChanger = new ZT_HexColorValue();

// While publish, need to remove all console.log statememts.

function Chrome_Extension_ExecuteEditor() {
    chrome.runtime.sendMessage({
        "zdttMsg": "zdtt_Inject_sidePanel_file"
    });
    chrome.runtime.sendMessage({
        "message": "previewMode"
    });
}

function zd_tt_removeMouseOverElements() {
    zdtt_lastHighlighted = [];
    var elems = document.getElementsByClassName("zohodesk-Tooltip-currentShad");
    var child = undefined;
    if (elems.length) {
        for (var i = 0; i < elems.length; i++) {
            elems[i].className = elems[i].className.split("zohodesk-Tooltip-currentShad").join('');
        }
        prvsElems = undefined;
    }
    _zdattElemHighlighter.remove();
}


function Chrome_Extension_AddExtension(AsapId, organitationID, AsapName, domainName) {
    let url = "https://" + commomDomainNameForAPI + "/api/web/extensions?isEnabled=true&orgId=" + organitationID + "&extensionName=" + encodeURIComponent(AsapName) + "&domain=" + encodeURIComponent(domainName) + "&asapId=" + AsapId;
    zdaTTcommonAPIcaller(url,"post",GetExtensionSuccessCB,zdattAPIfailCases);
}

function zdatt_enableExtensionApp(id, domain) {
    let url = "https://" + commomDomainNameForAPI + "/api/web/extensions/" + id + "/enable?orgId=" + organitationID + "&domain=" + domain ;
    zdaTTcommonAPIcaller(url,"post",enableExtensionSuccessCB,zdattAPIfailCases);
}

function enabledExtensionFilter(obj) {
    for (item of obj) {
        if (item.isEnabled) {
            return item.domain
        }
    }
}

function renderConfirmationPopup(msg, cb, id, dn, aobj) {
    var msg = "";
    if (msg == "websiteFound") {
        msg = "<b>Already " + enabledExtensionFilter(aobj) + " domain is configured .</b><br>Whould you like to enable this domain ?"
    }
    if (cb) {
        function cb1() {
            cb(id, dn);
        }
    }
    createToolTipErrorPopupBox({
        buttons: [{
            content: "Yes",
            callbackList: [{
                mousedown: cb1
            }]
        }, {
            id: "zd_tt_permissionErrors",
            content: "No",
            callbackList: [{
                mousedown: closeEPwithcloseExtension
            }]
        }],
        content: msg
    });
}


function asapExtensionAppDecision(data) {
    var domainName = encodeURI(decodeURI(window.location.hostname));
    if (data.create) {
        Chrome_Extension_AddExtension(AsapId, organitationID, AsapName, domainName);
    }
    if (data.enableOnly) {
        var msg = "websiteFound";
        renderConfirmationPopup(msg, zdatt_enableExtensionApp, data.id, domainName, date.obj);
    }
}

function deleteExtention(id) {
    requestAPI(" https://" + commomDomainNameForAPI + "/api/web/extensions/" + id + "?orgId=" + organitationID).del().then((res) => {})
}

function Chrome_Extension_GetExtension(AsapId, organitationID) {
    var domainName = encodeURI(decodeURI(window.location.hostname));
    let url = "https://" + commomDomainNameForAPI + "/api/web/extensions?orgId=" + organitationID + "&domain=" + encodeURIComponent(domainName) + "&asapId=" + AsapId;
    zdaTTcommonAPIcaller(url,"get",GetExtensionSuccessCB,zdattAPIfailCases);
}


function portalAPI() {
    if (organitationID != undefined) {
        let url = "https://" + commomDomainNameForAPI + "/api/v1/myinfo?orgId=" + organitationID ;
        zdaTTcommonAPIcaller(url,"get",portalAPISuccessCB,zdattAPIfailCases);
    }
}

function fullPath(selectedElement) {
    var isIDExist = false;
    var elementPath = [];
    var childs;
    if (selectedElement.id != "") {
        elementPath.unshift("[id='" + selectedElement.id + "']")
        return elementPath[0]
    }

    while (!isIDExist) {
        childs = selectedElement.parentElement.children
        for (var c = 0; childs[c] != selectedElement; c++);
        elementPath.unshift(selectedElement.tagName + ":nth-child(" + (c + 1) + ")")
        selectedElement = selectedElement.parentElement
        if (selectedElement.id !== "") {
            elementPath.unshift("[id='" + selectedElement.id + "']")
            isIDExist = true
        } else if (selectedElement.tagName == "HTML") {
            elementPath.unshift("HTML")
            isIDExist = true
        }
    }
    return elementPath.join(" > ")
}


function runtimeMsgCallBack(response) {
    switch (response.zdttMsg) {
        case "activeTooltip":
            chrome.runtime.sendMessage({
                "zdttMsg": "getCookie"
            });
            window.postMessage({
                name: "UrlCheck"
            }, "*");
            window.postMessage({
                name: "closeAsapWebApp"
            }, "*"); // if asap was opened , it's used for close ASAP
            window.postMessage({
                name: "unregisterTheAsapTooltip"
            }, "*"); // it's used for unregister the tips from ASAP
            break;

        case "deactiveTooltip":
            window.postMessage({
                name: "zdttIsDisabled"
            }, "*"); // We are using "zdttIsDisabled" instead of the "registerTheAsapTooltip".  
            setTimeoutVarForDeactive = setInterval(deactiveAsapTT, 500);
            guideUI = undefined;
            delete window.localStorage.zdattTempDemoPath;
            delete window.localStorage.zdattWTDmessages;
            break;

    }
}

var setTimeoutVarForDeactive;

function zd_tt_removeElement(sidePanelHost) {
    if (sidePanelHost) {
        sidePanelHost.parentElement.removeChild(sidePanelHost);
    }
}

function deactiveAsapTT(fromError) {
    let minimizeIconHost = document.getElementById("zdtt_minimizeIconHost");
    let sidePanelHost = document.getElementById("zdtt_sidePanelHost");

    let popBody = document.getElementById("ToolTipEditorPosition");
    let maximizeIcon = document.getElementById("maxiIcon");
    if (minimizeIconHost) {
        minimizeIconHost.parentElement.removeChild(minimizeIconHost);
    }
    if (sidePanelHost) {
        clearInterval(setTimeoutVarForDeactive);
        zd_tt_removeMouseOverElements();
        document.removeEventListener("mouseover", mouseLatestLocationFinder);
        mouseOverDone = true;
        zd_tt_removeElement(sidePanelHost);
        overAllElementEventsRemover(TriggerListAllObjMaintanense);
        objInitializer();
    }
    ZD_ttErrorPopup.clearBindedEvent();
    ZD_ttErrorPopup.deleteTooltipErrorPopupBox();
    if (ZDTT_fromError) {
        ZDTT_fromError = undefined;
        clearInterval(setTimeoutVarForDeactive);
    }
}


/* manual background color input option */


function manualBackgroundColorSetter(e) {
    var bc = e.srcElement.value;
    var latestBGC = "";
    if (bc != "") {
        try {
            if (isNaN(bc)) {
                latestBGC = tooltipBackgroundColourChanger(bc);
            }
            if (LastFocusedBC != latestBGC) {
                LastFocusedBC = undefined;
                finalizedColor = zdttEditorBGColorFinder(zdttContainers.zdtt_sidepanelSwitchingComp.querySelector(".KB_Editor_iframe").contentDocument.body);
                lastSelectedColorOptionNode.style.borderColor = "";
            }
        } catch (error) {
            console.log(error);
        }
    }
}


function zdttEditorBGColorFinder(elem) {
    return window.getComputedStyle(elem, null).getPropertyValue('background-color');
}



function tooltipBackgroundColourChanger(color) {
    var a = zdttContainers.zdtt_sidepanelSwitchingComp.querySelector(".KB_Editor_iframe");
    a.contentDocument.body.style.backgroundColor = color;
    return zdttEditorBGColorFinder(a.contentDocument.body)
}

function separateColorHighliter(e) {
    var childEle = e.target;
    var parentEle = childEle.parentNode;
    var bc = zdttEditorBGColorFinder(childEle);
    finalizedColor = bc;
    if (bc == "rgb(255, 255, 255)") {
        parentEle.style.borderColor = "rgba(0, 0, 0, 0.1)";
    } else {
        parentEle.style.borderColor = bc;
    };
    if (lastSelectedColorOptionNode) {
        if (lastSelectedColorOptionNode != parentEle) {
            lastSelectedColorOptionNode.style.borderColor = "";
        }
    }
    tooltipBackgroundColourChanger(bc);
    LastFocusedBC = bc;
    lastSelectedColorOptionNode = parentEle;
}

/* element select function revamp */

function removeSelectedTriggerPoint(path) {
    return function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.elementsArrayCreater({
            "type": "remove",
            "elemSelector": path
        })
    }
}

function zdaTTcheckHighlighter(elem) {
    let isHighlighterElem = false;
    if(elem){
        do {
            if (elem.id == "zdaTTtriggerHighlighter") {
                isHighlighterElem = true;
            }
            elem = elem.parentElement;
        } while (elem.parentElement);
    }
    return isHighlighterElem
}

function findInnerElements(parentEleId, checkEle) {
    try {
        var innerElement = false
        var parentEle = document.getElementById(parentEleId);
        if (parentEle == checkEle) {
            innerElement = true;
        }
        var parentEleChild = parentEle.getElementsByTagName("*")
        var parentEleChildLen = parentEleChild.length
        for (i = 0; i < parentEleChildLen; i++) {
            if (checkEle == parentEleChild[i]) {
                innerElement = true
                break
            }
        }
        return innerElement
    } catch (err) {}
}

function zd_tt_elementSelector(obj) {
    this.selectedStatus = false;
    this.elementsArrayCreater = obj.elementsArrayCreater;
    this.prvsElems = undefined;
    this.Editor = this.Editor.bind(this);
    this.mouseover = this.mouseover.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.mouseupEvent = this.mouseupEvent.bind(this);
    this.click = this.click.bind(this);
    this.dblclick = this.dblclick.bind(this);

    this.tempElemPath;
};

zd_tt_elementSelector.prototype.Editor = function(e) {
    if (mouseOverDone == true) {
        if (e.target.className.indexOf(" zohodesk-Tooltip-Configureborder") == -1) {
            if (zd_tt_arrayOfElements.length <= 5) {
                var TName = undefined;
                var addTPInput = document.getElementById("zd_tt_changePointer");
                var elemPath = fullPath(e.target);
                this.tempElemPath = elemPath;
                e.target.className = e.target.className.split(" zohodesk-Tooltip-currentShad").join("");        // join(" zohodesk-Tooltip-Configureborder")
                this.selectedStatus = true;


                ArrayUndoElementList = [];
                blurPosition();
                if (zd_tt_arrayOfElements.length == 5) {
                    zdttAddTrigerPointer().unbind("limitReached");
                    zd_tt_addTPBlocked = true;
                }
            } else {
                zdttAddTrigerPointer().unbind("limitReached");
                zd_tt_addTPBlocked = true;
            }
        }
    }
}


zd_tt_elementSelector.prototype.mouseover = function(e) {
    if (e.target.localName != "use" && e.target.localName != "svg") {
        var nameSpan = zdaTTcheckHighlighter(e.target);
        var ElementListener = findInnerElements("zdtt_sidePanelHost", e.target);
        var TooltipListener = findInnerElements("Chrome_Extension_showContentId", e.target);
        var insertOption = findInnerElements('ze_link', e.target);
        var inserplurOption = findInnerElements('KB_Editor_Overlay', e.target);
        if (ElementListener != true && TooltipListener != true && insertOption != true && inserplurOption != true && nameSpan != true) {
            if (this.prvsElems != undefined && this.prvsElems != null) {
                this.prvsElems.className = this.prvsElems.className.split(" zohodesk-Tooltip-currentShad").join("");
            }
            if (e.target != document) {
                this.prvsElems = e.target;
            }
            if (this.prvsElems) {
                if (this.prvsElems.className.indexOf("configureElementsClass") == -1) {
                    this.prvsElems.className += " zohodesk-Tooltip-currentShad";
                }
            }
        }
    }
};

zd_tt_elementSelector.prototype.mousedown = function(e) {
    var ElementListener = findInnerElements("zdtt_sidePanelHost", e.target);
    var TooltipListener = findInnerElements("Chrome_Extension_showContentId", e.target);
    var insertOption = findInnerElements('ze_link', e.target);
    var inserplurOption = findInnerElements('KB_Editor_Overlay', e.target);
    var nameSpan = zdaTTcheckHighlighter(e.target);
    if (ElementListener != true && TooltipListener != true && insertOption != true && inserplurOption != true && nameSpan != true) {
        this.Editor(e);
        e.preventDefault();
        e.stopPropagation();
    }
};

zd_tt_elementSelector.prototype.mouseupEvent = function(e) {
    var nameSpan = zdaTTcheckHighlighter(e.target);
    var ElementListener = findInnerElements("zdtt_sidePanelHost", e.target);
    var insertOption = findInnerElements('ze_link', e.target);
    var inserplurOption = findInnerElements('KB_Editor_Overlay', e.target);
    if (ElementListener != true && insertOption != true && inserplurOption != true && nameSpan != true) {
        // e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();
    }
};


zd_tt_elementSelector.prototype.click = function(e) {
    var nameSpan = findInnerElements('zdaTTtriggerHighlighter', e.target);
    var ElementListener = findInnerElements("zdtt_sidePanelHost", e.target);
    var TooltipListener = findInnerElements("Chrome_Extension_showContentId", e.target);
    var insertOption = findInnerElements('ze_link', e.target);
    var inserplurOption = findInnerElements('KB_Editor_Overlay', e.target);
    if (this.selectedStatus) {
        if(this.tempElemPath){
            this.elementsArrayCreater({
                "type": "add",
                "elemSelector": this.tempElemPath
            });
            this.tempElemPath = undefined;
        }
        if (zd_tt_arrayOfElements.length < 5) {
            zdttAddTrigerPointer().bind();
        } else {
            var noteText = zdttContainers.zdtt_sidepanelSwitchingComp.querySelector("#zd_tt_elementAlertBox");
            if (noteText) {
                if (noteText.className.indexOf("mesaageHideAnim") == -1) {
                    noteText.className += " mesaageHideAnim";
                }
            }
            if (zdtt_elementSelectorObj) {
                zdtt_elementSelectorObj.detachClickListener();
            }
            if (zdttContainers.addTrigerCancelBtn.className.indexOf("zohodesk-Tooltip-hide") == -1) {
                zdttContainers.addTrigerCancelBtn.className += " zohodesk-Tooltip-hide";
            }
        }
        let successMsg = zdttContainers.zdtt_sidepanelSwitchingComp.querySelector("#zdtt_triggerSelectedMsg");
        successMsg.className = successMsg.className.split(" zohodesk-Tooltip-hide").join("");
        setTimeout(function() {
            if (successMsg.className.indexOf("zohodesk-Tooltip-hide") == -1) {
                successMsg.className += " zohodesk-Tooltip-hide";
            }
        }, 2800);
        this.selectedStatus = false;
    }
    if (ElementListener != true && TooltipListener != true && insertOption != true && inserplurOption != true && nameSpan != true) {
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();
    }
};

zd_tt_elementSelector.prototype.dblclick = function(e) {
    document.removeEventListener('click', this.click, true);
    e.target.click();
    document.addEventListener('click', this.click, true);
};

zd_tt_elementSelector.prototype.attachListeners = function() {
    document.addEventListener("mouseover", this.mouseover, true);
    document.addEventListener("mousedown", this.mousedown, true);
    document.addEventListener("mouseup", this.mouseupEvent, true);
    document.addEventListener("click", this.click, true);
    document.addEventListener("dblclick", this.dblclick, true);
};

zd_tt_elementSelector.prototype.detachClickListener = function() {
    document.removeEventListener("mouseover", this.mouseover, true);
    document.removeEventListener("mousedown", this.mousedown, true);
    document.removeEventListener("mouseup", this.mouseupEvent, true);
    document.removeEventListener("click", this.click, true);
    document.removeEventListener("dblclick", this.dblclick, true);
};


function zdtt_getParentElementFC(e) {
    if (e.localName != "use" && e.localName != "svg") {
        if (e.className.indexOf("zohodesk-Tooltip-Configureborder") != -1) {
            return e;
        } else {
            return zdtt_getParentElementFC(e.parentElement);
        }
    } else {
        return zdtt_getParentElementFC(e.parentElement);
    }
}

/* element select function revamp end */


function withoutSidepanelEditOpt(obj) {
    var sidePanelElem = zdttContainers.zdtt_sidePanelDirectChild;
    var obj = obj;
    return function(e) {
        e.preventDefault();
        e.stopPropagation();
        zd_tt_removeMouseOverElements();
        if (zdtt_lastHighlightedObj != undefined) {
            delete zdtt_lastHighlightedObj["dontEdit"];
        }
        zdtt_lastHighlightedObj = obj;
        zdtt_lastHighlightedObj["dontEdit"] = true;
        zd_TT_sidePanelViewed = true;
        if (sidePanelElem.className.indexOf("zohodesk-Tooltip-hide") != -1) {
            sidePanelElem.className = sidePanelElem.className.split(" zohodesk-Tooltip-hide").join("");
        }
        var maximizeIcon = zdtt_minimizeIconHost.shadowRoot.querySelector("#maxiIcon");
        if (maximizeIcon) {
            if (maximizeIcon.className.indexOf("zohodesk-Tooltip-hide") == -1) {
                maximizeIcon.className += " zohodesk-Tooltip-hide";
            }
        }
        zdUpdateTrigger(obj)();
        zdATTupdatedElemetsHighlighter(obj);
    }
}


function dragElement(elmnt, parentElem) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    elmnt.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation()
    }

    function dragMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
        e = e || window.event;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.addEventListener("mouseup", closeDragElement, true);
        document.addEventListener("mousemove", elementDrag, true);
    }

    function elementDrag(e) {
        e.preventDefault();
        e.stopPropagation();
        e = e || window.event;
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        var elemDimentions = parentElem.getBoundingClientRect();
        if (parentElem.offsetTop - pos2 > 5) {
            if (((parentElem.offsetTop - pos2) + elemDimentions.height + 10) < window.innerHeight) {
                parentElem.style.top = (parentElem.offsetTop - pos2) + "px";
            }
        }
        if (parentElem.offsetLeft - pos1 > 10) {
            if (((parentElem.offsetLeft - pos1) + elemDimentions.width + 30) < window.innerWidth) {
                parentElem.style.left = (parentElem.offsetLeft - pos1) + "px";
            }
        }
    }

    function closeDragElement() {
        document.removeEventListener("mouseup", closeDragElement, true);
        document.removeEventListener("mousemove", elementDrag, true);
    }
}

function minimiseZDTTsidePanel() {
    var maximizeElem = zdtt_minimizeIconHost.shadowRoot.querySelector("#maxiIcon");
    maximizeElem.style.zIndex = editerBodyZI;
    dragElement(maximizeElem.querySelector("#zdtt_dragDiv"), maximizeElem);
    zd_TT_sidePanelViewed = false;
    objInitializer();
    zd_tt_removeMouseOverElements();
    var sidePanelParent = zdttContainers.zdtt_sidePanelDirectChild;
    if (sidePanelParent != undefined) {
        sidePanelParent.className += " zohodesk-Tooltip-hide";
    }
    maximizeElem.className = maximizeElem.className.split(" zohodesk-Tooltip-hide").join("")
    if (zdtt_elementSelectorObj != undefined) {
        zdtt_elementSelectorObj.detachClickListener();
        zdtt_elementSelectorObj = undefined;
    };
    _zdattElemHighlighter.multipleTooltipHighlighter(TriggerListAllObjMaintanense);
}

function getConfiguredWalkthroughList(filter = "") {
    var currentPathName = encodeURI(decodeURI(window.location.pathname));
    lastLoadingElem = zdttLoading(zdttContainers.zdtt_sidepanelSwitchingComp);
    lastLoadingElem.inject();

    let url = "https://" + commomDomainNameForAPI + "/api/v1/asapExtensions/" + ExtensionProjectId + "/walkthrough?" + filter + "&orgId=" + organitationID ;
    let getConfiguredWalkthroughList_successCB = getConfiguredWalkthroughList_successCBmaker(currentPathName);
    zdaTTcommonAPIcaller(url,"get",getConfiguredWalkthroughList_successCB);
}

function getSingleWalkthrougDetails(walkthroughId,callBack,filter=""){
    let url = "https://" + commomDomainNameForAPI + "/api/v1/asapExtensions/" + ExtensionProjectId + "/walkthrough/"+walkthroughId + "?" + filter + "&orgId=" + organitationID ;
    let singleGuideDataGetterCB = singleGuideDataGetterCBmaker(callBack);
    zdaTTcommonAPIcaller(url,"get",singleGuideDataGetterCB);
}

function deleteSingleWalkthrougDetails(walkthroughId, callBack,itsCurrentPageGuide=false, filter = "") {
    return function() {
        let url = "https://" + commomDomainNameForAPI + "/api/v1/asapExtensions/" + ExtensionProjectId + "/walkthrough/" + walkthroughId + "?" + filter + "&orgId=" + organitationID ;
        let singleGuideDeleteCB = singleGuideDeleteCBmaker(walkthroughId,callBack,itsCurrentPageGuide);
        zdaTTcommonAPIcaller(url,"del",singleGuideDeleteCB,undefined,undefined,undefined,undefined);
    }
}

function maximizeSidePanel(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.className && e.target.className == "zohodesk-Tooltip-draggableDiv") {
        return
    } else if ((typeof(e.target.className) == "string") && e.target.className.trim() == "") {
        return
    }
    zd_tt_removeMouseOverElements();
    var sidePanelElem = zdttContainers.zdtt_sidePanelDirectChild;
    if (sidePanelElem.className.indexOf("zohodesk-Tooltip-hide") != -1) {
        sidePanelElem.className = sidePanelElem.className.split(" zohodesk-Tooltip-hide").join("");
    }
    var maximizeIcon = zdtt_minimizeIconHost.shadowRoot.querySelector("#maxiIcon");
    if (maximizeIcon != undefined) {
        maximizeIcon.className += " zohodesk-Tooltip-hide";
    }
    zd_tt_triggerListInitiater(listOfTriggersObj);
    if (zdtt_elementSelectorObj != undefined) {
        zdtt_elementSelectorObj.detachClickListener();
        zdtt_elementSelectorObj = undefined;
    };
    if (lastObjectOfUpdatedTriggerFUB != undefined) {
        zdttElementEventRemover(lastObjectOfUpdatedTriggerFUB);
        Chrome_Extension_RequireFunctionFlow([lastObjectOfUpdatedTriggerFUB]);
    }
    listTabClicked();
}

function createGuideCall(obj, type, id, cb=()=>{}) {
    if (type == "new") {
        let url = "https://" + commomDomainNameForAPI + "/api/v1/asapExtensions/" + ExtensionProjectId + "/walkthrough?orgId=" + organitationID;
        let createGuideCall_successCB = createGuideCall_successCBmaker(cb);

        if(obj.messages.length>1){
            zdaTTcommonAPIcaller(url,"post",createGuideCall_successCB,guideCreateUpdadeFailedCB,obj,'',"editorBody");
        }
        else{
            lastLoadingElem.remove();
            createToolTipErrorPopupBox({
                id: "editorBody",
                buttons: [{
                    content: "Ok"
                }],
                content: "Must two triggers needed .Go back and configure the trigger and comeback to create guide ."
            });
        }
    } else if (type == "update") {
        if (obj.url) {
            delete obj.url
        }
        if (obj.isEnabled != undefined) {
            delete obj.isEnabled
        }
        let url = "https://" + commomDomainNameForAPI + "/api/v1/asapExtensions/" + ExtensionProjectId + "/walkthrough/" + id + "?orgId=" + organitationID;;
        let updateGuideCall_successCB = updateGuideCall_successCBmaker(cb);
        if(obj.messages.length>1){
            zdaTTcommonAPIcaller(url,"patch",updateGuideCall_successCB,guideCreateUpdadeFailedCB,obj,'',"editorBody");
        }
        else{
            lastLoadingElem.remove();
            createToolTipErrorPopupBox({
                id: "editorBody",
                buttons: [{
                    content: extensionI18N.get('desk.asap.extention.ok')
                }],
                content: extensionI18N.get('desk.asap.extention.guides.formpage.notooltipsavemessage')
            });
        }
    }
}

function longNimberConverter (value) {
    var suffixes = ["", "k", "m", "b","t"];
    var suffixNum = Math.floor((""+value).length/3);
    var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
    if (shortValue % 1 != 0) {
        var shortNum = shortValue.toFixed(1);
    }
    return shortValue+suffixes[suffixNum];
}


function i18nManager(i18nContents){
    this._i18n = i18nContents
}

i18nManager.prototype.get = function(key) {
    if(this._i18n){
        return this._i18n[key];
    }
};



/* element hight lighter code :- */


function _elementHighLighter(){
    this.elements = [];

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.multipleTooltipHighlighter = this.multipleTooltipHighlighter.bind(this);
    this.singleTooltipHighlighter = this.singleTooltipHighlighter.bind(this);
    this.singleElemHighlighter = this.singleElemHighlighter.bind(this);
    this.highlight = this.highlight.bind(this);
    this.changeName = this.changeName.bind(this);
}
_elementHighLighter.prototype.add = function(elem) {
    if(elem){
        this.elements.push(elem);
    }
};
_elementHighLighter.prototype.remove = function() {
    for(let i=0 ; i<this.elements.length ; i++){
        let targElem = this.elements[i];
        if(targElem){
            let targElemParnent = targElem.parentElement;
            if(targElemParnent){
                targElemParnent.removeChild(targElem);
            }
        }
    }
    this.elements = [];
};

_elementHighLighter.prototype.multipleTooltipHighlighter = function(obj) {
    if(obj){
        for(let i=0 ; i<obj.length ; i++){
            this.singleTooltipHighlighter(obj[i],true);
        }
    }
};
_elementHighLighter.prototype.singleElemHighlighter = function(selector,crntObj,neededEdit=false,needDelete=false){
    if(!needDelete){
        let elem = document.querySelector(selector);
        if(elem){
            this.highlight(elem,crntObj,neededEdit,needDelete);
        }
    }
    else{
        this.highlight(selector,crntObj,neededEdit,needDelete);
    }
};

_elementHighLighter.prototype.singleTooltipHighlighter = function(currentObj,neededEdit=false,needDelete=false) {
    var ind = 0;
    for (triggers of currentObj.triggers) {
        var triggerElement = document.querySelector(triggers.element);
        if (zdtt_nowStatus == "update") {
            needDelete = true;
        }
        this.singleElemHighlighter(triggers.element,currentObj,neededEdit,needDelete)
        ind++
    }
};

_elementHighLighter.prototype.highlight = function( element ,crntObj, neededEdit=false , needDelete=false ) {
    let top = 0;
    let left = 0;
    let ospTop = 0;
    let ospLeft = 0;

    let dele;
    let editIcon;
    let elemPath;
    if(typeof(element)=="string"){
        elemPath = element;
        element = document.querySelector(element);
    }

    let offsetParentElem = element.offsetParent;
    let dimentions = this.getCssProperty(element);
    let cloneParent = offsetParentElem;
    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);

    do {
        ospTop += cloneParent.offsetTop || 0;
        ospLeft += cloneParent.offsetLeft || 0;
        cloneParent = cloneParent.offsetParent;
    } while (cloneParent);

    let highlightLayer = domElement.create({
        elemName: "span",
        attributes: {
            class: "zohodesk-Tooltip-Configureborder",
            id: "zdaTTtriggerHighlighter",
            style: `top:${top - ospTop}px;left:${left - ospLeft}px;width:${dimentions.width}px;height:${dimentions.height}px;position:absolute;`
        },
        parent: offsetParentElem
    });

    if (needDelete) {
        let triggerEvent = "HOVER";
        if(typeof(crntObj.triggers)=="object" && crntObj.triggers.length){
            triggerEvent = crntObj.triggers["0"].event;
        }
        var delCallBack = removeHighlightedElemFromObj( elemPath, triggerEvent , zdtt_elementSelectorObj );
        var deleteIcon = domElement.create({
            elemName: "svg",
            attributes: {
                class: "zohodesk-Tooltip-deleteIcn"
            },
            elementData: {
                innerHTML: `<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#delete"></use>`
            }
        })
        deleteIcon.style.display = "block";
        dele = domElement.create({
            elemName: "span",
            attributes: {
                class: "zohodesk-Tooltip-deleteIcn-cont"
            },
            elementData: {
                child: [deleteIcon]
            },
            callbackList: [{
                click: delCallBack.bind(this)
            }]
        });
    }


    if (neededEdit) {
        var editSVGIcon = domElement.create({
            elemName: "svg",
            attributes: {
                class: "zohodesk-Tooltip-deleteIcn",
                style: "display:block"
            },
            elementData: {
                innerHTML: `<use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#edit'></use></use>`
            }
        })
        editIcon = domElement.create({
            elemName: "span",
            attributes: {
                class: "zohodesk-Tooltip-deleteIcn-cont"
            },
            elementData: {
                child: [editSVGIcon]
            },
            callbackList: [
                {
                    click: withoutSidepanelEditOpt(crntObj)
                },
                {
                    mousedown: zdattJustPrevent
                },
                {
                    mouseup:zdattJustPrevent
                }
            ]
        });
    }
    let name;
    if(crntObj.name){
        name = crntObj.name.trim()!="" ? crntObj.name.trim() : extensionI18N.get('desk.asap.extention.triggers.tooltipname')
    }
    else{
        name = extensionI18N.get('desk.asap.extention.triggers.tooltipname');
    }

    let nameSpan = domElement.create({
        elemName: "span",
        attributes: {
            class: "zohodesk-Tooltip-ConfigureCnt",
        },
        elementData: {
            innerHTML: `<span id='zdattTTname'>${name}<span>`,
            child:[dele,editIcon]
        },
        parent: highlightLayer
    });
    this.add(highlightLayer);
};

_elementHighLighter.prototype.changeName = function(n){
    let name = extensionI18N.get('desk.asap.extention.triggers.tooltipname');
    if(n){
        name = n.trim()!="" ? n.trim() : extensionI18N.get('desk.asap.extention.triggers.tooltipname')
    }
    this.elements.forEach(function(elem,ind,arrayOfElem){
        if(elem){
            let nameSpan = elem.querySelector("#zdattTTname");
            if(nameSpan){
                nameSpan.innerHTML = name ;
            }
        }
    });
};

_elementHighLighter.prototype.getCssProperty = function(element) {
    let elemDimentions = element.getBoundingClientRect();
    return {
        width:elemDimentions.width,
        height:elemDimentions.height
    }
};


var _zdattElemHighlighter = new _elementHighLighter();








/* common API caller function */ 

function zdaTTcommonAPIcaller(url, type) {
    const scb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};
    const fcb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : () => {};
    const payload = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    const arg = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
    const errorPopupParentId = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : undefined;

    let response;

    if (type == "get") {
        response = requestAPI(url).get();
    } 
    else if (type == "post") {
        response = requestAPI(url).post(arg, payload);
    } 
    else if (type == "put") {
        response = requestAPI(url).put(arg, payload);
    } 
    else if (type == "del") {
        response = requestAPI(url).del();
    } 
    // else if(type=="attach"){

    // }
    else if (type == "patch") {
        response = requestAPI(url).patch(arg, payload);
    }

    response.then(res => {
        if (res.responseStatus == 200 || res.responseStatus == 201 || res.responseStatus==204) {
            scb(res);
        }
        else if(res.responseStatus == 401 || res.responseStatus == 403){
            createToolTipErrorPopupBox({
                id:errorPopupParentId,
                buttons: [{
                    id: "zd_tt_permissionErrors",
                    content: "ok",
                    callbackList: [{
                        mousedown: closeEPwithcloseExtension
                    }]
                }],
                content: "You are not authenticated to perfom this operation. Please check if sign in the "+commomDomainNameForAPI+" in this same portal ."
            });
        }
        else if(res.responseStatus == 502){
            createToolTipErrorPopupBox({
                id:errorPopupParentId,
                buttons: [{
                    id: "zd_tt_permissionErrors",
                    content: "ok",
                    callbackList: [{
                        mousedown: closeEPwithcloseExtension
                    }]
                }],
                content: res.obj.message
            });
        }
        else {
            fcb(res);
            createToolTipErrorPopupBox({
                id:errorPopupParentId,
                buttons: [{
                    id: "zd_tt_ok",
                    content: "ok"
                }],
                content: res.obj.message
            });
        }
    });
}