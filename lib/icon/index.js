"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    props: {
        info: null,
        name: {
            type: String,
            observer: 'nameIsSrc'
        },
        size: String,
        color: String,
        customStyle: String,
        classPrefix: {
            type: String,
            value: 'van-icon'
        }
    },
    data: {
        isSrc: false
    },
    methods: {
        onClick: function () {
            this.$emit('click');
        },
        nameIsSrc: function () {
            var name = this.data.name;
            var isSrc = name.indexOf('http') === 0 ||
                name.indexOf('data:image') === 0 ||
                name.indexOf('//') === 0;
            this.set({ isSrc: isSrc });
        }
    }
});
