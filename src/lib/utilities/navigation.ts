export function navigationPathFromHref(href: string): string | null {
  if (!href.startsWith("/")) {
    return null;
  }

  return href.split(/[?#]/, 1)[0] || "/";
}

export function isNavigationHrefCurrent(
  pathname: string,
  href: string,
): boolean {
  const targetPath = navigationPathFromHref(href);

  if (!targetPath) {
    return false;
  }

  if (targetPath === "/") {
    return pathname === "/";
  }

  return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
}
