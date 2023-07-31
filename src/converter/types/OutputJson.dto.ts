export class OutputJsonDto {
    spam: boolean;
    virus: boolean;
    dns: boolean;
    mes: string;
    retrasado: boolean;
    emisor: string;
    receptor: string[];
  }

  export type ResponseData  = {
   json: OutputJsonDto | null;
   status: boolean;
  }