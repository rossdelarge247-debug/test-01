import { useTheme } from '../../context/ThemeContext';
import { THEMES } from '../../data/themes';

export function ThemeToggle() {
  const { themeId, setThemeId } = useTheme();

  return (
    <div className="flex items-center gap-1 pl-2 sm:pl-3 border-l border-gray-100">
      {THEMES.map((theme) => {
        const isActive = themeId === theme.id;
        return (
          <button
            key={theme.id}
            onClick={() => setThemeId(theme.id)}
            title={`Switch to ${theme.name} theme`}
            aria-label={`${theme.name} theme${isActive ? ' (active)' : ''}`}
            aria-pressed={isActive}
            className={`w-6 h-6 rounded-full transition-all duration-150 ring-2 ${
              isActive
                ? 'ring-gray-400 ring-offset-2 scale-110'
                : 'ring-transparent hover:ring-gray-300 hover:ring-offset-1 hover:scale-105'
            }`}
            style={{ backgroundColor: theme.dot }}
          />
        );
      })}
    </div>
  );
}
