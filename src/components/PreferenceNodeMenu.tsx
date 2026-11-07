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
        className="fixed z-50 w-60 rounded-xl border border-white/10 bg-[#14101f] p-1 shadow-2xl"
        style={{ left: x, top: y }}
      >
        <p className="px-3 py-2 text-xs font-semibold text-white/45">{label}</p>
        <button
          type="button"
          onClick={onToggleImportant}
          className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
            isImportant ? 'text-amber-300 hover:text-amber-200' : 'text-white/80 hover:text-white'
          }`}
        >
          {isImportant ? 'Desmarcar importante' : 'Marcar importante'}
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
