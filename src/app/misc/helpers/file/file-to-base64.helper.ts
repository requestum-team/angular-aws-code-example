import { Observable, Subscriber } from 'rxjs';

export function fileToBase64(file: File): Observable<string> {
  const reader = new FileReader();
  return new Observable((subscriber: Subscriber<string>) => {
    reader.readAsDataURL(file);
    reader.onload = () => {
      subscriber.next(reader.result as string);
      subscriber.complete();
    };
    reader.onerror = (error: ProgressEvent<FileReader>) => {
      subscriber.error(error);
    };
  });
}
