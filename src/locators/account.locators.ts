/**
 * Account page locators — login, register, and my-account routes.
 *
 * PHASE 0 STATUS: Updated with verified selectors from live site discovery.
 */

export const accountLocators = {
  // --- Login Page (/customer/account/login/) ---
  login: {
    emailInput: '#login_username:visible, input[name="login[username]"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    passwordInput: '#login\\.password:visible, input[name="login[password]"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    submitBtn: '#login-form-btn:visible, button:has-text("Login"):visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    forgotPasswordLink: 'a:has-text("Forgot"):visible, a[href*="forgotpassword"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    createAccountLink:
      '#nav-otp-tab:visible, a:has-text("Create"):visible, a[href*="account/create"]:visible, button:has-text("Sign Up"):visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    socialLoginGoogle: 'button:has-text("Google"):visible, a[href*="google"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    socialLoginFacebook: 'button:has-text("Facebook"):visible, a[href*="facebook"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    socialLoginBtn: 'button:has-text("Login with Social"):visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    errorMessage:
      'div.error.text-danger:visible, .message-error:visible, [data-ui-id="message-error"]:visible, .alert-danger:visible, .field-error:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    validationError: '.mage-error:visible, .field-error:visible, [role="alert"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  },

  // --- Register Page (/customer/account/create or Sign Up tab) ---
  register: {
    signUpTab: '#nav-otp-tab:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    emailInput: '#email:visible, input[name="email"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    passwordInput: '#signup\\.password:visible, input[name="signup[password]"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    confirmPasswordInput:
      '#signup\\.confirm_password:visible, input[name="signup[confirm_password]"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    submitBtn: '#create-form-btn:visible, button:has-text("Register"):visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    successMessage: '.message-success:visible, [class*="success" i]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    errorMessage:
      '.message-error:visible, div.error.text-danger:visible, [class*="error" i]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    firstNameInput: 'input#firstname:visible, input[name="firstname"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    lastNameInput: 'input#lastname:visible, input[name="lastname"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  },

  // --- My Account Dashboard ---
  myAccount: {
    welcomeMessage:
      '.box-information .box-content:visible, .welcome-message:visible, [class*="welcome" i]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    accountNavigation: '.account-nav:visible, .sidebar.sidebar-main:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    navLink: (linkText: string) =>
      `.account-nav a:has-text("${linkText}"):visible, .sidebar a:has-text("${linkText}"):visible`, // 🔶 UNVERIFIED (heuristic fallback selector)
  },

  // --- Order History ---
  orders: {
    orderHistoryTable:
      '.table-order-items:visible, #my-orders-table:visible, [data-role="order-history"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    orderRow: '.order-row:visible, tbody tr:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    orderDetailLink: 'a:has-text("View Order"):visible, a.action.view:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    trackOrderLink: 'a:has-text("Track"):visible, a.action.track:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    claimWarrantyAction:
      'a:has-text("Claim Warranty"):visible, button:has-text("Claim Warranty"):visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  },

  // --- Track Order (standalone) ---
  trackOrder: {
    orderIdInput:
      'input[name="order_id"]:visible, input#order-id:visible, input[placeholder*="order" i]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    trackBtn: 'button:has-text("Track"):visible, button[type="submit"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    trackingResult:
      '.tracking-info:visible, .order-tracking-result:visible, [data-role="tracking-result"]:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
    trackingError: '.message-error:visible, .tracking-error:visible', // 🔶 UNVERIFIED (heuristic fallback selector)
  },
};
