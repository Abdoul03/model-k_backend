import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustumOptionDto } from './dto/create-custum-option.dto';
import { UpdateCustumOptionDto } from './dto/update-custum-option.dto';
import { DatabaseService } from '../database/database.service';
import { DesignService } from '../design/design.service';
import { OptionCustomisation } from './entities/custum-option.entity';

@Injectable()
export class CustumOptionService {
  constructor(
    private readonly batabaseService: DatabaseService,
    private readonly modelService: DesignService,
  ) {}

  async create(
    createCustumOptionDto: CreateCustumOptionDto,
  ): Promise<OptionCustomisation> {
    const model = await this.modelService.findOne(
      createCustumOptionDto.modelId,
    );

    if (!model) {
      throw new NotFoundException('model introuvable');
    }
    const optionCustom = await this.batabaseService.optionCustomisation.create({
      data: {
        nom: createCustumOptionDto.nom,
        type: createCustumOptionDto.type,
        prixAjout: createCustumOptionDto.prixAjout,
        modelId: model.id,
      },
    });
    return optionCustom;
  }

  async findAll(modelId: number): Promise<OptionCustomisation[]> {
    const model = await this.modelService.findOne(modelId);

    if (!model) {
      throw new NotFoundException('model introuvable');
    }

    return await this.batabaseService.optionCustomisation.findMany({
      where: {
        modelId: model.id,
      },
      include: {
        model: true,
      },
    });
  }

  async findOne(optionId: number): Promise<OptionCustomisation> {
    const optionCustom =
      await this.batabaseService.optionCustomisation.findUnique({
        where: {
          id: optionId,
        },
        include: {
          model: true,
        },
      });
    if (!optionCustom) {
      throw new NotFoundException(
        `L'option de customisation avec l'ID ${optionId} est introuvable`,
      );
    }
    return optionCustom;
  }

  async update(
    id: number,
    updateCustumOptionDto: UpdateCustumOptionDto,
  ): Promise<OptionCustomisation> {
    const optionCustum =
      await this.batabaseService.optionCustomisation.findUnique({
        where: { id },
      });
    if (!optionCustum) {
      throw new NotFoundException('Option de customisation introuvable');
    }
    const updata = await this.batabaseService.optionCustomisation.update({
      where: { id },
      data: {
        ...updateCustumOptionDto,
      },
    });

    return updata;
  }

  async remove(id: number) {
    const optionCustum =
      await this.batabaseService.optionCustomisation.findUnique({
        where: { id },
      });
    if (!optionCustum) {
      throw new NotFoundException('Option de customisation introuvable');
    }

    return await this.batabaseService.optionCustomisation.delete({
      where: {
        id,
      },
    });
  }
}
