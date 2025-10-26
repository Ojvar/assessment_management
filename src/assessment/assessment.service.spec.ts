import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssessmentService } from './assessment.service';

describe('AssessmentService', () => {
  let service: AssessmentService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssessmentService, PrismaService],
    }).compile();

    service = module.get<AssessmentService>(AssessmentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call prisma.assessment.create when creating', async () => {
    const createSpy = jest
      .spyOn(prisma.assessment, 'create')
      .mockResolvedValue({
        id: 1,
        title: 'Test',
        description: 'desc',
        province: 'Tehran',
        city: 'Tehran',
        address: '123 St',
        zipCode: '12345',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    const dto = {
      title: 'Test',
      description: 'desc',
      province: 'Tehran',
      city: 'Tehran',
      address: '123 St',
      zipCode: '12345',
    };

    const result = await service.create(dto);
    expect(result).toHaveProperty('id');
    expect(createSpy).toHaveBeenCalled();
  });
});
