import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import type { Integration } from "../../../../../types";
import AmazonQsImg from "../../../../../assets/amzqs.png";
import KafkaImg from "../../../../../assets/kafka.png";
import MeasurablImg from "../../../../../assets/measurabl.png";
import PowerBiImg from "../../../../../assets/powerbi.png";
import TableuImg from "../../../../../assets/tableu.png";
import ZapierImg from "../../../../../assets/zapier.png";

interface IntegrationsTableProps {
  integrations: Integration[];
  onEdit: (integration: Integration) => void;
  onDelete: (integration: Integration) => void;
}

export const IntegrationsTable = ({
  integrations,
  onEdit,
  onDelete,
}: IntegrationsTableProps) => {
  const [sortField, setSortField] = useState<keyof Integration>("integration");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Integration) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedIntegrations = [...integrations].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getIntegrationIcon = (icon: string) => {
    const iconClass = "w-6 h-6 object-contain";

    switch (icon) {
      case "amazon-quicksight":
        return (
          <img
            src={AmazonQsImg}
            alt="Amazon QuickSight"
            className={iconClass}
          />
        );
      case "kafka":
        return <img src={KafkaImg} alt="Kafka" className={iconClass} />;
      case "zapier":
        return <img src={ZapierImg} alt="Zapier" className={iconClass} />;
      case "power-bi":
        return <img src={PowerBiImg} alt="Power BI" className={iconClass} />;
      case "tableau":
        return <img src={TableuImg} alt="Tableau" className={iconClass} />;
      case "measurabi":
        return <img src={MeasurablImg} alt="Measurabi" className={iconClass} />;
      default:
        return <div className="w-6 h-6 bg-gray-400 rounded"></div>;
    }
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source.toLowerCase()) {
      case "carbon":
        return "bg-orange-100 text-orange-700";
      case "utility":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort("integration")}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900"
                  >
                    Integration
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Entity/Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Interval
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Connector URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Instructions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedIntegrations.map((integration) => (
                <tr
                  key={integration.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getIntegrationIcon(integration.icon)}
                      <span className="text-sm font-medium text-gray-900">
                        {integration.integration}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#20B2AA] font-medium">
                      {integration.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSourceBadgeColor(
                        integration.source
                      )}`}
                    >
                      {integration.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {integration.entityGroup}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {integration.interval}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => copyToClipboard(integration.connectorUrl)}
                      className="text-sm text-[#20B2AA] hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                      Copy to Clipboard
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-[#20B2AA] hover:text-blue-700 flex items-center gap-1 text-sm font-medium">
                        View
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          className="w-3 h-3"
                        />
                      </button>
                      <div className="ml-10 flex items-center gap-2">
                        <button
                          onClick={() => onEdit(integration)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-200 bg-white shadow-sm hover:bg-gray-100 transition-colors"
                          title="Edit"
                        >
                          <FontAwesomeIcon
                            icon={faPen}
                            className="w-4 h-4 text-gray-600"
                          />
                        </button>
                        <button
                          onClick={() => onDelete(integration)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-200 bg-white shadow-sm hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="w-4 h-4 text-red-600"
                          />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="lg:hidden space-y-4">
        {sortedIntegrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {getIntegrationIcon(integration.icon)}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {integration.integration}
                  </h3>
                  <p className="text-sm text-[#20B2AA] font-medium truncate">
                    {integration.name}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${getSourceBadgeColor(
                  integration.source
                )}`}
              >
                {integration.source}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-3">
              <div className="flex items-start">
                <span className="text-xs text-gray-500 w-24 flex-shrink-0">
                  Entity/Group:
                </span>
                <span className="text-xs text-gray-900 flex-1">
                  {integration.entityGroup}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 w-24 flex-shrink-0">
                  Interval:
                </span>
                <span className="text-xs text-gray-600">
                  {integration.interval}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => copyToClipboard(integration.connectorUrl)}
                className="flex-1 text-xs text-[#20B2AA] hover:text-blue-700 font-medium flex items-center justify-center gap-1 py-2 px-3 bg-blue-50 rounded-lg transition-colors"
              >
                Copy URL
              </button>
              <button className="flex-1 text-xs text-[#20B2AA] hover:text-blue-700 font-medium flex items-center justify-center gap-1 py-2 px-3 bg-blue-50 rounded-lg transition-colors">
                View
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="w-3 h-3"
                />
              </button>
              <div className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-1 py-0.5 shadow-sm">
                <button
                  onClick={() => onEdit(integration)}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  title="Edit"
                >
                  <FontAwesomeIcon
                    icon={faPen}
                    className="w-4 h-4 text-gray-600"
                  />
                </button>
                <div className="w-px h-4 bg-gray-200" />
                <button
                  onClick={() => onDelete(integration)}
                  className="p-2 rounded-md hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="w-4 h-4 text-red-600"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
