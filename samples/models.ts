/** Shared domain types for the showcase sample. */
export namespace Inventory {
  export type Sku = `${string}-${number}`;

  export interface Item {
    readonly sku: Sku;
    name: string;
    price: number;
    tags?: string[];
  }
}

export enum Status {
  Active = "active",
  Archived = "archived",
  Draft = 0x10,
}
