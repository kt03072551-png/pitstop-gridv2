import { useLanguageStore, Language } from "@/store/useLanguageStore";

export interface TranslationDictionary {
  navbar: {
    hubsLive: string;
    guarantee: string;
    sellerPortal: string;
    home: string;
    partsCatalog: string;
    myGarage: string;
    searchPlaceholder: string;
    cart: string;
    signIn: string;
    logout: string;
    switchLangTitle: string;
    roleAdmin: string;
    roleSeller: string;
    roleCustomer: string;
    myOrders: string;
  };
  footer: {
    aboutText: string;
    quickLinks: string;
    warehouseLocations: string;
    customerSupport: string;
    rights: string;
  };
  home: {
    heroBadge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroDesc: string;
    exploreCatalog: string;
    verifyFitment: string;
    selectVehiclePrompt: string;
    featuredCategories: string;
    viewAllParts: string;
    statExactFit: string;
    statExactFitDesc: string;
    statHub: string;
    statHubDesc: string;
    statOcr: string;
    statOcrDesc: string;
    featuredDrop: string;
    inspectDiagram: string;
    categoryNav: string;
    exploreCategory: string;
    viewAllCategories: string;
  };
  garage: {
    title: string;
    subtitle: string;
    addVehicle: string;
    activeBadge: string;
    activateBtn: string;
    removeBtn: string;
    noVehiclesTitle: string;
    noVehiclesDesc: string;
  };
  login: {
    title: string;
    subtitle: string;
    demoSectionTitle: string;
    customerDemoTitle: string;
    customerDemoDesc: string;
    adminDemoTitle: string;
    adminDemoDesc: string;
    emailLabel: string;
    passwordLabel: string;
    signInBtn: string;
    signingIn: string;
  };
  catalog: {
    filtersTitle: string;
    filterAll: string;
    filterFits: string;
    filterUniversal: string;
    searchPlaceholder: string;
    inspectPart: string;
    synced: string;
    noVehicleSelected: string;
    filteringFitsOnly: string;
    changeVehicle: string;
    hideFilters: string;
    resetAll: string;
    searchLabel: string;
    compatibilityLabel: string;
    categoryLabel: string;
    gradeLabel: string;
    gradeOem: string;
    gradePerformance: string;
    gradeAftermarket: string;
    immediateBinPicking: string;
    binPickingDesc: string;
    showing: string;
    partsFor: string;
    allCategories: string;
    sortBy: string;
    sortFeatured: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    noPartsTitle: string;
    noPartsDesc: string;
    resetFilters: string;
    explodedBlueprint: string;
    priceLabel: string;
    loadingCatalog: string;
  };
  cart: {
    step1: string;
    title: string;
    continueShopping: string;
    compatWarningTitle: string;
    compatWarningDesc: string;
    changeVehicleBtn: string;
    emptyCartTitle: string;
    emptyCartDesc: string;
    browseCatalogBtn: string;
    fulfillmentMethod: string;
    expressDelivery: string;
    expressDeliveryDesc: string;
    storePickup: string;
    storePickupDesc: string;
    orderSummary: string;
    subtotal: string;
    shippingFee: string;
    total: string;
    proceedToCheckout: string;
    itemsOrdered: string;
    activeFitmentCheck: string;
    eachLabel: string;
    freeLabel: string;
    loadingCart: string;
    secureGateway: string;
  };
  checkout: {
    step2: string;
    title: string;
    backToCart: string;
    shippingInfoTitle: string;
    fullName: string;
    phone: string;
    address: string;
    paymentMethodTitle: string;
    promptPayDesc: string;
    uploadSlipTitle: string;
    uploadSlipDesc: string;
    uploadBtn: string;
    uploadedLabel: string;
    orderSummaryTitle: string;
    subtotal: string;
    shippingFee: string;
    total: string;
    confirmBtn: string;
    confirming: string;
    successTitle: string;
    successDesc: string;
    viewOrderBtn: string;
    loadingPayment: string;
    fitmentGuaranteeActive: string;
    verifiedFor: string;
    universalOrder: string;
    fitmentPolicy: string;
    orderItemsAudit: string;
    fulfillmentSelection: string;
    expressDelivery: string;
    expressDeliveryDesc: string;
    storePickup: string;
    storePickupDesc: string;
    totalPayable: string;
    orderRef: string;
    qrExpired: string;
    regenerateBtn: string;
    scanDesc: string;
    fileFormats: string;
    removeBtn: string;
    scanningSlip: string;
    ocrVerified: string;
    transferTimestamp: string;
    mismatchWarning: string;
    freeLabel: string;
  };
  myOrders: {
    pageTitle: string;
    pageDesc: string;
    loadingOrders: string;
    noOrders: string;
    statusVerifying: string;
    statusConfirmed: string;
    statusPreparing: string;
    statusShipped: string;
    statusUnknown: string;
    totalAmount: string;
    itemsSummary: string;
    fulfillmentMethod: string;
    viewDetails: string;
  };
  vehicleSelector: {
    title: string;
    oemVerified: string;
    description: string;
    stepMake: string;
    stepModel: string;
    stepYear: string;
    stepTrim: string;
    selectMake: string;
    selectModel: string;
    selectTrim: string;
    fitmentActive: string;
    verifyFitment: string;
  };
  fitmentBadge: {
    fits: string;
    fitsNote: string;
    incompatible: string;
    incompatibleNote: string;
    universal: string;
    universalNote: string;
    unknown: string;
  };
  garageDrawer: {
    title: string;
    description: string;
    savedVehicles: string;
    fitmentSynced: string;
    emptyTitle: string;
    emptyDesc: string;
    activeBadge: string;
    clickToActivate: string;
    removeTooltip: string;
    manageGarage: string;
    footerNote: string;
  };
  partDetail: {
    backToCatalog: string;
    oemSpecsTitle: string;
    directPrice: string;
    stockStatus: string;
    inStock: string;
    outOfStock: string;
    addToCart: string;
    techSpecsTitle: string;
    fitmentAuditTitle: string;
    fitmentUnknownDesc: string;
    calloutPin: string;
    calloutDiagram: string;
    techGalleryTitle: string;
    fitmentDescription: string;
    directBoltOn: string;
    oemRef: string;
    totalPrice: string;
    selectFulfillment: string;
    expressShipping: string;
    expressShippingDesc: string;
    inStorePickup: string;
    free: string;
    inStorePickupDesc: string;
    quantity: string;
    instantCheckout: string;
    addedToCart: string;
    vehicleUnselected: string;
    configureGarage: string;
    specOemPartNumber: string;
    specInternalSku: string;
    specManufacturerBrand: string;
    specPartGrade: string;
    specWarehouseBin: string;
    specUniversalFitment: string;
    specUniversalYes: string;
    specUniversalNo: string;
    specDetailedEngineering: string;
  };
  adminLayout: {
    verifying: string;
    authRequiredTitle: string;
    authRequiredDesc: string;
    signInBtn: string;
    accessDeniedTitle: string;
    accessDeniedDesc: string;
    backToStore: string;
    browseCatalog: string;
  };
  adminDashboard: {
    portalBadge: string;
    commandCenter: string;
    verifySlipsBtn: string;
    statDailyRevenue: string;
    statPendingAudits: string;
    statWarehousePicked: string;
    statLowStock: string;
    liveQueueBadge: string;
    recentOrdersTitle: string;
    viewFullTable: string;
    colOrderId: string;
    colCustomer: string;
    colAmount: string;
    colFulfillment: string;
    colStatus: string;
    colTime: string;
    colAction: string;
    inspectSlipBtn: string;
    addNewPartBtn: string;
  };
  adminOrders: {
    portalBadge: string;
    pageTitle: string;
    backToDashboard: string;
    tabAll: string;
    tabVerifying: string;
    tabApproved: string;
    tabPreparing: string;
    colOrderRef: string;
    colCustomerItems: string;
    colAmountPaid: string;
    colOcrCheck: string;
    colFulfillment: string;
    colStatus: string;
    colAction: string;
    exactMatch: string;
    mismatch: string;
    inspectBtn: string;
    modalInspectorTitle: string;
    zoomInBtn: string;
    zoomOutBtn: string;
    modalAuditTitle: string;
    expectedAmountLabel: string;
    ocrAuditLabel: string;
    slipReadAmountLabel: string;
    mismatchWarning: string;
    fulfillmentLabel: string;
    allocatedBinLabel: string;
    itemsSummaryLabel: string;
    approveReleaseBtn: string;
    rejectSlipBtn: string;
    beginPackingBtn: string;
    markReadyBtn: string;
    markShippedBtn: string;
    markCompletedBtn: string;
  };
  adminAddPart: {
    pageTitle: string;
    backToDashboard: string;
    sectionBasicInfo: string;
    sectionPricingStock: string;
    sectionCategorization: string;
    sectionDescription: string;
    fieldTitle: string;
    fieldBrand: string;
    fieldOem: string;
    fieldSku: string;
    fieldPrice: string;
    fieldCostPrice: string;
    fieldStock: string;
    fieldBin: string;
    fieldAisle: string;
    fieldCategory: string;
    fieldGrade: string;
    fieldUniversalFit: string;
    fieldDescEn: string;
    fieldDescTh: string;
    fieldImage: string;
    fieldImagePlaceholder: string;
    sectionSpecifications: string;
    addSpecBtn: string;
    removeSpecBtn: string;
    specKeyEn: string;
    specValueEn: string;
    specKeyTh: string;
    specValueTh: string;
    submitBtn: string;
    successMsg: string;
    errorMsg: string;
  };
  orderReceipt: {
    loading: string;
    notFoundTitle: string;
    notFoundDesc: string;
    returnToCatalog: string;
    step1Label: string;
    step1Desc: string;
    step2Label: string;
    step2DescVerified: string;
    step2DescAwaiting: string;
    step3Label: string;
    step3DescReleased: string;
    step3DescPending: string;
    step4Label: string;
    step4DescPickup: string;
    step4DescShipping: string;
    step5LabelPickup: string;
    step5LabelShipped: string;
    step5DescPickup: string;
    step5DescShipped: string;
    successBadge: string;
    receiptTitle: string;
    receiptDesc: string;
    printBtn: string;
    statusTitle: string;
    warehouseTitle: string;
    warehouseDispatch: string;
    warehouseDesc: string;
    readyTimeLabel: string;
    readyTimeValue: string;
    auditTitle: string;
    auditMethod: string;
    auditMethodValue: string;
    auditTotal: string;
    auditRef: string;
    auditValidation: string;
    auditMatch: string;
    auditPending: string;
    continueShopping: string;
    returnToOrders: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    navbar: {
      hubsLive: "Bangna & Laksi Warehouse Hubs Live",
      guarantee: "100% Genuine OEM & Verified Aftermarket Parts Guarantee",
      sellerPortal: "Seller Portal",
      home: "Home",
      partsCatalog: "Parts Catalog",
      myGarage: "My Garage",
      searchPlaceholder: "Search by OEM No, Part Name, or Model (e.g. 15400-RTA, Spoon Hood)...",
      cart: "Cart",
      signIn: "Sign In / Demo",
      logout: "Sign Out",
      switchLangTitle: "Switch to Thai (TH)",
      roleAdmin: "Executive Admin",
      roleSeller: "Warehouse Seller",
      roleCustomer: "Verified Member",
      myOrders: "My Orders",
    },
    footer: {
      aboutText: "Pitstop Grid v2 is Thailand's premier digital automotive parts distribution network. Combining real-time inventory tracking across Bangna and Laksi hubs with precise vehicle fitment algorithms.",
      quickLinks: "Quick Links",
      warehouseLocations: "Warehouse Hubs",
      customerSupport: "Customer & Trade Support",
      rights: "All rights reserved. Powered by Pitstop Grid Fitment Engine v2.0.",
    },
    home: {
      heroBadge: "THE NEXT-GEN AUTOMOTIVE PARTS & FITMENT ENGINE",
      heroTitle1: "PRECISION PARTS FOR",
      heroTitle2: "CARS & SUPER BIKES.",
      heroDesc: "Verify part compatibility instantly with our real-time Garage Fitment Matrix. Order genuine OEM and performance aftermarket components with 2-hour warehouse bin express pickup.",
      exploreCatalog: "Explore Catalog",
      verifyFitment: "Verify Fitment Now",
      selectVehiclePrompt: "Select Your Vehicle for Guaranteed Fitment Check",
      featuredCategories: "Featured Categories",
      viewAllParts: "View All Parts",
      statExactFit: "100%",
      statExactFitDesc: "Exact Bolt-On Fit",
      statHub: "2 HRS",
      statHubDesc: "Warehouse Hub Pickup",
      statOcr: "OCR + QR",
      statOcrDesc: "Instant Slip Approval",
      featuredDrop: "Featured Track Spec Drop",
      inspectDiagram: "Inspect Exploded Diagram",
      categoryNav: "Catalog Navigation",
      exploreCategory: "Explore By Technical Category",
      viewAllCategories: "View All Categories",
    },
    garage: {
      title: "My Garage & Fitment Profiles",
      subtitle: "Save your vehicles to automatically verify exact OEM fitment compatibility across our 15,000+ parts catalog.",
      addVehicle: "+ Add Another Vehicle",
      activeBadge: "ACTIVE FITMENT FILTER",
      activateBtn: "Set as Active Fitment Filter",
      removeBtn: "Remove Vehicle",
      noVehiclesTitle: "No Vehicles in Your Garage Yet",
      noVehiclesDesc: "Add your car or motorcycle to start automatically verifying compatible parts.",
    },
    login: {
      title: "Pitstop Grid Authentication",
      subtitle: "Sign in to access your garage fitment profiles, express warehouse pickup, and trade member discounts.",
      demoSectionTitle: "⚡ One-Click Demo Accounts (Connects to Live Database)",
      customerDemoTitle: "Customer Demo Account",
      customerDemoDesc: "Access Storefront, Garage profile management, Cart, and PromptPay slip upload.",
      adminDemoTitle: "Admin / Seller Demo Account",
      adminDemoDesc: "Full access to Storefront PLUS Executive Dashboard (`/admin`) and Slip Verification Engine.",
      emailLabel: "Email Address / Username",
      passwordLabel: "Password",
      signInBtn: "Sign In to Pitstop Grid",
      signingIn: "Verifying credentials...",
    },
    catalog: {
      filtersTitle: "Catalog Filters & Search",
      filterAll: "Show All Parts",
      filterFits: "Fits Active Vehicle",
      filterUniversal: "Universal Fit Only",
      searchPlaceholder: "e.g. 15400-RTA or Spoon Hood...",
      inspectPart: "Inspect Part Details",
      synced: "100% Synced",
      noVehicleSelected: "No Vehicle Selected \u2014 Showing All Universal & Model-Specific Catalog Parts",
      filteringFitsOnly: "Filtering Fits Only",
      changeVehicle: "Change Vehicle",
      hideFilters: "Hide Filters",
      resetAll: "Reset All",
      searchLabel: "Search Part / SKU / OEM",
      compatibilityLabel: "Compatibility Verification",
      categoryLabel: "Technical Category",
      gradeLabel: "Part Grade / Condition",
      gradeOem: "OEM Genuine",
      gradePerformance: "Performance Spec",
      gradeAftermarket: "Aftermarket",
      immediateBinPicking: "Immediate Bin Picking",
      binPickingDesc: "All listed parts display physical warehouse bin coordinates (Bin A12, Row 4) ready for 2-hour Express Pickup.",
      showing: "Showing",
      partsFor: "parts for",
      allCategories: "All Categories",
      sortBy: "Sort By:",
      sortFeatured: "Featured / Stock Status",
      sortPriceAsc: "Price: Low to High",
      sortPriceDesc: "Price: High to Low",
      noPartsTitle: "No Compatible Parts Found",
      noPartsDesc: "We could not find items matching your filters or vehicle compatibility criteria. Try adjusting your grade selections or selecting Show All Parts.",
      resetFilters: "Reset Catalog Filters",
      explodedBlueprint: "\ud83d\udcd0 Exploded Blueprint",
      priceLabel: "Price (Inc 7% VAT)",
      loadingCatalog: "Loading Catalog & Fitment Matrix...",
    },
    cart: {
      step1: "Step 1 of 3: Cart Review",
      title: "Shopping Cart & Fitment Audit",
      continueShopping: "Continue Shopping",
      compatWarningTitle: "Compatibility Warning Detected",
      compatWarningDesc: "One or more items in your cart do not match your currently active garage vehicle. Double-check part specs before proceeding.",
      changeVehicleBtn: "Change Vehicle Profile",
      emptyCartTitle: "Your Cart is Empty",
      emptyCartDesc: "Looks like you haven't added any parts to your cart yet.",
      browseCatalogBtn: "Browse Catalog",
      fulfillmentMethod: "Fulfillment Method",
      expressDelivery: "Express Courier Shipping",
      expressDeliveryDesc: "Ships today via EMS/Kerry Express (฿150 flat rate).",
      storePickup: "In-Store Warehouse Pickup",
      storePickupDesc: "Pick up from Bangna or Laksi Hub within 2 hours (Free).",
      orderSummary: "Order Summary",
      subtotal: "Subtotal",
      shippingFee: "Shipping & Handling",
      total: "Total Amount",
      proceedToCheckout: "Proceed to Secure Checkout",
      itemsOrdered: "Items Ordered",
      activeFitmentCheck: "Active Fitment Re-Check",
      eachLabel: "each",
      freeLabel: "FREE",
      loadingCart: "Loading Cart...",
      secureGateway: "Secure SSL PromptPay Gateway & OCR Slip Check",
    },
    checkout: {
      step2: "Step 2 of 3: Checkout",
      title: "Secure Checkout & Transfer",
      backToCart: "Back to Cart",
      shippingInfoTitle: "Shipping Details",
      fullName: "Full Name",
      phone: "Phone Number",
      address: "Full Delivery Address (If shipping)",
      paymentMethodTitle: "Payment: PromptPay QR",
      promptPayDesc: "Scan via any Thai banking app to transfer.",
      uploadSlipTitle: "Verify Payment Slip",
      uploadSlipDesc: "Upload your transfer slip for automatic OCR verification.",
      uploadBtn: "Upload Slip Image",
      uploadedLabel: "Slip Uploaded Successfully",
      orderSummaryTitle: "Order Audit & Summary",
      subtotal: "Subtotal",
      shippingFee: "Shipping",
      total: "Total Required Transfer",
      confirmBtn: "Confirm Order & Submit Slip",
      confirming: "Verifying...",
      successTitle: "Order Confirmed!",
      successDesc: "Your slip is being verified by our OCR system. We'll send an email update shortly.",
      viewOrderBtn: "View Order Status",
      loadingPayment: "Initializing Payment Gateway...",
      fitmentGuaranteeActive: "Fitment Guarantee Active",
      verifiedFor: "Verified for {vehicle}",
      universalOrder: "Universal Order — Direct Factory Fulfillment",
      fitmentPolicy: "Order covered by Pitstop Grid 100% Fitment Replacement Policy.",
      orderItemsAudit: "Order Items Audit",
      fulfillmentSelection: "Fulfillment Selection",
      expressDelivery: "Express Courier Delivery",
      expressDeliveryDesc: "Ships today via EMS/Kerry Express. Delivery within 1-2 business days.",
      storePickup: "In-Store Warehouse Pickup",
      storePickupDesc: "Pick up from Bangna or Laksi Hub within 2 hours.",
      totalPayable: "Total Payable Amount (Down-to-Satang)",
      orderRef: "Order Ref:",
      qrExpired: "QR Code Expired",
      regenerateBtn: "Regenerate",
      scanDesc: "Scan with any Thai mobile banking app (K PLUS, SCB EASY, Krungthai NEXT).",
      fileFormats: "JPG, PNG, PDF (Max 10MB)",
      removeBtn: "Remove",
      scanningSlip: "Scanning Slip QR & Extracting Details...",
      ocrVerified: "OCR Verified:",
      transferTimestamp: "Transfer Timestamp:",
      mismatchWarning: "Warning: Uploaded slip shows {slipAmount} vs Order Total {orderTotal}. Admin review required.",
      freeLabel: "FREE",
    },
    myOrders: {
      pageTitle: "My Orders",
      pageDesc: "Track your order status, payment verification, and shipping updates. Welcome back, {name}.",
      loadingOrders: "Loading orders...",
      noOrders: "No orders found.",
      statusVerifying: "Verifying Payment",
      statusConfirmed: "Confirmed",
      statusPreparing: "Preparing Parts",
      statusShipped: "Shipped",
      statusUnknown: "Unknown",
      totalAmount: "Total Amount",
      itemsSummary: "Items Summary",
      fulfillmentMethod: "Fulfillment Method",
      viewDetails: "View Details",
    },
    vehicleSelector: {
      title: "Smart Fitment Selector",
      oemVerified: "OEM Verified",
      description: "Filter 10,000+ parts guaranteed to bolt-on to your exact vehicle",
      stepMake: "1. Make",
      stepModel: "2. Model",
      stepYear: "3. Year",
      stepTrim: "4. Engine / Trim",
      selectMake: "Select Make",
      selectModel: "Select Model",
      selectTrim: "Select Engine/Trim",
      fitmentActive: "Fitment Active!",
      verifyFitment: "Verify Parts Fitment",
    },
    fitmentBadge: {
      fits: "Fits Your Vehicle",
      fitsNote: "| Direct Bolt-On OEM Spec",
      incompatible: "Incompatible",
      incompatibleNote: "| Check compatibility list",
      universal: "Universal Fit",
      universalNote: "| Fits all Cars & Motorbikes",
      unknown: "Select Vehicle to Check Fitment",
    },
    garageDrawer: {
      title: "Smart Vehicle Garage",
      description: "Switch vehicles to instantly filter 100% compatible parts",
      savedVehicles: "Saved Vehicles",
      fitmentSynced: "Fitment Synced",
      emptyTitle: "Your Garage is empty",
      emptyDesc: "Select your vehicle make, model, and year above to start verifying guaranteed fitment.",
      activeBadge: "Active",
      clickToActivate: "Click to activate",
      removeTooltip: "Remove from garage",
      manageGarage: "Manage Full Garage & VIN Lookup",
      footerNote: "Fitment compatibility verified by Pitstop OEM Matrix",
    },
    partDetail: {
      backToCatalog: "Back to Catalog",
      oemSpecsTitle: "OEM Specs & Details",
      directPrice: "Direct Price",
      stockStatus: "Real-time Hub Inventory",
      inStock: "In Stock & Ready",
      outOfStock: "Out of Stock",
      addToCart: "Add to Cart & Lock Inventory",
      techSpecsTitle: "Technical Specifications Table",
      fitmentAuditTitle: "Fitment Guarantee Audit",
      fitmentUnknownDesc: "Sign in and select your vehicle to run an automated Fitment Guarantee Audit against this component.",
      calloutPin: "Callout Pin",
      calloutDiagram: "Exploded Diagram Blueprint",
      techGalleryTitle: "Technical Gallery & Interactive Schematics",
      fitmentDescription: "This part SKU has been verified by factory service documentation to mount directly onto the following models without drilling or modification:",
      directBoltOn: "Direct Bolt-On",
      oemRef: "OEM Reference",
      totalPrice: "Total Price (Inc 7% VAT)",
      selectFulfillment: "Select Fulfillment Method",
      expressShipping: "Express Courier Shipping",
      expressShippingDesc: "Dispatched next morning via Kerry/DHL Express (1-2 Days).",
      inStorePickup: "In-Store / Warehouse Hub Pickup",
      free: "FREE (฿0.00)",
      inStorePickupDesc: "Ready for collection at Bangna Hub within 120 minutes.",
      quantity: "Quantity",
      instantCheckout: "Instant Checkout with PromptPay QR",
      addedToCart: "Part added to cart! Fitment verified against your garage.",
      vehicleUnselected: "Vehicle Unselected",
      configureGarage: "Configure Garage Profile",
      specOemPartNumber: "OEM Part Number",
      specInternalSku: "Internal SKU",
      specManufacturerBrand: "Manufacturer Brand",
      specPartGrade: "Part Grade / Condition",
      specWarehouseBin: "Warehouse Bin Location",
      specUniversalFitment: "Universal Fitment",
      specUniversalYes: "Yes (Universal)",
      specUniversalNo: "No (Vehicle Specific)",
      specDetailedEngineering: "Detailed Engineering Specs",
    },
    adminLayout: {
      verifying: "Verifying Admin Credentials...",
      authRequiredTitle: "Authentication Required",
      authRequiredDesc: "You must sign in to access the Seller & Warehouse Operations Portal.",
      signInBtn: "Sign In to Continue",
      accessDeniedTitle: "Access Denied",
      accessDeniedDesc: "This area is restricted to Admin and Seller accounts only. Customer accounts can browse the catalog, manage their garage, and place orders from the storefront.",
      backToStore: "← Back to Store",
      browseCatalog: "Browse Parts Catalog →",
    },
    adminDashboard: {
      portalBadge: "• Seller & Warehouse Operations Portal",
      commandCenter: "Executive Command Center",
      verifySlipsBtn: "Verify Payment Slips",
      statDailyRevenue: "Daily Gross Revenue",
      statPendingAudits: "Pending Slip Audits",
      statWarehousePicked: "Warehouse Hub Fulfillment",
      statLowStock: "Low Stock Bin Alerts",
      liveQueueBadge: "Live Queue",
      recentOrdersTitle: "Recent Orders & Slip Verification Feed",
      viewFullTable: "View Full Audit Table →",
      colOrderId: "Order ID",
      colCustomer: "Customer",
      colAmount: "Total Amount",
      colFulfillment: "Fulfillment / Bin",
      colStatus: "Status",
      colTime: "Time",
      colAction: "Action",
      inspectSlipBtn: "Inspect Slip",
      addNewPartBtn: "Add New Part",
    },
    adminAddPart: {
      pageTitle: "Add New Part to Catalog",
      backToDashboard: "Back to Dashboard",
      sectionBasicInfo: "Basic Information",
      sectionPricingStock: "Pricing & Stock",
      sectionCategorization: "Categorization & Fitment",
      sectionDescription: "Product Description",
      fieldTitle: "Part Title",
      fieldBrand: "Brand",
      fieldOem: "OEM Part Number",
      fieldSku: "Internal SKU",
      fieldPrice: "Retail Price (THB)",
      fieldCostPrice: "Cost Price (THB)",
      fieldStock: "Stock Quantity",
      fieldBin: "Warehouse Bin",
      fieldAisle: "Warehouse Aisle",
      fieldCategory: "Category",
      fieldGrade: "Grade / Condition",
      fieldUniversalFit: "Universal Fit (Not vehicle specific)",
      fieldDescEn: "Description (English)",
      fieldDescTh: "Description (Thai)",
      fieldImage: "Upload product picture",
      fieldImagePlaceholder: "https://example.com/image.jpg",
      sectionSpecifications: "Detailed Specifications",
      addSpecBtn: "+ Add Specification",
      removeSpecBtn: "Remove",
      specKeyEn: "Key (EN)",
      specValueEn: "Value (EN)",
      specKeyTh: "Key (TH)",
      specValueTh: "Value (TH)",
      submitBtn: "Save New Part",
      successMsg: "Part added successfully!",
      errorMsg: "Failed to add new part.",
    },
    adminOrders: {
      portalBadge: "• Slip Audit & Order Verification Engine",
      pageTitle: "Orders & Payment Verification",
      backToDashboard: "Back to Dashboard",
      tabAll: "All Orders",
      tabVerifying: "Verifying Slip (Action Required)",
      tabApproved: "Approved & Picking",
      tabPreparing: "Preparing Parts",
      colOrderRef: "Order Ref",
      colCustomerItems: "Customer & Items",
      colAmountPaid: "Amount Paid",
      colOcrCheck: "OCR Check",
      colFulfillment: "Fulfillment / Bin",
      colStatus: "Status",
      colAction: "Verification Action",
      exactMatch: "Exact Match",
      mismatch: "Mismatch (-฿500)",
      inspectBtn: "Inspect & Verify Slip",
      modalInspectorTitle: "High-Res Slip Inspector",
      zoomInBtn: "+ Zoom",
      zoomOutBtn: "- Zoom",
      modalAuditTitle: "Order Audit",
      expectedAmountLabel: "Expected Order Amount",
      ocrAuditLabel: "Automated OCR & QR Audit Result",
      slipReadAmountLabel: "Slip Read Amount:",
      mismatchWarning: "Mismatch warning: The transfer amount on the slip is ฿500 less than the required invoice amount. Double-check before approval.",
      fulfillmentLabel: "Fulfillment Coordinates",
      allocatedBinLabel: "Allocated Bin:",
      itemsSummaryLabel: "Items Summary",
      approveReleaseBtn: "Approve Order & Release to Warehouse",
      rejectSlipBtn: "Reject Slip & Request Re-Upload",
      beginPackingBtn: "Begin Packing Parts",
      markReadyBtn: "Mark Ready for Pickup",
      markShippedBtn: "Mark as Shipped",
      markCompletedBtn: "Mark as Completed",
    },
    orderReceipt: {
      loading: "Loading Order Details...",
      notFoundTitle: "Order Not Found",
      notFoundDesc: "The order you are looking for does not exist.",
      returnToCatalog: "Return to Catalog",
      step1Label: "Payment Submitted",
      step1Desc: "Slip uploaded & scanned by OCR",
      step2Label: "Slip Verification",
      step2DescVerified: "Amount {amount} verified",
      step2DescAwaiting: "Awaiting verification",
      step3Label: "Order Approved",
      step3DescReleased: "Released to Warehouse {branch}",
      step3DescPending: "Pending approval",
      step4Label: "Preparing Parts",
      step4DescPickup: "Picker boxing items",
      step4DescShipping: "Packaging for courier",
      step5LabelPickup: "Ready for Pickup",
      step5LabelShipped: "Shipped",
      step5DescPickup: "Available at Branch within 120 mins",
      step5DescShipped: "Handed over to logistics partner",
      successBadge: "Order Confirmed & OCR Verified",
      receiptTitle: "Receipt #{orderId}",
      receiptDesc: "A digital tax invoice and warehouse collection pass have been sent to your email.",
      printBtn: "Print Tax Invoice",
      statusTitle: "Real-Time Order Fulfillment Status",
      warehouseTitle: "Warehouse Collection Coordinates",
      warehouseDispatch: "Dispatch Hub",
      warehouseDesc: "Your items have been allocated from <strong class=\"text-emerald-600 dark:text-emerald-400 font-mono\">{branch}</strong> and are currently entering express picking boxes.",
      readyTimeLabel: "Estimated Ready Time:",
      readyTimeValue: "Within 120 Minutes",
      auditTitle: "Payment Slip OCR Audit Record",
      auditMethod: "Method:",
      auditMethodValue: "PromptPay Bank Transfer",
      auditTotal: "Total Paid:",
      auditRef: "Transaction Ref:",
      auditValidation: "OCR Validation:",
      auditMatch: "100% Exact Match Approved",
      auditPending: "Pending Validation",
      continueShopping: "Continue Catalog Shopping",
      returnToOrders: "Return to My Orders",
    },
  },
  th: {
    navbar: {
      hubsLive: "คลังสินค้าสาขาบางนาและหลักสี่ พร้อมบริการเรียลไทม์",
      guarantee: "รับประกันอะไหล่แท้ OEM & Aftermarket ตรงรุ่น 100%",
      sellerPortal: "ระบบจัดการร้านค้า",
      home: "หน้าแรก",
      partsCatalog: "แคตตาล็อกอะไหล่",
      myGarage: "โรงรถของฉัน",
      searchPlaceholder: "ค้นหาตามเบอร์ OEM, ชื่ออะไหล่ หรือรุ่นรถ (เช่น 15400-RTA, ฝากระโปรง Spoon)...",
      cart: "ตะกร้าสินค้า",
      signIn: "เข้าสู่ระบบ / ทดลอง",
      logout: "ออกจากระบบ",
      switchLangTitle: "Switch to English (EN)",
      roleAdmin: "ผู้ดูแลระบบสูงสุด",
      roleSeller: "ฝ่ายจัดการคลังสินค้า",
      roleCustomer: "สมาชิกทั่วไป",
      myOrders: "คำสั่งซื้อของฉัน",
    },
    footer: {
      aboutText: "Pitstop Grid v2 คือแพลตฟอร์มจัดจำหน่ายอะไหล่ยานยนต์ดิจิทัลชั้นนำของไทย ผสานการตรวจสอบสต็อกเรียลไทม์ระหว่างคลังบางนาและหลักสี่ พร้อมระบบคัดกรองความเข้ากันได้ของอะไหล่อย่างแม่นยำ",
      quickLinks: "เมนูลัด",
      warehouseLocations: "จุดรับสินค้าคลัง",
      customerSupport: "ฝ่ายบริการลูกค้าและอู่พาร์ทเนอร์",
      rights: "สงวนลิขสิทธิ์ทั้งหมด ขับเคลื่อนโดยระบบตรวจสอบอะไหล่ Pitstop Grid v2.0",
    },
    home: {
      heroBadge: "แพลตฟอร์มอะไหล่ยานยนต์ยุคใหม่ & ระบบตรวจสเปกตรงรุ่น",
      heroTitle1: "อะไหล่แท้ตรงรุ่นสำหรับ",
      heroTitle2: "รถยนต์ & บิ๊กไบค์",
      heroDesc: "ตรวจสอบความตรงรุ่นทันทีด้วยระบบ Garage Fitment Matrix สั่งซื้ออะไหล่แท้ OEM และอะไหล่แต่งซิ่งเกรดพรีเมียม พร้อมรับสินค้าด่วนภายใน 2 ชั่วโมง ณ จุดรับสินค้า",
      exploreCatalog: "เลือกชมแคตตาล็อก",
      verifyFitment: "เช็กความตรงรุ่นทันที",
      selectVehiclePrompt: "เลือกรถของคุณเพื่อตรวจสอบความเข้ากันได้ของอะไหล่ 100%",
      featuredCategories: "หมวดหมู่สินค้าแนะนำ",
      viewAllParts: "ดูสินค้าทั้งหมด",
      statExactFit: "100%",
      statExactFitDesc: "ใส่ตรงรุ่นไม่ต้องดัดแปลง",
      statHub: "2 ชม.",
      statHubDesc: "รับของด่วนที่คลังสินค้า",
      statOcr: "ระบบ OCR + QR",
      statOcrDesc: "อนุมัติสลิปอัตโนมัติ",
      featuredDrop: "สินค้าระดับพรีเมียมแนะนำ",
      inspectDiagram: "ดูแบบแปลนแยกชิ้นส่วน",
      categoryNav: "ระบบนำทางแคตตาล็อก",
      exploreCategory: "เลือกชมตามหมวดหมู่ช่าง",
      viewAllCategories: "ดูหมวดหมู่ทั้งหมด",
    },
    garage: {
      title: "โรงรถ & ข้อมูลรถของฉัน",
      subtitle: "บันทึกข้อมูลรถยนต์หรือมอเตอร์ไซค์เพื่อตรวจสอบความตรงรุ่นของอะไหล่กว่า 15,000+ รายการโดยอัตโนมัติ",
      addVehicle: "+ เพิ่มรถคันใหม่",
      activeBadge: "กำลังใช้งานเป็นรถหลัก",
      activateBtn: "ตั้งเป็นรถที่ใช้งานหลัก",
      removeBtn: "ลบข้อมูลรถ",
      noVehiclesTitle: "ยังไม่มีรถในโรงรถของคุณ",
      noVehiclesDesc: "เพิ่มรถยนต์หรือมอเตอร์ไซค์ของคุณเพื่อเริ่มตรวจสอบความเข้ากันได้ของอะไหล่โดยอัตโนมัติ",
    },
    login: {
      title: "เข้าสู่ระบบ Pitstop Grid",
      subtitle: "เข้าสู่ระบบเพื่อเข้าถึงข้อมูลรถในโรงรถ บริการรับสินค้าด่วนที่คลัง และสิทธิพิเศษสมาชิก",
      demoSectionTitle: "⚡ บัญชีทดลองคลิกเดียวเข้าสู่ระบบ (เชื่อมต่อฐานข้อมูลจริง)",
      customerDemoTitle: "บัญชีทดลอง: ลูกค้าทั่วไป",
      customerDemoDesc: "เข้าถึงหน้าร้านค้า จัดการโรงรถ ตะกร้าสินค้า และอัปโหลดสลิปชำระเงิน พร้อมส่วนลดพิเศษ",
      adminDemoTitle: "บัญชีทดลอง: ผู้ดูแลระบบ / ผู้ขาย",
      adminDemoDesc: "เข้าถึงหน้าร้านค้าเต็มรูปแบบ พร้อมระบบจัดการร้านค้า (`/admin`) และระบบตรวจสลิป",
      emailLabel: "อีเมล / ชื่อผู้ใช้งาน",
      passwordLabel: "รหัสผ่าน",
      signInBtn: "เข้าสู่ระบบ Pitstop Grid",
      signingIn: "กำลังตรวจสอบรหัสผ่าน...",
    },
    catalog: {
      filtersTitle: "ตัวกรองสินค้า & ค้นหา",
      filterAll: "แสดงอะไหล่ทั้งหมด",
      filterFits: "ตรงรุ่นกับรถหลัก",
      filterUniversal: "อะไหล่สากล / ใช้ร่วมกันได้",
      searchPlaceholder: "เช่น 15400-RTA หรือ ฝากระโปรง Spoon...",
      inspectPart: "ดูรายละเอียดอะไหล่",
      synced: "ซิงค์ 100%",
      noVehicleSelected: "ยังไม่ได้เลือกรถ — แสดงอะไหล่สากลและเฉพาะรุ่นทั้งหมด",
      filteringFitsOnly: "กรองเฉพาะตรงรุ่น",
      changeVehicle: "เปลี่ยนรถ",
      hideFilters: "ซ่อนตัวกรอง",
      resetAll: "รีเซ็ตทั้งหมด",
      searchLabel: "ค้นหาอะไหล่ / SKU / OEM",
      compatibilityLabel: "ตรวจสอบความเข้ากันได้",
      categoryLabel: "หมวดหมู่ทางเทคนิค",
      gradeLabel: "เกรด / สภาพอะไหล่",
      gradeOem: "OEM แท้",
      gradePerformance: "เกรดแต่ง",
      gradeAftermarket: "อะไหล่ทดแทน",
      immediateBinPicking: "รับของได้ทันทีจากชั้นวาง",
      binPickingDesc: "อะไหล่ทุกชิ้นแสดงตำแหน่งจัดเก็บในคลัง (Bin A12, Row 4) พร้อมรับของด่วนภายใน 2 ชั่วโมง",
      showing: "แสดง",
      partsFor: "รายการสำหรับ",
      allCategories: "ทุกหมวดหมู่",
      sortBy: "เรียงตาม:",
      sortFeatured: "แนะนำ / สถานะสต็อก",
      sortPriceAsc: "ราคา: ต่ำ → สูง",
      sortPriceDesc: "ราคา: สูง → ต่ำ",
      noPartsTitle: "ไม่พบอะไหล่ที่ตรงรุ่น",
      noPartsDesc: "ไม่พบสินค้าที่ตรงกับตัวกรองหรือความตรงรุ่นของคุณ ลองปรับเกรดหรือเลือกแสดงอะไหล่ทั้งหมด",
      resetFilters: "รีเซ็ตตัวกรองแคตตาล็อก",
      explodedBlueprint: "📐 แบบแปลนแยกชิ้นส่วน",
      priceLabel: "ราคา (รวม VAT 7%)",
      loadingCatalog: "กำลังโหลดแคตตาล็อกและระบบตรวจสอบความตรงรุ่น...",
    },
    cart: {
      step1: "ขั้นตอนที่ 1 จาก 3: ตรวจสอบตะกร้า",
      title: "ตะกร้าสินค้า & ระบบตรวจความตรงรุ่น",
      continueShopping: "เลือกซื้อสินค้าต่อ",
      compatWarningTitle: "ตรวจพบอะไหล่ไม่ตรงรุ่น",
      compatWarningDesc: "มีอะไหล่อย่างน้อย 1 ชิ้นในตะกร้าที่ไม่ตรงกับรถที่คุณตั้งค่าไว้ กรุณาตรวจสอบให้แน่ชัดก่อนดำเนินการต่อ",
      changeVehicleBtn: "เปลี่ยนโปรไฟล์รถ",
      emptyCartTitle: "ตะกร้าสินค้าว่างเปล่า",
      emptyCartDesc: "ดูเหมือนว่าคุณจะยังไม่ได้เลือกชิ้นส่วนอะไหล่ใดๆ",
      browseCatalogBtn: "เลือกชมแคตตาล็อก",
      fulfillmentMethod: "เลือกวิธีรับสินค้า",
      expressDelivery: "จัดส่งพัสดุด่วน (EMS/Kerry)",
      expressDeliveryDesc: "จัดส่งภายในวันนี้แบบเหมาจ่าย (฿150)",
      storePickup: "รับด้วยตนเองที่คลังสินค้า",
      storePickupDesc: "รับที่คลังสาขาบางนาหรือหลักสี่ภายใน 2 ชม. (ฟรี)",
      orderSummary: "สรุปคำสั่งซื้อ",
      subtotal: "ยอดรวมสินค้า",
      shippingFee: "ค่าจัดส่ง",
      total: "ยอดสุทธิที่ต้องชำระ",
      proceedToCheckout: "ดำเนินการชำระเงินอย่างปลอดภัย",
      itemsOrdered: "รายการที่สั่งซื้อ",
      activeFitmentCheck: "ตรวจสอบความตรงรุ่นอีกครั้ง",
      eachLabel: "ต่อชิ้น",
      freeLabel: "ฟรี",
      loadingCart: "กำลังโหลดตะกร้าสินค้า...",
      secureGateway: "ระบบชำระเงินพร้อมเพย์ SSL และตรวจสอบสลิป OCR",
    },
    checkout: {
      step2: "ขั้นตอนที่ 2 จาก 3: ชำระเงิน",
      title: "ระบบชำระเงินและโอนเงินผ่านสลิป",
      backToCart: "กลับไปตะกร้าสินค้า",
      shippingInfoTitle: "ข้อมูลการจัดส่ง",
      fullName: "ชื่อ - นามสกุล",
      phone: "เบอร์โทรศัพท์",
      address: "ที่อยู่สำหรับจัดส่ง (หากเลือกจัดส่ง)",
      paymentMethodTitle: "ช่องทางชำระเงิน: พร้อมเพย์ QR",
      promptPayDesc: "สแกนผ่านแอปธนาคารใดก็ได้เพื่อทำรายการ",
      uploadSlipTitle: "ยืนยันการชำระเงินด้วยสลิป",
      uploadSlipDesc: "อัปโหลดภาพสลิปโอนเงินเพื่อให้ระบบ OCR ตรวจสอบอัตโนมัติ",
      uploadBtn: "อัปโหลดรูปสลิป",
      uploadedLabel: "อัปโหลดสลิปสำเร็จแล้ว",
      orderSummaryTitle: "ตรวจสอบยอดและสรุปรายการ",
      subtotal: "ยอดรวมสินค้า",
      shippingFee: "ค่าจัดส่ง",
      total: "ยอดโอนสุทธิที่ต้องระบุในสลิป",
      confirmBtn: "ยืนยันคำสั่งซื้อ & ส่งสลิป",
      confirming: "กำลังตรวจสอบ...",
      successTitle: "สั่งซื้อสำเร็จ!",
      successDesc: "ระบบ OCR กำลังตรวจสอบสลิปโอนเงินของคุณ เราจะแจ้งสถานะให้ทราบผ่านอีเมลในไม่ช้า",
      viewOrderBtn: "ดูสถานะคำสั่งซื้อ",
      loadingPayment: "กำลังเตรียมระบบชำระเงิน...",
      fitmentGuaranteeActive: "รับประกันความตรงรุ่น 100%",
      verifiedFor: "ยืนยันตรงรุ่นสำหรับ {vehicle}",
      universalOrder: "คำสั่งซื้ออะไหล่สากล — จัดส่งตรงจากโรงงาน",
      fitmentPolicy: "คำสั่งซื้อนี้อยู่ภายใต้นโยบายเปลี่ยนคืนอะไหล่ไม่ตรงรุ่น 100% ของ Pitstop Grid",
      orderItemsAudit: "ตรวจสอบรายการสั่งซื้อ",
      fulfillmentSelection: "เลือกวิธีรับสินค้า",
      expressDelivery: "จัดส่งพัสดุด่วน",
      expressDeliveryDesc: "ส่งวันนี้ผ่าน EMS/Kerry Express รับของภายใน 1-2 วันทำการ",
      storePickup: "รับด้วยตนเองที่คลังสินค้า",
      storePickupDesc: "รับที่คลังสาขาบางนาหรือหลักสี่ภายใน 2 ชั่วโมง",
      totalPayable: "ยอดชำระรวมทั้งสิ้น (สตางค์)",
      orderRef: "เลขที่อ้างอิง:",
      qrExpired: "QR Code หมดอายุแล้ว",
      regenerateBtn: "สร้าง QR ใหม่",
      scanDesc: "สแกนด้วยแอปธนาคารบนมือถือ (K PLUS, SCB EASY, Krungthai NEXT)",
      fileFormats: "JPG, PNG, PDF (สูงสุด 10MB)",
      removeBtn: "ลบ",
      scanningSlip: "กำลังสแกน QR สลิปและดึงข้อมูล...",
      ocrVerified: "OCR ตรวจสอบแล้ว:",
      transferTimestamp: "เวลาโอน:",
      mismatchWarning: "คำเตือน: สลิปแสดงยอด {slipAmount} แต่ยอดสั่งซื้อคือ {orderTotal} ต้องให้แอดมินตรวจสอบ",
      freeLabel: "ฟรี",
    },
    myOrders: {
      pageTitle: "คำสั่งซื้อของฉัน",
      pageDesc: "ติดตามสถานะคำสั่งซื้อ การตรวจสอบการชำระเงิน และสถานะการจัดส่ง ยินดีต้อนรับกลับมา, {name}",
      loadingOrders: "กำลังโหลดคำสั่งซื้อ...",
      noOrders: "ไม่พบคำสั่งซื้อ",
      statusVerifying: "กำลังตรวจสอบการชำระเงิน",
      statusConfirmed: "ยืนยันแล้ว",
      statusPreparing: "กำลังเตรียมอะไหล่",
      statusShipped: "จัดส่งแล้ว",
      statusUnknown: "ไม่ทราบสถานะ",
      totalAmount: "ยอดรวม",
      itemsSummary: "สรุปรายการสินค้า",
      fulfillmentMethod: "วิธีการรับสินค้า",
      viewDetails: "ดูรายละเอียด",
    },
    vehicleSelector: {
      title: "ตัวเลือกอะไหล่ตรงรุ่นอัจฉริยะ",
      oemVerified: "ยืนยันโดย OEM",
      description: "กรองอะไหล่กว่า 10,000+ รายการที่รับประกันว่าใส่ตรงรุ่นกับรถของคุณ",
      stepMake: "1. ยี่ห้อ",
      stepModel: "2. รุ่น",
      stepYear: "3. ปี",
      stepTrim: "4. เครื่องยนต์ / รุ่นย่อย",
      selectMake: "เลือกยี่ห้อ",
      selectModel: "เลือกรุ่น",
      selectTrim: "เลือกเครื่องยนต์/รุ่นย่อย",
      fitmentActive: "ตรงรุ่นแล้ว!",
      verifyFitment: "ตรวจสอบความตรงรุ่น",
    },
    fitmentBadge: {
      fits: "ตรงรุ่นกับรถของคุณ",
      fitsNote: "| ใส่ตรงรุ่น OEM ไม่ต้องดัดแปลง",
      incompatible: "ไม่ตรงรุ่น",
      incompatibleNote: "| ตรวจสอบรายการที่รองรับ",
      universal: "อะไหล่สากล",
      universalNote: "| ใช้ได้กับรถทุกรุ่น",
      unknown: "เลือกรถเพื่อตรวจสอบความตรงรุ่น",
    },
    garageDrawer: {
      title: "\u0e42\u0e23\u0e07\u0e23\u0e16\u0e2d\u0e31\u0e08\u0e09\u0e23\u0e34\u0e22\u0e30",
      description: "\u0e2a\u0e25\u0e31\u0e1a\u0e23\u0e16\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e01\u0e23\u0e2d\u0e07\u0e2d\u0e30\u0e44\u0e2b\u0e25\u0e48\u0e17\u0e35\u0e48\u0e15\u0e23\u0e07\u0e23\u0e38\u0e48\u0e19 100% \u0e17\u0e31\u0e19\u0e17\u0e35",
      savedVehicles: "รถที่บันทึกไว้",
      fitmentSynced: "ซิงค์ความตรงรุ่นแล้ว",
      emptyTitle: "โรงรถของคุณยังว่างเปล่า",
      emptyDesc: "เลือกยี่ห้อ รุ่น และปีของรถด้านบนเพื่อเริ่มตรวจสอบความตรงรุ่น",
      activeBadge: "กำลังใช้งาน",
      clickToActivate: "คลิกเพื่อเปิดใช้งาน",
      removeTooltip: "ลบออกจากโรงรถ",
      manageGarage: "จัดการโรงรถ & ค้นหา VIN",
      footerNote: "ความตรงรุ่นยืนยันโดยระบบ Pitstop OEM Matrix",
    },
    partDetail: {
      backToCatalog: "กลับสู่แคตตาล็อก",
      oemSpecsTitle: "ข้อมูลเฉพาะทาง & สเปก OEM",
      directPrice: "ราคาตรงจากโรงงาน",
      stockStatus: "สถานะสต็อกเรียลไทม์",
      inStock: "มีสินค้าพร้อมส่ง",
      outOfStock: "สินค้าหมดสต็อก",
      addToCart: "หยิบใส่ตะกร้า & ล็อกคิวสต็อก",
      techSpecsTitle: "ตารางข้อมูลทางเทคนิค",
      fitmentAuditTitle: "ตรวจสอบการรับประกันการติดตั้ง",
      fitmentUnknownDesc: "เข้าสู่ระบบและเลือกรถของคุณเพื่อเรียกใช้การตรวจสอบการรับประกันการติดตั้งแบบอัตโนมัติกับชิ้นส่วนนี้",
      calloutPin: "พินหมายเลข",
      calloutDiagram: "พิมพ์เขียวไดอะแกรม",
      techGalleryTitle: "แกลเลอรีเทคนิคและแผนผัง",
      fitmentDescription: "SKU อะไหล่ชิ้นนี้ได้รับการยืนยันโดยเอกสารคู่มือซ่อมบำรุงว่าสามารถติดตั้งกับรุ่นต่อไปนี้ได้โดยตรง ไม่ต้องดัดแปลง:",
      directBoltOn: "ตรงรุ่นใส่ได้เลย",
      oemRef: "หมายเลขอ้างอิง OEM",
      totalPrice: "ราคาสุทธิ (รวมภาษีมูลค่าเพิ่ม 7%)",
      selectFulfillment: "เลือกวิธีการจัดส่ง/รับสินค้า",
      expressShipping: "จัดส่งด่วนทางไปรษณีย์",
      expressShippingDesc: "จัดส่งเช้าวันถัดไปโดย Kerry/DHL Express (1-2 วัน)",
      inStorePickup: "รับสินค้าที่โกดัง / สาขา",
      free: "ฟรี (฿0.00)",
      inStorePickupDesc: "รับสินค้าได้ที่สาขาบางนาภายใน 120 นาที",
      quantity: "จำนวน",
      instantCheckout: "สั่งซื้อทันทีด้วย PromptPay QR",
      addedToCart: "เพิ่มสินค้าลงตะกร้าแล้ว! ตรวจสอบความเข้ากันได้กับรถของคุณเรียบร้อย",
      vehicleUnselected: "ยังไม่ได้เลือกรถยนต์",
      configureGarage: "ตั้งค่าโปรไฟล์โรงรถของคุณ",
      specOemPartNumber: "รหัสอะไหล่ OEM",
      specInternalSku: "รหัสสินค้าภายใน",
      specManufacturerBrand: "แบรนด์ผู้ผลิต",
      specPartGrade: "เกรด / สภาพสินค้า",
      specWarehouseBin: "ตำแหน่งจัดเก็บในคลังสินค้า",
      specUniversalFitment: "ใช้ได้ทั่วไป",
      specUniversalYes: "ใช่ (ใช้ได้ทั่วไป)",
      specUniversalNo: "ไม่ (เฉพาะรุ่นรถ)",
      specDetailedEngineering: "สเปกวิศวกรรมโดยละเอียด",
    },
    adminLayout: {
      verifying: "กำลังตรวจสอบสิทธิ์ผู้ดูแลระบบ...",
      authRequiredTitle: "กรุณาเข้าสู่ระบบ",
      authRequiredDesc: "คุณต้องเข้าสู่ระบบก่อนเพื่อเข้าใช้งานระบบจัดการร้านค้าและคลังสินค้า",
      signInBtn: "เข้าสู่ระบบเพื่อดำเนินการต่อ",
      accessDeniedTitle: "ไม่มีสิทธิ์เข้าถึง",
      accessDeniedDesc: "ส่วนงานนี้จำกัดเฉพาะผู้ดูแลระบบและฝ่ายคลังสินค้าเท่านั้น สมาชิกทั่วไปสามารถสั่งซื้อสินค้า จัดการโรงรถ และเลือกชมแคตตาล็อกได้ที่หน้าร้านค้า",
      backToStore: "← กลับสู่หน้าร้านค้า",
      browseCatalog: "เลือกชมแคตตาล็อกอะไหล่ →",
    },
    adminDashboard: {
      portalBadge: "• ระบบจัดการคลังสินค้า & ร้านค้า",
      commandCenter: "ศูนย์ควบคุมผู้ดูแลระบบ",
      verifySlipsBtn: "ตรวจสอบสลิปโอนเงิน",
      statDailyRevenue: "ยอดขายรวมประจำวัน",
      statPendingAudits: "รอตรวจสอบสลิป",
      statWarehousePicked: "จัดเตรียมอะไหล่แล้ว",
      statLowStock: "แจ้งเตือนสต็อกใกล้หมด",
      liveQueueBadge: "คิวเรียลไทม์",
      recentOrdersTitle: "รายการคำสั่งซื้อล่าสุด & ตรวจสอบสลิป",
      viewFullTable: "ดูตารางตรวจสอบทั้งหมด →",
      colOrderId: "รหัสคำสั่งซื้อ",
      colCustomer: "ลูกค้า",
      colAmount: "ยอดรวม",
      colFulfillment: "การจัดส่ง / จุดรับ",
      colStatus: "สถานะ",
      colTime: "เวลา",
      colAction: "ดำเนินการ",
      inspectSlipBtn: "ตรวจสลิป",
      addNewPartBtn: "เพิ่มอะไหล่ใหม่",
    },
    adminAddPart: {
      pageTitle: "เพิ่มอะไหล่ใหม่เข้าระบบ",
      backToDashboard: "กลับหน้าแดชบอร์ด",
      sectionBasicInfo: "ข้อมูลพื้นฐาน",
      sectionPricingStock: "ราคาและสต็อก",
      sectionCategorization: "หมวดหมู่และสเปก",
      sectionDescription: "คำอธิบายสินค้า",
      fieldTitle: "ชื่อสินค้า",
      fieldBrand: "แบรนด์",
      fieldOem: "รหัส OEM",
      fieldSku: "รหัส SKU",
      fieldPrice: "ราคาขาย (บาท)",
      fieldCostPrice: "ต้นทุน (บาท)",
      fieldStock: "จำนวนสต็อก",
      fieldBin: "ตำแหน่ง Bin",
      fieldAisle: "ตำแหน่ง Aisle",
      fieldCategory: "หมวดหมู่",
      fieldGrade: "เกรด/สภาพ",
      fieldUniversalFit: "ใช้ได้ทั่วไป (Universal Fit)",
      fieldDescEn: "คำอธิบาย (ภาษาอังกฤษ)",
      fieldDescTh: "คำอธิบาย (ภาษาไทย)",
      fieldImage: "Upload product picture",
      fieldImagePlaceholder: "https://example.com/image.jpg",
      sectionSpecifications: "รายละเอียดสเปกเชิงลึก",
      addSpecBtn: "+ เพิ่มสเปก",
      removeSpecBtn: "ลบ",
      specKeyEn: "หัวข้อ (EN)",
      specValueEn: "รายละเอียด (EN)",
      specKeyTh: "หัวข้อ (TH)",
      specValueTh: "รายละเอียด (TH)",
      submitBtn: "บันทึกสินค้าใหม่",
      successMsg: "เพิ่มสินค้าใหม่เรียบร้อยแล้ว!",
      errorMsg: "เกิดข้อผิดพลาดในการเพิ่มสินค้า",
    },
    adminOrders: {
      portalBadge: "• ระบบตรวจสอบสลิป & อนุมัติคำสั่งซื้อ",
      pageTitle: "จัดการคำสั่งซื้อ & ตรวจสอบการชำระเงิน",
      backToDashboard: "กลับหน้าแดชบอร์ด",
      tabAll: "คำสั่งซื้อทั้งหมด",
      tabVerifying: "รอตรวจสลิป (ต้องดำเนินการ)",
      tabApproved: "อนุมัติแล้ว & กำลังหยิบ",
      tabPreparing: "กำลังเตรียมอะไหล่",
      colOrderRef: "รหัสอ้างอิง",
      colCustomerItems: "ลูกค้า & รายการสินค้า",
      colAmountPaid: "ยอดชำระ",
      colOcrCheck: "ผลตรวจ OCR",
      colFulfillment: "การจัดส่ง / จุดรับ",
      colStatus: "สถานะ",
      colAction: "ดำเนินการตรวจสอบ",
      exactMatch: "ยอดตรงกัน",
      mismatch: "ยอดไม่ตรง (-฿500)",
      inspectBtn: "ตรวจสอบ & อนุมัติสลิป",
      modalInspectorTitle: "ระบบซูมตรวจสอบสลิปความละเอียดสูง",
      zoomInBtn: "+ ซูมเข้า",
      zoomOutBtn: "- ซูมออก",
      modalAuditTitle: "ตรวจสอบคำสั่งซื้อ",
      expectedAmountLabel: "ยอดเรียกเก็บตามใบสั่งซื้อ",
      ocrAuditLabel: "ผลการอ่านสลิปอัตโนมัติ (OCR/QR)",
      slipReadAmountLabel: "ยอดเงินที่อ่านได้จากสลิป:",
      mismatchWarning: "คำเตือนยอดไม่ตรง: ยอดโอนในสลิปน้อยกว่ายอดเรียกเก็บจริง ฿500 กรุณาตรวจสอบให้แน่ชัดก่อนกดอนุมัติ",
      fulfillmentLabel: "พิกัดและวิธีรับสินค้า",
      allocatedBinLabel: "ตำแหน่งชั้นวาง:",
      itemsSummaryLabel: "สรุปรายการสินค้า",
      approveReleaseBtn: "อนุมัติคำสั่งซื้อ & ส่งแจ้งคลังที่",
      rejectSlipBtn: "ปฏิเสธสลิป & ให้ลูกค้าอัปโหลดใหม่",
      beginPackingBtn: "เริ่มแพ็คสินค้า",
      markReadyBtn: "ทำเครื่องหมายว่าพร้อมรับ",
      markShippedBtn: "ทำเครื่องหมายว่าจัดส่งแล้ว",
      markCompletedBtn: "ทำเครื่องหมายว่าเสร็จสิ้น",
    },
    orderReceipt: {
      loading: "กำลังโหลดรายละเอียดคำสั่งซื้อ...",
      notFoundTitle: "ไม่พบคำสั่งซื้อ",
      notFoundDesc: "ไม่มีคำสั่งซื้อที่คุณกำลังค้นหา",
      returnToCatalog: "กลับไปที่แคตตาล็อก",
      step1Label: "ส่งการชำระเงินแล้ว",
      step1Desc: "อัปโหลดและสแกนสลิปด้วยระบบ OCR แล้ว",
      step2Label: "การตรวจสอบสลิป",
      step2DescVerified: "ตรวจสอบยอดเงิน {amount} แล้ว",
      step2DescAwaiting: "กำลังรอการตรวจสอบ",
      step3Label: "อนุมัติคำสั่งซื้อแล้ว",
      step3DescReleased: "ส่งไปยังคลังสินค้า {branch} แล้ว",
      step3DescPending: "กำลังรอการอนุมัติ",
      step4Label: "กำลังเตรียมอะไหล่",
      step4DescPickup: "พนักงานกำลังจัดของลงกล่อง",
      step4DescShipping: "กำลังบรรจุหีบห่อเพื่อจัดส่ง",
      step5LabelPickup: "พร้อมให้รับสินค้า",
      step5LabelShipped: "จัดส่งแล้ว",
      step5DescPickup: "รับสินค้าได้ที่สาขาภายใน 120 นาที",
      step5DescShipped: "ส่งมอบให้กับพันธมิตรด้านโลจิสติกส์แล้ว",
      successBadge: "ยืนยันคำสั่งซื้อและตรวจสอบด้วย OCR แล้ว",
      receiptTitle: "ใบเสร็จ #{orderId}",
      receiptDesc: "ใบกำกับภาษีดิจิทัลและใบรับสินค้าจากคลังสินค้าได้ถูกส่งไปยังอีเมลของคุณแล้ว",
      printBtn: "พิมพ์ใบกำกับภาษี",
      statusTitle: "สถานะการจัดการคำสั่งซื้อแบบเรียลไทม์",
      warehouseTitle: "พิกัดและจุดรับสินค้าจากคลัง",
      warehouseDispatch: "ศูนย์กระจายสินค้า",
      warehouseDesc: "รายการสินค้าของคุณได้รับการจัดสรรจาก <strong class=\"text-emerald-600 dark:text-emerald-400 font-mono\">{branch}</strong> และกำลังเข้าสู่ขั้นตอนการหยิบสินค้าด่วน",
      readyTimeLabel: "เวลาที่คาดว่าจะพร้อม:",
      readyTimeValue: "ภายใน 120 นาที",
      auditTitle: "บันทึกการตรวจสอบสลิปชำระเงินด้วย OCR",
      auditMethod: "วิธีการ:",
      auditMethodValue: "โอนเงินผ่านธนาคารพร้อมเพย์",
      auditTotal: "ยอดชำระรวม:",
      auditRef: "รหัสอ้างอิงธุรกรรม (Ref):",
      auditValidation: "การตรวจสอบ OCR:",
      auditMatch: "ตรงกัน 100% และได้รับการอนุมัติ",
      auditPending: "รอการตรวจสอบความถูกต้อง",
      continueShopping: "เลือกซื้อสินค้าในแคตตาล็อกต่อ",
      returnToOrders: "กลับไปยังคำสั่งซื้อของฉัน",
    },
  },
};

export function useTranslation() {
  const { lang, setLanguage, toggleLanguage } = useLanguageStore();
  return {
    t: translations[lang],
    lang,
    setLanguage,
    toggleLanguage,
  };
}
