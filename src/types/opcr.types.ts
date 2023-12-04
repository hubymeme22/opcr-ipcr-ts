export type OPCR = {
  _id: { $oid: string };
  accepted: boolean;
  owner: string;
  targets: Target[];
};

export type Target = {
  _id: { $oid: string };
  name: string;
  success: SuccessIndicator[];
};

export type SuccessIndicator = {
  accomplishment: string;
  assigned_to: string[];
  budget: number;
  division: string;
  indicator: string;
  rating: number[];
  remarks: string[];
};

export type OPCR_Status = 'in progress' | 'calibrated' | 'rejected';
