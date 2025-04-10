/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];
  const rows = [headerRow];

  const columns = element.querySelectorAll('.columns > div');

  columns.forEach((column) => {
    const imageWrapper = column.querySelector('picture');
    const image = imageWrapper ? imageWrapper.querySelector('img') : null;

    const textWrapper = column.querySelector('div:last-child');
    const title = textWrapper.querySelector('strong');
    const textContent = document.createElement('div');

    const descriptionStartIndex = textWrapper.innerHTML.indexOf(title.outerHTML) + title.outerHTML.length;
    const description = textWrapper.innerHTML.substring(descriptionStartIndex).trim();

    textContent.innerHTML = description; // Ensures proper HTML rendering

    const row = [
      image,
      [title, document.createElement('br'), textContent]
    ];

    rows.push(row);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}