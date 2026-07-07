/**
 * Product Detail Page (PDP) locators.
 *
 * PHASE 0 STATUS: Updated with verified selectors from live site discovery.
 */

export const pdpLocators = {
  // --- Core Product Info ---
  productTitle: 'h1:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  productPrice: '.price-box:visible, [class*="price" i]:has-text("INR"):visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  originalPrice: '.old-price .price:visible, [data-price-type="oldPrice"] .price:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  discountBadge: '.discount-label, .savings-percent', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Gallery ---
  mainImage:
    '.zoom-container img.zoom-image:visible, .zoom-image:visible, .gallery-placeholder img:visible, .fotorama__active img:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  thumbnails: '.fotorama__nav__frame img, .product-thumbs img', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Variants ---
  variantSelector: '.swatch-attribute, [data-role="swatch"], .product-options select', // 🔶 UNVERIFIED (heuristic fallback selector)
  variantOption: (optionLabel: string) =>
    `.swatch-option[aria-label="${optionLabel}"], .product-options option:has-text("${optionLabel}")`, // 🔶 UNVERIFIED (heuristic fallback selector)
  sizeSelector: '.swatch-attribute.size .swatch-option, select[aria-label*="size" i]', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Quantity & Add to Cart ---
  quantityInput: 'input#qty:visible, input[name="qty"]:visible, input[type="number"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  quantityIncrement: 'button[title="Increase"], .qty-increment, button:has-text("+")', // 🔶 UNVERIFIED (heuristic fallback selector)
  quantityDecrement: 'button[title="Decrease"], .qty-decrement, button:has-text("-")', // 🔶 UNVERIFIED (heuristic fallback selector)
  addToCartBtn:
    'button#add-to-cart-btn:visible, button.add-to-cart-btn:visible, button:has-text("Add to cart"):visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  addToCartSuccess:
    '.show-cart-popup:visible, a#add-to-cart-view-cart:visible, .message-success:visible, [data-ui-id="message-success"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Stock ---
  stockBadge:
    '.availability:visible, span.in-stock:visible, [class*="stock" i]:visible, [class*="avail" i]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  outOfStockBadge:
    '.stock.unavailable, .out-of-stock-badge, :text("Out Of Stock"), [class*="out-of-stock" i]', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Delivery Estimate ---
  deliveryEstimate: '.delivery-info, .estimated-delivery, [data-role="delivery-estimate"]', // 🔶 UNVERIFIED (heuristic fallback selector)
  pinCodeInput: 'input[placeholder*="PIN" i], input[placeholder*="postal" i]', // 🔶 UNVERIFIED (heuristic fallback selector)
  checkDeliveryBtn: 'button:has-text("Check"), button:has-text("Deliver")', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Reviews & Q&A ---
  reviewsSection: '#reviews, .product-reviews-summary, [data-role="reviews"]', // 🔶 UNVERIFIED (heuristic fallback selector)
  reviewCount: '.reviews-actions .action, .review-count', // 🔶 UNVERIFIED (heuristic fallback selector)
  starRating: '.rating-result, [itemprop="ratingValue"]', // 🔶 UNVERIFIED (heuristic fallback selector)

  // --- Related Products ---
  relatedProducts: '.related-products, .block.related, [data-role="related-products"]', // 🔶 UNVERIFIED (heuristic fallback selector)
};
