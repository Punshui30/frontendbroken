
export interface GateSchema {
  name: string;
  version: string;
  actions: Record<string, any>;
  auth: {
    type: string;
    credentials: Record<string, string>;
  };
}
