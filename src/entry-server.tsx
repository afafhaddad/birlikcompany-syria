/** Server entry used only at build time to pre-render every page to static HTML. */
import { renderToString } from 'react-dom/server';
import App from './App';
import { Route, allRoutes, buildPath, LANGS, MAIN_CATEGORIES, SITE_ORIGIN } from './routing';
import { getSeo } from './seo';
import { PRODUCT_MODELS } from './data/products';
import { registerArticleContent } from './data/articles';
import { ARTICLES_AR } from './data/articles.ar';
import { ARTICLES_EN } from './data/articles.en';
import { ARTICLES_TR } from './data/articles.tr';

// Pre-rendering needs every guide in full
registerArticleContent('ar', ARTICLES_AR);
registerArticleContent('en', ARTICLES_EN);
registerArticleContent('tr', ARTICLES_TR);

export function render(route: Route): string {
  return renderToString(<App initialRoute={route} />);
}

export { allRoutes, buildPath, getSeo, LANGS, MAIN_CATEGORIES, SITE_ORIGIN, PRODUCT_MODELS };
