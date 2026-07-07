/**
 * Category page locators.
 * Covers both flat (/category/{slug}-{id}) and nested hierarchy URLs.
 *
 * PHASE 0 STATUS: Updated with verified selectors.
 */

export const categoryLocators = {
  // --- Breadcrumb ---
  breadcrumb:
    '.breadcrumbs:visible, .breadcrumb:visible, [aria-label*="breadcrumb" i]:visible, nav.breadcrumbs:visible, ul[class*="breadcrumb" i]:visible, div[class*="breadcrumb" i]:visible, .path:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  breadcrumbItem:
    '.breadcrumbs li:visible, .breadcrumb li:visible, [aria-label*="breadcrumb" i] li:visible, ul[class*="breadcrumb" i] li:visible, div[class*="breadcrumb" i] a:visible', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Product Grid ---
  productGrid: '.products-grid, .product-list, [data-role="product-grid"], .container', // 🔶 UNVERIFIED (heuristic fallback selector)
  productCard:
    '.product-item:visible, .product-card:visible, [class*="product-card" i]:visible, [class*="product-item" i]:visible, div:has(> a[href*="/product/"]):visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  productCardLink:
    '.product-item-link:visible, .product-card a[href*="/product/"]:visible, a[href*="/product/"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  productCardTitle: '.product-item-name, .product-card-title, h3, [class*="title" i] a', // 🔶 UNVERIFIED (heuristic fallback selector)
  productCardPrice: '.price, .product-price, [class*="price" i]', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Filter Sidebar ---
  filterSidebar:
    '.filter-options, .sidebar-filters, [data-role="category-filters"], [class*="filter" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
  filterGroup: '.filter-options-item, .filter-group', // 🔶 UNVERIFIED (heuristic fallback selector)
  filterGroupTitle: '.filter-options-title', // 🔶 UNVERIFIED (heuristic fallback selector)
  filterCheckbox: '.filter-options-content input[type="checkbox"], input[type="checkbox"]', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Sort ---
  sortDropdown: 'select[data-role="sorter"], .sorter select, select[class*="sort" i]', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Pagination ---
  pagination: '.pages, .pagination, [role="navigation"][aria-label*="pagination" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
  nextPage: '.pages-item-next a, .pagination .next, a[aria-label="Next"]', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Category Header ---
  categoryTitle: 'h1.page-title, .category-title h1, h1', // 🔶 UNVERIFIED (heuristic fallback selector)
  categoryDescription: '.category-description, .category-cms', // 🔶 UNVERIFIED (heuristic fallback selector)
};
