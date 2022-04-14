import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BaseFormFieldAbstractComponent } from '@misc/abstracts/base-form-field.abstract.component';
import { AbstractControl } from '@angular/forms';
import { FileType } from '@models/enums/file-type.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { MatSliderChange } from '@angular/material/slider';
import { Observable } from 'rxjs';
import { base64ToFile } from '@misc/helpers/file/base64-to-file.helper';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent extends BaseFormFieldAbstractComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  @Output() fileDragover: EventEmitter<DragEvent> = new EventEmitter<DragEvent>();
  @Output() fileDragleave: EventEmitter<DragEvent> = new EventEmitter<DragEvent>();
  @Input() control: AbstractControl;
  @Input() fileType: FileType[] = [FileType.any];
  @Input() multiple: boolean = true;
  @Input() maxCountFile: number = 10;
  @Input() maxSizeFile: number;
  @Input() previewHeight: number = 160;
  @Input() previewWidth: number = 225;
  @Input() actionsYPosition: 'start' | 'end' | 'center' = 'end';
  @Input() actionsXPosition: 'start' | 'end' | 'center' = 'end';
  @Input() actionsColor: ThemePalette = 'primary';
  @Input() placeholderBrowse: string = '';
  @Input() isAvatar: boolean = false;
  filesOnLoading: Set<string> = new Set<string>();
  filesWithError: Set<string> = new Set<string>();
  selectFile: File[] = [];
  fileError: string = '';
  croppedImage: any = '';
  imageChangedEvent: any = '';
  showCropper = false;
  scale = 1;
  transform: ImageTransform = {};

  constructor(private _sanitizer: DomSanitizer, protected cdr: ChangeDetectorRef, protected translate: TranslateService) {
    super(cdr, translate);
  }

  ngOnInit(): void {
    this.selectFile = this.valueControl ? (this.multiple ? this.control.value : [this.control.value]) : [];
  }

  get isFileError(): boolean {
    return (this.control?.invalid && this.control?.touched) || !!this.fileError;
  }

  get fileErrorMessage(): string {
    if (this.fileError) {
      return this.fileError;
    }
    return this.errorMessage;
  }

  get valueControl(): File | File[] {
    return this.control?.value;
  }

  get actionsPositionClasses(): string[] {
    return [`file-uploader__file-actions_x-${this.actionsXPosition}`, `file-uploader__file-actions_y-${this.actionsYPosition}`];
  }

  getFiles(event: Event): File[] {
    return Array.prototype.map.call((event.target as HTMLInputElement).files, (file: File): File => file);
  }

  fileChangeHandler($event: any): void {
    const files: File[] = this.getFiles($event);
    const filteredFiles: File[] = files.filter(
      (file: File): boolean =>
        this.fileType.some((ft: FileType): boolean => ft === FileType.any || ft.includes(file.type)) &&
        this.selectFile.every((sFile: File): boolean => !(sFile.name === file.name))
    );

    if (!this.multiple) {
      this.selectFile.length = 0;

      if (filteredFiles.length > 1) {
        filteredFiles.length = 1;
      }
    }

    (this.selectFile as File[]).push(...filteredFiles);
    this.fileUploadHandler(filteredFiles);
    if (this.isAvatar) {
      this.isValidImage(filteredFiles[0])
        .then(() => {
          if (this.fileValidation(filteredFiles)) {
            this.imageChangedEvent = $event;
          }
        })
        .catch(() => (this.fileError = this.translate.instant('FILE_UPLOADER.INVALID_FORMAT')));
    }
  }

  fileUploadHandler(files: File[]): void {
    this.control.setValue(this.multiple ? files : files[0]);
  }

  fileValidation(files: File[]): boolean {
    if (files.find((file: File): boolean => this.toMB(file.size) > this.maxSizeFile)?.size) {
      this.fileError = this.translate.instant('FILE_UPLOADER.FILE_SIZE', { size: this.maxSizeFile });
      return false;
    } else {
      this.fileError = '';
    }

    if (this.maxCountFile && this.maxCountFile < files.length) {
      this.fileError = this.translate.instant('FILE_UPLOADER.SELECTED_FILES_MAX', { count: this.maxCountFile });
      return false;
    } else {
      this.fileError = '';
    }

    return true;
  }

  removeFile(idx: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    const haveBeenErrored: boolean = Boolean(this.fileError);
    this.filesWithError.delete(this.selectFile?.find?.((file: File, index: number): boolean => idx === index)?.name);
    this.selectFile = this.selectFile.filter((file: File, index: number): boolean => idx !== index);
    this.control.setValue(
      this.control.value?.length ? this.control.value.filter((file: File, index: number): boolean => idx !== index) : null
    );
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = this.control.value?.length
        ? this.control.value.filter((file: File, index: number): boolean => idx !== index)
        : null;
    }
    if (haveBeenErrored && this.fileValidation(this.selectFile as any as File[])) {
      this.fileUploadHandler(this.selectFile as any as File[]);
    }
  }

  isFileMaxSize(file: File): boolean {
    return this.toMB(file.size) > this.maxSizeFile;
  }

  formatBytes(bytes: number, decimals: number = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  chooseAnotherFile(): void {
    this.fileInput?.nativeElement.dispatchEvent(new MouseEvent('click'));
  }

  getNativeFileUrl(file: File): string {
    return this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file)) as string;
  }

  toMB(size: number): number {
    return size / 1024 ** 2;
  }

  getFileSize(size: number) {
    return this.formatBytes(size);
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
    this.base64ToFile(event.base64, 'photo.png').subscribe((file: File): void => this.control.setValue(file));
  }

  imageLoaded(): void {
    this.showCropper = true;
  }

  scaleImage(e: MatSliderChange) {
    this.scale = +e.value;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  isValidImage(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const imgElement = new Image();
      imgElement.onload = () => {
        resolve();
      };

      imgElement.onerror = () => {
        reject();
      };

      if (file) {
        imgElement.src = URL.createObjectURL(file);
      } else {
        reject();
      }
    });
  }

  base64ToFile(url: string, filename: string, mimeType?: string): Observable<File> {
    return base64ToFile(url, filename, mimeType);
  }
}
