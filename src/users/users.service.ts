//Aqui estão os métodos de todas as rotas disponibilizadas por default pelo Nest;

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  findAll() {
    return this.userModel.find();
  }

  //Precisa mudar o tipo do parâmetro id de number para string quando se trabalha com Mongo pois no DB o id é salvo como string;
  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({
      //Por defaulto Mongo chama o id de _id;
      _id: id
    },{
      $set: updateUserDto,
    },{
      //Essa propriedade é necessária para que o Mongo salve os dados no DB depois de serem atualizados;
      new: true
    })
  }

  remove(id: string) {
    return this.userModel.deleteOne({
      _id: id,
    })
    //Um métodopara pedir que essa solicitação seja realmente executada;
    .exec();
  }
}
