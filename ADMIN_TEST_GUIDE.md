# Admin Dashboard - Visual Test Guide

## 🧪 Quick Test Workflow

### 1. Start Dev Server
```bash
cd montrez-site
npm run dev
```
**Expected:** Server starts on `http://localhost:3002/`

---

### 2. Navigate to Admin
**URL:** `http://localhost:3002/admin`

**Expected:**
- Redirects to `/admin/login`
- Black background (#0a0a0a)
- Gold "MONTREZ" logo (#d4af37)
- Login form with email/password fields
- Lock icon in gold circle

---

### 3. Login (Mock Auth)
**Credentials:** ANY email + ANY password works

**Test:**
```
Email: admin@montrez.com
Password: test123
```

**Expected:**
- "Signing in..." button state
- Redirects to `/admin/dashboard` after 0.5s
- Sidebar visible on left
- Dashboard content on right

---

### 4. Dashboard Page (`/admin/dashboard`)

**Visual Checks:**
✅ **Header:** "Dashboard" title + subtitle  
✅ **4 Stat Cards:**
  - Total Revenue: €63,950 (↑ 12.5%)
  - Orders: 22 (↑ 8.2%)
  - Products: 13/13 (↑ 3.1%)
  - Customers: 16 (↑ 15.8%)

✅ **Recent Orders Table:**
  - Shows 5 most recent orders
  - Order ID, Customer, Email, Total, Status, Date columns
  - Status badges color-coded
  - Eye icon for "View Order"

**Interactions:**
- Click eye icon → Order modal opens
- Modal shows full order details
- Click X or outside modal → Closes

---

### 5. Sidebar Navigation

**Visual:**
- Black sidebar (#1a1a1a)
- Gold logo at top
- 4 navigation items:
  1. Dashboard (LayoutDashboard icon)
  2. Orders (ShoppingBag icon)
  3. Products (Package icon)
  4. Emails (Mail icon)
- Active page highlighted in gold
- Logout button at bottom

**Mobile Test:**
- Resize window < 1024px
- Sidebar collapses
- Hamburger menu appears top-left
- Click hamburger → Sidebar slides in
- Dark overlay behind sidebar
- Click overlay → Sidebar closes

---

### 6. Orders Page (`/admin/orders`)

**Visual Checks:**
✅ **Search bar:** "Search by customer, order ID, or email..."  
✅ **Status filter:** Dropdown with all statuses  
✅ **Orders table:** All 22 orders displayed  
✅ **Results count:** "Showing X of 22 orders"  

**Status Badge Colors:**
- Pending: Yellow
- Processing: Blue
- Shipped: Purple
- Delivered: Green
- Cancelled: Red

**Interactions:**
1. **Search:**
   - Type "Sophie" → Filters to Sophie Laurent
   - Type "ORD-001" → Shows single order
   - Clear search → Shows all orders

2. **Filter:**
   - Select "Shipped" → Shows only shipped orders
   - Select "All Status" → Shows all orders

3. **View Order:**
   - Click eye icon → Modal opens
   - Shows customer info, items, total
   - Click X → Closes

---

### 7. Products Page (`/admin/products`)

**Visual Checks:**
✅ **Search bar:** "Search by name, SKU, or category..."  
✅ **Add Product button:** Gold button with Plus icon  
✅ **Products table:** All 13 products displayed  
✅ **Stock colors:**
  - Red: 0 stock
  - Yellow: < 10 stock
  - Green: 10+ stock

**Interactions:**

1. **Add Product:**
   - Click "Add Product" → Modal opens
   - Fill form:
     ```
     Name: Montrez Test Watch
     SKU: MTZ-TST-999
     Price: 1999.00
     Stock: 25
     Category: Watches
     Image URL: /images/test.jpg
     Description: Test product
     ```
   - Click "Add Product" → Alert "Product added successfully!"
   - Table updates with new product

2. **Edit Product:**
   - Click edit icon (blue pencil) on any product
   - Modal opens pre-filled
   - Change price to 2500.00
   - Click "Save Changes" → Alert + table updates

3. **Delete Product:**
   - Click delete icon (red trash) on any product
   - Confirm deletion prompt
   - Click OK → Alert "Product deleted!" + table updates

4. **Search:**
   - Type "Montrez Classic" → Filters results
   - Type "MTZ-CLG" → Finds by SKU

---

### 8. Emails Page (`/admin/emails`)

**Visual Checks:**
✅ **5 Email Template Cards:**
  1. Order Confirmation (enabled)
  2. Shipping Notification (enabled)
  3. Welcome Email (enabled)
  4. Abandoned Cart (disabled)
  5. Product Restock Alert (disabled)

✅ **Each Card Has:**
  - Template name
  - Toggle switch (gold when enabled)
  - Subject line field
  - Body textarea
  - Variable placeholders hint

**Interactions:**

1. **Toggle Template:**
   - Click switch on "Abandoned Cart"
   - Switch turns gold
   - Fields become editable
   - Status shows "Enabled"

2. **Edit Template:**
   - Edit "Order Confirmation" subject:
     ```
     New Subject: Thank You for Your Montrez Order - #{orderId}
     ```
   - Edit body (add line):
     ```
     Track your order at: montrez.com/track
     ```

3. **Save All:**
   - Click "Save All Templates" button
   - Button shows "Saving..."
   - Alert "Email templates saved successfully!"

---

### 9. Logout

**Steps:**
1. Click "Logout" in sidebar
2. Redirects to `/admin/login`
3. Try accessing `/admin/dashboard` → Redirects back to login

---

### 10. Responsive Test

**Mobile (< 640px):**
- Sidebar hidden by default
- Hamburger menu visible
- Tables scroll horizontally
- Cards stack vertically
- Stat cards full-width

**Tablet (640px - 1023px):**
- Sidebar still hidden
- Tables still scroll
- Cards in 2-column grid

**Desktop (1024px+):**
- Sidebar always visible
- No hamburger menu
- Tables full-width
- Cards in 4-column grid

---

## 🎨 Visual Reference

### Color Palette
```
Background:    #0a0a0a (pure black)
Card:          #1a1a1a (dark gray)
Primary:       #d4af37 (gold)
Text:          #fafafa (off-white)
Muted:         #262626 (subtle gray)
Border:        #333333 (dark border)
```

### Typography
- **Headings:** Bold, primary color
- **Body:** Regular, foreground color
- **Monospace:** Order IDs, SKUs

---

## ✅ Expected Results Summary

| Page | Key Visual | Key Interaction |
|------|-----------|-----------------|
| Login | Gold logo, lock icon | Any email/password works |
| Dashboard | 4 stat cards, recent orders | View order modal |
| Orders | 22 orders, search/filter | Search, filter, view modal |
| Products | 13 products, add button | Add, edit, delete products |
| Emails | 5 templates, toggles | Toggle, edit, save |
| Sidebar | Gold active state | Mobile collapse/expand |

---

## 🐛 Common Issues & Fixes

### Issue: Sidebar not showing on desktop
**Fix:** Ensure window width > 1024px

### Issue: Modal not closing
**Fix:** Click X button or outside modal overlay

### Issue: Tables cut off on mobile
**Fix:** Expected - scroll horizontally

### Issue: Changes not persisting after refresh
**Fix:** Expected - all data is client-side only (mock operations)

---

## 📸 Screenshot Checklist

**Capture these views for client demo:**
1. Login page
2. Dashboard (full view)
3. Orders table with search active
4. Order detail modal
5. Products table
6. Add/Edit product modal
7. Email automation page
8. Mobile sidebar open
9. Mobile responsive layout

---

**Testing Time:** ~10 minutes  
**Status:** Ready for QA
