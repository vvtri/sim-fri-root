import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class AppService {
  constructor(moduleRef: ModuleRef) {}

  getHello(): string {
    return 'Hello World!';
  }
}
