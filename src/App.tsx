/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, ProductCategory, ProductModel, AppView } from './types';
import { MediaProvider } from './context/MediaContext';
import { AdminBar } from './components/AdminBar';
import { AdminLoginModal } from './components/AdminLoginModal';
import { MediaLibraryModal } from './components/MediaLibraryModal';
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
import { PRODUCT_MODELS } from './data/products';

export default function App() {
  // Default language is Arabic with toggles for English and Turkish
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  
  // Page Routing State
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('ps_wood');
  const [activeProduct, setActiveProduct] = useState<ProductModel | null>(null);

  // Admin login modal state
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Sync HTML document direction and language code
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  // Check for deep links and ?admin parameter in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('admin') || window.location.hash === '#admin') {
      setIsAdminLoginOpen(true);
    }

    const pageParam = params.get('page');
    const categoryParam = params.get('category') as ProductCategory | null;
    const productParam = params.get('product');

    if (productParam) {
      const foundProduct = PRODUCT_MODELS.find(
        (m) => m.id === productParam || m.code.toLowerCase() === productParam.toLowerCase()
      );
      if (foundProduct) {
        setActiveProduct(foundProduct);
        if (categoryParam) setActiveCategory(categoryParam);
        setCurrentView('product');
        return;
      }
    }

    if (categoryParam) {
      setActiveCategory(categoryParam);
      setCurrentView('category');
      return;
    }

    if (pageParam === 'catalogue') {
      setCurrentView('catalogue');
    } else if (pageParam === 'installation') {
      setCurrentView('installation');
    }
  }, []);

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

        {/* Discrete Admin Bar (Only visible when admin is logged in) */}
        <AdminBar currentLang={currentLang} />

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
          onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        />

        {/* Admin Login Dialog */}
        <AdminLoginModal
          isOpen={isAdminLoginOpen}
          onClose={() => setIsAdminLoginOpen(false)}
          currentLang={currentLang}
        />

        {/* Full Drag & Drop Media Library Modal (Admin Only) */}
        <MediaLibraryModal currentLang={currentLang} />

      </div>
    </MediaProvider>
  );
}
