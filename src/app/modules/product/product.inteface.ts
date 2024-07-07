export interface IProduct {
  productName: string;
  price: number;
  quantity: number;
  bloomDate: Date;
  color: string[];
  type: string;
  size: string;
  fragrance: string;
  // Additional relevant filter parameters
  arrangementStyle?: string;
  occasion?: string;
  customAttributes?: Record<string, any>;
      }
      