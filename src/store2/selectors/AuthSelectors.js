export const isAuthenticated = (state) => {
  if (state.auth.auth.user) return true
  return false
}
