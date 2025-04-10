/* global WebImporter */
export default function parse(element, { document }) {
  // Safeguard for empty or missing elements
  if (!element) return;

  // Extract the image
  const image = element.querySelector('picture img');
  const imgElement = document.createElement('img');
  if (image) {
    imgElement.src = image.src || '';
    imgElement.alt = image.alt || '';
  }

  // Extract main links in the footer
  const links = element.querySelectorAll('ul:first-of-type a');
  const linksArray = Array.from(links).map(link => {
    const linkElement = document.createElement('a');
    linkElement.href = link.href || '';
    linkElement.textContent = link.textContent || '';
    return linkElement;
  });

  // Extract email link
  const email = element.querySelector('a[href^="mailto:"]');
  let emailElement = null;
  if (email) {
    emailElement = document.createElement('a');
    emailElement.href = email.href || '';
    emailElement.textContent = email.textContent || '';
  }

  // Extract social links
  const socialLinks = element.querySelectorAll('ul:nth-of-type(2) a');
  const socialLinksArray = Array.from(socialLinks).map(socialLink => {
    const socialLinkElement = document.createElement('a');
    socialLinkElement.href = socialLink.href || '';
    socialLinkElement.textContent = socialLink.textContent || '';
    return socialLinkElement;
  });

  // Define the table header row EXACTLY as in the example
  const headerRow = ['Embed'];

  // Define the table structure
  const cells = [
    headerRow,
    [[imgElement, ...linksArray, emailElement, ...socialLinksArray].filter(Boolean)] // Filter out any null or undefined elements
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}