import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './create-food.dto';
import { UpdateFoodDto } from './update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './food.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
  ) { }

  // Create food recipe
  async create(createFoodDto: CreateFoodDto): Promise<Food> {
    try {
      const newFoodItem = this.foodRepository.create(createFoodDto);
      newFoodItem.created_at = new Date();
      return await this.foodRepository.save(newFoodItem);
    } catch (error) {
      return error;
    }
  }

  // Find all recipes
  async findAll() {
    return await this.foodRepository.find();
  }

  // Find one recipe
  async findOne(id: number) {
    const oneFoodItem = await this.foodRepository.findOne({ where: { id: id } });
    if (!oneFoodItem) {
      throw new NotFoundException(` ID '${id}' not found`);
    }
    return oneFoodItem;
  }

  // Update food recipe
  async update(id: number, updateFoodDto: UpdateFoodDto) {
    updateFoodDto.updated_at = new Date();
    await this.foodRepository.update({ id }, updateFoodDto)
  }
}
