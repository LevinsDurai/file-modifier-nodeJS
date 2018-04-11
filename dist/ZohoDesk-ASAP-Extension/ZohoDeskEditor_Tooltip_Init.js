function ZohoDeskEditor_Init() {}

ZohoDeskEditor_Init.init = function( cssPath ,csrfParamName, csrfToken, hookToOrganize) {
    ZohoDeskEditor_Init.version = "v1.3";
    ZohoDeskEditor_Init.inlineQuotes = true;
    ZohoDeskEditor_Init.csrfCookieVal = csrfToken;
    ZohoDeskEditor_Init.csrfParamVal = csrfParamName;
    ZohoDeskEditor_Init.defaultFontSize = "10";
    ZohoDeskEditor_Init.defaultFontFamily = "ProximaNovaRegular, Arial, Helvetica, sans-serif";
    ZohoDeskEditor_Init.dropDownTopPadding = 11;
    ZohoDeskEditor_Init.dropDownLeftPadding = 5;
    ZohoDeskEditor_Init.slidebarClass = "KB_Editor_DropDown_Slidebar";
    var agt = navigator.userAgent.toLowerCase();
    ZohoDeskEditor_Init.is_ie = (agt.indexOf("ie") !== -1);
    ZohoDeskEditor_Init.is_safari = (agt.indexOf("safari") !== -1);
    ZohoDeskEditor_Init.is_opera = (agt.indexOf("opera") !== -1);
    ZohoDeskEditor_Init.is_mac = (agt.indexOf("mac") !== -1);
    ZohoDeskEditor_Init.loading = true;
	ZohoDeskEditor_Init.changedTools = ["fontfamily"];
    ZohoDeskEditor_Init.language = "en";
    ZohoDeskEditor_Init.useSameDomain = true;
    ZohoDeskEditor_Init.needplaintext = true;
    ZohoDeskEditor_Init.editorCSS = true;
    ZohoDeskEditor_Init.modeChange = undefined;
    ZohoDeskEditor_Init.spellcheckURL = 'lt.zoho.com';
    ZohoDeskEditor_Init.domain = document.domain;
    ZohoDeskEditor_Init.tabKeyHandling = true;
    ZohoDeskEditor_Init.needEditorFocus = false;
    ZohoDeskEditor_Init.removeInsertOptions = false;
    ZohoDeskEditor_Init.contextVal = "support";
    ZohoDeskEditor_Init.maxiconpath = 3;
    ZohoDeskEditor_Init.origin = encodeURI(decodeURI(window.location.origin));
    ZohoDeskEditor_Init.cssPath = cssPath;
    if(document.getElementsByClassName("zohoDesk_toolTipEditor_css").length===0){
        ZohoDeskEditor_Init.loadURL(ZohoDeskEditor_Init.cssPath+"ZohoDeskEditorTools.min.css", "css", "ZohoDeskCss");
    }

    ZohoDeskEditor_Init.toolbarOrder = [
        ["bold", "Bold (Ctrl+B)", "#KBEditortools_txtbold", "KBEditortools-txtbold"],
        ["italic", "Italic (Ctrl+I)", "#KBEditortools_txtitalic", "KBEditortools-txtitalic"],
        ["underline", "Underline (Ctrl+U)", "#KBEditortools_txtunderline", "KBEditortools-txtunderline"],
        ["forecolor", "Font color", "#KBEditortools_clrpick", "KBEditortools-clrpick"],
        ["heading", "Headings", "#KBEditortools_block_down_arrow", "KB_Editor_Bdr_div Text_Type"],
        ["fontSize", "Font size", "#KBEditortools_block_down_arrow", "KB_Editor_Bdr_div TextSize_Type"],
        ["alignoptions", "Align", "#KBEditortools_align_left", "KBEditortools-align-left"],
        ["insertoptions", "Insert options", "#KBEditortools_block_down_arrow", "KB_Editor_Bdr_div Insert_Type"],
        ["styletext", "Text Style", "#KBEditortools_txtbgclr", "KBEditortools-txtbgclr"]
    ];

    ZohoDeskEditor_Init.heading = [{
            "htm": "Heading 1",
            "datAttr": "h1"
        },
        {
            "htm": "Heading 2",
            "datAttr": "h2"
        },  
        {
            "htm": "Heading 3",
            "datAttr": "h3"
        },
        {
            "htm": "Normal",
            "datAttr": "p"
        }
    ];
    ZohoDeskEditor_Init.insertoptions = [{
            "htm": "Insert link",
            "datAttr": "link",
            "iconClass":"KBEditortools-insertlink",
            "svgId" : "#KBEditortools_insertlink"
        },
        {
            "htm": "Remove link",
            "datAttr": "unlink",
            "iconClass":"KBEditortools-removelink",
            "svgId" : "#KBEditortools_removelink"
                
        },
        {
            "htm": "Insert HTML",
            "datAttr": "object",
            "iconClass":"KBEditortools-embed2",
            "svgId" : "#KBEditortools_embed_2"
        },
        {
            "htm" : "Edit HTML",
            "datAttr" : "edithtml",
            "iconClass":"KBEditortools-embed2",
            "svgId" : "#KBEditortools_embed_2"
        }, 
        {
            "htm": "Insert table",
            "datAttr": "table",
            "iconClass":"KBEditortools-inserttable",
            "svgId" : "#KBEditortools_inserttable"
        },
        {
            "htm": "Insert horizontal rule",
            "datAttr": "inserthorizontalrule",
            "iconClass":"KBEditortools-hr",
            "svgId" : "#KBEditortools_hr"
        },
        {
            "htm": "Insert code",
            "datAttr": "code",
            "iconClass":"KBEditortools-code",
            "svgId" : "#KBEditortools_code"
        }
    ];
    ZohoDeskEditor_Init.align = [{
            "htm": "Align left",
            "datAttr": "justifyleft",
            "iconClass":"KBEditortools-align-left",
            "svgId" : "#KBEditortools_align_left"
        }, 
        {
            "htm": "Align right",
            "datAttr": "justifyright",
            "iconClass":"KBEditortools-align-right",
            "svgId" : "#KBEditortools_align_right"
        }, 
        {
            "htm": "Align justify",
            "datAttr": "justifyfull",
            "iconClass":"KBEditortools-align-justify",
            "svgId" : "#KBEditortools_align_justify"
        }, 
        {
            "htm": "Align center",
            "datAttr": "justifycenter",
            "iconClass":"KBEditortools-align-center",
            "svgId" : "#KBEditortools_align_center"
        }
    ];
    ZohoDeskEditor_Init.list = [{
            "htm": "Bullets",
            "datAttr": "insertunorderedlist",
            "iconClass":"KBEditortools-list-round",
            "svgId" : "#KBEditortools_list_round"
        },
        {
            "htm": "Numbering",
            "datAttr": "insertorderedlist",
            "iconClass":"KBEditortools-list-number",
            "svgId" : "#KBEditortools_list_number"
        } 
    ];

    ZohoDeskEditor_Init.indent = [{
            "htm": "Increase indent",
            "datAttr": "indent",
            "iconClass":"KBEditortools-increaseindent",
            "svgId" : "#KBEditortools_increaseindent"
        },
        {
            "htm": "Decrease indent",
            "datAttr": "outdent",
            "iconClass":"KBEditortools-decreaseindent",
            "svgId" : "#KBEditortools_decreaseindent"
        } 
    ];

    ZohoDeskEditor_Init.others = [{
            "htm": "Check spelling",
            "datAttr": "spellcheck"
        }, 
        {
            "htm": "Plain text mode",
            "datAttr": "switchmode"
        } 
    ];

    ZohoDeskEditor_Init.attachDrop = [{
            "clk": function(editor) {
                editor.uploadImage("load");
                if (ZohoDeskEditor_Init.needEditorStats) {
                    editor.updateCount("image");
                }
            },
            "htm": "Upload",
            "iconClass" : "KBEditortools-upload",
            "svgId" : "#KBEditortools_upload"
        }, 
        {
            "clk": function(editor) {
                callZDOCSAttachViewer(docsObj,'inline');
            },
            "htm": "Gallery",
            "iconClass" : "KBEditortools-image",
            "svgId" : "#KBEditortools_image"
        }, 
        {
            "clk": function(editor) {
                editor.uploadImage("url");
                if (ZohoDeskEditor_Init.needEditorStats) {
                    editor.updateCount("image");
                }
            },
            "htm": "URL",
            "iconClass" : "KBEditortools-sphere",
            "svgId" : "#KBEditortools_sphere"
        } 
    ];

    ZohoDeskEditor_Init.fontSize = [{
            "htm": "8",
            "datAttr": "1"
        },
        {
            "htm": "10",
            "datAttr": "2"
        },
        {
            "htm": "12",
            "datAttr": "3"
        },
        {
            "htm": "14",
            "datAttr": "4"
        },
        {
            "htm": "18",
            "datAttr": "5"
        },
        {
            "htm": "24",
            "datAttr": "6"
        },
        {
            "htm": "36",
            "datAttr": "7"
        }
    ];

};
ZohoDeskEditor_Init.loadURL = function(URL, type, id) {
	var zdttRootElem = zdtt_sidePanelHost;
    var css,

        _script,

        _document = zdttRootElem ? zdttRootElem.shadowRoot : document;

    if(id && document.getElementById(id)){

    return;

    }

    if (type === "css") {

        css = document.createElement("link");

        css.type = 'text/css';

        css.rel = 'stylesheet';

        css.href = URL;

        css.setAttribute("id",id);

        _document.appendChild(css.cloneNode(true));
        document.head.appendChild(css.cloneNode(true));

    } else if (type === "js") {

        _script = document.createElement("script");

        _script.type = "text/javascript";

        _script.src = URL;

        _script.setAttribute("id",id);

        _document.appendChild(_script);

    }

};

