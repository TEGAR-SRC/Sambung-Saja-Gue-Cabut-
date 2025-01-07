export interface TableConfig {
    columns?: TableColumn[];
    rowActions?: TableAction[];
    data?: any[];
    total?: number;
    permission?: string | string[];
}

export interface TableColumn {
    title?: string | undefined;
    dataField?: string;
    key?: string;
    sortable?: boolean;
    sort_direction?: string;
    type?: string;
    canAllow?: string[];
    date_format?: string;
    class?: string;
    placeholder?: string; 
}

export interface TableAction {
    label: string;
    actionToPerform: string;
    icon: string;
    permission?: string | string[];
    conditional?: Conditional
}

export interface TableClickedAction {
    actionToPerform?: string;
    data?: any;
    value?: any;
}

export interface Conditional {
    field: string;
    condition: string;
    value: string;
}