/**
 * Cart page locators — /ubcheckout/cart (custom Ubuy checkout module).
 *
 * PHASE 0 STATUS: Updated with verified selectors from live site discovery.
 * Note: Ubuy uses a custom `ubcheckout` module, NOT stock Magento `/checkout/cart`.
 */

export const cartLocators = {
  // --- Cart Container ---
  cartContainer:
    '.cart-container:visible, .shopping-cart:visible, main:visible, .container:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  emptyCartMessage:
    '.cart-empty:visible, .empty-cart:visible, :text("Your cart is empty"):visible, :text("Your shopping cart is empty"):visible, [class*="empty-cart" i]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Line Items ---
  lineItem: 'input[name^="cart"][type="number"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  lineItemName: 'a[href*="/product/"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  lineItemPrice: '.price-value:visible, .price.fw-bold:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  lineItemQuantity:
    'input[name^="cart"][type="number"]:visible, input.cart-product-quantity:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  lineItemSubtotal: '.price-value:visible, .price.fw-bold:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  lineItemRemove:
    'a:has(img[alt="delete"]):visible, a:has-text("Remove"):visible, a[title="Remove from Basket"]:visible, [class*="remove" i]:visible, [class*="delete" i]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  updateCartBtn: 'button:has-text("Update"):visible, button[class*="update" i]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Totals ---
  subtotalAmount:
    '.price.fw-bold:visible, .price-value:visible, [class*="subtotal" i] .price:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  shippingAmount: '[class*="shipping" i] .price:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  orderTotal:
    '.grand.totals .price:visible, .order-total .price:visible, [class*="grand-total" i]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Coupon / Promo ---
  couponInput:
    '#coupon_code:visible, input[name="coupon_code"]:visible, input[placeholder*="coupon" i]:visible, input[placeholder*="promo" i]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  applyCouponBtn: 'button[value="Apply Discount"]:visible, button:has-text("Apply"):visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  couponSuccessMessage: '.message-success:visible, [class*="success" i]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  couponErrorMessage: '.message-error:visible, [class*="error" i]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Checkout CTA ---
  proceedToCheckoutBtn:
    'button.overview-btn:has-text("Proceed to Checkout"):visible, button:has-text("Proceed to Checkout"):visible, a:has-text("Proceed to Checkout"):visible', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Cart Count (header) ---
  cartCountBadge:
    '.show-cart-popup:visible, #user_cart_count:visible, .cart_count:visible, .counter-number:visible, [data-cart-count]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
};
