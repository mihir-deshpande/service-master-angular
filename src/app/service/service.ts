// service.ts
export interface Service {
  service: {
    _id: string;
    name: string;
    description: string;
    providers: string[];
  };
  providers: {
    _id: string;
  }[];
}
