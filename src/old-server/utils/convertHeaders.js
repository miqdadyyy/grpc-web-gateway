/*
 * Copyright 2018 Dialog LLC <info@dlg.im>
 */

const _ = require('lodash');
const { Metadata } = require('grpc');

const allowed = new Set([
  'user-agent',

]);

function convertHeaders(headers) {
  const metadata = new Metadata();
  _.forEach(headers, (value, key) => {
    metadata.set(key, value);
  });

  return metadata;
}

module.exports = convertHeaders;
