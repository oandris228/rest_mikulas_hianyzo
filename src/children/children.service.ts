import { Injectable } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChildrenService {

  constructor(private readonly db: PrismaService) {}

  create(createChildDto: CreateChildDto) {
    return this.db.child.create({
      data: createChildDto
    });
  }

  findAll() {
    return this.db.child.findMany();
  }

  findOne(id: number) {
    return this.db.child.findUnique({
      where: {id}
    });
  }

  update(id: number, updateChildDto: UpdateChildDto) {
    return this.db.child.update({
      where: {id},
      data: updateChildDto
    });
  }

  remove(id: number) {
    return this.db.child.delete({
      where: {id}
    });
  }

  addToy(toyid: number, childid: number) {
    return this.db.child.update({
      where: {id: childid},
      data: {
        toys: {
          connect: [{id: toyid}]
        }
      }
    })
  }

  removeToy(toyid: number, childid: number) {
    return this.db.child.update({
      where: {id: childid},
      data: {
        toys: {
          disconnect: [{id: toyid}]
        }
      }
    })
  }
}
