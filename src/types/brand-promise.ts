export interface BrandPrincipleData {
  id: string;
  title: string;
  description: string;
}

export interface BrandPromiseConfig {
  eyebrow?: string;
  heading: string;
  description?: string;
  principles: readonly BrandPrincipleData[];
}
