/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract content from the element
  const heading = element.querySelector('h2');
  const paragraphs = Array.from(element.querySelectorAll('p')).map(p => p.cloneNode(true));
  const image = element.querySelector('picture img');

  // Create structured content for the table
  const contentRow = [
    [
      image ? image.cloneNode(true) : '',
      heading ? heading.cloneNode(true) : '',
      ...paragraphs
    ]
  ];

  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}