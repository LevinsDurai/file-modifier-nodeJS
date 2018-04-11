function createGuideAllUI(parent) {
    this.lastPage = undefined;
    this.parent = parent;
    this.tempDemoUrl = undefined;
    this.type = "new";
    this.source;
    this.wlkThghId = undefined;
    this.filterStatus = "ALL";
    this.active = [];
    this.unactive = [];
    this.allGuide = [];

    this.containers = {
        form: {
            header: {
                child: {}
            },
            topBody:{

            },
            body: {
                child: {
                    footer: {}
                }
            }
        },
        empty: {
            createGuide: {},
            viewList: {}
        },
        list: {
            top: {
                add:{},
                filter:{}
            },
            bottom: {}
        }
    };
    this.create = this.create.bind(this);

    this.emptyGuideListPageCreater = this.emptyGuideListPageCreater.bind(this);
    this.guideFormPageUICreater = this.guideFormPageUICreater.bind(this);
    this.guideListPageCreater = this.guideListPageCreater.bind(this);

    this.allGuideListUI = this.allGuideListUI.bind(this);
    this.guideListLiCreater = this.guideListLiCreater.bind(this);
    this.openViewAllGuidePage = this.openViewAllGuidePage.bind(this);
    this.guideListUpdateCBCreater = this.guideListUpdateCBCreater.bind(this);

    this.hideEmptyPage = this.hideEmptyPage.bind(this);
    this.hideFormPage = this.hideFormPage.bind(this);
    this.hideListPage = this.hideListPage.bind(this);
    this.hideElem = this.hideElem.bind(this);

    this.showEmptyPage = this.showEmptyPage.bind(this);
    this.showFormPage = this.showFormPage.bind(this);
    this.showListPage = this.showListPage.bind(this);
    this.showElem = this.showElem.bind(this);

    this.createGuideBtnCallBack = this.createGuideBtnCallBack.bind(this);
    this.guideTriggersListUI = this.guideTriggersListUI.bind(this);

    this.getPageGuides = this.getPageGuides.bind(this);
    this.liCreater = this.liCreater.bind(this);

    this.guideSaveObjSelector = this.guideSaveObjSelector.bind(this);
    this.saveGuide = this.saveGuide.bind(this);

    this.deactiveteLi = this.deactiveteLi.bind(this);
    this.activeteLi = this.activeteLi.bind(this);
    this.activeDeactiveLiCallBack = this.activeDeactiveLiCallBack.bind(this);


    this.isbefore = this.isbefore.bind(this);
    this.dragenter = this.dragenter.bind(this);
    this.dragstart = this.dragstart.bind(this);
    this.addDragEvents = this.addDragEvents.bind(this);
    this.removeDragEvents = this.removeDragEvents.bind(this);

    this.updateGuidePageEventsBinder = this.updateGuidePageEventsBinder.bind(this);

    this.updateNumbers = this.updateNumbers.bind(this);
    this.updateDeactiveFirstNode = this.updateDeactiveFirstNode.bind(this);
    this.updateActiveLastNode = this.updateActiveLastNode.bind(this);

    this.addActiveObj = this.addActiveObj.bind(this);
    this.removeActiveObj = this.removeActiveObj.bind(this);
    this.updateActiveObj = this.updateActiveObj.bind(this);

    this.stateUpdater = this.stateUpdater.bind(this);


    this.cancelGuide = this.cancelGuide.bind(this);

    this.addGuidePageEventsBinder = this.addGuidePageEventsBinder.bind(this);

    this.viewDemoCB = this.viewDemoCB.bind(this);
    this.viewDemoCBBinder = this.viewDemoCBBinder.bind(this);

    this.temporaryViewDemoObjSelector = this.temporaryViewDemoObjSelector.bind(this);

    this.viewAllGuideEnableCheck = this.viewAllGuideEnableCheck.bind(this);
    this.guideListFilterCreater = this.guideListFilterCreater.bind(this);

    this.guideListFilterCBcreater = this.guideListFilterCBcreater.bind(this);
}

createGuideAllUI.prototype.stateUpdater = function(key, value) {
    this[key] = value;
};

createGuideAllUI.prototype.create = function() {
    this.emptyGuideListPageCreater();
    this.guideListPageCreater();
    this.guideFormPageUICreater();

};

createGuideAllUI.prototype.createGuideBtnCallBack = function() {
    if(!this.allGuide.length){
        this.hideEmptyPage(this.showFormPage);
    }
    else{
        this.hideListPage(this.showFormPage);   
    }
    this.guideTriggersListUI("new");
};

createGuideAllUI.prototype.openViewAllGuidePage = function(fromFormPage) {
    return function() {
        var tempCB = this.hideEmptyPage;
        if (fromFormPage == true) {
            tempCB = this.hideListPage;
        }
        if (this.allGuide.length) {
            this.allGuideListUI(this.allGuide, tempCB);
        } else {
            this.hideFormPage(this.showEmptyPage, "zdTTslideRight");
        }
    }.bind(this)
};

createGuideAllUI.prototype.guideListUpdateCBCreater = function(obj) {
    return function() {
        lastLoadingElem = zdttLoading(this.containers.list.parent);
        lastLoadingElem.inject({
            pzi: 999999,
            ptop: 0
        });
        getSingleWalkthrougDetails(obj.id, lastLoadingElem.remove.bind(lastLoadingElem))
    }.bind(this)
};

createGuideAllUI.prototype.allGuideListUI = function(objs, cb) {
    this.containers.list.bottom.ul.innerHTML = "";
    for (obj of objs) {
        var li = this.guideListLiCreater(obj);
        if (li) {
            this.containers.list.bottom.ul.appendChild(li);
        }
    }
    if(cb){
        cb(this.showListPage, "zdTTslideRight");
    }
};

createGuideAllUI.prototype.viewDemoCBBinder = function(url) {
    if (typeof(url) == "string") {
        return function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.viewDemoCB(url);
        }.bind(this);
    } else if (this.tempDemoUrl) {
        this.viewDemoCB(this.tempDemoUrl, true, this.temporaryViewDemoObjSelector(this.active));
    }
}

createGuideAllUI.prototype.viewDemoCB = function(url, tempDemoMode, messages) {
    var optionUrl = "";
    if (tempDemoMode) {
        localStorage.setItem( "zdattTempDemoPath" , window.location.pathname );
        localStorage.setItem( "zdattWTDmessages" , JSON.stringify(messages) );
    }
    window.open(url , '_blank');
};

createGuideAllUI.prototype.guideListLiCreater = function(obj) {
    if(this.filterStatus == "CREATED_BY_ME"){
        if(!(obj.createdBy.id==zdTT_user.proId)){
            return null
        }
    }
    var triggerList = this.getPageGuides(obj.url);
    var liCB = this.guideListUpdateCBCreater(obj);
    var nameBoard = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-ArticleName zdattGuideName",
            title: obj.name
        },
        elementData: {
            innerHTML: obj.name
        }
    });
    var triggerCount = domElement.create({
        elemName: "div",
        attributes: {
            class: "zdtlistObj"
        },
        elementData: {
            innerHTML: `<span>` + longNimberConverter(parseInt(triggerList.length)) + `</span> Triggers`
        }
    });
    var viewDemoBtnContent = domElement.create({
        elemName: "span",
        attributes: {
            class: "zohodesk-tooltip-guide-listpage-ViewDemo"
        },
        callbackList: [{
            click: this.viewDemoCBBinder(obj.name)
        }],
        elementData: {
            innerHTML: extensionI18N.get('desk.asap.extention.guides.preview')
        }
    });
    var viewDemoBtn = domElement.create({
        elemName: "div",
        attributes: {
            class: "zdtlistObj"
        },
        elementData: {
            child:[viewDemoBtnContent]
        }
    });
    var nextChild = domElement.create({
        elemName: "div",
        attributes: {
            class: "zdtwlkthrList zdtmt10"
        },
        elementData: {
            child: [triggerCount, viewDemoBtn]
        }
    });
    var directChild = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-columnone zdtw100"
        },
        elementData: {
            child: [nameBoard, nextChild]
        }
    });
    var li = domElement.create({
        elemName: "li",
        attributes: {
            class: "zohodesk-Tooltip-cl-both zohodesk-Tooltip-triggerlist zdtwalkthrough"
        },
        callbackList: [{
            click: liCB
        }],
        elementData: {
            child: [directChild]
        }
    });

    return li

};

createGuideAllUI.prototype.getPageGuides = function(url) {
    var gtList = [];
    var pagePath = encodeURI(decodeURI(window.location.pathname));
    if (url) {
        pagePath = url;
    }
    if (TriggerListAllObjMaintanense.length) {
        for (triggerObj of TriggerListAllObjMaintanense) {
            if (triggerObj.triggers["0"].url == pagePath) {
                gtList.push(Object.assign({}, triggerObj));
            }
        }
    }
    return gtList
};

/* object maintaning functions */

createGuideAllUI.prototype.addActiveObj = function(id) {
    for (var i = 0; i < this.unactive.length; i++) {
        if (this.unactive[i].id == id) {
            this.active.push(this.unactive.splice(i, 1)[0])
        }
    }
};
createGuideAllUI.prototype.removeActiveObj = function(id) {
    for (var i = 0; i < this.active.length; i++) {
        if (this.active[i].id == id) {
            this.unactive.push(this.active.splice(i, 1)[0])
        }
    }
};

createGuideAllUI.prototype.updateActiveObj = function() {
    var lis = this.containers.form.body.child.ul.querySelectorAll(".zdtDragdiv");
    var res = [];
    if (lis.length) {
        for (li of lis) {
            if (li) {
                if (JSON.parse(li.getAttribute("draggable"))) {
                    var id = li.getAttribute("zdatid");
                    if (id) {
                        for (var i = 0; i < this.active.length; i++) {
                            if (this.active[i].id == id) {
                                res.push(this.active.splice(i, 1)[0]);
                            }
                        }
                    }
                }
            }
        }
        this.active = res;
    }
};

/* object maintaning functions end */

createGuideAllUI.prototype.guideTriggersListUI = function(type, updateObj, url) {
    var ind = 1;
    this.containers.form.body.child.ul.innerHTML = "";
    if (type == "new") {
        var liveURL = encodeURI(decodeURI(window.location.origin + window.location.pathname));
        this.type = "new";
        this.active = this.getPageGuides();
        this.guideName = window.location.pathname;
        this.tempDemoUrl = liveURL;
        this.containers.form.header.child.guideTitle.innerHTML = decodeURI(this.guideName);
        this.containers.form.body.child.footer.remove.className = this.containers.form.body.child.footer.remove.className.split(" zohodesk-Tooltip-guideDeleteBtn").join("");
        this.containers.form.body.child.footer.remove.innerHTML = extensionI18N.get('desk.asap.extention.cancel');
        this.containers.form.body.child.footer.save.innerHTML = extensionI18N.get('desk.asap.extention.save');
        this.addGuidePageEventsBinder();
    } else if (type == "update") {
        this.type = "update";
        var pageTriggers = this.getPageGuides(url);
        this.guideName = url;
        this.active = [];
        for (var i = 0; i < updateObj.messages.length; i++) {
            for (var j = 0; j < pageTriggers.length; j++) {
                if (pageTriggers[j].id == updateObj.messages[i].id) {
                    this.active.push(pageTriggers.splice(j, 1)[0]);
                }
            }
        }
        if (pageTriggers.length) {
            this.unactive = pageTriggers;
        }
        if (updateObj.name) {
            this.containers.form.header.child.guideTitle.innerHTML = updateObj.name;
        }
        this.tempDemoUrl = encodeURI(decodeURI(updateObj.name));
        if(this.containers.form.body.child.footer.remove.className.indexOf("zohodesk-Tooltip-guideDeleteBtn")==-1){
            this.containers.form.body.child.footer.remove.className += " zohodesk-Tooltip-guideDeleteBtn";
        }
        this.containers.form.body.child.footer.remove.innerHTML = extensionI18N.get('desk.asap.extention.delete');
        this.containers.form.body.child.footer.save.innerHTML = extensionI18N.get('desk.asap.extention.update');
        this.updateGuidePageEventsBinder(updateObj);
        this.wlkThghId = updateObj.id;
    }
    if (this.active) {
        if (this.active.length) {
            for (obj of this.active) {
                this.liCreater(obj, this.containers.form.body.child.ul, ind, true);
                ind++
            }
        }
    }
    if (this.unactive) {
        if (this.unactive.length) {
            for (obj of this.unactive) {
                this.liCreater(obj, this.containers.form.body.child.ul, ind, false);
                ind++
            }
        }
    }

    if( !this.active.length && !this.unactive.length ){
        this.containers.form.body.child.ul.innerHTML=`<li>`+extensionI18N.get('desk.asap.extention.guides.formpage.notooltipcontent')+` <b>"`+decodeURI(this.guideName)+`"</b> </li>`;
    }

    if (this.type == "update") {
        this.hideListPage(this.showFormPage);
    }
};


createGuideAllUI.prototype.activeteLi = function(label, li) {
    this.addDragEvents(li);
    this.updateActiveLastNode(li);
    li.setAttribute("draggable", true);
    if (label.className.indexOf("active") == -1) {
        label.className += " active";
    }
    if (li.className.indexOf("active") == -1) {
        li.className += " active";
    }
    this.addActiveObj(li.getAttribute("zdatid"));
};


createGuideAllUI.prototype.deactiveteLi = function(label, li) {
    this.removeDragEvents(li);
    this.updateDeactiveFirstNode(li);
    li.setAttribute("draggable", false);
    label.className = label.className.split(" active").join("");
    li.className = li.className.split(" active").join("");
    this.removeActiveObj(li.getAttribute("zdatid"));
};


createGuideAllUI.prototype.activeDeactiveLiCallBack = function(label, li) {
    return function() {
        if (JSON.parse(li.getAttribute("draggable"))) {
            this.deactiveteLi(label, li);
        } else {
            this.activeteLi(label, li);
        }
    }.bind(this)
};

/* drag example code ... */

createGuideAllUI.prototype.isbefore = function(a, b) {
    if (a.parentNode == b.parentNode) {
        for (var cur = a; cur; cur = cur.previousSibling) {
            if (cur === b) {
                return true;
            }
        }
    }
    return false;
};

createGuideAllUI.prototype.dragenter = function(e) {
    if (this.isbefore(this.source, e.target)) {
        e.target.parentNode.insertBefore(this.source, e.target);
    } else {
        e.target.parentNode.insertBefore(this.source, e.target.nextSibling);
    }
};

createGuideAllUI.prototype.dragstart = function(e) {
    this.source = e.target;
    this.source.style.boxShadow = "0 0px 19px 1px rgba(0, 0, 0, 0.06), 1px 1px 19px 1px rgba(0, 0, 0, 0.05)";
    e.dropEffect = "move";
};
createGuideAllUI.prototype.dragover = function(e){
    e.dataTransfer.effectAllowed = 'move';
};

createGuideAllUI.prototype.updateDeactiveFirstNode = function(selectedLi) {
    var lis = this.containers.form.body.child.ul.querySelectorAll(".zdtDragdiv");
    if (lis.length) {
        for (li of lis) {
            if (li) {
                if (!JSON.parse(li.getAttribute("draggable"))) {
                    setTimeout(function() {
                        li.parentNode.insertBefore(selectedLi, li);
                        this.updateNumbers();
                    }.bind(this), 300);
                    return
                }
            }
        }
        setTimeout(function() {
            selectedLi.parentElement.appendChild(selectedLi);
            this.updateNumbers();
        }.bind(this), 300);
    }
};
createGuideAllUI.prototype.updateActiveLastNode = function(selectedLi) {
    var lis = this.containers.form.body.child.ul.querySelectorAll(".zdtDragdiv");
    if (lis.length) {
        for (var i = lis.length - 1; i > -1; i--) {
            var li = lis[i];
            if (li) {
                if (JSON.parse(li.getAttribute("draggable"))) {
                    setTimeout(function() {
                        li.parentNode.insertBefore(selectedLi, li.nextSibling);
                        this.updateNumbers();
                    }.bind(this), 300);
                    return
                }
            }
        }
        setTimeout(function() {
            selectedLi.parentElement.prepend(selectedLi);
            this.updateNumbers();
        }.bind(this), 300);
    }
};

createGuideAllUI.prototype.updateNumbers = function(e) {
    if (this.source) {
        this.source.style.boxShadow = "";
    }
    var ind = 1;
    var lis = this.containers.form.body.child.ul.querySelectorAll(".zdtDragdiv");
    if (lis.length) {
        for (li of lis) {
            if (li) {
                var child = li.querySelector(".zdtDragNum")
                if (child) {
                    child.innerHTML = ind;
                }
            }
            ind++
        }
    }
    this.source = undefined;
    this.updateActiveObj();
}

createGuideAllUI.prototype.addDragEvents = function(li) {
    li.addEventListener("dragenter", this.dragenter);
    li.addEventListener("dragstart", this.dragstart);
    li.addEventListener("dragend", this.updateNumbers);
    li.addEventListener("dragover",this.dragover);
};
createGuideAllUI.prototype.removeDragEvents = function(li) {
    li.removeEventListener("dragenter", this.dragenter);
    li.removeEventListener("dragstart", this.dragstart);
    li.removeEventListener("dragend", this.updateNumbers);
    li.removeEventListener("dragover",this.dragover)
};

/* drag example code end ... */

createGuideAllUI.prototype.liCreater = function(obj, parent, ind, activeStatus, cbs = []) {
    var liClass = "zdtDragdiv";
    var liId = obj.id;
    var draggable = false;
    var checkBoxClass = "zdtcheckbtnlabel";
    if (activeStatus) {
        draggable = true;
        checkBoxClass += " active";
        liClass += " active";
    }

    var triggerName = domElement.create({
        elemName: "div",
        attributes: {
            class: "zdtDragTxt fLeft"
        },
        elementData: {
            innerHTML: obj.name
        }
    });
    var sortableNo = domElement.create({
        elemName: "div",
        attributes: {
            class: "zdtDragNum fRight"
        },
        elementData: {
            innerHTML: ind.toString()
        }
    });

    var enableBtnSpan = domElement.create({
        elemName: "span",
        attributes: {
            class: "zdtcheckbtn"
        }
    });

    var enableBtnLabel = domElement.create({
        elemName: "label",
        attributes: {
            class: checkBoxClass
        },
        elementData: {
            child: [enableBtnSpan]
        }
    });


    var enableBtn = domElement.create({
        elemName: "div",
        attributes: {
            class: "zdtcheckbtnCont"
        },
        elementData: {
            child: [enableBtnLabel]
        }
    });

    var li = domElement.create({
        elemName: "li",
        attributes: {
            class: liClass,
            zdatid: liId,
            draggable: draggable
        },
        callbackList: cbs,
        elementData: {
            innerHTML: `<div class="zdtDragIcn fLeft"></div>`,
            child: [triggerName, sortableNo, enableBtn]
        },
        parent: parent
    });
    if (activeStatus) {
        this.addDragEvents(li);
    }


    enableBtnLabel.onclick = this.activeDeactiveLiCallBack(enableBtnLabel, li);
}

/* animated hiding page's code */


createGuideAllUI.prototype.hideElem = function(elem) {
    
    if (elem.className.indexOf("zohodesk-Tooltip-hide") == -1) {
        elem.className += " zohodesk-Tooltip-hide";
    }
    
};
createGuideAllUI.prototype.hideEmptyPage = function(callBack, cls = "zdattSlideLeft") {
    setTimeout(function() {
        this.hideElem(this.containers.empty.parent);
        if (callBack) {
            callBack();
        }
    }.bind(this), 00);
};
createGuideAllUI.prototype.hideFormPage = function(callBack, cls = "zdattSlideLeft") {
    this.tempDemoUrl = undefined;
    setTimeout(function() {
        this.hideElem(this.containers.form.parent);
        if (callBack) {
            callBack();
        }
    }.bind(this), 00);
};

createGuideAllUI.prototype.hideListPage = function(callBack, cls = "zdattSlideLeft") {
    setTimeout(function() {
        this.hideElem(this.containers.list.parent);
        if (callBack) {
            callBack();
        }
    }.bind(this), 00);
};



/* animated hiding page's code */

createGuideAllUI.prototype.cancelGuide = function() {
    if (this.lastPage) {
        if (this.lastPage == "EmptyPage") {
            this.hideFormPage(this.showEmptyPage, "zdTTslideRight");
        } else if (this.lastPage == "ListPage") {
            this.openViewAllGuidePage(true)();
        }
    } else {
        if (this.allGuide.length) {
            this.openViewAllGuidePage(true)();
        } else {
            this.hideFormPage(this.showEmptyPage, "zdTTslideRight");
        }
    }
};

/* animated showing page's code */


createGuideAllUI.prototype.showElem = function(elem) {
    elem.className = elem.className.split(" zohodesk-TriggerListParentUl").join("");
    if (elem.className.indexOf("zohodesk-Tooltip-hide") != -1) {
        elem.className = elem.className.split(" zohodesk-Tooltip-hide").join("");
    }
    elem.className +=" zohodesk-TriggerListParentUl";
};


createGuideAllUI.prototype.showEmptyPage = function() {
    this.lastPage = "EmptyPage";
    this.viewAllGuideEnableCheck();
    this.showElem(this.containers.empty.parent);
};
createGuideAllUI.prototype.showFormPage = function() {
    this.showElem(this.containers.form.parent);
};
createGuideAllUI.prototype.showListPage = function() {
    this.lastPage = "ListPage";
    this.showElem(this.containers.list.parent);
};


/* animated showing page's code */

createGuideAllUI.prototype.viewAllGuideEnableCheck = function() {
    if (this.containers.empty.viewList.button) {
        if (this.allGuide.length) {
            this.containers.empty.viewList.button.className = this.containers.empty.viewList.button.className.split(" zohodesk-Tooltip-panel-form-field-notallowed").join("");
        } else {
            if (this.containers.empty.viewList.button.className.indexOf("zohodesk-Tooltip-panel-form-field-notallowed") == -1) {
                this.containers.empty.viewList.button.className += " zohodesk-Tooltip-panel-form-field-notallowed";
            }
        }
    }
};

createGuideAllUI.prototype.emptyGuideListPageCreater = function() {
    var viewAllGuideCls = "zdtview-all";
    var emptyPageContent = `<div><svg class="zdtw30 zdth30 zdtgray2"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#zdtinfo"></use></svg></div><div class="zdtgray2 zdtfw500 zdtpdng40 zdtmt6 fn16">`+extensionI18N.get('desk.asap.extention.guides.empheading')+`</div><div class="zdtgray1 zdtpdng40 zdtmt24 fn14">`+extensionI18N.get('desk.asap.extention.guides.empcontent')+`</div>`;
    if (!this.allGuide.length) {
        viewAllGuideCls += " zohodesk-Tooltip-panel-form-field-notallowed";
    }
    var pageTriggersList = this.getPageGuides();
    var btnCB = {
        click: this.createGuideBtnCallBack
    };
    var btnContent = extensionI18N.get('desk.asap.extention.guides.createguide');
    if (pageTriggersList.length < 2) {
        btnContent = extensionI18N.get('desk.asap.extention.addtooltip');
        btnCB.click = addNewTabClicked;
        var cont = extensionI18N.get('desk.asap.extention.guides.empheadingwithonetrigger');
        if (!pageTriggersList.length) {
            cont = extensionI18N.get('desk.asap.extention.guides.empheadingwithnotrigger');
        }
        emptyPageContent = `<div><svg class="zdtw30 zdth30 zdtgray2"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#zdtinfo"></use></svg></div><div class="zdtgray2 zdtfw500 zdtpdng40 zdtmt6 fn16">` + cont + `</div><div class="zdtgray1 zdtpdng40 zdtmt24 fn14">`+extensionI18N.get('desk.asap.extention.guides.empcontentwithnotrigger')+`</div>`;
    }

    this.containers.empty.createGuide.button = domElement.create({
        elemName: "div",
        attributes: {
            class: "zdtbtn zdtbtn-success"
        },
        callbackList: [btnCB],
        elementData: {
            innerHTML: btnContent
        }
    });
    this.containers.empty.createGuide.parent = domElement.create({
        elemName: "div",
        attributes: {
            class: "zdtfnt0 zdtmt41"
        },
        elementData: {
            child: [this.containers.empty.createGuide.button]
        }
    });
    this.containers.empty.parent = domElement.create({
        elemName: "div",
        attributes: {
            class: "zdttxtAlgnCntr zdtmt180 zdtpdngt1 zohodesk-Tooltip-hide"    // add class Name for animation 'zdattSlideLeft'
        },
        elementData: {
            innerHTML: emptyPageContent,
            child: [
                this.containers.empty.createGuide.parent
                // , this.containers.empty.viewList.parent
            ]
        },
        parent: this.parent
    });
}

createGuideAllUI.prototype.temporaryViewDemoObjSelector = function(objs) {
    var result = [];
    for (obj of objs) {
        if(typeof(obj.preferences)=="string"){
            obj.preferences = JSON.parse(obj.preferences);
        }
        result.push({
            element: obj.triggers[0].element,
            content: obj.components["0"].content,
            bgColor: obj.preferences.bgColor
        });
    }
    return result
};

createGuideAllUI.prototype.guideSaveObjSelector = function(objs) {
    var result = [];
    for (obj of objs) {
        result.push({
            triggerId: obj.triggers["0"].id,
            id: obj.id
        });
    }
    return result
};

createGuideAllUI.prototype.updateGuidePageEventsBinder = function(objs) {
    let currentPage = false ;
    if(window.location.pathname == objs.url){
        currentPage = true;
    }
    this.containers.form.body.child.footer.remove.onclick = confirmationMessagePopup(extensionI18N.get('desk.asap.extention.guides.deleteconfirmation'),deleteSingleWalkthrougDetails(objs.id, this.openViewAllGuidePage,currentPage)) ;
};
createGuideAllUI.prototype.addGuidePageEventsBinder = function() {
    this.containers.form.body.child.footer.remove.onclick = this.cancelGuide;
}


createGuideAllUI.prototype.saveGuide = function() {
    lastLoadingElem = zdttLoading(this.containers.form.parent);
    lastLoadingElem.inject({
        pzi: 999999,
        ptop: 0
    });
    var walkThroughId;
    var payload = {};
    payload.isEnabled = true;
    payload.name = decodeURI(this.guideName);
    payload.messages = this.guideSaveObjSelector(this.active);
    payload.url = encodeURI(decodeURI(window.location.pathname));
    createGuideCall(payload, this.type, this.wlkThghId, this.openViewAllGuidePage);

};

createGuideAllUI.prototype.guideFormPageUICreater = function() {
    this.containers.form.header.child.backIcon = domElement.create({
        elemName: "div",
        attributes:{
            class:"zohodesk-Tooltip-TriggersTitle zohodesk-Tooltip-cl-both"
        },
        elementData: {
            innerHTML: `<div class="zohodesk-Tooltip-TriggersTitlelft"></div>`
        }
    });
    domElement.create({
        elemName: "span",
        elementData: {
            innerHTML: `<span class="zdtbckarowcont" style="vertical-align: sub;">
                <svg class="zdtbckarow" style="padding: 0px 0px;">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#zdtarrowleft"></use>
                </svg>
            </span>
            <span class="zdtbckarowtxt">`+extensionI18N.get('desk.asap.extention.back')+`</span>`
        },
        callbackList:[{
            click:this.cancelGuide
        }],
        parent : this.containers.form.header.child.backIcon.querySelector(".zohodesk-Tooltip-TriggersTitlelft")
    });

    this.containers.form.header.child.guideTitle = domElement.create({
        elemName: "div",
        attributes: {
            class: "zdtwlkthrheadlink"
        }
    });
    this.containers.form.header.parent = domElement.create({
        elemName: "div",
        attributes: {
            class: "zdtwlkthrhead"
        },
        elementData: {
            innerHTML: `<div class="zohodesk-att-urlName" >`+extensionI18N.get('desk.asap.extention.guides.url')+` : </div>`,
            child: [
                this.containers.form.header.child.guideTitle
            ]
        }
    });


    this.containers.form.body.child.ul = domElement.create({
        elemName: "ul",
        attributes: {
            class: "zohodesk-Tooltip-list zdtDragCont"
        }
    });
    this.containers.form.body.child.footer.remove = domElement.create({
        elemName: "div",
        attributes: {
            class: "zdtbtn"
        },
        elementData: {
            innerHTML: "Delete"
        }
    });
    this.containers.form.body.child.footer.save = domElement.create({
        elemName: "div",
        attributes: {
            class: "zdtbtn zdtbtn-success"
        },
        callbackList: [{
            click: this.saveGuide
        }],
        elementData: {
            innerHTML: "Save"
        }
    });
    this.containers.form.body.child.footer.demo = domElement.create({
        elemName: "div",
        attributes: {
            class: "zdtbtn"
        },
        callbackList: [{
            click: this.viewDemoCBBinder
        }],
        elementData: {
            innerHTML: `<span>`+extensionI18N.get('desk.asap.extention.guides.preview')+`</span>`
        }
    });
    this.containers.form.body.child.footer.parent = domElement.create({
        elemName: "div",
        attributes: {
            class: "zdtfnt0 zohoDeskAsapTTbtnContainer"
        },
        elementData: {
            child: [this.containers.form.body.child.footer.remove, this.containers.form.body.child.footer.demo, this.containers.form.body.child.footer.save]
        }
    });
    this.containers.form.body.parent = domElement.create({
        elemName: "div",
        attributes: {
            class: "zdtwlkthrbody"
        },
        elementData: {
            child: [this.containers.form.body.child.ul]
        }
    });
    this.containers.form.topBody.parent = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-guide-FormBody"
        },
        elementData: {
            child: [this.containers.form.header.parent , this.containers.form.body.parent]    // [this.containers.form.header.parent , themeOpt , this.containers.form.body.parent]
        }
    });


    this.containers.form.parent = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-Guide-formpage-parent zohodesk-Tooltip-panel-content zohodesk-Tooltip-trigger-content zdtOnBoarding zohodesk-Tooltip-hide",   // add this classname for animation 'zdTTslideRight'
            id: "zdttGuideForm"
        },
        elementData: {
            child: [ this.containers.form.header.child.backIcon , this.containers.form.topBody.parent , this.containers.form.body.child.footer.parent]
        },
        parent: this.parent
    });
}



createGuideAllUI.prototype.guideListFilterCBcreater = function(type){
    return function(){
        if(type!=this.filterStatus){
            this.filterStatus = type;
            this.allGuideListUI(this.allGuide);
            let filterOptText = (this.filterStatus == "CREATED_BY_ME") ? extensionI18N.get('desk.asap.extention.createdbyme') : extensionI18N.get('desk.asap.extention.all');
            this.containers.list.top.filter.parent.innerHTML = filterOptText;
        }
    }.bind(this);
};


createGuideAllUI.prototype.guideListFilterCreater = function(parent) {
    var filterOptText = (this.filterStatus == "CREATED_BY_ME") ? extensionI18N.get('desk.asap.extention.createdbyme') : extensionI18N.get('desk.asap.extention.all');
    this.containers.list.top.filter.parent = domElement.create({
        elemName: "span",
        attributes: {
            class: "zohodesk-Tooltip-panel-form-selectbox  zohodesk-Tooltip-CategoryName",
            id: "zguideFilterDropDown"
        },
        elementData: {
            innerHTML: filterOptText
        },
        parent: parent
    })
    let popup = domElement.create({
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
        parent: parent
    })
    let callBackOfAllBtn = this.guideListFilterCBcreater("ALL");
    let callBackOfcrtbymeBtn = this.guideListFilterCBcreater("CREATED_BY_ME");
    let allBtn = domElement.create({
        elemName: "li",
        attributes: {
            class: "zohodesk-Tooltip-dropdown-options"
        },
        elementData: {
            innerHTML: extensionI18N.get('desk.asap.extention.all')
        },
        callbackList: [{
            mousedown: callBackOfAllBtn
        }],
        parent: popup.querySelector(".zohodesk-Tooltip-list")
    })
    let crtByMeBtn = domElement.create({
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
    let popupCallback = zdtt_popupShow(popup);
    this.containers.list.top.filter.parent.onclick = popupCallback;
}













createGuideAllUI.prototype.guideListPageCreater = function() {
    this.containers.list.top.add.button = domElement.create({
        elemName: "span",
        attributes: {
            class: "zohodesk-asapTT-guideListPage-addBtn"
        },
        callbackList:[{click:this.createGuideBtnCallBack}],
        elementData: {
            innerHTML: extensionI18N.get('desk.asap.extention.add')
        }
    });
    this.containers.list.top.add.parent = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-TriggersTitlert"
        },
        elementData: {
            child: [this.containers.list.top.add.button]
        }
    });

    this.containers.list.top.parent = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-TriggersTitle"
        },
        elementData: {
            innerHTML: `<div class="zohodesk-Tooltip-TriggersTitlelft"><div class="zohodesk-Tooltip-Category"></div></div>`
        }
    });
    this.containers.list.top.parent.appendChild( this.containers.list.top.add.parent );
    this.guideListFilterCreater(this.containers.list.top.parent.querySelector(".zohodesk-Tooltip-Category"));
    this.containers.list.bottom.ul = domElement.create({
        elemName: "ul",
        attributes: {
            class: "zohodesk-Tooltip-list"
        }
    });
    this.containers.list.bottom.parent = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-panel-content zohodesk-Tooltip-trigger-content zdtOnBoardingList"
        },
        elementData: {
            child: [this.containers.list.bottom.ul]
        }
    });


    this.containers.list.parent = domElement.create({
        elemName: "div",
        attributes: {
            class: "zohodesk-Tooltip-guideListPage-Parent zohodesk-Tooltip-hide"
        },
        elementData: {
            child: [this.containers.list.top.parent, this.containers.list.bottom.parent]
        },
        parent: this.parent
    });
};