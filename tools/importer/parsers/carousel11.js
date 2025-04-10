/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting content dynamically
  const headerRow = ['Carousel'];

  // Extracting image
  const pictureElement = element.querySelector('picture');
  const imageElement = pictureElement ? pictureElement.querySelector('img') : null;
  const imageSrc = imageElement ? imageElement.src : '';
  const imageTag = document.createElement('img');
  if (imageSrc) {
    imageTag.setAttribute('src', imageSrc);
  }

  // Extracting title
  const titleElement = element.querySelector('h1');
  const title = titleElement ? titleElement.textContent.trim() : '';
  const titleTag = document.createElement('h1');
  if (title) {
    titleTag.textContent = title;
  }

  // Creating the content rows dynamically
  const contentRow = [imageTag, titleTag];

  const cells = [
    headerRow,
    contentRow,
  ];

  // Creating the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element
  element.replaceWith(block);
}