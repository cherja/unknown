Vue.component('typeahead', {
    
        template: `<div :class="typeaheadState">
                    <div class="typeahead__toggle" ref="toggle" @mousedown.prevent="toggle">
                        <input type="text" class="typeahead__search"
                            ref="search"
                            v-model.trim="search"
                            @focus="onFocus"
                            @blur="onBlur"
                            @keydown.esc="onEscape"
                            @keydown.down="onDownKey"
                            @keydown.up="onUpKey"
                            @keydown.enter="onEnterKey"
                        >
                        <span class="typeahead__text" ref="text">{{displayText}}</span>
                    </div>
                    <ul class="typeahead__list" ref="list" v-if="open" @scroll="onScroll">
                        <li class="typeahead__item" v-for="(option, index) in filteredOptions" :key="index">
                            <a class="typeahead__link"
                                @mousedown.prevent="select(index)"
                                :class="[selectIndex === index ? \'typeahead__active\':\'\']">
                                {{option}}
                            </a>
                        </li>
                        <li class="no_search" v-if="filteredOptions.length === 0">Город не найден...</li>
                    </ul>
                    </div>`,
        props: {
            options: {
                type: Array,
                default: () => []
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
        data: function() {
            return {
                open: false,
                selectIndex: 0,
                displayText: this.directionText,
                search: '',
                count: 15
            };
        },
        computed: {
            typeaheadState: function() {
                return this.open ? 'typeahead typeahead__open' : 'typeahead'
            },
            filteredOptions: function() {
    
                const afterFilter = this.options.filter(option => {
                    const pathOfCityName = option.split('').slice(0, this.search.length).join('');
                    if (this.search.toLowerCase() == pathOfCityName.toLowerCase()) return option;
                });
    
                if (afterFilter.length >= this.count)
                    afterFilter.length = this.count;
    
                if (this.search.length > 0) {
                    return afterFilter.sort(function(a, b) {
                        var cityA = a.city.toUpperCase();
                        var cityB = b.city.toUpperCase();
    
                        var comparison = 0;
                        if (cityA > cityB) comparison = 1;
                        else if (cityA < cityB) comparison = -1;
                        return comparison;
                    })
                } else return afterFilter;
            }
        },
        methods: {
            onDownKey: function() {
                if (this.filteredOptions.length - 1 > this.selectIndex) {
                    this.selectIndex++
    
                        // scroll when overflow
                        if (this.selectIndex > 2) {
                            this.$refs.list.scrollTop += (20 + this.selectIndex);
                        }
                }
            },
            onUpKey: function() {
                if (this.selectIndex > 0) {
                    this.selectIndex--;
    
                    // scroll when overflow
                    if (this.selectIndex > 0) {
                        this.$refs.list.scrollTop -= (20 + this.selectIndex);
                    }
                }
            },
            onEnterKey: function() {
                var option = this.filteredOptions[this.selectIndex];
    
                if (option) {
                    this.select(option);
                }
            },
            select: function(id) {
                this.displayText = this.options[id];
                this.search = '';
                this.$emit('input', id);
                this.$refs.search.blur();
            },
            toggle: function(e) {
                if (e.target === this.$refs.toggle ||
                    e.target === this.$refs.search ||
                    e.target === this.$refs.text) {
    
                    if (this.open) {
                        if (e.target !== this.$refs.search &&
                            e.target !== this.$refs.text) {
                            this.$refs.search.blur();
                        }
                    } else {
                        this.$refs.search.focus();
                    }
                }
            },
            onFocus: function() {
                this.open = true;
            },
            onBlur: function() {
                this.selectIndex = 0;
                this.$refs.list.scrollTop = 0;
                this.open = false;
            },
            onEscape: function() {
                this.$refs.search.blur();
            },
            onScroll: function() {
                this.count += 1;
            }
        }
    
    });
    
    
var vm = new Vue({

    el: '#calc',
    data: {

        citys: [
            'Амвросиевка',
            'Донецк',
            'Дебальцево',
            'Докучаевск',
            'Горловка',
            'Енакиево',
            'Ждановка',
            'Кировское',
            'Макеевка',
            'Новоазовск',
            'Снежное',
            'Старобешево',
            'Тельманово',
            'Торез',
            'Харцызск',
            'Шахтерск',
            'Ясиноватая'
        ],

        tableTZ: [
        //   0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 4, 3, 2, 3, 3 ], // 0  Амвросиевка
            [3, 1, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 4, 3, 2, 3, 2 ], // 1  Донецк
            [3, 3, 1, 3, 3, 3, 3, 3, 3, 4, 3, 3, 4, 3, 3, 3, 3 ], // 2  Дебальцево
            [3, 3, 3, 1, 3, 3, 3, 3, 3, 4, 3, 2, 3, 3, 3, 3, 3 ], // 3  Докучаевск
            [3, 3, 3, 3, 1, 2, 3, 3, 3, 4, 3, 3, 4, 3, 3, 3, 3 ], // 4  Горловка
            [3, 3, 3, 3, 2, 1, 2, 2, 3, 4, 3, 3, 4, 3, 3, 3, 3 ], // 5  Енакиево
            [3, 3, 3, 3, 3, 2, 1, 2, 3, 4, 3, 3, 4, 3, 3, 3, 3 ], // 6  Ждановка
            [3, 3, 3, 3, 3, 2, 2, 1, 3, 4, 3, 3, 4, 3, 3, 3, 3 ], // 7  Кировское
            [3, 1, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 4, 3, 3, 3, 3 ], // 8  Макеевка
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 3, 4, 4, 4, 4 ], // 9  Новоазовск
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 1, 3, 4, 2, 3, 3, 3 ], // 10 Снежное
            [3, 3, 3, 2, 3, 3, 3, 3, 3, 4, 3, 1, 3, 3, 3, 3, 3 ], // 11 Старобешево
            [4, 4, 4, 3, 4, 4, 4, 4, 4, 3, 4, 3, 1, 4, 4, 4, 4 ], // 12 Тельманово
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 4, 1, 3, 2, 3 ], // 13 Торез
            [3, 2, 3, 3, 3, 3, 3, 3, 2, 4, 3, 3, 4, 3, 1, 2, 3 ], // 14 Харцызск
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 4, 2, 2, 1, 3 ], // 15 Шахтерск
            [3, 2, 3, 3, 3, 3, 3, 3, 2, 4, 3, 3, 4, 3, 3, 3, 1 ]  // 16 Ясиноватая
        ],

        tariff: [
            { min:  0, max:  2, prices: [0,  65,  80, 120, 200] },
            { min:  2, max:  5, prices: [0,  75, 100, 150, 240] },
            { min:  5, max: 10, prices: [0,  95, 120, 180, 300] },
            { min: 10, max: 20, prices: [0, 130, 150, 220, 350] },
            { min: 20, max: 35, prices: [0, 165, 180, 270, 410] },
            { min: 35, max: 50, prices: [0, 210, 230, 350, 470] },
            { min: 50, max: Infinity, prices: [0, .8, 1.5, 2.5, 3] }
        ],

        docsTarif: [0, 60, 70, 80, 90],

        //  Направление
        direction: { from: undefined, to: undefined },

        //  Тип груза по умолчанию
        typeOfLoad: 'load',

        //  Данные груза для расчета
        load: {
            weight: 0, //  Вес
            o: 0, //  Объем
            price: 0, //  Оценочная стоимость
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

        bigDisplay() {
            return document.documentElement.clientWidth >= 660;
        },

        TZ() {
            const { from, to } = this.direction;
            return (from !== undefined && to !== undefined) ? this.tableTZ[to][from] : 0;
        },

        //  Конечный результат
        total() {

            if (this.TZ > 0) {

                if (this.typeOfLoad === 'docs') {
                    return this.docsTarif[this.TZ];
                }

                let                    
                    tariff = this.tariff[0],
                    isFixedPrice = true;

                //  Выбираем максимальное значение веса между фактическим и объемным весами
                const weight = (() => {
                    const
                        volumeWeight = this.load.o * 250,
                        factWeight   = this.load.weight,
                        maxWeight    = (volumeWeight >= factWeight) ? volumeWeight : factWeight;
                    return this.round(maxWeight);
                })();

                // Определяем тариф по рассчитанному весу
                if (weight > 0) {
                    tariff = this.tariff.find((item, index, array) => {
                        //  Если выбран последний тариф - значит вес > 50 кг и цена уже не фиксированная
                        if ((index + 1) === array.length) isFixedPrice = false;
                        return (weight > item.min && weight <= item.max);
                    });

                    const sums = [
                        (() => {
                            const
                                price = tariff.prices[this.TZ],
                                totalPrice = (isFixedPrice) ? price : (price[0] + (weight - 50) * price[1]);
                            return this.round(totalPrice);
                        })(),

                        //  Считаем комиссию от оценочной стоимости
                        (() => {
                            if (this.load.price > 0) {
                                const comissSum = this.load.price * 0.0025;
                                return this.round((comissSum > 5) ? comissSum : 5);
                            } else return 0;
                        })(),

                        //  Считаем наложенный платеж
                        (() => {
                            const
                                summ = this.cashPay.sum,
                                comissNal = this.round(summ * 0.01);
                            return this.cashPay.active ? 50 + comissNal : 0;
                        })(),
                    ];

                    return sums.reduce((p, c) => p + c, 0);
                }   else return 0; 
            }
        }
    },

    methods: {

        round(num) {
            return Math.round((num * 100) / 100);
        },

        //  Добавить место
        addPlace: function() {
            this.loadFields.push({

                //  Данные по умолчанию
                weight: 10,
                o: 0.05,
                d: 0,
                s: 0,
                v: 0,
                price: 500,
                isCalcO: false, // Рассчитывать ли объем
            });
            this.addAll();
        },

        //  Удалить место
        delPlace: function(index) {
            this.loadFields.splice(index, 1);
            this.addAll();
        },

        //  Сложить параметр мест
        add: function(param) {

            this['load'][param] = 0;
            for (var i = 0; i < this.loadFields.length; i++) {
                this['load'][param] += parseFloat(this.loadFields[i][param]);
            }

            //  Если функия запущена DOM-элементом - валидируем
            if (typeof window.event === 'object')
                this.validate(window.event);
        },

        //  Сложить все параметры мест
        addAll: function() {
            this.add('weight');
            this.add('o');
            this.add('price');
        },

        //  Расчетный объем
        calcO: function(index) {

            if (index !== 'close') {

                var field = this.loadFields[index];

                if (field.d && field.s && field.v)
                    field.o = ((field.d * field.s * field.v) / 1000000).toFixed(3);

                this.addAll();
                var elem = this.$refs.volume[0];
                if (elem.classList)
                    elem.classList.remove('novalid');
                else
                    elem.className = elem.className.replace(new RegExp('(^|\\b)' + 'novalid'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }

            for (var i = 0; i < this.loadFields.length; i++) {
                if (this.loadFields[i].isCalcO == true)
                    this.loadFields[i].isCalcO = false;
            }
            this.overlay = false;                
        },

        //  Открываем расчет по габаритам
        goCalcO: function(index) {

            this.overlay = true;

            var field = this.loadFields[index];

            field.d = 0;
            field.s = 0;
            field.v = 0;

            field.isCalcO = !field.isCalcO;
        },

        //  Валидация полей
        validate: function(event) {
            var el = event.target;
            var value = el.value;
            var matches = function(el, selector) {
                return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector).call(el, selector);
            };


            if (matches(el, 'input')) {

                if (value <= 0) {
                    if (el.classList)
                        el.classList.add('novalid');
                    else
                        el.className += ' ' + 'novalid';
                } else {
                    if (el.classList)
                        el.classList.remove('novalid');
                    else
                        el.className = el.className.replace(new RegExp('(^|\\b)' + 'novalid'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                }

            }
        }
    },

    created: function() {
        this.addPlace();
    }

});