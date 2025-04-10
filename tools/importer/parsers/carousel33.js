/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create a table for the carousel block
  const createCarouselBlock = (imageElement) => {
    const headerRow = ['Carousel']; // Header row as per requirements

    // Validate and clone the image element
    let imageCell;
    if (imageElement && imageElement.tagName === 'IMG') {
      imageCell = imageElement.cloneNode(true); // Clone the image element
    } else {
      console.error('Provided element is not a valid image.');
      return null;
    }

    // Content row — no additional text provided in the example HTML
    const contentRow = [imageCell];

    // Combine header and content rows into a table
    return WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  };

  // Create the new block
  const carouselBlock = createCarouselBlock(element);

  if (carouselBlock) {
    // Replace the existing element with the new block
    element.replaceWith(carouselBlock);
  } else {
    console.error('Failed to create carousel block. Element was not replaced.');
  }
}