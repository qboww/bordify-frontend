export const selectUserName = state => state.user.login.username;
export const selectIsVerified = state => state.user.isVerified;
export const selectUserTheme = state => state.user.userTheme;
export const selectAccessToken = state => state.user.accessToken;
export const selectRefreshToken = state => state.user.refreshToken;
export const selectIsLoggined = state => state.user.isLoggined;
export const selectIsLoading = state => state.user.isLoading;
export const selectIsRefreshing = state => state.user.isRefreshing;
export const selectAvatar = state => state.user.userAvatar;
export const selectRefresh = state => state.user.isRefreshing;
export const selectUserEmail = state => state.user.login.email;
