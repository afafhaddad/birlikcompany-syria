/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, ProductCategory, ProductModel, AppView } from './types';
import { MediaProvider } from './context/MediaContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCategoriesSection } from './components/ProductCategoriesSection';
import { FounderSection } from './components/FounderSection';
import { AboutUsSection } from './components/AboutUsSection';
import { ProductCataloguePage } from './components/ProductCataloguePage';
import { CategoryPage } from './components/CategoryPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { InstallationResourcesPage } from './components/InstallationResourcesPage';
import { OfficeSection } from './components/OfficeSection';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';
import { PRODUCT_MODELS, CATEGORIES_DATA } from './data/products';

interface InitialRoute {
  view: AppView;
  category: ProductCategory;
  product: ProductModel | null;
}

function resolveInitialRoute(): InitialRoute {
  const route: InitialRoute = { view: 'home', category: 'ps_wood', product: null };
  if (typeof window === 'undefined') return route;

  const params = new URLSearchParams(window.location.search);

  const pageParam = params.get('page');
  const categoryParam = params.get('category');
  const productParam = params.get('product');
  const validCategory = categoryParam && CATEGORIES_DATA.some((c) => c.id === categoryParam)
    ? (categoryParam as ProductCategory)
    : null;

  if (productParam) {
    const foundProduct = PRODUCT_MODELS.find(
      (m) => m.id === productParam || m.code.toLowerCase() === productParam.toLowerCase()
    );
    if (foundProduct) {
      route.product = foundProduct;
      route.category = validCategory || (foundProduct.category as ProductCategory) || route.category;
      route.view = 'product';
      return route;
    }
  }

  if (validCategory) {
    route.category = validCategory;
    route.view = 'category';
    return route;
  }

  if (pageParam === 'catalogue') route.view = 'catalogue';
  else if (pageParam === 'installation') route.view = 'installation';

  return route;
}

export default function App() {
  // Default language is Arabic with toggles for English and Turkish
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  
  // Page Routing State — resolved synchronously from the URL on first render so that
  // deep links (?page=, ?category=, ?product=) survive before SEOHead rewrites the URL.
  const [initialRoute] = useState(() => resolveInitialRoute());
  const [currentView, setCurrentView] = useState<AppView>(initialRoute.view);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(initialRoute.category);
  const [activeProduct, setActiveProduct] = useState<ProductModel | null>(initialRoute.product);

  // Sync HTML document direction and language code
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  // Handle header / footer navigation
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'categories-page' || sectionId === 'catalogue') {
      setCurrentView('catalogue');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'installation' || sectionId === 'resources' || sectionId === 'installation-videos') {
      setCurrentView('installation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Navigations
  const handleOpenCatalogue = () => {
    setCurrentView('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCategory = (cat: ProductCategory) => {
    setActiveCategory(cat);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProduct = (model: ProductModel) => {
    setActiveProduct(model);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalogue = () => {
    setCurrentView('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCategory = () => {
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MediaProvider>
      <div className={`min-h-screen bg-[#FAF7F2] text-[#1C1917] flex flex-col font-sans selection:bg-[#9E7241]/20 selection:text-[#1C1917] ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
        
        {/* Dynamic SEO, OpenGraph & Schema.org Metadata Management */}
        <SEOHead
          currentView={currentView}
          currentLang={currentLang}
          activeCategory={activeCategory}
          activeProduct={activeProduct}
        />

        {/* Sticky Top Header */}
        <Header
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          onNavigate={handleNavigate}
        />

        {/* Main Content Area Routing */}
        <main className="flex-1">
          {/* 1. Product Installation Resources & Video Walkthroughs */}
          {currentView === 'installation' ? (
            <InstallationResourcesPage
              currentLang={currentLang}
              onSelectCategory={handleOpenCategory}
              onBackToHome={handleBackToHome}
              onBackToCatalogue={handleBackToCatalogue}
            />
          ) : currentView === 'product' && activeProduct ? (
            /* 2. Designated Product Page */
            <ProductDetailPage
              model={activeProduct}
              currentLang={currentLang}
              onBackToCategory={handleBackToCategory}
              onBackToCatalogue={handleBackToCatalogue}
              onBackToHome={handleBackToHome}
              onSelectAnotherModel={handleOpenProduct}
            />
          ) : currentView === 'category' ? (
            /* 2. Designated Category Page with Category Descriptions and Product Carousel */
            <CategoryPage
              categoryId={activeCategory}
              currentLang={currentLang}
              onBack={handleBackToHome}
              onBackToCatalogue={handleBackToCatalogue}
              onSelectCategory={handleOpenCategory}
              onSelectProduct={handleOpenProduct}
              onOpenInstallation={() => {
                setCurrentView('installation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : currentView === 'catalogue' ? (
            /* 3. Product Categories Catalogue Page with Carousel-like Cards & Exact Descriptions */
            <ProductCataloguePage
              currentLang={currentLang}
              onSelectCategory={handleOpenCategory}
              onBackToHome={handleBackToHome}
            />
          ) : (
            /* 4. Homepage */
            <>
              {/* Architectural Hero */}
              <Hero
                currentLang={currentLang}
                onNavigate={handleNavigate}
                onSelectCategory={handleOpenCategory}
                onOpenCatalogue={handleOpenCatalogue}
              />

              {/* Edge-to-edge Horizontal Category Cards on Homepage */}
              <ProductCategoriesSection
                currentLang={currentLang}
                onSelectCategory={handleOpenCategory}
              />

              {/* Our Founder Section */}
              <FounderSection
                currentLang={currentLang}
                onNavigate={handleNavigate}
              />

              {/* About Us Section */}
              <AboutUsSection
                currentLang={currentLang}
                onNavigate={handleNavigate}
              />

              {/* Headquarters & Consultation Section */}
              <OfficeSection
                currentLang={currentLang}
              />
            </>
          )}
        </main>

        {/* Floating WhatsApp Action */}
        <WhatsAppFloatingButton currentLang={currentLang} />

        {/* Minimal Sleek Footer */}
        <Footer
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          onNavigate={handleNavigate}
        />

      </div>
    </MediaProvider>
  );
}
