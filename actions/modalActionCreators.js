const showModal = (modalType) => ({
  type: 'SHOW_MODAL',
  modalType,
});

const hideModal = () => ({
  type: 'HIDE_MODAL',
  modalType: null,
});

export {showModal, hideModal};
