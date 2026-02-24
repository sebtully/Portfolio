export function ThemeScript() {
  const script = `
    (() => {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = stored ? stored === 'dark' : prefersDark;
      document.documentElement.classList.toggle('dark', isDark);
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
