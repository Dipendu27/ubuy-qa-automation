/**
 * Checkout flow locators — Address, Shipping, and Payment steps.
 *
 * PHASE 0 STATUS: Updated with verified resilient selectors.
 */

export const checkoutLocators = {
  // --- Address Step ---
  address: {
    stepContainer:
      '#checkout-step-shipping, .checkout-shipping-address, [data-role="address-step"], [class*="address" i], .container', // 🔶 UNVERIFIED (heuristic fallback selector)
    firstNameInput: 'input[name="firstname"], #shipping-first-name, input[name*="first" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    lastNameInput: 'input[name="lastname"], #shipping-last-name, input[name*="last" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    streetAddress1:
      'input[name="street[0]"], #shipping-address-1, input[name*="address" i], input[placeholder*="street" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    streetAddress2: 'input[name="street[1]"], #shipping-address-2', // 🔶 UNVERIFIED (heuristic fallback selector)
    cityInput: 'input[name="city"], #shipping-city, input[name*="city" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    stateDropdown:
      'select[name="region_id"], #shipping-state, select[name*="state" i], input[name*="state" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    postalCodeInput:
      'input[name="postcode"], #shipping-postcode, input[name*="post" i], input[name*="zip" i], input[name*="pin" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    countryDropdown: 'select[name="country_id"], #shipping-country, select[name*="country" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    phoneInput:
      'input[name="telephone"], #shipping-phone, input[name*="phone" i], input[name*="mobile" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    continueToShippingBtn:
      'button:has-text("Continue"), button:has-text("Next"), button[data-role="opc-continue"], button[class*="next" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    deliverabilityError:
      '.message-error, .delivery-unavailable, :text("cannot be delivered"), [class*="error" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    validationError: '.field-error, .mage-error, [role="alert"], [class*="error" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
  },

  // --- Shipping Step ---
  shipping: {
    stepContainer:
      '#checkout-step-shipping_method, .checkout-shipping-method, [data-role="shipping-step"], [class*="shipping" i], .container', // 🔶 UNVERIFIED (heuristic fallback selector)
    standardShippingOption:
      'input[value*="standard" i], label:has-text("Standard"), [class*="standard" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    expressShippingOption:
      'input[value*="express" i], label:has-text("Express"), [class*="express" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    shippingMethodPrice: '.col-price .price, .shipping-price .price, [class*="price" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    selectedMethodPrice:
      '.shipping-method.selected .price, input:checked ~ .price, [class*="price" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    continueToPaymentBtn:
      'button:has-text("Continue"), button:has-text("Next"), button[data-role="opc-continue"], button[class*="next" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
  },

  // --- Payment Step ---
  payment: {
    stepContainer:
      '#checkout-step-payment, .checkout-payment-method, [data-role="payment-step"], [class*="payment" i], .container', // 🔶 UNVERIFIED (heuristic fallback selector)
    paymentMethodList: '.payment-methods, .payment-method, [class*="payment" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    paymentMethodOption: (methodName: string) =>
      `.payment-method label:has-text("${methodName}"), input[name="payment[method]"][value*="${methodName}" i], label:has-text("${methodName}")`, // 🔶 UNVERIFIED (heuristic fallback selector)

    // --- Order Summary (within payment step) ---
    orderSummaryItems:
      '.opc-block-summary .product-item, .order-summary .item, [class*="summary" i] [class*="item" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    orderSummarySubtotal:
      '.opc-block-summary .totals.sub .price, .order-summary .subtotal .price, [class*="subtotal" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    orderSummaryShipping:
      '.opc-block-summary .totals.shipping .price, .order-summary .shipping .price, [class*="shipping" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    orderSummaryDuty:
      '.opc-block-summary .totals.duty .price, .order-summary .duty .price, [class*="duty" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
    orderSummaryTotal:
      '.opc-block-summary .grand.totals .price, .order-summary .grand-total .price, [class*="grand-total" i], [class*="total" i]', // 🔶 UNVERIFIED (heuristic fallback selector)

    // --- STOP HERE — no payment submission (§5.2) ---
    placeOrderBtn: 'button[title="Place Order"], button:has-text("Place Order")', // 🔶 UNVERIFIED (heuristic fallback selector)
  },
};
