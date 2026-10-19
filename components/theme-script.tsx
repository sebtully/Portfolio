export function ThemeScript() {
  const script = `
    (() => {
      const stored = localStorage.getItem('theme');
      const isDark = stored === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
