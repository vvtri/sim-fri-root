import axios from 'axios';
import { AudienceType, FileType } from 'shared';
import { presignFile } from '../services/index.service';

export async function uploadFile(audienceType: AudienceType, data: File) {
  const result = await new Promise<ArrayBuffer>((res) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      res(fileReader.result as any);
    });

    fileReader.readAsArrayBuffer(data);
  });

  const { file, presignedUrl } = await presignFile({
    audienceType,
    fileType: FileType[data.type as keyof typeof FileType] || 'png',
  });

  await axios.put(presignedUrl, result);

  return file;
}

export async function uploadFileBuffer(
  fileType: FileType,
  audienceType: AudienceType,
  data: Buffer,
) {
  const { file, presignedUrl } = await presignFile({ audienceType, fileType });

  await axios.put(presignedUrl, data, {
    headers: { 'Content-Length': new Blob([data]).size },
  });

  return file;
}
