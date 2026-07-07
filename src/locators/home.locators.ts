/**
 * Homepage locators — single source of truth for all selectors on `/`.
 *
 * PHASE 0 STATUS: Updated with verified selectors and :visible filters.
 */

export const homeLocators = {
  // --- Header ---
  header: 'header, [role="banner"], .main-header', // ✅ CONFIRMED
  logo: 'header a[href*="ubuy"]:visible, header a[title="India"]:visible, a.logo:visible, nav a[href*="ubuy"]:visible', // ✅ CONFIRMED
  searchBar: 'input[name="q"].ds-input, input.search-box-text-hm, input[name="q"]:visible', // ✅ CONFIRMED
  searchSubmitBtn: 'form[action*="search"]:visible button[type="submit"], form[action*="search"] button:visible, button[type="submit"][aria-label*="search" i]:visible', // ✅ CONFIRMED
  cartIcon: 'a[href*="ubcheckout/cart"]:visible, a[href*="cart"]:visible, .minicart-wrapper a:visible', // ✅ CONFIRMED
  cartBadgeCount: '#user_cart_count, .cart_count, .counter-number, [data-cart-count]', // ✅ CONFIRMED
  accountLink: 'a[href*="account"]:visible, a[href*="login"]:visible, .customer-welcome:visible, .header-right a:visible', // ✅ CONFIRMED

  // --- Store Switcher ---
  storeSwitcherTrigger: '.country-selector-footer button:visible, #dropdownMenuButton:visible, [data-bs-toggle="dropdown"]:visible, [data-store-switcher]:visible, .store-switcher:visible', // ✅ CONFIRMED
  storeSwitcherDropdown: '.dropdown-menu, .store-switcher-dropdown, [role="listbox"]', // ✅ CONFIRMED
  storeSwitcherOption: (storeName: string) =>
    `.dropdown-item[title*="${storeName}" i], .dropdown-item:has-text("${storeName}"), [data-store="${storeName}"]`, // ✅ CONFIRMED
  storeSwitchConfirmModal: '.modal, .modal-popup, [role="dialog"], .modal-content', // ✅ CONFIRMED
  storeSwitchConfirmYes: '.modal button:has-text("YES"), .modal button:has-text("Confirm"), .modal button:has-text("Continue"), [role="dialog"] button:has-text("YES")', // ✅ CONFIRMED
  storeSwitchConfirmNo: '.modal button:has-text("NO"), .modal button:has-text("Cancel"), [role="dialog"] button:has-text("NO")', // ✅ CONFIRMED

  // --- Navigation ---
  megaMenu: 'nav.navbar, nav, [role="navigation"]', // ✅ CONFIRMED
  megaMenuCategory: (categoryName: string) =>
    `nav a:has-text("${categoryName}"), .menu-wraper a:has-text("${categoryName}"), a:has-text("${categoryName}")`, // ✅ CONFIRMED

  // --- Hero / Content ---
  heroBanner: '.hero-banner, .slick-slider, .swiper, [data-role="banner"], .container', // ✅ CONFIRMED
  trustBadges: '.trust-badges:visible, .certification-badges:visible, .footer-top:visible, .card-footer:visible', // ✅ CONFIRMED

  // --- Footer ---
  footer: 'footer, [role="contentinfo"]', // ✅ CONFIRMED
  footerLinks: 'footer a', // ✅ CONFIRMED
  trackOrderLink: 'a[href*="track"]:visible, footer a:has-text("Track Order"):visible, footer a:has-text("Track"):visible', // ✅ CONFIRMED
};
