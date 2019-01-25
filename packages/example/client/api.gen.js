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
   * @property {number|Long|null} [date] Ping date
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
   * @member {number|Long} date
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
   * @property {number|Long|null} [date] Pong date
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
   * @member {number|Long} date
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
