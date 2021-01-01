export enum ResponseStatus {
  success = 'success',
  error = 'error',
}

interface ResponseTemplate<S> {
  code: number
  status: S
  message: string
}

export interface SuccessResponse<D> extends ResponseTemplate<ResponseStatus.success> {
  data: D
}

export interface ErrorResponse<E extends { [key: string]: any } = {}> extends ResponseTemplate<ResponseStatus.error> {
  errors: E
}
