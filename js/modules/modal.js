function modal(overlay, closeBtn, activeClass) {
  const overlayModal = document.querySelector(overlay);
  const modalClose = overlayModal.querySelector(closeBtn);

  modalClose.addEventListener("click", () => {
    overlayModal.classList.remove(activeClass);
  });
}

export default modal;
