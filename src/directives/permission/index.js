import store from '@/store'

// 指令只能删除挂载指令的元素，对于那些额外⽣成的和指令⽆关的元素⽆能为⼒,用v-if
// 因为其已经到了dom操作,所有的vnode都已成型
export default {
  inserted(el, binding, vnode) {
    const { value } = binding //value是数组
    const roles = store.getters && store.getters.roles

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
