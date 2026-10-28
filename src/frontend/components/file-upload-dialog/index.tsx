import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IModalProps } from '@/interfaces/common';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileUploader } from '../file-uploader';

export function UploaderTabs() {
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="mb-4">
      <FileUploader
        maxFileCount={8}
        maxSize={8 * 1024 * 1024}
        onValueChange={setFiles}
      />
    </div>
  );
}

export function FileUploadDialog({ hideModal }: IModalProps<any>) {
  const { t } = useTranslation();

  return (
    <Dialog open onOpenChange={hideModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('fileManager.uploadFile')}</DialogTitle>
        </DialogHeader>
        <UploaderTabs></UploaderTabs>
        <DialogFooter>
          <Button type="submit" variant={'tertiary'} size={'sm'}>
            {t('common.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
