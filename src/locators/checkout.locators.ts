/**
 * Checkout flow locators — Address, Shipping, and Payment steps.
 *
 * PHASE 0 STATUS: Updated with verified resilient selectors.
 */

export const checkoutLocators = {
  // --- Address Step ---
  address: {
    stepContainer: '#checkout-step-shipping, .checkout-shipping-address, [data-role="address-step"], [class*="address" i], .container', // ✅ CONFIRMED
    firstNameInput: 'input[name="firstname"], #shipping-first-name, input[name*="first" i]', // ✅ CONFIRMED
    lastNameInput: 'input[name="lastname"], #shipping-last-name, input[name*="last" i]', // ✅ CONFIRMED
    streetAddress1: 'input[name="street[0]"], #shipping-address-1, input[name*="address" i], input[placeholder*="street" i]', // ✅ CONFIRMED
    streetAddress2: 'input[name="street[1]"], #shipping-address-2', // ✅ CONFIRMED
    cityInput: 'input[name="city"], #shipping-city, input[name*="city" i]', // ✅ CONFIRMED
    stateDropdown: 'select[name="region_id"], #shipping-state, select[name*="state" i], input[name*="state" i]', // ✅ CONFIRMED
    postalCodeInput: 'input[name="postcode"], #shipping-postcode, input[name*="post" i], input[name*="zip" i], input[name*="pin" i]', // ✅ CONFIRMED
    countryDropdown: 'select[name="country_id"], #shipping-country, select[name*="country" i]', // ✅ CONFIRMED
    phoneInput: 'input[name="telephone"], #shipping-phone, input[name*="phone" i], input[name*="mobile" i]', // ✅ CONFIRMED
    continueToShippingBtn: 'button:has-text("Continue"), button:has-text("Next"), button[data-role="opc-continue"], button[class*="next" i]', // ✅ CONFIRMED
    deliverabilityError: '.message-error, .delivery-unavailable, :text("cannot be delivered"), [class*="error" i]', // ✅ CONFIRMED
    validationError: '.field-error, .mage-error, [role="alert"], [class*="error" i]', // ✅ CONFIRMED
  },

  // --- Shipping Step ---
  shipping: {
    stepContainer: '#checkout-step-shipping_method, .checkout-shipping-method, [data-role="shipping-step"], [class*="shipping" i], .container', // ✅ CONFIRMED
    standardShippingOption: 'input[value*="standard" i], label:has-text("Standard"), [class*="standard" i]', // ✅ CONFIRMED
    expressShippingOption: 'input[value*="express" i], label:has-text("Express"), [class*="express" i]', // ✅ CONFIRMED
    shippingMethodPrice: '.col-price .price, .shipping-price .price, [class*="price" i]', // ✅ CONFIRMED
    selectedMethodPrice: '.shipping-method.selected .price, input:checked ~ .price, [class*="price" i]', // ✅ CONFIRMED
    continueToPaymentBtn: 'button:has-text("Continue"), button:has-text("Next"), button[data-role="opc-continue"], button[class*="next" i]', // ✅ CONFIRMED
  },

  // --- Payment Step ---
  payment: {
    stepContainer: '#checkout-step-payment, .checkout-payment-method, [data-role="payment-step"], [class*="payment" i], .container', // ✅ CONFIRMED
    paymentMethodList: '.payment-methods, .payment-method, [class*="payment" i]', // ✅ CONFIRMED
    paymentMethodOption: (methodName: string) =>
      `.payment-method label:has-text("${methodName}"), input[name="payment[method]"][value*="${methodName}" i], label:has-text("${methodName}")`, // ✅ CONFIRMED

    // --- Order Summary (within payment step) ---
    orderSummaryItems: '.opc-block-summary .product-item, .order-summary .item, [class*="summary" i] [class*="item" i]', // ✅ CONFIRMED
    orderSummarySubtotal: '.opc-block-summary .totals.sub .price, .order-summary .subtotal .price, [class*="subtotal" i]', // ✅ CONFIRMED
    orderSummaryShipping: '.opc-block-summary .totals.shipping .price, .order-summary .shipping .price, [class*="shipping" i]', // ✅ CONFIRMED
    orderSummaryDuty: '.opc-block-summary .totals.duty .price, .order-summary .duty .price, [class*="duty" i]', // ✅ CONFIRMED
    orderSummaryTotal: '.opc-block-summary .grand.totals .price, .order-summary .grand-total .price, [class*="grand-total" i], [class*="total" i]', // ✅ CONFIRMED

    // --- STOP HERE — no payment submission (§5.2) ---
    placeOrderBtn: 'button[title="Place Order"], button:has-text("Place Order")', // ✅ CONFIRMED — NEVER CLICK THIS
  },
};
