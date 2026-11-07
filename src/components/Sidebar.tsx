import { BrainLogo } from './Logo';
import {
  AccountIcon,
  BookmarkIcon,
  GraphIcon,
  HomeIcon,
  SettingsIcon,
} from './icons/Icons';

const NAV_ITEMS = [
  { icon: HomeIcon, label: 'Inicio', active: true },
  { icon: GraphIcon, label: 'Grafo', active: false },
  { icon: BookmarkIcon, label: 'Guardados', active: false },
  { icon: SettingsIcon, label: 'Ajustes', active: false },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-[108px] shrink-0 flex-col items-center border-r border-primary/20 bg-[#1a0b2e] py-6 lg:flex">
      <BrainLogo className="h-11 w-11" />

      <nav className="mt-12 flex flex-col items-center gap-7">
        {NAV_ITEMS.map(({ icon: ItemIcon, label, active }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            title={label}
            className={`flex w-[72px] flex-col items-center gap-1.5 rounded-xl py-2.5 text-[10px] font-medium transition-colors ${
              active
                ? 'bg-primary/15 text-primary ring-1 ring-primary/40'
                : 'text-white/55 hover:bg-white/5 hover:text-white'
            }`}
          >
            <ItemIcon className="h-6 w-6" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <button
        type="button"
        aria-label="Cuenta"
        title="Cuenta"
        className="mt-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:text-white"
      >
        <AccountIcon className="h-6 w-6" />
      </button>
    </aside>
  );
}
