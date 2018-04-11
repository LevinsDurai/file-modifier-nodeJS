function portalAPISuccessCB(res) {
    res = res.obj;
    zdTT_user.name = res.firstName + " " + res.lastName; // We are using 'zdTT_user.name' instead of the 'zdtt_userName'.
    zdTT_user.mId = res.emailId; // We are using 'zdTT_user.mId' instead of the 'zdtt_mailId'.
    zdTT_user.img = res.photoURL; // We are using 'zdTT_user.img' instead of the 'zdtt_userImg'.
    zdTT_user.proId = res.id; // We are using 'zdTT_user.proId' instead of the 'zdtt_myProId'.
    zdTT_user.id = res.profileId;

    extensionI18N = new i18nManager(i18n_en_contents);
    if (res.message == undefined) {
        let url = "https://" + commomDomainNameForAPI + "/api/v1/profiles/" + zdTT_user.id + "?orgId=" + organitationID;
        zdaTTcommonAPIcaller(url, "get", permissionCheckSuccessCB);
    }
}

function permissionCheckSuccessCB(res) {
    res = res.obj;
    if (res.permissions.setup.portal == true) {
        Chrome_Extension_GetExtension(AsapId, organitationID);
    } else {
        createToolTipErrorPopupBox({
            buttons: [{
                id: "zd_tt_permissionErrors",
                content: "ok",
                callbackList: [{
                    mousedown: closeEPwithcloseExtension
                }]
            }],
            content: "<b>You have no permission to configure this portal.</b> Please contact your PORTAL admin."
        });
    }
}

function getConfiguredMessageSuccessCB(res) {
    res = res.obj;
    if (zd_ATTitsEnabled) {
        Chrome_Extension_RequireFunctionFlow(res);
        ConfigureObjects = res;
        for (var x = 0; x < res.length; x++) {
            TriggerListAllObjMaintanense[x] = res[x];
        }
        listOfTriggersObj = res;
        if (res.length != 0) {
            ZDTT_topHeaderTapsCreater();
            listTabClicked();
        } else {
            zd_tt_triggerListInitiater([], lastLoadingElem);
        }
        chrome.runtime.sendMessage({
            "message": "updateCookie",
            "web": "desk",
            "cName": "crmcsr"
        });
    }
}

function GetExtensionSuccessCB(res) {
    res = res.obj;
    if (res[0] != undefined) {
        if (res[0].isEnabled) {
            ExtensionProjectId = res[0].id;
            Chrome_Extension_ExecuteEditor();
        } else {
            zdatt_enableExtensionApp(res[0].id, domainName);
        }
    } else {
        Chrome_Extension_AddExtension(AsapId, organitationID, AsapName, domainName);
    }
};

function addExtensionSuccessCB(res) {
    res = res.obj;
    if (res.data != "you_dontHave_A_permission") {
        if (res.isEnabled) {
            ExtensionProjectId = res.id;
            Chrome_Extension_ExecuteEditor();
        } else {
            zdatt_enableExtensionApp(res.id, encodeURI(decodeURI(window.location.hostname)));
        }
    } else {
        createToolTipErrorPopupBox({
            buttons: [{
                id: "zd_tt_permissionErrors",
                content: "ok",
                callbackList: [{
                    mousedown: closeEPwithcloseExtension
                }]
            }],
            content: "<b>You dont have a admin permission for this portal.</b> sorry Permission is denited."
        });
    }
};

function enableExtensionSuccessCB(res) {
    res = res.obj;
    ExtensionProjectId = id;
    Chrome_Extension_ExecuteEditor();
}

function updateArticleSearchBox_successCBGetter(elem) {
    return function(res) {
        res = res.obj;
        elem.disabled = false;
        elem.value = res.title;
        zd_tt_articleSelected = true;
        window.postMessage({
            name: "SingleArticleObject",
            value: res
        }, "*");
    }
}

function tooltipDataUpate_successCB(res) {
    res = res.obj;
    listOfTriggersObj[zd_tt_focusedElementInd] = res;
    if (lastObjectOfUpdatedTriggerFUB != undefined) {
        zdttElementEventRemover(lastObjectOfUpdatedTriggerFUB);
        lastObjectOfUpdatedTriggerFUB = undefined;
        Chrome_Extension_RequireFunctionFlow([res]);
    }
    listTabClicked(true);
    for (var w = 0; w < TriggerListAllObjMaintanense.length; w++) {
        if (TriggerListAllObjMaintanense[w].id == res.id) {
            TriggerListAllObjMaintanense[w] = res;
        }
    }
}

function tooltipDataSave_successCB(res) {
    res = res.obj;
    if (res.data == undefined) {
        ZDTT_topHeaderTapsCreater();
        Chrome_Extension_RequireFunctionFlow([res]);
        TriggerListAllObjMaintanense[TriggerListAllObjMaintanense.length] = res;
        listOfTriggersObj[listOfTriggersObj.length] = res;
        listTabClicked(true);
    }
}

function getConfiguredWalkthroughList_successCBmaker(currentPathName) {
    return function(res) {
        if (res.data && res.data == "emptyResponse") {
            lastLoadingElem.remove();
            guideUI.showEmptyPage()
        } else {
            let respectivePageHaveGuide = false;
            res = res.obj;
            guideUI.stateUpdater("allGuide", res.data);
            guideUI.allGuideListUI(res.data);
            for (obj of res.data) {
                if (currentPathName == obj.url) {
                    respectivePageHaveGuide = true;
                }
            }
            if (respectivePageHaveGuide) {
                if (guideUI.containers.list.top.add.parent.className.indexOf("zohodesk-Tooltip-hide") == -1) {
                    guideUI.containers.list.top.add.parent.className += " zohodesk-Tooltip-hide";
                }
            } else {
                guideUI.containers.list.top.add.parent.className = guideUI.containers.list.top.add.parent.className.split(" zohodesk-Tooltip-hide").join("");
            }
            lastLoadingElem.remove();
            guideUI.showListPage();
        }
    }
};

function createGuideCall_successCBmaker(cb) {
    return function(res) {
        res = res.obj;
        if (guideUI.containers.list.top.add.parent.className.indexOf("zohodesk-Tooltip-hide") == -1) {
            guideUI.containers.list.top.add.parent.className += " zohodesk-Tooltip-hide";
        }
        guideUI.stateUpdater("allGuide", [...guideUI.allGuide, res]);
        if (cb) {
            var val = cb();
            if (typeof(val) == "function") {
                val(true);
            }
        }
        lastLoadingElem.remove();
    }
}

function updateGuideCall_successCBmaker(cb) {
    return function(res) {
        res = res.obj;
        for (var j = 0; j < guideUI.allGuide.length; j++) {
            if (res.id == guideUI.allGuide[j].id) {
                guideUI.allGuide[j] = res;
            }
        }
        if (cb) {
            var val = cb();
            if (typeof(val) == "function") {
                val();
            }
        }
        lastLoadingElem.remove();
    }
}

function singleGuideDataGetterCBmaker(callBack) {
    return function(res) {
        res = res.obj;
        if (typeof(callBack) === "function") {
            callBack();
        }
        guideUI.guideTriggersListUI("update", res, res.url);
    }
}

function singleGuideDeleteCBmaker(walkthroughId, callBack, itsCurrentPageGuide) {
    return function(res) {
        if (itsCurrentPageGuide) {
            guideUI.containers.list.top.add.parent.className = guideUI.containers.list.top.add.parent.className.split(" zohodesk-Tooltip-hide").join("");
        }
        for (var j = 0; j < guideUI.allGuide.length; j++) {
            if (walkthroughId == guideUI.allGuide[j].id) {
                guideUI.allGuide.splice(j, 1)[0];
            }
        }
        if (callBack) {
            var val = callBack();
            if (typeof(val) == "function") {
                val();
            }
        }
    }
}

function getSnippetAPI_successCBmaker(article, obj, injectTheIframeValue, zd_tt_editerInnerConent) {
    return function(res) {
        if (res.obj.length != 0) {
            obj.components["0"].contentId = res.obj["0"].id;
            Chrome_Extension_ArticleSummary = res.obj["0"].snippet;
            lastArticleKBshortContent = res.obj["0"].snippet;
            if (zd_tt_editerInnerConent == "" || zd_tt_editerInnerConent == "<div><br></div>") {
                obj.components["0"].content = res.obj["0"].snippet;
                injectTheIframeValue.contentDocument.body.innerHTML = res.obj["0"].snippet;
            }
        } else {
            Chrome_Extension_ArticleSummary = article.summary;
            lastArticleKBshortContent = article.summary;
            if (zd_tt_editerInnerConent == "" || zd_tt_editerInnerConent == "<div><br></div>") {
                obj.components["0"].content = article.summary;
                injectTheIframeValue.contentDocument.body.innerHTML = "<div>" + article.summary + "</div>";
            }
        }
    }
}

function sessionLogOutCB() {
    closeEPwithcloseExtension();
}

/* fail case */

function zdattAPIfailCases(res) {
    res = res.obj;
    if (res.message == "MyZsupport is not accessible") {
        createToolTipErrorPopupBox({
            buttons: [{
                id: "zd_tt_permissionErrors",
                content: "ok",
                callbackList: [{
                    mousedown: closeEPwithcloseExtension
                }]
            }],
            content: "<b>You are not in the portal .</b> sorry Permission is denited."
        });
    } else if (res.message == "Invalid Value For Query Param orgId") {
        createToolTipErrorPopupBox({
            buttons: [{
                id: "zd_tt_permissionErrors",
                content: "ok",
                callbackList: [{
                    mousedown: closeEPwithcloseExtension
                }]
            }],
            content: "<b>unable to reach the server.</b> sorry try again some time later."
        });
    } else if (res.message == "Invalid Portal") {
        createToolTipErrorPopupBox({
            buttons: [{
                id: "zd_tt_permissionErrors",
                content: "ok",
                callbackList: [{
                    mousedown: closeEPwithcloseExtension
                }]
            }],
            content: "<b>You are not in the portal .</b> sorry Permission is denited."
        });
    } else if (res.message == "You do not have permission to access this portal") {
        createToolTipErrorPopupBox({
            buttons: [{
                id: "zd_tt_permissionErrors",
                content: "ok",
                callbackList: [{
                    mousedown: closeEPwithcloseExtension
                }]
            }],
            content: "<b>You are not in the portal .</b> sorry Permission is denited."
        });
    } else if (res.message == "Invalid Portal Unprocessable Entity") {
        createToolTipErrorPopupBox({
            buttons: [{
                id: "zd_tt_permissionErrors",
                content: "ok",
                callbackList: [{
                    mousedown: closeEPwithcloseExtension
                }]
            }],
            content: "<b>Invalid ASAP is installed .</b><br> ASAP is not loaded from <b>" + commomDomainNameForAPI + "</b> ."
        });
    } else if (res.errorMessage == "You are not authorized to access this resource.") {
        createToolTipErrorPopupBox({
            buttons: [{
                id: "zd_tt_permissionErrors",
                content: "ok",
                callbackList: [{
                    mousedown: closeEPwithcloseExtension
                }]
            }],
            content: "<b>You do not have the permissions required to configure the add-on.</b>"
        });
    } else {
        var win = window.open("https://accounts" + commomDomainNameForAPI.split(".")[1] + "." + commomDomainNameForAPI.split(".")[2] + "/login", '_blank');
        win.focus();
        closeEPwithcloseExtension();
    }
}

function tooltipDataSaveUpate_failCB() {
    let formParent = zdttContainers.zdtt_sidepanelSwitchingComp.querySelector(".zohodesk-Tooltip-panel-content");
    if (formParent != undefined && formParent != null) {
        if (formParent.className.indexOf("zohodesk-Tooltip-panel-contentplur") != -1) {
            formParent.className = formParent.className.split(" zohodesk-Tooltip-panel-contentplur").join("");
        }
    }
    lastLoadingElem.remove();
    zdttContainers.saveBtn.addEventListener("click", zdtt_saveTrigger, true);
}

function guideCreateUpdadeFailedCB() {
    lastLoadingElem.remove();
}