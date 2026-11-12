/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Language, ProductCategory, ProductModel } from './types';
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
import { CataloguePrintPage } from './components/CataloguePrintPage';
import { NotFoundPage } from './components/NotFoundPage';
import { OfficeSection } from './components/OfficeSection';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';
import { RouterContext } from './router';
import {
  Route,
  buildPath,
  parseLocation,
  findProduct,
  homeRoute,
  catalogueRoute,
  installationRoute,
  categoryRoute,
  productRoute,
} from './routing';

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function App({ initialRoute }: { initialRoute: Route }) {
  const [route, setRoute] = useState<Route>(initialRoute);
  const currentLang: Language = route.lang;
  const activeProduct: ProductModel | undefined = route.view === 'product' ? findProduct(route.productId) : undefined;

  const navigate = useCallback((to: Route, opts?: { replace?: boolean; scrollTo?: string }) => {
    const path = buildPath(to) + (opts?.scrollTo ? `#${opts.scrollTo}` : '');
    if (opts?.replace) window.history.replaceState(null, '', path);
    else if (window.location.pathname + window.location.hash !== path) window.history.pushState(null, '', path);
    setRoute(to);
    if (opts?.scrollTo) {
      const id = opts.scrollTo;
      setTimeout(() => scrollToSection(id), 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  // Browser back/forward
  useEffect(() => {
    const onPop = () => setRoute(parseLocation(window.location.pathname, window.location.search));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Old ?category=/?product= links → canonical path; scroll to #section on first load
  useEffect(() => {
    const canonicalPath = buildPath(initialRoute);
    if (initialRoute.view !== 'notfound' && window.location.pathname !== canonicalPath) {
      window.history.replaceState(null, '', canonicalPath + window.location.hash);
    }
    const hash = window.location.hash.slice(1);
    if (hash) setTimeout(() => scrollToSection(hash), 100);
  }, [initialRoute]);

  // Keep <html lang/dir> in sync when switching language in-app
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  // Header / footer navigation by section id
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'categories-page' || sectionId === 'catalogue') return navigate(catalogueRoute(currentLang));
    if (sectionId === 'installation' || sectionId === 'resources' || sectionId === 'installation-videos') {
      return navigate(installationRoute(currentLang));
    }
    if (route.view !== 'home') return navigate(homeRoute(currentLang), { scrollTo: sectionId === 'hero' ? undefined : sectionId });
    scrollToSection(sectionId);
  };

  const setLang = (lang: Language) => navigate({ ...route, lang });
  const openCatalogue = () => navigate(catalogueRoute(currentLang));
  const openInstallation = () => navigate(installationRoute(currentLang));
  const openCategory = (cat: ProductCategory) => navigate(categoryRoute(currentLang, cat));
  const openProduct = (model: ProductModel) => navigate(productRoute(currentLang, model));
  const backToHome = () => navigate(homeRoute(currentLang));
  const backToCategory = () => navigate(categoryRoute(currentLang, route.category));

  const routerValue = useMemo(() => ({ route, navigate }), [route, navigate]);

  if (route.view === 'print') {
    return (
      <RouterContext.Provider value={routerValue}>
        <MediaProvider>
          <CataloguePrintPage currentLang={currentLang} />
        </MediaProvider>
      </RouterContext.Provider>
    );
  }

  return (
    <RouterContext.Provider value={routerValue}>
      <MediaProvider>
        <div className={`min-h-screen bg-[#FAF7F2] text-[#1C1917] flex flex-col font-sans selection:bg-[#9E7241]/20 selection:text-[#1C1917] ${currentLang === 'ar' ? 'rtl' : 'ltr'}`}>
          <SEOHead route={route} />

          <Header currentLang={currentLang} onLanguageChange={setLang} onNavigate={handleNavigate} />

          <main className="flex-1">
            {route.view === 'installation' ? (
              <InstallationResourcesPage
                currentLang={currentLang}
                onSelectCategory={openCategory}
                onBackToHome={backToHome}
                onBackToCatalogue={openCatalogue}
              />
            ) : route.view === 'product' && activeProduct ? (
              <ProductDetailPage
                model={activeProduct}
                currentLang={currentLang}
                onBackToCategory={backToCategory}
                onBackToCatalogue={openCatalogue}
                onBackToHome={backToHome}
                onSelectAnotherModel={openProduct}
              />
            ) : route.view === 'category' ? (
              <CategoryPage
                categoryId={route.category}
                currentLang={currentLang}
                onBack={backToHome}
                onBackToCatalogue={openCatalogue}
                onSelectCategory={openCategory}
                onSelectProduct={openProduct}
                onOpenInstallation={openInstallation}
              />
            ) : route.view === 'catalogue' ? (
              <ProductCataloguePage currentLang={currentLang} onSelectCategory={openCategory} onBackToHome={backToHome} />
            ) : route.view === 'notfound' ? (
              <NotFoundPage currentLang={currentLang} />
            ) : (
              <>
                <Hero
                  currentLang={currentLang}
                  onNavigate={handleNavigate}
                  onSelectCategory={openCategory}
                  onOpenCatalogue={openCatalogue}
                />
                <ProductCategoriesSection currentLang={currentLang} onSelectCategory={openCategory} />
                <FounderSection currentLang={currentLang} onNavigate={handleNavigate} />
                <AboutUsSection currentLang={currentLang} onNavigate={handleNavigate} />
                <OfficeSection currentLang={currentLang} />
              </>
            )}
          </main>

          <WhatsAppFloatingButton currentLang={currentLang} />

          <Footer currentLang={currentLang} onLanguageChange={setLang} onNavigate={handleNavigate} />
        </div>
      </MediaProvider>
    </RouterContext.Provider>
  );
}
