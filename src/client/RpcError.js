/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

export class RpcError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}
