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
      approveReleaseBtn: "Approve Order & Release to",
      rejectSlipBtn: "Reject Slip & Request Re-Upload",
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
