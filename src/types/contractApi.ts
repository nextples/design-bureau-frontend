
export interface ContractCreateDTO {
  name: string;
  managerId: string;
}

export interface ContractUpdateDTO {
  name?: string;
  managerId?: string;
}

export interface ContractDTO {
  contractId: string;
  name: string;
  startDate: string;
  endDate: string;
  managerId: string;
  projectIds: string[];
}

export interface ContractListItem {
  contractId: string;
  name: string;
  startDate: string;
  endDate: string;
  managerId: string;
}
