"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(){function e(e,t){document.querySelectorAll(e).forEach(function(e){e.addEventListener("submit",function(i){if(i.preventDefault(),e.querySelector(".tell").value.length<10)return alert("Убедитесь в правильности введенного номера телефона!");$.ajax({type:"POST",url:"../php/"+t+".php",data:$(e).serialize(),success:function(){alert("Спасибо за обращение, ожидайте звонка оператора!")},error:function(){alert("Непредвиденная ошибка сервера, обратитесь позже...")}})},!1)})}Vue.component("typeahead",{template:'<div :class="typeaheadState">\n                    <div class="typeahead__toggle" ref="toggle" @mousedown.prevent="toggle">\n                        <input type="text" class="typeahead__search"\n                            ref="search"\n                            v-model.trim="search"\n                            @focus="onFocus"\n                            @blur="onBlur"\n                            @keydown.esc="onEscape"\n                            @keydown.down="onDownKey"\n                            @keydown.up="onUpKey"\n                            @keydown.enter="onEnterKey"\n                        >\n                        <span class="typeahead__text" ref="text">{{displayText}}</span>\n                    </div>\n                    <ul class="typeahead__list" ref="list" v-if="open" @scroll="onScroll">\n                        <li class="typeahead__item" v-for="(option, index) in filteredOptions" :key="index">\n                            <a class="typeahead__link"\n                                @mousedown.prevent="select(index)"\n                                :class="[selectIndex === index ? \'typeahead__active\':\'\']">\n                                {{option}}\n                            </a>\n                        </li>\n                        <li class="no_search" v-if="filteredOptions.length === 0">Город не найден...</li>\n                    </ul>\n                    </div>',props:{options:{type:Array,default:function(){return[]}},value:{type:[String,Number],default:null},directionText:{type:String,default:null}},data:function(){return{open:!1,selectIndex:0,displayText:this.directionText,search:"",count:15}},computed:{typeaheadState:function(){return this.open?"typeahead typeahead__open":"typeahead"},filteredOptions:function(){var e=this,t=this.options.filter(function(t){var i=t.split("").slice(0,e.search.length).join("");if(e.search.toLowerCase()==i.toLowerCase())return t});return t.length>=this.count&&(t.length=this.count),this.search.length>0?t.sort(function(e,t){var i=e.city.toUpperCase(),n=t.city.toUpperCase(),s=0;return i>n?s=1:i<n&&(s=-1),s}):t}},methods:{onDownKey:function(){this.filteredOptions.length-1>this.selectIndex&&++this.selectIndex>2&&(this.$refs.list.scrollTop+=20+this.selectIndex)},onUpKey:function(){this.selectIndex>0&&--this.selectIndex>0&&(this.$refs.list.scrollTop-=20+this.selectIndex)},onEnterKey:function(){var e=this.filteredOptions[this.selectIndex];e&&this.select(e)},select:function(e){this.displayText=this.options[e],this.search="",this.$emit("input",e),this.$refs.search.blur()},toggle:function(e){e.target!==this.$refs.toggle&&e.target!==this.$refs.search&&e.target!==this.$refs.text||(this.open?e.target!==this.$refs.search&&e.target!==this.$refs.text&&this.$refs.search.blur():this.$refs.search.focus())},onFocus:function(){this.open=!0},onBlur:function(){this.selectIndex=0,this.$refs.list.scrollTop=0,this.open=!1},onEscape:function(){this.$refs.search.blur()},onScroll:function(){this.count+=1}}});new Vue({el:"#calc",data:{citys:["Амвросиевка","Донецк","Дебальцево","Докучаевск","Горловка","Енакиево","Ждановка","Кировское","Макеевка","Новоазовск","Снежное","Старобешево","Тельманово","Торез","Харцызск","Шахтерск","Ясиноватая"],TZ:[[1,3,3,3,3,3,3,3,3,4,3,3,4,3,2,3,3],[3,1,3,3,3,3,3,3,1,4,3,3,4,3,2,3,2],[3,3,1,3,3,3,3,3,3,4,3,3,4,3,3,3,3],[3,3,3,1,3,3,3,3,3,4,3,2,3,3,3,3,3],[3,3,3,3,1,2,3,3,3,4,3,3,4,3,3,3,3],[3,3,3,3,2,1,2,2,3,4,3,3,4,3,3,3,3],[3,3,3,3,3,2,1,2,3,4,3,3,4,3,3,3,3],[3,3,3,3,3,2,2,1,3,4,3,3,4,3,3,3,3],[3,1,3,3,3,3,3,3,1,4,3,3,4,3,3,3,3],[4,4,4,4,4,4,4,4,4,1,4,4,3,4,4,4,4],[3,3,3,3,3,3,3,3,3,4,1,3,4,2,3,3,3],[3,3,3,2,3,3,3,3,3,4,3,1,3,3,3,3,3],[4,4,4,3,4,4,4,4,4,3,4,3,1,4,4,4,4],[3,3,3,3,3,3,3,3,3,4,3,3,4,1,3,2,3],[3,2,3,3,3,3,3,3,2,4,3,3,4,3,1,2,3],[3,3,3,3,3,3,3,3,3,4,3,3,4,2,2,1,3],[3,2,3,3,3,3,3,3,2,4,3,3,4,3,3,3,1]],tariff:[{min:0,max:2,prices:[65,80,120,200]},{min:2,max:5,prices:[75,100,150,240]},{min:5,max:10,prices:[95,120,180,300]},{min:10,max:20,prices:[130,150,220,350]},{min:20,max:35,prices:[165,180,270,410]},{min:35,max:50,prices:[210,230,350,470]},{min:50,max:1/0,prices:[.8,1.5,2.5,3]}],docsTarif:[60,70,80,90],direction:{from:0,to:0},typeOfLoad:"load",load:{weight:0,o:0,price:0},loadFields:[],cashPay:{active:!1,sum:!1},overlay:!1},computed:{bigDisplay:function(){return document.documentElement.clientWidth>=660},TZ:function(){var e=this.direction,t=(e.form,e.to);return from>0&&t>0?this.tables.TZ[t][from]:0},total:function(){var e=this;if(this.TZ>0){if("docs"===this.typeOfLoad)return this.docsTarif[this.TZ];if("load"===this.typeOfLoad){var t=this.tariff[0],i=!0,n=function(){var t=250*e.load.o,i=e.load.weight,n=t>=i?t:i;return e.round(n)}();return n>0?(t=this.tariff.find(function(e,t,s){return t+1===s.length&&(i=!1),n>e.min&&n<=e.max}),[function(){var s=t.prices[e.TZ],o=i?s:s[0]+(n-50)*s[1];return e.round(o)}(),function(){if(e.load.price>0){var t=.0025*e.load.price;return e.round(t>5?t:5)}return 0}(),function(){var t=e.cashPay.sum,i=e.round(.01*t);return e.cashPay.active?50+i:0}()].reduce(function(e,t){return e+t},0)):0}}}},methods:{round:function(e){return Math.round(100*e/100)},addPlace:function(){this.loadFields.push({weight:10,o:.05,d:0,s:0,v:0,price:500,isCalcO:!1}),this.addAll()},delPlace:function(e){this.loadFields.splice(e,1),this.addAll()},add:function(e){this.load[e]=0;for(var t=0;t<this.loadFields.length;t++)this.load[e]+=parseFloat(this.loadFields[t][e]);"object"===_typeof(window.event)&&this.validate(window.event)},addAll:function(){this.add("weight"),this.add("o"),this.add("price")},calcO:function(e){if("close"!==e){var t=this.loadFields[e];t.d&&t.s&&t.v&&(t.o=(t.d*t.s*t.v/1e6).toFixed(3)),this.addAll();var i=this.$refs.volume[0];i.classList?i.classList.remove("novalid"):i.className=i.className.replace(new RegExp("(^|\\b)"+"novalid".split(" ").join("|")+"(\\b|$)","gi")," ")}for(var n=0;n<this.loadFields.length;n++)1==this.loadFields[n].isCalcO&&(this.loadFields[n].isCalcO=!1);this.overlay=!1},goCalcO:function(e){this.overlay=!0;var t=this.loadFields[e];t.d=0,t.s=0,t.v=0,t.isCalcO=!t.isCalcO},validate:function(e){var t=e.target,i=t.value;(function(e,t){return(e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector).call(e,t)})(t,"input")&&(i<=0?t.classList?t.classList.add("novalid"):t.className+=" novalid":t.classList?t.classList.remove("novalid"):t.className=t.className.replace(new RegExp("(^|\\b)"+"novalid".split(" ").join("|")+"(\\b|$)","gi")," "))}},created:function(){this.addPlace()}});e("callback_form","callback"),e("callcouire_form","callcourier");var t=document.getElementById("toptbuttons").classList,i=document.getElementsByTagName("header")[0].offsetHeight;window.onscroll=function(){window.pageYOffset>=i?t.add("fixed"):t.contains("fixed")&&t.remove("fixed")}}();