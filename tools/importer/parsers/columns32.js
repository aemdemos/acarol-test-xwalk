/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract the content from the first column
  const firstColumnContent = [];

  const heading = element.querySelector('h2');
  if (heading) {
    firstColumnContent.push(heading);
  }

  const paragraph = element.querySelector('p');
  if (paragraph) {
    firstColumnContent.push(paragraph);
  }

  // Extract the image from the second column
  const secondColumnContent = [];
  const image = element.querySelector('picture img');
  if (image) {
    secondColumnContent.push(image);
  }

  const cells = [
    headerRow,
    [firstColumnContent, secondColumnContent],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}