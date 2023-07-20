"use strict";(self.webpackChunkcanvas=self.webpackChunkcanvas||[]).push([[141],{141:function(n,e,r){r.r(e),r.d(e,{default:function(){return m}});var t=r(107);var i=r(246);function u(n){return function(n){if(Array.isArray(n))return(0,t.Z)(n)}(n)||function(n){if("undefined"!==typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||(0,i.Z)(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var o=r(692),l=r(242);function a(n){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},a(n)}function c(n){var e=function(n,e){if("object"!==a(n)||null===n)return n;var r=n[Symbol.toPrimitive];if(void 0!==r){var t=r.call(n,e||"default");if("object"!==a(t))return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(n)}(n,"string");return"symbol"===a(e)?e:String(e)}function s(n,e){for(var r=0;r<e.length;r++){var t=e[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,c(t.key),t)}}var f=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];function v(n,e){for(var r=0;r<e.length;r++){var t=e[r].filter((function(e){return!n.includes(e)}));if(1===t.length)return t[0]}return null}function d(n,e){var r,t,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e;if(1===n.length)return function(n){var e=4===n?0:4;return[[n,e],f.filter((function(n){return!n.includes(e)})),f.filter((function(e){return!e.includes(n)}))]}(n[0]);var o=n.filter((function(n,e){return e%2===0})),l=i.filter((function(n){return!n.includes(o[o.length-1])})),a=v(n.filter((function(n,e){return e%2===1})),i),c=null===a||n.includes(a)?null!==(r=null!==(t=v(o,e))&&void 0!==t?t:function(n){var e;return null===(e=n[0])||void 0===e?void 0:e[0]}(l))&&void 0!==r?r:function(n){return[0,1,2,3,4,5,6,7,8].find((function(e){return!n.includes(e)}))}(n):a;return[[].concat(u(n),[c]),e.filter((function(n){return!n.includes(c)})),l]}var y=new(function(){function n(){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.steps=[],this.dangerLines=f,this.expectedLines=f}var e,r,t;return e=n,(r=[{key:"next",value:function(n){var e=d([].concat(u(this.steps),[n]),this.dangerLines,this.expectedLines),r=(0,o.Z)(e,3),t=r[0],i=r[1],l=r[2];return this.steps=t,this.dangerLines=i,this.expectedLines=l,t[t.length-1]}},{key:"restart",value:function(){this.steps=[],this.dangerLines=f,this.expectedLines=f}}])&&s(e.prototype,r),t&&s(e,t),Object.defineProperty(e,"prototype",{writable:!1}),n}()),h=r(651);function p(n){var e=n.value,r=n.onSquareClick;return(0,h.jsx)("div",{className:"well-game-square",onClick:r,children:e})}function b(n){var e,r=n.squares,t=n.onPlay,i=function(n){for(var e=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],r=0;r<e.length;r++){var t=(0,o.Z)(e[r],3),i=t[0],u=t[1],l=t[2];if(n[i]&&n[i]===n[u]&&n[i]===n[l])return n[i]}return null}(r);function u(n){if(!i&&!r[n]){var e=y.next(n),u=r.slice();u[e]="O",u[n]="X",t(u)}}return e=i?"Winner: "+i:"Next player: X",(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{children:e}),(0,h.jsxs)("div",{className:"well-game-board",children:[(0,h.jsx)(p,{value:r[0],onSquareClick:function(){return u(0)}}),(0,h.jsx)(p,{value:r[1],onSquareClick:function(){return u(1)}}),(0,h.jsx)(p,{value:r[2],onSquareClick:function(){return u(2)}}),(0,h.jsx)(p,{value:r[3],onSquareClick:function(){return u(3)}}),(0,h.jsx)(p,{value:r[4],onSquareClick:function(){return u(4)}}),(0,h.jsx)(p,{value:r[5],onSquareClick:function(){return u(5)}}),(0,h.jsx)(p,{value:r[6],onSquareClick:function(){return u(6)}}),(0,h.jsx)(p,{value:r[7],onSquareClick:function(){return u(7)}}),(0,h.jsx)(p,{value:r[8],onSquareClick:function(){return u(8)}})]})]})}function m(){var n=(0,l.useState)([Array(9).fill(null)]),e=(0,o.Z)(n,2),r=e[0],t=e[1],i=(0,l.useState)(0),a=(0,o.Z)(i,2),c=a[0],s=a[1],f=r[c];return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("button",{onClick:function(){t([Array(9).fill(null)]),s(0),y.restart()},children:"\u91cd\u65b0\u5f00\u59cb"}),(0,h.jsx)(b,{squares:f,onPlay:function(n){var e=[].concat(u(r.slice(0,c+1)),[n]);t(e),s(e.length-1)}})]})}}}]);
//# sourceMappingURL=141.ebedfdab.chunk.js.map