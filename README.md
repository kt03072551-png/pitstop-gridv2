Act as a Principal Automotive Systems Architect and Lead Full-Stack Engineer specialized in high-performance e-commerce platforms. 

You are designing the complete system architecture for a full-stack e-commerce web application that sells Motorbike and Car Parts (OEM, Aftermarket, and Performance Parts) with an integrated "Smart Vehicle Garage & Fitment Compatibility Verification System".

### Tech Stack & Framework Architecture:
- Frontend Framework: Next.js 15+ (App Router) with TypeScript & React Server Components
- UI & Styling: Tailwind CSS, Shadcn UI, Lucide React Icons, and Framer Motion
- Backend API Layer: Next.js API Routes / Server Actions
- Database & ORM: PostgreSQL managed via Prisma ORM
- Object Storage: AWS S3 / Cloudflare R2 (for Part Diagrams, High-Res Product Media, and Payment Slips)
- State Management: Zustand (for Cart, Active Vehicle Garage Filter, and Selected Part Compatibility state)

I need you to generate three essential architectural deliverables for this platform:

---

### PART 1: SITEMAP & NAVIGATION ARCHITECTURE
Design a production-ready Sitemap and User Flow divided into two core operational sections:

1. Customer Front-End:
   - Homepage & Vehicle Selector Bar ("Select Make -> Model -> Year -> Engine")
   - Parts Catalog Page with Dynamic Vehicle Fitment Badges (`[ ✅ Fits Your Vehicle ]` / `[ ⚠️ Incompatible ]`)
   - Product Details Page (Part Numbers, Exploded Diagram Viewer, Spec Tables, Fitment Accordion, Shipping Options)
   - Customer Garage Page (Manage Saved Vehicles)
   - Shopping Cart & Checkout Page (Shipping/In-Store Pickup, PromptPay Dynamic QR, Slip Upload)
   - Order Status & Digital Receipt Page

2. Seller/Admin Back-End:
   - Executive Dashboard (Revenue Analytics, Order Flow Status, Low Stock Alerts, Visitor Counts)
   - Orders Management Table with Payment Slip Verification Modal (Side-by-side slip checking & 1-click Approval)
   - Parts Inventory & Stock Manager (Part Numbers, S3 Image Uploads, Warehouse Bin/Aisle Location)
   - Vehicle Fitment Mapping System (Map 1 Part SKU to Multiple Vehicle Models/Years)
   - Customer CRM & Vehicle History Database

For every route, include: Route Path (e.g., `/parts/[partNumber]`), Key UI Components, and Primary User Actions.

---

### PART 2: WIREFRAME & UI/UX SPECIFICATIONS
Provide detailed Wireframe Layout Specifications and Layout Structures optimized for a sleek industrial automotive aesthetic (Dark Slate, Metallic Accents, High-Contrast Indicators):

1. Customer Product Details Page (`/parts/[partNumber]`):
   - Vehicle Fitment Status Bar (Dynamic Alert)
   - Product Gallery & Exploded Parts Diagram Container
   - Part Specifications Table (OEM Part Number, Brand, Grade/Condition, Warranty)
   - Compatibility List Accordion
   - Add to Cart & Express Shipping / In-Store Pickup selectors
2. Checkout & Payment Page (`/checkout`):
   - Order Summary & Vehicle Compatibility Check Confirmation
   - Shipping / Delivery Method Selection
   - Dynamic PromptPay QR Code Display
   - Payment Slip Upload Widget with real-time Image Preview
3. Seller/Admin Dashboard (`/admin/dashboard`):
   - KPI Summary Cards (Total Sales, Pending Slips, Low Stock, Active Visitors)
   - Orders Table with Status Badges (`PENDING_PAYMENT`, `VERIFYING_SLIP`, `PREPARING_PARTS`, `SHIPPED`, `REJECTED`)
   - Slip Verification Modal (Uploaded Slip Preview side-by-side with Order Details & Approve/Reject CTAs)

For each wireframe, specify visual layout structure (Grid/Flexbox), component placement, visual hierarchy, and UI state handling (loading, success, error, fitment warning).

---

### PART 3: DATABASE ERD & PRISMA SCHEMA
Design a production-grade PostgreSQL database schema tailored for automotive parts inventory and fitment mapping.

Key Database Requirements:
1. Users & Roles: Admin/Seller and Customer accounts.
2. Vehicle Master Database: Entities for Vehicle Make (e.g., Honda, Yamaha), Model (e.g., Civic, YZF-R15), Year, Trim/Engine Variant.
3. Customer Garage: Relation connecting Customers to their saved Vehicles.
4. Parts Inventory: Support OEM Part Numbers, SKU, Brand, Category, Grade (OEM, Aftermarket, Performance), Price, Stock Quantity, Warehouse Location (Bin/Aisle), Images, and S3 Storage Keys.
5. Compatibility Mapping: Many-to-Many junction table mapping Parts to Vehicle Models/Years.
6. Orders & Transactions: Track order status (`PENDING_PAYMENT`, `VERIFYING_SLIP`, `APPROVED`, `PREPARING_PARTS`, `SHIPPED`, `REJECTED`), delivery method, payment slip image URL, and timestamps.
7. Visitor & Analytics Logging: Table tracking page views, searched part numbers, and visitor traffic.

Output:
1. ASCII Entity-Relationship Diagram (ERD) showing entities, primary/foreign keys, and cardinalities (1:1, 1:N, N:M).
2. The complete, copy-pasteable `schema.prisma` file with appropriate enums, relations, indexes, and data types.
