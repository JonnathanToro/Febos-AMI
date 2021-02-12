/*

File for fix vuesax details. ☠️

*/

// set focus to accept button of vs-dialog.
// TODO: find a better option.
document.addEventListener('DOMNodeInserted', (event) => {
  if (
    event.target
    && event.target.classList
    && event.target.classList.contains('con-vs-dialog')
  ) {
    const button = event.target.querySelector('.vs-dialog-accept-button');
    if (button) button.focus();
  }
});
