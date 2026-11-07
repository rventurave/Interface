import type { Area } from '../../types/exploration';

interface AreaContextMenuProps {
  x: number;
  y: number;
  area: Area;
  onClose: () => void;
  onExplore: (id: string) => void;
  onExplain: (id: string) => void;
  onShowPreferences: (id: string) => void;
  onGenerateSubareas: (id: string) => void;
  onSendToChat: (id: string) => void;
  onChangeFeedback: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function AreaContextMenu({
  x,
  y,
  area,
  onClose,
  onExplore,
  onExplain,
  onShowPreferences,
  onGenerateSubareas,
  onSendToChat,
  onChangeFeedback,
  onDelete,
}: AreaContextMenuProps) {
  const itemClass =
    'block w-full rounded-lg px-3 py-2 text-left text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white';

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
        className="fixed z-50 w-64 rounded-xl border border-white/10 bg-[#14101f] p-1 shadow-2xl"
        style={{ left: x, top: y }}
      >
        <p className="px-3 py-2 text-xs font-semibold text-white/45">{area.name}</p>
        <button className={itemClass} onClick={() => onExplore(area.id)}>
          Explorar área
        </button>
        <button className={itemClass} onClick={() => onExplain(area.id)}>
          Explicar por qué fue recomendada
        </button>
        <button className={itemClass} onClick={() => onShowPreferences(area.id)}>
          Mostrar preferencias relacionadas
        </button>
        <button className={itemClass} onClick={() => onGenerateSubareas(area.id)}>
          Generar subáreas
        </button>
        <button className={itemClass} onClick={() => onSendToChat(area.id)}>
          Enviar área al chat
        </button>
        <button className={itemClass} onClick={() => onChangeFeedback(area.id)}>
          Cambiar feedback
        </button>
        <div className="my-1 h-px bg-white/10" />
        <button
          className="block w-full rounded-lg px-3 py-2 text-left text-sm text-danger transition-colors hover:bg-danger/10"
          onClick={() => onDelete(area.id)}
        >
          Eliminar nodo
        </button>
      </div>
    </>
  );
}
