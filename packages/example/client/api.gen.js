/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from 'protobufjs/minimal';

// Common aliases
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {});

export const Ping = ($root.Ping = (() => {
  /**
   * Properties of a Ping.
   * @exports IPing
   * @interface IPing
   * @property {Long|null} [date] Ping date
   */

  /**
   * Constructs a new Ping.
   * @exports Ping
   * @classdesc Represents a Ping.
   * @implements IPing
   * @constructor
   * @param {IPing=} [properties] Properties to set
   */
  function Ping(properties) {
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * Ping date.
   * @member {Long} date
   * @memberof Ping
   * @instance
   */
  Ping.prototype.date = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

  /**
   * Creates a new Ping instance using the specified properties.
   * @function create
   * @memberof Ping
   * @static
   * @param {IPing=} [properties] Properties to set
   * @returns {Ping} Ping instance
   */
  Ping.create = function create(properties) {
    return new Ping(properties);
  };

  /**
   * Encodes the specified Ping message. Does not implicitly {@link Ping.verify|verify} messages.
   * @function encode
   * @memberof Ping
   * @static
   * @param {IPing} message Ping message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Ping.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (message.date != null && message.hasOwnProperty('date'))
      writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.date);
    return writer;
  };

  /**
   * Encodes the specified Ping message, length delimited. Does not implicitly {@link Ping.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Ping
   * @static
   * @param {IPing} message Ping message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Ping.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a Ping message from the specified reader or buffer.
   * @function decode
   * @memberof Ping
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Ping} Ping
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Ping.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Ping();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.date = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes a Ping message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Ping
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Ping} Ping
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Ping.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a Ping message.
   * @function verify
   * @memberof Ping
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Ping.verify = function verify(message) {
    if (typeof message !== 'object' || message === null)
      return 'object expected';
    if (message.date != null && message.hasOwnProperty('date'))
      if (
        !$util.isInteger(message.date) &&
        !(
          message.date &&
          $util.isInteger(message.date.low) &&
          $util.isInteger(message.date.high)
        )
      )
        return 'date: integer|Long expected';
    return null;
  };

  /**
   * Creates a Ping message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof Ping
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {Ping} Ping
   */
  Ping.fromObject = function fromObject(object) {
    if (object instanceof $root.Ping) return object;
    let message = new $root.Ping();
    if (object.date != null)
      if ($util.Long)
        (message.date = $util.Long.fromValue(object.date)).unsigned = false;
      else if (typeof object.date === 'string')
        message.date = parseInt(object.date, 10);
      else if (typeof object.date === 'number') message.date = object.date;
      else if (typeof object.date === 'object')
        message.date = new $util.LongBits(
          object.date.low >>> 0,
          object.date.high >>> 0,
        ).toNumber();
    return message;
  };

  /**
   * Creates a plain object from a Ping message. Also converts values to other types if specified.
   * @function toObject
   * @memberof Ping
   * @static
   * @param {Ping} message Ping
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  Ping.toObject = function toObject(message, options) {
    if (!options) options = {};
    let object = {};
    if (options.defaults)
      if ($util.Long) {
        let long = new $util.Long(0, 0, false);
        object.date =
          options.longs === String
            ? long.toString()
            : options.longs === Number
            ? long.toNumber()
            : long;
      } else object.date = options.longs === String ? '0' : 0;
    if (message.date != null && message.hasOwnProperty('date'))
      if (typeof message.date === 'number')
        object.date =
          options.longs === String ? String(message.date) : message.date;
      else
        object.date =
          options.longs === String
            ? $util.Long.prototype.toString.call(message.date)
            : options.longs === Number
            ? new $util.LongBits(
                message.date.low >>> 0,
                message.date.high >>> 0,
              ).toNumber()
            : message.date;
    return object;
  };

  /**
   * Converts this Ping to JSON.
   * @function toJSON
   * @memberof Ping
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  Ping.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  return Ping;
})());

export const Pong = ($root.Pong = (() => {
  /**
   * Properties of a Pong.
   * @exports IPong
   * @interface IPong
   * @property {Long|null} [date] Pong date
   */

  /**
   * Constructs a new Pong.
   * @exports Pong
   * @classdesc Represents a Pong.
   * @implements IPong
   * @constructor
   * @param {IPong=} [properties] Properties to set
   */
  function Pong(properties) {
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * Pong date.
   * @member {Long} date
   * @memberof Pong
   * @instance
   */
  Pong.prototype.date = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

  /**
   * Creates a new Pong instance using the specified properties.
   * @function create
   * @memberof Pong
   * @static
   * @param {IPong=} [properties] Properties to set
   * @returns {Pong} Pong instance
   */
  Pong.create = function create(properties) {
    return new Pong(properties);
  };

  /**
   * Encodes the specified Pong message. Does not implicitly {@link Pong.verify|verify} messages.
   * @function encode
   * @memberof Pong
   * @static
   * @param {IPong} message Pong message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Pong.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (message.date != null && message.hasOwnProperty('date'))
      writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.date);
    return writer;
  };

  /**
   * Encodes the specified Pong message, length delimited. Does not implicitly {@link Pong.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Pong
   * @static
   * @param {IPong} message Pong message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Pong.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a Pong message from the specified reader or buffer.
   * @function decode
   * @memberof Pong
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Pong} Pong
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Pong.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Pong();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.date = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes a Pong message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Pong
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Pong} Pong
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Pong.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a Pong message.
   * @function verify
   * @memberof Pong
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Pong.verify = function verify(message) {
    if (typeof message !== 'object' || message === null)
      return 'object expected';
    if (message.date != null && message.hasOwnProperty('date'))
      if (
        !$util.isInteger(message.date) &&
        !(
          message.date &&
          $util.isInteger(message.date.low) &&
          $util.isInteger(message.date.high)
        )
      )
        return 'date: integer|Long expected';
    return null;
  };

  /**
   * Creates a Pong message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof Pong
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {Pong} Pong
   */
  Pong.fromObject = function fromObject(object) {
    if (object instanceof $root.Pong) return object;
    let message = new $root.Pong();
    if (object.date != null)
      if ($util.Long)
        (message.date = $util.Long.fromValue(object.date)).unsigned = false;
      else if (typeof object.date === 'string')
        message.date = parseInt(object.date, 10);
      else if (typeof object.date === 'number') message.date = object.date;
      else if (typeof object.date === 'object')
        message.date = new $util.LongBits(
          object.date.low >>> 0,
          object.date.high >>> 0,
        ).toNumber();
    return message;
  };

  /**
   * Creates a plain object from a Pong message. Also converts values to other types if specified.
   * @function toObject
   * @memberof Pong
   * @static
   * @param {Pong} message Pong
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  Pong.toObject = function toObject(message, options) {
    if (!options) options = {};
    let object = {};
    if (options.defaults)
      if ($util.Long) {
        let long = new $util.Long(0, 0, false);
        object.date =
          options.longs === String
            ? long.toString()
            : options.longs === Number
            ? long.toNumber()
            : long;
      } else object.date = options.longs === String ? '0' : 0;
    if (message.date != null && message.hasOwnProperty('date'))
      if (typeof message.date === 'number')
        object.date =
          options.longs === String ? String(message.date) : message.date;
      else
        object.date =
          options.longs === String
            ? $util.Long.prototype.toString.call(message.date)
            : options.longs === Number
            ? new $util.LongBits(
                message.date.low >>> 0,
                message.date.high >>> 0,
              ).toNumber()
            : message.date;
    return object;
  };

  /**
   * Converts this Pong to JSON.
   * @function toJSON
   * @memberof Pong
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  Pong.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  return Pong;
})());

export const BytesValue = ($root.BytesValue = (() => {
  /**
   * Properties of a BytesValue.
   * @exports IBytesValue
   * @interface IBytesValue
   * @property {Uint8Array|null} [value] BytesValue value
   */

  /**
   * Constructs a new BytesValue.
   * @exports BytesValue
   * @classdesc Represents a BytesValue.
   * @implements IBytesValue
   * @constructor
   * @param {IBytesValue=} [properties] Properties to set
   */
  function BytesValue(properties) {
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * BytesValue value.
   * @member {Uint8Array} value
   * @memberof BytesValue
   * @instance
   */
  BytesValue.prototype.value = $util.newBuffer([]);

  /**
   * Creates a new BytesValue instance using the specified properties.
   * @function create
   * @memberof BytesValue
   * @static
   * @param {IBytesValue=} [properties] Properties to set
   * @returns {BytesValue} BytesValue instance
   */
  BytesValue.create = function create(properties) {
    return new BytesValue(properties);
  };

  /**
   * Encodes the specified BytesValue message. Does not implicitly {@link BytesValue.verify|verify} messages.
   * @function encode
   * @memberof BytesValue
   * @static
   * @param {IBytesValue} message BytesValue message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  BytesValue.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (message.value != null && message.hasOwnProperty('value'))
      writer.uint32(/* id 1, wireType 2 =*/ 10).bytes(message.value);
    return writer;
  };

  /**
   * Encodes the specified BytesValue message, length delimited. Does not implicitly {@link BytesValue.verify|verify} messages.
   * @function encodeDelimited
   * @memberof BytesValue
   * @static
   * @param {IBytesValue} message BytesValue message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  BytesValue.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a BytesValue message from the specified reader or buffer.
   * @function decode
   * @memberof BytesValue
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {BytesValue} BytesValue
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  BytesValue.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.BytesValue();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes a BytesValue message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof BytesValue
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {BytesValue} BytesValue
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  BytesValue.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a BytesValue message.
   * @function verify
   * @memberof BytesValue
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  BytesValue.verify = function verify(message) {
    if (typeof message !== 'object' || message === null)
      return 'object expected';
    if (message.value != null && message.hasOwnProperty('value'))
      if (
        !(
          (message.value && typeof message.value.length === 'number') ||
          $util.isString(message.value)
        )
      )
        return 'value: buffer expected';
    return null;
  };

  /**
   * Creates a BytesValue message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof BytesValue
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {BytesValue} BytesValue
   */
  BytesValue.fromObject = function fromObject(object) {
    if (object instanceof $root.BytesValue) return object;
    let message = new $root.BytesValue();
    if (object.value != null)
      if (typeof object.value === 'string')
        $util.base64.decode(
          object.value,
          (message.value = $util.newBuffer($util.base64.length(object.value))),
          0,
        );
      else if (object.value.length) message.value = object.value;
    return message;
  };

  /**
   * Creates a plain object from a BytesValue message. Also converts values to other types if specified.
   * @function toObject
   * @memberof BytesValue
   * @static
   * @param {BytesValue} message BytesValue
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  BytesValue.toObject = function toObject(message, options) {
    if (!options) options = {};
    let object = {};
    if (options.defaults)
      if (options.bytes === String) object.value = '';
      else {
        object.value = [];
        if (options.bytes !== Array)
          object.value = $util.newBuffer(object.value);
      }
    if (message.value != null && message.hasOwnProperty('value'))
      object.value =
        options.bytes === String
          ? $util.base64.encode(message.value, 0, message.value.length)
          : options.bytes === Array
          ? Array.prototype.slice.call(message.value)
          : message.value;
    return object;
  };

  /**
   * Converts this BytesValue to JSON.
   * @function toJSON
   * @memberof BytesValue
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  BytesValue.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  return BytesValue;
})());

export const Bytes = ($root.Bytes = (() => {
  /**
   * Properties of a Bytes.
   * @exports IBytes
   * @interface IBytes
   * @property {IBytesValue|null} [byteString] Bytes byteString
   */

  /**
   * Constructs a new Bytes.
   * @exports Bytes
   * @classdesc Represents a Bytes.
   * @implements IBytes
   * @constructor
   * @param {IBytes=} [properties] Properties to set
   */
  function Bytes(properties) {
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * Bytes byteString.
   * @member {IBytesValue|null|undefined} byteString
   * @memberof Bytes
   * @instance
   */
  Bytes.prototype.byteString = null;

  /**
   * Creates a new Bytes instance using the specified properties.
   * @function create
   * @memberof Bytes
   * @static
   * @param {IBytes=} [properties] Properties to set
   * @returns {Bytes} Bytes instance
   */
  Bytes.create = function create(properties) {
    return new Bytes(properties);
  };

  /**
   * Encodes the specified Bytes message. Does not implicitly {@link Bytes.verify|verify} messages.
   * @function encode
   * @memberof Bytes
   * @static
   * @param {IBytes} message Bytes message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Bytes.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (message.byteString != null && message.hasOwnProperty('byteString'))
      $root.BytesValue.encode(
        message.byteString,
        writer.uint32(/* id 1, wireType 2 =*/ 10).fork(),
      ).ldelim();
    return writer;
  };

  /**
   * Encodes the specified Bytes message, length delimited. Does not implicitly {@link Bytes.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Bytes
   * @static
   * @param {IBytes} message Bytes message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Bytes.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a Bytes message from the specified reader or buffer.
   * @function decode
   * @memberof Bytes
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Bytes} Bytes
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Bytes.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Bytes();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byteString = $root.BytesValue.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes a Bytes message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Bytes
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Bytes} Bytes
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Bytes.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a Bytes message.
   * @function verify
   * @memberof Bytes
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Bytes.verify = function verify(message) {
    if (typeof message !== 'object' || message === null)
      return 'object expected';
    if (message.byteString != null && message.hasOwnProperty('byteString')) {
      let error = $root.BytesValue.verify(message.byteString);
      if (error) return 'byteString.' + error;
    }
    return null;
  };

  /**
   * Creates a Bytes message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof Bytes
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {Bytes} Bytes
   */
  Bytes.fromObject = function fromObject(object) {
    if (object instanceof $root.Bytes) return object;
    let message = new $root.Bytes();
    if (object.byteString != null) {
      if (typeof object.byteString !== 'object')
        throw TypeError('.Bytes.byteString: object expected');
      message.byteString = $root.BytesValue.fromObject(object.byteString);
    }
    return message;
  };

  /**
   * Creates a plain object from a Bytes message. Also converts values to other types if specified.
   * @function toObject
   * @memberof Bytes
   * @static
   * @param {Bytes} message Bytes
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  Bytes.toObject = function toObject(message, options) {
    if (!options) options = {};
    let object = {};
    if (options.defaults) object.byteString = null;
    if (message.byteString != null && message.hasOwnProperty('byteString'))
      object.byteString = $root.BytesValue.toObject(
        message.byteString,
        options,
      );
    return object;
  };

  /**
   * Converts this Bytes to JSON.
   * @function toJSON
   * @memberof Bytes
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  Bytes.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  return Bytes;
})());

export const Long = ($root.Long = (() => {
  /**
   * Properties of a Long.
   * @exports ILong
   * @interface ILong
   * @property {Long|null} [long] Long long
   */

  /**
   * Constructs a new Long.
   * @exports Long
   * @classdesc Represents a Long.
   * @implements ILong
   * @constructor
   * @param {ILong=} [properties] Properties to set
   */
  function Long(properties) {
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * Long long.
   * @member {Long} long
   * @memberof Long
   * @instance
   */
  Long.prototype.long = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

  /**
   * Creates a new Long instance using the specified properties.
   * @function create
   * @memberof Long
   * @static
   * @param {ILong=} [properties] Properties to set
   * @returns {Long} Long instance
   */
  Long.create = function create(properties) {
    return new Long(properties);
  };

  /**
   * Encodes the specified Long message. Does not implicitly {@link Long.verify|verify} messages.
   * @function encode
   * @memberof Long
   * @static
   * @param {ILong} message Long message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Long.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (message.long != null && message.hasOwnProperty('long'))
      writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.long);
    return writer;
  };

  /**
   * Encodes the specified Long message, length delimited. Does not implicitly {@link Long.verify|verify} messages.
   * @function encodeDelimited
   * @memberof Long
   * @static
   * @param {ILong} message Long message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Long.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a Long message from the specified reader or buffer.
   * @function decode
   * @memberof Long
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Long} Long
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Long.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Long();
    while (reader.pos < end) {
      let tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.long = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes a Long message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof Long
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {Long} Long
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Long.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a Long message.
   * @function verify
   * @memberof Long
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Long.verify = function verify(message) {
    if (typeof message !== 'object' || message === null)
      return 'object expected';
    if (message.long != null && message.hasOwnProperty('long'))
      if (
        !$util.isInteger(message.long) &&
        !(
          message.long &&
          $util.isInteger(message.long.low) &&
          $util.isInteger(message.long.high)
        )
      )
        return 'long: integer|Long expected';
    return null;
  };

  /**
   * Creates a Long message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof Long
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {Long} Long
   */
  Long.fromObject = function fromObject(object) {
    if (object instanceof $root.Long) return object;
    let message = new $root.Long();
    if (object.long != null)
      if ($util.Long)
        (message.long = $util.Long.fromValue(object.long)).unsigned = false;
      else if (typeof object.long === 'string')
        message.long = parseInt(object.long, 10);
      else if (typeof object.long === 'number') message.long = object.long;
      else if (typeof object.long === 'object')
        message.long = new $util.LongBits(
          object.long.low >>> 0,
          object.long.high >>> 0,
        ).toNumber();
    return message;
  };

  /**
   * Creates a plain object from a Long message. Also converts values to other types if specified.
   * @function toObject
   * @memberof Long
   * @static
   * @param {Long} message Long
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  Long.toObject = function toObject(message, options) {
    if (!options) options = {};
    let object = {};
    if (options.defaults)
      if ($util.Long) {
        let long = new $util.Long(0, 0, false);
        object.long =
          options.longs === String
            ? long.toString()
            : options.longs === Number
            ? long.toNumber()
            : long;
      } else object.long = options.longs === String ? '0' : 0;
    if (message.long != null && message.hasOwnProperty('long'))
      if (typeof message.long === 'number')
        object.long =
          options.longs === String ? String(message.long) : message.long;
      else
        object.long =
          options.longs === String
            ? $util.Long.prototype.toString.call(message.long)
            : options.longs === Number
            ? new $util.LongBits(
                message.long.low >>> 0,
                message.long.high >>> 0,
              ).toNumber()
            : message.long;
    return object;
  };

  /**
   * Converts this Long to JSON.
   * @function toJSON
   * @memberof Long
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  Long.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  return Long;
})());

export const Test = ($root.Test = (() => {
  /**
   * Constructs a new Test service.
   * @exports Test
   * @classdesc Represents a Test
   * @extends $protobuf.rpc.Service
   * @constructor
   * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
   * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
   * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
   */
  function Test(rpcImpl, requestDelimited, responseDelimited) {
    $protobuf.rpc.Service.call(
      this,
      rpcImpl,
      requestDelimited,
      responseDelimited,
    );
  }

  (Test.prototype = Object.create(
    $protobuf.rpc.Service.prototype,
  )).constructor = Test;

  /**
   * Creates new Test service using the specified rpc implementation.
   * @function create
   * @memberof Test
   * @static
   * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
   * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
   * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
   * @returns {Test} RPC service. Useful where requests and/or responses are streamed.
   */
  Test.create = function create(rpcImpl, requestDelimited, responseDelimited) {
    return new this(rpcImpl, requestDelimited, responseDelimited);
  };

  /**
   * Callback as used by {@link Test#unary}.
   * @memberof Test
   * @typedef UnaryCallback
   * @type {function}
   * @param {Error|null} error Error, if any
   * @param {Pong} [response] Pong
   */

  /**
   * Calls Unary.
   * @function unary
   * @memberof Test
   * @instance
   * @param {IPing} request Ping message or plain object
   * @param {Test.UnaryCallback} callback Node-style callback called with the error, if any, and Pong
   * @returns {undefined}
   * @variation 1
   */
  Object.defineProperty(
    (Test.prototype.unary = function unary(request, callback) {
      return this.rpcCall(unary, $root.Ping, $root.Pong, request, callback);
    }),
    'name',
    { value: 'Unary' },
  );

  /**
   * Calls Unary.
   * @function unary
   * @memberof Test
   * @instance
   * @param {IPing} request Ping message or plain object
   * @returns {Promise<Pong>} Promise
   * @variation 2
   */

  /**
   * Callback as used by {@link Test#unaryBytes}.
   * @memberof Test
   * @typedef UnaryBytesCallback
   * @type {function}
   * @param {Error|null} error Error, if any
   * @param {Bytes} [response] Bytes
   */

  /**
   * Calls UnaryBytes.
   * @function unaryBytes
   * @memberof Test
   * @instance
   * @param {IBytes} request Bytes message or plain object
   * @param {Test.UnaryBytesCallback} callback Node-style callback called with the error, if any, and Bytes
   * @returns {undefined}
   * @variation 1
   */
  Object.defineProperty(
    (Test.prototype.unaryBytes = function unaryBytes(request, callback) {
      return this.rpcCall(
        unaryBytes,
        $root.Bytes,
        $root.Bytes,
        request,
        callback,
      );
    }),
    'name',
    { value: 'UnaryBytes' },
  );

  /**
   * Calls UnaryBytes.
   * @function unaryBytes
   * @memberof Test
   * @instance
   * @param {IBytes} request Bytes message or plain object
   * @returns {Promise<Bytes>} Promise
   * @variation 2
   */

  /**
   * Callback as used by {@link Test#long}.
   * @memberof Test
   * @typedef LongCallback
   * @type {function}
   * @param {Error|null} error Error, if any
   * @param {Long} [response] Long
   */

  /**
   * Calls Long.
   * @function long
   * @memberof Test
   * @instance
   * @param {ILong} request Long message or plain object
   * @param {Test.LongCallback} callback Node-style callback called with the error, if any, and Long
   * @returns {undefined}
   * @variation 1
   */
  Object.defineProperty(
    (Test.prototype.long = function long(request, callback) {
      return this.rpcCall(long, $root.Long, $root.Long, request, callback);
    }),
    'name',
    { value: 'Long' },
  );

  /**
   * Calls Long.
   * @function long
   * @memberof Test
   * @instance
   * @param {ILong} request Long message or plain object
   * @returns {Promise<Long>} Promise
   * @variation 2
   */

  /**
   * Callback as used by {@link Test#serverStream}.
   * @memberof Test
   * @typedef ServerStreamCallback
   * @type {function}
   * @param {Error|null} error Error, if any
   * @param {Pong} [response] Pong
   */

  /**
   * Calls ServerStream.
   * @function serverStream
   * @memberof Test
   * @instance
   * @param {IPing} request Ping message or plain object
   * @param {Test.ServerStreamCallback} callback Node-style callback called with the error, if any, and Pong
   * @returns {undefined}
   * @variation 1
   */
  Object.defineProperty(
    (Test.prototype.serverStream = function serverStream(request, callback) {
      return this.rpcCall(
        serverStream,
        $root.Ping,
        $root.Pong,
        request,
        callback,
      );
    }),
    'name',
    { value: 'ServerStream' },
  );

  /**
   * Calls ServerStream.
   * @function serverStream
   * @memberof Test
   * @instance
   * @param {IPing} request Ping message or plain object
   * @returns {Promise<Pong>} Promise
   * @variation 2
   */

  /**
   * Callback as used by {@link Test#clientStream}.
   * @memberof Test
   * @typedef ClientStreamCallback
   * @type {function}
   * @param {Error|null} error Error, if any
   * @param {Pong} [response] Pong
   */

  /**
   * Calls ClientStream.
   * @function clientStream
   * @memberof Test
   * @instance
   * @param {IPing} request Ping message or plain object
   * @param {Test.ClientStreamCallback} callback Node-style callback called with the error, if any, and Pong
   * @returns {undefined}
   * @variation 1
   */
  Object.defineProperty(
    (Test.prototype.clientStream = function clientStream(request, callback) {
      return this.rpcCall(
        clientStream,
        $root.Ping,
        $root.Pong,
        request,
        callback,
      );
    }),
    'name',
    { value: 'ClientStream' },
  );

  /**
   * Calls ClientStream.
   * @function clientStream
   * @memberof Test
   * @instance
   * @param {IPing} request Ping message or plain object
   * @returns {Promise<Pong>} Promise
   * @variation 2
   */

  /**
   * Callback as used by {@link Test#bidiStream}.
   * @memberof Test
   * @typedef BidiStreamCallback
   * @type {function}
   * @param {Error|null} error Error, if any
   * @param {Pong} [response] Pong
   */

  /**
   * Calls BidiStream.
   * @function bidiStream
   * @memberof Test
   * @instance
   * @param {IPing} request Ping message or plain object
   * @param {Test.BidiStreamCallback} callback Node-style callback called with the error, if any, and Pong
   * @returns {undefined}
   * @variation 1
   */
  Object.defineProperty(
    (Test.prototype.bidiStream = function bidiStream(request, callback) {
      return this.rpcCall(
        bidiStream,
        $root.Ping,
        $root.Pong,
        request,
        callback,
      );
    }),
    'name',
    { value: 'BidiStream' },
  );

  /**
   * Calls BidiStream.
   * @function bidiStream
   * @memberof Test
   * @instance
   * @param {IPing} request Ping message or plain object
   * @returns {Promise<Pong>} Promise
   * @variation 2
   */

  return Test;
})());

export { $root as default };
