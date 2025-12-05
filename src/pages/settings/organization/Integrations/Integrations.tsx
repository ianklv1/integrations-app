import { useState, useMemo } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IntegrationsTable } from "./components/IntegrationsTable";
import { Pagination } from "./components/Pagination";
import { RemoveConnectionModal } from "./components/modals/RemoveConnectionModal";
import { EditConnectionModal } from "./components/modals/EditConnectionModal";
import { mockIntegrations, availableServices } from "./data/mockData";
import type { Integration } from "../../../../types";
import AmazonQsImg from "../../../../assets/amzqs.png";
import KafkaImg from "../../../../assets/kafka.png";
import MeasurablImg from "../../../../assets/measurabl.png";
import PowerBiImg from "../../../../assets/powerbi.png";
import TableuImg from "../../../../assets/tableu.png";
import ZapierImg from "../../../../assets/zapier.png";

const ITEMS_PER_PAGE = 8;

export const IntegrationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredIntegrations = useMemo(() => {
    if (!searchQuery.trim()) return mockIntegrations;

    const query = searchQuery.toLowerCase();
    return mockIntegrations.filter(
      (integration) =>
        integration.integration.toLowerCase().includes(query) ||
        integration.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredIntegrations.length / ITEMS_PER_PAGE);
  const paginatedIntegrations = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredIntegrations.slice(startIndex, endIndex);
  }, [filteredIntegrations, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleEdit = (integration: Integration) => {
    setSelectedIntegration(integration);
    setShowEditModal(true);
  };

  const handleDelete = (integration: Integration) => {
    setSelectedIntegration(integration);
    setShowRemoveModal(true);
  };

  const handleConfirmDelete = () => {
    // In a real app, this would call an API to delete the integration
    console.log("Deleting integration:", selectedIntegration);
    setShowRemoveModal(false);
    setSelectedIntegration(null);
  };

  const handleConfirmEdit = () => {
    console.log("Editing integration:", selectedIntegration);
    setShowEditModal(false);
    setSelectedIntegration(null);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Choose a Service to Connect
          </h2>
          <p className="text-sm text-gray-600 mb-4 sm:mb-6">
            Connect BraveGen to other tools you use.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {availableServices.map((service) => {
              const getServiceImage = (icon: string) => {
                switch (icon) {
                  case "amazon-quicksight":
                    return AmazonQsImg;
                  case "kafka":
                    return KafkaImg;
                  case "zapier":
                    return ZapierImg;
                  case "power-bi":
                    return PowerBiImg;
                  case "tableau":
                    return TableuImg;
                  case "measurabi":
                    return MeasurablImg;
                  default:
                    return undefined;
                }
              };

              return (
                <div
                  key={service.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <img
                        src={getServiceImage(service.icon)}
                        alt={service.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {service.name}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <button className="w-full bg-gray-900 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                    Add Connection
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Existing Connections
          </h2>
          <div className="mb-4 sm:mb-6">
            <div className="relative w-full sm:max-w-md">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              />
              <input
                type="text"
                placeholder="Integration or Name"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {paginatedIntegrations.length > 0 ? (
            <>
              <IntegrationsTable
                integrations={paginatedIntegrations}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <p className="text-gray-500">
                No integrations found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedIntegration && (
        <>
          <RemoveConnectionModal
            isOpen={showRemoveModal}
            onClose={() => setShowRemoveModal(false)}
            onConfirm={handleConfirmDelete}
            integrationName={selectedIntegration.integration}
            connectionName={selectedIntegration.name}
          />
          <EditConnectionModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onConfirm={handleConfirmEdit}
            integrationName={selectedIntegration.integration}
            connectionName={selectedIntegration.name}
          />
        </>
      )}
    </div>
  );
};
