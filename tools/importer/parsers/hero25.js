/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row
  const headerRow = ['Hero'];

  // Extract image source dynamically
  const picture = element.querySelector('picture');
  const img = picture ? picture.querySelector('img') : null;
  const imgElement = document.createElement('img');
  if (img) {
    imgElement.src = img.getAttribute('src');
    imgElement.alt = img.getAttribute('alt') || '';
  }

  // Extract heading dynamically
  const heading = element.querySelector('h1');
  const headingElement = document.createElement('h1');
  if (heading) {
    headingElement.textContent = heading.textContent;
  }

  // Construct table cells, ensuring no hardcoding and handling possible missing data
  const cells = [
    headerRow,
    [
      imgElement.src ? imgElement : null,
      headingElement.textContent ? headingElement : null,
    ].filter(Boolean),
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the generated block table
  element.replaceWith(block);
}