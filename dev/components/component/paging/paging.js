define(['tools', 'jquery'], function (tools, $) {
    "use strict";

    function Paging(conf) {
        if (this instanceof Paging) {
            this.init(conf);
        }
    }

    tools.mix(Paging.prototype, {

        init: function (conf) {

            var _conf;
            this.DEFAULT_CONFIG = {

                // 总共多少条数据
                itemTotal: 2000,

                // 每页生成多少条
                pageItem: 6,

                // 显示的按钮的数量
                showBtns: 16,

                // 缓存当前页之后多少条数据
                cache: 10,
                url: "",
                parent: $('body'),
                disabledCls : "disable",
                currentCls: "current",
                current: 1,
                // 分页按钮模版
                htmlTpl: "<li class=\"btn\">$</li>",

                // 添加一个内部标识符，用于事件监听时判定
                innerClass: "innerClass-" + tools.random(100, 1000, 2).join(""),

                // prev的内容
                prevText: "上一页",
                nextText: "下一页",

                success: function (data) {
                },
                error: function (msg) {
                }
            };

            /**
             * 规定：
             * prev的编号为0
             * next的编号为 this.actualBtnTotal + 1
             *
             * @type {*|Object}
             * @private
             */

            _conf = this.config = tools.mix(conf || {}, this.DEFAULT_CONFIG);


            // 按钮总个数
            this.btnTotal = Math.ceil(_conf.itemTotal / _conf.pageItem);

            // 确定按钮总页数
            this.btnPages = Math.ceil(this.btnTotal / _conf.showBtns);

            // 记录实际生成的button的数量
            // 如果按钮的页数 < 1
            // 则实际生成的按钮数为总按钮数
            // 否则为每页显示的按钮数
            this.acutalBtnTotal = this.btnPages <= 1
                ? this.btnTotal : _conf.showBtns;

            // 当前显示的个数
            this.currentBtns = this.acutalBtnTotal;

                // 记录当前显示的最大编号
            this.btnMaxNum = this.acutalBtnTotal;


            this.cache = {
                // 用于缓存生成的dom
                doms: {},
                // 数据最多缓存btnTotal条
                data: new tools.Queue(_conf.btnTotal)
            };

            // 创建btn
            this.generateBtn();
            this.appendBtn();
            this.bindBtnEvent();
        },

        generateBtn: function () {
            var conf = this.config,
            // 确定是否要生成上一页按钮
                start = this.btnPages > 1 ? 0 : 1,

            // 确定需要生成多少个按钮：如果总button数比自定义显示button的个数还小
            // 则生成总button数即可
                end = this.acutalBtnTotal + ( start === 0 ? 1 : 0),
                tpl = conf.htmlTpl,
                cls = conf.innerClass,
                reg, doms, prop;

            if (!( tools.isString(tpl) && tools.isString(cls))) return;

            reg = /\$/g;
            doms = this.cache.doms;

            for (; start <= end; start++) {
                prop = "" + start;
                doms[prop] = ($(tpl.replace(reg, prop))
                    .attr("data-index", prop)
                    .addClass(cls));
            }

            // 设置prev和next的class
            if (doms["0"]) {
                doms["0"].addClass("prev").text(conf.prevText);
                doms["" + end].addClass("next").text(conf.nextText);
            }
            // 设置当前选中的元素
            this.setCurrent(conf.current, true);
        },

        appendBtn: function () {
            var _this = this,
                parent = this.config.parent;

            if (!tools.isFunction(this.config.parent.append)) return;

            tools.each(_this.cache.doms, function (prop, val) {
                parent.append(val);
            });
        },

        bindBtnEvent: function () {
            var conf = this.config,
                _this = this;

            this.config.parent.delegate('.' + conf.innerClass, 'click', function () {
                var __this = $(this),
                    page = __this.text(),
                    index = __this.attr("data-index");

                // 如果点击处于选中状态的按钮，return
                if (conf.current == page) return;

                // 如果是next，执行next方法
                if (index === "" + (_this.acutalBtnTotal + 1)) {
                    _this.next();
                }
                else if (index === "0") {
                    _this.prev();
                }
                else {
                    $.ajax({
                        "url": conf.url,
                        "type": "GET",
                        "data": page,
                        "success": function (data) {
                            conf.success(data, page);
                            _this.setCurrent(index, false);
                        },
                        "error": function (msg) {
                            conf.error(msg);
                        }
                    });
                }
            });
        },

        next: function () {
            var cur, conf = this.config, doms = this.cache.doms;

            // 如果当前显示的最大编号>=总按钮数
            // 表示已经到最后一页，禁用下一页
            if (this.btnMaxNum + this.acutalBtnTotal >= this.btnTotal) {
                doms["" + (this.acutalBtnTotal + 1)].attr("disabled");
            }

            if ( this.btnMaxNum >= this.btnTotal) return;

            // 取消上一页禁用
            doms["0"].removeAttr("disabled");

            // 更新每个按钮的编号
            for (var i = 1; i <= this.acutalBtnTotal; i++) {
                cur = doms["" + i];

                // 如果数据存在的话，就添加数据到dom上
                if (++this.btnMaxNum <= this.btnTotal) {
                    cur.text(this.btnMaxNum);
                }
                // 否则移除dom，并添加标记
                else {
                    --this.btnMaxNum;
                    --this.currentBtns;
                    cur.remove().attr("data-remove", "1");
                }
            }
        },

        prev: function () {
            var parent = this.config.parent,
                doms = this.cache.doms,
                index = this.btnMaxNum - this.currentBtns - this.acutalBtnTotal,
                i, cur, nextBtn;

            if ( index - this.acutalBtnTotal < 0)
                doms["0"].attr("disabled");

            if ( index < 0)
                return;

            // 取消下一页的禁用
            (nextBtn = doms["" + ( this.acutalBtnTotal + 1) ]).removeAttr("disabled");
            // 更新当前最大编号
            this.btnMaxNum = index + this.acutalBtnTotal;

            for ( i = 1; i <= this.acutalBtnTotal; i++){
                cur = doms[ "" + i ];
                if ( (index++) >= 0 ){
                    cur.text( index );
                    if( cur.attr("data-remove")){
                        cur.insertBefore(nextBtn).removeAttr("data-remove");
                        ++this.currentBtns;
                    }
                }
            }
        },

        setCurrent: function (page, force) {
            var doms, conf = this.config,
                turings, turAbs, fn, idx;

            page = page * 1;

            // 如果设定的页码与当前的页码相同，返回
            if ( !force && ( page == conf.current ) || page > this.btnTotal) return;

            doms = this.cache.doms;

            // 如果当前页处于第一页，禁用上一页
            if ( page <= this.acutalBtnTotal)
                doms["0"].attr("disabled");

            // 清除上一个current元素的样式
            doms[ conf.current ].removeClass(conf.currentCls);

            // 设置当前元素的样式
            doms[( conf.current = ( page % this.acutalBtnTotal || this.acutalBtnTotal) )]
                .addClass(conf.currentCls);

            // 判定当前页面需要翻页多少次
            turings = Math.ceil( this.btnMaxNum / this.acutalBtnTotal ) // 当前页面
                    - Math.ceil( page / this.acutalBtnTotal );          // 目标页面

            fn = turings < 1 ? "next" : "prev";

            // 翻页
            for ( idx = 0, turAbs = Math.abs( turings ) ;
                  idx < turAbs; idx++ ){
                this[ fn ]();
            }
        }

    });

    return Paging;
});