export class Assessment {
  title: string;
  description: string;
  province?: string;
  city?: string;
  address?: string;
  zipCode?: string;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(partial?: Partial<Assessment>) {
    Object.assign(this, partial);
  }
}
