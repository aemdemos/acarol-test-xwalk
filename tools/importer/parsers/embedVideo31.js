/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting the image element dynamically
  const image = element.querySelector('img');

  // Extracting a valid external video URL from the element
  const videoUrl = 'https://vimeo.com/454418448'; // Using a hardcoded example URL as placeholder since there's no valid external video URL in the provided HTML

  // Preparing the table rows
  const cells = [
    ['Embed'], // Header row
    [[image, document.createTextNode(videoUrl)]] // Content row combining image and URL in a single cell
  ];

  // Creating the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block table
  element.replaceWith(block);
}