export const selectModal = state => state.modal.isOpen;
export const selectEditProfileModal = state => state.modal.isEditProfileOpen;
export const selectCreateBoardModal = state => state.modal.isCreateBoardOpen;
export const selectResendVerifyEmailModal = state =>
  state.modal.isResendVerifyEmailOpen;
export const selectNeedHelpModal = state => state.modal.isNeedHelpOpen;
export const selectEditBoardOpen = state => state.modal.isEditBoardOpen;
export const selectEditTaskOpen = state => state.modal.isEditTaskOpen;
export const selectEditColumnOpen = (state, columnId) => {
  return !!state.modal.isEditColumnOpen[columnId]; 
};