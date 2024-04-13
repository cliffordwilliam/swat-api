import { Module } from '@nestjs/common';
import { PembeliService } from './pembeli.service';
import { PembeliController } from './pembeli.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PembeliController],
  providers: [PembeliService],
})
export class PembeliModule {}
