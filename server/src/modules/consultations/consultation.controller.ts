/* import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import {
  createConsultationSchema,
  updateConsultationSchema,
  CreateConsultationDto,
  UpdateConsultationDto,
} from '../../common/validations/consultation.validation';

@Controller('consultations')
@UseGuards(JwtAuthGuard)
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  async create(
    @Request() req,
    @Body(new ZodValidationPipe(createConsultationSchema))
    createDto: CreateConsultationDto,
  ) {
    return this.consultationsService.create(req.user.id, createDto);
  }

  @Get()
  async findAll(@Request() req) {
    return this.consultationsService.findAll(req.user.id, req.user.role);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return this.consultationsService.findOne(id, req.user.id, req.user.role);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body(new ZodValidationPipe(updateConsultationSchema))
    updateDto: UpdateConsultationDto,
  ) {
    return this.consultationsService.update(
      id,
      req.user.id,
      req.user.role,
      updateDto,
    );
  }

  @Put(':id/assign/:doctorId')
  async assignDoctor(
    @Param('id') id: string,
    @Param('doctorId') doctorId: string,
  ) {
    return this.consultationsService.assignDoctor(id, doctorId);
  }
}
 */

import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ConsultationsService } from './consultations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import {
  createConsultationSchema,
  updateConsultationSchema,
  CreateConsultationDto,
  UpdateConsultationDto,
} from '../../common/validations/consultation.validation';

@ApiTags('consultations')
@Controller('consultations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new consultation' })
  @ApiResponse({
    status: 201,
    description: 'Consultation created successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        chiefComplaint: {
          type: 'string',
          example: 'Persistent headache for 3 days',
        },
        symptoms: {
          type: 'array',
          items: { type: 'string' },
          example: ['headache', 'nausea', 'fatigue'],
        },
        duration: { type: 'string', example: '3 days' },
        medicalHistory: {
          type: 'object',
          properties: {
            conditions: {
              type: 'array',
              items: { type: 'string' },
              example: ['diabetes'],
            },
            surgeries: {
              type: 'array',
              items: { type: 'string' },
              example: [],
            },
            familyHistory: {
              type: 'array',
              items: { type: 'string' },
              example: ['hypertension'],
            },
          },
        },
        medications: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              dosage: { type: 'string' },
              frequency: { type: 'string' },
            },
          },
          example: [
            { name: 'Metformin', dosage: '500mg', frequency: 'twice daily' },
          ],
        },
        allergies: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              allergen: { type: 'string' },
              reaction: { type: 'string' },
            },
          },
          example: [{ allergen: 'Penicillin', reaction: 'Rash' }],
        },
        vitalSigns: {
          type: 'object',
          properties: {
            temperature: { type: 'number', example: 98.6 },
            bloodPressure: { type: 'string', example: '120/80' },
            heartRate: { type: 'number', example: 72 },
            weight: { type: 'number', example: 70 },
          },
        },
        videoUrl: {
          type: 'string',
          example: 'https://www.loom.com/share/xyz123',
        },
        priority: {
          type: 'string',
          enum: ['low', 'normal', 'high', 'urgent'],
          example: 'normal',
        },
      },
      required: ['chiefComplaint', 'symptoms', 'duration'],
    },
  })
  async create(
    @Request() req,
    @Body(new ZodValidationPipe(createConsultationSchema))
    createDto: CreateConsultationDto,
  ) {
    return this.consultationsService.create(req.user.id, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all consultations for current user' })
  @ApiResponse({ status: 200, description: 'List of consultations' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@Request() req) {
    return this.consultationsService.findAll(req.user.id, req.user.role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get consultation by ID' })
  @ApiParam({ name: 'id', description: 'Consultation ID' })
  @ApiResponse({ status: 200, description: 'Consultation details' })
  @ApiResponse({ status: 404, description: 'Consultation not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.consultationsService.findOne(id, req.user.id, req.user.role);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update consultation (doctors can add diagnosis)' })
  @ApiParam({ name: 'id', description: 'Consultation ID' })
  @ApiResponse({ status: 200, description: 'Consultation updated' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: [
            'PENDING',
            'IN_PROGRESS',
            'AWAITING_RESPONSE',
            'COMPLETED',
            'CANCELLED',
          ],
        },
        diagnosis: { type: 'string', example: 'Migraine headache' },
        prescription: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              medication: { type: 'string' },
              dosage: { type: 'string' },
              frequency: { type: 'string' },
              duration: { type: 'string' },
              instructions: { type: 'string' },
            },
          },
        },
        recommendations: {
          type: 'string',
          example: 'Rest and avoid bright lights',
        },
        followUpRequired: { type: 'boolean', example: true },
        followUpDate: { type: 'string', format: 'date-time' },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body(new ZodValidationPipe(updateConsultationSchema))
    updateDto: UpdateConsultationDto,
  ) {
    return this.consultationsService.update(
      id,
      req.user.id,
      req.user.role,
      updateDto,
    );
  }

  @Put(':id/assign/:doctorId')
  @ApiOperation({ summary: 'Assign doctor to consultation (admin only)' })
  @ApiParam({ name: 'id', description: 'Consultation ID' })
  @ApiParam({ name: 'doctorId', description: 'Doctor User ID' })
  @ApiResponse({ status: 200, description: 'Doctor assigned successfully' })
  async assignDoctor(
    @Param('id') id: string,
    @Param('doctorId') doctorId: string,
  ) {
    return this.consultationsService.assignDoctor(id, doctorId);
  }
}
