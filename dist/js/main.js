"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(){Vue.component("typeahead",{template:'\n        <div :class="typeaheadState" >\n            <div class="typeahead__toggle" ref="toggle" @mousedown.prevent="toggle">\n                <input type="text" class="typeahead__search" ref="search"\n                v-model.trim="search"\n                @focus="onFocus"\n                @blur="onBlur"\n                @keydown.esc="onEscape"\n                @keydown.down="onDownKey"\n                @keydown.up="onUpKey"\n                @keydown.enter="onEnterKey"\n                >\n                <span class="typeahead__text" ref="text">{{displayText}}</span>\n            </div>\n\n            <ul class="typeahead__list" ref="list" v-if="open" @scroll="onScroll">\n                <li class="typeahead__item" v-for="(option, index) in filteredOptions" :key="index">\n                    <a class="typeahead__link" @mousedown.prevent="select(option)"\n                        :class="[selectIndex === index ? \'typeahead__active\':\'\']"\n                        >\n                        {{option.city + " (" + option.region + ")"}}\n                    </a>\n                </li>\n                <li class="no_search" v-if="noSearch">Город не найден...</li>\n            </ul>\n        </div>\n    ',props:{options:{type:Array,default:function(){return[]}},value:{type:[String,Number],default:null},directionText:{type:String,default:null}},data:function(){return{open:!1,selectIndex:0,displayText:this.directionText,search:"",count:15,noSearch:!1}},computed:{typeaheadState:function(){return this.open?"typeahead typeahead__open":"typeahead"},filteredOptions:function(){var e=this.search,t=this.options.filter(function(t){var i=t.city.split("").slice(0,e.length).join("");if(e.toLowerCase()==i.toLowerCase())return t.id||t.city});return t.length>=this.count&&(t.length=this.count),0==t.length?this.noSearch=!0:this.noSearch=!1,e.length>0?t.sort(function(e,t){var i=e.city.toUpperCase(),n=t.city.toUpperCase(),s=0;return i>n?s=1:i<n&&(s=-1),s}):t}},methods:{onDownKey:function(){this.filteredOptions.length-1>this.selectIndex&&++this.selectIndex>2&&(this.$refs.list.scrollTop+=20+this.selectIndex)},onUpKey:function(){this.selectIndex>0&&--this.selectIndex>0&&(this.$refs.list.scrollTop-=20+this.selectIndex)},onEnterKey:function(){var e=this.filteredOptions[this.selectIndex];e&&this.select(e)},select:function(e){this.displayText=e.city,this.search="",this.$emit("input",e.id),this.$refs.search.blur()},toggle:function(e){e.target!==this.$refs.toggle&&e.target!==this.$refs.search&&e.target!==this.$refs.text||(this.open?e.target!==this.$refs.search&&e.target!==this.$refs.text&&this.$refs.search.blur():this.$refs.search.focus())},onFocus:function(){this.open=!0},onBlur:function(){this.selectIndex=0,this.$refs.list.scrollTop=0,this.open=!1},onEscape:function(){this.$refs.search.blur()},onScroll:function(){this.count+=1}}});new Vue({el:"#calc",data:{citys:[{id:1,city:"Амвросиевка",region:"ДНР"},{id:2,city:"Горловка",region:"ДНР"},{id:3,city:"Дебальцево",region:"ДНР"},{id:4,city:"Докучаевск",region:"ДНР"},{id:5,city:"Донецк",region:"ДНР"},{id:6,city:"Енакиево",region:"ДНР"},{id:7,city:"Ждановка",region:"ДНР"},{id:8,city:"Зугрес",region:"ДНР"},{id:9,city:"Иловайск",region:"ДНР"},{id:10,city:"Кировское",region:"ДНР"},{id:11,city:"Макеевка",region:"ДНР"},{id:12,city:"Моспино",region:"ДНР"},{id:13,city:"Новоазовск",region:"ДНР"},{id:14,city:"Новый свет",region:"ДНР"},{id:15,city:"Седово",region:"ДНР"},{id:16,city:"Снежное",region:"ДНР"},{id:17,city:"Старобешево",region:"ДНР"},{id:18,city:"Тельманово",region:"ДНР"},{id:19,city:"Торез",region:"ДНР"},{id:20,city:"Углегорск",region:"ДНР"},{id:21,city:"Харцызск",region:"ДНР"},{id:22,city:"Шахтерск",region:"ДНР"},{id:23,city:"Ясиноватая",region:"ДНР"}],tables:{TZ:[[1,3,4,4,4,3,3,3,2,3,3,3,4,3,4,3,3,4,3,4,3,3,3],[3,1,2,4,3,2,2,2,3,2,3,4,5,4,5,3,4,5,3,2,3,3,3],[4,2,1,4,3,2,2,2,4,2,3,4,5,4,5,3,4,5,3,2,3,3,3],[4,4,4,1,2,4,4,4,4,4,3,2,4,2,4,4,2,4,4,4,3,4,3],[4,3,3,2,1,3,3,3,4,3,1,2,4,2,4,3,2,4,3,3,2,3,1],[3,2,2,4,3,1,2,2,3,2,3,4,4,4,4,3,4,4,3,2,2,2,2],[3,2,2,4,3,2,1,3,3,2,3,4,4,4,4,3,4,4,3,2,2,2,2],[3,2,2,4,3,2,3,1,3,3,3,4,4,4,4,3,4,4,3,2,2,2,2],[2,3,4,4,4,3,3,3,1,3,3,3,4,3,4,3,3,4,3,4,3,3,3],[3,2,2,4,3,2,2,3,3,1,3,4,5,4,5,3,4,5,3,2,2,2,2],[3,3,3,3,1,3,3,3,3,3,1,3,4,3,4,3,3,4,3,3,1,3,1],[3,4,4,2,2,4,4,4,3,4,3,1,4,2,4,4,2,4,3,4,3,3,3],[4,5,5,4,4,4,4,4,4,5,4,4,1,4,2,5,4,1,5,5,4,4,4],[3,4,4,2,2,4,4,4,3,4,3,2,4,1,4,4,2,4,3,4,3,3,3],[4,5,5,4,4,4,4,4,4,5,4,4,2,4,1,5,4,2,5,5,4,4,4],[3,3,3,4,3,3,3,3,3,3,3,4,5,4,5,1,4,5,2,3,3,2,3],[3,4,4,2,2,4,4,4,3,4,3,2,4,2,4,4,1,4,3,4,3,3,3],[4,5,5,4,4,4,4,4,4,5,4,4,3,4,2,5,4,1,5,5,4,4,4],[3,3,3,4,3,3,3,3,3,3,3,3,5,3,5,2,3,5,1,3,2,2,3],[4,2,2,4,3,2,2,2,4,2,3,4,5,4,5,3,4,5,3,1,3,3,3],[3,3,3,3,2,2,2,2,3,2,1,3,4,3,4,3,3,4,2,3,1,2,2],[3,3,3,4,3,2,2,2,3,2,3,3,4,3,4,2,3,4,2,3,2,1,3],[3,3,3,3,1,2,2,2,3,2,1,3,4,3,4,3,3,4,3,3,2,3,1]],tariff:[{min:0,max:1,prices:[0,50,55,61,68,75,83],courierPrice:60},{min:1,max:5,prices:[0,65,72,80,88,97,107],courierPrice:100},{min:5,max:10,prices:[0,75,83,92,102,113,125],courierPrice:120},{min:10,max:20,prices:[0,100,110,121,134,148,163],courierPrice:140},{min:20,max:35,prices:[0,130,143,172,190,228,251],courierPrice:160},{min:35,max:50,prices:[0,150,165,198,218,262,289],courierPrice:200},{min:50,max:1/0,prices:[[0,0],[150,.7],[165,.8],[198,1],[218,1.3],[262,1.5],[289,1.7]],courierPrice:400}]},direction:{from:{id:0},to:{id:0}},typeOfLoad:"docs",load:{weight:0,o:0,price:0},loadFields:[],cashPay:{active:!1,sum:!1},overlay:!1},computed:{TZ:function(){return this.direction.from.id>0&&this.direction.to.id>0?this.tables.TZ[this.direction.to.id-1][this.direction.from.id-1]:0},total:function(){var e=this;if("docs"===this.typeOfLoad)switch(this.TZ){case 1:return 50;case 2:case 3:return 55;case 4:case 5:return 60;case 6:return 70;case 7:return 120}if("load"===this.typeOfLoad){var t=this.tables.tariff[0],i=!0,n=function(){var t=250*e.load.o,i=e.load.weight,n=t>=i?t:i;return e.round(n)}();return n>0?(t=this.tables.tariff.find(function(e,t,s){return t+1===s.length&&(i=!1),n>e.min&&n<=e.max}),[function(){var s=t.prices[e.TZ],o=i?s:s[0]+(n-50)*s[1];return e.round(o)}(),function(){if(e.load.price>0){var t=.005*e.load.price;return e.round(t>5?t:5)}return 0}(),function(){var t=e.cashPay.sum,i=e.round(.01*t);return e.cashPay.active?50+i:0}(),t.courierPrice].reduce(function(e,t){return e+t},0)):0}}},methods:{round:function(e){return Math.round(100*e/100)},addPlace:function(){this.loadFields.push({weight:10,o:.05,d:0,s:0,v:0,price:500,isCalcO:!1}),this.addAll()},delPlace:function(e){this.loadFields.splice(e,1),this.addAll()},add:function(e){this.load[e]=0;for(var t=0;t<this.loadFields.length;t++)this.load[e]+=parseFloat(this.loadFields[t][e]);"object"===_typeof(window.event)&&this.validate(window.event)},addAll:function(){this.add("weight"),this.add("o"),this.add("price")},calcO:function(e){if("close"!==e){var t=this.loadFields[e];t.d&&t.s&&t.v&&(t.o=(t.d*t.s*t.v/1e6).toFixed(3)),this.addAll();var i=this.$refs.volume[0];i.classList?i.classList.remove("novalid"):i.className=i.className.replace(new RegExp("(^|\\b)"+"novalid".split(" ").join("|")+"(\\b|$)","gi")," ")}for(var n=0;n<this.loadFields.length;n++)1==this.loadFields[n].isCalcO&&(this.loadFields[n].isCalcO=!1);this.overlay=!1},goCalcO:function(e){this.overlay=!0;var t=this.loadFields[e];t.d=0,t.s=0,t.v=0,t.isCalcO=!t.isCalcO},validate:function(e){var t=e.target,i=t.value;(function(e,t){return(e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector).call(e,t)})(t,"input")&&(i<=0?t.classList?t.classList.add("novalid"):t.className+=" novalid":t.classList?t.classList.remove("novalid"):t.className=t.className.replace(new RegExp("(^|\\b)"+"novalid".split(" ").join("|")+"(\\b|$)","gi")," "))}},created:function(){this.addPlace()}})}();