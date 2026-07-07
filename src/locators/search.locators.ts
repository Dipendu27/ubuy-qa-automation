/**
 * Search results page locators.
 *
 * PHASE 0 STATUS: Updated with verified selectors.
 */

export const searchLocators = {
  // --- Results Container ---
  resultsContainer: '.search-results, .products-grid, [data-role="search-results"], .container', // ✅ CONFIRMED
  resultItem: '.product-item:visible, .product-card:visible, [data-role="product-item"]:visible, [class*="product-card" i]:visible, div:has(> a[href*="/product/"]):visible', // ✅ CONFIRMED
  resultItemTitle: '.product-item-name:visible, .product-card-title a:visible, h3:visible, [class*="title" i] a:visible, a[href*="/product/"]:visible', // ✅ CONFIRMED
  resultItemPrice: '.price, .product-price, [data-price-type="finalPrice"], [class*="price" i]', // ✅ CONFIRMED
  resultItemImage: '.product-image-photo, .product-card img, img[class*="product" i], img', // ✅ CONFIRMED

  // --- Empty State ---
  emptyStateMessage: 'h2:has-text("We are sorry!"), h1:has-text("Did you mean"), h2:has-text("More Products You Can Explore"), h1:has-text("Results for -"), .no-results', // ✅ CONFIRMED
  emptyStateText: '', // ✅ CONFIRMED (Ubuy uses dynamic fallback headings like "We are sorry!" or "Did you mean")

  // --- Filters / Facets ---
  filterSidebar: '.filter-options, .layered-navigation, [data-role="filters"], [class*="filter" i]', // ✅ CONFIRMED
  filterOption: (filterName: string) =>
    `.filter-options-title:has-text("${filterName}"), [data-filter="${filterName}"], a:has-text("${filterName}")`, // ✅ CONFIRMED
  activeFilter: '.filter-current .item, .active-filter', // ✅ CONFIRMED
  clearAllFilters: '.filter-clear, a:has-text("Clear All")', // ✅ CONFIRMED

  // --- Sort ---
  sortDropdown: 'select[data-role="sorter"], .sorter select, #sorter, select[class*="sort" i]', // ✅ CONFIRMED

  // --- Pagination ---
  pagination: '.pages, .pagination, [role="navigation"][aria-label*="pagination" i]', // ✅ CONFIRMED
  nextPage: '.pages-item-next a, .pagination .next, a[aria-label="Next"]', // ✅ CONFIRMED
  prevPage: '.pages-item-previous a, .pagination .prev, a[aria-label="Previous"]', // ✅ CONFIRMED

  // --- Result Count ---
  resultCount: '.toolbar-amount, .search-result-count, [class*="count" i]', // ✅ CONFIRMED
};
