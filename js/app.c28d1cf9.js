(function(e){function t(t){for(var r,o,u=t[0],i=t[1],s=t[2],l=0,f=[];l<u.length;l++)o=u[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(t);while(f.length)f.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==a[u]&&(r=!1)}r&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},a={app:0},c=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-1316ed3e":"37f0d9e2","chunk-27cb639c":"aa27ad01","chunk-2d0a4bcc":"4b9d4d5d","chunk-2d2143d1":"bde24c3a","chunk-3795da7f":"859d923f","chunk-3c030589":"4f235a13","chunk-74e19d3e":"3d5e98b5","chunk-7a6f8231":"6bc92068","chunk-b7380b18":"d3945bf7","chunk-db9dbe3c":"bf370ac7","chunk-fb73714e":"195cbc8c"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-1316ed3e":1,"chunk-3c030589":1,"chunk-74e19d3e":1,"chunk-7a6f8231":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-1316ed3e":"6e842d4e","chunk-27cb639c":"31d6cfe0","chunk-2d0a4bcc":"31d6cfe0","chunk-2d2143d1":"31d6cfe0","chunk-3795da7f":"31d6cfe0","chunk-3c030589":"fb7ef6fd","chunk-74e19d3e":"ffe093ba","chunk-7a6f8231":"08d0fe1d","chunk-b7380b18":"31d6cfe0","chunk-db9dbe3c":"31d6cfe0","chunk-fb73714e":"31d6cfe0"}[e]+".css",a=i.p+r,c=document.getElementsByTagName("link"),u=0;u<c.length;u++){var s=c[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===a))return t()}var f=document.getElementsByTagName("style");for(u=0;u<f.length;u++){s=f[u],l=s.getAttribute("data-href");if(l===r||l===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete o[e],d.parentNode.removeChild(d),n(c)},d.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=c);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=u(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,n[1](f)}a[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/vue_shop/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var d=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("4cae")},"0f27":function(e,t,n){"use strict";var r=n("cebe"),o=n.n(r),a=n("1af2"),c=n.n(a),u=(n("a5d8"),"https://rambuild.cn/api/private/v1"),i=u,s=o.a.create({baseURL:i});s.interceptors.request.use((function(e){return e.headers.Authorization=window.localStorage.getItem("token"),c.a.start(),e})),s.interceptors.response.use((function(e){return c.a.done(),e}));t["a"]=s},1391:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n("0f27");function o(){return Object(r["a"])("/menus")}},"164e":function(e,t){e.exports=echarts},"18d9":function(e,t){e.exports=VueQuillEditor},"1af2":function(e,t){e.exports=NProgress},"4cae":function(e,t,n){"use strict";n.r(t);n("99af"),n("4de4"),n("4d90"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("8bbf"),o=n.n(r),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},c=[],u={name:"app",components:{}},i=u,s=n("2877"),l=Object(s["a"])(i,a,c,!1,null,null,null),f=l.exports,d=(n("d3b7"),n("6389")),p=n.n(d),h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login_container"},[n("div",{staticClass:"login_box"},[e._m(0),n("el-form",{ref:"loginFormRef",staticClass:"login_form",attrs:{model:e.loginForm,rules:e.loginRules}},[n("el-form-item",{attrs:{prop:"username"}},[n("el-input",{attrs:{placeholder:"账号","prefix-icon":"iconfont icon-user"},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username",t)},expression:"loginForm.username"}})],1),n("el-form-item",{attrs:{prop:"password"}},[n("el-input",{attrs:{placeholder:"密码","prefix-icon":"iconfont icon-3702mima",type:"password"},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}})],1),n("el-form-item",{staticClass:"btns"},[n("el-button",{attrs:{type:"primary",round:""},on:{click:e.login}},[e._v("登录")]),n("el-button",{attrs:{type:"warning",round:""},on:{click:e.resetForm}},[e._v("重置")])],1)],1)],1)])},m=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"avatar_box"},[r("img",{attrs:{src:n("ef33"),alt:""}})])}],b=(n("96cf"),n("1da1")),g=n("0f27");function v(e){return Object(g["a"])({url:"/login",method:"post",data:e})}var k=n("1391"),w={data:function(){return{loginForm:{username:"admin",password:"123456"},loginRules:{username:[{required:!0,message:"请输入账号",trigger:"blur"},{min:3,max:6,message:"长度在 3 到 5 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:15,message:"长度在 6 到 10 个字符",trigger:"blur"}]}}},methods:{resetForm:function(){this.$refs.loginFormRef.resetFields()},login:function(){var e=this;this.$refs.loginFormRef.validate(function(){var t=Object(b["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n){t.next=2;break}return t.abrupt("return");case 2:v(e.loginForm).then((function(t){if(200!==t.data.meta.status)return e.$notify({title:"登录失败!",message:"请检查用户名和密码",type:"error",offset:80,position:"bottom-right",duration:2e3});window.localStorage.setItem("token",t.data.data.token),e.$router.push("/home")}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}},created:function(){var e=this;window.localStorage.getItem("token")&&Object(k["a"])().then((function(t){if(200!==t.data.meta.status)return console.log("token无效");e.$router.push("/welcome")}))}},y=w,x=(n("670b"),Object(s["a"])(y,h,m,!1,null,"713cf6d2",null)),_=x.exports;o.a.use(p.a);var S=[{path:"/login",component:_},{path:"/",redirect:"/login"},{path:"/home",component:function(){return n.e("chunk-74e19d3e").then(n.bind(null,"6511"))},redirect:"/welcome",children:[{path:"/users",component:function(){return n.e("chunk-fb73714e").then(n.bind(null,"7d9c"))}},{path:"/welcome",component:function(){return n.e("chunk-1316ed3e").then(n.bind(null,"c277"))}},{path:"/roles",component:function(){return n.e("chunk-7a6f8231").then(n.bind(null,"88c9"))}},{path:"/rights",component:function(){return n.e("chunk-db9dbe3c").then(n.bind(null,"bee0"))}},{path:"/reports",component:function(){return n.e("chunk-2d2143d1").then(n.bind(null,"afa7"))}},{path:"/orders",component:function(){return n.e("chunk-2d0a4bcc").then(n.bind(null,"085c"))}},{path:"/goods",component:function(){return n.e("chunk-b7380b18").then(n.bind(null,"58b2"))}},{path:"/categories",component:function(){return n.e("chunk-27cb639c").then(n.bind(null,"ca6c"))}},{path:"/params",component:function(){return n.e("chunk-3795da7f").then(n.bind(null,"a652"))}},{path:"/goods/add",component:function(){return n.e("chunk-3c030589").then(n.bind(null,"5f2a"))}}]}],O=p.a.prototype.push;p.a.prototype.push=function(e){return O.call(this,e).catch((function(e){return e}))};var j=new p.a({routes:S});j.beforeEach((function(e,t,n){if("/login"===e.path)return n();var r=window.localStorage.getItem("token");if(!r)return n("/login");n()}));var F=j,E=(n("4e94"),n("82da"),n("18d9")),C=n.n(E);o.a.use(C.a),o.a.config.productionTip=!1,o.a.filter("dateformat",(function(e){var t=new Date(e),n=t.getFullYear(),r=(t.getMonth()+1+"").padStart(2,"0"),o=(t.getDate()+"").padStart(2,"0"),a=(t.getHours()+"").padStart(2,"0"),c=(t.getMinutes()+"").padStart(2,"0"),u=(t.getSeconds()+"").padStart(2,"0");return"".concat(n,"-").concat(r,"-").concat(o," ").concat(a,":").concat(c,":").concat(u)})),new o.a({router:F,render:function(e){return e(f)}}).$mount("#app")},"4e94":function(e,t,n){},"60bb":function(e,t){e.exports=_},6389:function(e,t){e.exports=VueRouter},"670b":function(e,t,n){"use strict";var r=n("8194"),o=n.n(r);o.a},8194:function(e,t,n){},"82da":function(e,t,n){},"8bbf":function(e,t){e.exports=Vue},cebe:function(e,t){e.exports=axios},ef33:function(e,t,n){e.exports=n.p+"img/logo1.fe5a9d7d.png"}});
//# sourceMappingURL=app.c28d1cf9.js.map