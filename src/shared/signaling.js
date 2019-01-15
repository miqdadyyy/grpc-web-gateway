/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * Status enum.
 * @exports Status
 * @enum {string}
 * @property {number} UNKNOWN=0 UNKNOWN value
 * @property {number} OK=1 OK value
 * @property {number} CANCELLED=2 CANCELLED value
 * @property {number} INVALID_ARGUMENT=3 INVALID_ARGUMENT value
 * @property {number} DEADLINE_EXCEEDED=4 DEADLINE_EXCEEDED value
 * @property {number} NOT_FOUND=5 NOT_FOUND value
 * @property {number} ALREADY_EXISTS=6 ALREADY_EXISTS value
 * @property {number} PERMISSION_DENIED=7 PERMISSION_DENIED value
 * @property {number} UNAUTHENTICATED=8 UNAUTHENTICATED value
 * @property {number} RESOURCE_EXHAUSTED=9 RESOURCE_EXHAUSTED value
 * @property {number} FAILED_PRECONDITION=10 FAILED_PRECONDITION value
 * @property {number} ABORTED=11 ABORTED value
 * @property {number} OUT_OF_RANGE=12 OUT_OF_RANGE value
 * @property {number} UNIMPLEMENTED=13 UNIMPLEMENTED value
 * @property {number} INTERNAL=14 INTERNAL value
 * @property {number} UNAVAILABLE=15 UNAVAILABLE value
 * @property {number} DATA_LOSS=16 DATA_LOSS value
 */
$root.Status = (function() {
    const valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN"] = 0;
    values[valuesById[1] = "OK"] = 1;
    values[valuesById[2] = "CANCELLED"] = 2;
    values[valuesById[3] = "INVALID_ARGUMENT"] = 3;
    values[valuesById[4] = "DEADLINE_EXCEEDED"] = 4;
    values[valuesById[5] = "NOT_FOUND"] = 5;
    values[valuesById[6] = "ALREADY_EXISTS"] = 6;
    values[valuesById[7] = "PERMISSION_DENIED"] = 7;
    values[valuesById[8] = "UNAUTHENTICATED"] = 8;
    values[valuesById[9] = "RESOURCE_EXHAUSTED"] = 9;
    values[valuesById[10] = "FAILED_PRECONDITION"] = 10;
    values[valuesById[11] = "ABORTED"] = 11;
    values[valuesById[12] = "OUT_OF_RANGE"] = 12;
    values[valuesById[13] = "UNIMPLEMENTED"] = 13;
    values[valuesById[14] = "INTERNAL"] = 14;
    values[valuesById[15] = "UNAVAILABLE"] = 15;
    values[valuesById[16] = "DATA_LOSS"] = 16;
    return values;
})();

export const Request = $root.Request = (() => {

    /**
     * Properties of a Request.
     * @exports IRequest
     * @interface IRequest
     * @property {string|null} [id] Request id
     * @property {IUnaryRequestBody|null} [unary] Request unary
     * @property {IStreamRequestBody|null} [stream] Request stream
     * @property {IPushRequestBody|null} [push] Request push
     * @property {IEndRequestBody|null} [end] Request end
     * @property {ICancelRequestBody|null} [cancel] Request cancel
     */

    /**
     * Constructs a new Request.
     * @exports Request
     * @classdesc Represents a Request.
     * @implements IRequest
     * @constructor
     * @param {IRequest=} [properties] Properties to set
     */
    function Request(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Request id.
     * @member {string} id
     * @memberof Request
     * @instance
     */
    Request.prototype.id = "";

    /**
     * Request unary.
     * @member {IUnaryRequestBody|null|undefined} unary
     * @memberof Request
     * @instance
     */
    Request.prototype.unary = null;

    /**
     * Request stream.
     * @member {IStreamRequestBody|null|undefined} stream
     * @memberof Request
     * @instance
     */
    Request.prototype.stream = null;

    /**
     * Request push.
     * @member {IPushRequestBody|null|undefined} push
     * @memberof Request
     * @instance
     */
    Request.prototype.push = null;

    /**
     * Request end.
     * @member {IEndRequestBody|null|undefined} end
     * @memberof Request
     * @instance
     */
    Request.prototype.end = null;

    /**
     * Request cancel.
     * @member {ICancelRequestBody|null|undefined} cancel
     * @memberof Request
     * @instance
     */
    Request.prototype.cancel = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Request body.
     * @member {"unary"|"stream"|"push"|"end"|"cancel"|undefined} body
     * @memberof Request
     * @instance
     */
    Object.defineProperty(Request.prototype, "body", {
        get: $util.oneOfGetter($oneOfFields = ["unary", "stream", "push", "end", "cancel"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Request instance using the specified properties.
     * @function create
     * @memberof Request
     * @static
     * @param {IRequest=} [properties] Properties to set
     * @returns {Request} Request instance
     */
    Request.create = function create(properties) {
        return new Request(properties);
    };

    /**
     * Encodes the specified Request message. Does not implicitly {@link Request.verify|verify} messages.
     * @function encode
     * @memberof Request
     * @static
     * @param {IRequest} message Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Request.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.unary != null && message.hasOwnProperty("unary"))
            $root.UnaryRequestBody.encode(message.unary, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.stream != null && message.hasOwnProperty("stream"))
            $root.StreamRequestBody.encode(message.stream, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.push != null && message.hasOwnProperty("push"))
            $root.PushRequestBody.encode(message.push, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.end != null && message.hasOwnProperty("end"))
            $root.EndRequestBody.encode(message.end, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.cancel != null && message.hasOwnProperty("cancel"))
            $root.CancelRequestBody.encode(message.cancel, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Request message, length delimited. Does not implicitly {@link Request.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Request
     * @static
     * @param {IRequest} message Request message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Request.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Request message from the specified reader or buffer.
     * @function decode
     * @memberof Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Request} Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Request.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Request();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.string();
                break;
            case 2:
                message.unary = $root.UnaryRequestBody.decode(reader, reader.uint32());
                break;
            case 3:
                message.stream = $root.StreamRequestBody.decode(reader, reader.uint32());
                break;
            case 4:
                message.push = $root.PushRequestBody.decode(reader, reader.uint32());
                break;
            case 5:
                message.end = $root.EndRequestBody.decode(reader, reader.uint32());
                break;
            case 6:
                message.cancel = $root.CancelRequestBody.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Request message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Request
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Request} Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Request.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Request message.
     * @function verify
     * @memberof Request
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Request.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.unary != null && message.hasOwnProperty("unary")) {
            properties.body = 1;
            {
                let error = $root.UnaryRequestBody.verify(message.unary);
                if (error)
                    return "unary." + error;
            }
        }
        if (message.stream != null && message.hasOwnProperty("stream")) {
            if (properties.body === 1)
                return "body: multiple values";
            properties.body = 1;
            {
                let error = $root.StreamRequestBody.verify(message.stream);
                if (error)
                    return "stream." + error;
            }
        }
        if (message.push != null && message.hasOwnProperty("push")) {
            if (properties.body === 1)
                return "body: multiple values";
            properties.body = 1;
            {
                let error = $root.PushRequestBody.verify(message.push);
                if (error)
                    return "push." + error;
            }
        }
        if (message.end != null && message.hasOwnProperty("end")) {
            if (properties.body === 1)
                return "body: multiple values";
            properties.body = 1;
            {
                let error = $root.EndRequestBody.verify(message.end);
                if (error)
                    return "end." + error;
            }
        }
        if (message.cancel != null && message.hasOwnProperty("cancel")) {
            if (properties.body === 1)
                return "body: multiple values";
            properties.body = 1;
            {
                let error = $root.CancelRequestBody.verify(message.cancel);
                if (error)
                    return "cancel." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Request message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Request
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Request} Request
     */
    Request.fromObject = function fromObject(object) {
        if (object instanceof $root.Request)
            return object;
        let message = new $root.Request();
        if (object.id != null)
            message.id = String(object.id);
        if (object.unary != null) {
            if (typeof object.unary !== "object")
                throw TypeError(".Request.unary: object expected");
            message.unary = $root.UnaryRequestBody.fromObject(object.unary);
        }
        if (object.stream != null) {
            if (typeof object.stream !== "object")
                throw TypeError(".Request.stream: object expected");
            message.stream = $root.StreamRequestBody.fromObject(object.stream);
        }
        if (object.push != null) {
            if (typeof object.push !== "object")
                throw TypeError(".Request.push: object expected");
            message.push = $root.PushRequestBody.fromObject(object.push);
        }
        if (object.end != null) {
            if (typeof object.end !== "object")
                throw TypeError(".Request.end: object expected");
            message.end = $root.EndRequestBody.fromObject(object.end);
        }
        if (object.cancel != null) {
            if (typeof object.cancel !== "object")
                throw TypeError(".Request.cancel: object expected");
            message.cancel = $root.CancelRequestBody.fromObject(object.cancel);
        }
        return message;
    };

    /**
     * Creates a plain object from a Request message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Request
     * @static
     * @param {Request} message Request
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Request.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.id = "";
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.unary != null && message.hasOwnProperty("unary")) {
            object.unary = $root.UnaryRequestBody.toObject(message.unary, options);
            if (options.oneofs)
                object.body = "unary";
        }
        if (message.stream != null && message.hasOwnProperty("stream")) {
            object.stream = $root.StreamRequestBody.toObject(message.stream, options);
            if (options.oneofs)
                object.body = "stream";
        }
        if (message.push != null && message.hasOwnProperty("push")) {
            object.push = $root.PushRequestBody.toObject(message.push, options);
            if (options.oneofs)
                object.body = "push";
        }
        if (message.end != null && message.hasOwnProperty("end")) {
            object.end = $root.EndRequestBody.toObject(message.end, options);
            if (options.oneofs)
                object.body = "end";
        }
        if (message.cancel != null && message.hasOwnProperty("cancel")) {
            object.cancel = $root.CancelRequestBody.toObject(message.cancel, options);
            if (options.oneofs)
                object.body = "cancel";
        }
        return object;
    };

    /**
     * Converts this Request to JSON.
     * @function toJSON
     * @memberof Request
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Request.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Request;
})();

export const UnaryRequestBody = $root.UnaryRequestBody = (() => {

    /**
     * Properties of an UnaryRequestBody.
     * @exports IUnaryRequestBody
     * @interface IUnaryRequestBody
     * @property {string|null} [service] UnaryRequestBody service
     * @property {string|null} [method] UnaryRequestBody method
     * @property {Uint8Array|null} [payload] UnaryRequestBody payload
     * @property {Object.<string,string>|null} [metadata] UnaryRequestBody metadata
     */

    /**
     * Constructs a new UnaryRequestBody.
     * @exports UnaryRequestBody
     * @classdesc Represents an UnaryRequestBody.
     * @implements IUnaryRequestBody
     * @constructor
     * @param {IUnaryRequestBody=} [properties] Properties to set
     */
    function UnaryRequestBody(properties) {
        this.metadata = {};
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UnaryRequestBody service.
     * @member {string} service
     * @memberof UnaryRequestBody
     * @instance
     */
    UnaryRequestBody.prototype.service = "";

    /**
     * UnaryRequestBody method.
     * @member {string} method
     * @memberof UnaryRequestBody
     * @instance
     */
    UnaryRequestBody.prototype.method = "";

    /**
     * UnaryRequestBody payload.
     * @member {Uint8Array} payload
     * @memberof UnaryRequestBody
     * @instance
     */
    UnaryRequestBody.prototype.payload = $util.newBuffer([]);

    /**
     * UnaryRequestBody metadata.
     * @member {Object.<string,string>} metadata
     * @memberof UnaryRequestBody
     * @instance
     */
    UnaryRequestBody.prototype.metadata = $util.emptyObject;

    /**
     * Creates a new UnaryRequestBody instance using the specified properties.
     * @function create
     * @memberof UnaryRequestBody
     * @static
     * @param {IUnaryRequestBody=} [properties] Properties to set
     * @returns {UnaryRequestBody} UnaryRequestBody instance
     */
    UnaryRequestBody.create = function create(properties) {
        return new UnaryRequestBody(properties);
    };

    /**
     * Encodes the specified UnaryRequestBody message. Does not implicitly {@link UnaryRequestBody.verify|verify} messages.
     * @function encode
     * @memberof UnaryRequestBody
     * @static
     * @param {IUnaryRequestBody} message UnaryRequestBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UnaryRequestBody.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.service != null && message.hasOwnProperty("service"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.service);
        if (message.method != null && message.hasOwnProperty("method"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.method);
        if (message.payload != null && message.hasOwnProperty("payload"))
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.payload);
        if (message.metadata != null && message.hasOwnProperty("metadata"))
            for (let keys = Object.keys(message.metadata), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 4, wireType 2 =*/34).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.metadata[keys[i]]).ldelim();
        return writer;
    };

    /**
     * Encodes the specified UnaryRequestBody message, length delimited. Does not implicitly {@link UnaryRequestBody.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UnaryRequestBody
     * @static
     * @param {IUnaryRequestBody} message UnaryRequestBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UnaryRequestBody.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an UnaryRequestBody message from the specified reader or buffer.
     * @function decode
     * @memberof UnaryRequestBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UnaryRequestBody} UnaryRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UnaryRequestBody.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.UnaryRequestBody(), key;
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.service = reader.string();
                break;
            case 2:
                message.method = reader.string();
                break;
            case 3:
                message.payload = reader.bytes();
                break;
            case 4:
                reader.skip().pos++;
                if (message.metadata === $util.emptyObject)
                    message.metadata = {};
                key = reader.string();
                reader.pos++;
                message.metadata[key] = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an UnaryRequestBody message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UnaryRequestBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UnaryRequestBody} UnaryRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UnaryRequestBody.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an UnaryRequestBody message.
     * @function verify
     * @memberof UnaryRequestBody
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UnaryRequestBody.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.service != null && message.hasOwnProperty("service"))
            if (!$util.isString(message.service))
                return "service: string expected";
        if (message.method != null && message.hasOwnProperty("method"))
            if (!$util.isString(message.method))
                return "method: string expected";
        if (message.payload != null && message.hasOwnProperty("payload"))
            if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                return "payload: buffer expected";
        if (message.metadata != null && message.hasOwnProperty("metadata")) {
            if (!$util.isObject(message.metadata))
                return "metadata: object expected";
            let key = Object.keys(message.metadata);
            for (let i = 0; i < key.length; ++i)
                if (!$util.isString(message.metadata[key[i]]))
                    return "metadata: string{k:string} expected";
        }
        return null;
    };

    /**
     * Creates an UnaryRequestBody message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UnaryRequestBody
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UnaryRequestBody} UnaryRequestBody
     */
    UnaryRequestBody.fromObject = function fromObject(object) {
        if (object instanceof $root.UnaryRequestBody)
            return object;
        let message = new $root.UnaryRequestBody();
        if (object.service != null)
            message.service = String(object.service);
        if (object.method != null)
            message.method = String(object.method);
        if (object.payload != null)
            if (typeof object.payload === "string")
                $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
            else if (object.payload.length)
                message.payload = object.payload;
        if (object.metadata) {
            if (typeof object.metadata !== "object")
                throw TypeError(".UnaryRequestBody.metadata: object expected");
            message.metadata = {};
            for (let keys = Object.keys(object.metadata), i = 0; i < keys.length; ++i)
                message.metadata[keys[i]] = String(object.metadata[keys[i]]);
        }
        return message;
    };

    /**
     * Creates a plain object from an UnaryRequestBody message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UnaryRequestBody
     * @static
     * @param {UnaryRequestBody} message UnaryRequestBody
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UnaryRequestBody.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.objects || options.defaults)
            object.metadata = {};
        if (options.defaults) {
            object.service = "";
            object.method = "";
            if (options.bytes === String)
                object.payload = "";
            else {
                object.payload = [];
                if (options.bytes !== Array)
                    object.payload = $util.newBuffer(object.payload);
            }
        }
        if (message.service != null && message.hasOwnProperty("service"))
            object.service = message.service;
        if (message.method != null && message.hasOwnProperty("method"))
            object.method = message.method;
        if (message.payload != null && message.hasOwnProperty("payload"))
            object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
        let keys2;
        if (message.metadata && (keys2 = Object.keys(message.metadata)).length) {
            object.metadata = {};
            for (let j = 0; j < keys2.length; ++j)
                object.metadata[keys2[j]] = message.metadata[keys2[j]];
        }
        return object;
    };

    /**
     * Converts this UnaryRequestBody to JSON.
     * @function toJSON
     * @memberof UnaryRequestBody
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UnaryRequestBody.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UnaryRequestBody;
})();

export const StreamRequestBody = $root.StreamRequestBody = (() => {

    /**
     * Properties of a StreamRequestBody.
     * @exports IStreamRequestBody
     * @interface IStreamRequestBody
     * @property {string|null} [service] StreamRequestBody service
     * @property {string|null} [method] StreamRequestBody method
     * @property {Object.<string,string>|null} [metadata] StreamRequestBody metadata
     */

    /**
     * Constructs a new StreamRequestBody.
     * @exports StreamRequestBody
     * @classdesc Represents a StreamRequestBody.
     * @implements IStreamRequestBody
     * @constructor
     * @param {IStreamRequestBody=} [properties] Properties to set
     */
    function StreamRequestBody(properties) {
        this.metadata = {};
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * StreamRequestBody service.
     * @member {string} service
     * @memberof StreamRequestBody
     * @instance
     */
    StreamRequestBody.prototype.service = "";

    /**
     * StreamRequestBody method.
     * @member {string} method
     * @memberof StreamRequestBody
     * @instance
     */
    StreamRequestBody.prototype.method = "";

    /**
     * StreamRequestBody metadata.
     * @member {Object.<string,string>} metadata
     * @memberof StreamRequestBody
     * @instance
     */
    StreamRequestBody.prototype.metadata = $util.emptyObject;

    /**
     * Creates a new StreamRequestBody instance using the specified properties.
     * @function create
     * @memberof StreamRequestBody
     * @static
     * @param {IStreamRequestBody=} [properties] Properties to set
     * @returns {StreamRequestBody} StreamRequestBody instance
     */
    StreamRequestBody.create = function create(properties) {
        return new StreamRequestBody(properties);
    };

    /**
     * Encodes the specified StreamRequestBody message. Does not implicitly {@link StreamRequestBody.verify|verify} messages.
     * @function encode
     * @memberof StreamRequestBody
     * @static
     * @param {IStreamRequestBody} message StreamRequestBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StreamRequestBody.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.service != null && message.hasOwnProperty("service"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.service);
        if (message.method != null && message.hasOwnProperty("method"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.method);
        if (message.metadata != null && message.hasOwnProperty("metadata"))
            for (let keys = Object.keys(message.metadata), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.metadata[keys[i]]).ldelim();
        return writer;
    };

    /**
     * Encodes the specified StreamRequestBody message, length delimited. Does not implicitly {@link StreamRequestBody.verify|verify} messages.
     * @function encodeDelimited
     * @memberof StreamRequestBody
     * @static
     * @param {IStreamRequestBody} message StreamRequestBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StreamRequestBody.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a StreamRequestBody message from the specified reader or buffer.
     * @function decode
     * @memberof StreamRequestBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {StreamRequestBody} StreamRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StreamRequestBody.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.StreamRequestBody(), key;
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.service = reader.string();
                break;
            case 2:
                message.method = reader.string();
                break;
            case 3:
                reader.skip().pos++;
                if (message.metadata === $util.emptyObject)
                    message.metadata = {};
                key = reader.string();
                reader.pos++;
                message.metadata[key] = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a StreamRequestBody message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof StreamRequestBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {StreamRequestBody} StreamRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StreamRequestBody.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a StreamRequestBody message.
     * @function verify
     * @memberof StreamRequestBody
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    StreamRequestBody.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.service != null && message.hasOwnProperty("service"))
            if (!$util.isString(message.service))
                return "service: string expected";
        if (message.method != null && message.hasOwnProperty("method"))
            if (!$util.isString(message.method))
                return "method: string expected";
        if (message.metadata != null && message.hasOwnProperty("metadata")) {
            if (!$util.isObject(message.metadata))
                return "metadata: object expected";
            let key = Object.keys(message.metadata);
            for (let i = 0; i < key.length; ++i)
                if (!$util.isString(message.metadata[key[i]]))
                    return "metadata: string{k:string} expected";
        }
        return null;
    };

    /**
     * Creates a StreamRequestBody message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof StreamRequestBody
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {StreamRequestBody} StreamRequestBody
     */
    StreamRequestBody.fromObject = function fromObject(object) {
        if (object instanceof $root.StreamRequestBody)
            return object;
        let message = new $root.StreamRequestBody();
        if (object.service != null)
            message.service = String(object.service);
        if (object.method != null)
            message.method = String(object.method);
        if (object.metadata) {
            if (typeof object.metadata !== "object")
                throw TypeError(".StreamRequestBody.metadata: object expected");
            message.metadata = {};
            for (let keys = Object.keys(object.metadata), i = 0; i < keys.length; ++i)
                message.metadata[keys[i]] = String(object.metadata[keys[i]]);
        }
        return message;
    };

    /**
     * Creates a plain object from a StreamRequestBody message. Also converts values to other types if specified.
     * @function toObject
     * @memberof StreamRequestBody
     * @static
     * @param {StreamRequestBody} message StreamRequestBody
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    StreamRequestBody.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.objects || options.defaults)
            object.metadata = {};
        if (options.defaults) {
            object.service = "";
            object.method = "";
        }
        if (message.service != null && message.hasOwnProperty("service"))
            object.service = message.service;
        if (message.method != null && message.hasOwnProperty("method"))
            object.method = message.method;
        let keys2;
        if (message.metadata && (keys2 = Object.keys(message.metadata)).length) {
            object.metadata = {};
            for (let j = 0; j < keys2.length; ++j)
                object.metadata[keys2[j]] = message.metadata[keys2[j]];
        }
        return object;
    };

    /**
     * Converts this StreamRequestBody to JSON.
     * @function toJSON
     * @memberof StreamRequestBody
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    StreamRequestBody.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return StreamRequestBody;
})();

export const PushRequestBody = $root.PushRequestBody = (() => {

    /**
     * Properties of a PushRequestBody.
     * @exports IPushRequestBody
     * @interface IPushRequestBody
     * @property {Uint8Array|null} [payload] PushRequestBody payload
     * @property {Object.<string,string>|null} [metadata] PushRequestBody metadata
     */

    /**
     * Constructs a new PushRequestBody.
     * @exports PushRequestBody
     * @classdesc Represents a PushRequestBody.
     * @implements IPushRequestBody
     * @constructor
     * @param {IPushRequestBody=} [properties] Properties to set
     */
    function PushRequestBody(properties) {
        this.metadata = {};
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PushRequestBody payload.
     * @member {Uint8Array} payload
     * @memberof PushRequestBody
     * @instance
     */
    PushRequestBody.prototype.payload = $util.newBuffer([]);

    /**
     * PushRequestBody metadata.
     * @member {Object.<string,string>} metadata
     * @memberof PushRequestBody
     * @instance
     */
    PushRequestBody.prototype.metadata = $util.emptyObject;

    /**
     * Creates a new PushRequestBody instance using the specified properties.
     * @function create
     * @memberof PushRequestBody
     * @static
     * @param {IPushRequestBody=} [properties] Properties to set
     * @returns {PushRequestBody} PushRequestBody instance
     */
    PushRequestBody.create = function create(properties) {
        return new PushRequestBody(properties);
    };

    /**
     * Encodes the specified PushRequestBody message. Does not implicitly {@link PushRequestBody.verify|verify} messages.
     * @function encode
     * @memberof PushRequestBody
     * @static
     * @param {IPushRequestBody} message PushRequestBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PushRequestBody.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.payload != null && message.hasOwnProperty("payload"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.payload);
        if (message.metadata != null && message.hasOwnProperty("metadata"))
            for (let keys = Object.keys(message.metadata), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.metadata[keys[i]]).ldelim();
        return writer;
    };

    /**
     * Encodes the specified PushRequestBody message, length delimited. Does not implicitly {@link PushRequestBody.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PushRequestBody
     * @static
     * @param {IPushRequestBody} message PushRequestBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PushRequestBody.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PushRequestBody message from the specified reader or buffer.
     * @function decode
     * @memberof PushRequestBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PushRequestBody} PushRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PushRequestBody.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PushRequestBody(), key;
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.payload = reader.bytes();
                break;
            case 2:
                reader.skip().pos++;
                if (message.metadata === $util.emptyObject)
                    message.metadata = {};
                key = reader.string();
                reader.pos++;
                message.metadata[key] = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PushRequestBody message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PushRequestBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PushRequestBody} PushRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PushRequestBody.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PushRequestBody message.
     * @function verify
     * @memberof PushRequestBody
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PushRequestBody.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.payload != null && message.hasOwnProperty("payload"))
            if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                return "payload: buffer expected";
        if (message.metadata != null && message.hasOwnProperty("metadata")) {
            if (!$util.isObject(message.metadata))
                return "metadata: object expected";
            let key = Object.keys(message.metadata);
            for (let i = 0; i < key.length; ++i)
                if (!$util.isString(message.metadata[key[i]]))
                    return "metadata: string{k:string} expected";
        }
        return null;
    };

    /**
     * Creates a PushRequestBody message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PushRequestBody
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PushRequestBody} PushRequestBody
     */
    PushRequestBody.fromObject = function fromObject(object) {
        if (object instanceof $root.PushRequestBody)
            return object;
        let message = new $root.PushRequestBody();
        if (object.payload != null)
            if (typeof object.payload === "string")
                $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
            else if (object.payload.length)
                message.payload = object.payload;
        if (object.metadata) {
            if (typeof object.metadata !== "object")
                throw TypeError(".PushRequestBody.metadata: object expected");
            message.metadata = {};
            for (let keys = Object.keys(object.metadata), i = 0; i < keys.length; ++i)
                message.metadata[keys[i]] = String(object.metadata[keys[i]]);
        }
        return message;
    };

    /**
     * Creates a plain object from a PushRequestBody message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PushRequestBody
     * @static
     * @param {PushRequestBody} message PushRequestBody
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PushRequestBody.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.objects || options.defaults)
            object.metadata = {};
        if (options.defaults)
            if (options.bytes === String)
                object.payload = "";
            else {
                object.payload = [];
                if (options.bytes !== Array)
                    object.payload = $util.newBuffer(object.payload);
            }
        if (message.payload != null && message.hasOwnProperty("payload"))
            object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
        let keys2;
        if (message.metadata && (keys2 = Object.keys(message.metadata)).length) {
            object.metadata = {};
            for (let j = 0; j < keys2.length; ++j)
                object.metadata[keys2[j]] = message.metadata[keys2[j]];
        }
        return object;
    };

    /**
     * Converts this PushRequestBody to JSON.
     * @function toJSON
     * @memberof PushRequestBody
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PushRequestBody.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PushRequestBody;
})();

export const EndRequestBody = $root.EndRequestBody = (() => {

    /**
     * Properties of an EndRequestBody.
     * @exports IEndRequestBody
     * @interface IEndRequestBody
     */

    /**
     * Constructs a new EndRequestBody.
     * @exports EndRequestBody
     * @classdesc Represents an EndRequestBody.
     * @implements IEndRequestBody
     * @constructor
     * @param {IEndRequestBody=} [properties] Properties to set
     */
    function EndRequestBody(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new EndRequestBody instance using the specified properties.
     * @function create
     * @memberof EndRequestBody
     * @static
     * @param {IEndRequestBody=} [properties] Properties to set
     * @returns {EndRequestBody} EndRequestBody instance
     */
    EndRequestBody.create = function create(properties) {
        return new EndRequestBody(properties);
    };

    /**
     * Encodes the specified EndRequestBody message. Does not implicitly {@link EndRequestBody.verify|verify} messages.
     * @function encode
     * @memberof EndRequestBody
     * @static
     * @param {IEndRequestBody} message EndRequestBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EndRequestBody.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified EndRequestBody message, length delimited. Does not implicitly {@link EndRequestBody.verify|verify} messages.
     * @function encodeDelimited
     * @memberof EndRequestBody
     * @static
     * @param {IEndRequestBody} message EndRequestBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EndRequestBody.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an EndRequestBody message from the specified reader or buffer.
     * @function decode
     * @memberof EndRequestBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {EndRequestBody} EndRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EndRequestBody.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EndRequestBody();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an EndRequestBody message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof EndRequestBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {EndRequestBody} EndRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EndRequestBody.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an EndRequestBody message.
     * @function verify
     * @memberof EndRequestBody
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    EndRequestBody.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates an EndRequestBody message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof EndRequestBody
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {EndRequestBody} EndRequestBody
     */
    EndRequestBody.fromObject = function fromObject(object) {
        if (object instanceof $root.EndRequestBody)
            return object;
        return new $root.EndRequestBody();
    };

    /**
     * Creates a plain object from an EndRequestBody message. Also converts values to other types if specified.
     * @function toObject
     * @memberof EndRequestBody
     * @static
     * @param {EndRequestBody} message EndRequestBody
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    EndRequestBody.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this EndRequestBody to JSON.
     * @function toJSON
     * @memberof EndRequestBody
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    EndRequestBody.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EndRequestBody;
})();

export const CancelRequestBody = $root.CancelRequestBody = (() => {

    /**
     * Properties of a CancelRequestBody.
     * @exports ICancelRequestBody
     * @interface ICancelRequestBody
     */

    /**
     * Constructs a new CancelRequestBody.
     * @exports CancelRequestBody
     * @classdesc Represents a CancelRequestBody.
     * @implements ICancelRequestBody
     * @constructor
     * @param {ICancelRequestBody=} [properties] Properties to set
     */
    function CancelRequestBody(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new CancelRequestBody instance using the specified properties.
     * @function create
     * @memberof CancelRequestBody
     * @static
     * @param {ICancelRequestBody=} [properties] Properties to set
     * @returns {CancelRequestBody} CancelRequestBody instance
     */
    CancelRequestBody.create = function create(properties) {
        return new CancelRequestBody(properties);
    };

    /**
     * Encodes the specified CancelRequestBody message. Does not implicitly {@link CancelRequestBody.verify|verify} messages.
     * @function encode
     * @memberof CancelRequestBody
     * @static
     * @param {ICancelRequestBody} message CancelRequestBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CancelRequestBody.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified CancelRequestBody message, length delimited. Does not implicitly {@link CancelRequestBody.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CancelRequestBody
     * @static
     * @param {ICancelRequestBody} message CancelRequestBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CancelRequestBody.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CancelRequestBody message from the specified reader or buffer.
     * @function decode
     * @memberof CancelRequestBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CancelRequestBody} CancelRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CancelRequestBody.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.CancelRequestBody();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CancelRequestBody message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CancelRequestBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CancelRequestBody} CancelRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CancelRequestBody.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CancelRequestBody message.
     * @function verify
     * @memberof CancelRequestBody
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CancelRequestBody.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a CancelRequestBody message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CancelRequestBody
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CancelRequestBody} CancelRequestBody
     */
    CancelRequestBody.fromObject = function fromObject(object) {
        if (object instanceof $root.CancelRequestBody)
            return object;
        return new $root.CancelRequestBody();
    };

    /**
     * Creates a plain object from a CancelRequestBody message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CancelRequestBody
     * @static
     * @param {CancelRequestBody} message CancelRequestBody
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CancelRequestBody.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this CancelRequestBody to JSON.
     * @function toJSON
     * @memberof CancelRequestBody
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CancelRequestBody.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CancelRequestBody;
})();

export const Response = $root.Response = (() => {

    /**
     * Properties of a Response.
     * @exports IResponse
     * @interface IResponse
     * @property {string|null} [id] Response id
     * @property {IUnaryResponseBody|null} [unary] Response unary
     * @property {IPushResponseBody|null} [push] Response push
     * @property {IEndResponseBody|null} [end] Response end
     * @property {IErrorResponseBody|null} [error] Response error
     */

    /**
     * Constructs a new Response.
     * @exports Response
     * @classdesc Represents a Response.
     * @implements IResponse
     * @constructor
     * @param {IResponse=} [properties] Properties to set
     */
    function Response(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Response id.
     * @member {string} id
     * @memberof Response
     * @instance
     */
    Response.prototype.id = "";

    /**
     * Response unary.
     * @member {IUnaryResponseBody|null|undefined} unary
     * @memberof Response
     * @instance
     */
    Response.prototype.unary = null;

    /**
     * Response push.
     * @member {IPushResponseBody|null|undefined} push
     * @memberof Response
     * @instance
     */
    Response.prototype.push = null;

    /**
     * Response end.
     * @member {IEndResponseBody|null|undefined} end
     * @memberof Response
     * @instance
     */
    Response.prototype.end = null;

    /**
     * Response error.
     * @member {IErrorResponseBody|null|undefined} error
     * @memberof Response
     * @instance
     */
    Response.prototype.error = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * Response body.
     * @member {"unary"|"push"|"end"|"error"|undefined} body
     * @memberof Response
     * @instance
     */
    Object.defineProperty(Response.prototype, "body", {
        get: $util.oneOfGetter($oneOfFields = ["unary", "push", "end", "error"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new Response instance using the specified properties.
     * @function create
     * @memberof Response
     * @static
     * @param {IResponse=} [properties] Properties to set
     * @returns {Response} Response instance
     */
    Response.create = function create(properties) {
        return new Response(properties);
    };

    /**
     * Encodes the specified Response message. Does not implicitly {@link Response.verify|verify} messages.
     * @function encode
     * @memberof Response
     * @static
     * @param {IResponse} message Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Response.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.unary != null && message.hasOwnProperty("unary"))
            $root.UnaryResponseBody.encode(message.unary, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.push != null && message.hasOwnProperty("push"))
            $root.PushResponseBody.encode(message.push, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.end != null && message.hasOwnProperty("end"))
            $root.EndResponseBody.encode(message.end, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.error != null && message.hasOwnProperty("error"))
            $root.ErrorResponseBody.encode(message.error, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Response message, length delimited. Does not implicitly {@link Response.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Response
     * @static
     * @param {IResponse} message Response message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Response.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Response message from the specified reader or buffer.
     * @function decode
     * @memberof Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Response} Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Response.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Response();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.string();
                break;
            case 2:
                message.unary = $root.UnaryResponseBody.decode(reader, reader.uint32());
                break;
            case 3:
                message.push = $root.PushResponseBody.decode(reader, reader.uint32());
                break;
            case 4:
                message.end = $root.EndResponseBody.decode(reader, reader.uint32());
                break;
            case 5:
                message.error = $root.ErrorResponseBody.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Response message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Response
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Response} Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Response.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Response message.
     * @function verify
     * @memberof Response
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Response.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.unary != null && message.hasOwnProperty("unary")) {
            properties.body = 1;
            {
                let error = $root.UnaryResponseBody.verify(message.unary);
                if (error)
                    return "unary." + error;
            }
        }
        if (message.push != null && message.hasOwnProperty("push")) {
            if (properties.body === 1)
                return "body: multiple values";
            properties.body = 1;
            {
                let error = $root.PushResponseBody.verify(message.push);
                if (error)
                    return "push." + error;
            }
        }
        if (message.end != null && message.hasOwnProperty("end")) {
            if (properties.body === 1)
                return "body: multiple values";
            properties.body = 1;
            {
                let error = $root.EndResponseBody.verify(message.end);
                if (error)
                    return "end." + error;
            }
        }
        if (message.error != null && message.hasOwnProperty("error")) {
            if (properties.body === 1)
                return "body: multiple values";
            properties.body = 1;
            {
                let error = $root.ErrorResponseBody.verify(message.error);
                if (error)
                    return "error." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Response message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Response
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Response} Response
     */
    Response.fromObject = function fromObject(object) {
        if (object instanceof $root.Response)
            return object;
        let message = new $root.Response();
        if (object.id != null)
            message.id = String(object.id);
        if (object.unary != null) {
            if (typeof object.unary !== "object")
                throw TypeError(".Response.unary: object expected");
            message.unary = $root.UnaryResponseBody.fromObject(object.unary);
        }
        if (object.push != null) {
            if (typeof object.push !== "object")
                throw TypeError(".Response.push: object expected");
            message.push = $root.PushResponseBody.fromObject(object.push);
        }
        if (object.end != null) {
            if (typeof object.end !== "object")
                throw TypeError(".Response.end: object expected");
            message.end = $root.EndResponseBody.fromObject(object.end);
        }
        if (object.error != null) {
            if (typeof object.error !== "object")
                throw TypeError(".Response.error: object expected");
            message.error = $root.ErrorResponseBody.fromObject(object.error);
        }
        return message;
    };

    /**
     * Creates a plain object from a Response message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Response
     * @static
     * @param {Response} message Response
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Response.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.id = "";
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.unary != null && message.hasOwnProperty("unary")) {
            object.unary = $root.UnaryResponseBody.toObject(message.unary, options);
            if (options.oneofs)
                object.body = "unary";
        }
        if (message.push != null && message.hasOwnProperty("push")) {
            object.push = $root.PushResponseBody.toObject(message.push, options);
            if (options.oneofs)
                object.body = "push";
        }
        if (message.end != null && message.hasOwnProperty("end")) {
            object.end = $root.EndResponseBody.toObject(message.end, options);
            if (options.oneofs)
                object.body = "end";
        }
        if (message.error != null && message.hasOwnProperty("error")) {
            object.error = $root.ErrorResponseBody.toObject(message.error, options);
            if (options.oneofs)
                object.body = "error";
        }
        return object;
    };

    /**
     * Converts this Response to JSON.
     * @function toJSON
     * @memberof Response
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Response.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Response;
})();

export const UnaryResponseBody = $root.UnaryResponseBody = (() => {

    /**
     * Properties of an UnaryResponseBody.
     * @exports IUnaryResponseBody
     * @interface IUnaryResponseBody
     * @property {Uint8Array|null} [payload] UnaryResponseBody payload
     */

    /**
     * Constructs a new UnaryResponseBody.
     * @exports UnaryResponseBody
     * @classdesc Represents an UnaryResponseBody.
     * @implements IUnaryResponseBody
     * @constructor
     * @param {IUnaryResponseBody=} [properties] Properties to set
     */
    function UnaryResponseBody(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UnaryResponseBody payload.
     * @member {Uint8Array} payload
     * @memberof UnaryResponseBody
     * @instance
     */
    UnaryResponseBody.prototype.payload = $util.newBuffer([]);

    /**
     * Creates a new UnaryResponseBody instance using the specified properties.
     * @function create
     * @memberof UnaryResponseBody
     * @static
     * @param {IUnaryResponseBody=} [properties] Properties to set
     * @returns {UnaryResponseBody} UnaryResponseBody instance
     */
    UnaryResponseBody.create = function create(properties) {
        return new UnaryResponseBody(properties);
    };

    /**
     * Encodes the specified UnaryResponseBody message. Does not implicitly {@link UnaryResponseBody.verify|verify} messages.
     * @function encode
     * @memberof UnaryResponseBody
     * @static
     * @param {IUnaryResponseBody} message UnaryResponseBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UnaryResponseBody.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.payload != null && message.hasOwnProperty("payload"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.payload);
        return writer;
    };

    /**
     * Encodes the specified UnaryResponseBody message, length delimited. Does not implicitly {@link UnaryResponseBody.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UnaryResponseBody
     * @static
     * @param {IUnaryResponseBody} message UnaryResponseBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UnaryResponseBody.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an UnaryResponseBody message from the specified reader or buffer.
     * @function decode
     * @memberof UnaryResponseBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UnaryResponseBody} UnaryResponseBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UnaryResponseBody.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.UnaryResponseBody();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.payload = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an UnaryResponseBody message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UnaryResponseBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UnaryResponseBody} UnaryResponseBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UnaryResponseBody.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an UnaryResponseBody message.
     * @function verify
     * @memberof UnaryResponseBody
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UnaryResponseBody.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.payload != null && message.hasOwnProperty("payload"))
            if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                return "payload: buffer expected";
        return null;
    };

    /**
     * Creates an UnaryResponseBody message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UnaryResponseBody
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UnaryResponseBody} UnaryResponseBody
     */
    UnaryResponseBody.fromObject = function fromObject(object) {
        if (object instanceof $root.UnaryResponseBody)
            return object;
        let message = new $root.UnaryResponseBody();
        if (object.payload != null)
            if (typeof object.payload === "string")
                $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
            else if (object.payload.length)
                message.payload = object.payload;
        return message;
    };

    /**
     * Creates a plain object from an UnaryResponseBody message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UnaryResponseBody
     * @static
     * @param {UnaryResponseBody} message UnaryResponseBody
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UnaryResponseBody.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            if (options.bytes === String)
                object.payload = "";
            else {
                object.payload = [];
                if (options.bytes !== Array)
                    object.payload = $util.newBuffer(object.payload);
            }
        if (message.payload != null && message.hasOwnProperty("payload"))
            object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
        return object;
    };

    /**
     * Converts this UnaryResponseBody to JSON.
     * @function toJSON
     * @memberof UnaryResponseBody
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UnaryResponseBody.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UnaryResponseBody;
})();

export const PushResponseBody = $root.PushResponseBody = (() => {

    /**
     * Properties of a PushResponseBody.
     * @exports IPushResponseBody
     * @interface IPushResponseBody
     * @property {Uint8Array|null} [payload] PushResponseBody payload
     */

    /**
     * Constructs a new PushResponseBody.
     * @exports PushResponseBody
     * @classdesc Represents a PushResponseBody.
     * @implements IPushResponseBody
     * @constructor
     * @param {IPushResponseBody=} [properties] Properties to set
     */
    function PushResponseBody(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PushResponseBody payload.
     * @member {Uint8Array} payload
     * @memberof PushResponseBody
     * @instance
     */
    PushResponseBody.prototype.payload = $util.newBuffer([]);

    /**
     * Creates a new PushResponseBody instance using the specified properties.
     * @function create
     * @memberof PushResponseBody
     * @static
     * @param {IPushResponseBody=} [properties] Properties to set
     * @returns {PushResponseBody} PushResponseBody instance
     */
    PushResponseBody.create = function create(properties) {
        return new PushResponseBody(properties);
    };

    /**
     * Encodes the specified PushResponseBody message. Does not implicitly {@link PushResponseBody.verify|verify} messages.
     * @function encode
     * @memberof PushResponseBody
     * @static
     * @param {IPushResponseBody} message PushResponseBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PushResponseBody.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.payload != null && message.hasOwnProperty("payload"))
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.payload);
        return writer;
    };

    /**
     * Encodes the specified PushResponseBody message, length delimited. Does not implicitly {@link PushResponseBody.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PushResponseBody
     * @static
     * @param {IPushResponseBody} message PushResponseBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PushResponseBody.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PushResponseBody message from the specified reader or buffer.
     * @function decode
     * @memberof PushResponseBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PushResponseBody} PushResponseBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PushResponseBody.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PushResponseBody();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.payload = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PushResponseBody message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PushResponseBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PushResponseBody} PushResponseBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PushResponseBody.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PushResponseBody message.
     * @function verify
     * @memberof PushResponseBody
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PushResponseBody.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.payload != null && message.hasOwnProperty("payload"))
            if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                return "payload: buffer expected";
        return null;
    };

    /**
     * Creates a PushResponseBody message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PushResponseBody
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PushResponseBody} PushResponseBody
     */
    PushResponseBody.fromObject = function fromObject(object) {
        if (object instanceof $root.PushResponseBody)
            return object;
        let message = new $root.PushResponseBody();
        if (object.payload != null)
            if (typeof object.payload === "string")
                $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
            else if (object.payload.length)
                message.payload = object.payload;
        return message;
    };

    /**
     * Creates a plain object from a PushResponseBody message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PushResponseBody
     * @static
     * @param {PushResponseBody} message PushResponseBody
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PushResponseBody.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            if (options.bytes === String)
                object.payload = "";
            else {
                object.payload = [];
                if (options.bytes !== Array)
                    object.payload = $util.newBuffer(object.payload);
            }
        if (message.payload != null && message.hasOwnProperty("payload"))
            object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
        return object;
    };

    /**
     * Converts this PushResponseBody to JSON.
     * @function toJSON
     * @memberof PushResponseBody
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PushResponseBody.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PushResponseBody;
})();

export const EndResponseBody = $root.EndResponseBody = (() => {

    /**
     * Properties of an EndResponseBody.
     * @exports IEndResponseBody
     * @interface IEndResponseBody
     */

    /**
     * Constructs a new EndResponseBody.
     * @exports EndResponseBody
     * @classdesc Represents an EndResponseBody.
     * @implements IEndResponseBody
     * @constructor
     * @param {IEndResponseBody=} [properties] Properties to set
     */
    function EndResponseBody(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new EndResponseBody instance using the specified properties.
     * @function create
     * @memberof EndResponseBody
     * @static
     * @param {IEndResponseBody=} [properties] Properties to set
     * @returns {EndResponseBody} EndResponseBody instance
     */
    EndResponseBody.create = function create(properties) {
        return new EndResponseBody(properties);
    };

    /**
     * Encodes the specified EndResponseBody message. Does not implicitly {@link EndResponseBody.verify|verify} messages.
     * @function encode
     * @memberof EndResponseBody
     * @static
     * @param {IEndResponseBody} message EndResponseBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EndResponseBody.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified EndResponseBody message, length delimited. Does not implicitly {@link EndResponseBody.verify|verify} messages.
     * @function encodeDelimited
     * @memberof EndResponseBody
     * @static
     * @param {IEndResponseBody} message EndResponseBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EndResponseBody.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an EndResponseBody message from the specified reader or buffer.
     * @function decode
     * @memberof EndResponseBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {EndResponseBody} EndResponseBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EndResponseBody.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.EndResponseBody();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an EndResponseBody message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof EndResponseBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {EndResponseBody} EndResponseBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EndResponseBody.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an EndResponseBody message.
     * @function verify
     * @memberof EndResponseBody
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    EndResponseBody.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates an EndResponseBody message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof EndResponseBody
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {EndResponseBody} EndResponseBody
     */
    EndResponseBody.fromObject = function fromObject(object) {
        if (object instanceof $root.EndResponseBody)
            return object;
        return new $root.EndResponseBody();
    };

    /**
     * Creates a plain object from an EndResponseBody message. Also converts values to other types if specified.
     * @function toObject
     * @memberof EndResponseBody
     * @static
     * @param {EndResponseBody} message EndResponseBody
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    EndResponseBody.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this EndResponseBody to JSON.
     * @function toJSON
     * @memberof EndResponseBody
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    EndResponseBody.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EndResponseBody;
})();

export const ErrorResponseBody = $root.ErrorResponseBody = (() => {

    /**
     * Properties of an ErrorResponseBody.
     * @exports IErrorResponseBody
     * @interface IErrorResponseBody
     * @property {Status|null} [status] ErrorResponseBody status
     * @property {string|null} [message] ErrorResponseBody message
     * @property {Object.<string,string>|null} [metadata] ErrorResponseBody metadata
     */

    /**
     * Constructs a new ErrorResponseBody.
     * @exports ErrorResponseBody
     * @classdesc Represents an ErrorResponseBody.
     * @implements IErrorResponseBody
     * @constructor
     * @param {IErrorResponseBody=} [properties] Properties to set
     */
    function ErrorResponseBody(properties) {
        this.metadata = {};
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ErrorResponseBody status.
     * @member {Status} status
     * @memberof ErrorResponseBody
     * @instance
     */
    ErrorResponseBody.prototype.status = 0;

    /**
     * ErrorResponseBody message.
     * @member {string} message
     * @memberof ErrorResponseBody
     * @instance
     */
    ErrorResponseBody.prototype.message = "";

    /**
     * ErrorResponseBody metadata.
     * @member {Object.<string,string>} metadata
     * @memberof ErrorResponseBody
     * @instance
     */
    ErrorResponseBody.prototype.metadata = $util.emptyObject;

    /**
     * Creates a new ErrorResponseBody instance using the specified properties.
     * @function create
     * @memberof ErrorResponseBody
     * @static
     * @param {IErrorResponseBody=} [properties] Properties to set
     * @returns {ErrorResponseBody} ErrorResponseBody instance
     */
    ErrorResponseBody.create = function create(properties) {
        return new ErrorResponseBody(properties);
    };

    /**
     * Encodes the specified ErrorResponseBody message. Does not implicitly {@link ErrorResponseBody.verify|verify} messages.
     * @function encode
     * @memberof ErrorResponseBody
     * @static
     * @param {IErrorResponseBody} message ErrorResponseBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ErrorResponseBody.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.status != null && message.hasOwnProperty("status"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
        if (message.message != null && message.hasOwnProperty("message"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
        if (message.metadata != null && message.hasOwnProperty("metadata"))
            for (let keys = Object.keys(message.metadata), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.metadata[keys[i]]).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ErrorResponseBody message, length delimited. Does not implicitly {@link ErrorResponseBody.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ErrorResponseBody
     * @static
     * @param {IErrorResponseBody} message ErrorResponseBody message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ErrorResponseBody.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ErrorResponseBody message from the specified reader or buffer.
     * @function decode
     * @memberof ErrorResponseBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ErrorResponseBody} ErrorResponseBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ErrorResponseBody.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ErrorResponseBody(), key;
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.status = reader.int32();
                break;
            case 2:
                message.message = reader.string();
                break;
            case 3:
                reader.skip().pos++;
                if (message.metadata === $util.emptyObject)
                    message.metadata = {};
                key = reader.string();
                reader.pos++;
                message.metadata[key] = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an ErrorResponseBody message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ErrorResponseBody
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ErrorResponseBody} ErrorResponseBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ErrorResponseBody.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ErrorResponseBody message.
     * @function verify
     * @memberof ErrorResponseBody
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ErrorResponseBody.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.status != null && message.hasOwnProperty("status"))
            switch (message.status) {
            default:
                return "status: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
                break;
            }
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        if (message.metadata != null && message.hasOwnProperty("metadata")) {
            if (!$util.isObject(message.metadata))
                return "metadata: object expected";
            let key = Object.keys(message.metadata);
            for (let i = 0; i < key.length; ++i)
                if (!$util.isString(message.metadata[key[i]]))
                    return "metadata: string{k:string} expected";
        }
        return null;
    };

    /**
     * Creates an ErrorResponseBody message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ErrorResponseBody
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ErrorResponseBody} ErrorResponseBody
     */
    ErrorResponseBody.fromObject = function fromObject(object) {
        if (object instanceof $root.ErrorResponseBody)
            return object;
        let message = new $root.ErrorResponseBody();
        switch (object.status) {
        case "UNKNOWN":
        case 0:
            message.status = 0;
            break;
        case "OK":
        case 1:
            message.status = 1;
            break;
        case "CANCELLED":
        case 2:
            message.status = 2;
            break;
        case "INVALID_ARGUMENT":
        case 3:
            message.status = 3;
            break;
        case "DEADLINE_EXCEEDED":
        case 4:
            message.status = 4;
            break;
        case "NOT_FOUND":
        case 5:
            message.status = 5;
            break;
        case "ALREADY_EXISTS":
        case 6:
            message.status = 6;
            break;
        case "PERMISSION_DENIED":
        case 7:
            message.status = 7;
            break;
        case "UNAUTHENTICATED":
        case 8:
            message.status = 8;
            break;
        case "RESOURCE_EXHAUSTED":
        case 9:
            message.status = 9;
            break;
        case "FAILED_PRECONDITION":
        case 10:
            message.status = 10;
            break;
        case "ABORTED":
        case 11:
            message.status = 11;
            break;
        case "OUT_OF_RANGE":
        case 12:
            message.status = 12;
            break;
        case "UNIMPLEMENTED":
        case 13:
            message.status = 13;
            break;
        case "INTERNAL":
        case 14:
            message.status = 14;
            break;
        case "UNAVAILABLE":
        case 15:
            message.status = 15;
            break;
        case "DATA_LOSS":
        case 16:
            message.status = 16;
            break;
        }
        if (object.message != null)
            message.message = String(object.message);
        if (object.metadata) {
            if (typeof object.metadata !== "object")
                throw TypeError(".ErrorResponseBody.metadata: object expected");
            message.metadata = {};
            for (let keys = Object.keys(object.metadata), i = 0; i < keys.length; ++i)
                message.metadata[keys[i]] = String(object.metadata[keys[i]]);
        }
        return message;
    };

    /**
     * Creates a plain object from an ErrorResponseBody message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ErrorResponseBody
     * @static
     * @param {ErrorResponseBody} message ErrorResponseBody
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ErrorResponseBody.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.objects || options.defaults)
            object.metadata = {};
        if (options.defaults) {
            object.status = options.enums === String ? "UNKNOWN" : 0;
            object.message = "";
        }
        if (message.status != null && message.hasOwnProperty("status"))
            object.status = options.enums === String ? $root.Status[message.status] : message.status;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        let keys2;
        if (message.metadata && (keys2 = Object.keys(message.metadata)).length) {
            object.metadata = {};
            for (let j = 0; j < keys2.length; ++j)
                object.metadata[keys2[j]] = message.metadata[keys2[j]];
        }
        return object;
    };

    /**
     * Converts this ErrorResponseBody to JSON.
     * @function toJSON
     * @memberof ErrorResponseBody
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ErrorResponseBody.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ErrorResponseBody;
})();

export { $root as default };
