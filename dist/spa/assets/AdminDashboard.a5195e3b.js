import{Q as o,a as d}from"./QCard.a453ff6c.js";import{Q as m}from"./QPage.9bc20ae8.js";import{_ as u,r,c as f,R as h,V as v,U as s,a3 as t,f as e,Z as l}from"./index.c99f8be1.js";import"./use-dark.40dd0812.js";const x={setup(){const c=r(120),n=r(15),_=r(8500.75),a=r(95),i=f(()=>`$${_.value.toFixed(2)}`);return{totalOrders:c,totalGames:n,formattedTotalMoney:i,confirmedOrders:a}}},b=t("div",{class:"text-h6"},"Admin Dashboard",-1),p={class:"q-my-md"},y=t("div",{class:"text-h6"},"Total Orders",-1),g={class:"text-subtitle1"},O=t("div",{class:"text-h6"},"Total Games",-1),Q={class:"text-subtitle1"},T=t("div",{class:"text-h6"},"Total Money",-1),C={class:"text-subtitle1"},D=t("div",{class:"text-h6"},"Confirmed Orders",-1),M={class:"text-subtitle1"};function A(c,n,_,a,i,B){return h(),v(m,{padding:""},{default:s(()=>[b,t("div",p,[e(d,{class:"my-card bg-blue-2"},{default:s(()=>[e(o,null,{default:s(()=>[y,t("div",g,l(a.totalOrders),1)]),_:1})]),_:1}),e(d,{class:"my-card bg-green-2"},{default:s(()=>[e(o,null,{default:s(()=>[O,t("div",Q,l(a.totalGames),1)]),_:1})]),_:1}),e(d,{class:"my-card bg-orange-2"},{default:s(()=>[e(o,null,{default:s(()=>[T,t("div",C,l(a.formattedTotalMoney),1)]),_:1})]),_:1}),e(d,{class:"my-card bg-red-2"},{default:s(()=>[e(o,null,{default:s(()=>[D,t("div",M,l(a.confirmedOrders),1)]),_:1})]),_:1})])]),_:1})}var S=u(x,[["render",A]]);export{S as default};