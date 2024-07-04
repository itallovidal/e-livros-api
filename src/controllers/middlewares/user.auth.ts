import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { decode, verify } from 'jsonwebtoken'
import * as process from 'process'

@Injectable()
export class UserAuth implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization

    if (!auth) {
      throw new UnauthorizedException('Token necessário.')
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new InternalServerErrorException(
        'Erro interno de servidor, tente novamente mais tarde.',
      )
    }

    const token = auth.split('Bearer ')[1]
    console.log('Token Extraído.')

    try {
      verify(token, process.env.ACCESS_TOKEN_SECRET)
      console.log('Token válido.')

      // decodificando o token e add no locals.user
      res.locals.user = { id: decode(token) }
      console.log('Usuário  decodificado com sucesso.')
      next()
    } catch (e) {
      console.log(e)
      throw new UnauthorizedException('Token inválido.')
    }
  }
}
