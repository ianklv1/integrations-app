import type { Integration } from "../../../../../types";

export const mockIntegrations: Integration[] = [
    {
        id: '1',
        integration: 'Amazon QuickSight',
        name: 'Energy',
        source: 'Carbon',
        entityGroup: 'ABC Group LTD - Energy',
        interval: '-',
        connectorUrl: 'https://example.com/connector/1',
        icon: 'amazon-quicksight'
    },
    {
        id: '2',
        integration: 'Amazon QuickSight',
        name: 'Logistics',
        source: 'Carbon',
        entityGroup: 'ABC Group LTD - Logistics',
        interval: '-',
        connectorUrl: 'https://example.com/connector/2',
        icon: 'amazon-quicksight'
    },
    {
        id: '3',
        integration: 'Amazon QuickSight',
        name: 'Operations',
        source: 'Carbon',
        entityGroup: 'ABC Group LTD - Operations',
        interval: '-',
        connectorUrl: 'https://example.com/connector/3',
        icon: 'amazon-quicksight'
    },
    {
        id: '4',
        integration: 'Amazon QuickSight',
        name: 'Electricity ToU',
        source: 'Utility',
        entityGroup: '135 Albert St - Electricity',
        interval: 'ToU',
        connectorUrl: 'https://example.com/connector/4',
        icon: 'amazon-quicksight'
    },
    {
        id: '5',
        integration: 'Amazon QuickSight',
        name: 'Water',
        source: 'Utility',
        entityGroup: '135 Albert St - Water',
        interval: 'Monthly',
        connectorUrl: 'https://example.com/connector/5',
        icon: 'amazon-quicksight'
    },
    {
        id: '6',
        integration: 'Kafka',
        name: 'ABC Group L...',
        source: 'Carbon',
        entityGroup: 'ABC Group LTD',
        interval: '-',
        connectorUrl: 'https://example.com/connector/6',
        icon: 'kafka'
    },
    {
        id: '7',
        integration: 'Zapier',
        name: 'ABC Group L...',
        source: 'Carbon',
        entityGroup: 'ABC Group LTD',
        interval: '-',
        connectorUrl: 'https://example.com/connector/7',
        icon: 'zapier'
    },
    {
        id: '8',
        integration: 'Zapier',
        name: '135 Albert St...',
        source: 'Utility',
        entityGroup: '135 Albert St - Gas',
        interval: 'Yearly',
        connectorUrl: 'https://example.com/connector/8',
        icon: 'zapier'
    },
    {
        id: '9',
        integration: 'Power BI',
        name: 'Marketing Data',
        source: 'Carbon',
        entityGroup: 'ABC Group LTD - Marketing',
        interval: '-',
        connectorUrl: 'https://example.com/connector/9',
        icon: 'power-bi'
    },
    {
        id: '10',
        integration: 'Tableau',
        name: 'Sales Analytics',
        source: 'Carbon',
        entityGroup: 'ABC Group LTD - Sales',
        interval: '-',
        connectorUrl: 'https://example.com/connector/10',
        icon: 'tableau'
    },
    {
        id: '11',
        integration: 'Measurabi',
        name: 'Environmental',
        source: 'Carbon',
        entityGroup: 'ABC Group LTD - Environment',
        interval: '-',
        connectorUrl: 'https://example.com/connector/11',
        icon: 'measurabi'
    },
    {
        id: '12',
        integration: 'Amazon QuickSight',
        name: 'Finance',
        source: 'Carbon',
        entityGroup: 'ABC Group LTD - Finance',
        interval: '-',
        connectorUrl: 'https://example.com/connector/12',
        icon: 'amazon-quicksight'
    },
    {
        id: '13',
        integration: 'Kafka',
        name: 'Real-time Data',
        source: 'Carbon',
        entityGroup: 'ABC Group LTD - IT',
        interval: '-',
        connectorUrl: 'https://example.com/connector/13',
        icon: 'kafka'
    },
    {
        id: '14',
        integration: 'Power BI',
        name: 'HR Analytics',
        source: 'Carbon',
        entityGroup: 'ABC Group LTD - HR',
        interval: '-',
        connectorUrl: 'https://example.com/connector/14',
        icon: 'power-bi'
    },
    {
        id: '15',
        integration: 'Tableau',
        name: 'Customer Insights',
        source: 'Carbon',
        entityGroup: 'ABC Group LTD - Customer',
        interval: '-',
        connectorUrl: 'https://example.com/connector/15',
        icon: 'tableau'
    },
    {
        id: '16',
        integration: 'Zapier',
        name: 'Automation Hub',
        source: 'Utility',
        entityGroup: '135 Albert St - Automation',
        interval: 'Daily',
        connectorUrl: 'https://example.com/connector/16',
        icon: 'zapier'
    },
    {
        id: '17',
        integration: 'Measurabi',
        name: 'Sustainability',
        source: 'Carbon',
        entityGroup: 'ABC Group LTD - Sustainability',
        interval: '-',
        connectorUrl: 'https://example.com/connector/17',
        icon: 'measurabi'
    },
    {
        id: '18',
        integration: 'Amazon QuickSight',
        name: 'Supply Chain',
        source: 'Carbon',
        entityGroup: 'ABC Group LTD - Supply',
        interval: '-',
        connectorUrl: 'https://example.com/connector/18',
        icon: 'amazon-quicksight'
    },
    {
        id: '19',
        integration: 'Kafka',
        name: 'Event Stream',
        source: 'Carbon',
        entityGroup: 'ABC Group LTD - Events',
        interval: '-',
        connectorUrl: 'https://example.com/connector/19',
        icon: 'kafka'
    },
    {
        id: '20',
        integration: 'Power BI',
        name: 'Production Data',
        source: 'Carbon',
        entityGroup: 'ABC Group LTD - Production',
        interval: '-',
        connectorUrl: 'https://example.com/connector/20',
        icon: 'power-bi'
    }
];

export interface AvailableService {
    id: string;
    name: string;
    description: string;
    icon: string;
}

export const availableServices: AvailableService[] = [
    {
        id: "1",
        name: "Amazon Quicksight",
        description: "Amazon BI service to create dashboards and interactive visualizations.",
        icon: "amazon-quicksight",
    },
    {
        id: "2",
        name: "Kafka",
        description: "Real-time data streaming, event-driven architectures and messaging systems.",
        icon: "kafka",
    },
    {
        id: "3",
        name: "Zapier",
        description: "Automation tool that connects various apps and services to automate workflows.",
        icon: "zapier",
    },
    {
        id: "4",
        name: "Power BI",
        description: "Microsoft BI Service to create dashboards and data visualizations.",
        icon: "power-bi",
    },
    {
        id: "5",
        name: "Tableau",
        description: "BI service that helps seeing and transforming data into actionable insights.",
        icon: "tableau",
    },
    {
        id: "6",
        name: "Measurabi",
        description: "Enable the push and pull of data to and from Measurabl via an API",
        icon: "measurabi",
    },
];
