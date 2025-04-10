/* global WebImporter */
export default function parse(element, { document }) {
  // Corrected header row to match the example
  const headerRow = ['Embed'];

  // Extract the image element
  const image = element.querySelector('img');
  const imageElement = image ? image.cloneNode(true) : null;

  // Extract the links and handle empty content
  const links = Array.from(element.querySelectorAll('a')).map(link => {
    if (link.textContent.trim() === '') {
      return link.cloneNode(true); // Preserve the element structure for empty links
    }
    return link.cloneNode(true);
  });

  // Create the table
  const cells = [
    headerRow, // Header row
  ];

  if (imageElement) {
    cells.push([imageElement]);
  }

  links.forEach(link => {
    cells.push([link]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}