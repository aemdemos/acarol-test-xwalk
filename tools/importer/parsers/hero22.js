/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Hero'];
  cells.push(headerRow);

  // Extracting content from the element
  const contentWrapper = element.querySelector('.default-content-wrapper');

  if (!contentWrapper) {
    console.warn('Content wrapper not found');
    return;
  }

  const title = contentWrapper.querySelector('h2');
  const paragraphs = contentWrapper.querySelectorAll('p');

  if (!title) {
    console.warn('Title not found');
    return;
  }

  const heading = document.createElement('h1');
  heading.textContent = title.textContent;

  // Creating a container for all content in the second row
  const contentContainer = document.createElement('div');
  contentContainer.appendChild(heading);

  paragraphs.forEach((paragraph) => {
    contentContainer.appendChild(paragraph.cloneNode(true));
  });

  const blockContent = [contentContainer]; // Single cell containing all content
  cells.push(blockContent);

  // Create the table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}