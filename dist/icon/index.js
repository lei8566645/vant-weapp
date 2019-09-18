import { VantComponent } from '../common/component';
VantComponent({
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
        onClick() {
            this.$emit('click');
        },
        nameIsSrc() {
            const { name } = this.data;
            const isSrc = name.indexOf('http') === 0 ||
                name.indexOf('data:image') === 0 ||
                name.indexOf('//') === 0;
            this.set({ isSrc });
        }
    }
});
