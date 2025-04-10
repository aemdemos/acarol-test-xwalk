/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content dynamically
  const headerText = 'Columns';

  // Extract image dynamically
  const image = element.querySelector('img');
  const imageClone = image ? image.cloneNode(true) : document.createTextNode('');

  // Extract paragraph dynamically
  const paragraph = element.querySelector('p:nth-of-type(2)');
  const paragraphClone = paragraph ? paragraph.cloneNode(true) : document.createTextNode('');

  // Extract links dynamically and handle empty cases
  const links = Array.from(element.querySelectorAll('ul li a')).map(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent;
    return a;
  });

  if (links.length === 0) {
    links.push(document.createTextNode('No links available'));
  }

  // Organize content into a table structure
  const cells = [
    [headerText],
    [
      [paragraphClone, imageClone],
      links
    ]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}