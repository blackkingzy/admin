import { create } from '@/api/article'

const getDefaultState = () => {
  return {}
}

const state = getDefaultState()

const mutations = {}

const actions = {
  // create Article
  createArticle({ commit }, articleInfo) {
    return new Promise((resolve, reject) => {
      create(articleInfo)
        .then(response => {
          const { data } = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
