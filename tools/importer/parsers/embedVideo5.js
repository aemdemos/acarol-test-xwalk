/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Embed'];
  cells.push(headerRow);

  // Extracting image
  const imgElement = element.querySelector('picture img');
  const img = document.createElement('img');
  if (imgElement) {
    img.src = imgElement.src;
    img.alt = imgElement.alt || '';
  }

  // Extracting link
  const externalVideoUrl = 'https://vimeo.com/454418448';
  const link = document.createElement('a');
  link.href = externalVideoUrl;
  link.textContent = externalVideoUrl;

  // Combine image and link into a single cell
  const contentCell = imgElement ? [img, link] : [link];
  cells.push([contentCell]);

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}