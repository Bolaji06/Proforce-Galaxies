# useID - User Directory Application

> **Frontend Coding Challenge for Proforce Galaxies**  
> Built with Next.js 16, React 19, TypeScript, Tailwind CSS, Redux Toolkit (RTK Query), and TanStack Virtual.

---

## 🎨 Overview & Figma Alignment

This application is a responsive, dark-mode user directory based on the provided Figma design file:
- **MacBook Air - 1 Desktop View**: Left sidebar navigation (`useID`, Dashboard, Users [active], Vouchers, Analytics, Spotlight), top search and user controls, title header with `+ Add new` button, search bar with grid/list view switcher, and a 3-column card grid.
- **Pop up View (User Details)**: Centered user profile modal with large avatar, purple highlighted name tag, email, and detailed rows for Phone, Location, and Date of Birth.
- **Add Details Modal**: Clean user entry modal allowing creation of new users with `Name`, `Location`, and `Date of Birth` fields and a prominent `Save` button.
- **Mobile View**: Responsive drawer sidebar, compact search and directory layout, single-column card stack, and mobile-optimized modal dialogs.

---

## 🚀 Features

1. **Redux Toolkit & RTK Query**:
   - `getUsers`: Fetches all directory users from `https://687124747ca4d06b34b97d3d.mockapi.io/api/userId`.
   - `getUserById`: Fetches specific user details on-demand when opening the User Details modal.
   - `createUser`: Dispatches a `POST` request with automated tag invalidation (`providesTags: ['Users']`, `invalidatesTags: ['Users']`) so the directory updates instantly upon saving a user.
   - Built-in loading skeleton cards and resilient error state with **Retry API Call** button.

2. **List & Grid Virtualization**:
   - Implemented via `@tanstack/react-virtual`.
   - Smooth 60 FPS scrolling regardless of dataset size by dynamically windowing visible card rows.
   - Responsive virtualization dynamically recomputes column counts (3 columns on desktop, 2 on tablet, 1 on mobile).

3. **Search & Filter**:
   - Instant client-side search filtering by user name.
   - Dual search support (directory filter bar & top header search).
   - Clear query button (`✕`) and live user counter (`Showing X users`).

4. **View Switching**:
   - Toggle seamlessly between **Grid View** (3x3 card layout with avatars) and **List View** (compact rows with inline metadata).

5. **User Experience & Fallbacks**:
   - Graceful avatar fallback (initials badge) for any broken/missing profile picture URLs.
   - Keyboard accessibility (close modals with `Escape` key, autofocus).
   - Backdrop click to dismiss modals.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)
- **State Management & Data Fetching**: [Redux Toolkit (RTK Query)](https://redux-toolkit.js.org/)
- **Virtualization**: [@tanstack/react-virtual](https://tanstack.com/virtual/latest)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📦 Project Structure

```
my-app/
├── app/
│   ├── globals.css         # Dark theme & custom scrollbar styles
│   ├── layout.tsx          # Root layout with Geist fonts & dark theme
│   ├── page.tsx            # Main user directory page
│   └── challenge.md        # Problem statement & challenge brief
├── components/
│   ├── StoreProvider.tsx   # Client Redux store provider wrapper
│   ├── Sidebar.tsx         # Left sidebar navigation (useID branding)
│   ├── Header.tsx          # Top navbar (search, notifications, profile)
│   ├── UserCard.tsx        # Individual user card (grid & list variants)
│   ├── UserDetailsModal.tsx# Pop up view modal (Figma matching)
│   ├── AddUserModal.tsx    # "Enter User Details" creation modal
│   ├── VirtualUserGrid.tsx # TanStack Virtual grid/list virtualizer
│   ├── SkeletonLoader.tsx  # Shimmer loading skeleton placeholders
│   └── ErrorState.tsx      # Error screen with retry action
├── lib/
│   ├── types/
│   │   └── user.ts         # User & CreateUserDto TypeScript interfaces
│   └── store/
│       ├── api/
│       │   └── userApi.ts  # RTK Query service endpoints
│       ├── store.ts        # Redux store configuration
│       └── hooks.ts        # Typed Redux useDispatch / useSelector hooks
└── package.json
```

---

## 💻 Getting Started Locally

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm run start
```

---

## 📝 Assumptions Made

1. **Email & Avatar for New Users**:
   - The Figma `Add details` modal collects `Name`, `Location`, and `Date of Birth` (`dob`).
   - In accordance with the MockAPI schema, an automated email address (`firstname.lastname@example.com`) and random avatar portrait from the same faker CDN dataset are generated when submitting the form to ensure new users render with consistent avatars in the directory.
2. **Avatar Image Fallback**:
   - Some legacy mock records in MockAPI may have expired image URLs; an automatic initials avatar badge with smooth background is rendered on `onError` to maintain clean aesthetics.
3. **Data Re-validation**:
   - Redux Toolkit Query's cache tags are used so that upon adding a user, the list cache is automatically invalidated and refreshed from the API without requiring a manual page reload.
