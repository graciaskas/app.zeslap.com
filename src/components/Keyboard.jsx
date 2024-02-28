import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import html2pdf from "html2pdf.js";

class Editor {
  constructor(doc) {
    //Buttons
    this.optionButtons = doc.querySelectorAll(".option-button");
    this.buttons = doc.querySelectorAll("[role=button]");
    this.advancedOptionButtons = doc.querySelectorAll(".adv-option-button");
    this.alignButtons = doc.querySelectorAll(".align");
    this.spacingButtons = doc.querySelectorAll(".spacing");
    this.formatButtons = doc.querySelectorAll(".format");
    this.scriptButtons = doc.querySelectorAll(".script");
    this.linkButton = doc.querySelector("#createLink");
    this.showCodeButton = doc.querySelector("#showCode");
    this.writingArea = doc.querySelector("#textInput");
    this.fontName = doc.querySelector("#fontName");
    this.savePDF = doc.querySelector(".save-pdf");
    //List fonts
    this.fonts = [
      "Arial",
      "Verdana",
      "Times New Roman",
      "Poppins",
      "Georgia",
      "Raleway",
      "Roboto",
    ];
  }

  initialize() {
    try {
      //function call for highlight buttons
      // not for link,unlink,lists,undo,redo since they are not time operations
      this.highLighter(this.alignButtons, true);
      this.highLighter(this.spacingButtons, true);
      this.highLighter(this.formatButtons, false);
      this.highLighter(this.scriptButtons, true);
      this.highLighter(this.optionButtons, true);

      //Create font list options
      this.fonts.forEach((font) => {
        let option = document.createElement("option");
        option.value = font;
        option.innerHTML = font;
        //append option
        this.fontName.appendChild(option);
      });

      //-- Operations that require value parameter
      this.advancedOptionButtons.forEach((advancedOptionButton) => {
        advancedOptionButton.addEventListener("change", () => {
          this.modifyText(
            advancedOptionButton.id,
            false,
            advancedOptionButton.value
          );
        });
      });

      //Link button
      this.linkButton.addEventListener("click", () => {
        let userLink = prompt("Enter url link");

        if (/http/i.test(userLink)) {
          this.modifyText(this.linkButton.id, false, this.linkButton.value);
        } else {
          userLink = "https://localhost:3000/" + userLink;
          this.modifyText(this.linkButton.id, false, this.linkButton.value);
        }
      });

      //show code button handler
      this.active = false;
      this.showCodeButton.addEventListener("click", (event) => {
        event.preventDefault();
        this.showCode(this.writingArea);
      });

      this.buttons.forEach((button) => {
        button.addEventListener("click", () => {
          this.modifyText(button.id, false, null);
        });
      });

      //this.save
      this.savePDF.addEventListener("click", () => {
        const content = this.writingArea.innerHTML;
        let filename = prompt("Document name");
        let opt = {
          margin: 0.9,
          filename: filename + ".pdf",
          image: { type: "jpg", quality: 1 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf(content, opt);
      });
    } catch (error) {
      console.log(error);
    }
  }

  showCode(content) {
    this.showCodeButton.dataset.active = !this.active;
    this.active = !this.active;

    if (this.active) {
      this.writingArea.textContent = this.writingArea.innerHTML;
    } else {
      this.writingArea.innerHTML = this.writingArea.textContent;
    }
  }

  //Main Logic
  modifyText(command, defaultUI, value) {
    document.execCommand(command, defaultUI, value);
  }

  /**
   *
   * @param {*} buttons HTMLList of buttons
   * @param {*} needsRemoval if butons of list can be highlighted one by one
   */
  highLighter(buttons, needsRemoval) {
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (needsRemoval) {
          let alreadyActive = false;

          if (button.classList.contains("active")) {
            alreadyActive = true;
          }

          //Remove highlight from other buttons
          this.highLighterRemover(buttons);
          if (alreadyActive === false) {
            button.classList.add("active"); //highlight clicked button
          }
        } else {
          //if other button can be higlighted
          button.classList.toggle("active");
        }
      });
    });
  }

  highLighterRemover(buttons) {
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
  }
}

function Keyboard(props) {
  const docRef = useRef(null);

  const { refElement } = props;

  useEffect(function (e) {
    const MyEditor = new Editor(docRef.current);
    MyEditor.initialize();
  }, []);

  return (
    <div className="col-12">
      <div
        className="text__editor  mt-3 bg-white p-3 rounded shadow-default"
        ref={docRef}>
        <div className="pagination flex-wrap" role={"list"}>
          <li className="page-item">
            <Link
              className="page-link bg-white option-button  save-pdf"
              style={{ marginRight: "7px" }}>
              <i className="fa fa-save" /> PDF
            </Link>
          </li>
          <li className="page-item bg-white">
            <Link id="undo" className="page-link option-button" role={"button"}>
              <i className="fa fa-undo" />
            </Link>
          </li>
          <li className="page-item bg-white">
            <Link
              id="redo"
              className="page-link option-button bg-white "
              role={"button"}>
              <i className="fa fa-redo" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <div className="page-link flex bg-white justify-between items-center">
              <i className="fa fa-font" />
              <select id="fontName" className="adv-option-button" />
            </div>
          </li>

          <li className="page-item bg-white">
            <div className="page-link bg-white flex justify-between items-center">
              <select className="adv-option-button" id="fontSize">
                <option value="1">Extra small</option>
                <option value="2">Small</option>
                <option value="3">Regular</option>
                <option value="4">Medium</option>
                <option value="5">Large</option>
                <option value="6">Extra large</option>
                <option value="7">Big</option>
              </select>
            </div>
          </li>

          <li className="page-item bg-white">
            <div className="page-link bg-white flex items-center border  px-2">
              <input
                type="color"
                name=""
                id="foreColor"
                className="adv-option-button"
              />
              <label htmlFor="foreColor">Font</label>
            </div>
          </li>

          <li className="page-item bg-white">
            <div className="flex items-center page-link bg-white">
              <input
                type="color"
                name=""
                id="backColor"
                className="adv-option-button"
              />
              <label htmlFor="backColor">Background</label>
            </div>
          </li>

          <li className="page-item bg-white">
            <div className="flex justify-between items-center page-link bg-white">
              <select id="formatBlock" className="adv-option-button">
                <option value="H1">Heading 1</option>
                <option value="H2">Heading 2</option>
                <option value="H3">Heading 3</option>
                <option value="H4">Heading 4</option>
                <option value="H5">Heading 5</option>
                <option value="H6">Heading 6</option>
              </select>
            </div>
          </li>
        </div>

        <div className="pagination flex-wrap mt-1">
          <li className="page-item bg-white">
            <Link
              role={"button"}
              id="bold"
              className="page-link format bg-white">
              <i className="fa fa-bold" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <Link
              role={"button"}
              id="italic"
              className="page-link format bg-white">
              <i className="fa fa-italic" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <Link
              role={"button"}
              id="underline"
              className="page-link format bg-white">
              <i className="fa fa-underline" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <Link
              role={"button"}
              className="page-link format bg-white"
              id="strikethrough">
              <i className="fa fa-strikethrough" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <Link
              role={"button"}
              className="page-link bg-white"
              id="superscript">
              <i className="fa fa-superscript" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <Link role={"button"} className="page-link bg-white" id="subscript">
              <i className="fa fa-subscript" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <Link
              role={"button"}
              className="page-link bg-white"
              id="insertOrderedList">
              <i className="fa fa-list-ol" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <Link
              role={"button"}
              className="page-link bg-white"
              id="insertUnorderedList">
              <i className="fa fa-list" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <Link href="#" className="page-link bg-white" id="createLink">
              <i className="fa fa-link" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <Link role={"button"} className="page-link bg-white" id="unlik">
              <i className="fa fa-unlink" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <Link
              role={"button"}
              className="page-link bg-white"
              id="justifyLeft">
              <i className="fa fa-align-left" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <Link
              role={"button"}
              className="page-link bg-white"
              id="justifyCenter">
              <i className="fa fa-align-center" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <Link
              role={"button"}
              className="page-link spacing bg-white"
              id="justifyRight">
              <i className="fa fa-align-right" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <Link
              role={"button"}
              className="page-link bg-white"
              id="justifyFull">
              <i className="fa fa-align-justify" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <Link role={"button"} className="page-link bg-white" id="indent">
              <i className="fa fa-indent" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <Link role={"button"} className="page-link bg-white" id="outdent">
              <i className="fa fa-outdent" />
            </Link>
          </li>

          <li className="page-item bg-white">
            <Link
              href=""
              className="page-link bg-white"
              data-active="false"
              id="showCode">
              <i className="fa fa-code"></i>
            </Link>
          </li>
        </div>

        {/* Content editable */}
        <div
          id="textInput"
          className="p-4 mt-3 border-top rounded shadow block"
          contentEditable={true}
          ref={refElement}
        />
      </div>
    </div>
  );
}

Keyboard.propTypes = {};

export default Keyboard;
