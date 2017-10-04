import { environment } from '../../../../environments/environment';

export function buildUrl(relativeUrl: string): string {
  return `http://${environment.host}${environment.port ? ':' + environment.port : ''}${environment.apiUrl}${relativeUrl}`;
}

export function checkIfSucceeded(status: number): boolean {
  return (status > 199) && (status < 300);
}
