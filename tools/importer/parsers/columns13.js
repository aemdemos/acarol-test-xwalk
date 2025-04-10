/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly matching the example
  const headerRow = ['Columns']; // Matches "Columns block" header

  // Extract logo dynamically
  const logoElement = element.querySelector('.nav-brand picture img');
  let logo = null;
  if (logoElement) {
    const img = document.createElement('img');
    img.src = logoElement.src;
    img.alt = logoElement.alt;
    img.width = logoElement.width;
    img.height = logoElement.height;
    logo = img;
  }

  // Extract navigation links dynamically
  const navLinks = Array.from(element.querySelectorAll('.nav-sections ul li a')).map(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent.trim();
    return a;
  });

  // Extract Donate button dynamically
  const donateButtonElement = element.querySelector('.nav-tools .button-container a');
  let donateButton = null;
  if (donateButtonElement) {
    const button = document.createElement('a');
    button.href = donateButtonElement.href;
    button.textContent = donateButtonElement.textContent.trim();
    button.title = donateButtonElement.title;
    button.className = donateButtonElement.className;
    donateButton = button;
  }

  // Create table cells dynamically based on extracted elements
  const cells = [
    headerRow, // Table header
    [
      logo || document.createTextNode('Logo Missing'),
      navLinks.length ? navLinks : document.createTextNode('Navigation Missing'),
      donateButton || document.createTextNode('Donate Button Missing')
    ]
  ];

  // Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(block);
}