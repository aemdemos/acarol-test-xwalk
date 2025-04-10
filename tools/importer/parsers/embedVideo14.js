/* global WebImporter */

export default function parse(element, { document }) {
  // Extract the image from the footer
  const imageElement = element.querySelector('img');
  const image = imageElement ? imageElement.cloneNode(true) : null;

  // Extract the social links
  const socialLinks = Array.from(element.querySelectorAll('a')).filter((link) => {
    const href = link.href;
    return (
      href.includes('facebook.com') ||
      href.includes('twitter.com') ||
      href.includes('instagram.com')
    );
  });

  // Create a list of social links
  const socialLinksElements = socialLinks.map((link) => {
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.href;
    return anchor;
  });

  // Build the table structure
  const cells = [
    ['Embed'], // Header row
    [image ? [image, ...socialLinksElements] : socialLinksElements], // Content row
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}