/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Language, ProductModel } from './types';
import { MediaProvider } from './context/MediaContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCategoriesSection } from './components/ProductCategoriesSection';
import { FounderSection } from './components/FounderSection';
import { AboutUsSection } from './components/AboutUsSection';
import { ProductCataloguePage } from './components/ProductCataloguePage';
import { CategoryPage } from './components/CategoryPage';
import { ProductDetailPage, productPriceMessage } from './components/ProductDetailPage';
import { InstallationResourcesPage } from './components/InstallationResourcesPage';
import { CataloguePrintPage } from './components/CataloguePrintPage';
import { NotFoundPage } from './components/NotFoundPage';
import { OfficeSection } from './components/OfficeSection';
import { MobileTabBar, DesktopWhatsApp } from './components/MobileTabBar';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';
import { RouterContext } from './router';
import { Route, buildPath, parseLocation, findProduct, homeRoute, catalogueRoute, installationRoute } from './routing';
import { UI, whatsappLink } from './site';

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
      setTimeout(() => scrollToSection(id), 80);
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
    if (hash) setTimeout(() => scrollToSection(hash), 120);
  }, [initialRoute]);

  // Keep <html lang/dir> in sync when switching language in-app
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  // Scroll-reveal: fade sections in as they enter the viewport
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [route]);

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

  // WhatsApp button: on a product page it asks for that product's price
  const whatsappHref = whatsappLink(activeProduct ? productPriceMessage(activeProduct, currentLang) : UI.generalWhatsApp[currentLang]);
  const whatsappLabel = activeProduct ? UI.askPrice[currentLang] : UI.whatsapp[currentLang];

  return (
    <RouterContext.Provider value={routerValue}>
      <MediaProvider>
        <div className="min-h-screen bg-ivory text-ink flex flex-col font-sans selection:bg-brass/25">
          <SEOHead route={route} />

          <Header currentLang={currentLang} onLanguageChange={setLang} onNavigate={handleNavigate} />

          <main className="flex-1">
            {route.view === 'installation' ? (
              <InstallationResourcesPage currentLang={currentLang} />
            ) : route.view === 'product' && activeProduct ? (
              <ProductDetailPage model={activeProduct} currentLang={currentLang} />
            ) : route.view === 'category' ? (
              <CategoryPage categoryId={route.category} currentLang={currentLang} />
            ) : route.view === 'catalogue' ? (
              <ProductCataloguePage currentLang={currentLang} />
            ) : route.view === 'notfound' ? (
              <div className="pt-16 md:pt-[4.5rem]">
                <NotFoundPage currentLang={currentLang} />
              </div>
            ) : (
              <>
                <Hero currentLang={currentLang} onNavigate={handleNavigate} />
                <ProductCategoriesSection currentLang={currentLang} />
                <FounderSection currentLang={currentLang} />
                <AboutUsSection currentLang={currentLang} />
                <OfficeSection currentLang={currentLang} />
              </>
            )}
          </main>

          <Footer currentLang={currentLang} onLanguageChange={setLang} onNavigate={handleNavigate} />

          {/* Space for the fixed bottom bar on phones */}
          <div className="md:hidden h-16 bg-[#1F1B18] pb-safe box-content" aria-hidden="true" />

          <MobileTabBar currentLang={currentLang} whatsappHref={whatsappHref} whatsappLabel={whatsappLabel} />
          <DesktopWhatsApp href={whatsappHref} label={whatsappLabel} />
        </div>
      </MediaProvider>
    </RouterContext.Provider>
  );
}
