import { Status } from '@prisma/client';

export class Assessment {
  id: number;
  title: string;
  description?: string;
  address: string;
  city: string;
  province: string;
  latitude?: number;
  longitude?: number;
  map_points?: { lat: number; lng: number }[];
  status: Status;
  reference_code?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
