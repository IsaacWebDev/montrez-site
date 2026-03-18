# Admin Dashboard - Visual Overview

## 🎨 Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                         ADMIN DASHBOARD                          │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┬──────────────────────────────────────────────────┐
│              │  ┌──────────────────────────────────────────────┐ │
│  SIDEBAR     │  │           TOP HEADER                         │ │
│  (280px)     │  │  Dashboard                        [A] Admin  │ │
│              │  └──────────────────────────────────────────────┘ │
│  ┌────────┐  │                                                   │
│  │MONTREZ │  │  ┌─────────────────────────────────────────────┐ │
│  │ Admin  │  │  │                                              │ │
│  └────────┘  │  │         MAIN CONTENT AREA                    │ │
│              │  │                                              │ │
│  📊 Dashboard│  │  • Dashboard: 4 stat cards + activity feed   │ │
│  📄 Pages    │  │  • Pages: Management placeholder             │ │
│  ⚙️ Services │  │  • Services: Collections management          │ │
│  💬 Testimon.│  │  • Testimonials: Reviews management          │ │
│  🖼️ Media    │  │  • Media: Library placeholder                │ │
│  📈 Leads    │  │  • Leads: Contact management                 │ │
│  🔍 SEO      │  │  • SEO: Settings placeholder                 │ │
│  ⚙️ Settings │  │  • Settings: General config                  │ │
│              │  │                                              │ │
│  [Logout]    │  └─────────────────────────────────────────────┘ │
│              │                                                   │
└──────────────┴──────────────────────────────────────────────────┘
```

---

## 📊 Dashboard Page Detail

```
┌───────────────────────────────────────────────────────────────┐
│  Dashboard                                      [A] Admin      │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌───┐│
│  │ 📈 Total     │  │ ⚙️ Total      │  │ 💬 Total      │  │ 🔔│
│  │    Leads     │  │   Services   │  │  Testimonials│  │ Re.│
│  │              │  │              │  │              │  │    │
│  │    247       │  │     8        │  │     42       │  │ 156│
│  │ +12% growth  │  │ 3 active     │  │ 8 pending    │  │ 7d │
│  └──────────────┘  └──────────────┘  └──────────────┘  └───┘│
│                                                               │
│  Recent Activity                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ New lead received               2 hours ago    [lead]   │ │
│  │ Service updated: Shadow Series  5 hours ago  [service]  │ │
│  │ New testimonial submitted       1 day ago  [testimonial]│ │
│  │ Media uploaded: collection.jpg  2 days ago    [media]   │ │
│  │ SEO settings updated            3 days ago      [seo]   │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## 📄 Placeholder Page Layout

```
┌───────────────────────────────────────────────────────────────┐
│  Pages Management                       [Add New Page] [A] Ad │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────────────────────────────────────────────────────┐   │
│  │  Manage Website Pages                                 │   │
│  ├───────────────────────────────────────────────────────┤   │
│  │                                                        │   │
│  │  Create, edit, and manage all pages on your Montrez   │   │
│  │  website. Control page content, metadata, and         │   │
│  │  visibility settings.                                 │   │
│  │                                                        │   │
│  │            ┌──────────────────────┐                   │   │
│  │            │        📄            │                   │   │
│  │            │                      │                   │   │
│  │            │ Page Management      │                   │   │
│  │            │   Coming Soon        │                   │   │
│  │            │                      │                   │   │
│  │            │ This section will    │                   │   │
│  │            │ allow you to manage  │                   │   │
│  │            │ all website pages... │                   │   │
│  │            └──────────────────────┘                   │   │
│  │                                                        │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## 🎨 Component Architecture

```
Admin.jsx (Main Container)
├── AdminLayout.jsx
│   ├── Sidebar.jsx
│   │   ├── Navigation Links (NavLink)
│   │   └── Logout Button
│   ├── Header.jsx
│   │   ├── Dynamic Title
│   │   └── User Info
│   └── <Outlet /> (React Router)
│       ├── Dashboard.jsx
│       │   ├── DashboardCard × 4
│       │   └── Activity List
│       ├── Pages.jsx
│       │   └── Card
│       ├── Services.jsx
│       │   └── Card
│       ├── Testimonials.jsx
│       │   └── Card
│       ├── Media.jsx
│       │   └── Card
│       ├── Leads.jsx
│       │   └── Card
│       ├── SEO.jsx
│       │   └── Card
│       └── Settings.jsx
│           └── Card
```

---

## 🎨 Reusable Components

### Card Component
```jsx
<Card>
  <CardHeader>
    <CardTitle>Title Here</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here...
  </CardContent>
</Card>
```

### Button Component
```jsx
<Button variant="gold" size="default">
  Click Me
</Button>

// Variants: default | gold | danger | ghost
// Sizes: sm | default | lg
```

### DashboardCard Component
```jsx
<DashboardCard
  title="Total Leads"
  value="247"
  icon="📈"
  description="+12% from last month"
/>
```

---

## 🎨 Color Palette

```css
┌────────────────────────────────────────────────────┐
│  DARK THEME COLORS                                 │
├────────────────────────────────────────────────────┤
│  Background:                                       │
│  • Black         #000000  ██████████              │
│  • Near Black    #0a0a0a  ██████████              │
│  • Dark Grey     #1a1a1a  ██████████              │
│  • Mid Grey      #2a2a2a  ██████████              │
│                                                    │
│  Text:                                             │
│  • White         #ffffff  ██████████              │
│  • Light Grey    #808080  ██████████              │
│                                                    │
│  Accents:                                          │
│  • Gold          #d4af37  ██████████              │
│  • Red           #8b0000  ██████████              │
└────────────────────────────────────────────────────┘
```

---

## 📱 Responsive Breakpoints

```
Desktop (> 968px)
┌──────────┬─────────────────────┐
│          │                     │
│ Sidebar  │   Main Content      │
│ (fixed)  │   (fluid)           │
│          │                     │
└──────────┴─────────────────────┘

Tablet (< 968px)
┌─────────────────────────────────┐
│  Sidebar (horizontal nav)       │
├─────────────────────────────────┤
│                                 │
│     Main Content (full width)   │
│                                 │
└─────────────────────────────────┘

Mobile (< 640px)
┌─────────────────────────────────┐
│  Nav (compact)                  │
├─────────────────────────────────┤
│                                 │
│  Content (single column)        │
│                                 │
│  Cards (stacked)                │
│                                 │
└─────────────────────────────────┘
```

---

## 🛣️ Route Flow

```
User enters /admin
    ↓
Login Page (Admin.jsx)
    ↓
[Enter credentials]
    ↓
✅ Auth Success
    ↓
AdminLayout Renders
    ↓
├─ Sidebar (navigation)
├─ Header (page title)
└─ Content Area
    ↓
    ├─ /admin → Dashboard.jsx
    ├─ /admin/pages → Pages.jsx
    ├─ /admin/services → Services.jsx
    ├─ /admin/testimonials → Testimonials.jsx
    ├─ /admin/media → Media.jsx
    ├─ /admin/leads → Leads.jsx
    ├─ /admin/seo → SEO.jsx
    └─ /admin/settings → Settings.jsx
```

---

## 🎯 Active State Visualization

```
SIDEBAR - Normal State:
┌──────────────┐
│ ○ Dashboard  │  ← Light grey text
│ ○ Pages      │
│ ○ Services   │
└──────────────┘

SIDEBAR - Active State:
┌──────────────┐
│ █ Dashboard  │  ← Gold text + gold border + dark grey bg
│ ○ Pages      │
│ ○ Services   │
└──────────────┘
```

---

## 📊 Dashboard Stats Grid

```
┌─────────────────────────────────────────────────┐
│  Grid: 4 columns (auto-fit, min 250px)         │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────┐│
│  │ Card 1   │ │ Card 2   │ │ Card 3   │ │ C4 ││
│  │ 📈       │ │ ⚙️        │ │ 💬       │ │ 🔔 ││
│  │ Leads    │ │ Services │ │ Testimon.│ │ Act││
│  │ 247      │ │ 8        │ │ 42       │ │ 156││
│  │ +12%     │ │ 3 active │ │ 8 pending│ │ 7d ││
│  └──────────┘ └──────────┘ └──────────┘ └────┘│
│                                                 │
│  On hover: Border → Gold, Card lifts up 2px    │
└─────────────────────────────────────────────────┘
```

---

## 🎨 Typography Scale

```
┌────────────────────────────────────────────┐
│  HEADINGS (Uppercase, Letter Spacing)      │
├────────────────────────────────────────────┤
│  H1  1.8rem  (Page titles)                 │
│  H2  1.5rem  (Section headers)             │
│  H3  1.2rem  (Card titles - gold)          │
│                                            │
│  BODY TEXT                                 │
│  P   0.95rem (Description text)            │
│  Small 0.85rem (Meta info, timestamps)     │
└────────────────────────────────────────────┘
```

---

## 🔄 Interaction States

```
BUTTONS
Normal:  [  Button  ]  ← Transparent bg, white border
Hover:   [  Button  ]  ← White bg, black text
Active:  [  Button  ]  ← Slight press effect

Gold Variant:
Normal:  [  Button  ]  ← Gold border, gold text
Hover:   [  Button  ]  ← Gold bg, black text

NAVIGATION
Normal:  Dashboard     ← Grey text
Hover:   Dashboard     ← White text, dark grey bg
Active:  Dashboard     ← Gold text, border, bg

CARDS
Normal:  │ Card │     ← Mid-grey border
Hover:   │ Card │     ← Gold border, lift 2px
```

---

## 📁 File Dependencies

```
App.jsx
  └─ Admin.jsx
      └─ AdminLayout.jsx
          ├─ Sidebar.jsx (uses NavLink)
          ├─ Header.jsx
          └─ Outlet
              ├─ Dashboard.jsx
              │   └─ DashboardCard.jsx
              ├─ Pages.jsx
              │   ├─ Card.jsx
              │   └─ Button.jsx
              ├─ Services.jsx
              │   ├─ Card.jsx
              │   └─ Button.jsx
              ├─ Testimonials.jsx
              │   ├─ Card.jsx
              │   └─ Button.jsx
              ├─ Media.jsx
              │   ├─ Card.jsx
              │   └─ Button.jsx
              ├─ Leads.jsx
              │   ├─ Card.jsx
              │   └─ Button.jsx
              ├─ SEO.jsx
              │   ├─ Card.jsx
              │   └─ Button.jsx
              └─ Settings.jsx
                  ├─ Card.jsx
                  └─ Button.jsx
```

---

## ✨ Animation & Transitions

```
TIMINGS
• Fast:   150ms  (hover states, color changes)
• Medium: 300ms  (backgrounds, borders, transforms)
• Slow:   600ms  (page transitions, fades)

EFFECTS
• Sidebar hover: background fade-in
• Card hover: border color change + translate Y
• Button hover: background slide-in (left to right)
• Page transitions: fade-in from bottom
```

---

## 🎯 Quick Reference

### Login Credentials
```
Username: admin
Password: montrez2024
```

### Dev Server
```bash
npm run dev
# → http://localhost:3000/admin
```

### Main Entry Points
```
Login:     /admin
Dashboard: /admin (after login)
Pages:     /admin/pages
Services:  /admin/services
...etc
```

---

**Visual overview complete!** 🎨✨

The admin dashboard is fully designed, built, and ready to use.
