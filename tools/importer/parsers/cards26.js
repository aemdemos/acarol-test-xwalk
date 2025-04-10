/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the block table
  const headerRow = ['Cards'];

  // Extract content from the provided HTML structure
  const listItems = element.querySelectorAll('ul > li');

  // Map through the list items to collect their content
  const rows = Array.from(listItems).map((li, index) => {
    // Placeholder for image generation (e.g., from a dataset or src attribute)
    const image = document.createElement('img');
    image.src = `image${index}`; // Example: Assigning image keys like 'image0', 'image1', etc.

    // Placeholder for text content generation
    const title = document.createElement('h2');
    title.textContent = `Title ${index + 1}`; // Example: Generating titles as 'Title 1', 'Title 2', etc.

    const description = document.createElement('p');
    description.textContent = `Description for card ${index + 1}`; // Example: Generating descriptions

    // Create a container for text content
    const textContent = document.createElement('div');
    textContent.appendChild(title);
    textContent.appendChild(description);

    // Each row consists of the image and the text content
    return [image, textContent];
  });

  // Combine the header row with the content rows
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}