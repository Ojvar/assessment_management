import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDTO, UpdateAssessmentDTO } from './dto';

describe('AssessmentController', () => {
  let controller: AssessmentController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentController],
      providers: [{ provide: AssessmentService, useValue: mockService }],
    }).compile();

    controller = module.get<AssessmentController>(AssessmentController);
    service = module.get<AssessmentService>(AssessmentService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call service.create and return result', async () => {
      const dto: CreateAssessmentDTO = { created_by: 1, title: 'Test' };
      mockService.create.mockResolvedValue({ id: 1, ...dto });

      const result = await controller.create(dto);
      expect(result.id).toBe(1);
      expect(mockService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all assessments', async () => {
      mockService.findAll.mockResolvedValue([{ id: 1 }]);
      const result = await controller.findAll();
      expect(result).toEqual([{ id: 1 }]);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single assessment', async () => {
      mockService.findOne.mockResolvedValue({ id: 1 });
      const result = await controller.findOne(1);
      expect(result).toEqual({ id: 1 });
      expect(mockService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update and return the assessment', async () => {
      const dto: UpdateAssessmentDTO = { title: 'Updated' };
      mockService.update.mockResolvedValue({ id: 1, ...dto });
      const result = await controller.update(1, dto);
      expect(result.title).toBe('Updated');
      expect(mockService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should soft-delete the assessment', async () => {
      mockService.remove.mockResolvedValue({ id: 1, deleted_at: new Date() });
      const result = await controller.remove(1);
      expect(result.id).toBe(1);
      expect(mockService.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if service throws', async () => {
      mockService.remove.mockRejectedValue(new NotFoundException());
      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
