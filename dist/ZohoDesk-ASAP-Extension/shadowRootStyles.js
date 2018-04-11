var dropdownPopupStyle = `.zohodesk-Tooltip-Selectbox-dropdown{
    max-height:200px;
    overflow-y:auto
}
.zohodesk-displayBlock{
    display:block;
    animation:tooltip-fade 300ms;
    -o-animation:tooltip-fade 300ms;
    -ms-animation:tooltip-fade 300ms;
    -moz-animation:tooltip-fade 300ms;
    -webkit-animation:tooltip-fade 300ms;
    transition:transform .1s ease-in-out
}
@keyframes tooltip-fade{
    0%{
        opacity:0;
        -webkit-transform:translateY(-20px);
        transform:translateY(-20px)
    }
    100%{
        opacity:1;
        -webkit-transform:translateY(0px);
        transform:translateY(0px)
    }
}
@-moz-keyframes tooltip-fade{
    0%{
        opacity:0;
        -webkit-transform:translateY(-20px);
        transform:translateY(-20px)
    }
    100%{
        opacity:1;
        -webkit-transform:translateY(0px);
        transform:translateY(0px)
    }
}
@-webkit-keyframes tooltip-fade{
    0%{
        opacity:0;
        -webkit-transform:translateY(-20px);
        transform:translateY(-20px)
    }
    100%{
        opacity:1;
        -webkit-transform:translateY(0px);
        transform:translateY(0px)
    }
}`;
var loadingStyle = `@-webkit-keyframes spinAround{
    from{
        -webkit-transform:rotate(0deg)
    }
    to{
        -webkit-transform:rotate(360deg)
    }
}
@-moz-keyframes spinAround{
    from{
        -moz-transform:rotate(0deg)
    }
    to{
        -moz-transform:rotate(360deg)
    }
}
@keyframes spinAround{
    from{
        transform:rotate(0deg)
    }
    to{
        transform:rotate(360deg)
    }
}
.loading-area{
    position:absolute;
    text-align:center;
    width:100%;
    top:40%
}
.loading-content{
    width:45px;
    height:45px;
    display:inline-block;
    background-color:rgba(78,195,109,0.2);
    border-radius:50%;
    border:3px solid;
    border-color:#4ec36d transparent transparent;
    -webkit-animation:spinAround 1s linear infinite;
    -moz-animation:spinAround 1s linear infinite;
    animation:spinAround 1s linear infinite;
    position:relative;
    box-sizing:border-box
}
.loading-item{
    position:absolute;
    background-color:#fff;
    width:100%;
    height:100%;
    border-radius:50%;
    border:2px solid white;
    box-sizing:border-box
}`;
var filterHeader = `.zohodesk-Tooltip-dropdown-content-heading{
    font-size:15px!important;
    font-weight:500;
    padding:2px 20px
}
.zohodesk-Tooltip-dropdown-content{
    color:#455264
}
.zohodesk-Tooltip-Selectbox-dropdown-search .zohodesk-Tooltip-dropdown-content>ul .zohodesk-Tooltip-dropdown-options{
    letter-spacing:.4px;
    padding:6px 20px
}
.zohodesk-Tooltip-Selectbox-dropdown-search .zohodesk-Tooltip-dropdown-content{
    margin-top:10px
}
.zohodesk-Tooltip-dropdown-content>ul .zohodesk-Tooltip-dropdown-options{
    font-size:14px;
    padding:6px 20px;
    letter-spacing:.3px
}
.zohodesk-Tooltip-selectOptsContent .zohodesk-Tooltip-list{
    height:100%
}
.zohodesk-Tooltip-list .zohodesk-Tooltip-selectOpts{
    padding:12px 15px;
    border-bottom:2.5px solid transparent;
    transition:.2s cubic-bezier(0.18,0.89,0.32,1.28);
    font-size:14px !important;
    font-weight:100;
    box-sizing:border-box;
    height:100%;
    color:#8a95a4;
    letter-spacing:.7px;
    cursor:pointer
}
.zohodesk-Tooltip-lft-bar .zohodesk-Tooltip-list{
    display:inline-block
}
.zohodesk-Tooltip-list{
    margin:0;
    padding:0;
    list-style-type:none!important
}
.zohodesk-Tooltip-list li{
    list-style-type:none!important
}
.zohodesk-Tooltip-list .zohodesk-Tooltip-selectedOpts{
    border-bottom:2.5px solid #4ec36d;
    max-width:26%;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    color:#fff
}
ul.zohodesk-Tooltip-list li{
    background-image:none;
    margin-bottom:0!important
}
.zohodesk-Tooltip-Selectbox-dropdown-search .zohodesk-Tooltip-dropdown-content>ul .zohodesk-Tooltip-dropdown-options{
    letter-spacing:.4px;
    padding:6px 20px
}
.zohodesk-Tooltip-dropdown-content>ul .zohodesk-Tooltip-dropdown-options{
    font-size:14px;
    padding:6px 20px;
    letter-spacing:.3px
}
.zohodesk-Tooltip-dropdown-options>ul{
    list-style-type:disc;
    padding:0 0 0 30px
}
.zohodesk-Tooltip-dropdown-options:hover{
    background-color:#f6f7f7;
    color:#0f7df0;
    cursor:pointer
}
.zohodesk-Tooltip-dropdown-options-tree:hover{
    background-color:initial;
    color:initial
}
.zohodesk-Tooltip-dropdown-options-tree .zohodesk-Tooltip-dropdown-options{
    padding:6px 10px!important
}
.zohodesk-Tooltip-dropdown-options{
    display:block
}
.zohodesk-Tooltip-CategoryName{
    position:relative;
    display:inline-block;
    padding-right:15px;
    width:auto
}
.zohodesk-Tooltip-CategoryName:after{
    content:'';
    position:absolute;
    border:3px solid;
    border-color:#455264 transparent transparent transparent;
    left:auto;
    top:45%;
    margin-left:15px
}
.zohodesk-Tooltip-CategoryName .zohodesk-Tooltip-panel-form-selectbox{
    font-size:13px!important
}
.zohodesk-Tooltip-panel-form-selectbox{
    outline:0;
    display:inline-block;
    position:relative;
    cursor:pointer;
    font-size:14px!important;
    vertical-align:middle!important;
    color:#455264;
    letter-spacing:.7px
}
.zohodesk-Tooltip-form-field-icons+.zohodesk-Tooltip-panel-form-selectbox{
    width:90%;
    font-size:14px!important;
    cursor:pointer;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    padding-right:10px;
    box-sizing:border-box
}
.zohodesk-Tooltip-panel-form-selectbox:after{
    content:'';
    position:absolute;
    right:0
}
.zohodesk-Tooltip-TriggersTitle{
    background-color:#f3f5f5;
    border-bottom:1px solid #eee;
    padding:6px 20px 0;
    box-sizing:border-box;
    height:35px
}
.zohodesk-Tooltip-TriggersTitlelft{
    float:left;
    width:50%;
    font-size:14px;
    position: relative;
    top: 1px;
}
.zohodesk-Tooltip-TriggersTitlert{
    float:left;
    width:50%;
    padding:2px 0 3px 30px;
    color:#8996a0;
    font-size:13px;
    box-sizing:border-box;
    text-align:right
}
.zohodesk-Tooltip-Category{
    position:relative;
    line-height:normal !important
}
`;
var triggerList = `
.zohodesk-asapTT-triggerListPage-viewTitle{
    padding-left:25px;
}
.zohodesk-TriggerListParentUl{
    animation:listPageAnim 0.3s ease;
    transition:0.3s ease;
    letter-spacing:.3px
}
.zohodesk-Tooltip-triggerlist-FocusedTriggerDetails{
    background-color:#f3f5f5
}
.zohodesk-Tooltip-animat-left,.zohodesk-Tooltip-animat{
    opacity:.2;
    background-color:#fff;
    overflow:hidden
}
.zohodesk-Tooltip-animat{
    transform:translateX(100%);
    -webkit-animation:mymoveRight .6s;
    animation:mymoveRight .6s
}
.zohodesk-Tooltip-animat-left{
    transform:translateX(-100%);
    -webkit-animation:mymoveLeft .6s;
    animation:mymoveLeft .6s
}
.zohodesk-Tooltip-heightAnim{
    -webkit-animation:move .2s;
    animation:move .2s;
    overflow:hidden;
    height:0;
    visibility:hidden;
    padding:0!important;
    border:0!important
}
.zohodesk-Tooltip-animat:hover,.zohodesk-Tooltip-animat-left:hover{
    background-color:#fff
}
.zohodesk-Tooltip-triggerlist:hover .zohodesk-Tooltip-deleteIcn{
    display:inline-block
}
.zohodesk-Tooltip-triggerlist{
    padding:17px 20px;
    position:relative;
    border-bottom:1px solid #f1f3f4;
    transition:.2s ease-out;
    display:block
}
.zohodesk-Tooltip-triggerlist:hover{
    background-color:#f3f5f5;
    cursor:pointer
}
.zohodesk-Tooltip-columnone{
    float:left;
    width:100%;
    box-sizing:border-box
}
.zohodesk-Tooltip-ArticleName{
    font-size:16px;
    flex:1;
    padding:0 17px 0 0;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    font-weight: 700;
}
.zohodesk-Tooltip-AuthorName{
    color:#8996a0;
    font-size:13px;
    font-weight:400;
    max-width:86%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
.zohodesk-Tooltip-columntwo{
    float:left;
    width:30%;
    box-sizing:border-box;
    padding:0 0 10px 10px;
    text-align:right
}
.zohodesk-Tooltip-ArticleViews{
    color:#455264;
    font-size:15px;
    font-weight:700
}
.zohodesk-Tooltip-deleteIcn-cont .zohodesk-Tooltip-deleteIcn:hover{
    color:#fff
}
.zohodesk-Tooltip-deleteIcn{
    width:15px;
    height:15px;
    color:#8996a0;
    fill:currentColor;
    display:none;
    transition:.2s
}
.zohodesk-Tooltip-deleteIcn:hover{
    color:#455264
}
.zohodesk-Tooltip-triggerlist:hover .zohodesk-Tooltip-deleteIcn{
    display:inline-block
}
.zohodesk-Tooltip-deleteIcn+.zohodesk-Tooltip-deleteIcn{
    margin-left:15px
}
.zohodesk-Tooltip-columnthree{
    position:absolute;
    left: 71%;
    top: 20%;
}`;
var tabsStyles = `.zdattfw500{
     font-weight : 500 
}
.zohodesk-Tooltip-plurdiv{
    position:absolute;
    width:100%;
    height:100%;
    top:168px;
    left:0;
    background-color:rgba(255,255,255,0.73);
    box-sizing:border-box;
    cursor:not-allowed;
    z-index:9999
}
.zohodesk-Tooltip-selectOptsContent{
    padding:0 20px 0!important;
    height:45px;
    box-sizing:border-box
}
.zohodesk-Tooltip-selectOpts.zohodesk-Tooltip-greenclr{
    color:#4ec36d!important
}
.zohodesk-Tooltip-selectOptsContent{
    padding:0 20px 0!important;
    height:45px;
    box-sizing:border-box
}
.zohodesk-Tooltip-selectOpts{
    cursor:pointer;
    padding:4px 15px;
    border-bottom:2.5px solid transparent
}
.zohodesk-Tooltip-selectOpts+.zohodesk-Tooltip-selectOpts{
    margin-left:10px
}
.zohodesk-Tooltip-list .zohodesk-Tooltip-selectOpts:hover{
    border-bottom:2.5px solid #4ec36d;
    color:#fff;
    cursor:pointer
}
.zohodesk-Tooltip-hide{
    display:none!important
}`; 

var newEmpTrigStyle = `.zdtgrayDis{
    width:53%;
    margin:auto;
    color:#8996a0;
    font-size:13px;
    padding:0 85px
}
.zohodesk-Tooltip-dotActivated {
    transform: scale(1.1);
    background: #4ec36d !important;
    transition: .5s cubic-bezier(.4, 1.3, .65, 1)
}
.zdt-slideActive .zdt-slidemainIn {
    opacity: 1 !important
}
.zdt-slideActive {
    opacity: 1!important
}
.zdt-activeTrigList {
    border: 0;
}
.zohodesk-Tooltip-slidenext{
    transition: -webkit-transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), -webkit-box-shadow 0.5s;
    background:#fff;
    width:520px;
    height:290px;
    position:absolute;
    top:0;
    border-radius:5px;
    cursor:pointer;
    will-change:transform;
    transform-style:preserve-3d;
    perspective:1000px;
    opacity:0
}
.zohodesk-Tooltip-slidemain{
    padding:2px 30px 0 30px;
    float:left;
    width:calc(100% - 60px)
}
.zohodesk-Tooltip-slideIn{
    float:left;
    overflow-x:hidden;
    width:100%
}
.zohodesk-Tooltip-slidemainDiv{
    height:324px;
    box-sizing:border-box;
    margin:20px 0 30px
}
.zohodesk-Tooltip-slides ul{
    position:relative;
    list-style-type:none;
    margin:0;
    padding:0
}
.zohodesk-Tooltip-dotcircle{
    text-align:center;
    padding-top:17px
}
.zohodesk-Tooltip-dotcircleIn{
    height:6px;
    width:6px;
    background:#dadada;
    border-radius:100%;
    display:inline-block;
    cursor:pointer;
    margin-right:10px
}
.zdtfnt0{
    font-size:0
}
.zdtmt41{
    margin-top:41px
}
.zdtbtn .zdtEyeicn{
    display:inline-block;
    vertical-align:middle;
    width:20px;
    height:20px
}
.zdtbtn{
    width:125px;
    text-align:center;
    display:inline-block;
    padding:8px 0;
    border-radius:3px;
    background-color:#fff;
    border:1px solid #dcdfe2;
    color:#455264;
    font-size:14px;
    box-sizing:border-box;
    letter-spacing:.3px;
    cursor:pointer
}
.zdtbtn+.zdtbtn{
    margin:0 0 0 10px
}
.zdtbtn:hover{
    box-shadow:0 4px 5px 0 rgba(0,0,0,0.07)
}
.zdtbtn-success{
    background-color:#4ec36d;
    border-color:#4ec36d;
    box-shadow:0 2px 5px 0 rgba(78,195,108,0.49);
    color:#fff
}
.zdtbtn-success:hover{
    box-shadow:0 4px 5px 0 rgba(78,195,108,0.49)
}
.zdttxtAlgnCntr{
    text-align:center
}
.zohodesk-Tooltip-notrigsvg{
    padding-top:60px
}
.zohodesk-Tooltip-notrigHead{
    display:flex;
    justify-content:center;
    align-items:center
}
.zdtw18{
    width:18px
}
.zdth18{
    height:18px
}
.zdtw30{
    width:30px
}
.zdth30{
    height:30px
}
.zdtmt24{
    margin-top:24px
}
svg{
    fill:currentColor
}
.zdtgray2{
    color:#455264;
    font-size:18px
}
.zdtfw500{
    font-weight:500
}
.pl10{
    padding-left:10px
}`;

var emptyGuidePageStyle = `.zdtview-all{
    padding:0 0 14px
}
.zdtview-all:after{
    width:35%;
    height:2px;
    background-color:#4ec36d;
    bottom:0;
    left:calc(50% - 17.5%)
}
.zdtgray2,.zdtview-all:hover,.zdtwlkthrheadlink,.zdtDragCont,.zdtfltBtnclse,.zdtfltBtnTxt,.zdtbtn{
    color:#455264
}
.zdtcheckbtnlabel,.zdtbckarowcont,.zdtbckarowtxt,.zdtfltBtn,.zdtfltBtnclse,.zdtfltBody input[type="button"],.zdtbtn,.zdtview-all{
    cursor:pointer
}
.zdtEyeicnCont,.zdattSlideLeft,.zdTTslideRight,.zdtcheckbtnCont,.zdtDragIcn,.zdtblur,.zdtview-all{
    position:relative
}
.zdtcheckbtnlabel,.zdtcheckbtn,.zdtDragIcn::after,.zdtDragIcn::before,.zdtblur:after,.zdtIcnTitle,.zdtIcnTitle:after,.zdtview-all:after{
    position:absolute
}
.zdtview-all:after,.zdtDragdiv:after,.zdtfltBodyFooter:after,.zdtDragIcn::after,.zdtDragIcn::before,.zdtblur:after,.zdtIcnTitle:after{
    content:''
}
.zdtmt180{
    margin-top:180px
}
.zdtpdngt1{
    padding-top:1px
}
.zdtpdng40{
    padding:0 40px
}
.zdtmt6{
    margin-top:6px
}
.fn16{
    font-size:16px
}
.zdtgray1,.zdtview-all,.zdtwlkthrList .zdtlistObj,.zdtwlkthrhead span,.zdtbckarow{
    color:#8996a0
}
.zdtmt24{
    margin-top:24px
}
.fn14,.zdtwlkthrhead span,.zdtfltdiv,.zdtbtn,.zdtview-all{
    font-size:14px
}
.zdtEyeicnCont,.zdtEyeicnCont .zdtEyeicn,.zdtIcnTitle,.zdtIcnTitle:after,.zdtbtn,.zdtview-all{
    display: inline-block
}`;

var guideFormPageStyle = `


.zohodesk-Tooltip-DragLayer {
    position: relative;
    z-index: 1;
}.zohodesk-Tooltip-DragLayer::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    background-color: #cdf7d7;
    border: 1px dashed #4ec36d;
    box-sizing: border-box;
}


.zohodesk-Tooltip-guideDeleteBtn:hover{
    color: rgba(255,0,0,0.73);
    border: 1px solid rgba(255, 0, 0, 0.28);
}
.zohodesk-tooltip-guide-listpage-ViewDemo:hover{
    color: #4ec36d;
}
.zohodesk-tooltip-guide-listpage-ViewDemo{
    font-weight: 600;
}
.zohodesk-Tooltip-Guide-formpage-parent{
    display: flex;
    flex-direction: column;
}
.zohodesk-Tooltip-guide-FormBody{
    background-color:#fff;
    flex: 1;  
    overflow: auto;
}
.zohoDeskAsapTTbtnContainer{
    display: flex;
    align-items: center;
    height:70px;
    padding: 0 20px;
}
.zohoDeskAsapTTbtnContainer .zdtbtn{
    flex:1;
}
.zdtmb25{
    margin-bottom:25px
}
.zdtwlkthrbody{
    padding: 0 30px 35px;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between
}
.zdtDragCont{
    color:#8996a0;
    padding-top: 23px
}
.zdtcheckbtnCont{
    position: relative;
    width: 30px;
    height: 20px;
    float: right
}
.zdtDragdiv{
    font-size:15px;
    background-color:#fff;
    margin-top:6px;
    width:100%;
    height:50px;
    box-sizing:border-box;
    padding:15px;
    line-height:21px;
    border-radius:3px;
    opacity:.6;
    border:1px solid #eee;
}
.zdtDragdiv.active .zdtDragIcn,.zdtDragdiv.active .zdtDragIcn::after,.zdtDragdiv.active .zdtDragIcn::before{
    cursor:move
}
.zdtDragdiv.active{
    opacity:1;
    background-color:#f7f7f7
}
.zdtDragdiv:after,.zdtfltBodyFooter:after{
    display:block;
    content:'';
    clear:both
}
.zdtDragIcn{
    display:block;
    width:1px;
    height:20px;
    background-color:#e5e5e5;
    position:relative;
    cursor:not-allowed;
    margin-right:20px
}
.zdtDragdiv.active .zdtDragIcn,.zdtDragdiv.active .zdtDragIcn::after,.zdtDragdiv.active .zdtDragIcn::before{
    cursor:move
}
.zdtDragIcn::after,.zdtDragIcn::before{
    content:'';
    display:block;
    width:1px;
    height:20px;
    background-color:#e5e5e5;
    position:absolute;
    cursor:not-allowed;
    top:0
}
.zdtDragIcn::before{
    right:2px
}
.zdtDragIcn::after{
    left:2px
}
.fLeft{
    float:left
}
.zdtDragNum{
    font-weight:800;
    color:#c4cacf
}
.zdtDragTxt{
    letter-spacing:.7px
}
.fRight{
    float:right
}
.zdtcheckbtnlabel{
    background:#d7d9dd;
    position:absolute;
    transition:background-color .3s ease-in-out;
    cursor:pointer;
    border-radius:10px;
    height:12px;
    width:31px;
    top:4px;
    left:-18px
}
.zdtcheckbtnlabel.active{
    background-color:#3ac269
}
.zdtcheckbtnlabel.active .zdtcheckbtn{
    margin-left:13px
}
.zdtcheckbtnlabel.active .zdtcheckbtn{
    margin-left:13px
}
.zdtcheckbtn{
    position:absolute;
    z-index:2;
    background:#fff;
    border-radius:50%;
    top:0;
    left:0;
    box-shadow:0 1px 4px 0 #777;
    height:18px;
    margin-top:-3px;
    width:18px;
    transition:all .2s ease-in-out 0s
}
.slideLeftToCenter{
    animation:RightToCenterSlide .3s !important;
    position:relative;
    animation-fill-mode:forwards
}
@keyframes RightToCenterSlide{
    0%{
        right:100%
    }
    100%{
        right:0
    }
}
.slideRightToCenter{
    animation:LeftToCenterSlide .3s !important;
    position:relative;
    animation-fill-mode:forwards
}
@keyframes LeftToCenterSlide{
    0%{
        left:100%
    }
    100%{
        left:0
    }
}
.zdattSlideLeft{
    animation:leftslide .3s!important;
    position:relative!important;
    animation-fill-mode:forwards
}
@keyframes leftslide{
    0%{
        right:0
    }
    100%{
        right:100%
    }
}
.zdTTslideRight{
    animation:Rightslide .3s!important;
    position:relative!important;
    animation-fill-mode:forwards
}
@keyframes Rightslide{
    0%{
        left:0
    }
    100%{
        left:100%
    }
}
.zohodesk-Tooltip-panel-content{
    transition:.3s all ease
}
.zdtOnBoarding,.zdtOnBoardingList{
    overflow-x:hidden;
    overflow-y:auto;
    height:100%!important
}
.zdtOnBoarding{
    background-color:#f5f5f5!important
}
.zdtwlkthrhead{
    box-sizing:border-box;
    padding:18px 32px;
    word-wrap:break-word;
    background-color:#fff;
    border-bottom:1px solid #eee;
    display: flex;
    align-items: flex-start;
}
.zohodesk-att-urlName{
    letter-spacing:.3px;
    width: 9%;
    color: #aaa;
}
.zdtwlkthrhead span{
    display:inline-block;
    vertical-align:middle;
    color:#8996a0;
    font-size:14px
}
.zdtwlkthrheadlink{
    font-size:15px;
    color:#455264;
    flex: 1;
    word-break: break-word;
    letter-spacing:.3px
}
.zdtmt10{
    margin-top:10px
}
.zdtbckarowcont{
    border-radius:3px;
    width:16px;
    height:16px;
    line-height:15px;
    cursor:pointer;
    text-align:center
}
.zdtbckarow{
    color:#8996a0;
    fill:currentColor;
    width:14px;
    transition:.2s ease;
    height:16px
}
.zdtbckarow:hover{
    color:#222
}
.zdtbckarowtxt{
    cursor:pointer;
    letter-spacing:0.6px
}
.zdtDragCont{
    color:#8996a0;
    padding-top:23px!important
}
.zdtEyeicn{
    width:25px;
    height:25px;
    color:#fff;
    fill:currentColor
}
.zdtEyeicnCont{
    background-color:#4ec36d;
    border-radius:2px;
    display:inline-block;
    text-align:center;
    width:21px;
    height:20px;
    position:relative
}
.zdtEyeicnCont .zdtEyeicn{
    display:inline-block;
    vertical-align:text-top;
    width:15px;
    height:15px
}
.zdtbtn .zdtEyeicn{
    display:inline-block;
    vertical-align:middle;
    width:18px;
    height:18px;
    margin: -3px 3px 0 0;
}`;

var guideListPageStyle = `
.zohodesk-asapTT-guideListPage-addBtn{
    font-weight:700;
    cursor:pointer;
    letter-spacing:.7px
}
.zohodesk-asapTT-guideListPage-addBtn:hover{
    color: #4ec36d
}
.zdattGuideName{max-width: 100%!important;font-weight:100!important}.zohodesk-Tooltip-guideListPage-Parent{height:100%}.zdtw100{width:100%!important}.zdtwlkthrList .zdtlistObj{display: inline;font-size: 13px;font-weight: 400}.zdtlistObj + .zdtlistObj:before{content:"\\00B7";margin: 0 12px}.zdttxtAlgnCntr,.zdtIcnTitle,.zdtEyeicnCont,.zdtbckarowcont,.zdtwlkthrbody,.zdtbtn{text-align: center}
.zdtIcnTitle{
  top: 25px;
  left: calc(50% - 40px);
  width: 80px;
  background-color: #445163;
  color: #fff;
  border-radius: 3px;
  font-size: 12px;
  line-height: 1.6;
  z-index: 1;
  transition: opacity .2s ease-in-out,visibility .2s ease-in-out,transform .2s cubic-bezier(.71,1.7,.77,1.24);
  opacity: 0;
  visibility: hidden
}

.zdtIcnTitle:after{
  width: 1px;
  height: 1px;
  border: 4px solid;
  border-color: transparent;
  border-bottom-color: #445163;
  bottom: 100%;
  left: calc(50% - 4px)
}`;



var maximizeIcon = `.maximiseIco{
    width: 50px;
    height: 50px;
    background-color: #4ec36d;
    box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.2);
    position: absolute;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    top: 10px;
    left: auto;
    right: 30px;

    cursor: pointer;
}

.zohodesk-tooltip-svg-icon-maximize{
    fill: #fff;
    height: 26px;
    width: 26px;
}

.zohodesk-Tooltip-draggableDiv{
    width: 16px;
    height: 16px;
    border-radius: 10px;
    background-color: #5e6165;
    top: 0px;
    right: -2px;
    position: absolute;
    cursor: all-scroll;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: normal !important;
    flex: 1;
    font-size: 14px;
    flex-direction: column;
}
.zohodesk-Tooltip-draggableDiv svg{
  width:10px;
  height:10px;
  fill:#fff;
}.zohodesk-Tooltip-hide{display:none!important}
`;

var formPageStyles = `

.zohodesk-Tooltip-searchNoResultFound-Li{
    padding: 6px 20px;
    font-size: 14px;
}

.zohodesk-Tooltip-Update-triggerFormHeight{
    height: calc(100% - 87px)!important;
}

@keyframes zdttHide {
    from {
        opacity: 1
    }
    to {
        opacity: 0;
        height: 0;
        padding: 0;
        margin: 0
    }
}
.mesaageHideAnim{
    overflow: hidden;
    -webkit-animation: zdttHide .25s!important;
    -webkit-animation-fill-mode: forwards!important;
    animation: zdttHide .25s!important;
    animation-fill-mode: forwards!important;
}
@keyframes listPageAnim {
    0% {
        transform: translate3d(0px, 20px, 0px);
    }
    100% {
        transform: translate3d(0px, 0px, 0px);
    }
}

@keyframes MagSow {
    0% {
        opacity: 0;
        transform: scale(1.1)
    }
    100% {
        opacity: 1;
        transform: scale(1)
    }
}

.empty-trigger-content .zohodesk-Tooltip-form-button{
    padding:8px 20px;
    font-size:14px;
    margin-top:25px
}
.empty-trigger-content{
    top:30%
}
.emptytrigger{
    width:100px;
    height:100px
}
.empty-message{
    margin-top:5px;
    font-size:16px
}
.zohodesk-Tooltip-txtcntr{
    text-align:center
}
.zohodesk-Tooltip-form-button{
    background-color:#4ec36d;
    color:#fff;
    padding:8px 45px;
    border-radius:30px;
    font-size:16px;
    border:0;
    outline:0;
    cursor:pointer
}
@font-face{
    font-family:'zohodeskkbeditoroutertools';
    src:url('https://css.zohostatic.com/zde/v1.2/fonts/zohodeskkbeditoroutertools.woff?zd5mqc') format('woff'),url('https://css.zohostatic.com/zde/v1.2/fonts/zohodeskkbeditoroutertools.eot?zd5mqc'),url('https://css.zohostatic.com/zde/v1.2/fonts/zohodeskkbeditoroutertools.eot?zd5mqc#iefix') format('embedded-opentype'),url('https://css.zohostatic.com/zde/v1.2/fonts/zohodeskkbeditoroutertools.ttf?zd5mqc') format('truetype'),url('https://css.zohostatic.com/zde/v1.2/fonts/zohodeskkbeditoroutertools.svg?zd5mqc#zohodeskkbeditoroutertools') format('svg');
    font-weight:normal;
    font-style:normal
}
[class^="KBEditortools-"],[class*=" KBEditortools-"]{
    font-family:'zohodeskkbeditoroutertools'!important;
    speak:none;
    font-style:normal;
    font-weight:normal;
    font-variant:normal;
    text-transform:none;
    line-height:1;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale
}
.zd_tt_notfilledErrorStyle{
    box-shadow:rgba(255,0,0,0.22) 0 0 3px 1px;
    border-color:rgba(255,0,0,0.27)!important
}
[class^="zohodesk-Tooltip-"]{
    line-height:1.6!important;
    font-size:14px;
}
.zohodesk-Tooltip-panel-content{
    padding:10px 20px;
    box-sizing:border-box;
    background-color:#fff;
    overflow-x:hidden;
    overflow-y:auto;
    padding-top:0;
    height:calc(100% - 50px);
    flex:1;
}
.zohodesk-Tooltip-trigger-content{
    padding:0;
    height:calc(100% - 35px)
}
.zohodesk-Tooltip-panel-content::-webkit-scrollbar-thumb,.zohodesk-Tooltip-guide-FormBody::-webkit-scrollbar-thumb{
    background:rgba(69,82,100,0.21);
    border-radius:20px
}
.zohodesk-Tooltip-panel-content::-webkit-scrollbar,.zohodesk-Tooltip-guide-FormBody::-webkit-scrollbar{
    width:9px
}
.zohodesk-Tooltip-panel-content::-webkit-scrollbar-track,.zohodesk-Tooltip-guide-FormBody::-webkit-scrollbar-track{
    background:rgba(0,0,0,0.10);
    border-radius:0
}
.zohodesk-Tooltip-panel-headline-text{
    color:#455264;
    margin-bottom:8px;
    font-size:14px!important;
    letter-spacing:.5px;
    margin-top:20px
}
.zohodesk-Tooltip-matary{
    color:#ff6f64
}
.zohodesk-Tooltip-charactertxt{
    color:#8a95a4;
    font-size:12px;
    display:inline-block;
    text-transform:capitalize;
    margin-left:20px;
    letter-spacing:.35px
}
.zohodesk-Tooltip-multi-form-field .zohodesk-Tooltip-panel-form-field{
    margin-bottom:15px
}
.zohodesk-Tooltip-panel-contentplur{
    position:relative;
    overflow:hidden
}
.zohodesk-Tooltip-panel-contentplur .zohodesk-Tooltip-plurdiv{
    position:absolute;
    width:100%;
    height:100%;
    top:168px;
    left:0;
    background-color:rgba(255,255,255,0.73);
    box-sizing:border-box;
    cursor:not-allowed;
    z-index:9999
}
.zohodesk-Tooltip-panel-form-field{
    border:1px solid #dcdfe4;
    padding:7px 10px;
    border-radius:3px;
    position:relative;
    font-size:0;
    box-sizing:border-box
}
.zohodesk-Tooltip-text-box{
    vertical-align:middle;
    width:100%!important;
    color:#455264;
    display:inline-block!important;
    font-size:14px!important
}
.zohodesk-Tooltip-form-field-icons{
    display:inline-block;
    vertical-align:middle;
    margin-right:10px;
    position: relative;
    top: 3px
}
.zohodesk-Tooltip-form-field-icons+.zohodesk-Tooltip-text-box{
    width:92%!important
}
.zohodesk-Tooltip-input{
    border:0;
    outline:0;
    background-color:transparent;
    padding:0;
    margin:0;
    box-shadow:none;
    height:auto;
    text-align:left
}
input[type="text"].zohodesk-Tooltip-input::-webkit-input-placeholder{
    color:#8996a0;
    font-size:14px!important
}
.zd_tt_errorbox{
    animation: MagSow .3s ease both;
    -moz-animation: MagSow .3s ease both;
    -webkit-animation: MagSow .3s ease both;
    margin-top:2px;
    font-size:12px;
    color:rgba(255,0,0,0.73);
    font-weight:600;
    letter-spacing:.6px;
    display:block
}
.zohodesk-Tooltip-container{
    animation: MagSow .3s ease both;
    -moz-animation: MagSow .3s ease both;
    -webkit-animation: MagSow .3s ease both;
    margin-top:20px
}
.zohodesk-Tooltip-descriptionBox{
    padding:15px;
    box-sizing:border-box;
    background-color:#f0f9ff;
    border:1px solid #abe1ff;
    border-radius:3px
}
.zohodesk-Tooltip-descriptionBox-text{
    display:inline-block;
    vertical-align:middle;
    font-size:14px;
    letter-spacing:.5px;
    box-sizing:border-box
}
.zohodesk-Tooltip-button{
    background:0;
    border:0;
    outline:0;
    cursor:pointer;
    border-radius:4px;
    padding:6px 12px;
    font-size:13px;
    letter-spacing:.6px;
    text-transform:capitalize
}
.zohodesk-Tooltip-button span{
    letter-spacing:.65px;
    line-height:normal!important
}
.zohodesk-Tooltip-button+.zohodesk-Tooltip-button{
    margin-left:10px
}
.zohodesk-Tooltip-button-primary{
    display:inline-block;
    background-color:#f0f9ff;
    border:1px solid #abe1ff;
    color:#00a3fe
}
.zohodesk-Tooltip-button-secondary{
    background-color:#fff;
    border:1px solid #dcdfe4;
    color:#455264
}
.zohodesk-Tooltip-active{
    border-color:#3cd0f9!important;
    box-shadow:0 0 3px rgba(84,220,255,0.75)
}
.zohodesk-Tooltip-panel-form-field-notallowed{
    cursor:not-allowed!important;
    opacity:.5
}
.zdtt_numberCountSpan{
    background-color:#00a3fe;
    color:#abe1ff;
    width:20px;
    height:20px;
    border-radius:3px;
    margin-left:5px;
}
.zohodesk-Tooltip-button .zdtt_numberCountSpan{
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.zohodesk-Tooltip-hide{
    display:none!important
}
.zdtt-done{
    display:inline-block
}
.zohodesk-Tooltip-circlesvg{
    width:30px;
    height:30px;
    position:relative;
    display:inline-block;
    vertical-align:middle
}
.zohodesk-Tooltip-tick{
    z-index:8888;
    display:block;
    animation:check .2s;
    animation-delay:.8s;
    animation-fill-mode:forwards;
    transform:scaleX(-1) rotate(135deg);
    transform-origin:left top;
    border-right:2px solid transparent;
    border-top:2px solid transparent;
    content:'';
    display:block;
    height:8px;
    position:absolute;
    width:4px;
    top:15px;
    left:9.5px
}
@keyframes check{
    0%{
        border-color:#8ec343;
        height:0;
        width:0
    }
    6%{
        height:0;
        width:0
    }
    50%{
        width:4px;
        height:0
    }
    100%{
        border-color:#8ec343
    }
}
.zohodesk-Tooltip-part{
    width:100%;
    height:100%
}
.zohodesk-Tooltip-g{
    fill:none;
    stroke:#8ec343;
    stroke-width:2
}
.zohodesk-Tooltip-circle{
    cx:15;
    cy:15;
    r:10;
    stroke-dasharray:480px,480px;
    stroke-dashoffset:960px;
    -webkit-animation:checkmark-circle .6s ease-in-out backwards;
    animation:checkmark-circle .6s ease-in-out backwards
}
@keyframes checkmark-circle{
    0%{
        stroke-dashoffset:480px
    }
    100%{
        stroke-dashoffset:960px
    }
}
.zohodesk-Tooltip-selected{
    display:inline-block;
    vertical-align:middle;
    color:#455264;
    font-size:13px;
    opacity:1;
    visibility:visible;
    animation:show .2s;
    animation-delay:1s;
    animation-fill-mode:backwards;
    letter-spacing:.7px
}
@keyframes show{
    0%{
        opacity:0;
        visibility:hidden
    }
    100%{
        opacity:1;
        visibility:visible
    }
}
.zohodesk-Tooltip-cl-both:after{
    content:'';
    display:block;
    clear:both
}
.zohodesk-Tooltip-fl-lft{
    float:left
}
.icon{
    width:15px;
    height:15px
}
.zohodesk-tooltip-svg-icon{
    width:15px;
    height:15px
}
.zohodesk-Tooltip-Selectbox-dropdown{
    position:absolute;
    background-color:#fff;
    left:0;
    top:45px;
    width:100%;
    height:auto;
    box-shadow:0 3px 7px 2px rgba(0,0,0,0.1);
    z-index:9;
    box-sizing:border-box;
    padding:10px 0;
    border-radius:4px;
    line-height:1.75;
    display:none
}
.zohodesk-Tooltip-Selectbox-dropdown-search{
    padding:0 0 10px 0
}
.zohodesk-Tooltip-dropdown-header{
    padding:8px 10px;
    border-bottom:1px solid #e6e7e8
}
.zohodesk-Tooltip-search-icon{
    width:22px;
    height:22px;
    background-color:#1dca82;
    display:inline-block;
    color:#fff;
    border-radius:50%;
    font-size:11px!important;
    vertical-align:middle;
    text-align:center;
    line-height:2;
    cursor:pointer
}
.zohodesk-Tooltip-search-result{
    display:inline-block;
    vertical-align:middle;
    margin-left:10px;
    cursor:pointer;
    font-size:15px;
    width:89%
}
.zohodesk-Tooltip-editor-icontoprightsearch{
    line-height:2.3!important
}
.zohodesk-tooltip-svg-icon-small{
    width:12px;
    height:12px;
    color:#fff;
    fill:currentColor
}
.zohodesk-Tooltip-multi-form-field{
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -ms-flex-wrap:wrap;
    flex-wrap:wrap;
    -webkit-box-pack:justify;
    -ms-flex-pack:justify;
    justify-content:space-between;
    align-items:stretch
}
.zohodesk-Tooltip-fields{
    -ms-flex-preferred-size:46%;
    flex-basis:46%
}
.zohodesk-Tooltip-panel-form-field-label{
    margin-bottom:10px;
    color:#455264;
    font-size:14px!important;
    letter-spacing:.6px;
    margin-top:20px
}
.zohodesk-Tooltip-panel-form-selectbox{
    display:inline-block;
    position:relative;
    width:100%;
    cursor:pointer;
    font-size:14px!important;
    vertical-align:middle!important;
    color:#455264;
    letter-spacing:.7px
}
.zohodesk-Tooltip-panel-form-selectbox:after{
    content:'';
    position:absolute;
    border:5px solid;
    border-color:#455264 transparent transparent transparent;
    top:45%;
    right:0
}
.zohodesk-Tooltip-panel-form-selectbox-none{
    font-size:14px!important
}
.zohodesk-Tooltip-dropdown-content{
    color:#455264
}
.zohodesk-Tooltip-list{
    margin:0;
    padding:0;
    list-style-type:none!important
}
.zohodesk-Tooltip-list li{
    list-style-type:none!important
}
.zohodesk-Tooltip-dropdown-content>ul .zohodesk-Tooltip-dropdown-options{
    font-size:14px;
    padding:6px 20px;
    letter-spacing:.3px
}
.zohodesk-Tooltip-dropdown-options:hover{
    background-color:#f6f7f7;
    color:#0f7df0;
    cursor:pointer
}
.zohodesk-Tooltip-dropdown-options{
    display:block
}
.zohodesk-Tooltip-editor-content{
    box-shadow:0 0 8px rgba(0,0,0,0.1);
    margin-bottom:25px
}
.zohodesk-Tooltip-editor-content .KB_Editor{
    border:none!important
}
.zohodesk-Tooltip-editor-content .KB_Editor_iframe{
    min-height:245px!important;
    height:245px!important
}
.zohodesk-Tooltip-editor-content .KB_Editor_ContentArea{
    min-height:200px!important;
    height:200px!important
}
.zohodesk-Tooltip-editor-content .KB_Editor_menus{
    padding:5px!important;
    min-height:40px!important;
    height:40px!important
}
.zohodesk-Tooltip-editor-content .KB_Editor_menus>ul{
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    justify-content:space-around
}
.zohodesk-Tooltip-editor-content .KB_Editor_MultiTools li{
    padding:2px 4px!important;
    height:25px!important;
    font-size:23px!important;
    margin-right:0!important;
    border-radius:2px!important;
    box-sizing:content-box;
    flex-grow:1;
    text-align:center
}
.zohodesk-Tooltip-editor-content .KB_Editor_MultiTools .KB_Editor_Bdr_div{
    padding:4px 5px!important;
    margin:3px 0!important;
    font-size:10px!important
}
.zohodesk-Tooltip-editor-content .KB_Editor_MultiTools .KB_Editor_Bdr_div.Insert_Type{
    line-height:12px!important
}
.zohodesk-Tooltip-editor-content[class^="zohodesk-Tooltip-"]{
    line-height:1.12!important
}
.zohodesk-Tooltip-editor-content .KB_Editor_MultiTools .KB_Editor_Bdr_div .KBEditor-Block-down-arrow{
    padding-left:3px!important
}
.zohodesk-Tooltip-editor-content .KB_Editor_common_DropDown h1{
    font-weight:normal;
    font-size:20px!important
}
.zohodesk-Tooltip-editor-content .KB_Editor_common_DropDown h2{
    color:#555!important;
    padding:0;
    font-size:15px!important
}
.zohodesk-Tooltip-editor-content .KB_Editor_common_DropDown h3{
    padding:0;
    font-size:13px!important;
    font-weight:bold
}
.zohodesk-Tooltip-editor-content .zohodesk-Tooltip{
    padding:20px 25px
}
#editerToolsContainer{
    height:285px!important;
    border:none!important
}
.zohodesk-Tooltip-color-picker{
    border-top:1px solid #e5e8ea
}
.zohodesk-Tooltip-color-picker .zohodesk-Tooltip-lft-bar,.zohodesk-Tooltip-color-picker .zohodesk-Tooltip-rt-bar{
    padding:10px 4px;
    box-sizing:border-box
}
.zohodesk-Tooltip-color-picker .zohodesk-Tooltip-lft-bar{
    width:70%
}
.zohodesk-Tooltip-color-picker .zohodesk-Tooltip-rt-bar{
    border-left:1px solid #dcdfe4;
    height:43px;
    width:30%
}
.zohodesk-Tooltip-lft-bar{
    padding:12px 4px 10px 4px!important;
    text-align:center;
    font-size:0
}
.zohodesk-Tooltip-lft-bar .zohodesk-Tooltip-list{
    display:inline-block
}
.zohodesk-Tooltip-clr-box{
    border-radius:50%;
    float:left;
    display:block;
    cursor:pointer;
    background-color:#fff;
    border:1px solid transparent;
    width:20px;
    height:20px;
    padding:2px;
    margin:0 2px;
    box-sizing:border-box
}
.zohodesk-Tooltip-color{
    width:100%;
    height:100%;
    display:block;
    box-shadow:inset 0 0 1px 0 rgba(0,0,0,0.4);
    border-radius:50%
}
#zohodesk-Tooltip-color-1{
    background-color:#f9db6a
}
#zohodesk-Tooltip-color-2{
    background-color:#f2a72f
}
#zohodesk-Tooltip-color-3{
    background-color:#e37475
}
#zohodesk-Tooltip-color-4{
    background-color:#22c46c
}
#zohodesk-Tooltip-color-5{
    background-color:#877fd5
}
#zohodesk-Tooltip-color-6{
    background-color:#26bbe3
}
#zohodesk-Tooltip-color-7{
    background-color:#000
}
#zohodesk-Tooltip-color-8{
    background-color:#455264
}
#zohodesk-Tooltip-color-9{
    background-color:#fff
}
#zohodesk-Tooltip-color-10{
    background-color:transparent
}
.zohodesk-Tooltip-slected-clr-box{
    border-color:#877fd5
}
.zohodesk-Tooltip-user-input{
    line-height:0!important
}
.zohodesk-Tooltip-user-input .zohodesk-Tooltip-color-name{
    width:100%;
    display:inline-block;
    vertical-align:middle;
    line-height:0!important
}
.zohodesk-Tooltip-color-name input{
    padding:0!important;
    max-width:100%;
    text-align:center!important;
    font-size:14px!important
}
.zohodesk-Tooltip-color-name .zohodesk-Tooltip-color-value{
    font-size:14px!important
}
.zohodesk-Tooltip-color-value{
    border:0;
    outline:0
}
.zohodesk-Tooltip-panel-footer{
    display: flex;
    align-items: center;
    height: 70px;
    background-color:#f5f5f5;
    padding: 0 20px;
    justify-content: flex-end
}
.zohodesk-Tooltip-panel-footer:after{
    content:'';
    display:block;
    clear:both
}
.zohodesk-Tooltip-footer-button{
    width: 125px;
    text-align: center;
    display: inline-block;
    padding: 8px 0;
    border-radius: 3px;
    background-color: #fff;
    border: 1px solid #dcdfe2;
    color: #455264 !important;
    font-size: 14px;
    box-sizing: border-box;
    letter-spacing:.5px;
    cursor: pointer
}
.zohodesk-Tooltip-footer-button:hover{
    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.07)
}
.zohodesk-Tooltip-footer-button + .zohodesk-Tooltip-footer-button{
    margin:0 0 0 10px
}
.zohodesk-Tooltip-footer-button-save{
    background-color: #4ec36d;
    border-color: #4ec36d;
    box-shadow: 0 2px 5px 0 rgba(78,195,108,0.49);
    color: #fff !important
}
.zohodesk-Tooltip-footer-button-save:hover{
     box-shadow: 0 4px 5px 0 rgba(78,195,108,0.49)
}
.zohodesk-Tooltip-footer-button-delete{
    cursor:pointer;
    font-size:16px!important
}`;
var extra = `
.zohodesk-Tooltip-ArticleNameParent{
    display:flex;
    align-items:center;
    justify-content:space-between;
    color: #455264;
    font-size: 15px;
    font-weight: 500;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}
.zohodesk-Tooltip-editDeleteIcons-Parent{
    display:flex;
    align-items:center
}
.zohodesk-Tooltip-editDeleteCount-Parent{
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:30%
}
.zohodesk-Tooltip-urlPathPlate{
    color: #455264;
    font-size: 13px;
    word-wrap: break-word;
    margin: 5px 0 0;
    letter-spacing:.3px
}
.zohodesk-Tooltip-AuthorDetails-parent{
    margin: 5px 0 0;
    display: flex;
    align-items: center;
    color: #8996a0;
    font-size: 13px;
    letter-spacing:.2px   
}
.zohodesk-Tooltip-AuthorDetails + .zohodesk-Tooltip-AuthorDetails::before{
    content:'\\B7';
    margin: 0 12px
}

`;
var zdttStyles = {
    errorBackgroundLayer : `<style>.zohodesk-Tooltip-layer {z-index: 999999999;width: 100%;height: 100%;top: 0;left: 0;position: absolute;background-color: rgba(0, 0, 0, 0.4);}</style>`,
    errorPopup : `<style>.zohodesk-Tooltip-error-message {width: 370px;border-radius: 4px;background-color: #fff;position: absolute;z-index: 9999999999;box-shadow: 0px 5px 6px 0px rgba(0, 0, 0, 0.22);}.zohodesk-Tooltip-error-header{box-sizing:border-box;width:100%;padding:20px;font-size:0}.zohodesk-Tooltip-error-footer{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;align-items:stretch;width:100%;box-sizing:border-box;text-align:center;border-top:1px solid #dcdfe4}.zohodesk-Tooltip-error-icon{width:20%;height:100%;display:inline-block;vertical-align:middle;box-sizing:border-box;padding:0 10px}.zohodesk-Tooltip-error-text{text-align:left!important;width:80%;height:100%;display:inline-block;font-size:16px;vertical-align:middle;padding:0 10px;box-sizing:border-box}.zohodesk-Tooltip-error-text>span{font-weight:600}.zohodesk-Tooltip-Alert-Error-icon{color:#e56a79;fill:currentColor;width:40px;height:40px}.zohodesk-Tooltip-error-button{flex:1;box-sizing:border-box;padding:13px 10px;cursor:pointer}.zohodesk-Tooltip-error-button:hover{background-color:#f3f4f6}.zD-tooltip-lftBtn{color:#8a95a4;border-bottom-left-radius:4px}.zD-tooltip-rtBtn{border-left:1px solid #dcdfe4;color:#0f7df4;border-bottom-right-radius:4px}.ZDTooltipbtnFocused{background-color:#f3f4f6}</style>`,
    sidePanel :`<style>`+extra+guideListPageStyle+guideFormPageStyle+emptyGuidePageStyle+newEmpTrigStyle+formPageStyles+tabsStyles+triggerList+filterHeader+loadingStyle+`.zohodesk-tooltip-displayinline{font-family: 'LatoWeb'!important;height:100%;display:inline}.zohodesk-Tooltip-panel-right{position:fixed;top:0!important;left:auto!important;right:0!important}.zohodesk-Tooltip-panel{display:block;width:390px;height:100%;background-color:#fff;position:relative;box-shadow:0 0 8px rgba(0,0,0,0.2);overflow:hidden;text-align:left}.zohodesk-Tooltip-panel-header{background-color:#455264;box-sizing:border-box;color:#fff}.zohodesk-Tooltip-panel-header+div{height:calc(100% - 95px);overflow:hidden;display:flex;flex-direction:column;}.zohodesk-Tooltip-panel-header+.zohodesk-Tooltip-height{height:calc(100% - 50px);width:100%}.zohodesk-Tooltip-panel-header-text{font-size:19px!important;font-weight:400;letter-spacing:.5px;margin-right:7px!important;text-transform:uppercase}.zohodesk-Tooltip-panel-header [class^="zohodesk-Tooltip-"]{font-size:18px}.zohodesk-Tooltip-panel-header>.zohodesk-Tooltip-cl-both{padding:11px 20px 11px 20px;height:50px;box-sizing:border-box}.zohodesk-Tooltip-panel-header .zohodesk-Tooltip-clrWhite{color:#fff}.zohodesk-Tooltip-pstnrltv {position: relative;}.zohodesk-Tooltip-panel-header+.zohodesk-Tooltip-height{height:calc(100% - 50px);width:100%}.zohodesk-Tooltip-cl-both:after{content:'';display:block;clear:both}.zohodesk-Tooltip-fl-lft{float:left}.zohodesk-Tooltip-descriptionBox>.zohodesk-Tooltip-fl-lft{width:50%}.zohodesk-Tooltip-fl-rt{float:right}.zohodesk-Tooltip-inline-icons{display:inline-block;vertical-align:middle;border-radius:3px;padding:4px;line-height:1;margin-left:0;position:relative;margin-top:0!important}.zohodesk-Tooltip-inline-icons+.zohodesk-Tooltip-inline-icons{margin-left:2px!important}.zohodesk-Tooltip-inline-icons,[class^="zohodesk-Tooltip-editor-icon"]{line-height:1!important}#zdttHeaderCom{display:flex;align-items:center}.zohodesk-Tooltip-selected-inline-icons{background-color:#374250}.zohodesk-Tooltip-editor-iconalignleft,.zohodesk-Tooltip-editor-iconalignright,.zohodesk-Tooltip-editor-iconclose,.zohodesk-Tooltip-editor-iconheaderquestion{cursor:pointer}.zohodesk-Tooltip-editor-iconclose,.zohodesk-Tooltip-usricon,.zohodesk-Tooltip-editor-iconalignleft{display:flex;align-items:center}.zohodesk-tooltip-svg-icon-medium{width:17px;height:17px;color:#8a95a4;fill:currentColor}.zohodesk-Tooltip-usricon{width:17px;height:17px;line-height:0!important;cursor:pointer;text-align:center;overflow:hidden}.zohodesk-Tooltip-usricon>img{max-width:100%}.zohodesk-Tooltip-usrinfopopup .zohodesk-Tooltip-usricon{width:40px;height:40px;display:inline-block;vertical-align:middle;cursor:auto;border-radius:3px}.zohodesk-Tooltip-usrinfopopup{position:absolute;background-color:#fff;z-index:9999;width:270px;box-shadow:0 0 3px 0 rgba(0,0,0,0.3);top:35px;left:-233px!important;padding:0!important}.zohodesk-Tooltip-usrinfopopup:after{position:absolute;content:'';display:block;width:15px;height:15px;background-color:#fff;right:15px;top:-7px;transform:rotate(45deg)}.zohodesk-Tooltip-usrinfopopup .zohodesk-Tooltip-usrinfoHead{padding:20px 20px;font-size:0!important}.zohodesk-Tooltip-Selectbox-dropdown{position:absolute;background-color:#fff;left:0;top:40px;height:auto;box-shadow:0 3px 7px 2px rgba(0,0,0,0.1);z-index:9;box-sizing:border-box;padding:10px 0;border-radius:4px;line-height:1.75;display:none}.zohodesk-Tooltip-Category .zohodesk-Tooltip-Selectbox-dropdown{border:1px solid rgba(0,0,0,0.1);top:35px}.zohodesk-Tooltip-usrinfoCont{padding-left:12px;vertical-align:middle;display:inline-block}.zohodesk-Tooltip-usrinfoCont .zohodesk-Tooltip-usrId,.zohodesk-Tooltip-usrinfoCont .zohodesk-Tooltip-usrName{line-height:1.8!important;letter-spacing:.8px;max-width:170px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.zohodesk-Tooltip-usrinfoCont .zohodesk-Tooltip-usrName{font-size:15px!important;font-weight:500;color:#455264}.zohodesk-Tooltip-usrinfoCont .zohodesk-Tooltip-usrId{font-size:13px!important;letter-spacing:.6px;color:#8996a0}.zohodesk-Tooltip-usrinfoFoot{border-top:1px solid #f1f3f4;height:40px;box-sizing:border-box}.zohodesk-Tooltip-usrinfoFoot:hover{background-color:#f3f5f5}.zohodesk-Tooltip-usrinfoFoot input{background:0;border:0;outline:0;width:100%;height:100%;padding:0 20px 0 0!important;margin:0!important;text-align:right;cursor:pointer;color:#8996a0;line-height:1.6;font-size:16px}.zohodesk-Tooltip-usrinfoFoot input:hover{color:#e82424}.zohodesk-Tooltip-panel-left{position:fixed;top:0!important;left:0!important;right:auto!important}`+dropdownPopupStyle+`</style>`,
    maximizeIcon : `<style>`+maximizeIcon+`</style>`
}