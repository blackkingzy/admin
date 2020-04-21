import { constRoutes, asyncRoutes, _404 } from '@/router'

const state = {
  routes: [], // 完整路由表
  addRoutes: [] // 用户可访问路由表
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constRoutes.concat(routes) // 这里要返回新的数组
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      //根据角色进行过滤
      const accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
      accessRoutes.push(_404) //将404动态添加进去,且放到最后
      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  }
}

/**
 * 递归过滤AsyncRoutes路由表
 * @routes 待过滤路由表，首次传入的就是AsyncRoutes
 * @roles 用户拥有角色
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    // 复制一份，保证AsyncRoutes的完整性(如果不复制直接采用route,下面的递归会改变AsyncRoutes下的children,之后切换用户,它对比的AsyncRoutes就不是完整的了)
    const tmp = { ...route }
    // 如果用户有访问权则加入结果路由表
    if (hasPermission(roles, tmp)) {
      // 如果存在子路由则递归过滤之
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * 根据路由meta.role确定是否当前用户拥有访问权限
 * @roles 用户拥有角色
 * @route 待判定路由
 */
function hasPermission(roles, route) {
  // 如果当前路由有roles字段则需判断用户访问权限
  if (route.meta && route.meta.roles) {
    // 若用户拥有的角色中有被包含在待判定路由角色表中的则拥有访问权
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 没有设置roles则无需判定即可访问
    return true
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
