import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

interface EditConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  integrationName: string;
  connectionName: string;
}

export const EditConnectionModal = ({
  isOpen,
  onClose,
  onConfirm,
  integrationName,
  connectionName,
}: EditConnectionModalProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    // In a real app, you would pass the updated name back
    onConfirm();
  };

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

        <div className="p-6">
          <div className="mb-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="w-6 h-6 text-yellow-600"
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Change to Existing Connection
          </h2>

          <p className="text-gray-600 text-sm mb-3">
            Changes may disrupt functionality and impact data flow.
          </p>

          <p className="text-gray-600 text-sm mb-4">
            Are you sure you want to make changes to {integrationName} "
            {connectionName}" connection?
          </p>
        </div>

        <div className="flex items-center gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Undo
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
