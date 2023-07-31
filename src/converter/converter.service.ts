import { Injectable } from '@nestjs/common';
import { InputJsonDto } from './dtos';
import { OutputJsonDto, ResponseData } from './types';

@Injectable()
export class ConvertService {
  convert(json: InputJsonDto): ResponseData {
    const convertedJson = new OutputJsonDto();
    const { Records = [] } = json;

    if (!Records.length) {
      return { json: null, status: false };
    }

    const { receipt, mail } = Records[0].ses;
    const { spamVerdict, virusVerdict, spfVerdict, dkimVerdict, dmarcVerdict } = receipt;

    convertedJson.spam = spamVerdict.status === 'PASS';
    convertedJson.virus = virusVerdict.status === 'PASS';
    convertedJson.dns =
      spfVerdict?.status === 'PASS' &&
      dkimVerdict?.status === 'PASS' &&
      dmarcVerdict?.status === 'PASS';
    convertedJson.mes = mail.timestamp.split('-')[1];
    convertedJson.retrasado = receipt.processingTimeMillis > 1000;
    convertedJson.emisor = mail.source.split('@')[0];
    convertedJson.receptor = mail.destination.map((recipient) => recipient.split('@')[0]);

    return {
      json: convertedJson,
      status: true,
    };
  }
}
