UGIT.CLONE=METHOD(i=>{let n=require("simple-git");return{run:(i,r)=>{let e,t,s=i.url,o=i.path,u=i.username,d=i.password;void 0!==r&&(CHECK_IS_DATA(r)!==!0?t=r:(e=r.error,t=r.success)),n().silent(!0).clone(s.substring(0,s.indexOf("://")+3)+u+":"+d+"@"+s.substring(s.indexOf("://")+3),o,i=>{i!==TO_DELETE?void 0!==e&&e(i.toString()):void 0!==t&&t()})}}}),UGIT.DIFF=METHOD(i=>{let n=require("simple-git"),r=require("git-diff-parser");return{run:(i,e)=>{let t,s,o=i.url,u=i.path,d=i.username,f=i.password;CHECK_IS_DATA(e)!==!0?s=e:(t=e.error,s=e.success),n(u).silent(!0).addConfig("remote.origin.url",o.substring(0,o.indexOf("://")+3)+d+":"+f+"@"+o.substring(o.indexOf("://")+3),i=>{i!==TO_DELETE?void 0!==t&&t(i.toString()):n(u).silent(!0).add("./*").diff(["origin/master"],(i,n)=>{if(i!==TO_DELETE)void 0!==t&&t(i.toString());else if(void 0!==s){let i=[],e=[],t=[],o=[],u=r(n).commits[0];void 0!==u&&EACH(u.files,n=>{n.added===!0?i.push(n.name):n.deleted===!0?o.push(n.name):n.renamed===!0?t.push(n.name):e.push(n.name)}),s(i,e,t,o)}})})}}}),UGIT.PULL=METHOD(i=>{let n=require("simple-git");return{run:(i,r)=>{let e,t,s=i.url,o=i.path,u=i.username,d=i.password;void 0!==r&&(CHECK_IS_DATA(r)!==!0?t=r:(e=r.error,t=r.success)),n(o).silent(!0).addConfig("remote.origin.url",s.substring(0,s.indexOf("://")+3)+u+":"+d+"@"+s.substring(s.indexOf("://")+3),i=>{i!==TO_DELETE?void 0!==e&&e(i.toString()):n(o).silent(!0).pull("origin","master",i=>{i!==TO_DELETE?void 0!==e&&e(i.toString()):void 0!==t&&t()})})}}}),UGIT.PUSH=METHOD(i=>{let n=require("simple-git");return{run:(i,r)=>{let e,t,s=i.url,o=i.path,u=i.username,d=i.password,f=i.message;void 0!==r&&(CHECK_IS_DATA(r)!==!0?t=r:(e=r.error,t=r.success)),n(o).silent(!0).addConfig("remote.origin.url",s.substring(0,s.indexOf("://")+3)+u+":"+d+"@"+s.substring(s.indexOf("://")+3),i=>{i!==TO_DELETE?void 0!==e&&e(i.toString()):n(o).silent(!0).add("./*").commit(f).push("origin","master",i=>{i!==TO_DELETE?void 0!==e&&e(i.toString()):void 0!==t&&t()})})}}});