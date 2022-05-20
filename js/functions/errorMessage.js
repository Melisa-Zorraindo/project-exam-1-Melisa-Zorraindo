export function displayErrorMessage(htmlContainer) {
  htmlContainer.innerHTML = `<div class="error-message">
                                  <span>¯\_(ツ)_/¯</span>
                                  <p>Something went wrong</p>
                                  <p>Please, try again later</p>
                               </div>`;
}
