import { IsOptional } from 'class-validator'

export class BasicResponseType {
    @IsOptional()
    status?: number

    @IsOptional()
    message?: string
}