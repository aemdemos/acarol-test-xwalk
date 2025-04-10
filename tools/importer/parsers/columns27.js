/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns'; // Make the header row bold as per example

  // Extract content dynamically
  const navSections = element.querySelector('.nav-sections ul');
  const navLinks = Array.from(navSections.querySelectorAll('li > a')).map((link) => {
    const listItem = document.createElement('li');
    listItem.textContent = link.textContent;
    return listItem;
  });

  const navList = document.createElement('ul');
  navList.append(...navLinks);

  const navTools = element.querySelector('.nav-tools .button-container a');
  const donateButton = document.createElement('a');
  donateButton.href = navTools.href;
  donateButton.textContent = navTools.textContent;

  const brandImage = element.querySelector('.nav-brand img');
  const image = document.createElement('img');
  image.src = brandImage.src;
  image.alt = brandImage.alt || 'Brand logo'; // Fix alt attribute handling

  // Handle edge cases for missing elements
  const navCell = navSections && navList ? navList : document.createTextNode('');
  const toolsCell = navTools && donateButton ? donateButton : document.createTextNode('');
  const imageCell = brandImage && image ? image : document.createTextNode('');

  // Create table cells dynamically
  const cells = [
    headerRow,
    [navCell, toolsCell],
    [imageCell],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}