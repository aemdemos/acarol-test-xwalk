/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import embedVideo1Parser from './parsers/embedVideo1.js';
import hero2Parser from './parsers/hero2.js';
import columns3Parser from './parsers/columns3.js';
import embedVideo5Parser from './parsers/embedVideo5.js';
import columns6Parser from './parsers/columns6.js';
import columns8Parser from './parsers/columns8.js';
import columns10Parser from './parsers/columns10.js';
import carousel11Parser from './parsers/carousel11.js';
import embedVideo12Parser from './parsers/embedVideo12.js';
import columns13Parser from './parsers/columns13.js';
import embedVideo14Parser from './parsers/embedVideo14.js';
import columns15Parser from './parsers/columns15.js';
import hero17Parser from './parsers/hero17.js';
import cards18Parser from './parsers/cards18.js';
import cards19Parser from './parsers/cards19.js';
import columns20Parser from './parsers/columns20.js';
import cards21Parser from './parsers/cards21.js';
import hero22Parser from './parsers/hero22.js';
import embedVideo23Parser from './parsers/embedVideo23.js';
import hero25Parser from './parsers/hero25.js';
import cards26Parser from './parsers/cards26.js';
import columns27Parser from './parsers/columns27.js';
import columns29Parser from './parsers/columns29.js';
import carousel30Parser from './parsers/carousel30.js';
import embedVideo31Parser from './parsers/embedVideo31.js';
import columns32Parser from './parsers/columns32.js';
import carousel33Parser from './parsers/carousel33.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  embedVideo1: embedVideo1Parser,
  hero2: hero2Parser,
  columns3: columns3Parser,
  embedVideo5: embedVideo5Parser,
  columns6: columns6Parser,
  columns8: columns8Parser,
  columns10: columns10Parser,
  carousel11: carousel11Parser,
  embedVideo12: embedVideo12Parser,
  columns13: columns13Parser,
  embedVideo14: embedVideo14Parser,
  columns15: columns15Parser,
  hero17: hero17Parser,
  cards18: cards18Parser,
  cards19: cards19Parser,
  columns20: columns20Parser,
  cards21: cards21Parser,
  hero22: hero22Parser,
  embedVideo23: embedVideo23Parser,
  hero25: hero25Parser,
  cards26: cards26Parser,
  columns27: columns27Parser,
  columns29: columns29Parser,
  carousel30: carousel30Parser,
  embedVideo31: embedVideo31Parser,
  columns32: columns32Parser,
  carousel33: carousel33Parser,
};

WebImporter.Import = {
  getParserName: ({ name, cluster }) => {
    // Remove invalid filename characters
    let sanitizedString = name.replace(/[^a-zA-Z0-9-_\s]/g, ' ').trim();
    // Remove all numbers at the beginning of the string
    sanitizedString = sanitizedString.replace(/^\d+/, '');
    // Convert to camel case
    sanitizedString = sanitizedString
      .replace(/[\s-_]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''))
      .replace(/^\w/, (c) => c.toLowerCase());
    return cluster ? `${sanitizedString}${cluster}` : sanitizedString;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (fragments = [], url = '') => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath)),
};

const pageElements = [
  {
    name: 'metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { fragments = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(fragments, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .map((block) => {
      const foundInstance = block.instances.find((instance) => instance.url === originalURL);
      if (foundInstance) {
        block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
      }
      return block;
    })
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = WebImporter.Import.getParserName({ name, cluster });
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    // parse the element
    try {
      parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}#${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}#${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserFn = parsers[`${name} ${cluster}`];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // pre-transform rules
    preTransformRules({
      root: main,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
