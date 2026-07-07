/**
 * Account page locators — login, register, and my-account routes.
 *
 * PHASE 0 STATUS: Updated with verified selectors from live site discovery.
 */

export const accountLocators = {
  // --- Login Page (/customer/account/login/) ---
  login: {
    emailInput: '#login_username:visible, input[name="login[username]"]:visible', // ✅ CONFIRMED — type="text" not "email"
    passwordInput: '#login\\.password:visible, input[name="login[password]"]:visible', // ✅ CONFIRMED — note escaped dot in CSS id
    submitBtn: '#login-form-btn:visible, button:has-text("Login"):visible', // ✅ CONFIRMED — button#login-form-btn type="submit"
    forgotPasswordLink: 'a:has-text("Forgot"):visible, a[href*="forgotpassword"]:visible', // ✅ CONFIRMED
    createAccountLink: '#nav-otp-tab:visible, a:has-text("Create"):visible, a[href*="account/create"]:visible, button:has-text("Sign Up"):visible', // ✅ CONFIRMED — tab button #nav-otp-tab
    socialLoginGoogle: 'button:has-text("Google"):visible, a[href*="google"]:visible', // ✅ CONFIRMED
    socialLoginFacebook: 'button:has-text("Facebook"):visible, a[href*="facebook"]:visible', // ✅ CONFIRMED
    socialLoginBtn: 'button:has-text("Login with Social"):visible', // ✅ CONFIRMED — button.social
    errorMessage: 'div.error.text-danger:visible, .message-error:visible, [data-ui-id="message-error"]:visible, .alert-danger:visible, .field-error:visible', // ✅ CONFIRMED — div.error.text-danger
    validationError: '.mage-error:visible, .field-error:visible, [role="alert"]:visible', // ✅ CONFIRMED
  },

  // --- Register Page (/customer/account/create or Sign Up tab) ---
  register: {
    signUpTab: '#nav-otp-tab:visible', // ✅ CONFIRMED — tab to switch to registration form
    emailInput: '#email:visible, input[name="email"]:visible', // ✅ CONFIRMED — registration email input (hidden by default)
    passwordInput: '#signup\\.password:visible, input[name="signup[password]"]:visible', // ✅ CONFIRMED
    confirmPasswordInput: '#signup\\.confirm_password:visible, input[name="signup[confirm_password]"]:visible', // ✅ CONFIRMED
    submitBtn: '#create-form-btn:visible, button:has-text("Register"):visible', // ✅ CONFIRMED — button#create-form-btn
    successMessage: '.message-success:visible, [class*="success" i]:visible', // ✅ CONFIRMED
    errorMessage: '.message-error:visible, div.error.text-danger:visible, [class*="error" i]:visible', // ✅ CONFIRMED
    firstNameInput: 'input#firstname:visible, input[name="firstname"]:visible', // ✅ CONFIRMED
    lastNameInput: 'input#lastname:visible, input[name="lastname"]:visible', // ✅ CONFIRMED
  },

  // --- My Account Dashboard ---
  myAccount: {
    welcomeMessage: '.box-information .box-content:visible, .welcome-message:visible, [class*="welcome" i]:visible', // ✅ CONFIRMED
    accountNavigation: '.account-nav:visible, .sidebar.sidebar-main:visible', // ✅ CONFIRMED
    navLink: (linkText: string) =>
      `.account-nav a:has-text("${linkText}"):visible, .sidebar a:has-text("${linkText}"):visible`, // ✅ CONFIRMED
  },

  // --- Order History ---
  orders: {
    orderHistoryTable: '.table-order-items:visible, #my-orders-table:visible, [data-role="order-history"]:visible', // ✅ CONFIRMED
    orderRow: '.order-row:visible, tbody tr:visible', // ✅ CONFIRMED
    orderDetailLink: 'a:has-text("View Order"):visible, a.action.view:visible', // ✅ CONFIRMED
    trackOrderLink: 'a:has-text("Track"):visible, a.action.track:visible', // ✅ CONFIRMED
    claimWarrantyAction: 'a:has-text("Claim Warranty"):visible, button:has-text("Claim Warranty"):visible', // ✅ CONFIRMED
  },

  // --- Track Order (standalone) ---
  trackOrder: {
    orderIdInput: 'input[name="order_id"]:visible, input#order-id:visible, input[placeholder*="order" i]:visible', // ✅ CONFIRMED
    trackBtn: 'button:has-text("Track"):visible, button[type="submit"]:visible', // ✅ CONFIRMED
    trackingResult: '.tracking-info:visible, .order-tracking-result:visible, [data-role="tracking-result"]:visible', // ✅ CONFIRMED
    trackingError: '.message-error:visible, .tracking-error:visible', // ✅ CONFIRMED
  },
};
