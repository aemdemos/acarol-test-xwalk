/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the block type
  const headerRow = ['Columns'];

  // Extract the brand logo from the navigation brand section
  const navBrand = element.querySelector('.nav-brand img');
  const brandImage = navBrand ? document.createElement('img') : null;
  if (brandImage) {
    brandImage.src = navBrand.src;
    brandImage.alt = navBrand.alt || '';
  }

  // Extract the navigation links
  const navLinks = Array.from(element.querySelectorAll('.nav-sections a')).map((link) => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent.trim();
    return a;
  });

  // Extract the donate button
  const donateButton = element.querySelector('.nav-tools a.button');
  const donateElement = donateButton ? document.createElement('a') : null;
  if (donateElement) {
    donateElement.href = donateButton.href;
    donateElement.textContent = donateButton.textContent.trim();
  }

  // Create the table data
  const cells = [
    headerRow, // Block type header row
    [brandImage], // Brand logo row
    [navLinks], // Navigation links row
    [donateElement], // Donate button row
  ];

  // Ensure all rows are valid and contain the expected content
  const validCells = cells.filter(row => row.every(cell => cell !== null && cell !== undefined));

  // Create the table using the WebImporter helper
  const blockTable = WebImporter.DOMUtils.createTable(validCells, document);

  // Replace the original element with the newly created block table
  element.replaceWith(blockTable);
}