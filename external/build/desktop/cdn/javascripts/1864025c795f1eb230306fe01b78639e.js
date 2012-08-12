window.Modernizr=(function(n,u,i){var e="2.6.1",l={},q=true,E=u.documentElement,F="modernizr",B=u.createElement(F),o=B.style,f=u.createElement("input"),C=":)",x={}.toString,d="Webkit Moz O ms",H=d.split(" "),p=d.toLowerCase().split(" "),j={},c={},v={},A=[],w=A.slice,b,z=function(Q,S,L,R){var K,P,N,J=u.createElement("div"),O=u.body,M=O?O:u.createElement("body");if(parseInt(L,10)){while(L--){N=u.createElement("div");N.id=R?R[L]:F+(L+1);J.appendChild(N)}}K=["&#173;",'<style id="s',F,'">',Q,"</style>"].join("");J.id=F;(O?J:M).innerHTML+=K;M.appendChild(J);if(!O){M.style.background="";E.appendChild(M)}P=S(J,Q);!O?M.parentNode.removeChild(M):J.parentNode.removeChild(J);return !!P},s=({}).hasOwnProperty,D;if(!k(s,"undefined")&&!k(s.call,"undefined")){D=function(J,K){return s.call(J,K)}}else{D=function(J,K){return((K in J)&&k(J.constructor.prototype[K],"undefined"))}}if(!Function.prototype.bind){Function.prototype.bind=function I(L){var M=this;if(typeof M!="function"){throw new TypeError()}var J=w.call(arguments,1),K=function(){if(this instanceof K){var P=function(){};P.prototype=M.prototype;var O=new P();var N=M.apply(O,J.concat(w.call(arguments)));if(Object(N)===N){return N}return O}else{return M.apply(L,J.concat(w.call(arguments)))}};return K}}function r(J){o.cssText=J}function h(K,J){return r(prefixes.join(K+";")+(J||""))}function k(K,J){return typeof K===J}function m(K,J){return !!~(""+K).indexOf(J)}function G(L,J){for(var K in L){var M=L[K];if(!m(M,"-")&&o[M]!==i){return J=="pfx"?M:true}}return false}function y(K,N,M){for(var J in K){var L=N[K[J]];if(L!==i){if(M===false){return K[J]}if(k(L,"function")){return L.bind(M||N)}return L}}return false}function a(N,J,M){var K=N.charAt(0).toUpperCase()+N.slice(1),L=(N+" "+H.join(K+" ")+K).split(" ");if(k(J,"string")||k(J,"undefined")){return G(L,J)}else{L=(N+" "+(p).join(K+" ")+K).split(" ");return y(L,J,M)}}j.backgroundsize=function(){return a("backgroundSize")};j.fontface=function(){var J;z('@font-face {font-family:"font";src:url("https://")}',function(N,O){var M=u.getElementById("smodernizr"),K=M.sheet||M.styleSheet,L=K?(K.cssRules&&K.cssRules[0]?K.cssRules[0].cssText:K.cssText||""):"";J=/src/i.test(L)&&L.indexOf(O.split(" ")[0])===0});return J};function t(){l.inputtypes=(function(M){for(var L=0,K,O,N,J=M.length;L<J;L++){f.setAttribute("type",O=M[L]);K=f.type!=="text";if(K){f.value=C;f.style.cssText="position:absolute;visibility:hidden;";if(/^range$/.test(O)&&f.style.WebkitAppearance!==i){E.appendChild(f);N=u.defaultView;K=N.getComputedStyle&&N.getComputedStyle(f,null).WebkitAppearance!=="textfield"&&(f.offsetHeight!==0);E.removeChild(f)}else{if(/^(search|tel)$/.test(O)){}else{if(/^(url|email)$/.test(O)){K=f.checkValidity&&f.checkValidity()===false}else{K=f.value!=C}}}}c[M[L]]=!!K}return c})("search tel url email datetime date month week time datetime-local number range color".split(" "))}for(var g in j){if(D(j,g)){b=g.toLowerCase();l[b]=j[g]();A.push((l[b]?"":"no-")+b)}}l.input||t();l.addTest=function(K,L){if(typeof K=="object"){for(var J in K){if(D(K,J)){l.addTest(J,K[J])}}}else{K=K.toLowerCase();if(l[K]!==i){return l}L=typeof L=="function"?L():L;if(q){E.className+=" "+(L?"":"no-")+K}l[K]=L}return l};r("");B=f=null;(function(S,U){var M=S.html5||{};var P=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;var K=/^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i;var Y;var Q="_html5shiv";var J=0;var W={};var N;(function(){try{var ab=U.createElement("a");ab.innerHTML="<xyz></xyz>";Y=("hidden" in ab);N=ab.childNodes.length==1||(function(){(U.createElement)("a");var ad=U.createDocumentFragment();return(typeof ad.cloneNode=="undefined"||typeof ad.createDocumentFragment=="undefined"||typeof ad.createElement=="undefined")}())}catch(ac){Y=true;N=true}}());function O(ab,ad){var ae=ab.createElement("p"),ac=ab.getElementsByTagName("head")[0]||ab.documentElement;ae.innerHTML="x<style>"+ad+"</style>";return ac.insertBefore(ae.lastChild,ac.firstChild)}function T(){var ab=R.elements;return typeof ab=="string"?ab.split(" "):ab}function X(ab){var ac=W[ab[Q]];if(!ac){ac={};J++;ab[Q]=J;W[J]=ac}return ac}function V(ae,ab,ad){if(!ab){ab=U}if(N){return ab.createElement(ae)}if(!ad){ad=X(ab)}var ac;if(ad.cache[ae]){ac=ad.cache[ae].cloneNode()}else{if(K.test(ae)){ac=(ad.cache[ae]=ad.createElem(ae)).cloneNode()}else{ac=ad.createElem(ae)}}return ac.canHaveChildren&&!P.test(ae)?ad.frag.appendChild(ac):ac}function Z(ad,af){if(!ad){ad=U}if(N){return ad.createDocumentFragment()}af=af||X(ad);var ag=af.frag.cloneNode(),ae=0,ac=T(),ab=ac.length;for(;ae<ab;ae++){ag.createElement(ac[ae])}return ag}function aa(ab,ac){if(!ac.cache){ac.cache={};ac.createElem=ab.createElement;ac.createFrag=ab.createDocumentFragment;ac.frag=ac.createFrag()}ab.createElement=function(ad){if(!R.shivMethods){return ac.createElem(ad)}return V(ad,ab,ac)};ab.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+T().join().replace(/\w+/g,function(ad){ac.createElem(ad);ac.frag.createElement(ad);return'c("'+ad+'")'})+");return n}")(R,ac.frag)}function L(ab){if(!ab){ab=U}var ac=X(ab);if(R.shivCSS&&!Y&&!ac.hasCSS){ac.hasCSS=!!O(ab,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")}if(!N){aa(ab,ac)}return ab}var R={elements:M.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:(M.shivCSS!==false),supportsUnknownElements:N,shivMethods:(M.shivMethods!==false),type:"default",shivDocument:L,createElement:V,createDocumentFragment:Z};S.html5=R;L(U)}(this,u));l._version=e;l._domPrefixes=p;l._cssomPrefixes=H;l.testProp=function(J){return G([J])};l.testAllProps=a;l.testStyles=z;E.className=E.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(q?" js "+A.join(" "):"");return l})(this,this.document);(function(ad,ac,ab){function aa(b){return"[object Function]"==P.call(b)}function Z(b){return"string"==typeof b}function Y(){}function X(b){return !b||"loaded"==b||"complete"==b||"uninitialized"==b}function W(){var b=O.shift();M=1,b?b.t?R(function(){("c"==b.t?L.injectCss:L.injectJs)(b.s,0,b.a,b.x,b.e,1)},0):(b(),W()):M=0}function V(w,v,t,s,q,p,n){function m(a){if(!g&&X(h.readyState)&&(x.r=g=1,!M&&W(),h.onload=h.onreadystatechange=null,a)){"img"!=w&&R(function(){I.removeChild(h)},50);for(var c in D[v]){D[v].hasOwnProperty(c)&&D[v][c].onload()}}}var n=n||L.errorTimeout,h=ac.createElement(w),g=0,b=0,x={t:t,s:v,e:q,a:p,x:n};1===D[v]&&(b=1,D[v]=[]),"object"==w?h.data=v:(h.src=v,h.type=w),h.width=h.height="0",h.onerror=h.onload=h.onreadystatechange=function(){m.call(this,b)},O.splice(s,0,x),"img"!=w&&(b||2===D[v]?(I.insertBefore(h,J?null:Q),R(m,n)):D[v].push(h))}function U(g,e,j,i,h){return M=0,e=e||"j",Z(g)?V("c"==e?G:H,g,e,this.i++,j,i,h):(O.splice(this.i++,0,g),1==O.length&&W()),this}function T(){var b=L;return b.loader={load:U,i:0},b}var S=ac.documentElement,R=ad.setTimeout,Q=ac.getElementsByTagName("script")[0],P={}.toString,O=[],M=0,K="MozAppearance" in S.style,J=K&&!!ac.createRange().compareNode,I=J?S:Q.parentNode,S=ad.opera&&"[object Opera]"==P.call(ad.opera),S=!!ac.attachEvent&&!S,H=K?"object":S?"script":"img",G=S?"script":H,F=Array.isArray||function(b){return"[object Array]"==P.call(b)},E=[],D={},C={timeout:function(d,c){return c.length&&(d.timeout=c[0]),d}},N,L;L=function(e){function c(i){var i=i.split("!"),h=E.length,q=i.pop(),p=i.length,q={url:q,origUrl:q,prefixes:i},o,l,j;for(l=0;l<p;l++){j=i[l].split("="),(o=C[j.shift()])&&(q=o(q,j))}for(l=0;l<h;l++){q=E[l](q)}return q}function n(b,s,r,q,p){var o=c(b),l=o.autoCallback;o.url.split(".").pop().split("?").shift(),o.bypass||(s&&(s=aa(s)?s:s[b]||s[q]||s[b.split("/").pop().split("?")[0]]),o.instead?o.instead(b,s,r,q,p):(D[o.url]?o.noexec=!0:D[o.url]=1,r.load(o.url,o.forceCSS||!o.forceJS&&"css"==o.url.split(".").pop().split("?").shift()?"c":ab,o.noexec,o.attrs,o.timeout),(aa(s)||aa(l))&&r.load(function(){T(),s&&s(o.origUrl,p,q),l&&l(o.origUrl,p,q),D[o.url]=2})))}function m(w,v){function u(b,h){if(b){if(Z(b)){h||(r=function(){var i=[].slice.call(arguments);q.apply(this,i),p()}),n(b,r,v,0,t)}else{if(Object(b)===b){for(g in o=function(){var a=0,i;for(i in b){b.hasOwnProperty(i)&&a++}return a}(),b){b.hasOwnProperty(g)&&(!h&&!--o&&(aa(r)?r=function(){var i=[].slice.call(arguments);q.apply(this,i),p()}:r[g]=function(i){return function(){var a=[].slice.call(arguments);i&&i.apply(this,a),p()}}(q[g])),n(b[g],r,v,g,t))}}}}else{!h&&p()}}var t=!!w.test,s=w.load||w.both,r=w.callback||Y,q=r,p=w.complete||Y,o,g;u(t?w.yep:w.nope,!!s),s&&u(s)}var k,f,d=this.yepnope.loader;if(Z(e)){n(e,0,d,0)}else{if(F(e)){for(k=0;k<e.length;k++){f=e[k],Z(f)?n(f,0,d,0):F(f)?L(f):Object(f)===f&&m(f,d)}}else{Object(e)===e&&m(e,d)}}},L.addPrefix=function(d,c){C[d]=c},L.addFilter=function(b){E.push(b)},L.errorTimeout=10000,null==ac.readyState&&ac.addEventListener&&(ac.readyState="loading",ac.addEventListener("DOMContentLoaded",N=function(){ac.removeEventListener("DOMContentLoaded",N,0),ac.readyState="complete"},0)),ad.yepnope=T(),ad.yepnope.executeStack=W,ad.yepnope.injectJs=function(r,q,p,n,m,h){var g=ac.createElement("script"),f,b,n=n||L.errorTimeout;g.src=r;for(b in p){g.setAttribute(b,p[b])}q=h?W:q||Y,g.onreadystatechange=g.onload=function(){!f&&X(g.readyState)&&(f=1,q(),g.onload=g.onreadystatechange=null)},R(function(){f||(f=1,q(1))},n),m?g.onload():Q.parentNode.insertBefore(g,Q)},ad.yepnope.injectCss=function(b,n,m,l,k,h){var l=ac.createElement("link"),f,n=h?W:n||Y;l.href=b,l.rel="stylesheet",l.type="text/css";for(f in m){l.setAttribute(f,m[f])}k||(Q.parentNode.insertBefore(l,Q),R(n,0))}})(this,document);Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};Modernizr.addTest("cssmask",Modernizr.testAllProps("maskRepeat"));