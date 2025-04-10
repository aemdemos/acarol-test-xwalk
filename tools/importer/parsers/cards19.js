/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the block header dynamically
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';

  // Extract cards content from the input element
  const rows = [...element.querySelectorAll('.columns-wrapper > .columns > div')].map((card) => {
    const image = card.querySelector('picture img');
    const titleElement = card.querySelector('strong');
    const descriptionElements = card.querySelectorAll('p, strong + *');

    // Ensure image exists
    if (!image) {
      throw new Error("Missing image in card.");
    }

    // Create image element dynamically
    const imageElement = document.createElement('img');
    imageElement.src = image.getAttribute('src');
    imageElement.alt = image.getAttribute('alt') || 'Organization Name Logo';

    // Prepare text content dynamically
    const textContent = [];
    if (titleElement) {
      const title = document.createElement('h3');
      title.textContent = titleElement.textContent;
      textContent.push(title);
    }
    descriptionElements.forEach((desc) => {
      const clonedDesc = desc.cloneNode(true); // Clone to preserve content
      textContent.push(clonedDesc);
    });

    return [imageElement, textContent];
  });

  // Combine header and rows into table structure
  const cells = [headerRow, ...rows];

  // Create table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}