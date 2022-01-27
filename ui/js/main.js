// Object with two functions inside

const FieldService = {
    getField: function (id) {
        return {
            "label": "Sales region",
            "required": false,
            "choices": [
                "Asia",
                "Australia",
                "Western Europe",
                "North America",
                "Eastern Europe",
                "Latin America",
                "Middle East and Africa"
            ],
            "displayAlpha": true,
            "default": "North America"
        }
    },

    saveField: function (fieldJson) {
        fetch("http://www.mocky.io/v2/566061f21200008e3aabd919", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                label: fieldJson.label,
                required: fieldJson.required,
                choices: fieldJson.choices,
                displayAlpha: fieldJson.displayAlpha,
                defaultValue: fieldJson.defaultValue,
            }),
        })
            .then((response) => {
                if (response.ok) return response.json();
            })
            .then((data) => {
                console.log(data);
            });
    }
}

// Targeting the submit buttom to trigger postToApi function
document.getElementById('submitForm').addEventListener('click', postToApi)

function postToApi() {

    //Taking the value of the label input and putting it into a variable 
    const label = document.getElementById('label').value

    //Checking to see if there is a value in the label input field, if not alert user and stop function
    if (!label) {
        alert('label is required')
        return
    }

    let textareaInput = document.getElementById('choices').value;

    // Taking the textarea input value and transforming it into an array by using spilt method and trim to remove whitespace
    let arrayOfChoices = textareaInput.trim().split(/\r?\n/)

    //Keeping count of how many choices the user enters
    let choiceCount = arrayOfChoices.length

    let removeChoiceCount = choiceCount - 50

    //Limiting the number of choices the user can input
    if (arrayOfChoices.length > 50) {
        alert(`Choices cannot exceed 50. You have entered ${choiceCount} choices. Please remove ${removeChoiceCount} choices.`)
        return
    }

    //grabbing the user's default value input 
    let defaultValue = document.getElementById('defaultValue').value

    //Checking to see if the default value input is apart of the array of choices, if not adding it to the array of choices
    if (defaultValue && !arrayOfChoices.includes(defaultValue)) {
        arrayOfChoices.push(defaultValue)
    }

    //removing duplicates in the array of choices 
    arrayOfChoices = [... new Set(arrayOfChoices)]

    //transforming the array back into a string
    textareaInput = arrayOfChoices.join('\n')

    //setting the value in the DOM to the value of textareaInput variable
    document.getElementById('choices').value = textareaInput

    //Grabbing the order select from DOM and declaring a variable
    const select = document.getElementById('order')

    //Grabbing the value of each select option
    const displayAlpha = select.options[select.selectedIndex].value;

    const fields = {
        label: label,
        required: document.getElementById('required').checked,
        choices: textareaInput,
        displayAlpha: displayAlpha,
        defaultValue: defaultValue
    }
    console.log(fields)
    //Calling saveField function to post data 
    FieldService.saveField(fields)
}

//Clear form function triggered by clear button
document.getElementById('clearForm').addEventListener('click', clearForm)

function clearForm() {
    let allInputs = document.querySelectorAll('.clearInput').innerText

    allInputs.innerText = ''
}