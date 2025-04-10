/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract main content
  const contentWrapper = element.querySelector('.default-content-wrapper');
  const heading = contentWrapper.querySelector('h2');
  const paragraphs = Array.from(contentWrapper.querySelectorAll('p'));

  // Create a cell with the heading and paragraphs
  const mainContentCell = [
    heading,
    ...paragraphs,
  ];

  // Extract card data
  const cardsWrapper = element.querySelector('.cards-wrapper');
  const cards = Array.from(cardsWrapper.querySelectorAll('li'));
  const cardCells = cards.map((card) => {
    const image = card.querySelector('.cards-card-image img');
    const link = card.querySelector('.cards-card-body a');

    const cardContent = [];
    if (image) {
      cardContent.push(image);
    }
    if (link) {
      cardContent.push(link);
    }

    return cardContent;
  });

  // Assemble the table rows
  const rows = [
    headerRow,
    [mainContentCell, ...cardCells],
  ];

  // Create and replace element with table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}