# Test Traceability Matrix

This document maps user journeys, business requirements, and functional specifications to automated test specs across P0 (Critical Path), P1 (Business Rules), and P2 (Content & SEO).

---

## P0 — Critical Path (Revenue & Core User Journeys)

| Requirement / User Story | Test File | Test Case Name | Priority | Automation Status |
| :--- | :--- | :--- | :--- | :--- |
| Homepage core rendering & branding | `tests/p0-critical-path/homepage.spec.ts` | `homepage loads and shows core header elements` | P0 | Automated & Verified |
| Search bar validation | `tests/p0-critical-path/homepage.spec.ts` | `search bar rejects empty/whitespace submissions` | P0 | Automated & Verified |
| Promotional hero banners interactive | `tests/p0-critical-path/homepage.spec.ts` | `promotional banner or slider is present and interactive` | P0 | Automated & Verified |
| Product keyword search | `tests/p0-critical-path/search.spec.ts` | `valid keyword returns results grid with product cards` | P0 | Automated & Verified |
| Zero-result search graceful handling | `tests/p0-critical-path/search.spec.ts` | `invalid keyword displays empty state message` | P0 | Automated & Verified |
| Main navigation menu to category | `tests/p0-critical-path/navigation.spec.ts` | `category navigation via desktop menu opens correct category page` | P0 | Automated & Verified |
| Breadcrumb hierarchy traversal | `tests/p0-critical-path/navigation.spec.ts` | `breadcrumb navigation allows returning to home/parent` | P0 | Automated & Verified |
| Product detail page (PDP) rendering | `tests/p0-critical-path/pdp-add-to-cart.spec.ts` | `PDP displays core product details (title, price, stock, images)` | P0 | Automated & Verified |
| Add to cart action & badge update | `tests/p0-critical-path/pdp-add-to-cart.spec.ts` | `add product to cart and verify cart badge updates` | P0 | Automated & Verified |
| Cart quantity modification & math | `tests/p0-critical-path/cart.spec.ts` | `update item quantity recalculates line total and subtotal` | P0 | Automated & Verified |
| Cart item deletion via modal | `tests/p0-critical-path/cart.spec.ts` | `remove item from cart updates list and subtotal` | P0 | Automated & Verified |
| Checkout authentication gating | `tests/p0-critical-path/cart.spec.ts` | `proceed to checkout requires authentication` | P0 | Automated & Verified |
| Registered user login flow | `tests/p0-critical-path/auth.spec.ts` | `login with valid credentials redirects to account/home` | P0 | Automated & Verified |
| Invalid authentication handling | `tests/p0-critical-path/auth.spec.ts` | `login with invalid credentials displays inline error` | P0 | Automated & Verified |
| Session termination / logout | `tests/p0-critical-path/auth.spec.ts` | `logout from account clears session` | P0 | Automated & Verified |
| New customer OTP registration | `tests/p0-critical-path/auth.spec.ts` | `register new user with OTP verification` | P0 | Automated & Verified |
| Checkout address entry & validation | `tests/p0-critical-path/checkout.spec.ts` | `enter shipping address and verify shipping methods load` | P0 | Automated & Verified |
| Shipping carrier method pricing | `tests/p0-critical-path/checkout.spec.ts` | `Standard vs Express shipping shows different prices` | P0 | Automated & Verified |
| **Payment review & STOP before pay** | `tests/p0-critical-path/checkout.spec.ts` | `reach payment step and verify order summary — STOP before submission` | P0 | **Enforced — No Payment** |

---

## P1 — Business Rules & Localization

| Requirement / User Story | Test File | Test Case Name | Priority | Automation Status |
| :--- | :--- | :--- | :--- | :--- |
| Out of stock UI badging | `tests/p1-business-rules/out-of-stock.spec.ts` | `out-of-stock product shows OOS badge` | P1 | Automated & Verified |
| OOS add-to-cart prevention | `tests/p1-business-rules/out-of-stock.spec.ts` | `attempting to add OOS product to cart does not succeed` | P1 | Automated & Verified |
| Serviceable PIN code delivery | `tests/p1-business-rules/shipping-calculation.spec.ts` | `serviceable PIN code calculates shipping charges` | P1 | Automated & Verified |
| Non-serviceable PIN code handling | `tests/p1-business-rules/shipping-calculation.spec.ts` | `non-serviceable PIN code displays delivery error` | P1 | Automated & Verified |
| International store switcher modal | `tests/p1-business-rules/store-switcher.spec.ts` | `store switcher modal appears when changing country/currency` | P1 | Automated & Verified |
| Country / Currency switching | `tests/p1-business-rules/store-switcher.spec.ts` | `switching store updates URL or currency display` | P1 | Automated & Verified |
| Store switch cancellation | `tests/p1-business-rules/store-switcher.spec.ts` | `cancelling store switcher preserves current store` | P1 | Automated & Verified |
| Customer order history list | `tests/p1-business-rules/order-history.spec.ts` | `navigate to order history shows past orders list` | P1 | Automated & Verified |
| Order status tracking link | `tests/p1-business-rules/order-history.spec.ts` | `track order link navigates to tracking details` | P1 | Automated & Verified |

---

## P2 — Content, SEO & Responsive Design

| Requirement / User Story | Test File | Test Case Name | Priority | Automation Status |
| :--- | :--- | :--- | :--- | :--- |
| Mobile header & search adaptability | `tests/p2-content-seo/responsive.spec.ts` | `homepage header and search adapt to mobile viewport` | P2 | Automated & Verified |
| Mobile PDP rendering & checkout | `tests/p2-content-seo/responsive.spec.ts` | `PDP renders correctly and allows add-to-cart on mobile viewport` | P2 | Automated & Verified |
| Footer links & legal copyright | `tests/p2-content-seo/footer-links.spec.ts` | `footer renders all expected link columns and copyright` | P2 | Automated & Verified |
| Social media external routing | `tests/p2-content-seo/footer-links.spec.ts` | `social media links open valid external URLs` | P2 | Automated & Verified |
| Payment carrier trust badges | `tests/p2-content-seo/footer-links.spec.ts` | `payment method icons are rendered in footer` | P2 | Automated & Verified |
| About Us content verification | `tests/p2-content-seo/static-pages.spec.ts` | `About Us page loads with valid content and title` | P2 | Automated & Verified |
| Contact Us form rendering | `tests/p2-content-seo/static-pages.spec.ts` | `Contact Us page displays contact form or information` | P2 | Automated & Verified |
| Privacy Policy & Terms accessibility| `tests/p2-content-seo/static-pages.spec.ts` | `Privacy Policy and Terms pages load without error` | P2 | Automated & Verified |
