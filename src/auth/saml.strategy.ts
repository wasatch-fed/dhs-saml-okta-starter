import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Strategy } from '@node-saml/passport-saml';

dotenv.config();
const pk = process.env.SAML_SERVER_PRIVATE_KEY;
const publicCert = fs.readFileSync(
  path.resolve(
    __dirname,
    `../../config/${process.env.SAML_SERVER_PUBLIC_CERT}`,
  ),
  'utf-8',
);

const samlConfig = {
  issuer: process.env.OKTA_SAML_ISSUER,
  disableRequestedAuthnContext: true,
  callbackUrl: process.env.OKTA_SAML_CALLBACK_URL,
  entryPoint: process.env.OKTA_SAML_ENTRY_POINT,
  privateCert: pk,
  decryptionPvk: pk,
  signatureAlgorithm: 'sha256',
  authnRequestBinding: 'HTTP-REDIRECT',
  cert: publicCert,
};

@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy, 'saml') {
  constructor() {
    super(samlConfig);
  }

  async validate(payload: any) {
    return payload;
  }
}
