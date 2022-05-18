// ==UserScript==
// @name         Coupang-Price-Per-Piece
// @namespace    Coupang-Price-Per-Piece
// @version      0.0.1
// @description  쿠팡 개당 가격 계산기
// @supportURL  https://github.com/nomomo/Coupang-Price-Per-Piece/issues
// @homepage    https://github.com/nomomo/Coupang-Price-Per-Piece
// @downloadURL https://raw.githubusercontent.com/nomomo/Coupang-Price-Per-Piece/master/Coupang-Price-Per-Piece.user.js
// @updateURL   https://raw.githubusercontent.com/nomomo/Coupang-Price-Per-Piece/master/Coupang-Price-Per-Piece.user.js
// @author       Nomomo
// @match        https://*.coupang.com/*
// @run-at      document-end
// @grant       GM.addStyle
// @grant       GM_addStyle
// @grant       GM.getValue
// @grant       GM_getValue
// @grant       GM.setValue
// @grant       GM_setValue
// @grant       GM.deleteValue
// @grant       GM_deleteValue
// @grant       GM.listValues
// @grant       GM_listValues
// @grant       GM.info
// @grant       GM_info
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// @grant       GM.registerMenuCommand
// @grant       GM_registerMenuCommand
// @grant       GM_getResourceText
// @grant       GM.notification
// @grant       GM_notification
// @grant       GM.addValueChangeListener
// @grant       GM_addValueChangeListener
// @grant       GM.removeValueChangeListener
// @grant       GM_removeValueChangeListener
// @grant       unsafeWindow
// @require     https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js#sha256=12a8efa809b3ddb2bce9237f7c1e56497774204f40db6521739bc335fc60aa3a
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js#sha256=ff1523fb7389539c84c65aba19260648793bb4f5e29329d2ee8804bc37a3fe6e
// @require     https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js#sha256=5971de670aef1d6f90a63e6ed8d095ca22f95c455ffc0ceb60be62e30e1a4473
// ==/UserScript==

"use strict";
(async () => {
    try{
        console.log("[CPPP]   COUPANG 개당 가격 계산기 작동", document.location.href);
        var DEBUG = await GM.getValue("DEBUG", false);

        ////////////////////////////////////////////////////////////////////////////////////
        // libs
        ////////////////////////////////////////////////////////////////////////////////////
        var NOMO_DEBUG = function ( /**/ ) {
            if (!DEBUG) return;
            var args = arguments, args_length = args.length, args_copy = args;
            for (var i = args_length; i > 0; i--) args[i] = args_copy[i - 1];
            args[0] = "[CPPP]  ";
            args.length = args_length + 1;
            console.log.apply(console, args);
        };

        /* GM_setting.js
        * Version: Apr. 10, 2022
        * MIT licensed
        * https://github.com/nomomo/
        * nomotg@gmail.com
        * Copyright (c) 2017-2022 NOMO
        */
        // eslint-disable-next-line
        var GM_setting=function(t,e,n){var i,a=void 0,s="",o=[],r={},l={},_={},d={},p=!1,c=function(){if(p){for(var t=arguments,e=t.length,n=t,i=e;i>0;i--)t[i]=n[i-1];t[0]="+[GM_SETTINGS]  ",t.length=e+1,console.log.apply(console,t)}},g=(navigator.language||navigator.userLanguage).toLowerCase().substring(0,2),u=g,v="ko",f=!1;const G={en:{title_settings:"Settings",title_reset:"Reset",donate:"Donate",buymeacoffee:"Buy me a coffee",buymeacoffeeDesc:"Support my projects by buying me a coffee! ☕",toonation:"Toonation",button_reset_settings:"Reset Settings",confirm_reset_settings:"Are you sure you want to reset the settings?",complete_reset_settings:"Settings reset complete!",button_reset_settings_all:"Script reset (refresh is required)",confirm_reset_settings_all:"Do you really want to reset script?",complete_reset_settings_all:"Script initialization complete!",auto_saved:"Autosaved: ",err_val_req:"A value must be entered.",err_num_req:"Only numbers can be entered.",err_num_over:"The input value must be a number greater than or equal to : ",err_num_not_more_than:"The input value must be a number less than or equal to: ",err_valid_array_string:"Only English letters, numbers, commas (,) and underscores (_) can be entered.",err_value_empty:"Something for which no value exists, such as an empty value.",err_value_dup:"Duplicate value exists: ",err_value_blank:"There is an item of a space in the string: "},ko:{title_settings:"Settings",title_reset:"Reset",donate:"후원하기",buymeacoffee:"Buy me a coffee 로 커피 한 잔 사주기",buymeacoffeeDesc:"커피 한 잔☕ 으로 프로젝트를 지원해주세요~",toonation:"Toonation 으로 후원하기",button_reset_settings:"Reset Settings",confirm_reset_settings:"진짜 설정을 초기화 할까요?",complete_reset_settings:"설정 초기화 완료!",button_reset_settings_all:"전체 초기화(새로고침 필요)",confirm_reset_settings_all:"진짜 스크립트를 모두 초기화 할까요?",complete_reset_settings_all:"스크립트 초기화 완료!",auto_saved:"자동 저장 됨: ",err_val_req:"반드시 값이 입력되어야 합니다.",err_num_req:"숫자만 입력 가능합니다.",err_num_over:"입력 값은 다음 값 이상의 숫자이어야 합니다. : ",err_num_not_more_than:"입력 값은 다음 값 이하의 숫자이어야 합니다. : ",err_valid_array_string:"영문, 숫자, 콤마(,), 언더바(_) 만 입력 가능합니다.",err_value_empty:"공백 값 등 값이 존재하지 않는 항목이 존재합니다.",err_value_dup:"중복된 값이 존재합니다: ",err_value_blank:"문자열 내 공백이 존재하는 항목이 있습니다: "}};var h=function(t){var e="";if("object"==typeof t){var n=Object.keys(t);if(0===n.length)return e;e=void 0!==t[u]?t[u]:void 0!==t[v]?t[u]:t[n[0]]}else e=t;return e},M=function(t){return void 0!==G[u]?G[u][t]:void 0!==G[v]?G[v][t]:""},m=async function(){""!==s&&await GM.setValue(s,_),e[s]=_,t.each(o,function(t,e){void 0!==l[e]&&void 0!==l[e].change&&l[e].change(_[e])}),o=[]},x=async function(){c("load_"),""!==s&&(_=await GM.getValue(s,_)),_.Lang=await y(),e[s]=_},y=async function(){return u=await GM.getValue("GM_SETTING_LANG",g),c("loadLang_",u),u},b=function(e){d={};var n=t(e);i=n,0!==n.find("#GM_setting_container").length&&n.empty();var s=t("<div id='GM_setting_container'></div>"),o=t(`\n<div id='GM_setting_head'>\n<div style='height:25px;display:inline-block;white-space:nowrap'>Settings</div>\n<div style='display:flex;height:25px;float:right;'>\n<div id='GM_homepage_link' style='align-self: flex-end;'>\n<a href='${GM.info.script.homepage}' target='_blank' style='font-size:12px;font-weight:normal;align-self:flex-end;'>${GM.info.script.name} v${GM.info.script.version} (${GM.info.script.homepage})</a>\n</div>\n<div id='GM_multilang' style='margin-left:15px;'>\n<select id='GM_multilang_select' class="form-control input-sm">\n    <option value="ko">한국어</option>\n    <option value="en">English</option>\n</select>\n</div>\n</div>\n</div>`);void 0!==GM.info&&null!==GM.info&&void 0!==GM.info.script&&null!==GM.info.script&&void 0!==GM.info.script.homepage&&null!==GM.info.script.homepage&&""!==GM.info.script.homepage?o.find("#GM_homepage_link").show():o.find("#GM_homepage_link").hide();var r=o.find("#GM_multilang");if(f){r.show();var _=r.find("#GM_multilang_select");_.val(u),_.on("change",async function(e){var n=u;t("option:selected",this),this.value;u=this.value,c(`LANG VALUE CHANGED FROM ${n} TO ${u}`),await async function(t){null==t?(await GM.setValue("GM_SETTING_LANG",u),c("saveLang_",u)):(await GM.setValue("GM_SETTING_LANG",t),c("saveLang_",t))}(),null!=a?(t(a).empty(),b(a)):c("NO CREATED LAYOUT")})}else r.hide();var p,g=t("<ul id='GM_setting'></ul>"),v=void 0;for(var G in n.append(s),s.append(o).append(g),l){var x,y,$=l[G].category,z=l[G].depth,D=l[G].type,N=h(l[G].title),O=h(l[G].desc),E=h(l[G].category_name),C=l[G].radio_enable_value,q=t("<div class='GM_setting_input_container form-group'></div>"),V="tag"===D||"textarea"===D;if("radio"===D){var U=l[G].radio;for(var j in x=t("<div GM_setting_type='radio'></div>"),U){var I=t("<label class='radio-inline'>"+h(U[j].title)+"</label>");t("<input name='GM_setting_"+G+"' class='form-control' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' onfocus='this.blur()' />").attr({value:U[j].value,type:"set"===D?"text"===D:"tag"===D?"textarea":D,GM_setting_type:D,GM_setting_key:G,GM_setting_category:void 0===$?"default":$,GM_setting_radio_enable_value:void 0===C?"none":C}).prependTo(I),x.append(I)}}else x=t(`<${V?"textarea ":"input "} class='form-control' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' ${"checkbox"===D?"onfocus='this.blur()'":""}${V?"></textarea>":" />"}`).attr({type:"set"===D?"text"===D:"tag"===D?"textarea":D,GM_setting_type:D,GM_setting_key:G,GM_setting_category:void 0===$?"default":$,GM_setting_radio_enable_value:void 0===C?"none":C});y=t(void 0!==E?`<div class='GM_setting_category_name'>${E}</div>`:"<div class='GM_setting_category_blank'></div>");var B=t("<div class='GM_setting_list_head'></div>"),R=t(`<span class='GM_setting_title'>${N}</span>`),F=t(`<span class='GM_setting_desc'>${O}</span>`),H=t(`<li ${void 0!==l[G].radio_enable_value?" GM_setting_radio_enable_value='"+l[G].radio_enable_value+"'":""} GM_setting_key='${G}' GM_setting_depth='${z}' class='${l[G].under_dev?"GM_setting_under_dev ":""} ${void 0!==E&&(void 0===v||void 0!==v&&$!==v.category)?"GM_setting_category ":""} GM_setting_depth${z}'></li>`);if(g.append(H),B.append(R).append(F),"checkbox"===D)t('<label class="btn btn-default btn-xxs"><span class="glyphicon glyphicon-ok"></span></label>').prepend(x).appendTo(q),x.on("change",function(){t(this).is(":checked")?t(this).closest("label").addClass("active"):t(this).closest("label").removeClass("active"),t(this).is(":disabled")?t(this).closest("label").addClass("disable").prop("disabled",!0):t(this).closest("label").removeClass("disable").prop("disabled",!1)});else q.append(x);H.append(y).append(B).append(q),d[G]=x,void 0!==l[G].append&&q.append(l[G].append),v=l[G]}n.find("input[type='checkbox']").on("click",function(){L(n)}),n.find("input[type='radio']").on("click",function(){L(n)}),n.find("input, textarea").on("input",function(){c("GM_setting - text change");var e=t(this),i=S(e),a=e.attr("GM_setting_key"),s=A(a,i);e.closest("div").find(".invalid_text").remove(),s.valid?e.closest("div").removeClass("invalid"):(c("validation",s),e.closest("div").addClass("invalid"),e.after("<div class='invalid_text'>"+s.message+"</div>")),clearTimeout(p),p=setTimeout(function(){var e=!0;t.each(d,function(t,n){if(!A(t,S(n)).valid)return e=!1,!1}),e&&(k(),m(),w(M("auto_saved")+(new Date).toLocaleTimeString(),n))},1e3)}),T(),L(n),g.append(`<li class="GM_setting_category GM_setting_depth1">\n    <div class="GM_setting_category_name">${M("title_reset")}</div>\n    <div class="GM_setting_list_head">\n        <span class="GM_setting_title">\n            <span class="GM_setting_reset btn btn-primary" style="margin-left:0;">${M("button_reset_settings")}</span>\n            \x3c!--<span class="GM_setting_reset_all btn btn-primary">button_reset_settings_all</span>--\x3e\n        </span>\n        <span class="GM_setting_desc"></span>\n    </div>\n    <div class="GM_setting_input_container form-group">\n    </div>\n</li>`),g.find(".GM_setting_reset").on("click",async function(){confirm(M("confirm_reset_settings"))&&(await GM_setting.reset(),GM_setting.createlayout(i),w(M("complete_reset_settings")+(new Date).toLocaleTimeString(),i))}),g.find(".GM_setting_reset_all").on("click",async function(){if(confirm(M("confirm_reset_settings_all"))){for(var t=await GM.listValues(),e=0;e<t.length;e++){var n=t[e];await GM.deleteValue(n)}await GM_setting.reset(),GM_setting.createlayout(i),w(M("complete_reset_settings_all")+(new Date).toLocaleTimeString(),i)}}),g.append(`<li class="GM_setting_category GM_setting_depth1">\n<div class="GM_setting_category_name">${M("donate")}</div>\n<div class="GM_setting_list_head">\n    <span class="GM_setting_title">\n        ${M("buymeacoffee")}\n    </span>\n    <span class="GM_setting_desc">\n        ${M("buymeacoffeeDesc")}\n    </span>\n</div>\n<div class="GM_setting_input_container form-group">\n<a href="https://www.buymeacoffee.com/nomomo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="41" width="174"></a>\n</div>\n</li>\n<li class="GM_setting_depth1">\n<div class="GM_setting_category_blank"></div>\n    <div class="GM_setting_list_head">\n        <span class="GM_setting_title">\n            ${M("toonation")}\n        </span>\n        <span class="GM_setting_desc"></span>\n    </div>\n    <div class="GM_setting_input_container form-group">\n    <a href="https://toon.at/donate/636947867320352181" target="_blank"><img src="https://raw.githubusercontent.com/nomomo/Addostream/master/assets/toonation_b11.gif" height="41" alt="Donate with Toonation" /></a>\n    </div>\n</li>\n`),g.after(`\n<div id="GM_setting_footer">\n    <a href="${GM.info.script.homepage}" target="_blank">${GM.info.script.name}</a> v${GM.info.script.version}\n    <div class="footer_divider"></div> GM Setting v22.4.10\n    <div class="footer_divider"></div> ©2017-${(new Date).getFullYear()} <a href="https://nomo.asia/" target="_blank">NOMO</a></div>\n`)},w=function(e,n){if(void 0!==n){var i="GM_setting_autosaved";n.find("."+i).animate({bottom:"+=40px"},{duration:300,queue:!1}),t("<div style='animation: glow .5s 10 alternate; position:fixed; left:10px; bottom:20px; z-index:10000000;' class='"+i+" btn btn-success'>"+e+"</div>").appendTo(n).fadeIn("fast").animate({opacity:1},6e3,function(){t(this).fadeOut("fast").delay(600).remove()}).animate({left:"+=30px"},{duration:300,queue:!1})}},k=async function(){for(var e in c("read_"),d){var n=d[e],i=S(n);"tag"===l[e].type&&(1===(i=i.split(",")).length&&""===i[0]&&(i=[]),t.each(i,function(t,e){i[t]=e.replace(/^\s*|\s*$/g,"")})),_[e]!==i&&-1===o.indexOf(e)&&o.push(e),_[e]=i}},T=async function(){for(var t in c("write_"),d){var e=d[t];$(e,_[t])}},S=function(t){var e;switch(t.attr("GM_setting_type")){case"checkbox":e=t.prop("checked");break;case"set":case"text":case"tag":case"textarea":e=t.val();break;case"radio":e=t.find("input:checked").val();break;default:e=void 0}return e},$=function(t,e){switch(t.attr("GM_setting_type")){case"checkbox":t.prop("checked",e).trigger("change");break;case"set":case"text":t.val(e);break;case"tag":case"textarea":t.val(e),t.height("auto"),t.height(t.prop("scrollHeight")+"px");break;case"radio":t.find("input[value="+e+"]").prop("checked",!0)}},L=async function(e){var n=e.find("li");n.removeClass("GM_setting_item_disable"),n.find("input, textarea").prop("disabled",!1),n.find("input[type='checkbox']").trigger("change");for(var i,a,s=[!0,!0],o=-1,r=0;r<n.length;r++){var _=t(n[r]),d=_.attr("GM_setting_depth"),p=_.attr("GM_setting_key"),c=_.attr("GM_setting_radio_enable_value");if(0==r);else{var g=(i=t(n[r-1])).attr("GM_setting_depth");if(g==d&&g>0)void 0!==a&&(NOMO_DEBUG("prevTopRadioVal",a,o,d),o>=d?(a=void 0,o=-1):o<d&&(s[g-1]=a==c));else if(g<d){a=void 0;var u=i.find("input[type='checkbox']"),v=i.find("input[type='radio']");0!==u.length&&u.is(":checked")?s[g]=!0:0!==v.length?(a=i.find("input[type='radio']:checked").val(),o=g,i.find("input[type='radio']:checked").val()==c?s[g]=!0:s[g]=!1):s[g]=!1}}for(var f=0;f<d;f++)if(l[p].disable||!s[f]){_.addClass("GM_setting_item_disable"),_.find("input, textarea").prop("disabled",!0),_.find("input[type='checkbox']").trigger("change");break}}},A=function(e,n){var i,a,s,o=!0,r="";if("number"===l[e].valid)o=t.isNumeric(n),""===n?r+=M("err_val_req"):o?void 0!==l[e].min_value&&l[e].min_value>n?(o=!1,r+=M("err_num_over")+l[e].min_value):void 0!==l[e].max_value&&l[e].max_value<n&&(o=!1,r+=M("err_num_not_more_than")+l[e].max_value):r+=M("err_num_req");else if(""!==n&&"array_string"===l[e].valid){i=t.map(n.split(","),t.trim);var _=n.match(/^[A-Za-z0-9 _,]*$/);if(null===_||0===_.length)o=!1,r+=M("err_valid_array_string");else if(-1!==t.inArray("",i))o=!1,r+=M("err_value_empty"),c(i,t.inArray("",i));else if(new Set(i).size!==i.length){o=!1,a=[],s=i.sort();for(var d=0;d<i.length-1;d++)s[d+1]==s[d]&&-1===t.inArray(s[d],a)&&a.push(s[d]);r+=M("err_value_dup")+a.join(",")}else for(var p=0;p<i.length;p++)if(-1!==i[p].indexOf(" ")){o=!1,r+=M("err_value_blank")+i[p];break}}else if(""!==n&&"array_word"===l[e].valid)if(i=t.map(n.split(","),t.trim),-1!==t.inArray("",i))o=!1,r+=M("err_value_empty"),c(i,t.inArray("",i));else if(new Set(i).size!==i.length){o=!1,a=[],s=i.sort();for(var g=0;g<i.length-1;g++)s[g+1]==s[g]&&-1===t.inArray(s[g],a)&&a.push(s[g]);r+=M("err_value_dup")+a.join(",")}return{valid:o,message:r}},z=function(t,e){var n=Object.keys(t).sort(),i=Object.keys(e).sort();return JSON.stringify(n)===JSON.stringify(i)};return{init:async function(e,i){s=e,await async function(t){for(var e in c("init_",l),t&&(t.DEBUG&&c("GM_setting - DEBUG",p=!0),t.CONSOLE_MSG&&(c=t.CONSOLE_MSG),t.SETTINGS&&(l=t.SETTINGS),t.MULTILANG&&(f=!0,t.LANG_DEFAULT&&(v=t.LANG_DEFAULT))),l)r[e]=l[e].value;if(r.Lang="",await x(),!z(r,_)){for(e in r)void 0===_[e]&&(_[e]=r[e]);for(e in _)void 0===r[e]&&delete _[e];await m()}}(i),await async function(){"function"==typeof GM.addValueChangeListener&&(c("설정에 대한 addValueChangeListener 바인드"),GM.addValueChangeListener(s,async function(e,n,i,a){a&&(c("다른 창에서 설정 변경됨. val_name, old_value, new_value:",e,n,i),await x(),t.each(n,function(t,e){void 0!==l[t]&&void 0!==l[t].change&&n[t]!==i[t]&&l[t].change(_[t])}),o=[])})),t(n).on("input","input[gm_setting_key='under_dev']",function(){c("실험실 기능 온오프 이벤트"),t(this).is(":checked")?t(".GM_setting_under_dev").css("opacity",0).slideDown("fast").animate({opacity:1},{queue:!1,duration:"fast"}):t(".GM_setting_under_dev").css("opacity",1).slideUp("fast").animate({opacity:0},{queue:!1,duration:"fast"})})}(),GM.addStyle('\n#GM_setting .btn {font-size:12px;}\n.GM_setting_autosaved.btn {\nmax-width:100%;\nfont-size:12px;\nwhite-space:pre-wrap;\nuser-select:text;\n}\n#GM_setting .btn-xxs {\ncursor: pointer;\npadding: 4px 4px;\n}\n#GM_setting label.btn-xxs {\nbox-sizing: content-box;\nwidth:11px;\nheight:11px;\n}\n#GM_setting a{\ncolor: #428bca;\ntext-decoration: none;\n}\n#GM_setting a:hover, #GM_setting a:focus {\ncolor: #2a6496;\ntext-decoration: underline;\n}\n#GM_setting {clear:both;margin-left:auto; margin-right:auto; padding:0;font-size:13px;max-width:1400px; min-width:750px; box-sizing:content-box;}\n#GM_setting_head{margin-left:auto; margin-right:auto; padding:20px 0px 10px 10px;font-size:18px;font-weight:800;max-width:1400px; min-width:750px; box-sizing:content-box;}\n#GM_setting li {list-style:none;margin:0px;padding:8px;border-top:1px solid #eee;}\n\n#GM_setting .GM_setting_depth1.GM_setting_category:first-child {margin-top:0px;}\n#GM_setting .GM_setting_depth1.GM_setting_category {border-top: 2px solid #999;margin-top:40px;padding-top:10px;}\n#GM_setting .GM_setting_depth2.GM_setting_category {border-top: 1px solid #ccc;margin-top:30px;padding-top:10px;}\n#GM_setting li[GM_setting_key=\'version_check\'] {margin-top:0px !important}\n\n#GM_setting .GM_setting_category_name{display:table-cell;width:110px;padding:0 0 0 0px;font-weight:700;vertical-align:top;}\n#GM_setting .GM_setting_category_blank{display:table-cell;width:110px;padding:0 0 0 0px;vertical-align:top;}\n\n#GM_setting .GM_setting_list_head{display:table-cell;box-sizing:content-box;vertical-align:top;}\n#GM_setting .GM_setting_depth1 .GM_setting_list_head {padding-left:0px;width:300px;}\n#GM_setting .GM_setting_depth2 .GM_setting_list_head {padding-left:30px;width:270px;}\n#GM_setting .GM_setting_depth3 .GM_setting_list_head {padding-left:60px;width:240px;}\n#GM_setting .GM_setting_depth4 .GM_setting_list_head {padding-left:90px;width:210px;}\n#GM_setting .GM_setting_depth5 .GM_setting_list_head {padding-left:120px;width:180px;}\n\n#GM_setting .GM_setting_title{display:block;font-weight:700;}\n#GM_setting .GM_setting_desc{display:block;font-size:11px;}\n\n#GM_setting .GM_setting_input_container {display:table-cell;padding:0 0 0 30px;vertical-align:top;}\n#GM_setting .GM_setting_input_container span{vertical-align:top;}\n#GM_setting .GM_setting_input_container span.btn{margin:0 0 0 10px;}\n#GM_setting input{display:inline}\n#GM_setting input[type="text"]{ width: 100px; height: 30px; padding: 5px 5px; font-size:12px; }\n#GM_setting textarea{ width: 250px; height: 30px; padding: 5px 5px; font-size:12px; }\n#GM_setting input[type="checkbox"] { display:none; width: 20px;height:20px; padding: 0; margin:0; }\n#GM_setting input[type="radio"] {width: 20px;height:20px; padding: 0; margin:0; }\n\n#GM_setting .radio-inline{ padding-left:0; padding-right:10px; }\n#GM_setting .radio-inline input{ margin:0 5px 0 0; }\n\n#GM_setting .GM_setting_item_disable, #GM_setting .GM_setting_item_disable .GM_setting_title, #GM_setting .GM_setting_item_disable .GM_setting_desc{color:#ccc !important}\n#GM_setting .invalid input, #GM_setting .invalid textarea{border-color:#dc3545;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;color:#dc3545;}\n#GM_setting .invalid input:focus, #GM_setting .invalid textarea:focus{border-color:#dc3545;box-shadow:0 0 0 0.2rem rgba(220,53,69,.25);outline:0;color:#dc3545;}\n#GM_setting .invalid {color:#dc3545}\n#GM_setting .invalid_text {font-size:12px;padding:5px 0 0 5px;}\n\n#GM_setting .GM_setting_under_dev .GM_setting_title{color:#6441a5;font-style:italic}\n\n#GM_setting .btn-xxs {cursor:pointer;padding:4px 4px;} /*padding: 1px 2px;font-size: 9px;line-height: 1.0;border-radius: 3px;margin:0 2px 2px 0;*/\n#GM_setting .btn-xxs .glyphicon{}\n#GM_setting .btn-xxs span.glyphicon {font-size:11px; opacity: 0.1;}\n#GM_setting .btn-xxs.active span.glyphicon {opacity: 0.9;}\n#GM_setting .btn-xxs.disable {opacity: 0.3;cursor:not-allowed;}\n\n#GM_setting_footer { padding: 30px 0 30px 0; margin: 30px 0 0 0; border-top: 1px solid #ccc; text-align: center; font-size:13px; letter-spacing:0.2px; }\n#GM_setting_footer .footer_divider { margin: 0 5px; display: inline-block; width: 1px; height: 13px; background-color: #ebebeb; }\n')},load:async function(){c("GM_setting - load"),await x()},save:async function(){c("GM_setting - save"),await m()},save_overwrite:async function(){var n=_,i=e[s];ADD_DEBUG("_settings",l),t.each(n,function(t,e){void 0!==l[t]&&void 0!==l[t].change&&n[t]!==i[t]&&l[t].change(i[t])}),_=e[s],c("GM_setting - save_overwrite"),await m()},reset:async function(){await GM.setValue(s,r),await x()},createlayout:function(t){a=t,b(t)},getType:function(t){return void 0!==l[t]?l[t].type:void 0},message:function(t,e){w(t,e)}}}(jQuery,window,document);

        const _settings = {
            hideDetailCalcProcess: {
                category: "general",  category_name: "General", depth: 1, type: "checkbox", value: false,
                title: {en:"Hide text for counting totals", ko:"총 개수 계산 과정을 표시하지 않음"},
                desc: ""
            },
            ignoreTotalNoIsOne: {
                category: "general", depth: 1, type: "checkbox", value: false,
                title: {en:"Ignore if the total number is 1", ko:"총 개수가 1개이면 개당 가격을 표시하지 않음"},
                desc: {en:"If the total number is 1, the price per piece is not displayed.", ko:""}
            },
        };
        window.GM_setting = GM_setting;
        await GM_setting.init("GM_SETTINGS", {"DEBUG":DEBUG, "SETTINGS":_settings, "CONSOLE_MSG":NOMO_DEBUG, "MULTILANG":true});
        if(typeof GM.registerMenuCommand === "function"){
            GM.registerMenuCommand("상세 설정 열기", function(){
                var ww = $(window).width(),
                    wh = $(window).height();
                var wn = (ww > 850 ? 850 : ww/5*4);
                wh = (wh > 550 ? 550 : wh/5*4);
                var left  = (ww/2)-(wn/2),
                    top = (wh/2)-(wh/5*4/2);
                window.open("https://www.coupang.com/CoupangPricePerPieceSettings/","winname",
                    "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width="+wn+",height="+wh+",top="+top+",left="+left);
            });
        }
    
        // 설정 페이지
        if(/(^https:\/\/www\.coupang\.com\/CoupangPricePerPieceSettings)/.test(document.location.href)){
            $("body").empty().css("padding","0px 30px 0px 30px");
            var $styles = $("head").find("style");
            $styles.each(function(i, v){
                var $v = $(v);
                if($v.attr("id") == undefined){
                    $v.remove();
                }
            });
    
            var GM_Setting_Bootstrap = 'GM_Setting_Bootstrap';
            if (!document.getElementById(GM_Setting_Bootstrap)) {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.id = GM_Setting_Bootstrap;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css';
                link.media = 'all';
                head.appendChild(link);
            }
    
            document.title = "Coupang-Price-Per-Piece Settings";
            GM_setting.createlayout($("body"));
            return;
        }

        GM_addStyle( /*css*/ `
        .origin-price ~.NOMO_cp {padding-left:9px;}
        .NOMO_cp {color:#0073e9; letter-spacing: -0.5px; display:inline-block}
        .NOMO_cp strong {font-size:15px; font-family: Tahoma,sans-serif;}
        .NOMO_cp .NOMO_price {font-size:11px;}
        .NOMO_cp .NOMO_count {font-size:11px; letter-spacing: -1.5px;}
        .prod-price .NOMO_cp {padding-right:2px;}
        .prod-option-dropdown-item .NOMO_cp {padding:0 5px 0 5px}
        .prod-option-dropdown-item .NOMO_cp:before {content:"["}
        .prod-option-dropdown-item .NOMO_cp:after {content:"]"}
        `);
        var pattern = "종|개입|개|팩|봉|입|통|마리|매입|매|미|EA|구|과|박스|장|롤|병|정|포|piece|p|세트";

        function CPPP_Test(targetText) {
            let textFiltered = targetText;
            textFiltered = textFiltered.trim();

            //////////////////////////////////////////////////////
            // STEP 1 : FIND GLOBAL MULTIPLIER
            NOMO_DEBUG("\n\n============= STEP 1 =============");
            let regex_multiset = new RegExp(`(,\\s?(\\d+)(?:${pattern}),\\s?(\\d+)(?:${pattern})$)`, "i");
            let globalMultiplier = {
                "use": false,
                "value": 1,
                "text": "",
                "multi":false
            }

            let match_regex_set = textFiltered.match(regex_multiset);
            NOMO_DEBUG("regex_multiset result = ", match_regex_set);
            if (match_regex_set !== null) {
                globalMultiplier.use = true;
                globalMultiplier.multi = true;
                textFiltered = textFiltered.replace(regex_multiset, "");

                globalMultiplier.value = Number(match_regex_set[2]) * Number(match_regex_set[3]);
                globalMultiplier.text = match_regex_set[0].replace(/,\s?/, "").replace(/\s?,\s?/, " x ");
                globalMultiplier.text = `${globalMultiplier.text}`;
                NOMO_DEBUG(`new textFiltered = "${textFiltered}" , globalMultiplier = "${globalMultiplier.value}", globalMultiplierText = "${globalMultiplier.text}"`);
            } else {
                let regex_set = new RegExp(`(,\\s?(\\d+)(?:${pattern})$)`, "i");
                match_regex_set = textFiltered.match(regex_set);
                NOMO_DEBUG("match_regex_set", match_regex_set);

                if (match_regex_set !== null) {
                    globalMultiplier.use = true;
                    textFiltered = textFiltered.replace(regex_set, "");
                    globalMultiplier.value = Number(match_regex_set[2]);
                    globalMultiplier.text = match_regex_set[0].replace(/,\s?/, "");
                    NOMO_DEBUG(`new textFiltered = "${textFiltered}" , globalMultiplier = "${globalMultiplier.value}", globalMultiplierText = "${globalMultiplier.text}"`);
                }
            }


            //////////////////////////////////////////////////////
            // STEP 2 : FIND SUB GROUP
            NOMO_DEBUG("\n\n============= STEP 2 =============");
            let subGroup = {
                "value": [],
                "len": 0,
            }

            //let exList = [/\d+\+\+/g];
            let exList = [/\d+\++/g];
            let exis = false;
            for (var j = 0; j < exList.length; j++) {
                if (exList[j].test(textFiltered)) {
                    exis = true;
                    textFiltered = textFiltered.replace(exList[j], "");
                }
            }

            // count number of +
            let plusCount = (textFiltered.match(/\+/g) || []).length;
            if (plusCount > 0) {
                subGroup.use = true;
                subGroup.value = textFiltered.split("+");
                subGroup.len = subGroup.value.length;

                for (let i = 0; i < subGroup.len; i++) {
                    subGroup.value[i] = subGroup.value[i].trim();
                    NOMO_DEBUG(`subGroup ${i} = "${subGroup.value[i]}"`);
                }
            } else {
                subGroup.value.push(textFiltered);
                subGroup.len++;
                NOMO_DEBUG(`subGroup ${0} = "${subGroup.value[0]}"`);
            }
            NOMO_DEBUG(`subGroup length  = "${subGroup.len}"`);


            //////////////////////////////////////////////////////
            // STEP 3 : FIND KEY TEXT FOR EACH SUB GROUP
            NOMO_DEBUG("\n\n============= STEP 3 =============");
            let parsedData = [];
            for (var i = 0; i < subGroup.len; i++) {
                let subText = subGroup.value[i];
                let match_regex_sub;
                let total = 0;

                // CASE1 : X
                let regex_x = new RegExp(`\\s(\\d+)(?:${pattern})\\s?(?:×|x)\\s?(\\d+)(?:${pattern})`, "i");
                match_regex_sub = subText.match(regex_x);

                if (match_regex_sub !== null) {
                    total = Number(match_regex_sub[1]) * Number(match_regex_sub[2]);
                    let tempData = {
                        "type": "x",
                        "total": total,
                        "val": [Number(match_regex_sub[1]), Number(match_regex_sub[2])],
                        "text": match_regex_sub[0].trim()
                    };
                    NOMO_DEBUG(`subGroup "${i}" , match_regex_sub = "${match_regex_sub}" , tempData = ${JSON.stringify(tempData)}`);
                    parsedData.push(tempData);
                    continue;
                }

                // CASE 2 : AVG
                let regex_avg = new RegExp(`(\\d+)~(\\d+)\\s?(?:${pattern})`, "i");
                match_regex_sub = subText.match(regex_avg);

                if (match_regex_sub !== null) {
                    total = Number(match_regex_sub[1]) + Number(match_regex_sub[2]);
                    if (total > 0) {
                        let tempData = {
                            "type": "avg",
                            "total": total / 2.0,
                            "val": [Number(match_regex_sub[1]), Number(match_regex_sub[2])],
                            "text": match_regex_sub[0].trim()
                        };
                        NOMO_DEBUG(`subGroup "${i}" , match_regex_sub = "${match_regex_sub}" , tempData = ${JSON.stringify(tempData)}`);
                        parsedData.push(tempData);
                        continue;
                    }
                }

                // CASE 3 : GENERAL
                let regex_gen = new RegExp(`(\\d+)(?:${pattern})`, "i");
                match_regex_sub = subText.match(regex_gen);

                if (match_regex_sub !== null) {
                    total = Number(match_regex_sub[1]);
                    let tempData = {
                        "type": "gen",
                        "total": total,
                        "val": [total],
                        "text": match_regex_sub[0].trim()
                    };
                    NOMO_DEBUG(`subGroup "${i}" , match_regex_sub = "${match_regex_sub}" , tempData = ${JSON.stringify(tempData)}`);
                    parsedData.push(tempData);
                    continue;
                }

                // CASE 4 : No Spetial Character
                // exception list for subText
                exList = [/\d+\+\+/g, /\d+\+/g];
                exis = false;
                for (var j = 0; j < exList.length; j++) {
                    if (exList[j].test(subText)) {
                        exis = true;
                        break;
                    }
                }

                if (!exis) {
                    total = 1;
                    let tempData = {
                        "type": "none",
                        "total": total,
                        "val": [total],
                        "text": "1개"
                    };
                    NOMO_DEBUG(`subGroup "${i}" , match_regex_sub = "${match_regex_sub}" , tempData = ${JSON.stringify(tempData)}`);
                    parsedData.push(tempData);
                    continue;
                } else {
                    NOMO_DEBUG(`exlist catched. ${subText}`);
                }
            }

            //////////////////////////////////////////////////////
            // STEP 4 : CHECK FINAL RESULTS
            NOMO_DEBUG("\n\n============= STEP 4 =============\n");
            let resTotal = 0;
            let resText = "";
            let resDetailCalcProcess = "";
            for (var i = 0; i < parsedData.length; i++) {
                resTotal += parsedData[i].total;
                if (i == 0) {
                    resText += `${parsedData[i].text}`;
                } else {
                    resText += ` + ${parsedData[i].text}`;
                }
            }

            if(parsedData.length > 1 && GM_SETTINGS.hideDetailCalcProcess){
                resText = `총 ${resTotal}개`;
            }

            // globalMultiplier 에 모두 필터링 된 경우
            if (resTotal == 0 && globalMultiplier.use) {
                resTotal = globalMultiplier.value;
                resText = globalMultiplier.text;
            }
            // globalMultiplier 적용
            else if (globalMultiplier.use) {
                resTotal *= globalMultiplier.value;

                // show only global multiplier
                if (parsedData.length == 1 && parsedData[0].total == 1) {
                    if(globalMultiplier.multi){
                        if(!GM_SETTINGS.hideDetailCalcProcess){
                            resDetailCalcProcess += ` = ${globalMultiplier.text}`;
                        }
                        resText = `총 ${resTotal}개${resDetailCalcProcess}`;
                    }
                    else{
                        if(!GM_SETTINGS.hideDetailCalcProcess){
                            resText = `총 ${resTotal} 개`;
                        }
                        else{
                            resText = `총 ${globalMultiplier.text}`;
                        }
                    }
                }
                // when global multiplier is 1, dont show
                // else if (globalMultiplier.value == 1) {
                //     // when only one sub group
                //     if (parsedData.length == 1) {
                //         if (parsedData[0].type === "avg") {
                //             resText = `평균 ${resTotal}개 (${resText})`;
                //         } else {
                //             resText = `총 ${resText}`;
                //         }
                //     }
                //     // when there are multiple sub groups
                //     else {
                //         resText = `총 ${resTotal}개 = ${resText}`;
                //     }
                // }
                // use global multiplier with one data
                else if (parsedData.length == 1){
                    if (parsedData[0].type === "avg") {
                        if(!GM_SETTINGS.hideDetailCalcProcess){
                            resDetailCalcProcess += ` = 평균 ${parsedData[0].total}개(${resText}) x ${globalMultiplier.text}`;
                        }
                        resText = `총 ${resTotal}개${resDetailCalcProcess}`;
                    }
                    else{
                        if(!GM_SETTINGS.hideDetailCalcProcess){
                            resDetailCalcProcess += ` = ${resText} x ${globalMultiplier.text}`;
                        }
                        resText = `총 ${resTotal}개${resDetailCalcProcess}`;
                    }
                }
                // use global multiplier with multiple data
                else {
                    if(!GM_SETTINGS.hideDetailCalcProcess){
                        resDetailCalcProcess += ` = (${resText}) x ${globalMultiplier.text}`;
                    }
                    resText = `총 ${resTotal}개${resDetailCalcProcess}`;
                }
            } else {
                if (parsedData.length == 1) {
                    if (parsedData[0].type === "avg") {
                        resText = `평균 ${resTotal}개 (${resText})`;
                    } else {
                        resText = `총 ${resText}`;
                    }
                }
                else if(!GM_SETTINGS.hideDetailCalcProcess){
                    resText = `총 ${resTotal}개`;
                }
            }
            NOMO_DEBUG(`resTotal = "${resTotal}", resText = "${resText}"`);

            return {
                "parsedData": parsedData,
                "resTotal": resTotal,
                "resText": resText
            };
        }

        /////////////////////////////////////////////
        // main function
        function main_f(elem, option) {
            try{
                let elemCreateStr = option.c;
                let elemTitleStr = option.t;
                let elemPriceStr = option.p;

                NOMO_DEBUG(`start main_f`);
                let $newElem = $(elem);
                if ($newElem.hasClass("_NM")) {
                    return;
                }
                $newElem.addClass("_NM");

                let $title, title, $price, price, priceText, priceper;

                /////////////////////////////////////////////
                // get title
                if (elemTitleStr !== undefined) {
                    $title = $newElem.find(elemTitleStr).first();
                } else {
                    $title = $newElem.find(".name").first();
                }
                title = $title.text().replace(/^\s+|\n/g, "");

                if (title.length == 0 || title == "") {
                    $title = $newElem.find(".recommend-widget__item__title").first();
                    title = $title.text().replace(/^\s+/, "");
                }
                $title.addClass("_NM");
                if (title == "") {
                    NOMO_DEBUG("there is no title", res.Total);
                    return;
                }
                NOMO_DEBUG("title = ", title);

                /////////////////////////////////////////////
                // get parsed data
                let res = CPPP_Test(title);
                NOMO_DEBUG("===========> res", res);
                if (res.resTotal <= 0) {
                    NOMO_DEBUG("res.Total is zero", res.Total);
                    return;
                }
                if(res.resTotal == 1 && GM_SETTINGS.ignoreTotalNoIsOne){
                    return;
                }

                /////////////////////////////////////////////
                // get price
                price = 0;
                if (elemPriceStr !== undefined) {
                    $price = $newElem.find(elemPriceStr).first();
                    if ($price.length == 0 || $price.find(".price-value").length !== 0) {
                        $price = $newElem.find(".price-value").first();
                    }
                } else {
                    $price = $newElem.find(".price-value").first();
                }

                if ($price.length == 0) {
                    NOMO_DEBUG("$price length == 0");
                    $price = $newElem.find(".price").first();
                }
                $price.addClass("_NM");
                priceText = $price.text().replace(/(\n)/g, "");
                price = Number(priceText.replace(/(\s|\n|,|원)/g, ""));
                if(price <= 0){
                    NOMO_DEBUG("price is zero", price);
                    return;
                }
                NOMO_DEBUG(`price = ${price}`);

                /////////////////////////////////////////////
                // calc price per item
                priceper = price / res.resTotal;
                NOMO_DEBUG(`priceper = ${priceper}`);

                /////////////////////////////////////////////
                // create layout
                let priceperwithcomma;
                if (priceper < 10) {
                    priceperwithcomma = priceper.toFixed(2).toString();
                } else if (priceper < 100) {
                    priceperwithcomma = priceper.toFixed(1).toString();
                } else {
                    priceperwithcomma = Math.round(priceper).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                let createStr = `<div class="NOMO_cp"><span class="NOMO_price">개당 <strong>${priceperwithcomma}</strong>원</span> <span class="NOMO_count">(${res.resText})</span></div>`;
                let $createTarget;
                if (elemCreateStr !== undefined) {
                    $createTarget = $newElem.find(elemCreateStr).first();
                    if ($createTarget.length != 0) {
                        $createTarget.after(createStr);
                    } else {
                        $price.after(createStr);
                    }
                } else {
                    $price.after(createStr);
                }
            }
            catch(e){
                NOMO_DEBUG("error from main_f", e);
            }
        }

        
        function main_desc(elem, option) {
            try{
                let elemCreateStr = option.c;
                let elemTitleStr = option.t;
                let elemPriceStr = option.p;
                let position = option.pos;
                let type = option.type;

                let $newElem = $(elem);
                let textDesc = $newElem.text();
                let res;
                let count;
                let regex;
                NOMO_DEBUG("main_desc", textDesc, option);
                switch (type) {
                    case 0:
                        regex = /총?\s?수량:\s?(\d+)/;
                        res = regex.exec(textDesc);
                        break;
                    case 1:
                        //regex = new RegExp(`(\\d+)(?:${pattern})\\s?(?:×|x)\\s?(\\d+)(?:${pattern})`, "i");
                        //res = regex.exec(textDesc);
                        res = /(\d+)(?:종|개입|개|팩|봉|통|마리|매입|입|매|미|EA|구|과|박스|장|p)\s?(?:×|x)\s?(\d+)(?:종|개입|개|팩|봉|통|마리|매입|입|매|미|EA|구|과|박스|장|p)/i.exec(textDesc);
                        if (res !== null) {
                            //NOMO_DEBUG(textDesc, res);
                            count = res[1] * res[2];
                        } else {
                            //regex = new RegExp(`(?:(\\d+)(?:${pattern}))`, "gi");
                            //res = regex.exec(textDesc);
                            res = /(?:(\d+)(?:종|개입|개|팩|봉|통|마리|매입|입|매|미|구|과|EA|박스|장|p))/gi.exec(textDesc);
                            if (res !== null) {
                                count = res[1];
                            }
                        }
                        break;
                    default:
                        break;
                }
        
                $newElem.addClass("_NM");
                if (res !== null) {
                    let $price, $title;
                    if (position == "dropdown") {
                        $price = $newElem.find(elemPriceStr).first();
                        $title = $newElem.find(elemTitleStr).first();
                    } else if (position == "global") {
                        $price = $(elemPriceStr);
                        $title = $(elemTitleStr);
                    }
                    let title = $title.text();
                    $price.each(function (i, v) {
                        //NOMO_DEBUG("main_desc", i, v);
                        let $v = $(v);
                        let priceText = $v.first().text().replace(/(\n|\s+)/g, "");
                        let price = Number(priceText.replace(/(\s|\n|,|원)/g, ""));

                        if(!price || !count || price <= 0 || count <= 0){
                            return true;
                        }
                        if(count == 1 && GM_SETTINGS.ignoreTotalNoIsOne){
                            return true;
                        }

                        let priceper = price / count;
                        let priceperwithcomma = Math.round(priceper).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        let $createStr = $(`<div class="NOMO_product_page_${position}_${i} NOMO_cp"><span class="NOMO_price">개당 <strong>${priceperwithcomma}</strong>원</span> <span class="NOMO_count">(총 ${count}개)</span></div>`);
        
                        if (position == "dropdown") {
                            if ($newElem.find(`.NOMO_product_page_${position}_${i}`).length == 0) {
                                $(elemCreateStr).after($createStr);
                            } else {
                                $newElem.find(`.NOMO_product_page_${position}_${i}`).replaceWith($createStr);
                            }
                        } else {
                            if ($(`.NOMO_product_page_${position}_${i}`).length == 0) {
                                $v.after($createStr);
                            } else {
                                $(`.NOMO_product_page_${position}_${i}`).replaceWith($createStr);
                            }
                        }
                    });
                }
                else{
                    NOMO_DEBUG("res is null from main_desc");
                }
            }
            catch(e){
                NOMO_DEBUG("error from main_desc", e);
            }
        }

        var main_f_list = [
            {"e":".c-product", "c":".price", "t":undefined, "p":undefined},
            {"e":".recommend-widget__item", "c":".recommend-widget__item__unit-price-container", "t":".listing-carousel-item-title", "p":".recommend-widget__item__price"}, // 지금 이 상품이 필요하신가요? 광고 (i)
            {"e":".rl-item", "c":".rl-item__unit-price", "t":".rl-item__title", "p":".rl-item__price"}, // 다른 고객이 함께 구매한 상품
            {"e":".search-product-wrap", "c":".price", "t":undefined, "p":undefined}, // 검색 결과 상품
            {"e":"ul.prod-list li", "c":undefined, "t":undefined, "p":undefined}, // 카테고리별 추천 광고상품
            {"e":".baby-product", "c":".price", "t":undefined, "p":undefined}, // 일반 상품 리스트
            {"e":".recommend-item", "c":".recommend-item__badge", "t":".recommend-item__title", "p":".recommend-item__price"}, // ~의 다른 상품들
            {"e":"#recommendation li", "c":".price", "t":".name", "p":".price"} // 최근 본 상품
        ];
        var main_desc_list = [
            {"e":".prod-attr-item", "c":".prod-major-price", "t":".prod-buy-header__title", "p":".prod-price .total-price", "pos":"global", "type":0}, // 상품 페이지 내 총 수량 읽기
            {"e":".prod-option__selected-container .value", "c":".prod-major-price", "t":".prod-buy-header__title", "p":".prod-price .total-price,.prod-price .origin-price", "pos":"global", "type":1}, // 상품 페이지 콤보박스의 현재 개수 읽기
            {"e":".prod-option-dropdown-item", "c":".prod-option__dropdown-item-price strong", "t":".prod-option__dropdown-item-title", "p":".prod-option__dropdown-item-price strong", "pos":"dropdown", "type":1} // 상품 페이지 내 총 수량 읽기
        ];

        function createCallback(option, callback){
            $(document).arrive(option.e, {existing: true}, function (elem) {
                callback(elem, option);
            });
        }

        for(var i=0; i<main_f_list.length; ++i){
            createCallback(main_f_list[i], main_f);
        }

        for(var i=0; i<main_desc_list.length; ++i){
            createCallback(main_desc_list[i], main_desc);
        }
    }
    catch(e){
        NOMO_DEBUG("error from main", e);
    }
})();