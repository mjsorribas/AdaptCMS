CodeMirror.defineMode("javascript",function(P,U){var x=P.indentUnit;var Z=U.statementIndent;var Y=U.json;var B=U.typescript;var b=function(){function al(an){return{type:an,style:"keyword"}}var ag=al("keyword a"),ae=al("keyword b"),ad=al("keyword c");var af=al("operator"),aj={type:"atom",style:"atom"};var ah={"if":al("if"),"while":ag,"with":ag,"else":ae,"do":ae,"try":ae,"finally":ae,"return":ad,"break":ad,"continue":ad,"new":ad,"delete":ad,"throw":ad,"var":al("var"),"const":al("var"),let:al("var"),"function":al("function"),"catch":al("catch"),"for":al("for"),"switch":al("switch"),"case":al("case"),"default":al("default"),"in":af,"typeof":af,"instanceof":af,"true":aj,"false":aj,"null":aj,"undefined":aj,"NaN":aj,"Infinity":aj,"this":al("this")};if(B){var am={type:"variable",style:"variable-3"};var ai={"interface":al("interface"),"class":al("class"),"extends":al("extends"),constructor:al("constructor"),"public":al("public"),"private":al("private"),"protected":al("protected"),"static":al("static"),"super":al("super"),string:am,number:am,bool:am,any:am};for(var ak in ai){ah[ak]=ai[ak]}}return ah}();var V=/[+\-*&%=<>!?|~^]/;function ab(af,ae,ad){ae.tokenize=ad;return ad(af,ae)}function h(ag,ad){var af=false,ae;while((ae=ag.next())!=null){if(ae==ad&&!af){return false}af=!af&&ae=="\\"}return af}var ac,q;function I(af,ae,ad){ac=af;q=ad;return ae}function m(ah,af){var ad=ah.next();if(ad=='"'||ad=="'"){return ab(ah,af,C(ad))}else{if(/[\[\]{}\(\),;\:\.]/.test(ad)){return I(ad)}else{if(ad=="0"&&ah.eat(/x/i)){ah.eatWhile(/[\da-f]/i);return I("number","number")}else{if(/\d/.test(ad)||ad=="-"&&ah.eat(/\d/)){ah.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);return I("number","number")}else{if(ad=="/"){if(ah.eat("*")){return ab(ah,af,f)}else{if(ah.eat("/")){ah.skipToEnd();return I("comment","comment")}else{if(af.lastType=="operator"||af.lastType=="keyword c"||/^[\[{}\(,;:]$/.test(af.lastType)){h(ah,"/");ah.eatWhile(/[gimy]/);return I("regexp","string-2")}else{ah.eatWhile(V);return I("operator",null,ah.current())}}}}else{if(ad=="#"){ah.skipToEnd();return I("error","error")}else{if(V.test(ad)){ah.eatWhile(V);return I("operator",null,ah.current())}else{ah.eatWhile(/[\w\$_]/);var ag=ah.current(),ae=b.propertyIsEnumerable(ag)&&b[ag];return(ae&&af.lastType!=".")?I(ae.type,ae.style,ag):I("variable","variable",ag)}}}}}}}}function C(ad){return function(af,ae){if(!h(af,ad)){ae.tokenize=m}return I("string","string")}}function f(ag,af){var ad=false,ae;while(ae=ag.next()){if(ae=="/"&&ad){af.tokenize=m;break}ad=(ae=="*")}return I("comment","comment")}var l={atom:true,number:true,variable:true,string:true,regexp:true,"this":true};function v(ai,ae,ad,ah,af,ag){this.indented=ai;this.column=ae;this.type=ad;this.prev=af;this.info=ag;if(ah!=null){this.align=ah}}function y(af,ae){for(var ad=af.localVars;ad;ad=ad.next){if(ad.name==ae){return true}}}function K(ah,ae,ad,ag,ai){var aj=ah.cc;w.state=ah;w.stream=ai;w.marked=null,w.cc=aj;if(!ah.lexical.hasOwnProperty("align")){ah.lexical.align=true}while(true){var af=aj.length?aj.pop():Y?z:A;if(af(ad,ag)){while(aj.length&&aj[aj.length-1].lex){aj.pop()()}if(w.marked){return w.marked}if(ad=="variable"&&y(ah,ag)){return"variable-2"}return ae}}}var w={state:null,column:null,marked:null,cc:null};function a(){for(var ad=arguments.length-1;ad>=0;ad--){w.cc.push(arguments[ad])}}function N(){a.apply(null,arguments);return true}function n(ae){function ad(ah){for(var ag=ah;ag;ag=ag.next){if(ag.name==ae){return true}}return false}var af=w.state;if(af.context){w.marked="def";if(ad(af.localVars)){return}af.localVars={name:ae,next:af.localVars}}else{if(ad(af.globalVars)){return}af.globalVars={name:ae,next:af.globalVars}}}var J={name:"this",next:{name:"arguments"}};function u(){w.state.context={prev:w.state.context,vars:w.state.localVars};w.state.localVars=J}function t(){w.state.localVars=w.state.context.vars;w.state.context=w.state.context.prev}function k(ae,af){var ad=function(){var ah=w.state,ag=ah.indented;if(ah.lexical.type=="stat"){ag=ah.lexical.indented}ah.lexical=new v(ag,w.stream.column(),ae,null,ah.lexical,af)};ad.lex=true;return ad}function M(){var ad=w.state;if(ad.lexical.prev){if(ad.lexical.type==")"){ad.indented=ad.lexical.indented}ad.lexical=ad.lexical.prev}}M.lex=true;function c(ad){return function(ae){if(ae==ad){return N()}else{if(ad==";"){return a()}else{return N(arguments.callee)}}}}function A(ad){if(ad=="var"){return N(k("vardef"),Q,c(";"),M)}if(ad=="keyword a"){return N(k("form"),z,A,M)}if(ad=="keyword b"){return N(k("form"),A,M)}if(ad=="{"){return N(k("}"),o,M)}if(ad==";"){return N()}if(ad=="if"){return N(k("form"),z,A,M,L(w.state.indented))}if(ad=="function"){return N(i)}if(ad=="for"){return N(k("form"),c("("),k(")"),g,c(")"),M,A,M)}if(ad=="variable"){return N(k("stat"),H)}if(ad=="switch"){return N(k("form"),z,k("}","switch"),c("{"),o,M,M)}if(ad=="case"){return N(z,c(":"))}if(ad=="default"){return N(c(":"))}if(ad=="catch"){return N(k("form"),u,c("("),r,c(")"),A,M,t)}return a(k("stat"),z,c(";"),M)}function z(ad){return S(ad,false)}function T(ad){return S(ad,true)}function S(ad,af){var ae=af?j:F;if(l.hasOwnProperty(ad)){return N(ae)}if(ad=="function"){return N(i)}if(ad=="keyword c"){return N(af?E:G)}if(ad=="("){return N(k(")"),G,c(")"),M,ae)}if(ad=="operator"){return N(af?T:z)}if(ad=="["){return N(k("]"),W(T,"]"),M,ae)}if(ad=="{"){return N(k("}"),W(p,"}"),M,ae)}return N()}function G(ad){if(ad.match(/[;\}\)\],]/)){return a()}return a(z)}function E(ad){if(ad.match(/[;\}\)\],]/)){return a()}return a(T)}function F(ad,ae){if(ad==","){return N(z)}return j(ad,ae,F)}function j(ad,af,ae){if(!ae){ae=j}if(ad=="operator"){if(/\+\+|--/.test(af)){return N(ae)}if(af=="?"){return N(z,c(":"),z)}return N(z)}if(ad==";"){return}if(ad=="("){return N(k(")","call"),W(T,")"),M,ae)}if(ad=="."){return N(X,ae)}if(ad=="["){return N(k("]"),z,c("]"),M,ae)}}function H(ad){if(ad==":"){return N(M,A)}return a(F,c(";"),M)}function X(ad){if(ad=="variable"){w.marked="property";return N()}}function p(ad,ae){if(ad=="variable"){w.marked="property";if(ae=="get"||ae=="set"){return N(D)}}else{if(ad=="number"||ad=="string"){w.marked=ad+" property"}}if(l.hasOwnProperty(ad)){return N(c(":"),T)}}function D(ad){if(ad==":"){return N(z)}if(ad!="variable"){return N(c(":"),z)}w.marked="property";return N(i)}function W(af,ad){function ae(ah){if(ah==","){var ag=w.state.lexical;if(ag.info=="call"){ag.pos=(ag.pos||0)+1}return N(af,ae)}if(ah==ad){return N()}return N(c(ad))}return function(ag){if(ag==ad){return N()}else{return a(af,ae)}}}function o(ad){if(ad=="}"){return N()}return a(A,o)}function s(ad){if(ad==":"){return N(aa)}return a()}function aa(ad){if(ad=="variable"){w.marked="variable-3";return N()}return a()}function Q(ad,ae){if(ad=="variable"){n(ae);return B?N(s,O):N(O)}return a()}function O(ad,ae){if(ae=="="){return N(T,O)}if(ad==","){return N(Q)}}function L(ad){return function(ae,af){if(ae=="keyword b"&&af=="else"){w.state.lexical=new v(ad,0,"form",null,w.state.lexical);return N(A,M)}return a()}}function g(ad){if(ad=="var"){return N(Q,c(";"),e)}if(ad==";"){return N(e)}if(ad=="variable"){return N(R)}return a(z,c(";"),e)}function R(ad,ae){if(ae=="in"){return N(z)}return N(F,e)}function e(ad,ae){if(ad==";"){return N(d)}if(ae=="in"){return N(z)}return a(z,c(";"),d)}function d(ad){if(ad!=")"){N(z)}}function i(ad,ae){if(ad=="variable"){n(ae);return N(i)}if(ad=="("){return N(k(")"),u,W(r,")"),M,A,t)}}function r(ad,ae){if(ad=="variable"){n(ae);return B?N(s):N()}}return{startState:function(ad){return{tokenize:m,lastType:null,cc:[],lexical:new v((ad||0)-x,0,"block",false),localVars:U.localVars,globalVars:U.globalVars,context:U.localVars&&{vars:U.localVars},indented:0}},token:function(af,ae){if(af.sol()){if(!ae.lexical.hasOwnProperty("align")){ae.lexical.align=false}ae.indented=af.indentation()}if(ae.tokenize!=f&&af.eatSpace()){return null}var ad=ae.tokenize(af,ae);if(ac=="comment"){return ad}ae.lastType=ac=="operator"&&(q=="++"||q=="--")?"incdec":ac;return K(ae,ad,ac,q,af)},indent:function(ai,ad){if(ai.tokenize==f){return CodeMirror.Pass}if(ai.tokenize!=m){return 0}var ah=ad&&ad.charAt(0),af=ai.lexical;if(af.type=="stat"&&ah=="}"){af=af.prev}if(Z&&af.type==")"&&af.prev.type=="stat"){af=af.prev}var ag=af.type,ae=ah==ag;if(ag=="vardef"){return af.indented+(ai.lastType=="operator"||ai.lastType==","?4:0)}else{if(ag=="form"&&ah=="{"){return af.indented}else{if(ag=="form"){return af.indented+x}else{if(ag=="stat"){return af.indented+(ai.lastType=="operator"||ai.lastType==","?Z||x:0)}else{if(af.info=="switch"&&!ae&&U.doubleIndentSwitch!=false){return af.indented+(/^(?:case|default)\b/.test(ad)?x:2*x)}else{if(af.align){return af.column+(ae?0:1)}else{return af.indented+(ae?0:x)}}}}}}},electricChars:":{}",blockCommentStart:Y?null:"/*",blockCommentEnd:Y?null:"*/",lineComment:Y?null:"//",jsonMode:Y}});CodeMirror.defineMIME("text/javascript","javascript");CodeMirror.defineMIME("text/ecmascript","javascript");CodeMirror.defineMIME("application/javascript","javascript");CodeMirror.defineMIME("application/ecmascript","javascript");CodeMirror.defineMIME("application/json",{name:"javascript",json:true});CodeMirror.defineMIME("application/x-json",{name:"javascript",json:true});CodeMirror.defineMIME("text/typescript",{name:"javascript",typescript:true});CodeMirror.defineMIME("application/typescript",{name:"javascript",typescript:true});