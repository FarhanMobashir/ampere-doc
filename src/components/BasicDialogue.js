import { Modal } from "./Modal";

export const BasicDialogue = ({
  title,
  subtitle,
  rightActionButtonText,
  rightActionButtonOnClick,
  leftActionButtonText,
  leftActionButtonOnClick,
}) => {
  return (
    <Modal>
      <div class="modal-container bg-black-0">
        <h1 class="h4 black-6">{title}</h1>
        <p class="tx-14 medium black-5">{subtitle}</p>
        <div class="modal-button-container">
          <button class="btn btn-text" onClick={leftActionButtonOnClick}>
            {leftActionButtonText}
          </button>
          <button class="btn btn-text" onClick={rightActionButtonOnClick}>
            {rightActionButtonText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
