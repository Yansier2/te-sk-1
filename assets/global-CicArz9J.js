import{b as n,u as i,f as a,g as l,F as d,B as _,h as t,t as u,r as p}from"./tailwind-BVDyneCT.js";import{d as g}from"./portal-BNdx2fRY.js";const h={class:"virtuoso-item-list"},m=["onClick"],f={class:"zhengfangxing"},v={class:"zhengfangxing-child"},B=["src"],S={class:"description"},k={class:"txt f12 word-break ellipsis-two"},x={__name:"item",props:{list:{type:Array,default:()=>[]}},setup(s){const r=i(),e=c=>{r.push(`/goods/${c}`)};return(c,y)=>(l(),a("ul",h,[(l(!0),a(d,null,_(s.list,o=>(l(),a("li",{class:"templateList_shopItem",key:o.goodsId,onClick:b=>e(o.goodsId)},[t("div",f,[t("div",v,[t("img",{src:o.imgSrc,loading:"lazy",alt:""},null,8,B)])]),t("div",S,[t("div",k,u(o.title),1)])],8,m))),128))]))}},G=n(x,[["__scopeId","data-v-200e81a9"]]),L=g("globalStore",()=>{const s=p(0);return{scrollBottom:s,updateScrollBottom:e=>{s.value=e}}});export{G,L as u};
