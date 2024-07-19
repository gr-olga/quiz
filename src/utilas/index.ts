export const decodeHTMLEntities = (text: string) => {
  const textArea: HTMLTextAreaElement = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};