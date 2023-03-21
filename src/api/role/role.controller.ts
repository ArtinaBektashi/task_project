import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Put,
    UseInterceptors,
  } from '@nestjs/common';
  import { Roles } from '../../common/decorators/roles.decorator';
  import { RolesGuard } from '../../common/guards/roles.guard';
  import { RoleService } from './role.service';
  import { CreateRoleDto } from './dto/role.dto';
  import { UpdateRoleDto } from './dto/role.dto';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  import { PaginationInterceptor } from '../../common/interceptors/pagination.interceptor';
  import { UserRoles } from '../user/enums/roles.enum';

  @UseGuards(new RolesGuard())
  @ApiBearerAuth()
  @ApiTags('Roles')
  @Controller('roles')
  export class RoleController {
    constructor(private readonly roleService: RoleService) {}
  
    @Roles(UserRoles.ADMIN)
    @Post()
    async create(@Body() data: CreateRoleDto) {
      return await this.roleService.create(data);
    }
  
    @Roles(UserRoles.ADMIN)
    @UseInterceptors(PaginationInterceptor)
    @Get()
    async findAll() {
      return await this.roleService.findAll();
    }
  
    @Get(':id')
    @Roles(UserRoles.ADMIN)
    async findOne(@Param('id') id: string) {
      return await this.roleService.findOne(id);
    }
    @Roles(UserRoles.ADMIN)
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateRoleDto) {
      return await this.roleService.update(id, data);
    }
  
    @Roles(UserRoles.ADMIN)
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return await this.roleService.remove(id);
    }
  }