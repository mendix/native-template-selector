(this["webpackJsonpnative-template-selector"]=this["webpackJsonpnative-template-selector"]||[]).push([[0],{37:function(e,t,n){},38:function(e,t,n){},76:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(32),s=n.n(a),o=(n(37),n(3)),i=(n(38),n(8)),u=n.n(i),l=n(28),j=n(9),b=n.n(j),f="mendix/native-template",d="https://raw.githubusercontent.com/".concat(f,"/master"),p="".concat(d,"/mendix_version.json"),m="".concat(d,"/.mx/releases_list.json"),O=Object.freeze({loading:1,complete:2});var v=n(1);var h=function(e){var t,n,c=e.versions,a=e.releases,s=Object(r.useRef)(),i=Object(r.useState)(),u=Object(o.a)(i,2),l=u[0],j=u[1],f=Object(r.useState)(),d=Object(o.a)(f,2),p=d[0],m=d[1],O=Object(r.useState)(),h=Object(o.a)(O,2),x=h[0],g=h[1],S=(t=c,n=a,Object(r.useCallback)((function(e){if(!b.a.parse(e,{loose:!0})){var r=e.split("."),c=["x","x","x"].map((function(e,t){var n;return null!==(n=r[t])&&void 0!==n?n:e})).join(".");return{error:"The supplied mendix version is not valid. It needs to be a valid Semantic Version. eg ".concat(c)}}var a=Object.keys(t).find((function(t){return b.a.satisfies(b.a.coerce(e),t)}));if(!a)return{error:"Could not determine a proper mendix version range for ".concat(e)};var s=t[a],o=s.min,i=s.max,u=n.map((function(e){return e.tag_name})),l=b.a.maxSatisfying(u,"".concat(o," - ").concat(i));return l?{result:n[u.indexOf(l)]}:{error:"Could not determine a proper template version when ".concat(a," using ").concat(e)}}),[t,n])),w=Object(r.useCallback)((function(){g(void 0),m(void 0),j(void 0);var e=s.current.value;if(e){var t=S(e),n=t.error,r=t.result;n?m(n):j(r)}else g("Needs a value")}),[S]);return Object(v.jsxs)("div",{className:"query-body",children:[Object(v.jsx)("h2",{className:"header",children:"Input Mendix Version"}),Object(v.jsx)("div",{className:"selector",children:Object(v.jsx)("input",{ref:s,onChange:w})}),Object(v.jsxs)("div",{className:"result",children:[l&&Object(v.jsx)("p",{className:"success",children:Object(v.jsxs)("span",{children:["Required version: ",l.tag_name]})}),x&&Object(v.jsx)("p",{className:"warning",children:Object(v.jsx)("span",{children:x})}),p&&Object(v.jsx)("p",{className:"error",children:Object(v.jsx)("span",{children:p})})]})]})},x=function(){var e=function(){var e=Object(r.useState)(O.loading),t=Object(o.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(),s=Object(o.a)(a,2),i=s[0],j=s[1],b=Object(r.useState)(),f=Object(o.a)(b,2),d=f[0],v=f[1],h=Object(r.useState)(),x=Object(o.a)(h,2),g=x[0],S=x[1];return Object(r.useEffect)((function(){Promise.all([fetch(p),fetch(m)].map((function(e){return e.then(function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.ok){e.next=4;break}return e.next=3,t.text();case 3:throw e.sent;case 4:return e.abrupt("return",t.json());case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}))).then((function(e){var t=Object(o.a)(e,2),n=t[0],r=t[1];v(n),S(r)})).catch((function(e){var t=Object(o.a)(e,2),n=t[0],r=t[1];j(null!==n&&void 0!==n?n:r)})).finally((function(){c(O.complete)}))}),[]),{state:n,error:i,mendixVersions:d,mendixReleases:g}}(),t=e.state,n=e.error,c=e.mendixVersions,a=e.mendixReleases,s=function(){var e=Object(r.useState)(O.loading),t=Object(o.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(),s=Object(o.a)(a,2),i=s[0],j=s[1],b=Object(r.useState)(),d=Object(o.a)(b,2),p=d[0],m=d[1];return Object(r.useEffect)((function(){fetch("http://github.com/".concat(f,"/compare/v6.1.4...v6.0.2.diff")).then(function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.warn(t),t.ok){e.next=5;break}return e.next=4,t.text();case 4:throw e.sent;case 5:return e.abrupt("return",t.text());case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then((function(e){console.log(e),m(e)})).catch((function(e){j(e)})).finally((function(){c(O.complete)}))}),[]),{state:n,error:i,templateDiff:p}}(),i=s.state,j=s.error,b=s.templateDiff;return console.log({a:i,b:j,templateDiff:b}),Object(v.jsxs)("div",{className:"App",children:[t===O.loading&&Object(v.jsx)("p",{children:"Loading..."}),t===O.complete&&n&&Object(v.jsxs)("p",{className:"error",children:["An error occurred...",Object(v.jsx)("br",{}),n]}),t===O.complete&&!n&&Object(v.jsx)(h,{versions:c,releases:a})]})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,77)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),r(e),c(e),a(e),s(e)}))};s.a.render(Object(v.jsx)(c.a.StrictMode,{children:Object(v.jsx)(x,{})}),document.getElementById("root")),g()}},[[76,1,2]]]);
//# sourceMappingURL=main.b6ff5773.chunk.js.map