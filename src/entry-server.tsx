/** Server entry used only at build time to pre-render every page to static HTML. */
import { renderToString } from 'react-dom/server';
import App from './App';
import { Route, allRoutes, buildPath, LANGS, MAIN_CATEGORIES, SITE_ORIGIN } from './routing';
import { getSeo } from './seo';
import { PRODUCT_MODELS } from './data/products';

export function render(route: Route): string {
  return renderToString(<App initialRoute={route} />);
}

export { allRoutes, buildPath, getSeo, LANGS, MAIN_CATEGORIES, SITE_ORIGIN, PRODUCT_MODELS };
