import React, { createContext, useContext } from 'react';
import { Route, buildPath } from './routing';

interface RouterContextValue {
  route: Route;
  navigate: (to: Route, opts?: { replace?: boolean; scrollTo?: string }) => void;
}

export const RouterContext = createContext<RouterContextValue>({
  route: { lang: 'ar', view: 'home', category: 'ps_wood' },
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: Route;
  /** Optional element id to scroll to after navigating (home page sections). */
  scrollTo?: string;
}

/**
 * A real <a href> (crawlable, shareable, opens in new tab with ctrl/middle click)
 * that navigates in-app without a full page reload on a normal click.
 */
export const Link: React.FC<LinkProps> = ({ to, scrollTo, onClick, children, ...rest }) => {
  const { navigate } = useRouter();
  const href = buildPath(to) + (scrollTo ? `#${scrollTo}` : '');
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to, { scrollTo });
      }}
      {...rest}
    >
      {children}
    </a>
  );
};
