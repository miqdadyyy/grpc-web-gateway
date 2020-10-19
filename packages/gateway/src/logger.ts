// Copyright 2018 dialog LLC <info@dlg.im>

import pino from 'pino';

export const logger = pino({ name: 'wss', prettyPrint: true });
