import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
      if (error instanceof BadRequestException) {
        throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'An error occurred while creating the food',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  // Find all recipes
  async findAll() {
    try {
      return await this.foodRepository.find();
    } catch (error) {
      throw new NotFoundException();
    }
  }
await
  // Find one recipe
  async findOne(id: number) {
    const oneFoodItem = await this.foodRepository.findOne({ where: { id: id } });
    if (!oneFoodItem) {
      throw new NotFoundException();
    }
    return oneFoodItem;
  }

  // Update food recipe
  async update(id: number, updateFoodDto: UpdateFoodDto) {
    updateFoodDto.updated_at = new Date();
    const updateResult = await this.foodRepository.update({ id }, updateFoodDto);
    if (updateResult.affected == 0) {
      throw new NotFoundException();
    }
    return {
      statusCode: HttpStatus.OK
    };
  }
}
