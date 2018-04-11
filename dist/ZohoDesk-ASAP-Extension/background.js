var cookiesObj;
var projectDisplay = true;
var msgOnLoad = true;
var tabId;
var commomDomainNameForAPI = "desk.zoho.com";
var mess = "";

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
            "zdttMsg": "zd_tt_asapTTenabledStatus"
        });
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var resp = {
            "zdttMsg": "invalidate query"
        }
        if (request.zdttMsg == "zd_ATTitsEnabledStatus") {
            if (request.data == true) {
                resp.zdttMsg = "deactiveTooltip";
            } else if (request.data == false) {
                resp.zdttMsg = "activeTooltip";
            }
            if (resp.zdttMsg == "activeTooltip") {
                chrome.browserAction.setIcon({
                    tabId: sender.tab.id,
                    path: zd_CONFIG.icon.active
                });
            } else {
                chrome.browserAction.setIcon({
                    tabId: sender.tab.id,
                    path: zd_CONFIG.icon.inactive
                });
            }
        }
        
        else if (request.zdttMsg == "getCookie") {
            var unique = {};
            var cook;
            var zd_tt_agentTicket    = getCookie({url: 'https://*.zoho.com',name: 'IAMAGENTTICKET'});
            var zz_tt_csrf           = getCookie({url: 'https://' + commomDomainNameForAPI,name: 'crmcsr'});

            Promise.all([zd_tt_agentTicket, zz_tt_csrf]).then(function(a) {
                unique.agent = a[0];
                unique.csrf = a[1];
                resp.zdttMsg = "cookieGet";
                resp.cookieValue = JSON.stringify(unique);

                chrome.tabs.query({
                    active: true,
                    currentWindow: true
                }, function(tabs) {
                    chrome.tabs.sendMessage(sender.tab.id, resp);
                });
            });
        }
        else if(request.zdttMsg == "zdtt_Inject_sidePanel_file"){
            filesInjecter(request.zdttMsg,sender);
        }
        if(request.zdttMsg != "getCookie" ){
            sendResponse && sendResponse(resp);
        }
    }
)


var zd_CONFIG = {
    icon: {
        active: {
            '19': 'Tooltip_enabled_icon.png',
            '38': 'Tooltip_enabled_icon.png'
        },
        inactive: {
            '19': 'Tooltip_disble_icon.png',
            '38': 'Tooltip_disble_icon.png'
        }
    }
};

function filesInjecter(fn,sender){
    switch (fn) {
        case "zdtt_Inject_sidePanel_file":
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, 
            function(tabs) {
                chrome.tabs.executeScript(sender.tab.id, {
                    file: "zdttExtensionBody.js"
                });
            });

    }
}

function getCookie(obj) {
    return new Promise(function(resolve, reject){
        chrome.cookies.get(
            obj,
            function(cookie) {
                if (cookie) {
                    resolve(cookie.value);
                }
                resolve('cookieNotFound');
            }
        );
    })
}
