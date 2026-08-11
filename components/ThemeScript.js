/* Runs before paint to set the theme with no flash of the wrong colors.
   Uses the saved preference, else the OS preference. */
export default function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('fw:theme');if(t){t=JSON.parse(t);}if(t!=='light'&&t!=='dark'){t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
