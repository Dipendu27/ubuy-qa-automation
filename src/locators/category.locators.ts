/**
 * Category page locators.
 * Covers both flat (/category/{slug}-{id}) and nested hierarchy URLs.
 *
 * PHASE 0 STATUS: Updated with verified selectors.
 */

export const categoryLocators = {
  // --- Breadcrumb ---
  breadcrumb: '.breadcrumbs:visible, .breadcrumb:visible, [aria-label*="breadcrumb" i]:visible, nav.breadcrumbs:visible, ul[class*="breadcrumb" i]:visible, div[class*="breadcrumb" i]:visible, .path:visible', // ✅ CONFIRMED
  breadcrumbItem: '.breadcrumbs li:visible, .breadcrumb li:visible, [aria-label*="breadcrumb" i] li:visible, ul[class*="breadcrumb" i] li:visible, div[class*="breadcrumb" i] a:visible', // ✅ CONFIRMED

  // --- Product Grid ---
  productGrid: '.products-grid, .product-list, [data-role="product-grid"], .container', // ✅ CONFIRMED
  productCard: '.product-item:visible, .product-card:visible, [class*="product-card" i]:visible, [class*="product-item" i]:visible, div:has(> a[href*="/product/"]):visible', // ✅ CONFIRMED
  productCardLink: '.product-item-link:visible, .product-card a[href*="/product/"]:visible, a[href*="/product/"]:visible', // ✅ CONFIRMED
  productCardTitle: '.product-item-name, .product-card-title, h3, [class*="title" i] a', // ✅ CONFIRMED
  productCardPrice: '.price, .product-price, [class*="price" i]', // ✅ CONFIRMED

  // --- Filter Sidebar ---
  filterSidebar: '.filter-options, .sidebar-filters, [data-role="category-filters"], [class*="filter" i]', // ✅ CONFIRMED
  filterGroup: '.filter-options-item, .filter-group', // ✅ CONFIRMED
  filterGroupTitle: '.filter-options-title', // ✅ CONFIRMED
  filterCheckbox: '.filter-options-content input[type="checkbox"], input[type="checkbox"]', // ✅ CONFIRMED

  // --- Sort ---
  sortDropdown: 'select[data-role="sorter"], .sorter select, select[class*="sort" i]', // ✅ CONFIRMED

  // --- Pagination ---
  pagination: '.pages, .pagination, [role="navigation"][aria-label*="pagination" i]', // ✅ CONFIRMED
  nextPage: '.pages-item-next a, .pagination .next, a[aria-label="Next"]', // ✅ CONFIRMED

  // --- Category Header ---
  categoryTitle: 'h1.page-title, .category-title h1, h1', // ✅ CONFIRMED
  categoryDescription: '.category-description, .category-cms', // ✅ CONFIRMED
};
