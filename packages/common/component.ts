import { basic } from '../mixins/basic';
import { observe } from '../mixins/observer/index';
import {
  VantComponentOptions,
  CombinedComponentInstance
} from 'definitions/index';

function mapKeys(source: object, target: object, map: object) {
  Object.keys(map).forEach(key => {
    if (source[key]) {
      target[map[key]] = source[key];
    }
  });
}

function VantComponent<Data, Props, Methods>(
  vantOptions: VantComponentOptions<
    Data,
    Props,
    Methods,
    CombinedComponentInstance<Data, Props, Methods>
  > = {}
): void {
  const options: any = {};

  // 有赞这边自己做了一个key的映射，把微信小程序原生Component构造函数传的对象的key做了映射
  mapKeys(vantOptions, options, {
    // 这个对象，key是有赞自己定的， value是微信小程序原生的
    data: 'data',
    props: 'properties',
    mixins: 'behaviors',
    methods: 'methods',
    beforeCreate: 'created',
    created: 'attached',
    mounted: 'ready',
    relations: 'relations',
    destroyed: 'detached',
    classes: 'externalClasses'
  });

  const { relation } = vantOptions;
  if (relation) {
    options.relations = Object.assign(options.relations || {}, {
      [`../${relation.name}/index`]: relation
    });
  }

  // add default externalClasses
  options.externalClasses = options.externalClasses || [];
  options.externalClasses.push('custom-class');

  // add default behaviors
  // 添加一些默认的behaviors, 给所有的组件提供 $emit, getRect 方法
  options.behaviors = options.behaviors || [];
  options.behaviors.push(basic);

  // map field to form-field behavior
  if (vantOptions.field) {
    options.behaviors.push('wx://form-field');
  }

  // add default options
  options.options = {
    // 在组件定义时的选项中启用多slot支持
    multipleSlots: true,
    // 在 Component 的 options 中设置 addGlobalClass: true 。 这个选项等价于设置 styleIsolation: apply-shared ，但设置了 styleIsolation 选项后这个选项会失效。
    // apply-shared 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；
    addGlobalClass: true
  };

  observe(vantOptions, options);
  Component(options);
}

export { VantComponent };
