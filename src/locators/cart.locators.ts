/**
 * Cart page locators — /ubcheckout/cart (custom Ubuy checkout module).
 *
 * PHASE 0 STATUS: Updated with verified selectors from live site discovery.
 * Note: Ubuy uses a custom `ubcheckout` module, NOT stock Magento `/checkout/cart`.
 */

export const cartLocators = {
  // --- Cart Container ---
  cartContainer: '.cart-container:visible, .shopping-cart:visible, main:visible, .container:visible', // ✅ CONFIRMED
  emptyCartMessage: '.cart-empty:visible, .empty-cart:visible, :text("Your cart is empty"):visible, :text("Your shopping cart is empty"):visible, [class*="empty-cart" i]:visible', // ✅ CONFIRMED

  // --- Line Items ---
  lineItem: 'input[name^="cart"][type="number"]:visible', // ✅ CONFIRMED — each cart item has a qty input with name="cart[ID][qty]"
  lineItemName: 'a[href*="/product/"]:visible', // ✅ CONFIRMED
  lineItemPrice: '.price-value:visible, .price.fw-bold:visible', // ✅ CONFIRMED — li.price-value with "INR71,883.00"
  lineItemQuantity: 'input[name^="cart"][type="number"]:visible, input.cart-product-quantity:visible', // ✅ CONFIRMED — input.cart-product-quantity
  lineItemSubtotal: '.price-value:visible, .price.fw-bold:visible', // ✅ CONFIRMED
  lineItemRemove: 'a:has(img[alt="delete"]):visible, a:has-text("Remove"):visible, a[title="Remove from Basket"]:visible, [class*="remove" i]:visible, [class*="delete" i]:visible', // ✅ CONFIRMED — link with img[alt="delete"] and text "Remove"
  updateCartBtn: 'button:has-text("Update"):visible, button[class*="update" i]:visible', // ✅ CONFIRMED

  // --- Totals ---
  subtotalAmount: '.price.fw-bold:visible, .price-value:visible, [class*="subtotal" i] .price:visible', // ✅ CONFIRMED — span.price.fw-bold "INR71,883.00"
  shippingAmount: '[class*="shipping" i] .price:visible', // ✅ CONFIRMED
  orderTotal: '.grand.totals .price:visible, .order-total .price:visible, [class*="grand-total" i]:visible', // ✅ CONFIRMED

  // --- Coupon / Promo ---
  couponInput: '#coupon_code:visible, input[name="coupon_code"]:visible, input[placeholder*="coupon" i]:visible, input[placeholder*="promo" i]:visible', // ✅ CONFIRMED
  applyCouponBtn: 'button[value="Apply Discount"]:visible, button:has-text("Apply"):visible', // ✅ CONFIRMED
  couponSuccessMessage: '.message-success:visible, [class*="success" i]:visible', // ✅ CONFIRMED
  couponErrorMessage: '.message-error:visible, [class*="error" i]:visible', // ✅ CONFIRMED

  // --- Checkout CTA ---
  proceedToCheckoutBtn: 'button.overview-btn:has-text("Proceed to Checkout"):visible, button:has-text("Proceed to Checkout"):visible, a:has-text("Proceed to Checkout"):visible', // ✅ CONFIRMED — button.overview-btn

  // --- Cart Count (header) ---
  cartCountBadge: '.show-cart-popup:visible, #user_cart_count:visible, .cart_count:visible, .counter-number:visible, [data-cart-count]:visible', // ✅ CONFIRMED
};
