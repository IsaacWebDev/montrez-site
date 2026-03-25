# 🚀 Admin Dashboard - Quick Start

## ⚡ 30-Second Setup

```bash
# Navigate to project
cd montrez-site

# Start dev server
npm run dev

# Open browser
http://localhost:3002/admin
```

**Login:** Any email + any password

---

## 📍 Admin Routes

| Route | Page |
|-------|------|
| `/admin` | Redirects to dashboard (or login if not auth) |
| `/admin/login` | Login page (mock auth) |
| `/admin/dashboard` | Overview + stats + recent orders |
| `/admin/orders` | All orders (search, filter, view) |
| `/admin/products` | Products (add, edit, delete) |
| `/admin/emails` | Email templates (toggle, edit) |

---

## 🔐 Mock Authentication

**ANY email + password works:**
```
Email: admin@montrez.com
Password: password123
```

**How it works:**
- Sets `localStorage` flag on login
- All routes check for auth flag
- Logout clears flag

**To reset auth:**
```javascript
// In browser console:
localStorage.removeItem('montrez-admin-auth')
```

---

## 📊 Mock Data

### Orders: 22 total
- Revenue: €63,950
- Customers: 16 unique
- Status: Pending, Processing, Shipped, Delivered, Cancelled

### Products: 13 total
- Watches: 8 products (€1,750 - €5,200)
- Accessories: 4 products (€100 - €500)
- Limited Edition: 1 product (€5,200)

### Email Templates: 5 total
- 3 enabled (Order Confirmation, Shipping, Welcome)
- 2 disabled (Abandoned Cart, Restock Alert)

---

## 🎨 Theme Colors

```css
Black:  #0a0a0a  /* Background */
Gray:   #1a1a1a  /* Cards */
Gold:   #d4af37  /* Primary/Accent */
White:  #fafafa  /* Text */
Border: #333333  /* Borders */
```

---

## 🧪 Quick Test Flow

1. **Login** → `/admin/login`
   - Enter any email/password
   - Click "Sign In"

2. **Dashboard** → `/admin/dashboard`
   - See 4 stat cards
   - View recent orders
   - Click eye icon to view order details

3. **Orders** → `/admin/orders`
   - Search: "Sophie"
   - Filter: "Shipped"
   - Click eye icon on any order

4. **Products** → `/admin/products`
   - Click "Add Product"
   - Fill form, save
   - Edit product (pencil icon)
   - Delete product (trash icon)

5. **Emails** → `/admin/emails`
   - Toggle "Abandoned Cart" ON
   - Edit subject/body
   - Click "Save All Templates"

6. **Logout** → Sidebar
   - Click "Logout"
   - Redirects to login

---

## 📱 Responsive Test

### Desktop (≥1024px)
- Sidebar always visible
- 4-column stat cards
- Full-width tables

### Mobile (<1024px)
- Hamburger menu (top-left)
- Tap to open sidebar
- Tap overlay to close
- 1-column layout
- Tables scroll horizontally

**Test:** Resize browser window or use DevTools mobile view

---

## 🛠️ Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
Output: `dist/` folder (554KB total, 160KB gzipped)

### Deploy to Vercel
```bash
vercel --prod
```

---

## 📂 File Locations

### Components
```
src/components/Admin.jsx          (Main router)
src/components/admin/*.jsx         (All admin components)
```

### Mock Data
```
src/lib/admin/mockData.js          (Orders, products, emails)
src/lib/admin/types.js             (Type definitions)
```

### Styles
```
src/styles/admin.css               (Tailwind + admin theme)
tailwind.config.js                 (Color palette)
```

---

## 🐛 Troubleshooting

### "Port 3002 in use"
**Solution:** Kill process or use different port:
```bash
# Windows
netstat -ano | findstr :3002
taskkill /PID <PID> /F
```

### Sidebar not showing
**Check:** Window width > 1024px (or open hamburger menu)

### Changes not persisting
**Expected:** All data is client-side only. Refresh resets to mock data.

### Build fails
**Check:** Tailwind CSS v3 installed (not v4):
```bash
npm list tailwindcss
# Should show: tailwindcss@3.x.x
```

---

## 📝 Cheat Sheet

### Admin Actions
```
✅ View orders
✅ Search orders (customer, ID, email)
✅ Filter orders by status
✅ View order details
✅ Add products
✅ Edit products
✅ Delete products
✅ Search products (name, SKU, category)
✅ Toggle email templates
✅ Edit email templates
```

### NOT Implemented (Client-side only)
```
❌ Real backend API
❌ Persistent data storage
❌ Real authentication (JWT)
❌ Image uploads
❌ Email sending
❌ Export to CSV
❌ Analytics charts
```

---

## 🎯 Next Steps

1. **Test locally** → All 4 pages + responsive
2. **Review UI** → Colors, spacing, interactions
3. **Plan backend** → API design, database schema
4. **Deploy demo** → Vercel/Netlify

---

## 📞 Support

**Documentation:**
- `ADMIN_DASHBOARD_README.md` - Full docs
- `ADMIN_TEST_GUIDE.md` - Visual test workflow
- `ADMIN_COMPONENT_TREE.md` - Component hierarchy
- `ADMIN_COMPLETION_SUMMARY.md` - Build report

**Issues:** Check troubleshooting section or rebuild:
```bash
rm -rf node_modules dist
npm install
npm run build
```

---

**Total Setup Time:** <2 minutes  
**Ready to use!** 🎉
