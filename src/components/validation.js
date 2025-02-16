const showInputError = (input, settings) => {
  const errorElem = document.querySelector(`.${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  errorElem.textContent = input.validationMessage;
  errorElem.classList.add(settings.errorClass);
};

const hideInputError = (input, settings) => {
  const errorItem = document.querySelector(`.${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  errorItem.textContent = "";
  errorItem.classList.remove(settings.errorClass);
};

export const enableValidation = (settings) => {
  const formList = Array.from(
    document.querySelectorAll(settings.formSelector)
  );

  formList.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    const submitButton = form.querySelector(settings.submitButtonSelector);
  
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        input.validity.patternMismatch
          ? input.setCustomValidity(input.dataset.errorMessage)
          : input.setCustomValidity('');
        input.validity.valid
          ? hideInputError(input, settings)
          : showInputError(input, settings);
        toggleButtonState(form, submitButton, settings);
      });
    });
  });
};

const toggleButtonState = (form, submitButton, settings) => {
  form.checkValidity()
    ? submitButton.removeAttribute('disabled')
    : submitButton.setAttribute('disabled', '');
  
};

export const clearValidation = (form, submitButton, settings) => {
  const inputs = form.querySelectorAll(settings.inputSelector);

  inputs.forEach((input) => {
    hideInputError(input, settings);
    input.setCustomValidity('');
  });

  toggleButtonState(form, submitButton, settings);
};
