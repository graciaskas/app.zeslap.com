class Base {
  constructor() {
    this.forms = document.querySelectorAll(".form__sheet");
    this.disabledInputs = document.querySelectorAll("input[disabled]");
    this.modifyBtn = document.querySelector("button[name='modifyBtn']");

    this.modifyBtn && this.modifyBtn.addEventListener("click", this.modifyBtn);

    console.log(this.modifyBtn);
  }

  modifyBtn() {
    console.log("clicked !");
    try {
      this.disabledInputs.forEach((input) => input.removeAttribute("disabled"));
    } catch (error) {}
  }
}

export default Base;
