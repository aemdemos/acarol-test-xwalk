/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns'];

  // Extract the logo image
  const logoLink = element.querySelector('.nav-brand a');
  const logoImage = logoLink ? logoLink.querySelector('img') : null;
  let logo = null;
  if (logoLink) {
    logo = document.createElement('div');
    logo.appendChild(logoLink);
  }

  // Extract navigation links
  const navLinksContainer = element.querySelector('.nav-sections ul');
  let navLinks = null;
  if (navLinksContainer) {
    const navLinksList = document.createElement('ul');
    [...navLinksContainer.querySelectorAll('li a')].forEach(link => {
      const listItem = document.createElement('li');
      listItem.appendChild(link);
      navLinksList.appendChild(listItem);
    });
    navLinks = navLinksList;
  }

  // Extract the donate button
  const donateButton = element.querySelector('.nav-tools .button-container a');
  let donate = null;
  if (donateButton) {
    donate = document.createElement('div');
    donate.appendChild(donateButton);
  }

  // Build content sections and include <hr> between sections
  const cells = [
    headerRow, // Header row
    [logo], // First section (logo)
    [document.createElement('hr')], // Divider
    [navLinks], // Second section (navigation links)
    [document.createElement('hr')], // Divider
    [donate] // Third section (donate button)
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}