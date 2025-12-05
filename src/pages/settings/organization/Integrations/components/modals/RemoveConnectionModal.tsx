import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface RemoveConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  integrationName: string;
  connectionName: string;
}

export const RemoveConnectionModal = ({
  isOpen,
  onClose,
  onConfirm,
  integrationName,
  connectionName,
}: RemoveConnectionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Icon */}
          <div className="mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="w-6 h-6 text-red-600"
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Remove "{connectionName}" Connection?
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4">
            Are you sure you want to remove {integrationName} "{connectionName}"
            connection?
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Undo
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
