import {ApiPropertyOptional} from "@nestjs/swagger";

export class CreateProductsDto {
  @ApiPropertyOptional()
  discounted_price: string;
  @ApiPropertyOptional()
  dosages: string;
  @ApiPropertyOptional()
  featured_image: string;
  @ApiPropertyOptional()
  full_description: string;
  @ApiPropertyOptional()
  media: string;
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  price: string;
  @ApiPropertyOptional()
  quantity: string;
  @ApiPropertyOptional()
  short_description: string;
  @ApiPropertyOptional()
  slug: string;
}
