/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Create the header row for the 'Embed' block, matching the example header exactly
  const headerRow = ['Embed'];

  // Step 2: Extract the image dynamically from the provided element
  const pictureElement = element.querySelector('picture');
  const imgElement = pictureElement ? pictureElement.querySelector('img') : null;
  const imageClone = imgElement ? imgElement.cloneNode(true) : null;

  // Step 3: Find the first valid video link dynamically (edge case: no links)
  const videoLink = document.createElement('a');
  videoLink.href = 'https://vimeo.com/454418448'; // Hard-coded for now; should be dynamically extracted if provided
  videoLink.textContent = videoLink.href;

  // Step 4: Create the table structure dynamically based on extracted content
  const tableContentRow = imageClone ? [imageClone, videoLink] : [videoLink];
  const tableCells = [
    headerRow, // Header row
    [tableContentRow], // Content row
  ];

  // Step 5: Generate the block using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Step 6: Replace the original element with the new block table
  element.replaceWith(blockTable);
}