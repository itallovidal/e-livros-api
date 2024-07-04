import { Controller, Get, HttpCode, Response } from '@nestjs/common'
import { ProfileService } from '../../services/users/profile.service'

@Controller('users')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('profile')
  @HttpCode(200)
  async handle(@Response({ passthrough: true }) res: Response) {
    const user = res['locals'].user as { id: string }

    console.log(user)

    return await this.profileService.execute(user.id)
  }
}
