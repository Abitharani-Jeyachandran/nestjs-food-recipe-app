import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './create-food.dto';
import { UpdateFoodDto } from './update-food.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  // Create food recipe
  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.create(createFoodDto);
  }

  // Find all recipes
  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  // Find one recipe
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.foodService.findOne(+id);
  }

  // Update food recipe
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodService.update(+id, updateFoodDto);
  }
}
