var ZohoDeskEditor_Tooltip_EditorToolsList = ["bold", "italic", "underline", "forecolor", "fontSize", "alignoptions", "insertoptions"];
var chrome_addons_inner_text = "";
var lastSelectedColorOptionNode;
var LastFocusedBC = "white";

function callback(editorObj) {
    var deleteIt = true;
    editor = editorObj;
    for (i in editor.toolbarobject) {
        for (j = 0; j < ZohoDeskEditor_Tooltip_EditorToolsList.length; j++) {
            if (i == ZohoDeskEditor_Tooltip_EditorToolsList[j]) {
                deleteIt = false;
            }
        }
        if (deleteIt) {
            editor.toolbarobject[i].parentElement.parentElement.removeChild(editor.toolbarobject[i].parentElement);
        }
        deleteIt = true;
    }
    window.postMessage({
        type: "ZohoDesk_Addon_editerLoaded"
    }, "*");
}

function valueGeter() {
    chrome_addons_inner_text = editor.getContent()
    window.postMessage({
        type: "Editter_InnerContent_Changed",
        text: chrome_addons_inner_text
    }, "*");
}

function ZohoDesk_Editor_loadPage(cssPath) {
    var editerParentElem = zdttContainers.editorParent;
    if (editerParentElem) {
        if (editerParentElem.childElementCount === 0) {
            ZohoDeskEditor_Init.init(cssPath);
            ZohoDeskEditor.create({
                shadowElement: editerParentElem,
                content: chrome_addons_inner_text,
                callback: callback,
                contentChanged: valueGeter
            });
        }
    } else {
        console.log("%cEditor parent element is not founded...", "color: #f00000; font-size:15px;font-weight: 600;");
    }
}

function functionLoaderCheck() {
    if (ZohoDeskEditor_Init.init && ZohoDeskEditor.create) {
        ZohoDesk_Editor_loadPage('https://css.zohostatic.com/zde/v1.2/css/'); // old version is => zde_v2  ::::  (5.4.18) => url = https://css.zohostatic.com/support/1316166/css
    }
}