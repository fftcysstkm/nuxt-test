export const state = () => ({
  point: 0,
})
export const mutations = {
  increment(state) {
    state.point++
  },
}
export const actions = {}
export const getters = {
  // ポイントを取得する
  point(state) {
    return state.point
  },
}
