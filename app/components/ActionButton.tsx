// FILE: app/components/ActionButton.tsx
interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export default function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition text-left"
    >
      <div className="text-blue-600">{icon}</div>
      <span className="font-medium text-gray-800">{label}</span>
    </button>
  );
}