import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('provinces')
export class Province {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    constructor(data?: Partial<Province>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
