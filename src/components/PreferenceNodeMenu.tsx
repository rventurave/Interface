interface PreferenceNodeMenuProps {
  x: number;
  y: number;
  label: string;
  isImportant: boolean;
  onClose: () => void;
  onToggleImportant: () => void;
  onDelete: () => void;
}

export default function PreferenceNodeMenu({
  x,
  y,
  label,
  isImportant,
  onClose,
  onToggleImportant,
  onDelete,
}: PreferenceNodeMenuProps) {
  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        onContextMenu={(event) => {
          event.preventDefault();
          onClose();
        }}
      />
      <div
        className="fixed z-50 max-h-[min(20rem,calc(100dvh-1.5rem))] w-60 max-w-[calc(100vw-1.5rem)] overflow-y-auto rounded-xl border border-white/10 bg-[#14101f] p-1 shadow-2xl"
        style={{
          left: `clamp(12px, ${x}px, calc(100vw - min(15rem, calc(100vw - 1.5rem)) - 12px))`,
          top: `clamp(12px, ${y}px, calc(100dvh - min(20rem, calc(100dvh - 1.5rem)) - 12px))`,
        }}
      >
        <p className="px-3 py-2 text-sm font-semibold text-white/75">{label}</p>
        <button
          type="button"
          onClick={onToggleImportant}
          className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
            isImportant ? 'text-amber-300 hover:text-amber-200' : 'text-white/80 hover:text-white'
          }`}
        >
          {isImportant ? 'Quitar marca de importante' : 'Marcar como importante'}
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-300 transition-colors hover:bg-red-400/10"
        >
          Eliminar
        </button>
      </div>
    </>
  );
}
