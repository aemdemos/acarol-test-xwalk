/* global WebImporter */
export default function parse(element, { document }) {
  // Define the correct header row
  const headerRow = ['Columns'];

  // Extract the title
  const title = element.querySelector('.default-content-wrapper h2')?.textContent.trim() || '';

  // Extract the image
  const imageElement = element.querySelector('.default-content-wrapper picture img');
  const image = imageElement ? imageElement.cloneNode(true) : null;

  // Extract paragraphs
  const paragraphs = Array.from(element.querySelectorAll('.default-content-wrapper p'))
    .filter(p => !p.querySelector('picture'))
    .map(p => p.cloneNode(true));

  // Extract tournament details
  const tournaments = Array.from(element.querySelectorAll('.tournament-wrapper .tournament > div')).map(tournament => {
    const details = Array.from(tournament.children).map(detail => detail.cloneNode(true));
    return details;
  });

  // Create the block table
  const cells = [
    headerRow, // Correct header row
    [
      [title, image, ...paragraphs],
      tournaments.map(tournament => {
        const container = document.createElement('div');
        container.append(...tournament);
        return container;
      })
    ]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}