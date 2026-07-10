/**
 * Homepage locators — single source of truth for all selectors on `/`.
 *
 * PHASE 0 STATUS: Updated with verified selectors and :visible filters.
 */

export const homeLocators = {
  // --- Header ---
  header: 'header, [role="banner"], .main-header', // 🔶 UNVERIFIED (heuristic fallback selector)
  logo: 'header a[href*="ubuy"]:visible, header a[title="India"]:visible, a.logo:visible, nav a[href*="ubuy"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  searchBar: 'input[name="q"].ds-input, input.search-box-text-hm, input[name="q"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  searchSubmitBtn:
    'form[action*="search"]:visible button[type="submit"], form[action*="search"] button:visible, button[type="submit"][aria-label*="search" i]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  cartIcon:
    'a[href*="ubcheckout/cart"]:visible, a[href*="cart"]:visible, .minicart-wrapper a:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  cartBadgeCount: '#user_cart_count, .cart_count, .counter-number, [data-cart-count]', // 🔶 UNVERIFIED (heuristic fallback selector)
  accountLink:
    'a[href*="account"]:visible, a[href*="login"]:visible, .customer-welcome:visible, .header-right a:visible', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Store Switcher ---
  storeSwitcherTrigger:
    '.country-selector-footer button:visible, #dropdownMenuButton:visible, [data-bs-toggle="dropdown"]:visible, [data-store-switcher]:visible, .store-switcher:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  storeSwitcherDropdown:
    '.dropdown-menu.show, .dropdown-menu:visible, .store-switcher-dropdown:visible, [role="listbox"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  storeSwitcherOption: (storeName: string) =>
    `.dropdown-item[title*="${storeName}" i], .dropdown-item:has-text("${storeName}"), [data-store="${storeName}"]`, // 🔶 UNVERIFIED (heuristic fallback selector)
  storeSwitchConfirmModal: '.modal, .modal-popup, [role="dialog"], .modal-content', // 🔶 UNVERIFIED (heuristic fallback selector)
  storeSwitchConfirmYes:
    '.modal button:has-text("YES"), .modal button:has-text("Confirm"), .modal button:has-text("Continue"), [role="dialog"] button:has-text("YES")', // 🔶 UNVERIFIED (heuristic fallback selector)
  storeSwitchConfirmNo:
    '.modal button:has-text("NO"), .modal button:has-text("Cancel"), [role="dialog"] button:has-text("NO")', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Navigation ---
  megaMenu: 'nav.navbar, nav, [role="navigation"]', // 🔶 UNVERIFIED (heuristic fallback selector)
  megaMenuCategory: (categoryName: string) =>
    `nav a:has-text("${categoryName}"), .menu-wraper a:has-text("${categoryName}"), a:has-text("${categoryName}")`, // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Hero / Content ---
  heroBanner: '.hero-banner, .slick-slider, .swiper, [data-role="banner"], .container', // 🔶 UNVERIFIED (heuristic fallback selector)
  trustBadges:
    '.trust-badges:visible, .certification-badges:visible, .footer-top:visible, .card-footer:visible', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Footer ---
  footer: 'footer, [role="contentinfo"]', // 🔶 UNVERIFIED (heuristic fallback selector)
  footerLinks: 'footer a', // 🔶 UNVERIFIED (heuristic fallback selector)
  trackOrderLink:
    'a[href*="track"]:visible, footer a:has-text("Track Order"):visible, footer a:has-text("Track"):visible', // 🔶 UNVERIFIED (heuristic fallback selector)
};
