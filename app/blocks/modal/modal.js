app.modalHandlers = {
  name: 'modalHandlers',
  description: 'Modal window events handling',
  init() {
    this.modalSwitcherHandlers();
  },
  modalSwitcherHandlers() {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.modal-overlay');
    const openModalBtn = document.querySelector('.js-modal-open');
    const closeModalBtn = document.querySelector('.js-modal-close');

    // close modal function
    const closeModal = function () {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
    };

    // close the modal when the close button and overlay is clicked
    closeModalBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // close modal when the Esc key is pressed
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });

    // open modal function
    const openModal = function () {
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
    };

    // open modal event
    openModalBtn.addEventListener('click', openModal);
  },
};
