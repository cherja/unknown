'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    Vue.component('typeahead', {

        template: '<div :class="typeaheadState">\n                    <div class="typeahead__toggle" ref="toggle" @mousedown.prevent="toggle">\n                        <input type="text" class="typeahead__search"\n                            ref="search"\n                            v-model.trim="search"\n                            @focus="onFocus"\n                            @blur="onBlur"\n                            @keydown.esc="onEscape"\n                            @keydown.down="onDownKey"\n                            @keydown.up="onUpKey"\n                            @keydown.enter="onEnterKey"\n                        >\n                        <span class="typeahead__text" ref="text">{{displayText}}</span>\n                    </div>\n                    <ul class="typeahead__list" ref="list" v-if="open" @scroll="onScroll">\n                        <li class="typeahead__item" v-for="(option, index) in filteredOptions" :key="index">\n                            <a class="typeahead__link"\n                                @mousedown.prevent="select(option)"\n                                :class="[selectIndex === index ? \'typeahead__active\':\'\']">\n                                {{option.city + " (" + option.region + ")"}}\n                            </a>\n                        </li>\n                        <li class="no_search" v-if="noSearch">\u0413\u043E\u0440\u043E\u0434 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D...</li>\n                    </ul>\n                    </div>',
        props: {
            options: {
                type: Array,
                default: function _default() {
                    return [];
                }
            },
            value: {
                type: [String, Number],
                default: null
            },
            directionText: {
                type: String,
                default: null
            }
        },
        data: function data() {
            return {
                open: false,
                selectIndex: 0,
                displayText: this.directionText,
                search: '',
                count: 15,
                noSearch: false
            };
        },
        computed: {
            typeaheadState: function typeaheadState() {
                return this.open ? 'typeahead typeahead__open' : 'typeahead';
            },
            filteredOptions: function filteredOptions() {
                var search = this.search;

                var afterFilter = this.options.filter(function (option) {
                    var pathOfCityName = option.city.split('').slice(0, search.length).join('');
                    if (search.toLowerCase() == pathOfCityName.toLowerCase()) return option.id || option.city;
                });

                if (afterFilter.length >= this.count) afterFilter.length = this.count;

                if (afterFilter.length == 0) this.noSearch = true;else this.noSearch = false;

                if (search.length > 0) {
                    return afterFilter.sort(function (a, b) {
                        var cityA = a.city.toUpperCase();
                        var cityB = b.city.toUpperCase();

                        var comparison = 0;
                        if (cityA > cityB) comparison = 1;else if (cityA < cityB) comparison = -1;
                        return comparison;
                    });
                } else return afterFilter;
            }
        },
        methods: {
            onDownKey: function onDownKey() {
                if (this.filteredOptions.length - 1 > this.selectIndex) {
                    this.selectIndex++;

                    // scroll when overflow
                    if (this.selectIndex > 2) {
                        this.$refs.list.scrollTop += 20 + this.selectIndex;
                    }
                }
            },
            onUpKey: function onUpKey() {
                if (this.selectIndex > 0) {
                    this.selectIndex--;

                    // scroll when overflow
                    if (this.selectIndex > 0) {
                        this.$refs.list.scrollTop -= 20 + this.selectIndex;
                    }
                }
            },
            onEnterKey: function onEnterKey() {
                var option = this.filteredOptions[this.selectIndex];

                if (option) {
                    this.select(option);
                }
            },
            select: function select(option) {
                this.displayText = option.city, this.search = '', this.$emit('input', option.id);
                this.$refs.search.blur();
            },
            toggle: function toggle(e) {
                if (e.target === this.$refs.toggle || e.target === this.$refs.search || e.target === this.$refs.text) {

                    if (this.open) {
                        if (e.target !== this.$refs.search && e.target !== this.$refs.text) {
                            this.$refs.search.blur();
                        }
                    } else {
                        this.$refs.search.focus();
                    }
                }
            },
            onFocus: function onFocus() {
                this.open = true;
            },
            onBlur: function onBlur() {
                this.selectIndex = 0;
                this.$refs.list.scrollTop = 0;
                this.open = false;
            },
            onEscape: function onEscape() {
                this.$refs.search.blur();
            },
            onScroll: function onScroll() {
                this.count += 1;
            }
        }

    });

    var vm = new Vue({

        el: '#calc',
        data: {
            //  Города
            citys: [{ id: 1, city: 'Амвросиевка', region: 'ДНР' }, { id: 2, city: 'Горловка', region: 'ДНР' }, { id: 3, city: 'Дебальцево', region: 'ДНР' }, { id: 4, city: 'Докучаевск', region: 'ДНР' }, { id: 5, city: 'Донецк', region: 'ДНР' }, { id: 6, city: 'Енакиево', region: 'ДНР' }, { id: 7, city: 'Ждановка', region: 'ДНР' }, { id: 8, city: 'Зугрес', region: 'ДНР' }, { id: 9, city: 'Иловайск', region: 'ДНР' }, { id: 10, city: 'Кировское', region: 'ДНР' }, { id: 11, city: 'Макеевка', region: 'ДНР' }, { id: 12, city: 'Моспино', region: 'ДНР' }, { id: 13, city: 'Новоазовск', region: 'ДНР' }, { id: 14, city: 'Новый свет', region: 'ДНР' }, { id: 15, city: 'Седово', region: 'ДНР' }, { id: 16, city: 'Снежное', region: 'ДНР' }, { id: 17, city: 'Старобешево', region: 'ДНР' }, { id: 18, city: 'Тельманово', region: 'ДНР' }, { id: 19, city: 'Торез', region: 'ДНР' }, { id: 20, city: 'Углегорск', region: 'ДНР' }, { id: 21, city: 'Харцызск', region: 'ДНР' }, { id: 22, city: 'Шахтерск', region: 'ДНР' }, { id: 23, city: 'Ясиноватая', region: 'ДНР' }],

            //  Тарифы и сроки
            tables: {

                TZ: [
                //    0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 
                [1, 3, 4, 4, 4, 3, 3, 3, 2, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3], // 0  Амвросиевка
                [3, 1, 2, 4, 3, 2, 2, 2, 3, 2, 3, 4, 5, 4, 5, 3, 4, 5, 3, 2, 3, 3, 3], // 1  Горловка
                [4, 2, 1, 4, 3, 2, 2, 2, 4, 2, 3, 4, 5, 4, 5, 3, 4, 5, 3, 2, 3, 3, 3], // 2  Дебальцево
                [4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 3, 2, 4, 2, 4, 4, 2, 4, 4, 4, 3, 4, 3], // 3  Докучаевск
                [4, 3, 3, 2, 1, 3, 3, 3, 4, 3, 1, 2, 4, 2, 4, 3, 2, 4, 3, 3, 2, 3, 1], // 4  Донецк
                [3, 2, 2, 4, 3, 1, 2, 2, 3, 2, 3, 4, 4, 4, 4, 3, 4, 4, 3, 2, 2, 2, 2], // 5  Енакиево
                [3, 2, 2, 4, 3, 2, 1, 3, 3, 2, 3, 4, 4, 4, 4, 3, 4, 4, 3, 2, 2, 2, 2], // 6  Ждановка
                [3, 2, 2, 4, 3, 2, 3, 1, 3, 3, 3, 4, 4, 4, 4, 3, 4, 4, 3, 2, 2, 2, 2], // 7  Зугрес
                [2, 3, 4, 4, 4, 3, 3, 3, 1, 3, 3, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3], // 8  Иловайск
                [3, 2, 2, 4, 3, 2, 2, 3, 3, 1, 3, 4, 5, 4, 5, 3, 4, 5, 3, 2, 2, 2, 2], // 9  Кировское
                [3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 1, 3, 4, 3, 4, 3, 3, 4, 3, 3, 1, 3, 1], // 10 Макеевка
                [3, 4, 4, 2, 2, 4, 4, 4, 3, 4, 3, 1, 4, 2, 4, 4, 2, 4, 3, 4, 3, 3, 3], // 11 Моспино
                [4, 5, 5, 4, 4, 4, 4, 4, 4, 5, 4, 4, 1, 4, 2, 5, 4, 1, 5, 5, 4, 4, 4], // 12 Новоазовск
                [3, 4, 4, 2, 2, 4, 4, 4, 3, 4, 3, 2, 4, 1, 4, 4, 2, 4, 3, 4, 3, 3, 3], // 13 Новый свет
                [4, 5, 5, 4, 4, 4, 4, 4, 4, 5, 4, 4, 2, 4, 1, 5, 4, 2, 5, 5, 4, 4, 4], // 14 Седово
                [3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 4, 5, 4, 5, 1, 4, 5, 2, 3, 3, 2, 3], // 15 Снежное
                [3, 4, 4, 2, 2, 4, 4, 4, 3, 4, 3, 2, 4, 2, 4, 4, 1, 4, 3, 4, 3, 3, 3], // 16 Старобешево
                [4, 5, 5, 4, 4, 4, 4, 4, 4, 5, 4, 4, 3, 4, 2, 5, 4, 1, 5, 5, 4, 4, 4], // 17 Тельманово
                [3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 5, 2, 3, 5, 1, 3, 2, 2, 3], // 18 Торез
                [4, 2, 2, 4, 3, 2, 2, 2, 4, 2, 3, 4, 5, 4, 5, 3, 4, 5, 3, 1, 3, 3, 3], // 19 Углегорск
                [3, 3, 3, 3, 2, 2, 2, 2, 3, 2, 1, 3, 4, 3, 4, 3, 3, 4, 2, 3, 1, 2, 2], // 20 Харцызск
                [3, 3, 3, 4, 3, 2, 2, 2, 3, 2, 3, 3, 4, 3, 4, 2, 3, 4, 2, 3, 2, 1, 3], // 21 Шахтерск
                [3, 3, 3, 3, 1, 2, 2, 2, 3, 2, 1, 3, 4, 3, 4, 3, 3, 4, 3, 3, 2, 3, 1] // 22 Ясиноватая
                ],

                tariff: [{
                    min: 0,
                    max: 1,
                    prices: [0, 50, 55, 61, 68, 75, 83],
                    courierPrice: 60
                }, {
                    min: 1,
                    max: 5,
                    prices: [0, 65, 72, 80, 88, 97, 107],
                    courierPrice: 100
                }, {
                    min: 5,
                    max: 10,
                    prices: [0, 75, 83, 92, 102, 113, 125],
                    courierPrice: 120
                }, {
                    min: 10,
                    max: 20,
                    prices: [0, 100, 110, 121, 134, 148, 163],
                    courierPrice: 140
                }, {
                    min: 20,
                    max: 35,
                    prices: [0, 130, 143, 172, 190, 228, 251],
                    courierPrice: 160
                }, {
                    min: 35,
                    max: 50,
                    prices: [0, 150, 165, 198, 218, 262, 289],
                    courierPrice: 200
                }, {
                    min: 50,
                    max: Infinity,
                    prices: [[0, 0], [150, 0.7], [165, 0.8], [198, 1], [218, 1.3], [262, 1.5], [289, 1.7]],
                    courierPrice: 400
                }]

            },

            //  Направление
            direction: { from: { id: 0 }, to: { id: 0 } },

            //  Тип груза по умолчанию
            typeOfLoad: 'docs',

            //  Данные груза для расчета
            load: {
                weight: 0, //  Вес
                o: 0, //  Объем
                price: 0 //  Оценочная стоимость
            },

            //  Данные по всем местам
            loadFields: [],

            //  Наложенный платеж
            cashPay: {
                active: false,
                sum: false
            },

            overlay: false
        },

        computed: {
            bigDisplay: function bigDisplay() {
                return document.documentElement.clientWidth >= 660;
            },
            TZ: function TZ() {
                return this.direction.from.id > 0 && this.direction.to.id > 0 ? this.tables.TZ[this.direction.to.id - 1][this.direction.from.id - 1] : 0;
            },


            //  Конечный результат
            total: function total() {
                var _this = this;

                if (this.TZ > 0) {

                    //  Если выбран тип груза "Документы"
                    if (this.typeOfLoad === 'docs') {
                        switch (this.TZ) {
                            case 1:
                                return 50;break;
                            case 2:
                                return 55;break;
                            case 3:
                                return 55;break;
                            case 4:
                                return 60;break;
                            case 5:
                                return 60;break;
                            case 6:
                                return 70;break;
                            case 7:
                                return 120;break;
                        }
                    }

                    //  Если выбран тип груза "Груз"
                    if (this.typeOfLoad === 'load') {

                        var tariff = this.tables.tariff[0],
                            isFixedPrice = true;

                        //  Выбираем максимальное значение веса между фактическим и объемным весами
                        var weight = function () {
                            var volumeWeight = _this.load.o * 250,
                                factWeight = _this.load.weight,
                                maxWeight = volumeWeight >= factWeight ? volumeWeight : factWeight;
                            return _this.round(maxWeight);
                        }();

                        // Определяем тариф по рассчитанному весу
                        if (weight > 0) {
                            tariff = this.tables.tariff.find(function (item, index, array) {
                                //  Если выбран последний тариф - значит вес > 50 кг и цена уже не фиксированная
                                if (index + 1 === array.length) isFixedPrice = false;
                                return weight > item.min && weight <= item.max;
                            });

                            var sums = [function () {
                                var price = tariff.prices[_this.TZ],
                                    totalPrice = isFixedPrice ? price : price[0] + (weight - 50) * price[1];
                                return _this.round(totalPrice);
                            }(),

                            //  Считаем комиссию от оценочной стоимости
                            function () {
                                if (_this.load.price > 0) {
                                    var comissSum = _this.load.price * 0.005;
                                    return _this.round(comissSum > 5 ? comissSum : 5);
                                } else return 0;
                            }(),

                            //  Считаем наложенный платеж
                            function () {
                                var summ = _this.cashPay.sum,
                                    comissNal = _this.round(summ * 0.01);
                                return _this.cashPay.active ? 50 + comissNal : 0;
                            }(), tariff.courierPrice];

                            return sums.reduce(function (p, c) {
                                return p + c;
                            }, 0);
                        } else return 0;
                    }
                }
            }
        },

        methods: {
            round: function round(num) {
                return Math.round(num * 100 / 100);
            },


            //  Добавить место
            addPlace: function addPlace() {
                this.loadFields.push({

                    //  Данные по умолчанию
                    weight: 10,
                    o: 0.05,
                    d: 0,
                    s: 0,
                    v: 0,
                    price: 500,
                    isCalcO: false // Рассчитывать ли объем
                });
                this.addAll();
            },

            //  Удалить место
            delPlace: function delPlace(index) {
                this.loadFields.splice(index, 1);
                this.addAll();
            },

            //  Сложить параметр мест
            add: function add(param) {

                this['load'][param] = 0;
                for (var i = 0; i < this.loadFields.length; i++) {
                    this['load'][param] += parseFloat(this.loadFields[i][param]);
                }

                //  Если функия запущена DOM-элементом - валидируем
                if (_typeof(window.event) === 'object') this.validate(window.event);
            },

            //  Сложить все параметры мест
            addAll: function addAll() {
                this.add('weight');
                this.add('o');
                this.add('price');
            },

            //  Расчетный объем
            calcO: function calcO(index) {

                if (index !== 'close') {

                    var field = this.loadFields[index];

                    if (field.d && field.s && field.v) field.o = (field.d * field.s * field.v / 1000000).toFixed(3);

                    this.addAll();
                    var elem = this.$refs.volume[0];
                    if (elem.classList) elem.classList.remove('novalid');else elem.className = elem.className.replace(new RegExp('(^|\\b)' + 'novalid'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                }

                for (var i = 0; i < this.loadFields.length; i++) {
                    if (this.loadFields[i].isCalcO == true) this.loadFields[i].isCalcO = false;
                }
                this.overlay = false;
            },

            //  Открываем расчет по габаритам
            goCalcO: function goCalcO(index) {

                this.overlay = true;

                var field = this.loadFields[index];

                field.d = 0;
                field.s = 0;
                field.v = 0;

                field.isCalcO = !field.isCalcO;
            },

            //  Валидация полей
            validate: function validate(event) {
                var el = event.target;
                var value = el.value;
                var matches = function matches(el, selector) {
                    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector).call(el, selector);
                };

                if (matches(el, 'input')) {

                    if (value <= 0) {
                        if (el.classList) el.classList.add('novalid');else el.className += ' ' + 'novalid';
                    } else {
                        if (el.classList) el.classList.remove('novalid');else el.className = el.className.replace(new RegExp('(^|\\b)' + 'novalid'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                    }
                }
            }
        },

        created: function created() {
            this.addPlace();
        }

    });
    var forms = document.querySelectorAll('.callback_form');

    forms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var phone = form.querySelector('.tell').value;
            if (phone.length < 10) return alert('Убедитесь в правильности введенного номера телефона!');

            $.ajax({
                type: 'POST',
                url: '../php/callback.php',
                data: $(form).serialize(),
                success: function success() {
                    alert('Спасибо за обращение, ожидайте звонка оператора!');
                },
                error: function error() {
                    alert('Непредвиденная ошибка сервера, обратитесь позже...');
                }
            });
        });
    });
    var buttonsClassList = document.getElementById('toptbuttons').classList,
        headerHeight = document.getElementsByTagName('header')[0].offsetHeight,
        fixedClass = 'fixed';

    window.onscroll = function () {
        if (window.pageYOffset >= headerHeight) buttonsClassList.add(fixedClass);else if (buttonsClassList.contains(fixedClass)) buttonsClassList.remove(fixedClass);
    };
})();