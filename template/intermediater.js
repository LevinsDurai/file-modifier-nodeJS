var domMessageListenerScript = `window.addEventListener("message", function(event) {
    if (event.data.name == "UrlCheck") {
        if (typeof(window.ZohoHCAsap) != "undefined") {
            if(typeof(window.ZohoHCAsapReady)=="undefined"){
                window.ZohoHCAsapReady = function(a) {
                if (window.ZohoHCAsap__asyncalls = window.ZohoHCAsap__asyncalls || [],
                    window.ZohoHCAsapReadyStatus) {
                    a && window.ZohoHCAsap__asyncalls.push(a);
                    for (var o = window.ZohoHCAsap__asyncalls, s = 0; s < o.length; s++) {
                        var e = o[s];
                        e && e()
                    }
                    window.ZohoHCAsap__asyncalls = null;
                } else {
                    a && window.ZohoHCAsap__asyncalls.push(a)
                }
            };
            }
            function zAsapObjGetter() {
                var orgId = window.ZohoHCAsap._defaultoptions.myAppPortalId;
                var AsapId = window.ZohoHCAsap._defaultoptions.id;
                var AsapName = window.ZohoHCAsap._defaultoptions.name;
                var asapPortalIDforApi = window.ZohoHCAsap._defaultoptions._orgId;
                if(orgId&&AsapId&&AsapName&&asapPortalIDforApi){
                    window.postMessage({
                        type: "toolTip_orgId",
                        orgId: orgId,
                        AsapId: AsapId,
                        AsapName: AsapName,
                        asapPortalID: asapPortalIDforApi
                    }, "*")
                }
                else{
                    window.postMessage({
                        type: "ASAP_not_LOADED"
                    }, "*")
                }
            };
            zAsapObjGetter();
        } else {
            window.postMessage({
                type: "Asap_Not_Found"
            }, "*")
        }
    } 
    else if (event.data.name == "zdttArticleSearch") {
        if(typeof(window.ZohoHCAsap) != "undefined"){
            window.ZohoHCAsap.API.Kb.Articles.Search({
                    searchStr: event.data.searchStr
                }, function(response) {
                    if(response){
                        window.postMessage({
                            name: "articleSearchResult",
                            value: response.data
                        }, "*");
                    }
                    else{
                        window.postMessage({
                            name: "articleSearchResult",
                            value: "emptyResponse"
                        }, "*");
                    }
                },
                function(errResponse) {
                    // "console.log(errResponse)"
                }
            )
        }
    }

    else if (event.data.name == "SingleArticle") {
        if(typeof(window.ZohoHCAsap) != "undefined"){
            window.ZohoHCAsap.API.Kb.Articles.Get({
                    id: event.data.article
                }, function(response) {
                    if (response) {
                        window.postMessage({
                            name: "SingleArticleObject",
                            value: response
                        }, "*");
                    }
                },
                function(errResponse) {
                    // "console.log(errResponse)"
                }
            )
        }
    } else if (event.data.name == "GoAsapArticle") {
        if(typeof(window.ZohoHCAsap) != "undefined"){
            window.ZohoHCAsap.KB.Articles.Open({id: event.data.value});
        }
    } else if (event.data.name == "closeAsapWebApp") {
        if(typeof(window.ZohoHCAsap) != "undefined"){
            window.ZohoHCAsapReady(zdatt_closeASAP)
            window.localStorage.setItem('zdattTempDemoPath',window.location.pathname);
            window.ZohoHCAsap.Helper.closeGuide();
            delete window.localStorage.zdattTempDemoPath ;
        }
    } else if (event.data.name == "unregisterTheAsapTooltip") {
        if(typeof(window.ZohoHCAsap) != "undefined"){
            window.ZohoHCAsap.Helper.StopMessageListerners();
            window.ZohoHCAsap.Helper.RemovePageMessages( window.ZohoHCAsap.Helper.getPageMessagesList(encodeURI(decodeURI(window.location.pathname))) );
        }
    } else if (event.data.name == "zdttIsDisabled") {
        if(typeof(window.ZohoHCAsap) != "undefined"){
            if(window.zdatt_asapStatus){
                if(window.zdatt_asapStatus.hideLauncherIcon==false){
                    window.ZohoHCAsap.Actions.ShowLauncher();
                }
            }
            window.ZohoHCAsap.Helper.AddPageMessages( window.ZohoHCAsap.Helper.getPageMessagesList(encodeURI(decodeURI(window.location.pathname))) );
        }
    }
    else if(event.data.name == "elemSelected"){
        updater.updateInnerText({id:"pathShown",value:event.data.value});
    }
}, false);
function zdattViewMoreCB(id){
    if(typeof(window.ZohoHCAsap) != "undefined"){
        window.ZohoHCAsap.Actions.Kb.Articles.Open({articleId:id})
    }
}

function zdatt_closeASAP(){
    window.zdatt_asapStatus = ZohoHCAsap.Actions.GetSettings();
    if( window.zdatt_asapStatus ){
        if(window.zdatt_asapStatus.hideLauncherIcon==false){
            window.ZohoHCAsap.Actions.Close();
            window.ZohoHCAsap.Actions.HideLauncher();
        }
    }
}

`

var scriptTag = document.createElement("script");
scriptTag.type = "text/javascript";
scriptTag.appendChild(document.createTextNode(domMessageListenerScript));
document.head.appendChild(scriptTag);