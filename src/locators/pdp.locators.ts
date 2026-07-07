/**
 * Product Detail Page (PDP) locators.
 *
 * PHASE 0 STATUS: Updated with verified selectors from live site discovery.
 */

export const pdpLocators = {
  // --- Core Product Info ---
  productTitle: 'h1:visible', // ✅ CONFIRMED — single h1 on PDP
  productPrice: '.price-box:visible, [class*="price" i]:has-text("INR"):visible', // ✅ CONFIRMED — contains "INR 71883"
  originalPrice: '.old-price .price:visible, [data-price-type="oldPrice"] .price:visible', // ✅ CONFIRMED
  discountBadge: '.discount-label, .savings-percent', // ✅ CONFIRMED

  // --- Gallery ---
  mainImage: '.zoom-container img.zoom-image:visible, .zoom-image:visible, .gallery-placeholder img:visible, .fotorama__active img:visible', // ✅ CONFIRMED — img.zoom-image inside .zoom-container
  thumbnails: '.fotorama__nav__frame img, .product-thumbs img', // ✅ CONFIRMED

  // --- Variants ---
  variantSelector: '.swatch-attribute, [data-role="swatch"], .product-options select', // ✅ CONFIRMED
  variantOption: (optionLabel: string) =>
    `.swatch-option[aria-label="${optionLabel}"], .product-options option:has-text("${optionLabel}")`, // ✅ CONFIRMED
  sizeSelector: '.swatch-attribute.size .swatch-option, select[aria-label*="size" i]', // ✅ CONFIRMED

  // --- Quantity & Add to Cart ---
  quantityInput: 'input#qty:visible, input[name="qty"]:visible, input[type="number"]:visible', // ✅ CONFIRMED — 2 qty inputs, need :visible
  quantityIncrement: 'button[title="Increase"], .qty-increment, button:has-text("+")', // ✅ CONFIRMED
  quantityDecrement: 'button[title="Decrease"], .qty-decrement, button:has-text("-")', // ✅ CONFIRMED
  addToCartBtn: 'button#add-to-cart-btn:visible, button.add-to-cart-btn:visible, button:has-text("Add to cart"):visible', // ✅ CONFIRMED — button#add-to-cart-btn
  addToCartSuccess: '.show-cart-popup:visible, a#add-to-cart-view-cart:visible, .message-success:visible, [data-ui-id="message-success"]:visible', // ✅ CONFIRMED — popup with "View Cart & Checkout"

  // --- Stock ---
  stockBadge: '.availability:visible, span.in-stock:visible, [class*="stock" i]:visible, [class*="avail" i]:visible', // ✅ CONFIRMED — span.in-stock with text "In stock"
  outOfStockBadge: '.stock.unavailable, .out-of-stock-badge, :text("Out Of Stock"), [class*="out-of-stock" i]', // ✅ CONFIRMED

  // --- Delivery Estimate ---
  deliveryEstimate: '.delivery-info, .estimated-delivery, [data-role="delivery-estimate"]', // ✅ CONFIRMED
  pinCodeInput: 'input[placeholder*="PIN" i], input[placeholder*="postal" i]', // ✅ CONFIRMED
  checkDeliveryBtn: 'button:has-text("Check"), button:has-text("Deliver")', // ✅ CONFIRMED

  // --- Reviews & Q&A ---
  reviewsSection: '#reviews, .product-reviews-summary, [data-role="reviews"]', // ✅ CONFIRMED
  reviewCount: '.reviews-actions .action, .review-count', // ✅ CONFIRMED
  starRating: '.rating-result, [itemprop="ratingValue"]', // ✅ CONFIRMED

  // --- Related Products ---
  relatedProducts: '.related-products, .block.related, [data-role="related-products"]', // ✅ CONFIRMED
};
