import {
  Controller,
  UseGuards,
  Post,
  Res,
  Get,
  Req,
  HttpCode,
} from '@nestjs/common';
import { SamlAuthGuard } from './saml-auth.guard';
import { readFileSync } from 'fs';
import { SamlStrategy } from './saml.strategy';

@Controller('auth')
export class AuthController {
  constructor(private saml: SamlStrategy) {}
  /**
   * Placeholder method to trigger SAML authentication
   * @param req
   * @param res
   */
  @UseGuards(SamlAuthGuard)
  @Post('login')
  login(@Res() res) {
    res.status(401).send('<h1>Login Failure</h1>');
  }

  @Get('meta')
  generateMetadata(@Res() res) {
    const CONFIG_PATH = process.cwd() + '/config/';
    const privateKey = readFileSync(
      CONFIG_PATH + process.env.SAML_SERVER_PRIVATE_KEY,
      'utf-8',
    );
    const decryptionCert = readFileSync(
      CONFIG_PATH + process.env.SAML_SERVER_PUBLIC_CERT,
      'utf-8',
    );
    const metaData = this.saml.generateServiceProviderMetadata(
      decryptionCert,
      privateKey,
    );
    res.type('application/xml');
    res.send(metaData);
    return res;
  }

  @UseGuards(SamlAuthGuard)
  @HttpCode(200)
  @Post('callback')
  async loggedUser(@Req() req, @Res({ passthrough: true }) response) {
    console.log('SAML response :: ' + JSON.stringify(req?.user));
    response.redirect('/app');
  }
}
