import { CLOUD_NAME, API_KEY, API_SECRET } from "../../config";
import multer, { FileFilterCallback } from 'multer';
import { v2 as cloudinaryV2, UploadApiOptions, UploadApiResponse, DeleteApiResponse,  } from 'cloudinary';

const { uploader } = cloudinaryV2;

cloudinaryV2.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const saveInMemory = (field: string) : void => {
    multer({
      storage: multer.memoryStorage(),
      fileFilter: fileFilter,
      limits: {
        fileSize: 1024 * 1024 * 5, // we are allowing only 5 MB files
      },
    }).single(field);
};

export const saveFileFromMemory = async (buffer: Buffer, key: string | null = null) : Promise<UploadApiResponse | null> => {
    const options: UploadApiOptions = {
        resource_type: 'auto',
        public_id: key || undefined,
        overwrite: true,
    };
    try {
        const result = await cloudinaryV2.uploader.upload('data:image/jpeg;base64,' + buffer.toString('base64'), options);
        return result;
    } catch (error) {
        return null;
    }
};

export const removeFile = async (key: string) : Promise<DeleteApiResponse> => await uploader.destroy(key);
