UUI.ALERT=CLASS({init:(e,t,n)=>{let o,i,r=n.style,d=n.contentStyle,a=n.buttonStyle,l=n.on,c=n.msg,u=UUI.MODAL({style:COMBINE([{textAlign:"center"},r]),on:l,c:[o=P({style:d,c:c}),i=UUI.BUTTON({style:a,title:MSG({en:"Close",ko:"닫기"}),on:{tap:()=>{f()}}})]}),f=(t.getNode=(()=>{return u.getNode()}),t.append=(e=>{o.append(e)}),t.prepend=(e=>{o.prepend(e)}),t.after=(e=>{u.after(e)}),t.before=(e=>{u.before(e)}),t.remove=(()=>{u.remove()}));t.empty=(()=>{o.empty()}),t.getChildren=(()=>{return o.getChildren()}),t.getButton=(()=>{return i}),t.addContentStyle=(e=>{o.addContentStyle(e)}),t.addButtonStyle=(e=>{i.addStyle(e)})}}),UUI.BUTTON=CLASS({preset:()=>{return NODE},init:(e,t,n)=>{let o,i=n.icon,r=n.title,d=void 0===n.spacing?0:n.spacing,a=n.href,l=n.target,c=A({style:{display:"block",textAlign:"center",cursor:"pointer",textDecoration:"none",touchCallout:"none",userSelect:"none",color:"inherit"},href:a,target:l});void 0!==r&&c.prepend(o=DIV({c:void 0===r?"":r})),void 0!==i&&c.prepend(DIV({style:{marginBottom:void 0!==r?d:0},c:i})),e.setDom(c);t.setTitle=(e=>{o.empty(),o.append(e)}),t.getIcon=(()=>{return i}),t.tap=(()=>{EVENT.fireAll({node:t,name:"tap"})})}}),UUI.BUTTON_H=CLASS({preset:()=>{return NODE},init:(e,t,n)=>{let o,i=n.icon,r=n.title,d=void 0===n.spacing?0:n.spacing,a=n.href,l=n.target,c=n.isIconRight,u=A({style:{display:"block",cursor:"pointer",textDecoration:"none",touchCallout:"none",userSelect:"none",color:"inherit"},href:a,target:l,c:[o=DIV({style:{flt:"left"},c:void 0===r?"":r}),CLEAR_BOTH()]});if(void 0!==i){i.addStyle({flt:"left"}),void 0===i.getStyle("margin")&&void 0===i.getStyle("marginRight")&&i.addStyle(c!==!0?{marginRight:d}:{marginLeft:d}),c!==!0?u.prepend(i):o.after(i);let e=EVENT({name:"resize"},e=>{let t=o.getHeight();t>0&&o.addStyle({marginTop:(i.getHeight()-o.getHeight())/2})});EVENT_ONCE({node:i,name:"load"},t=>{e.fire()}),t.on("show",()=>{e.fire()}),t.on("remove",()=>{e.remove()})}e.setDom(u);t.setTitle=(e=>{o.empty(),o.append(e)}),t.getIcon=(()=>{return i}),t.tap=(()=>{EVENT.fireAll({node:t,name:"tap"})})}}),UUI.CALENDAR=CLASS({preset:()=>{return UUI.TABLE},init:(e,t,n,o)=>{let i=n.year,r=n.month,d=n.date,a=void 0===n.headerStyle?{}:n.headerStyle,l=n.dayStyle,c=n.dateStyle,u=n.todayDateStyle,f=n.otherMonthDateStyle,s=n.selectedDateStyle,p=n.leftArrowIcon,E=n.rightArrowIcon,y=CALENDAR();void 0!==i&&void 0!==r||(void 0===i&&(i=y.getYear()),void 0===r&&(r=y.getMonth()));let g,m;CHECK_IS_DATA(o)!==!0?g=o:(g=o.selectDate,m=o.each);let v,S;t.append(TR({c:TD({colspan:7,style:COMBINE([a,{textAlign:"center"}]),c:[S=SPAN(),DIV({style:{flt:"left",cursor:"pointer",userSelect:"none"},c:void 0===p?"<":p,on:{tap:()=>{r-=1,A()}}}),DIV({style:{flt:"right",cursor:"pointer",userSelect:"none"},c:void 0===E?">":E,on:{tap:()=>{r+=1,A()}}}),CLEAR_BOTH()]})})),t.append(TR({c:[TD({style:l,c:"일"}),TD({style:l,c:"월"}),TD({style:l,c:"화"}),TD({style:l,c:"수"}),TD({style:l,c:"목"}),TD({style:l,c:"금"}),TD({style:l,c:"토"})]}));let A=(t.getYear=(()=>{return v.getYear()}),t.getMonth=(()=>{return v.getMonth()}),RAR(()=>{let e,n,o,a=CALENDAR(CREATE_DATE({year:i,month:r+1,date:0})),l=0;v=CALENDAR(CREATE_DATE({year:i,month:r,date:1}));let p=CALENDAR(CREATE_DATE({year:i,month:r,date:-(v.getDay()-1)}));S.empty(),S.append(v.getYear()+"년 "+v.getMonth()+"월"),REPEAT(7,e=>{t.removeTR(e)}),REPEAT(v.getDay(),d=>{l%7===0&&t.addTR({key:l/7,tr:e=TR()});let a;e.append(a=TD({style:void 0===f?c:f,c:p.getDate()+d,on:{tap:(e,a)=>{void 0!==o&&n.addStyle(o),n=a,o=void 0===f?c:f,void 0!==s&&a.addStyle(s),void 0!==g&&g(CALENDAR(CREATE_DATE({year:i,month:r-1,date:p.getDate()+d})),t)}}})),void 0!==m&&m(a,CALENDAR(CREATE_DATE({year:i,month:r-1,date:p.getDate()+d})),t),l+=1}),REPEAT({start:v.getDate(),end:a.getDate()},(a,f)=>{l%7===0&&t.addTR({key:l/7,tr:e=TR()});let p;e.append(p=TD({style:COMBINE([c,void 0!==u&&v.getYear()===y.getYear()&&v.getMonth()===y.getMonth()&&a===y.getDate()?u:{}]),c:a,on:{tap:(e,d)=>{void 0!==o&&n.addStyle(o),n=d,o=COMBINE([c,void 0!==u&&v.getYear()===y.getYear()&&v.getMonth()===y.getMonth()&&a===y.getDate()?u:{}]),void 0!==s&&d.addStyle(s),void 0!==g&&g(CALENDAR(CREATE_DATE({year:i,month:r,date:a})),t)}}})),v.getYear()===y.getYear()&&v.getMonth()===y.getMonth()&&a===d&&(void 0!==o&&n.addStyle(o),n=p,o=COMBINE([c,void 0!==u&&v.getYear()===y.getYear()&&v.getMonth()===y.getMonth()&&a===y.getDate()?u:{}]),void 0!==s&&p.addStyle(s)),void 0!==m&&m(p,CALENDAR(CREATE_DATE({year:i,month:r,date:a})),t),l+=1}),REPEAT(42-l,d=>{l%7===0&&t.addTR({key:l/7,tr:e=TR()});let a;e.append(a=TD({style:void 0===f?c:f,c:d+1,on:{tap:(e,a)=>{void 0!==o&&n.addStyle(o),n=a,o=void 0===f?c:f,void 0!==s&&a.addStyle(s),void 0!==g&&g(CALENDAR(CREATE_DATE({year:i,month:r+1,date:d+1})),t)}}})),void 0!==m&&m(a,CALENDAR(CREATE_DATE({year:i,month:r+1,date:d+1})),t),l+=1})}))}}),UUI.CONFIRM=CLASS({init:(e,t,n,o)=>{let i,r,d,a=n.style,l=n.contentStyle,c=n.okButtonStyle,u=n.cancelButtonStyle,f=n.on,s=n.msg,p=UUI.MODAL({style:COMBINE([{textAlign:"center"},a]),on:f,c:[i=P({style:l,c:s}),r=UUI.BUTTON({style:c,title:MSG({en:"Ok",ko:"확인"}),on:{tap:()=>{o(),E()}}}),d=UUI.BUTTON({style:u,title:MSG({en:"Close",ko:"닫기"}),on:{tap:()=>{E()}}}),CLEAR_BOTH()]}),E=(t.getNode=(()=>{return p.getNode()}),t.append=(e=>{i.append(e)}),t.prepend=(e=>{i.prepend(e)}),t.after=(e=>{p.after(e)}),t.before=(e=>{p.before(e)}),t.remove=(()=>{p.remove()}));t.empty=(()=>{i.empty()}),t.getChildren=(()=>{return i.getChildren()}),t.getOkButton=(()=>{return r}),t.getCancelButton=(()=>{return d}),t.addContentStyle=(e=>{i.addContentStyle(e)}),t.addOkButtonStyle=(e=>{r.addStyle(e)}),t.addCancelButtonStyle=(e=>{d.addStyle(e)})}}),UUI.FULL_CHECKBOX=CLASS({preset:()=>{return NODE},init:(e,t,n)=>{let o,i=n.name,r=n.label,d=void 0===n.spacing?0:n.spacing,a=n.value,l=n.inputStyle,c=DIV({style:{position:"relative"},c:[o=INPUT({style:{flt:"left",marginRight:5},name:i,type:"checkbox",value:a}),SPAN({style:{marginLeft:d,flt:"left",cursor:"pointer"},c:r,on:{tap:e=>{o.toggleCheck(),EVENT.fireAll({node:t,name:"change"})}}}),CLEAR_BOTH()]});e.setWrapperDom(c);let u=(t.getName=(()=>{return i}),t.getValue=(()=>{return o.getValue()}),t.setValue=(e=>{let n=o.checkIsChecked();o.setValue(e),e===!0?n!==!0&&EVENT.fireAll({node:t,name:"change"}):n===!0&&EVENT.fireAll({node:t,name:"change"})}),t.select=(()=>{o.select(),EVENT.fireAll({node:t,name:"select"}),EVENT.fireAll({node:t,name:"focus"})}),t.blur=(()=>{o.blur(),EVENT.fireAll({node:t,name:"blur"})}),t.addInputStyle=(e=>{o.addStyle(e)}));void 0!==l&&u(l);t.on=((e,n)=>{"focus"===e||"blur"===e||"change"===e||"keydown"===e||"keypress"===e||"keyup"===e?EVENT({node:t,lowNode:o,name:e},n):EVENT({node:t,lowNode:c,name:e},n)}),t.toggleCheck=(e=>{let n=o.toggleCheck();return EVENT.fireAll({node:t,name:"change"}),n}),t.checkIsChecked=(()=>{return o.checkIsChecked()});EVENT({node:t,lowNode:o,name:"keyup"},e=>{void 0!==e&&" "===e.getKey()&&DELAY(()=>{EVENT.fireAll({node:t,name:"change"})})})}}),UUI.FULL_INPUT=CLASS({preset:()=>{return NODE},init:(e,t,n)=>{let o,i=n.name,r=n.type,d=n.placeholder,a=n.capture,l=n.accept,c=n.value,u=n.inputStyle,f=n.isOffAutocomplete,s=DIV({style:{padding:5,backgroundColor:"#fff"},c:DIV({style:{position:"relative"},c:[SPAN({style:{visibility:"hidden"},c:"."}),o=INPUT({style:{position:"absolute",left:0,top:0,width:"100%",border:"none",background:"date"===r||"datetime"===r||"datetime-local"===r||"month"===r||"time"===r||"week"===r?void 0:"transparent"},name:i,type:r,value:c,capture:a,accept:l,placeholder:d,isOffAutocomplete:f})]}),on:{tap:()=>{o.focus(),EVENT.fireAll({node:t,name:"focus"})}}});e.setWrapperDom(s);let p=(t.getName=(()=>{return i}),t.getValue=(()=>{return o.getValue()}),t.setValue=(e=>{let n=o.getValue();o.setValue(e),n!==e&&EVENT.fireAll({node:t,name:"change"})}),t.select=(()=>{o.select(),EVENT.fireAll({node:t,name:"select"}),EVENT.fireAll({node:t,name:"focus"})}),t.focus=(()=>{o.focus(),EVENT.fireAll({node:t,name:"focus"})}),t.blur=(()=>{o.blur(),EVENT.fireAll({node:t,name:"blur"})}),t.addInputStyle=(e=>{o.addStyle(e)}));void 0!==u&&p(u);t.on=((e,n)=>{"focus"===e||"blur"===e||"change"===e||"keydown"===e||"keypress"===e||"keyup"===e?EVENT({node:t,lowNode:o,name:e},n):EVENT({node:t,lowNode:s,name:e},n)})}}),UUI.FULL_SELECT=CLASS({preset:()=>{return NODE},init:(e,t,n)=>{let o,i=n.name,r=n.value,d=n.options,a=n.selectStyle,l=DIV({style:{padding:5,backgroundColor:"#fff",position:"relative"},c:o=SELECT({style:{width:"100%",border:"none",background:"transparent"},name:i,value:r,c:d})});e.setWrapperDom(l);let c=(t.getName=(()=>{return i}),t.getValue=(()=>{return o.getValue()}),t.setValue=(e=>{let n=o.getValue();o.setValue(e),n!==e&&EVENT.fireAll({node:t,name:"change"})}),t.select=(()=>{o.select()}),t.blur=(()=>{o.blur()}),t.addSelectStyle=(e=>{o.addStyle(e)}));void 0!==a&&c(a);t.addOption=(e=>{o.append(e)}),t.removeAllOptions=(()=>{o.empty()}),t.on=((e,n)=>{"focus"===e||"blur"===e||"change"===e||"select"===e||"keydown"===e||"keypress"===e||"keyup"===e?EVENT({node:t,lowNode:o,name:e},n):EVENT({node:t,lowNode:l,name:e},n)})}}),UUI.FULL_SUBMIT=CLASS({preset:()=>{return NODE},init:(e,t,n)=>{let o=void 0===n?void 0:n.value,i=INPUT({type:"submit",style:{display:"block",border:"none",width:"100%",padding:"10px 0",cursor:"pointer"}});void 0!==o&&i.setValue(o),e.setDom(i);t.getValue=(()=>{return i.getValue()}),t.setValue=(e=>{i.setValue(e)})}}),UUI.FULL_TEXTAREA=CLASS({preset:()=>{return NODE},init:(e,t,n)=>{let o,i=n.name,r=n.placeholder,d=n.value,a=n.textareaStyle,l=DIV({style:{padding:5,backgroundColor:"#fff",position:"relative",height:100},c:o=TEXTAREA({style:{width:"100%",height:"100%",backgroundColor:"transparent",border:"none"},name:i,placeholder:r,value:d})});e.setWrapperDom(l),e.setContentDom(o);let c=(t.getName=(()=>{return i}),t.getValue=(()=>{return o.getValue()}),t.setValue=(e=>{let n=o.getValue();o.setValue(e),n!==e&&EVENT.fireAll({node:t,name:"change"})}),t.select=(()=>{o.select()}),t.focus=(()=>{o.focus()}),t.blur=(()=>{o.blur()}),t.addTextareaStyle=(e=>{o.addStyle(e)}));void 0!==a&&c(a);t.on=((e,n)=>{"focus"===e||"blur"===e||"change"===e||"keydown"===e||"keypress"===e||"keyup"===e?EVENT({node:t,lowNode:o,name:e},n):EVENT({node:t,lowNode:l,name:e},n)})}}),UUI.FULL_UPLOAD_FORM=CLASS({preset:()=>{return NODE},init:(e,t,n,o)=>{let i,r,d=n.box,a=n.accept,l=n.isMultiple,c=void 0!==n.callbackURL?n.callbackURL:(BROWSER_CONFIG.isSecure===!0?"https://":"http://")+BROWSER_CONFIG.host+":"+BROWSER_CONFIG.port+"/__CORS_CALLBACK",u=n.formStyle,f=n.inputStyle,s=n.uploadingStyle;void 0!==o&&(i=o.success,r=o.overSizeFile);let p,E,y,g,m,v,S=DIV({style:{padding:5,background:"#FFF",position:"relative"},c:[g=IFRAME({style:{display:"none"},name:"__UPLOAD_FORM_"+t.id}),m=UUI.V_CENTER({style:{display:"none",position:"absolute",top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",color:"#fff",textAlign:"center"},c:["Uploading...",v=SPAN({style:{marginLeft:10}})]})]});GET({isSecure:BROWSER_CONFIG.isSecure,port:BROWSER_CONFIG.port,uri:"__UPLOAD_SERVER_HOST?defaultHost="+BROWSER_CONFIG.host},e=>{let n=RANDOM_STR(20);g.after(E=FORM({action:(BROWSER_CONFIG.isSecure===!0?"https://":"http://")+e+":"+BROWSER_CONFIG.port+"/__UPLOAD?boxName="+d.boxName+"&callbackURL="+c+"&uploadKey="+n,target:"__UPLOAD_FORM_"+t.id,method:"POST",enctype:"multipart/form-data",style:u,c:[y=INPUT({type:"file",name:"file",accept:a,isMultiple:l,style:COMBINE([{width:"100%",height:"100%",color:"#000",border:"none"},f])}),INPUT({type:"submit",style:{visibility:"hidden",position:"absolute"}})]})),EVENT({node:y,name:"change"},e=>{""!==y.getValue()&&(m.addStyle({width:S.getWidth(),height:S.getHeight()}),m.show(),void 0!==p&&p.exit(),p=d.ROOM("uploadProgressRoom/"+n),p.on("progress",e=>{v.empty(),v.append("("+e.bytesRecieved+"/"+e.bytesExpected+")")}),void 0!==E&&E.submit())})}),EVENT({node:g,name:"load"},e=>{let n,o=global["__UPLOAD_FORM_"+t.id],d=void 0!==o?o.fileDataSetStr:void 0,a=void 0!==o?o.maxUploadFileMB:void 0;if(void 0!==a)void 0!==r&&r(a),n=y.getValue(),y.setValue(""),""!==n&&EVENT.fireAll({node:t,name:"change"});else if(void 0!==d){let e=PARSE_STR(decodeURIComponent(d));EACH(e,(t,n)=>{e[n]=UNPACK_DATA(t)}),void 0!==i&&i(l!==!0?e[0]:e,t),n=y.getValue(),y.setValue(""),""!==n&&EVENT.fireAll({node:t,name:"change"})}m.hide(),void 0!==p&&(p.exit(),p=void 0)}),e.setWrapperDom(S);let A=(t.select=(()=>{void 0!==y&&(y.select(),EVENT.fireAll({node:t,name:"select"}),EVENT.fireAll({node:t,name:"focus"}))}),t.addFormStyle=(e=>{void 0!==E?E.addStyle(e):EXTEND({origin:u,extend:e})}));void 0!==u&&A(u);let T=t.addInputStyle=(e=>{void 0!==y?y.addStyle(e):EXTEND({origin:f,extend:e})});void 0!==f&&T(f);let C=t.addUploadingStyle=(e=>{m.addStyle(e)});void 0!==s&&C(s);t.on=((e,n)=>{"focus"===e||"blur"===e||"change"===e||"keydown"===e||"keypress"===e||"keyup"===e?EVENT({node:t,lowNode:y,name:e},n):EVENT({node:t,lowNode:S,name:e},n)})}}),UUI.IMG_BUTTON=CLASS({preset:()=>{return NODE},init:(e,t,n)=>{let o=n.icon,i=n.href,r=n.target,d=A({style:{cursor:"pointer",textDecoration:"none",touchCallout:"none",userSelect:"none"},href:i,target:r,c:o});e.setDom(d);t.getIcon=(()=>{return o}),t.tap=(()=>{EVENT.fireAll({node:t,name:"tap"})})}}),UUI.LIST=CLASS({preset:()=>{return NODE},init:(e,t,n)=>{let o,i,r,d=void 0===n?void 0:n.isRequiringClearBoth,a=[],l={};void 0===i&&(i={}),e.setDom(o=UL());let c=t.addItem=(e=>{let n=e.key,l=e.item,c=e.isFirst;void 0!==i[n]?(l.insertBefore(i[n]),a[FIND({array:a,value:i[n]})]=l,i[n].remove()):c===!0&&a.length>0?(l.insertBefore(a[0]),a.unshift(l)):(t.append(l),a.push(l)),i[n]=l,d===!0&&(void 0!==r&&r.remove(),r=CLEAR_BOTH().appendTo(o))});void 0!==n&&void 0!==n.items&&EACH(n.items,(e,t)=>{c({key:t,item:e})});t.removeItem=(e=>{let t=i[e],n=l[e];void 0!==t&&t.remove(),void 0!==n&&EACH(n,e=>{e()}),REMOVE({array:a,value:t}),REMOVE({data:i,name:e}),REMOVE({data:l,name:e})}),t.addRemoveItemHandler=((e,t)=>{void 0===l[e]&&(l[e]=[]),l[e].push(t)}),t.removeAllItems=(()=>{EACH(i,(e,t)=>{let n=l[t];e.remove(),void 0!==n&&EACH(n,e=>{e()})}),i={},a=[],l={}})}}),UUI.LOADING=CLASS({init:(e,t,n)=>{let o=n.style,i=n.contentStyle,r=n.indicator,d=n.msg,a=n.on,l=UUI.MODAL({style:COMBINE([{textAlign:"center"},o]),contentStyle:i,isCannotClose:!0,c:[void 0===r?"":r,P({style:void 0===r?{}:{marginTop:10},c:d})],on:a});t.getNode=(()=>{return l.getNode()}),t.append=(e=>{l.append(e)}),t.prepend=(e=>{l.prepend(e)}),t.after=(e=>{l.after(e)}),t.before=(e=>{l.before(e)}),t.remove=(()=>{l.remove()}),t.empty=(()=>{l.empty()}),t.getChildren=(()=>{return l.getChildren()}),t.addStyle=(e=>{l.addStyle(e)}),t.addContentStyle=(e=>{l.addContentStyle(e)})}}),UUI.MODAL=CLASS({init:(e,t,n)=>{let o,i=void 0===n?void 0:n.c,r=void 0===n?void 0:n.style,d=void 0===n?void 0:n.contentStyle,a=void 0===n?void 0:n.xStyle,l=void 0===n?void 0:n.xIcon,c=void 0===n?void 0:n.isCannotClose,u=DIV({c:[o=DIV(),void 0===l?"":UUI.IMG_BUTTON({style:COMBINE([{lineHeight:0,position:"absolute"},void 0===a?{top:-10,right:-10}:a]),icon:l,on:{tap:e=>{v()},mouseover:()=>{g({opacity:.8})},mouseout:()=>{g({opacity:1})}}})]}).appendTo(BODY),f=RAR(()=>{let e=(WIN_WIDTH()-u.getWidth())/2,t=(WIN_HEIGHT()-u.getHeight())/2;u.addStyle({position:"fixed",left:e<0?0:e,top:t<0?0:t});let n=e=>{EACH(e,e=>{e.type===IMG&&EVENT({node:e,name:"load"},()=>{f()}),void 0!==e.getChildren&&n(e.getChildren())})};n(u.getChildren())});u.on("show",f);let s=EVENT({name:"resize"},f),p=EVENT({name:"keydown"},e=>{"Escape"===e.getKey()&&c!==!0&&v()});u.on("remove",()=>{s.remove(),p.remove()});let E=(t.getNode=(()=>{return u}),t.append=(e=>{o.append(e),f()}));void 0!==i&&(CHECK_IS_ARRAY(i)===!0?EACH(i,(e,t)=>{E(e)}):E(i));let y=(t.prepend=(e=>{o.prepend(e),f()}),t.after=(e=>{u.after(e),f()}),t.before=(e=>{u.before(e),f()}),t.remove=(()=>{u.remove()})),g=(t.empty=(()=>{o.empty()}),t.getChildren=(()=>{return o.getChildren()}),t.addStyle=(e=>{u.addStyle(e),f()}));void 0!==r&&g(r);let m=t.addContentStyle=(e=>{o.addStyle(e),f()});void 0!==d&&m(d);let v=(t.on=((e,n)=>{EVENT({node:t,lowNode:u,name:e},n)}),t.close=(()=>{EVENT.fireAll({node:t,name:"close"})!==!1&&y()}));t.getLeft=(()=>{return u.getLeft()}),t.getTop=(()=>{return u.getTop()})},afterInit:(e,t,n)=>{let o;void 0!==n&&CHECK_IS_DATA(n)===!0&&(o=n.on),void 0!==o&&EACH(o,(e,n)=>{t.on(n,e)})}}),UUI.NOTICE=CLASS({init:(e,t,n)=>{let o=n.style,i=n.contentStyle,r=n.isCannotClose,d=n.on,a=n.msg,l=UUI.MODAL({style:COMBINE([{textAlign:"center"},o]),contentStyle:i,isCannotClose:!0,on:d,c:a});t.getNode=(()=>{return l.getNode()}),t.append=(e=>{l.append(e)}),t.prepend=(e=>{l.prepend(e)}),t.after=(e=>{l.after(e)}),t.before=(e=>{l.before(e)}),t.remove=(()=>{l.remove()}),t.empty=(()=>{l.empty()}),t.getChildren=(()=>{return l.getChildren()}),t.addContentStyle=(e=>{l.addContentStyle(e)});r!==!0&&DELAY(2,()=>{l.close()})}}),UUI.PANEL=CLASS({preset:()=>{return NODE},init:(e,t,n)=>{let o,i,r=void 0===n?void 0:n.contentStyle;o=DIV({c:i=DIV()}),e.setWrapperDom(o),e.setContentDom(i);let d=t.addContentStyle=(e=>{i.addStyle(e)});void 0!==r&&d(r)}}),UUI.PROMPT=CLASS({init:(e,t,n,o)=>{let i,r,d,a,l,c=n.style,u=n.contentStyle,f=n.inputStyle,s=n.okButtonStyle,p=n.cancelButtonStyle,E=n.on,y=n.msg,g=UUI.MODAL({style:COMBINE([{textAlign:"center"},c]),on:E,c:[i=P({style:u,c:y}),r=FORM({c:d=UUI.FULL_INPUT({style:f}),on:{submit:()=>{o(d.getValue()),m()}}}),a=UUI.BUTTON({style:s,title:MSG({en:"Ok",ko:"확인"}),on:{tap:()=>{r.submit()}}}),l=UUI.BUTTON({style:p,title:MSG({en:"Close",ko:"닫기"}),on:{tap:()=>{m()}}}),CLEAR_BOTH()]}),m=(t.getNode=(()=>{return g.getNode()}),t.append=(e=>{i.append(e)}),t.prepend=(e=>{i.prepend(e)}),t.after=(e=>{g.after(e)}),t.before=(e=>{g.before(e)}),t.remove=(()=>{g.remove()}));t.empty=(()=>{i.empty()}),t.getChildren=(()=>{return i.getChildren()}),t.getOkButton=(()=>{return a}),t.getCancelButton=(()=>{return l}),t.addContentStyle=(e=>{i.addContentStyle(e)}),t.addInputStyle=(e=>{d.addStyle(e)}),t.addOkButtonStyle=(e=>{a.addStyle(e)}),t.addCancelButtonStyle=(e=>{l.addStyle(e)})}}),UUI.TABLE=CLASS({preset:()=>{return NODE},init:(e,t,n)=>{let o=void 0===n?void 0:n.trs,i=[],r={};void 0===o&&(o={});let d;e.setDom(d=TABLE());t.addTR=(e=>{let n=e.key,r=e.tr,d=e.isFirst;void 0!==o[n]?(r.insertBefore(o[n]),i[FIND({array:i,value:o[n]})]=r,o[n].remove()):d===!0&&i.length>0?(r.insertBefore(i[0]),i.unshift(r)):(t.append(r),i.push(r)),o[n]=r});EACH(o,(e,n)=>{i.push(e),t.append(e)});t.removeTR=(e=>{let t=o[e],n=r[e];void 0!==t&&t.remove(),void 0!==n&&EACH(n,e=>{e()}),REMOVE({array:i,value:t}),REMOVE({data:o,name:e}),REMOVE({data:r,name:e})}),t.addRemoveTRHandler=((e,t)=>{void 0===r[e]&&(r[e]=[]),r[e].push(t)}),t.removeAllTRs=(()=>{EACH(o,(e,t)=>{let n=r[t];e.remove(),void 0!==n&&EACH(n,e=>{e()})}),o={},i=[],r={}})}}),UUI.TEXT_BUTTON=CLASS({preset:()=>{return NODE},init:(e,t,n)=>{let o,i=n.title,r=n.href,d=n.target,a=A({style:{cursor:"pointer",textDecoration:"none",touchCallout:"none",userSelect:"none"},href:r,target:d,c:o=SPAN({c:void 0===i?void 0===r?"":r:i})});e.setDom(a);t.setTitle=(e=>{o.empty(),o.append(e)}),t.tap=(()=>{EVENT.fireAll({node:t,name:"tap"})})}}),UUI.TITLE=CLASS({preset:()=>{return NODE},init:(e,t,n)=>{let o,i=n.icon,r=n.title,d=void 0===n.spacing?0:n.spacing,a=n.isIconRight,l=DIV({c:[o=DIV({style:{flt:"left"},c:void 0===r?"":r}),CLEAR_BOTH()]});if(void 0!==i){i.addStyle({flt:"left"}),void 0===i.getStyle("margin")&&void 0===i.getStyle("marginRight")&&i.addStyle(a!==!0?{marginRight:d}:{marginLeft:d}),a!==!0?l.prepend(i):o.after(i);let e=EVENT({name:"resize"},e=>{let t=o.getHeight();t>0&&o.addStyle({marginTop:(i.getHeight()-o.getHeight())/2})});EVENT_ONCE({node:i,name:"load"},t=>{e.fire()}),t.on("show",()=>{e.fire()}),t.on("remove",()=>{e.remove()})}e.setDom(l);t.setTitle=(e=>{o.empty(),o.append(e)}),t.getIcon=(()=>{return i})}}),UUI.VALID_FORM=CLASS({preset:()=>{return FORM},init:(e,t,n)=>{let o=void 0===n?void 0:n.errorMsgs,i=void 0===n?void 0:n.errorMsgStyle,r=[];t.on("remove",()=>{EACH(r,e=>{e.remove()})});t.showErrors=(e=>{let n=COPY(e),d=e=>{EACH(e.getChildren(),e=>{if(void 0!==e.getValue&&void 0!==e.getName){let t=e.getName(),d=n[t];if(void 0!==d&&void 0!==o){let a=o[t][d.type];"function"==typeof a&&(a=a(void 0!==d.validParam?d.validParam:d.validParams));let l;e.after(l=P({style:i,c:a})),REMOVE({data:n,name:t}),r.push(DELAY(3,e=>{l.remove(),REMOVE({array:r,value:e})}))}}d(e)})};d(t)}),t.getErrorMsgs=(e=>{let t={};return EACH(e,(e,n)=>{if(void 0!==o){let i=o[n][e.type];"function"==typeof i&&(i=i(void 0!==e.validParam?e.validParam:e.validParams)),t[n]=i}}),t}),t.getErrorMsgStyle=(()=>{return i})}}),UUI.V_CENTER=CLASS({preset:()=>{return NODE},init:(e,t,n)=>{let o,i=void 0===n?void 0:n.contentStyle,r=TABLE({style:{width:"100%",margin:0,padding:0},c:TR({style:{margin:0,padding:0},c:o=TD({style:{margin:0,padding:0}})})});e.setWrapperDom(r),e.setContentDom(o);let d=t.addContentStyle=(e=>{o.addStyle(e)});void 0!==i&&d(i)}});