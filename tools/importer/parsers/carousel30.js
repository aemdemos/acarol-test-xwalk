/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Carousel'];
  cells.push(headerRow);

  // Query for all slides within the carousel
  const slides = element.querySelectorAll('.carousel > div');

  slides.forEach((slide) => {
    // Extract image
    const image = slide.querySelector('picture img');
    let imageElement = null;
    if (image) {
      imageElement = document.createElement('img');
      imageElement.src = image.src;
      imageElement.alt = image.alt || '';
    }

    // Extract text content
    const textContainer = slide.querySelector('.carousel-text');
    const content = [];

    if (textContainer) {
      // Extract title
      const title = textContainer.querySelector('h1, h2, h3, h4, h5, h6');
      if (title) {
        const titleElement = document.createElement('h2');
        titleElement.textContent = title.textContent;
        content.push(titleElement);
      }

      // Extract paragraphs
      const paragraphs = textContainer.querySelectorAll('p:not(.button-container)');
      paragraphs.forEach((paragraph) => {
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = paragraph.textContent;
        content.push(paragraphElement);
      });

      // Extract CTA
      const cta = textContainer.querySelector('p.button-container a');
      if (cta) {
        const ctaElement = document.createElement('a');
        ctaElement.href = cta.href;
        ctaElement.textContent = cta.textContent;
        content.push(ctaElement);
      }
    }

    // Add the row for this slide
    cells.push([imageElement, content]);
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}