export function SiteLogo() {
  return (
    <svg
      aria-hidden="true"
      className="site-logo"
      focusable="false"
      height="32"
      viewBox="0 0 300 300"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Hehehai</title>
      <use href="/favicon.svg#logo-surface" />
      <use
        className="logo-bracket logo-bracket-left"
        href="/favicon.svg#logo-left"
      />
      <use
        className="logo-bracket logo-bracket-right"
        href="/favicon.svg#logo-right"
      />
    </svg>
  );
}
