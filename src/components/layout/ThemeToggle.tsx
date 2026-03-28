import { useTheme } from '../../context/ThemeContext';
import { THEMES } from '../../data/themes';

export function ThemeToggle() {
  const { themeId, setThemeId } = useTheme();

  return (
    <div className="flex items-center gap-1.5 pl-3 border-l border-gray-100">
      <div className="flex items-center gap-1.5">
        {THEMES.map((theme) => {
          const isActive = themeId === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => setThemeId(theme.id)}
              title={theme.name}
              className={`w-4 h-4 rounded-full transition-all duration-150 ring-2 ${
                isActive
                  ? 'ring-gray-400 ring-offset-1'
                  : 'ring-transparent hover:ring-gray-200 hover:ring-offset-1'
              }`}
              style={{ backgroundColor: theme.dot }}
            />
          );
        })}
      </div>
    </div>
  );
}
