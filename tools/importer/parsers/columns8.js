/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row with exact match to the example
  const headerRow = ['Columns'];

  // Initialize an array to collect content rows
  const contentRows = [];

  // Extract content blocks from the provided HTML
  const sections = element.querySelectorAll('h2, h3, p, ul, picture');
  sections.forEach((section) => {
    const contentRow = []; // Each row represents a table cell

    if (section.tagName === 'H2' || section.tagName === 'H3') {
      // Add the heading text content as a text node
      contentRow.push(document.createTextNode(section.textContent.trim()));
    } else if (section.tagName === 'P') {
      // Add paragraph content as plain text, removing unnecessary wrappers
      const paragraphContent = section.textContent.trim();
      if (paragraphContent) {
        contentRow.push(document.createTextNode(paragraphContent));
      }
    } else if (section.tagName === 'UL') {
      // Create a cleaned list element for unordered lists
      const ulElement = document.createElement('ul');
      section.querySelectorAll('li').forEach((li) => {
        if (li.textContent.trim()) { // Only include non-empty list items
          const liElement = document.createElement('li');
          liElement.textContent = li.textContent.trim();
          ulElement.appendChild(liElement);
        }
      });
      if (ulElement.children.length > 0) {
        contentRow.push(ulElement);
      }
    } else if (section.tagName === 'PICTURE') {
      // Add only the image from the picture element, avoiding redundancy
      const img = section.querySelector('img');
      if (img) {
        const imageElement = document.createElement('img');
        imageElement.src = img.src;
        imageElement.alt = img.alt;
        imageElement.width = img.width;
        imageElement.height = img.height;
        contentRow.push(imageElement);
      }
    }

    // Only add the row if it contains valid content
    if (contentRow.length > 0) {
      contentRows.push(contentRow);
    }
  });

  // Combine the header and content rows into a table structure
  const tableData = [headerRow, ...contentRows];

  // Create the table using the WebImporter helper function
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the newly created block table
  element.replaceWith(blockTable);
}