import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as request from 'request-promise';
import { UserRepository } from '../common/db/repositories/user.repository';
import { checkEmptyProperties } from '../common/utils/validate-objects';
import { signInUser, signUpUser } from '../common/types/comarable-objects';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signIn(userData: any) {
    checkEmptyProperties(userData, signInUser);
    // return await this.userRepository.getUser(userData);
    return '';
  }

  async signUp(userData: any) {
    checkEmptyProperties(userData, signUpUser);
    this.validateSignUp(userData);
    const d = JSON.parse(await request.get(`http://localhost:3000/auth/exists/${userData.phone}`));
    console.log(d);
    return d;
    return await this.userRepository.createUser(userData);
  }

  private validateSignUp(data: any) {
    if (data.password !== data.passwordConfirmation) {
      throw new BadRequestException('Passwords do not match.');
    }
  }

  async getUser({ phone }: {phone: string}) {
    console.log(request);
    const user = await this.userRepository.getUser({ phone });
    if(!user) {
      throw new NotFoundException('User not found');
    }
    return {
      exists: true,
      status: 200
    };
  }
}
