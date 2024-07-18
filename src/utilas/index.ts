export const decodeHTMLEntities = (text) => {
    let textArea: HTMLTextAreaElement = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}