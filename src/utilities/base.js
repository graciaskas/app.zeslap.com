class Base {
  constructor() {
    this.forms = document.querySelectorAll(".form__sheet");
    this.disabledInputs = document.querySelectorAll("input[disabled]");
    this.modifyBtn = document.querySelector("button[name='modifyBtn']");
    this.closeModal = document.querySelector("span[role='button']");

    this.modifyBtn && this.modifyBtn.addEventListener("click", this.modifyBtn);

    this.closeModal &&
      this.closeModal.addEventListener("click", (e) => {
        const modal =
          e.target.parentElement.parentElement.parentElement.parentElement;
        modal.classList.remove("hidden");
      });
  }

  closeModal() {}
  modifyBtn() {
    console.log("clicked !");
    try {
      this.disabledInputs.forEach((input) => input.removeAttribute("disabled"));
    } catch (error) {}
  }
}

export default Base;
