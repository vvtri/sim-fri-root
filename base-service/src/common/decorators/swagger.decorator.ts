import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationResDto } from '../dtos/pagination.dto';

export const PaginationResponse = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(PaginationResDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginationResDto) },
          {
            properties: {
              items: { type: 'array', items: { $ref: getSchemaPath(dataDto) } },
            },
          },
        ],
      },
    }),
  );
