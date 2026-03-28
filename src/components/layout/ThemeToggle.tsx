import { useTheme } from '../../context/ThemeContext';
import { THEMES } from '../../data/themes';

export function ThemeToggle() {
  const { themeId, setThemeId } = useTheme();

  return (
    <div className="flex items-center gap-1.5 pl-3 border-l border-gray-100">
      <span className="text-[10px] font-medium text-gray-300 uppercase tracking-wider select-none">
        Style
      </span>
      <div className="flex items-center gap-0.5 p-0.5 bg-gray-100 rounded-lg">
        {THEMES.map((theme) => {
          const isActive = themeId === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => setThemeId(theme.id)}
              title={theme.description}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-white shadow-sm text-gray-800'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0 ring-1 ring-black/10"
                style={{ backgroundColor: theme.dot }}
              />
              {theme.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
