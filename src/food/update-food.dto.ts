import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodDto } from './create-food.dto';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {
    name?: string;
    description?: string;
    status?: Boolean;
    created_at?: Date;
    updated_at?: Date;
}
