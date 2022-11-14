class Editor {

    constructor() {
        //Buttons
        this.optionButtons = document.querySelectorAll('.option-button');
        this.advancedOptionButtons = document.querySelectorAll('.adv-option-button');
        this.alignButtons = document.querySelectorAll('.align');
        this.spacingButtons = document.querySelectorAll('.spacing');
        this.formatButtons = document.querySelectorAll('.format');
        this.scriptButtons = document.querySelectorAll('.script');
        this.linkButton = document.querySelector('#createLink');
        this.showCodeButton = document.querySelector('#showCode');

        this.fontName = document.querySelector('#fontName');;
        this.writingArea = document.querySelector('.text__input');
       
        //List fonts
        this.fonts = [ 'Arial', 'Verdana', 'Times New Roman', 'Poppins', 'Georgia', 'Raleway', 'Roboto' ];

        console.log(this.alignButtons);

    }

    initialize() {

        
        try {
            this.highLighter(this.alignButtons, true);
            this.highLighter(this.spacingButtons, true);
            this.highLighter(this.formatButtons, false);
            this.highLighter(this.scriptButtons, true);

            //Create font list options
            this.fonts.forEach(font => {
                let option = document.createElement("option");
                option.value = font;
                option.innerHTML = font;
                //append option
                this.fontName.appendChild(option);
            });

            //Basic operations that don't need value parameter
            this.optionButtons.forEach(optionButton => {
                optionButton.addEventListener("click", () => {
                    console.log('all buttons fx clicked!');
                    document.execCommand(optionButton.id, false, null);
                });
            });

            //Operations that require value parameter
            this.advancedOptionButtons.forEach(advancedOptionButton => {
                advancedOptionButton.addEventListener("change", () => {
                    this.modifyText(advancedOptionButton.id, false, advancedOptionButton.value);
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
    modifyText (command, defaultUI, value) {
        document.execCommand(command, defaultUI, value);
    }

   
    highLighter (buttons, needsRemoval)  {
        buttons.forEach(button => {
            button.addEventListener("click", () => {

                if (needsRemoval === true) {
                    let alreadyActive = false;

                    if (button.classList.contains('active')) { 
                        alreadyActive = true;
                    }

                    //Remove highlight from other buttons
                    this.highLighterRemover(buttons);
                    if (alreadyActive === false) { 
                        button.classList.add('active');  //highlight clicked button
                    }
                }
                
                else {   //if other button can be higlighted
                    button.classList.toggle('active');
                }
            });
        });
    }

    highLighterRemover  (buttons)  {
        buttons.forEach(button => { 
            button.classList.remove('active');
        });
    }
}


