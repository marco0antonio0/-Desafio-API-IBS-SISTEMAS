/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserauthService } from 'src/user_auth/userauth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userauthService: UserauthService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // solicita o args "authorization" do request http
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      // faz o tratamento da string authorization inserida no beaer
      const token = (authorization ?? '').split(' ')[1]
      // chama a função que verifica se o token é valido
      const res = this.userauthService.checkToken(token)
      // insere os dados do token no 'corpo' do request
      request.tokenPayload = res;

      return true;
    } catch (error) {
      throw new UnauthorizedException
      return false;
    }


  }
}
