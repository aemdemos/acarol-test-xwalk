/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create a link element
  const createLink = (href, text) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    return link;
  };

  // Extract the logo from nav-brand
  const logoElement = element.querySelector('.nav-brand picture');

  // Extract navigation links
  const navLinks = Array.from(element.querySelectorAll('.nav-sections ul li a')).map((link) => createLink(link.href, link.textContent));

  // Extract the button
  const donateButton = element.querySelector('.nav-tools .button-container a');
  const buttonLink = createLink(donateButton.href, donateButton.textContent);

  // Prepare table rows
  const headerRow = ['Columns'];

  const contentRows = [
    [logoElement], // First column: logo
    ...navLinks.map(link => [link]), // Each link gets its own column
    [buttonLink] // Donate button in its own column
  ];

  // Combine rows into a table
  const table = WebImporter.DOMUtils.createTable([headerRow, ...contentRows], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}