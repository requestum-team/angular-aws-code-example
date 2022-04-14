import { from, Observable } from 'rxjs';

export function base64ToFile(url: string, filename: string, mimeType?: string): Observable<File> {
  mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
  return from(
    fetch(url)
      .then((res: Response) => res.arrayBuffer())
      .then((buf: ArrayBuffer) => new File([buf], filename, { type: mimeType }))
  );
}
