import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SamlAuthGuard extends AuthGuard('saml') {
  handleRequest(err: any, user: any) {
    if (err || !user) {
      console.log('SAML error ' + JSON.stringify(err));
      throw err || new UnauthorizedException();
    }
    console.log('SAML response' + JSON.stringify(user));
    return user;
  }
}
