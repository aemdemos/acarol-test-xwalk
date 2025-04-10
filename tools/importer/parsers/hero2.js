/* global WebImporter */
export default function parse(element, { document }) {
    // Header row for the block
    const headerRow = ['Hero'];

    // Extracting the image
    const picture = element.querySelector('picture');
    let image;
    if (picture) {
        image = picture.cloneNode(true);
    }

    // Extracting the title
    const titleElement = element.querySelector('h1');
    let title;
    if (titleElement) {
        title = document.createElement('h1');
        title.innerHTML = titleElement.innerHTML;
    }

    // Combining extracted elements into a single cell for the second row
    const contentCell = document.createElement('div');
    if (image) {
        contentCell.appendChild(image);
    }
    if (title) {
        contentCell.appendChild(title);
    }

    // Creating the rows for the table
    const cells = [
        headerRow,
        [contentCell], // Single cell containing combined content
    ];

    // Creating the block table using WebImporter.DOMUtils.createTable
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replacing the original element with the block table
    element.replaceWith(blockTable);
}