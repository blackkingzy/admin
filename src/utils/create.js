import Vue from 'vue'
import store from '../store'
import router from '../router'
// 创建一个create函数，可以动态生成组件实例，并且挂载到body上

// Component:是组件配置对象
export function create(Component, props) {
  // 借用vue的构造函数来动态生成这个组件实例
  const vm = new Vue({
    store,
    router,
    render(h) {
      return h(Component, { props })
    }
  })
  // 尽管没有挂载目标，但其vm已经有了$el属性
  vm.$mount() // 这个函数执行才会执行render函数

  //通过$el属性获得真实dom
  document.body.appendChild(vm.$el)
  //组件实例返回
  const comp = vm.$children[0]
  // 销毁方法，释放内存
  comp.remove = () => {
    document.body.removeChild(vm.$el)
    comp.$destroy()
    // vm.$destroy()
  }

  return comp
}
// export function create(Component, props) {
//     // 借用vue的构造函数来动态生成这个组件实例
//     const Profile = Vue.extend({
//         render(h) {
//             return h(Component, { props })
//         }
//     })
//     // 尽管没有挂载目标，但其vm已经有了$el属性
//     const vm = new Profile().$mount() // 这个函数执行才会执行render函数

//     //通过$el属性获得真实dom
//     document.body.appendChild(vm.$el)
//     //组件实例返回
//     const comp = vm.$children[0]
//     // 销毁方法，释放内存
//     comp.remove = () => {
//         document.body.removeChild(vm.$el)
//         comp.$destroy
//     }

//     return comp
// }
