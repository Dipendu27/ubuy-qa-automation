/**
 * Search results page locators.
 *
 * PHASE 0 STATUS: Updated with verified selectors.
 */

export const searchLocators = {
  // --- Results Container ---
  resultsContainer: '.search-results, .products-grid, [data-role="search-results"], .container', // 🔶 UNVERIFIED (heuristic fallback selector)
  resultItem:
    '.product-item:visible, .product-card:visible, [data-role="product-item"]:visible, [class*="product-card" i]:visible, div:has(> a[href*="/product/"]):visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  resultItemTitle:
    '.product-item-name:visible, .product-card-title a:visible, h3:visible, [class*="title" i] a:visible, a[href*="/product/"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  resultItemPrice: '.price, .product-price, [data-price-type="finalPrice"], [class*="price" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
  resultItemImage: '.product-image-photo, .product-card img, img[class*="product" i], img', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Empty State ---
  emptyStateMessage:
    'h2:has-text("We are sorry!"), h1:has-text("Did you mean"), h2:has-text("More Products You Can Explore"), h1:has-text("Results for -"), .no-results', // 🔶 UNVERIFIED (heuristic fallback selector)
  emptyStateText: '', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Filters / Facets ---
  filterSidebar: '.filter-options, .layered-navigation, [data-role="filters"], [class*="filter" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
  filterOption: (filterName: string) =>
    `.filter-options-title:has-text("${filterName}"), [data-filter="${filterName}"], a:has-text("${filterName}")`, // 🔶 UNVERIFIED (heuristic fallback selector)
  activeFilter: '.filter-current .item, .active-filter', // 🔶 UNVERIFIED (heuristic fallback selector)
  clearAllFilters: '.filter-clear, a:has-text("Clear All")', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Sort ---
  sortDropdown: 'select[data-role="sorter"], .sorter select, #sorter, select[class*="sort" i]', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Pagination ---
  pagination: '.pages, .pagination, [role="navigation"][aria-label*="pagination" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
  nextPage: '.pages-item-next a, .pagination .next, a[aria-label="Next"]', // 🔶 UNVERIFIED (heuristic fallback selector)
  prevPage: '.pages-item-previous a, .pagination .prev, a[aria-label="Previous"]', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Result Count ---
  resultCount: '.toolbar-amount, .search-result-count, [class*="count" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
};
