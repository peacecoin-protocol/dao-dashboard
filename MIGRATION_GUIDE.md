# React Router to Next.js Migration Guide

This document outlines the complete migration from React Router to Next.js routing.

## ✅ Completed Changes

### 1. Navigation Hooks
- **File:** `src/hooks/use-check-active-nav.tsx`
- **Change:** Replaced `useLocation` from React Router with `usePathname` from Next.js
- **Added:** `'use client'` directive

### 2. Navigation Components
- **File:** `src/components/nav.tsx`
- **Change:** Replaced React Router `Link` with Next.js `Link` (aliased as `NextLink`)
- **Added:** `'use client'` directive

- **File:** `src/components/sidebar-nav.tsx`
- **Change:** Replaced `useLocation` and `useNavigate` with `usePathname` and `useRouter`
- **Added:** `'use client'` directive

- **File:** `src/components/user-nav.tsx`
- **Change:** Replaced React Router `Link` and `useLocation` with Next.js equivalents
- **Added:** `'use client'` directive

### 3. Error Pages
- **File:** `src/app/(for-users)/[locale]/errors/unauthorised-error.tsx`
- **Change:** Replaced `useNavigate` with `useRouter`
- **Added:** `'use client'` directive

- **File:** `src/app/(for-users)/[locale]/errors/general-error.tsx`
- **Change:** Replaced `useNavigate` with `useRouter`
- **Added:** `'use client'` directive

### 4. Page Components
- **File:** `src/app/(for-users)/[locale]/pce/detail/page.tsx`
- **Change:** Replaced React Router location state with sessionStorage
- **Replaced:** `useLocation` and `useNavigate` with `useRouter` and `useSearchParams`

### 5. Core Configuration
- **File:** `src/app/router.tsx`
- **Action:** ❌ DELETED - React Router configuration no longer needed

- **File:** `src/app/providers.tsx`
- **Change:** Removed React Router `RouterProvider` and router import
- **Result:** Clean providers setup with only Wagmi, TanStack Query, and RainbowKit

## 🔧 Next Steps

### 1. Remove Dependencies
```bash
npm uninstall react-router-dom
npm uninstall @types/react-router-dom  # if installed
```

### 2. Update package.json
Remove any React Router related dependencies from your package.json

### 3. Test Navigation
- Verify all navigation links work correctly
- Test language switching functionality
- Confirm error pages display properly
- Check that all routes resolve correctly

## 🚀 Benefits Achieved

1. **SSR Compatibility:** Fixed "document is not defined" errors
2. **Performance:** Better Next.js integration and optimization
3. **SEO:** Improved search engine optimization capabilities
4. **Maintainability:** Cleaner, more consistent routing architecture
5. **Developer Experience:** Better debugging and development tools

## ⚠️ Breaking Changes

1. **Navigation State:** Data passing between pages now uses sessionStorage instead of router state
2. **Link Behavior:** All links now follow Next.js Link behavior (client-side navigation)
3. **URL Structure:** Routes follow Next.js App Router file-based conventions

## 🧪 Testing Checklist

- [ ] Home page loads correctly
- [ ] Navigation menu works
- [ ] Language switching functions
- [ ] Error pages display properly
- [ ] All internal links navigate correctly
- [ ] No console errors related to routing
- [ ] SSR works without "document is not defined" errors

## 📚 References

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Next.js Navigation](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating)
- [Migrating from React Router](https://nextjs.org/docs/pages/building-your-application/upgrading/from-react-router)