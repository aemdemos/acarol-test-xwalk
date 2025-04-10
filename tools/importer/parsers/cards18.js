/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards'];
    const rows = [];

    // Extracting all cards
    const cardItems = element.querySelectorAll('li');

    cardItems.forEach((card) => {
        const imageContainer = card.querySelector('.cards-card-image picture img');
        const bodyContainer = card.querySelector('.cards-card-body');

        // Extract image
        const image = document.createElement('img');
        image.src = imageContainer ? imageContainer.src : '';
        image.alt = imageContainer ? imageContainer.alt : '';

        // Extract title
        const titleElement = bodyContainer ? bodyContainer.querySelector('h3 a') : null;
        const title = titleElement ? document.createElement('strong') : null;
        if (title) {
            title.textContent = titleElement.textContent;
        }

        // Extract description
        const description = bodyContainer ? bodyContainer.querySelector('p') : null;
        const descriptionText = description ? document.createTextNode(description.textContent) : null;

        // Combine title and description into the same cell
        const cellContent = [];
        if (title) cellContent.push(title);
        if (descriptionText) cellContent.push(document.createElement('br'), descriptionText);

        rows.push([
            image,
            cellContent
        ]);
    });

    const table = WebImporter.DOMUtils.createTable([
        headerRow,
        ...rows
    ], document);

    element.replaceWith(table);
}