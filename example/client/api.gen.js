/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const dialog = $root.dialog = (() => {

    /**
     * Namespace dialog.
     * @exports dialog
     * @namespace
     */
    const dialog = {};

    dialog.Obsolete = (function() {

        /**
         * Constructs a new Obsolete service.
         * @memberof dialog
         * @classdesc Represents an Obsolete
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function Obsolete(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (Obsolete.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Obsolete;

        /**
         * Creates new Obsolete service using the specified rpc implementation.
         * @function create
         * @memberof dialog.Obsolete
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {Obsolete} RPC service. Useful where requests and/or responses are streamed.
         */
        Obsolete.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link dialog.Obsolete#obsolete}.
         * @memberof dialog.Obsolete
         * @typedef ObsoleteCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {google.protobuf.BytesValue} [response] BytesValue
         */

        /**
         * Calls Obsolete.
         * @function obsolete
         * @memberof dialog.Obsolete
         * @instance
         * @param {google.protobuf.IBytesValue} request BytesValue message or plain object
         * @param {dialog.Obsolete.ObsoleteCallback} callback Node-style callback called with the error, if any, and BytesValue
         * @returns {undefined}
         * @variation 1
         */
        Obsolete.prototype.obsolete = function obsolete(request, callback) {
            return this.rpcCall(obsolete, $root.google.protobuf.BytesValue, $root.google.protobuf.BytesValue, request, callback);
        };

        /**
         * Calls Obsolete.
         * @function obsolete
         * @memberof dialog.Obsolete
         * @instance
         * @param {google.protobuf.IBytesValue} request BytesValue message or plain object
         * @returns {Promise<google.protobuf.BytesValue>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link dialog.Obsolete#seqUpdates}.
         * @memberof dialog.Obsolete
         * @typedef SeqUpdatesCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dialog.ObsoleteSeqUpdateBox} [response] ObsoleteSeqUpdateBox
         */

        /**
         * Calls SeqUpdates.
         * @function seqUpdates
         * @memberof dialog.Obsolete
         * @instance
         * @param {google.protobuf.IEmpty} request Empty message or plain object
         * @param {dialog.Obsolete.SeqUpdatesCallback} callback Node-style callback called with the error, if any, and ObsoleteSeqUpdateBox
         * @returns {undefined}
         * @variation 1
         */
        Obsolete.prototype.seqUpdates = function seqUpdates(request, callback) {
            return this.rpcCall(seqUpdates, $root.google.protobuf.Empty, $root.dialog.ObsoleteSeqUpdateBox, request, callback);
        };

        /**
         * Calls SeqUpdates.
         * @function seqUpdates
         * @memberof dialog.Obsolete
         * @instance
         * @param {google.protobuf.IEmpty} request Empty message or plain object
         * @returns {Promise<dialog.ObsoleteSeqUpdateBox>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link dialog.Obsolete#weakUpdates}.
         * @memberof dialog.Obsolete
         * @typedef WeakUpdatesCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dialog.ObsoleteWeakUpdateBox} [response] ObsoleteWeakUpdateBox
         */

        /**
         * Calls WeakUpdates.
         * @function weakUpdates
         * @memberof dialog.Obsolete
         * @instance
         * @param {dialog.IObsoleteWeakUpdateCommand} request ObsoleteWeakUpdateCommand message or plain object
         * @param {dialog.Obsolete.WeakUpdatesCallback} callback Node-style callback called with the error, if any, and ObsoleteWeakUpdateBox
         * @returns {undefined}
         * @variation 1
         */
        Obsolete.prototype.weakUpdates = function weakUpdates(request, callback) {
            return this.rpcCall(weakUpdates, $root.dialog.ObsoleteWeakUpdateCommand, $root.dialog.ObsoleteWeakUpdateBox, request, callback);
        };

        /**
         * Calls WeakUpdates.
         * @function weakUpdates
         * @memberof dialog.Obsolete
         * @instance
         * @param {dialog.IObsoleteWeakUpdateCommand} request ObsoleteWeakUpdateCommand message or plain object
         * @returns {Promise<dialog.ObsoleteWeakUpdateBox>} Promise
         * @variation 2
         */

        return Obsolete;
    })();

    dialog.ObsoletePeer = (function() {

        /**
         * Properties of an ObsoletePeer.
         * @memberof dialog
         * @interface IObsoletePeer
         * @property {dialog.ObsoletePeer.ObsoletePeerType|null} [type] ObsoletePeer type
         * @property {number|null} [id] ObsoletePeer id
         * @property {google.protobuf.IStringValue|null} [strId] ObsoletePeer strId
         * @property {number|Long|null} [accessHash] ObsoletePeer accessHash
         */

        /**
         * Constructs a new ObsoletePeer.
         * @memberof dialog
         * @classdesc Represents an ObsoletePeer.
         * @implements IObsoletePeer
         * @constructor
         * @param {dialog.IObsoletePeer=} [properties] Properties to set
         */
        function ObsoletePeer(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ObsoletePeer type.
         * @member {dialog.ObsoletePeer.ObsoletePeerType} type
         * @memberof dialog.ObsoletePeer
         * @instance
         */
        ObsoletePeer.prototype.type = 0;

        /**
         * ObsoletePeer id.
         * @member {number} id
         * @memberof dialog.ObsoletePeer
         * @instance
         */
        ObsoletePeer.prototype.id = 0;

        /**
         * ObsoletePeer strId.
         * @member {google.protobuf.IStringValue|null|undefined} strId
         * @memberof dialog.ObsoletePeer
         * @instance
         */
        ObsoletePeer.prototype.strId = null;

        /**
         * ObsoletePeer accessHash.
         * @member {number|Long} accessHash
         * @memberof dialog.ObsoletePeer
         * @instance
         */
        ObsoletePeer.prototype.accessHash = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new ObsoletePeer instance using the specified properties.
         * @function create
         * @memberof dialog.ObsoletePeer
         * @static
         * @param {dialog.IObsoletePeer=} [properties] Properties to set
         * @returns {dialog.ObsoletePeer} ObsoletePeer instance
         */
        ObsoletePeer.create = function create(properties) {
            return new ObsoletePeer(properties);
        };

        /**
         * Encodes the specified ObsoletePeer message. Does not implicitly {@link dialog.ObsoletePeer.verify|verify} messages.
         * @function encode
         * @memberof dialog.ObsoletePeer
         * @static
         * @param {dialog.IObsoletePeer} message ObsoletePeer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObsoletePeer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.id);
            if (message.strId != null && message.hasOwnProperty("strId"))
                $root.google.protobuf.StringValue.encode(message.strId, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.accessHash != null && message.hasOwnProperty("accessHash"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.accessHash);
            return writer;
        };

        /**
         * Encodes the specified ObsoletePeer message, length delimited. Does not implicitly {@link dialog.ObsoletePeer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dialog.ObsoletePeer
         * @static
         * @param {dialog.IObsoletePeer} message ObsoletePeer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObsoletePeer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ObsoletePeer message from the specified reader or buffer.
         * @function decode
         * @memberof dialog.ObsoletePeer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dialog.ObsoletePeer} ObsoletePeer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObsoletePeer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoletePeer();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.id = reader.int32();
                    break;
                case 3:
                    message.strId = $root.google.protobuf.StringValue.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.accessHash = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ObsoletePeer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dialog.ObsoletePeer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dialog.ObsoletePeer} ObsoletePeer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObsoletePeer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ObsoletePeer message.
         * @function verify
         * @memberof dialog.ObsoletePeer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ObsoletePeer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 4:
                    break;
                }
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.strId != null && message.hasOwnProperty("strId")) {
                let error = $root.google.protobuf.StringValue.verify(message.strId);
                if (error)
                    return "strId." + error;
            }
            if (message.accessHash != null && message.hasOwnProperty("accessHash"))
                if (!$util.isInteger(message.accessHash) && !(message.accessHash && $util.isInteger(message.accessHash.low) && $util.isInteger(message.accessHash.high)))
                    return "accessHash: integer|Long expected";
            return null;
        };

        /**
         * Creates an ObsoletePeer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dialog.ObsoletePeer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dialog.ObsoletePeer} ObsoletePeer
         */
        ObsoletePeer.fromObject = function fromObject(object) {
            if (object instanceof $root.dialog.ObsoletePeer)
                return object;
            let message = new $root.dialog.ObsoletePeer();
            switch (object.type) {
            case "OBSOLETE_PEERTYPE_UNKNOWN":
            case 0:
                message.type = 0;
                break;
            case "OBSOLETE_PEERTYPE_PRIVATE":
            case 1:
                message.type = 1;
                break;
            case "OBSOLETE_PEERTYPE_GROUP":
            case 2:
                message.type = 2;
                break;
            case "OBSOLETE_PEERTYPE_SIP":
            case 4:
                message.type = 4;
                break;
            }
            if (object.id != null)
                message.id = object.id | 0;
            if (object.strId != null) {
                if (typeof object.strId !== "object")
                    throw TypeError(".dialog.ObsoletePeer.strId: object expected");
                message.strId = $root.google.protobuf.StringValue.fromObject(object.strId);
            }
            if (object.accessHash != null)
                if ($util.Long)
                    (message.accessHash = $util.Long.fromValue(object.accessHash)).unsigned = false;
                else if (typeof object.accessHash === "string")
                    message.accessHash = parseInt(object.accessHash, 10);
                else if (typeof object.accessHash === "number")
                    message.accessHash = object.accessHash;
                else if (typeof object.accessHash === "object")
                    message.accessHash = new $util.LongBits(object.accessHash.low >>> 0, object.accessHash.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an ObsoletePeer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dialog.ObsoletePeer
         * @static
         * @param {dialog.ObsoletePeer} message ObsoletePeer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ObsoletePeer.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "OBSOLETE_PEERTYPE_UNKNOWN" : 0;
                object.id = 0;
                object.strId = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.accessHash = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.accessHash = options.longs === String ? "0" : 0;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.dialog.ObsoletePeer.ObsoletePeerType[message.type] : message.type;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.strId != null && message.hasOwnProperty("strId"))
                object.strId = $root.google.protobuf.StringValue.toObject(message.strId, options);
            if (message.accessHash != null && message.hasOwnProperty("accessHash"))
                if (typeof message.accessHash === "number")
                    object.accessHash = options.longs === String ? String(message.accessHash) : message.accessHash;
                else
                    object.accessHash = options.longs === String ? $util.Long.prototype.toString.call(message.accessHash) : options.longs === Number ? new $util.LongBits(message.accessHash.low >>> 0, message.accessHash.high >>> 0).toNumber() : message.accessHash;
            return object;
        };

        /**
         * Converts this ObsoletePeer to JSON.
         * @function toJSON
         * @memberof dialog.ObsoletePeer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ObsoletePeer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * ObsoletePeerType enum.
         * @name dialog.ObsoletePeer.ObsoletePeerType
         * @enum {string}
         * @property {number} OBSOLETE_PEERTYPE_UNKNOWN=0 OBSOLETE_PEERTYPE_UNKNOWN value
         * @property {number} OBSOLETE_PEERTYPE_PRIVATE=1 OBSOLETE_PEERTYPE_PRIVATE value
         * @property {number} OBSOLETE_PEERTYPE_GROUP=2 OBSOLETE_PEERTYPE_GROUP value
         * @property {number} OBSOLETE_PEERTYPE_SIP=4 OBSOLETE_PEERTYPE_SIP value
         */
        ObsoletePeer.ObsoletePeerType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "OBSOLETE_PEERTYPE_UNKNOWN"] = 0;
            values[valuesById[1] = "OBSOLETE_PEERTYPE_PRIVATE"] = 1;
            values[valuesById[2] = "OBSOLETE_PEERTYPE_GROUP"] = 2;
            values[valuesById[4] = "OBSOLETE_PEERTYPE_SIP"] = 4;
            return values;
        })();

        return ObsoletePeer;
    })();

    dialog.ObsoleteOutPeer = (function() {

        /**
         * Properties of an ObsoleteOutPeer.
         * @memberof dialog
         * @interface IObsoleteOutPeer
         * @property {dialog.IObsoletePeer|null} [peer] ObsoleteOutPeer peer
         * @property {number|Long|null} [accessHash] ObsoleteOutPeer accessHash
         */

        /**
         * Constructs a new ObsoleteOutPeer.
         * @memberof dialog
         * @classdesc Represents an ObsoleteOutPeer.
         * @implements IObsoleteOutPeer
         * @constructor
         * @param {dialog.IObsoleteOutPeer=} [properties] Properties to set
         */
        function ObsoleteOutPeer(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ObsoleteOutPeer peer.
         * @member {dialog.IObsoletePeer|null|undefined} peer
         * @memberof dialog.ObsoleteOutPeer
         * @instance
         */
        ObsoleteOutPeer.prototype.peer = null;

        /**
         * ObsoleteOutPeer accessHash.
         * @member {number|Long} accessHash
         * @memberof dialog.ObsoleteOutPeer
         * @instance
         */
        ObsoleteOutPeer.prototype.accessHash = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new ObsoleteOutPeer instance using the specified properties.
         * @function create
         * @memberof dialog.ObsoleteOutPeer
         * @static
         * @param {dialog.IObsoleteOutPeer=} [properties] Properties to set
         * @returns {dialog.ObsoleteOutPeer} ObsoleteOutPeer instance
         */
        ObsoleteOutPeer.create = function create(properties) {
            return new ObsoleteOutPeer(properties);
        };

        /**
         * Encodes the specified ObsoleteOutPeer message. Does not implicitly {@link dialog.ObsoleteOutPeer.verify|verify} messages.
         * @function encode
         * @memberof dialog.ObsoleteOutPeer
         * @static
         * @param {dialog.IObsoleteOutPeer} message ObsoleteOutPeer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObsoleteOutPeer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.peer != null && message.hasOwnProperty("peer"))
                $root.dialog.ObsoletePeer.encode(message.peer, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.accessHash != null && message.hasOwnProperty("accessHash"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.accessHash);
            return writer;
        };

        /**
         * Encodes the specified ObsoleteOutPeer message, length delimited. Does not implicitly {@link dialog.ObsoleteOutPeer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dialog.ObsoleteOutPeer
         * @static
         * @param {dialog.IObsoleteOutPeer} message ObsoleteOutPeer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObsoleteOutPeer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ObsoleteOutPeer message from the specified reader or buffer.
         * @function decode
         * @memberof dialog.ObsoleteOutPeer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dialog.ObsoleteOutPeer} ObsoleteOutPeer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObsoleteOutPeer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteOutPeer();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.peer = $root.dialog.ObsoletePeer.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.accessHash = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ObsoleteOutPeer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dialog.ObsoleteOutPeer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dialog.ObsoleteOutPeer} ObsoleteOutPeer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObsoleteOutPeer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ObsoleteOutPeer message.
         * @function verify
         * @memberof dialog.ObsoleteOutPeer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ObsoleteOutPeer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.peer != null && message.hasOwnProperty("peer")) {
                let error = $root.dialog.ObsoletePeer.verify(message.peer);
                if (error)
                    return "peer." + error;
            }
            if (message.accessHash != null && message.hasOwnProperty("accessHash"))
                if (!$util.isInteger(message.accessHash) && !(message.accessHash && $util.isInteger(message.accessHash.low) && $util.isInteger(message.accessHash.high)))
                    return "accessHash: integer|Long expected";
            return null;
        };

        /**
         * Creates an ObsoleteOutPeer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dialog.ObsoleteOutPeer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dialog.ObsoleteOutPeer} ObsoleteOutPeer
         */
        ObsoleteOutPeer.fromObject = function fromObject(object) {
            if (object instanceof $root.dialog.ObsoleteOutPeer)
                return object;
            let message = new $root.dialog.ObsoleteOutPeer();
            if (object.peer != null) {
                if (typeof object.peer !== "object")
                    throw TypeError(".dialog.ObsoleteOutPeer.peer: object expected");
                message.peer = $root.dialog.ObsoletePeer.fromObject(object.peer);
            }
            if (object.accessHash != null)
                if ($util.Long)
                    (message.accessHash = $util.Long.fromValue(object.accessHash)).unsigned = false;
                else if (typeof object.accessHash === "string")
                    message.accessHash = parseInt(object.accessHash, 10);
                else if (typeof object.accessHash === "number")
                    message.accessHash = object.accessHash;
                else if (typeof object.accessHash === "object")
                    message.accessHash = new $util.LongBits(object.accessHash.low >>> 0, object.accessHash.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an ObsoleteOutPeer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dialog.ObsoleteOutPeer
         * @static
         * @param {dialog.ObsoleteOutPeer} message ObsoleteOutPeer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ObsoleteOutPeer.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.peer = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.accessHash = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.accessHash = options.longs === String ? "0" : 0;
            }
            if (message.peer != null && message.hasOwnProperty("peer"))
                object.peer = $root.dialog.ObsoletePeer.toObject(message.peer, options);
            if (message.accessHash != null && message.hasOwnProperty("accessHash"))
                if (typeof message.accessHash === "number")
                    object.accessHash = options.longs === String ? String(message.accessHash) : message.accessHash;
                else
                    object.accessHash = options.longs === String ? $util.Long.prototype.toString.call(message.accessHash) : options.longs === Number ? new $util.LongBits(message.accessHash.low >>> 0, message.accessHash.high >>> 0).toNumber() : message.accessHash;
            return object;
        };

        /**
         * Converts this ObsoleteOutPeer to JSON.
         * @function toJSON
         * @memberof dialog.ObsoleteOutPeer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ObsoleteOutPeer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ObsoleteOutPeer;
    })();

    dialog.ObsoletePeersList = (function() {

        /**
         * Properties of an ObsoletePeersList.
         * @memberof dialog
         * @interface IObsoletePeersList
         * @property {Array.<dialog.IObsoletePeer>|null} [peers] ObsoletePeersList peers
         */

        /**
         * Constructs a new ObsoletePeersList.
         * @memberof dialog
         * @classdesc Represents an ObsoletePeersList.
         * @implements IObsoletePeersList
         * @constructor
         * @param {dialog.IObsoletePeersList=} [properties] Properties to set
         */
        function ObsoletePeersList(properties) {
            this.peers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ObsoletePeersList peers.
         * @member {Array.<dialog.IObsoletePeer>} peers
         * @memberof dialog.ObsoletePeersList
         * @instance
         */
        ObsoletePeersList.prototype.peers = $util.emptyArray;

        /**
         * Creates a new ObsoletePeersList instance using the specified properties.
         * @function create
         * @memberof dialog.ObsoletePeersList
         * @static
         * @param {dialog.IObsoletePeersList=} [properties] Properties to set
         * @returns {dialog.ObsoletePeersList} ObsoletePeersList instance
         */
        ObsoletePeersList.create = function create(properties) {
            return new ObsoletePeersList(properties);
        };

        /**
         * Encodes the specified ObsoletePeersList message. Does not implicitly {@link dialog.ObsoletePeersList.verify|verify} messages.
         * @function encode
         * @memberof dialog.ObsoletePeersList
         * @static
         * @param {dialog.IObsoletePeersList} message ObsoletePeersList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObsoletePeersList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.peers != null && message.peers.length)
                for (let i = 0; i < message.peers.length; ++i)
                    $root.dialog.ObsoletePeer.encode(message.peers[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ObsoletePeersList message, length delimited. Does not implicitly {@link dialog.ObsoletePeersList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dialog.ObsoletePeersList
         * @static
         * @param {dialog.IObsoletePeersList} message ObsoletePeersList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObsoletePeersList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ObsoletePeersList message from the specified reader or buffer.
         * @function decode
         * @memberof dialog.ObsoletePeersList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dialog.ObsoletePeersList} ObsoletePeersList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObsoletePeersList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoletePeersList();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.peers && message.peers.length))
                        message.peers = [];
                    message.peers.push($root.dialog.ObsoletePeer.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ObsoletePeersList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dialog.ObsoletePeersList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dialog.ObsoletePeersList} ObsoletePeersList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObsoletePeersList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ObsoletePeersList message.
         * @function verify
         * @memberof dialog.ObsoletePeersList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ObsoletePeersList.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.peers != null && message.hasOwnProperty("peers")) {
                if (!Array.isArray(message.peers))
                    return "peers: array expected";
                for (let i = 0; i < message.peers.length; ++i) {
                    let error = $root.dialog.ObsoletePeer.verify(message.peers[i]);
                    if (error)
                        return "peers." + error;
                }
            }
            return null;
        };

        /**
         * Creates an ObsoletePeersList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dialog.ObsoletePeersList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dialog.ObsoletePeersList} ObsoletePeersList
         */
        ObsoletePeersList.fromObject = function fromObject(object) {
            if (object instanceof $root.dialog.ObsoletePeersList)
                return object;
            let message = new $root.dialog.ObsoletePeersList();
            if (object.peers) {
                if (!Array.isArray(object.peers))
                    throw TypeError(".dialog.ObsoletePeersList.peers: array expected");
                message.peers = [];
                for (let i = 0; i < object.peers.length; ++i) {
                    if (typeof object.peers[i] !== "object")
                        throw TypeError(".dialog.ObsoletePeersList.peers: object expected");
                    message.peers[i] = $root.dialog.ObsoletePeer.fromObject(object.peers[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an ObsoletePeersList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dialog.ObsoletePeersList
         * @static
         * @param {dialog.ObsoletePeersList} message ObsoletePeersList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ObsoletePeersList.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.peers = [];
            if (message.peers && message.peers.length) {
                object.peers = [];
                for (let j = 0; j < message.peers.length; ++j)
                    object.peers[j] = $root.dialog.ObsoletePeer.toObject(message.peers[j], options);
            }
            return object;
        };

        /**
         * Converts this ObsoletePeersList to JSON.
         * @function toJSON
         * @memberof dialog.ObsoletePeersList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ObsoletePeersList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ObsoletePeersList;
    })();

    dialog.ObsoleteGetDifferenceCommand = (function() {

        /**
         * Properties of an ObsoleteGetDifferenceCommand.
         * @memberof dialog
         * @interface IObsoleteGetDifferenceCommand
         * @property {google.protobuf.IInt32Value|null} [seq] ObsoleteGetDifferenceCommand seq
         * @property {Uint8Array|null} [state] ObsoleteGetDifferenceCommand state
         * @property {number|Long|null} [configHash] ObsoleteGetDifferenceCommand configHash
         */

        /**
         * Constructs a new ObsoleteGetDifferenceCommand.
         * @memberof dialog
         * @classdesc Represents an ObsoleteGetDifferenceCommand.
         * @implements IObsoleteGetDifferenceCommand
         * @constructor
         * @param {dialog.IObsoleteGetDifferenceCommand=} [properties] Properties to set
         */
        function ObsoleteGetDifferenceCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ObsoleteGetDifferenceCommand seq.
         * @member {google.protobuf.IInt32Value|null|undefined} seq
         * @memberof dialog.ObsoleteGetDifferenceCommand
         * @instance
         */
        ObsoleteGetDifferenceCommand.prototype.seq = null;

        /**
         * ObsoleteGetDifferenceCommand state.
         * @member {Uint8Array} state
         * @memberof dialog.ObsoleteGetDifferenceCommand
         * @instance
         */
        ObsoleteGetDifferenceCommand.prototype.state = $util.newBuffer([]);

        /**
         * ObsoleteGetDifferenceCommand configHash.
         * @member {number|Long} configHash
         * @memberof dialog.ObsoleteGetDifferenceCommand
         * @instance
         */
        ObsoleteGetDifferenceCommand.prototype.configHash = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new ObsoleteGetDifferenceCommand instance using the specified properties.
         * @function create
         * @memberof dialog.ObsoleteGetDifferenceCommand
         * @static
         * @param {dialog.IObsoleteGetDifferenceCommand=} [properties] Properties to set
         * @returns {dialog.ObsoleteGetDifferenceCommand} ObsoleteGetDifferenceCommand instance
         */
        ObsoleteGetDifferenceCommand.create = function create(properties) {
            return new ObsoleteGetDifferenceCommand(properties);
        };

        /**
         * Encodes the specified ObsoleteGetDifferenceCommand message. Does not implicitly {@link dialog.ObsoleteGetDifferenceCommand.verify|verify} messages.
         * @function encode
         * @memberof dialog.ObsoleteGetDifferenceCommand
         * @static
         * @param {dialog.IObsoleteGetDifferenceCommand} message ObsoleteGetDifferenceCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObsoleteGetDifferenceCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seq != null && message.hasOwnProperty("seq"))
                $root.google.protobuf.Int32Value.encode(message.seq, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.state != null && message.hasOwnProperty("state"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.state);
            if (message.configHash != null && message.hasOwnProperty("configHash"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.configHash);
            return writer;
        };

        /**
         * Encodes the specified ObsoleteGetDifferenceCommand message, length delimited. Does not implicitly {@link dialog.ObsoleteGetDifferenceCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dialog.ObsoleteGetDifferenceCommand
         * @static
         * @param {dialog.IObsoleteGetDifferenceCommand} message ObsoleteGetDifferenceCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObsoleteGetDifferenceCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ObsoleteGetDifferenceCommand message from the specified reader or buffer.
         * @function decode
         * @memberof dialog.ObsoleteGetDifferenceCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dialog.ObsoleteGetDifferenceCommand} ObsoleteGetDifferenceCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObsoleteGetDifferenceCommand.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteGetDifferenceCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seq = $root.google.protobuf.Int32Value.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.state = reader.bytes();
                    break;
                case 3:
                    message.configHash = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ObsoleteGetDifferenceCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dialog.ObsoleteGetDifferenceCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dialog.ObsoleteGetDifferenceCommand} ObsoleteGetDifferenceCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObsoleteGetDifferenceCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ObsoleteGetDifferenceCommand message.
         * @function verify
         * @memberof dialog.ObsoleteGetDifferenceCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ObsoleteGetDifferenceCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seq != null && message.hasOwnProperty("seq")) {
                let error = $root.google.protobuf.Int32Value.verify(message.seq);
                if (error)
                    return "seq." + error;
            }
            if (message.state != null && message.hasOwnProperty("state"))
                if (!(message.state && typeof message.state.length === "number" || $util.isString(message.state)))
                    return "state: buffer expected";
            if (message.configHash != null && message.hasOwnProperty("configHash"))
                if (!$util.isInteger(message.configHash) && !(message.configHash && $util.isInteger(message.configHash.low) && $util.isInteger(message.configHash.high)))
                    return "configHash: integer|Long expected";
            return null;
        };

        /**
         * Creates an ObsoleteGetDifferenceCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dialog.ObsoleteGetDifferenceCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dialog.ObsoleteGetDifferenceCommand} ObsoleteGetDifferenceCommand
         */
        ObsoleteGetDifferenceCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.dialog.ObsoleteGetDifferenceCommand)
                return object;
            let message = new $root.dialog.ObsoleteGetDifferenceCommand();
            if (object.seq != null) {
                if (typeof object.seq !== "object")
                    throw TypeError(".dialog.ObsoleteGetDifferenceCommand.seq: object expected");
                message.seq = $root.google.protobuf.Int32Value.fromObject(object.seq);
            }
            if (object.state != null)
                if (typeof object.state === "string")
                    $util.base64.decode(object.state, message.state = $util.newBuffer($util.base64.length(object.state)), 0);
                else if (object.state.length)
                    message.state = object.state;
            if (object.configHash != null)
                if ($util.Long)
                    (message.configHash = $util.Long.fromValue(object.configHash)).unsigned = false;
                else if (typeof object.configHash === "string")
                    message.configHash = parseInt(object.configHash, 10);
                else if (typeof object.configHash === "number")
                    message.configHash = object.configHash;
                else if (typeof object.configHash === "object")
                    message.configHash = new $util.LongBits(object.configHash.low >>> 0, object.configHash.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an ObsoleteGetDifferenceCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dialog.ObsoleteGetDifferenceCommand
         * @static
         * @param {dialog.ObsoleteGetDifferenceCommand} message ObsoleteGetDifferenceCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ObsoleteGetDifferenceCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seq = null;
                object.state = options.bytes === String ? "" : [];
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.configHash = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.configHash = options.longs === String ? "0" : 0;
            }
            if (message.seq != null && message.hasOwnProperty("seq"))
                object.seq = $root.google.protobuf.Int32Value.toObject(message.seq, options);
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = options.bytes === String ? $util.base64.encode(message.state, 0, message.state.length) : options.bytes === Array ? Array.prototype.slice.call(message.state) : message.state;
            if (message.configHash != null && message.hasOwnProperty("configHash"))
                if (typeof message.configHash === "number")
                    object.configHash = options.longs === String ? String(message.configHash) : message.configHash;
                else
                    object.configHash = options.longs === String ? $util.Long.prototype.toString.call(message.configHash) : options.longs === Number ? new $util.LongBits(message.configHash.low >>> 0, message.configHash.high >>> 0).toNumber() : message.configHash;
            return object;
        };

        /**
         * Converts this ObsoleteGetDifferenceCommand to JSON.
         * @function toJSON
         * @memberof dialog.ObsoleteGetDifferenceCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ObsoleteGetDifferenceCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ObsoleteGetDifferenceCommand;
    })();

    dialog.ObsoleteSeqUpdateBox = (function() {

        /**
         * Properties of an ObsoleteSeqUpdateBox.
         * @memberof dialog
         * @interface IObsoleteSeqUpdateBox
         * @property {number|null} [seq] ObsoleteSeqUpdateBox seq
         * @property {Uint8Array|null} [state] ObsoleteSeqUpdateBox state
         * @property {google.protobuf.IBytesValue|null} [obsoleteUpdate] ObsoleteSeqUpdateBox obsoleteUpdate
         */

        /**
         * Constructs a new ObsoleteSeqUpdateBox.
         * @memberof dialog
         * @classdesc Represents an ObsoleteSeqUpdateBox.
         * @implements IObsoleteSeqUpdateBox
         * @constructor
         * @param {dialog.IObsoleteSeqUpdateBox=} [properties] Properties to set
         */
        function ObsoleteSeqUpdateBox(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ObsoleteSeqUpdateBox seq.
         * @member {number} seq
         * @memberof dialog.ObsoleteSeqUpdateBox
         * @instance
         */
        ObsoleteSeqUpdateBox.prototype.seq = 0;

        /**
         * ObsoleteSeqUpdateBox state.
         * @member {Uint8Array} state
         * @memberof dialog.ObsoleteSeqUpdateBox
         * @instance
         */
        ObsoleteSeqUpdateBox.prototype.state = $util.newBuffer([]);

        /**
         * ObsoleteSeqUpdateBox obsoleteUpdate.
         * @member {google.protobuf.IBytesValue|null|undefined} obsoleteUpdate
         * @memberof dialog.ObsoleteSeqUpdateBox
         * @instance
         */
        ObsoleteSeqUpdateBox.prototype.obsoleteUpdate = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * ObsoleteSeqUpdateBox updatebox.
         * @member {"obsoleteUpdate"|undefined} updatebox
         * @memberof dialog.ObsoleteSeqUpdateBox
         * @instance
         */
        Object.defineProperty(ObsoleteSeqUpdateBox.prototype, "updatebox", {
            get: $util.oneOfGetter($oneOfFields = ["obsoleteUpdate"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ObsoleteSeqUpdateBox instance using the specified properties.
         * @function create
         * @memberof dialog.ObsoleteSeqUpdateBox
         * @static
         * @param {dialog.IObsoleteSeqUpdateBox=} [properties] Properties to set
         * @returns {dialog.ObsoleteSeqUpdateBox} ObsoleteSeqUpdateBox instance
         */
        ObsoleteSeqUpdateBox.create = function create(properties) {
            return new ObsoleteSeqUpdateBox(properties);
        };

        /**
         * Encodes the specified ObsoleteSeqUpdateBox message. Does not implicitly {@link dialog.ObsoleteSeqUpdateBox.verify|verify} messages.
         * @function encode
         * @memberof dialog.ObsoleteSeqUpdateBox
         * @static
         * @param {dialog.IObsoleteSeqUpdateBox} message ObsoleteSeqUpdateBox message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObsoleteSeqUpdateBox.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seq != null && message.hasOwnProperty("seq"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seq);
            if (message.state != null && message.hasOwnProperty("state"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.state);
            if (message.obsoleteUpdate != null && message.hasOwnProperty("obsoleteUpdate"))
                $root.google.protobuf.BytesValue.encode(message.obsoleteUpdate, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ObsoleteSeqUpdateBox message, length delimited. Does not implicitly {@link dialog.ObsoleteSeqUpdateBox.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dialog.ObsoleteSeqUpdateBox
         * @static
         * @param {dialog.IObsoleteSeqUpdateBox} message ObsoleteSeqUpdateBox message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObsoleteSeqUpdateBox.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ObsoleteSeqUpdateBox message from the specified reader or buffer.
         * @function decode
         * @memberof dialog.ObsoleteSeqUpdateBox
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dialog.ObsoleteSeqUpdateBox} ObsoleteSeqUpdateBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObsoleteSeqUpdateBox.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteSeqUpdateBox();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seq = reader.int32();
                    break;
                case 2:
                    message.state = reader.bytes();
                    break;
                case 3:
                    message.obsoleteUpdate = $root.google.protobuf.BytesValue.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ObsoleteSeqUpdateBox message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dialog.ObsoleteSeqUpdateBox
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dialog.ObsoleteSeqUpdateBox} ObsoleteSeqUpdateBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObsoleteSeqUpdateBox.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ObsoleteSeqUpdateBox message.
         * @function verify
         * @memberof dialog.ObsoleteSeqUpdateBox
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ObsoleteSeqUpdateBox.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.seq != null && message.hasOwnProperty("seq"))
                if (!$util.isInteger(message.seq))
                    return "seq: integer expected";
            if (message.state != null && message.hasOwnProperty("state"))
                if (!(message.state && typeof message.state.length === "number" || $util.isString(message.state)))
                    return "state: buffer expected";
            if (message.obsoleteUpdate != null && message.hasOwnProperty("obsoleteUpdate")) {
                properties.updatebox = 1;
                {
                    let error = $root.google.protobuf.BytesValue.verify(message.obsoleteUpdate);
                    if (error)
                        return "obsoleteUpdate." + error;
                }
            }
            return null;
        };

        /**
         * Creates an ObsoleteSeqUpdateBox message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dialog.ObsoleteSeqUpdateBox
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dialog.ObsoleteSeqUpdateBox} ObsoleteSeqUpdateBox
         */
        ObsoleteSeqUpdateBox.fromObject = function fromObject(object) {
            if (object instanceof $root.dialog.ObsoleteSeqUpdateBox)
                return object;
            let message = new $root.dialog.ObsoleteSeqUpdateBox();
            if (object.seq != null)
                message.seq = object.seq | 0;
            if (object.state != null)
                if (typeof object.state === "string")
                    $util.base64.decode(object.state, message.state = $util.newBuffer($util.base64.length(object.state)), 0);
                else if (object.state.length)
                    message.state = object.state;
            if (object.obsoleteUpdate != null) {
                if (typeof object.obsoleteUpdate !== "object")
                    throw TypeError(".dialog.ObsoleteSeqUpdateBox.obsoleteUpdate: object expected");
                message.obsoleteUpdate = $root.google.protobuf.BytesValue.fromObject(object.obsoleteUpdate);
            }
            return message;
        };

        /**
         * Creates a plain object from an ObsoleteSeqUpdateBox message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dialog.ObsoleteSeqUpdateBox
         * @static
         * @param {dialog.ObsoleteSeqUpdateBox} message ObsoleteSeqUpdateBox
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ObsoleteSeqUpdateBox.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seq = 0;
                object.state = options.bytes === String ? "" : [];
            }
            if (message.seq != null && message.hasOwnProperty("seq"))
                object.seq = message.seq;
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = options.bytes === String ? $util.base64.encode(message.state, 0, message.state.length) : options.bytes === Array ? Array.prototype.slice.call(message.state) : message.state;
            if (message.obsoleteUpdate != null && message.hasOwnProperty("obsoleteUpdate")) {
                object.obsoleteUpdate = $root.google.protobuf.BytesValue.toObject(message.obsoleteUpdate, options);
                if (options.oneofs)
                    object.updatebox = "obsoleteUpdate";
            }
            return object;
        };

        /**
         * Converts this ObsoleteSeqUpdateBox to JSON.
         * @function toJSON
         * @memberof dialog.ObsoleteSeqUpdateBox
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ObsoleteSeqUpdateBox.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ObsoleteSeqUpdateBox;
    })();

    dialog.ObsoleteWeakUpdateBox = (function() {

        /**
         * Properties of an ObsoleteWeakUpdateBox.
         * @memberof dialog
         * @interface IObsoleteWeakUpdateBox
         * @property {number|Long|null} [date] ObsoleteWeakUpdateBox date
         * @property {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateTyping|null} [typing] ObsoleteWeakUpdateBox typing
         * @property {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateUserLastSeen|null} [userLastSeen] ObsoleteWeakUpdateBox userLastSeen
         * @property {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateGroupOnline|null} [groupOnline] ObsoleteWeakUpdateBox groupOnline
         * @property {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusMessage|null} [busMessage] ObsoleteWeakUpdateBox busMessage
         * @property {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDeviceConnected|null} [busDeviceConnected] ObsoleteWeakUpdateBox busDeviceConnected
         * @property {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDeviceDisconnected|null} [busDeviceDisconnected] ObsoleteWeakUpdateBox busDeviceDisconnected
         * @property {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDisposed|null} [busDisposed] ObsoleteWeakUpdateBox busDisposed
         * @property {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateForceReloadState|null} [forceReload] ObsoleteWeakUpdateBox forceReload
         * @property {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateIncomingCall|null} [incomingCall] ObsoleteWeakUpdateBox incomingCall
         * @property {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateCallHandled|null} [callHandled] ObsoleteWeakUpdateBox callHandled
         * @property {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateCallDisposed|null} [callDisposed] ObsoleteWeakUpdateBox callDisposed
         */

        /**
         * Constructs a new ObsoleteWeakUpdateBox.
         * @memberof dialog
         * @classdesc Represents an ObsoleteWeakUpdateBox.
         * @implements IObsoleteWeakUpdateBox
         * @constructor
         * @param {dialog.IObsoleteWeakUpdateBox=} [properties] Properties to set
         */
        function ObsoleteWeakUpdateBox(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ObsoleteWeakUpdateBox date.
         * @member {number|Long} date
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @instance
         */
        ObsoleteWeakUpdateBox.prototype.date = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ObsoleteWeakUpdateBox typing.
         * @member {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateTyping|null|undefined} typing
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @instance
         */
        ObsoleteWeakUpdateBox.prototype.typing = null;

        /**
         * ObsoleteWeakUpdateBox userLastSeen.
         * @member {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateUserLastSeen|null|undefined} userLastSeen
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @instance
         */
        ObsoleteWeakUpdateBox.prototype.userLastSeen = null;

        /**
         * ObsoleteWeakUpdateBox groupOnline.
         * @member {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateGroupOnline|null|undefined} groupOnline
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @instance
         */
        ObsoleteWeakUpdateBox.prototype.groupOnline = null;

        /**
         * ObsoleteWeakUpdateBox busMessage.
         * @member {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusMessage|null|undefined} busMessage
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @instance
         */
        ObsoleteWeakUpdateBox.prototype.busMessage = null;

        /**
         * ObsoleteWeakUpdateBox busDeviceConnected.
         * @member {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDeviceConnected|null|undefined} busDeviceConnected
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @instance
         */
        ObsoleteWeakUpdateBox.prototype.busDeviceConnected = null;

        /**
         * ObsoleteWeakUpdateBox busDeviceDisconnected.
         * @member {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDeviceDisconnected|null|undefined} busDeviceDisconnected
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @instance
         */
        ObsoleteWeakUpdateBox.prototype.busDeviceDisconnected = null;

        /**
         * ObsoleteWeakUpdateBox busDisposed.
         * @member {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDisposed|null|undefined} busDisposed
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @instance
         */
        ObsoleteWeakUpdateBox.prototype.busDisposed = null;

        /**
         * ObsoleteWeakUpdateBox forceReload.
         * @member {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateForceReloadState|null|undefined} forceReload
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @instance
         */
        ObsoleteWeakUpdateBox.prototype.forceReload = null;

        /**
         * ObsoleteWeakUpdateBox incomingCall.
         * @member {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateIncomingCall|null|undefined} incomingCall
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @instance
         */
        ObsoleteWeakUpdateBox.prototype.incomingCall = null;

        /**
         * ObsoleteWeakUpdateBox callHandled.
         * @member {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateCallHandled|null|undefined} callHandled
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @instance
         */
        ObsoleteWeakUpdateBox.prototype.callHandled = null;

        /**
         * ObsoleteWeakUpdateBox callDisposed.
         * @member {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateCallDisposed|null|undefined} callDisposed
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @instance
         */
        ObsoleteWeakUpdateBox.prototype.callDisposed = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * ObsoleteWeakUpdateBox updatebox.
         * @member {"typing"|"userLastSeen"|"groupOnline"|"busMessage"|"busDeviceConnected"|"busDeviceDisconnected"|"busDisposed"|"forceReload"|"incomingCall"|"callHandled"|"callDisposed"|undefined} updatebox
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @instance
         */
        Object.defineProperty(ObsoleteWeakUpdateBox.prototype, "updatebox", {
            get: $util.oneOfGetter($oneOfFields = ["typing", "userLastSeen", "groupOnline", "busMessage", "busDeviceConnected", "busDeviceDisconnected", "busDisposed", "forceReload", "incomingCall", "callHandled", "callDisposed"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ObsoleteWeakUpdateBox instance using the specified properties.
         * @function create
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @static
         * @param {dialog.IObsoleteWeakUpdateBox=} [properties] Properties to set
         * @returns {dialog.ObsoleteWeakUpdateBox} ObsoleteWeakUpdateBox instance
         */
        ObsoleteWeakUpdateBox.create = function create(properties) {
            return new ObsoleteWeakUpdateBox(properties);
        };

        /**
         * Encodes the specified ObsoleteWeakUpdateBox message. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.verify|verify} messages.
         * @function encode
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @static
         * @param {dialog.IObsoleteWeakUpdateBox} message ObsoleteWeakUpdateBox message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObsoleteWeakUpdateBox.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.date != null && message.hasOwnProperty("date"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.date);
            if (message.typing != null && message.hasOwnProperty("typing"))
                $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping.encode(message.typing, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.userLastSeen != null && message.hasOwnProperty("userLastSeen"))
                $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen.encode(message.userLastSeen, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.groupOnline != null && message.hasOwnProperty("groupOnline"))
                $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline.encode(message.groupOnline, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.busMessage != null && message.hasOwnProperty("busMessage"))
                $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage.encode(message.busMessage, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.busDeviceConnected != null && message.hasOwnProperty("busDeviceConnected"))
                $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected.encode(message.busDeviceConnected, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.busDeviceDisconnected != null && message.hasOwnProperty("busDeviceDisconnected"))
                $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected.encode(message.busDeviceDisconnected, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.busDisposed != null && message.hasOwnProperty("busDisposed"))
                $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed.encode(message.busDisposed, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.forceReload != null && message.hasOwnProperty("forceReload"))
                $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.encode(message.forceReload, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.incomingCall != null && message.hasOwnProperty("incomingCall"))
                $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall.encode(message.incomingCall, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.callHandled != null && message.hasOwnProperty("callHandled"))
                $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled.encode(message.callHandled, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.callDisposed != null && message.hasOwnProperty("callDisposed"))
                $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed.encode(message.callDisposed, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ObsoleteWeakUpdateBox message, length delimited. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @static
         * @param {dialog.IObsoleteWeakUpdateBox} message ObsoleteWeakUpdateBox message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObsoleteWeakUpdateBox.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ObsoleteWeakUpdateBox message from the specified reader or buffer.
         * @function decode
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dialog.ObsoleteWeakUpdateBox} ObsoleteWeakUpdateBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObsoleteWeakUpdateBox.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteWeakUpdateBox();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.date = reader.int64();
                    break;
                case 2:
                    message.typing = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.userLastSeen = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.groupOnline = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.busMessage = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.busDeviceConnected = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.busDeviceDisconnected = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.busDisposed = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.forceReload = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.incomingCall = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.callHandled = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled.decode(reader, reader.uint32());
                    break;
                case 12:
                    message.callDisposed = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ObsoleteWeakUpdateBox message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dialog.ObsoleteWeakUpdateBox} ObsoleteWeakUpdateBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObsoleteWeakUpdateBox.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ObsoleteWeakUpdateBox message.
         * @function verify
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ObsoleteWeakUpdateBox.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.date != null && message.hasOwnProperty("date"))
                if (!$util.isInteger(message.date) && !(message.date && $util.isInteger(message.date.low) && $util.isInteger(message.date.high)))
                    return "date: integer|Long expected";
            if (message.typing != null && message.hasOwnProperty("typing")) {
                properties.updatebox = 1;
                {
                    let error = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping.verify(message.typing);
                    if (error)
                        return "typing." + error;
                }
            }
            if (message.userLastSeen != null && message.hasOwnProperty("userLastSeen")) {
                if (properties.updatebox === 1)
                    return "updatebox: multiple values";
                properties.updatebox = 1;
                {
                    let error = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen.verify(message.userLastSeen);
                    if (error)
                        return "userLastSeen." + error;
                }
            }
            if (message.groupOnline != null && message.hasOwnProperty("groupOnline")) {
                if (properties.updatebox === 1)
                    return "updatebox: multiple values";
                properties.updatebox = 1;
                {
                    let error = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline.verify(message.groupOnline);
                    if (error)
                        return "groupOnline." + error;
                }
            }
            if (message.busMessage != null && message.hasOwnProperty("busMessage")) {
                if (properties.updatebox === 1)
                    return "updatebox: multiple values";
                properties.updatebox = 1;
                {
                    let error = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage.verify(message.busMessage);
                    if (error)
                        return "busMessage." + error;
                }
            }
            if (message.busDeviceConnected != null && message.hasOwnProperty("busDeviceConnected")) {
                if (properties.updatebox === 1)
                    return "updatebox: multiple values";
                properties.updatebox = 1;
                {
                    let error = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected.verify(message.busDeviceConnected);
                    if (error)
                        return "busDeviceConnected." + error;
                }
            }
            if (message.busDeviceDisconnected != null && message.hasOwnProperty("busDeviceDisconnected")) {
                if (properties.updatebox === 1)
                    return "updatebox: multiple values";
                properties.updatebox = 1;
                {
                    let error = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected.verify(message.busDeviceDisconnected);
                    if (error)
                        return "busDeviceDisconnected." + error;
                }
            }
            if (message.busDisposed != null && message.hasOwnProperty("busDisposed")) {
                if (properties.updatebox === 1)
                    return "updatebox: multiple values";
                properties.updatebox = 1;
                {
                    let error = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed.verify(message.busDisposed);
                    if (error)
                        return "busDisposed." + error;
                }
            }
            if (message.forceReload != null && message.hasOwnProperty("forceReload")) {
                if (properties.updatebox === 1)
                    return "updatebox: multiple values";
                properties.updatebox = 1;
                {
                    let error = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.verify(message.forceReload);
                    if (error)
                        return "forceReload." + error;
                }
            }
            if (message.incomingCall != null && message.hasOwnProperty("incomingCall")) {
                if (properties.updatebox === 1)
                    return "updatebox: multiple values";
                properties.updatebox = 1;
                {
                    let error = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall.verify(message.incomingCall);
                    if (error)
                        return "incomingCall." + error;
                }
            }
            if (message.callHandled != null && message.hasOwnProperty("callHandled")) {
                if (properties.updatebox === 1)
                    return "updatebox: multiple values";
                properties.updatebox = 1;
                {
                    let error = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled.verify(message.callHandled);
                    if (error)
                        return "callHandled." + error;
                }
            }
            if (message.callDisposed != null && message.hasOwnProperty("callDisposed")) {
                if (properties.updatebox === 1)
                    return "updatebox: multiple values";
                properties.updatebox = 1;
                {
                    let error = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed.verify(message.callDisposed);
                    if (error)
                        return "callDisposed." + error;
                }
            }
            return null;
        };

        /**
         * Creates an ObsoleteWeakUpdateBox message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dialog.ObsoleteWeakUpdateBox} ObsoleteWeakUpdateBox
         */
        ObsoleteWeakUpdateBox.fromObject = function fromObject(object) {
            if (object instanceof $root.dialog.ObsoleteWeakUpdateBox)
                return object;
            let message = new $root.dialog.ObsoleteWeakUpdateBox();
            if (object.date != null)
                if ($util.Long)
                    (message.date = $util.Long.fromValue(object.date)).unsigned = false;
                else if (typeof object.date === "string")
                    message.date = parseInt(object.date, 10);
                else if (typeof object.date === "number")
                    message.date = object.date;
                else if (typeof object.date === "object")
                    message.date = new $util.LongBits(object.date.low >>> 0, object.date.high >>> 0).toNumber();
            if (object.typing != null) {
                if (typeof object.typing !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateBox.typing: object expected");
                message.typing = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping.fromObject(object.typing);
            }
            if (object.userLastSeen != null) {
                if (typeof object.userLastSeen !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateBox.userLastSeen: object expected");
                message.userLastSeen = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen.fromObject(object.userLastSeen);
            }
            if (object.groupOnline != null) {
                if (typeof object.groupOnline !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateBox.groupOnline: object expected");
                message.groupOnline = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline.fromObject(object.groupOnline);
            }
            if (object.busMessage != null) {
                if (typeof object.busMessage !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateBox.busMessage: object expected");
                message.busMessage = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage.fromObject(object.busMessage);
            }
            if (object.busDeviceConnected != null) {
                if (typeof object.busDeviceConnected !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateBox.busDeviceConnected: object expected");
                message.busDeviceConnected = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected.fromObject(object.busDeviceConnected);
            }
            if (object.busDeviceDisconnected != null) {
                if (typeof object.busDeviceDisconnected !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateBox.busDeviceDisconnected: object expected");
                message.busDeviceDisconnected = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected.fromObject(object.busDeviceDisconnected);
            }
            if (object.busDisposed != null) {
                if (typeof object.busDisposed !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateBox.busDisposed: object expected");
                message.busDisposed = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed.fromObject(object.busDisposed);
            }
            if (object.forceReload != null) {
                if (typeof object.forceReload !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateBox.forceReload: object expected");
                message.forceReload = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.fromObject(object.forceReload);
            }
            if (object.incomingCall != null) {
                if (typeof object.incomingCall !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateBox.incomingCall: object expected");
                message.incomingCall = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall.fromObject(object.incomingCall);
            }
            if (object.callHandled != null) {
                if (typeof object.callHandled !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateBox.callHandled: object expected");
                message.callHandled = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled.fromObject(object.callHandled);
            }
            if (object.callDisposed != null) {
                if (typeof object.callDisposed !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateBox.callDisposed: object expected");
                message.callDisposed = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed.fromObject(object.callDisposed);
            }
            return message;
        };

        /**
         * Creates a plain object from an ObsoleteWeakUpdateBox message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @static
         * @param {dialog.ObsoleteWeakUpdateBox} message ObsoleteWeakUpdateBox
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ObsoleteWeakUpdateBox.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.date = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.date = options.longs === String ? "0" : 0;
            if (message.date != null && message.hasOwnProperty("date"))
                if (typeof message.date === "number")
                    object.date = options.longs === String ? String(message.date) : message.date;
                else
                    object.date = options.longs === String ? $util.Long.prototype.toString.call(message.date) : options.longs === Number ? new $util.LongBits(message.date.low >>> 0, message.date.high >>> 0).toNumber() : message.date;
            if (message.typing != null && message.hasOwnProperty("typing")) {
                object.typing = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping.toObject(message.typing, options);
                if (options.oneofs)
                    object.updatebox = "typing";
            }
            if (message.userLastSeen != null && message.hasOwnProperty("userLastSeen")) {
                object.userLastSeen = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen.toObject(message.userLastSeen, options);
                if (options.oneofs)
                    object.updatebox = "userLastSeen";
            }
            if (message.groupOnline != null && message.hasOwnProperty("groupOnline")) {
                object.groupOnline = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline.toObject(message.groupOnline, options);
                if (options.oneofs)
                    object.updatebox = "groupOnline";
            }
            if (message.busMessage != null && message.hasOwnProperty("busMessage")) {
                object.busMessage = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage.toObject(message.busMessage, options);
                if (options.oneofs)
                    object.updatebox = "busMessage";
            }
            if (message.busDeviceConnected != null && message.hasOwnProperty("busDeviceConnected")) {
                object.busDeviceConnected = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected.toObject(message.busDeviceConnected, options);
                if (options.oneofs)
                    object.updatebox = "busDeviceConnected";
            }
            if (message.busDeviceDisconnected != null && message.hasOwnProperty("busDeviceDisconnected")) {
                object.busDeviceDisconnected = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected.toObject(message.busDeviceDisconnected, options);
                if (options.oneofs)
                    object.updatebox = "busDeviceDisconnected";
            }
            if (message.busDisposed != null && message.hasOwnProperty("busDisposed")) {
                object.busDisposed = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed.toObject(message.busDisposed, options);
                if (options.oneofs)
                    object.updatebox = "busDisposed";
            }
            if (message.forceReload != null && message.hasOwnProperty("forceReload")) {
                object.forceReload = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.toObject(message.forceReload, options);
                if (options.oneofs)
                    object.updatebox = "forceReload";
            }
            if (message.incomingCall != null && message.hasOwnProperty("incomingCall")) {
                object.incomingCall = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall.toObject(message.incomingCall, options);
                if (options.oneofs)
                    object.updatebox = "incomingCall";
            }
            if (message.callHandled != null && message.hasOwnProperty("callHandled")) {
                object.callHandled = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled.toObject(message.callHandled, options);
                if (options.oneofs)
                    object.updatebox = "callHandled";
            }
            if (message.callDisposed != null && message.hasOwnProperty("callDisposed")) {
                object.callDisposed = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed.toObject(message.callDisposed, options);
                if (options.oneofs)
                    object.updatebox = "callDisposed";
            }
            return object;
        };

        /**
         * Converts this ObsoleteWeakUpdateBox to JSON.
         * @function toJSON
         * @memberof dialog.ObsoleteWeakUpdateBox
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ObsoleteWeakUpdateBox.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        ObsoleteWeakUpdateBox.ObsoleteUpdateTyping = (function() {

            /**
             * Properties of an ObsoleteUpdateTyping.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @interface IObsoleteUpdateTyping
             * @property {dialog.IObsoletePeer|null} [peer] ObsoleteUpdateTyping peer
             * @property {number|null} [userId] ObsoleteUpdateTyping userId
             * @property {dialog.ObsoleteTypingType|null} [type] ObsoleteUpdateTyping type
             * @property {boolean|null} [isTyping] ObsoleteUpdateTyping isTyping
             */

            /**
             * Constructs a new ObsoleteUpdateTyping.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @classdesc Represents an ObsoleteUpdateTyping.
             * @implements IObsoleteUpdateTyping
             * @constructor
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateTyping=} [properties] Properties to set
             */
            function ObsoleteUpdateTyping(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ObsoleteUpdateTyping peer.
             * @member {dialog.IObsoletePeer|null|undefined} peer
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping
             * @instance
             */
            ObsoleteUpdateTyping.prototype.peer = null;

            /**
             * ObsoleteUpdateTyping userId.
             * @member {number} userId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping
             * @instance
             */
            ObsoleteUpdateTyping.prototype.userId = 0;

            /**
             * ObsoleteUpdateTyping type.
             * @member {dialog.ObsoleteTypingType} type
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping
             * @instance
             */
            ObsoleteUpdateTyping.prototype.type = 0;

            /**
             * ObsoleteUpdateTyping isTyping.
             * @member {boolean} isTyping
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping
             * @instance
             */
            ObsoleteUpdateTyping.prototype.isTyping = false;

            /**
             * Creates a new ObsoleteUpdateTyping instance using the specified properties.
             * @function create
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateTyping=} [properties] Properties to set
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping} ObsoleteUpdateTyping instance
             */
            ObsoleteUpdateTyping.create = function create(properties) {
                return new ObsoleteUpdateTyping(properties);
            };

            /**
             * Encodes the specified ObsoleteUpdateTyping message. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping.verify|verify} messages.
             * @function encode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateTyping} message ObsoleteUpdateTyping message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateTyping.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.peer != null && message.hasOwnProperty("peer"))
                    $root.dialog.ObsoletePeer.encode(message.peer, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.userId != null && message.hasOwnProperty("userId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.userId);
                if (message.type != null && message.hasOwnProperty("type"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
                if (message.isTyping != null && message.hasOwnProperty("isTyping"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isTyping);
                return writer;
            };

            /**
             * Encodes the specified ObsoleteUpdateTyping message, length delimited. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateTyping} message ObsoleteUpdateTyping message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateTyping.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ObsoleteUpdateTyping message from the specified reader or buffer.
             * @function decode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping} ObsoleteUpdateTyping
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateTyping.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.peer = $root.dialog.ObsoletePeer.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.userId = reader.int32();
                        break;
                    case 3:
                        message.type = reader.int32();
                        break;
                    case 4:
                        message.isTyping = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ObsoleteUpdateTyping message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping} ObsoleteUpdateTyping
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateTyping.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ObsoleteUpdateTyping message.
             * @function verify
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ObsoleteUpdateTyping.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.peer != null && message.hasOwnProperty("peer")) {
                    let error = $root.dialog.ObsoletePeer.verify(message.peer);
                    if (error)
                        return "peer." + error;
                }
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (!$util.isInteger(message.userId))
                        return "userId: integer expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                if (message.isTyping != null && message.hasOwnProperty("isTyping"))
                    if (typeof message.isTyping !== "boolean")
                        return "isTyping: boolean expected";
                return null;
            };

            /**
             * Creates an ObsoleteUpdateTyping message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping} ObsoleteUpdateTyping
             */
            ObsoleteUpdateTyping.fromObject = function fromObject(object) {
                if (object instanceof $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping)
                    return object;
                let message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping();
                if (object.peer != null) {
                    if (typeof object.peer !== "object")
                        throw TypeError(".dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping.peer: object expected");
                    message.peer = $root.dialog.ObsoletePeer.fromObject(object.peer);
                }
                if (object.userId != null)
                    message.userId = object.userId | 0;
                switch (object.type) {
                case "OBSOLETE_TYPINGTYPE_UNKNOWN":
                case 0:
                    message.type = 0;
                    break;
                case "OBSOLETE_TYPINGTYPE_TEXT":
                case 1:
                    message.type = 1;
                    break;
                }
                if (object.isTyping != null)
                    message.isTyping = Boolean(object.isTyping);
                return message;
            };

            /**
             * Creates a plain object from an ObsoleteUpdateTyping message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping} message ObsoleteUpdateTyping
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ObsoleteUpdateTyping.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.peer = null;
                    object.userId = 0;
                    object.type = options.enums === String ? "OBSOLETE_TYPINGTYPE_UNKNOWN" : 0;
                    object.isTyping = false;
                }
                if (message.peer != null && message.hasOwnProperty("peer"))
                    object.peer = $root.dialog.ObsoletePeer.toObject(message.peer, options);
                if (message.userId != null && message.hasOwnProperty("userId"))
                    object.userId = message.userId;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.dialog.ObsoleteTypingType[message.type] : message.type;
                if (message.isTyping != null && message.hasOwnProperty("isTyping"))
                    object.isTyping = message.isTyping;
                return object;
            };

            /**
             * Converts this ObsoleteUpdateTyping to JSON.
             * @function toJSON
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateTyping
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ObsoleteUpdateTyping.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ObsoleteUpdateTyping;
        })();

        ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen = (function() {

            /**
             * Properties of an ObsoleteUpdateUserLastSeen.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @interface IObsoleteUpdateUserLastSeen
             * @property {number|null} [userId] ObsoleteUpdateUserLastSeen userId
             * @property {number|Long|null} [epochMillis] ObsoleteUpdateUserLastSeen epochMillis
             * @property {number|null} [deviceType] ObsoleteUpdateUserLastSeen deviceType
             * @property {string|null} [deviceCategory] ObsoleteUpdateUserLastSeen deviceCategory
             * @property {boolean|null} [isOnline] ObsoleteUpdateUserLastSeen isOnline
             */

            /**
             * Constructs a new ObsoleteUpdateUserLastSeen.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @classdesc Represents an ObsoleteUpdateUserLastSeen.
             * @implements IObsoleteUpdateUserLastSeen
             * @constructor
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateUserLastSeen=} [properties] Properties to set
             */
            function ObsoleteUpdateUserLastSeen(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ObsoleteUpdateUserLastSeen userId.
             * @member {number} userId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen
             * @instance
             */
            ObsoleteUpdateUserLastSeen.prototype.userId = 0;

            /**
             * ObsoleteUpdateUserLastSeen epochMillis.
             * @member {number|Long} epochMillis
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen
             * @instance
             */
            ObsoleteUpdateUserLastSeen.prototype.epochMillis = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ObsoleteUpdateUserLastSeen deviceType.
             * @member {number} deviceType
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen
             * @instance
             */
            ObsoleteUpdateUserLastSeen.prototype.deviceType = 0;

            /**
             * ObsoleteUpdateUserLastSeen deviceCategory.
             * @member {string} deviceCategory
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen
             * @instance
             */
            ObsoleteUpdateUserLastSeen.prototype.deviceCategory = "";

            /**
             * ObsoleteUpdateUserLastSeen isOnline.
             * @member {boolean} isOnline
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen
             * @instance
             */
            ObsoleteUpdateUserLastSeen.prototype.isOnline = false;

            /**
             * Creates a new ObsoleteUpdateUserLastSeen instance using the specified properties.
             * @function create
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateUserLastSeen=} [properties] Properties to set
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen} ObsoleteUpdateUserLastSeen instance
             */
            ObsoleteUpdateUserLastSeen.create = function create(properties) {
                return new ObsoleteUpdateUserLastSeen(properties);
            };

            /**
             * Encodes the specified ObsoleteUpdateUserLastSeen message. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen.verify|verify} messages.
             * @function encode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateUserLastSeen} message ObsoleteUpdateUserLastSeen message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateUserLastSeen.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.userId != null && message.hasOwnProperty("userId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
                if (message.epochMillis != null && message.hasOwnProperty("epochMillis"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.epochMillis);
                if (message.deviceType != null && message.hasOwnProperty("deviceType"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.deviceType);
                if (message.deviceCategory != null && message.hasOwnProperty("deviceCategory"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.deviceCategory);
                if (message.isOnline != null && message.hasOwnProperty("isOnline"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isOnline);
                return writer;
            };

            /**
             * Encodes the specified ObsoleteUpdateUserLastSeen message, length delimited. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateUserLastSeen} message ObsoleteUpdateUserLastSeen message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateUserLastSeen.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ObsoleteUpdateUserLastSeen message from the specified reader or buffer.
             * @function decode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen} ObsoleteUpdateUserLastSeen
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateUserLastSeen.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.userId = reader.int32();
                        break;
                    case 2:
                        message.epochMillis = reader.int64();
                        break;
                    case 3:
                        message.deviceType = reader.int32();
                        break;
                    case 4:
                        message.deviceCategory = reader.string();
                        break;
                    case 5:
                        message.isOnline = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ObsoleteUpdateUserLastSeen message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen} ObsoleteUpdateUserLastSeen
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateUserLastSeen.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ObsoleteUpdateUserLastSeen message.
             * @function verify
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ObsoleteUpdateUserLastSeen.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (!$util.isInteger(message.userId))
                        return "userId: integer expected";
                if (message.epochMillis != null && message.hasOwnProperty("epochMillis"))
                    if (!$util.isInteger(message.epochMillis) && !(message.epochMillis && $util.isInteger(message.epochMillis.low) && $util.isInteger(message.epochMillis.high)))
                        return "epochMillis: integer|Long expected";
                if (message.deviceType != null && message.hasOwnProperty("deviceType"))
                    if (!$util.isInteger(message.deviceType))
                        return "deviceType: integer expected";
                if (message.deviceCategory != null && message.hasOwnProperty("deviceCategory"))
                    if (!$util.isString(message.deviceCategory))
                        return "deviceCategory: string expected";
                if (message.isOnline != null && message.hasOwnProperty("isOnline"))
                    if (typeof message.isOnline !== "boolean")
                        return "isOnline: boolean expected";
                return null;
            };

            /**
             * Creates an ObsoleteUpdateUserLastSeen message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen} ObsoleteUpdateUserLastSeen
             */
            ObsoleteUpdateUserLastSeen.fromObject = function fromObject(object) {
                if (object instanceof $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen)
                    return object;
                let message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen();
                if (object.userId != null)
                    message.userId = object.userId | 0;
                if (object.epochMillis != null)
                    if ($util.Long)
                        (message.epochMillis = $util.Long.fromValue(object.epochMillis)).unsigned = false;
                    else if (typeof object.epochMillis === "string")
                        message.epochMillis = parseInt(object.epochMillis, 10);
                    else if (typeof object.epochMillis === "number")
                        message.epochMillis = object.epochMillis;
                    else if (typeof object.epochMillis === "object")
                        message.epochMillis = new $util.LongBits(object.epochMillis.low >>> 0, object.epochMillis.high >>> 0).toNumber();
                if (object.deviceType != null)
                    message.deviceType = object.deviceType | 0;
                if (object.deviceCategory != null)
                    message.deviceCategory = String(object.deviceCategory);
                if (object.isOnline != null)
                    message.isOnline = Boolean(object.isOnline);
                return message;
            };

            /**
             * Creates a plain object from an ObsoleteUpdateUserLastSeen message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen} message ObsoleteUpdateUserLastSeen
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ObsoleteUpdateUserLastSeen.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.userId = 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.epochMillis = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.epochMillis = options.longs === String ? "0" : 0;
                    object.deviceType = 0;
                    object.deviceCategory = "";
                    object.isOnline = false;
                }
                if (message.userId != null && message.hasOwnProperty("userId"))
                    object.userId = message.userId;
                if (message.epochMillis != null && message.hasOwnProperty("epochMillis"))
                    if (typeof message.epochMillis === "number")
                        object.epochMillis = options.longs === String ? String(message.epochMillis) : message.epochMillis;
                    else
                        object.epochMillis = options.longs === String ? $util.Long.prototype.toString.call(message.epochMillis) : options.longs === Number ? new $util.LongBits(message.epochMillis.low >>> 0, message.epochMillis.high >>> 0).toNumber() : message.epochMillis;
                if (message.deviceType != null && message.hasOwnProperty("deviceType"))
                    object.deviceType = message.deviceType;
                if (message.deviceCategory != null && message.hasOwnProperty("deviceCategory"))
                    object.deviceCategory = message.deviceCategory;
                if (message.isOnline != null && message.hasOwnProperty("isOnline"))
                    object.isOnline = message.isOnline;
                return object;
            };

            /**
             * Converts this ObsoleteUpdateUserLastSeen to JSON.
             * @function toJSON
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateUserLastSeen
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ObsoleteUpdateUserLastSeen.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ObsoleteUpdateUserLastSeen;
        })();

        ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline = (function() {

            /**
             * Properties of an ObsoleteUpdateGroupOnline.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @interface IObsoleteUpdateGroupOnline
             * @property {number|null} [groupId] ObsoleteUpdateGroupOnline groupId
             * @property {number|null} [count] ObsoleteUpdateGroupOnline count
             */

            /**
             * Constructs a new ObsoleteUpdateGroupOnline.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @classdesc Represents an ObsoleteUpdateGroupOnline.
             * @implements IObsoleteUpdateGroupOnline
             * @constructor
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateGroupOnline=} [properties] Properties to set
             */
            function ObsoleteUpdateGroupOnline(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ObsoleteUpdateGroupOnline groupId.
             * @member {number} groupId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline
             * @instance
             */
            ObsoleteUpdateGroupOnline.prototype.groupId = 0;

            /**
             * ObsoleteUpdateGroupOnline count.
             * @member {number} count
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline
             * @instance
             */
            ObsoleteUpdateGroupOnline.prototype.count = 0;

            /**
             * Creates a new ObsoleteUpdateGroupOnline instance using the specified properties.
             * @function create
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateGroupOnline=} [properties] Properties to set
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline} ObsoleteUpdateGroupOnline instance
             */
            ObsoleteUpdateGroupOnline.create = function create(properties) {
                return new ObsoleteUpdateGroupOnline(properties);
            };

            /**
             * Encodes the specified ObsoleteUpdateGroupOnline message. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline.verify|verify} messages.
             * @function encode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateGroupOnline} message ObsoleteUpdateGroupOnline message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateGroupOnline.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.groupId != null && message.hasOwnProperty("groupId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.groupId);
                if (message.count != null && message.hasOwnProperty("count"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.count);
                return writer;
            };

            /**
             * Encodes the specified ObsoleteUpdateGroupOnline message, length delimited. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateGroupOnline} message ObsoleteUpdateGroupOnline message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateGroupOnline.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ObsoleteUpdateGroupOnline message from the specified reader or buffer.
             * @function decode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline} ObsoleteUpdateGroupOnline
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateGroupOnline.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.groupId = reader.int32();
                        break;
                    case 2:
                        message.count = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ObsoleteUpdateGroupOnline message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline} ObsoleteUpdateGroupOnline
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateGroupOnline.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ObsoleteUpdateGroupOnline message.
             * @function verify
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ObsoleteUpdateGroupOnline.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.groupId != null && message.hasOwnProperty("groupId"))
                    if (!$util.isInteger(message.groupId))
                        return "groupId: integer expected";
                if (message.count != null && message.hasOwnProperty("count"))
                    if (!$util.isInteger(message.count))
                        return "count: integer expected";
                return null;
            };

            /**
             * Creates an ObsoleteUpdateGroupOnline message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline} ObsoleteUpdateGroupOnline
             */
            ObsoleteUpdateGroupOnline.fromObject = function fromObject(object) {
                if (object instanceof $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline)
                    return object;
                let message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline();
                if (object.groupId != null)
                    message.groupId = object.groupId | 0;
                if (object.count != null)
                    message.count = object.count | 0;
                return message;
            };

            /**
             * Creates a plain object from an ObsoleteUpdateGroupOnline message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline} message ObsoleteUpdateGroupOnline
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ObsoleteUpdateGroupOnline.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.groupId = 0;
                    object.count = 0;
                }
                if (message.groupId != null && message.hasOwnProperty("groupId"))
                    object.groupId = message.groupId;
                if (message.count != null && message.hasOwnProperty("count"))
                    object.count = message.count;
                return object;
            };

            /**
             * Converts this ObsoleteUpdateGroupOnline to JSON.
             * @function toJSON
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateGroupOnline
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ObsoleteUpdateGroupOnline.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ObsoleteUpdateGroupOnline;
        })();

        ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage = (function() {

            /**
             * Properties of an ObsoleteUpdateEventBusMessage.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @interface IObsoleteUpdateEventBusMessage
             * @property {string|null} [busId] ObsoleteUpdateEventBusMessage busId
             * @property {google.protobuf.IInt32Value|null} [senderId] ObsoleteUpdateEventBusMessage senderId
             * @property {google.protobuf.IInt64Value|null} [senderDeviceId] ObsoleteUpdateEventBusMessage senderDeviceId
             * @property {Uint8Array|null} [message] ObsoleteUpdateEventBusMessage message
             */

            /**
             * Constructs a new ObsoleteUpdateEventBusMessage.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @classdesc Represents an ObsoleteUpdateEventBusMessage.
             * @implements IObsoleteUpdateEventBusMessage
             * @constructor
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusMessage=} [properties] Properties to set
             */
            function ObsoleteUpdateEventBusMessage(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ObsoleteUpdateEventBusMessage busId.
             * @member {string} busId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage
             * @instance
             */
            ObsoleteUpdateEventBusMessage.prototype.busId = "";

            /**
             * ObsoleteUpdateEventBusMessage senderId.
             * @member {google.protobuf.IInt32Value|null|undefined} senderId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage
             * @instance
             */
            ObsoleteUpdateEventBusMessage.prototype.senderId = null;

            /**
             * ObsoleteUpdateEventBusMessage senderDeviceId.
             * @member {google.protobuf.IInt64Value|null|undefined} senderDeviceId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage
             * @instance
             */
            ObsoleteUpdateEventBusMessage.prototype.senderDeviceId = null;

            /**
             * ObsoleteUpdateEventBusMessage message.
             * @member {Uint8Array} message
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage
             * @instance
             */
            ObsoleteUpdateEventBusMessage.prototype.message = $util.newBuffer([]);

            /**
             * Creates a new ObsoleteUpdateEventBusMessage instance using the specified properties.
             * @function create
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusMessage=} [properties] Properties to set
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage} ObsoleteUpdateEventBusMessage instance
             */
            ObsoleteUpdateEventBusMessage.create = function create(properties) {
                return new ObsoleteUpdateEventBusMessage(properties);
            };

            /**
             * Encodes the specified ObsoleteUpdateEventBusMessage message. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage.verify|verify} messages.
             * @function encode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusMessage} message ObsoleteUpdateEventBusMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateEventBusMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.busId != null && message.hasOwnProperty("busId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.busId);
                if (message.senderId != null && message.hasOwnProperty("senderId"))
                    $root.google.protobuf.Int32Value.encode(message.senderId, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.senderDeviceId != null && message.hasOwnProperty("senderDeviceId"))
                    $root.google.protobuf.Int64Value.encode(message.senderDeviceId, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.message != null && message.hasOwnProperty("message"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.message);
                return writer;
            };

            /**
             * Encodes the specified ObsoleteUpdateEventBusMessage message, length delimited. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusMessage} message ObsoleteUpdateEventBusMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateEventBusMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ObsoleteUpdateEventBusMessage message from the specified reader or buffer.
             * @function decode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage} ObsoleteUpdateEventBusMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateEventBusMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.busId = reader.string();
                        break;
                    case 2:
                        message.senderId = $root.google.protobuf.Int32Value.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.senderDeviceId = $root.google.protobuf.Int64Value.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.message = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ObsoleteUpdateEventBusMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage} ObsoleteUpdateEventBusMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateEventBusMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ObsoleteUpdateEventBusMessage message.
             * @function verify
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ObsoleteUpdateEventBusMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.busId != null && message.hasOwnProperty("busId"))
                    if (!$util.isString(message.busId))
                        return "busId: string expected";
                if (message.senderId != null && message.hasOwnProperty("senderId")) {
                    let error = $root.google.protobuf.Int32Value.verify(message.senderId);
                    if (error)
                        return "senderId." + error;
                }
                if (message.senderDeviceId != null && message.hasOwnProperty("senderDeviceId")) {
                    let error = $root.google.protobuf.Int64Value.verify(message.senderDeviceId);
                    if (error)
                        return "senderDeviceId." + error;
                }
                if (message.message != null && message.hasOwnProperty("message"))
                    if (!(message.message && typeof message.message.length === "number" || $util.isString(message.message)))
                        return "message: buffer expected";
                return null;
            };

            /**
             * Creates an ObsoleteUpdateEventBusMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage} ObsoleteUpdateEventBusMessage
             */
            ObsoleteUpdateEventBusMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage)
                    return object;
                let message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage();
                if (object.busId != null)
                    message.busId = String(object.busId);
                if (object.senderId != null) {
                    if (typeof object.senderId !== "object")
                        throw TypeError(".dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage.senderId: object expected");
                    message.senderId = $root.google.protobuf.Int32Value.fromObject(object.senderId);
                }
                if (object.senderDeviceId != null) {
                    if (typeof object.senderDeviceId !== "object")
                        throw TypeError(".dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage.senderDeviceId: object expected");
                    message.senderDeviceId = $root.google.protobuf.Int64Value.fromObject(object.senderDeviceId);
                }
                if (object.message != null)
                    if (typeof object.message === "string")
                        $util.base64.decode(object.message, message.message = $util.newBuffer($util.base64.length(object.message)), 0);
                    else if (object.message.length)
                        message.message = object.message;
                return message;
            };

            /**
             * Creates a plain object from an ObsoleteUpdateEventBusMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage} message ObsoleteUpdateEventBusMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ObsoleteUpdateEventBusMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.busId = "";
                    object.senderId = null;
                    object.senderDeviceId = null;
                    object.message = options.bytes === String ? "" : [];
                }
                if (message.busId != null && message.hasOwnProperty("busId"))
                    object.busId = message.busId;
                if (message.senderId != null && message.hasOwnProperty("senderId"))
                    object.senderId = $root.google.protobuf.Int32Value.toObject(message.senderId, options);
                if (message.senderDeviceId != null && message.hasOwnProperty("senderDeviceId"))
                    object.senderDeviceId = $root.google.protobuf.Int64Value.toObject(message.senderDeviceId, options);
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = options.bytes === String ? $util.base64.encode(message.message, 0, message.message.length) : options.bytes === Array ? Array.prototype.slice.call(message.message) : message.message;
                return object;
            };

            /**
             * Converts this ObsoleteUpdateEventBusMessage to JSON.
             * @function toJSON
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ObsoleteUpdateEventBusMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ObsoleteUpdateEventBusMessage;
        })();

        ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected = (function() {

            /**
             * Properties of an ObsoleteUpdateEventBusDeviceConnected.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @interface IObsoleteUpdateEventBusDeviceConnected
             * @property {string|null} [busId] ObsoleteUpdateEventBusDeviceConnected busId
             * @property {google.protobuf.IInt32Value|null} [userId] ObsoleteUpdateEventBusDeviceConnected userId
             * @property {number|Long|null} [deviceId] ObsoleteUpdateEventBusDeviceConnected deviceId
             */

            /**
             * Constructs a new ObsoleteUpdateEventBusDeviceConnected.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @classdesc Represents an ObsoleteUpdateEventBusDeviceConnected.
             * @implements IObsoleteUpdateEventBusDeviceConnected
             * @constructor
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDeviceConnected=} [properties] Properties to set
             */
            function ObsoleteUpdateEventBusDeviceConnected(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ObsoleteUpdateEventBusDeviceConnected busId.
             * @member {string} busId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected
             * @instance
             */
            ObsoleteUpdateEventBusDeviceConnected.prototype.busId = "";

            /**
             * ObsoleteUpdateEventBusDeviceConnected userId.
             * @member {google.protobuf.IInt32Value|null|undefined} userId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected
             * @instance
             */
            ObsoleteUpdateEventBusDeviceConnected.prototype.userId = null;

            /**
             * ObsoleteUpdateEventBusDeviceConnected deviceId.
             * @member {number|Long} deviceId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected
             * @instance
             */
            ObsoleteUpdateEventBusDeviceConnected.prototype.deviceId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new ObsoleteUpdateEventBusDeviceConnected instance using the specified properties.
             * @function create
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDeviceConnected=} [properties] Properties to set
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected} ObsoleteUpdateEventBusDeviceConnected instance
             */
            ObsoleteUpdateEventBusDeviceConnected.create = function create(properties) {
                return new ObsoleteUpdateEventBusDeviceConnected(properties);
            };

            /**
             * Encodes the specified ObsoleteUpdateEventBusDeviceConnected message. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected.verify|verify} messages.
             * @function encode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDeviceConnected} message ObsoleteUpdateEventBusDeviceConnected message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateEventBusDeviceConnected.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.busId != null && message.hasOwnProperty("busId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.busId);
                if (message.userId != null && message.hasOwnProperty("userId"))
                    $root.google.protobuf.Int32Value.encode(message.userId, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.deviceId);
                return writer;
            };

            /**
             * Encodes the specified ObsoleteUpdateEventBusDeviceConnected message, length delimited. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDeviceConnected} message ObsoleteUpdateEventBusDeviceConnected message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateEventBusDeviceConnected.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ObsoleteUpdateEventBusDeviceConnected message from the specified reader or buffer.
             * @function decode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected} ObsoleteUpdateEventBusDeviceConnected
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateEventBusDeviceConnected.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.busId = reader.string();
                        break;
                    case 2:
                        message.userId = $root.google.protobuf.Int32Value.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.deviceId = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ObsoleteUpdateEventBusDeviceConnected message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected} ObsoleteUpdateEventBusDeviceConnected
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateEventBusDeviceConnected.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ObsoleteUpdateEventBusDeviceConnected message.
             * @function verify
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ObsoleteUpdateEventBusDeviceConnected.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.busId != null && message.hasOwnProperty("busId"))
                    if (!$util.isString(message.busId))
                        return "busId: string expected";
                if (message.userId != null && message.hasOwnProperty("userId")) {
                    let error = $root.google.protobuf.Int32Value.verify(message.userId);
                    if (error)
                        return "userId." + error;
                }
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (!$util.isInteger(message.deviceId) && !(message.deviceId && $util.isInteger(message.deviceId.low) && $util.isInteger(message.deviceId.high)))
                        return "deviceId: integer|Long expected";
                return null;
            };

            /**
             * Creates an ObsoleteUpdateEventBusDeviceConnected message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected} ObsoleteUpdateEventBusDeviceConnected
             */
            ObsoleteUpdateEventBusDeviceConnected.fromObject = function fromObject(object) {
                if (object instanceof $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected)
                    return object;
                let message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected();
                if (object.busId != null)
                    message.busId = String(object.busId);
                if (object.userId != null) {
                    if (typeof object.userId !== "object")
                        throw TypeError(".dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected.userId: object expected");
                    message.userId = $root.google.protobuf.Int32Value.fromObject(object.userId);
                }
                if (object.deviceId != null)
                    if ($util.Long)
                        (message.deviceId = $util.Long.fromValue(object.deviceId)).unsigned = false;
                    else if (typeof object.deviceId === "string")
                        message.deviceId = parseInt(object.deviceId, 10);
                    else if (typeof object.deviceId === "number")
                        message.deviceId = object.deviceId;
                    else if (typeof object.deviceId === "object")
                        message.deviceId = new $util.LongBits(object.deviceId.low >>> 0, object.deviceId.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from an ObsoleteUpdateEventBusDeviceConnected message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected} message ObsoleteUpdateEventBusDeviceConnected
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ObsoleteUpdateEventBusDeviceConnected.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.busId = "";
                    object.userId = null;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.deviceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.deviceId = options.longs === String ? "0" : 0;
                }
                if (message.busId != null && message.hasOwnProperty("busId"))
                    object.busId = message.busId;
                if (message.userId != null && message.hasOwnProperty("userId"))
                    object.userId = $root.google.protobuf.Int32Value.toObject(message.userId, options);
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (typeof message.deviceId === "number")
                        object.deviceId = options.longs === String ? String(message.deviceId) : message.deviceId;
                    else
                        object.deviceId = options.longs === String ? $util.Long.prototype.toString.call(message.deviceId) : options.longs === Number ? new $util.LongBits(message.deviceId.low >>> 0, message.deviceId.high >>> 0).toNumber() : message.deviceId;
                return object;
            };

            /**
             * Converts this ObsoleteUpdateEventBusDeviceConnected to JSON.
             * @function toJSON
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceConnected
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ObsoleteUpdateEventBusDeviceConnected.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ObsoleteUpdateEventBusDeviceConnected;
        })();

        ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected = (function() {

            /**
             * Properties of an ObsoleteUpdateEventBusDeviceDisconnected.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @interface IObsoleteUpdateEventBusDeviceDisconnected
             * @property {string|null} [busId] ObsoleteUpdateEventBusDeviceDisconnected busId
             * @property {google.protobuf.IInt32Value|null} [userId] ObsoleteUpdateEventBusDeviceDisconnected userId
             * @property {number|Long|null} [deviceId] ObsoleteUpdateEventBusDeviceDisconnected deviceId
             */

            /**
             * Constructs a new ObsoleteUpdateEventBusDeviceDisconnected.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @classdesc Represents an ObsoleteUpdateEventBusDeviceDisconnected.
             * @implements IObsoleteUpdateEventBusDeviceDisconnected
             * @constructor
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDeviceDisconnected=} [properties] Properties to set
             */
            function ObsoleteUpdateEventBusDeviceDisconnected(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ObsoleteUpdateEventBusDeviceDisconnected busId.
             * @member {string} busId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected
             * @instance
             */
            ObsoleteUpdateEventBusDeviceDisconnected.prototype.busId = "";

            /**
             * ObsoleteUpdateEventBusDeviceDisconnected userId.
             * @member {google.protobuf.IInt32Value|null|undefined} userId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected
             * @instance
             */
            ObsoleteUpdateEventBusDeviceDisconnected.prototype.userId = null;

            /**
             * ObsoleteUpdateEventBusDeviceDisconnected deviceId.
             * @member {number|Long} deviceId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected
             * @instance
             */
            ObsoleteUpdateEventBusDeviceDisconnected.prototype.deviceId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new ObsoleteUpdateEventBusDeviceDisconnected instance using the specified properties.
             * @function create
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDeviceDisconnected=} [properties] Properties to set
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected} ObsoleteUpdateEventBusDeviceDisconnected instance
             */
            ObsoleteUpdateEventBusDeviceDisconnected.create = function create(properties) {
                return new ObsoleteUpdateEventBusDeviceDisconnected(properties);
            };

            /**
             * Encodes the specified ObsoleteUpdateEventBusDeviceDisconnected message. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected.verify|verify} messages.
             * @function encode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDeviceDisconnected} message ObsoleteUpdateEventBusDeviceDisconnected message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateEventBusDeviceDisconnected.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.busId != null && message.hasOwnProperty("busId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.busId);
                if (message.userId != null && message.hasOwnProperty("userId"))
                    $root.google.protobuf.Int32Value.encode(message.userId, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.deviceId);
                return writer;
            };

            /**
             * Encodes the specified ObsoleteUpdateEventBusDeviceDisconnected message, length delimited. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDeviceDisconnected} message ObsoleteUpdateEventBusDeviceDisconnected message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateEventBusDeviceDisconnected.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ObsoleteUpdateEventBusDeviceDisconnected message from the specified reader or buffer.
             * @function decode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected} ObsoleteUpdateEventBusDeviceDisconnected
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateEventBusDeviceDisconnected.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.busId = reader.string();
                        break;
                    case 2:
                        message.userId = $root.google.protobuf.Int32Value.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.deviceId = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ObsoleteUpdateEventBusDeviceDisconnected message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected} ObsoleteUpdateEventBusDeviceDisconnected
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateEventBusDeviceDisconnected.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ObsoleteUpdateEventBusDeviceDisconnected message.
             * @function verify
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ObsoleteUpdateEventBusDeviceDisconnected.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.busId != null && message.hasOwnProperty("busId"))
                    if (!$util.isString(message.busId))
                        return "busId: string expected";
                if (message.userId != null && message.hasOwnProperty("userId")) {
                    let error = $root.google.protobuf.Int32Value.verify(message.userId);
                    if (error)
                        return "userId." + error;
                }
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (!$util.isInteger(message.deviceId) && !(message.deviceId && $util.isInteger(message.deviceId.low) && $util.isInteger(message.deviceId.high)))
                        return "deviceId: integer|Long expected";
                return null;
            };

            /**
             * Creates an ObsoleteUpdateEventBusDeviceDisconnected message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected} ObsoleteUpdateEventBusDeviceDisconnected
             */
            ObsoleteUpdateEventBusDeviceDisconnected.fromObject = function fromObject(object) {
                if (object instanceof $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected)
                    return object;
                let message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected();
                if (object.busId != null)
                    message.busId = String(object.busId);
                if (object.userId != null) {
                    if (typeof object.userId !== "object")
                        throw TypeError(".dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected.userId: object expected");
                    message.userId = $root.google.protobuf.Int32Value.fromObject(object.userId);
                }
                if (object.deviceId != null)
                    if ($util.Long)
                        (message.deviceId = $util.Long.fromValue(object.deviceId)).unsigned = false;
                    else if (typeof object.deviceId === "string")
                        message.deviceId = parseInt(object.deviceId, 10);
                    else if (typeof object.deviceId === "number")
                        message.deviceId = object.deviceId;
                    else if (typeof object.deviceId === "object")
                        message.deviceId = new $util.LongBits(object.deviceId.low >>> 0, object.deviceId.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from an ObsoleteUpdateEventBusDeviceDisconnected message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected} message ObsoleteUpdateEventBusDeviceDisconnected
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ObsoleteUpdateEventBusDeviceDisconnected.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.busId = "";
                    object.userId = null;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.deviceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.deviceId = options.longs === String ? "0" : 0;
                }
                if (message.busId != null && message.hasOwnProperty("busId"))
                    object.busId = message.busId;
                if (message.userId != null && message.hasOwnProperty("userId"))
                    object.userId = $root.google.protobuf.Int32Value.toObject(message.userId, options);
                if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                    if (typeof message.deviceId === "number")
                        object.deviceId = options.longs === String ? String(message.deviceId) : message.deviceId;
                    else
                        object.deviceId = options.longs === String ? $util.Long.prototype.toString.call(message.deviceId) : options.longs === Number ? new $util.LongBits(message.deviceId.low >>> 0, message.deviceId.high >>> 0).toNumber() : message.deviceId;
                return object;
            };

            /**
             * Converts this ObsoleteUpdateEventBusDeviceDisconnected to JSON.
             * @function toJSON
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDeviceDisconnected
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ObsoleteUpdateEventBusDeviceDisconnected.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ObsoleteUpdateEventBusDeviceDisconnected;
        })();

        ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed = (function() {

            /**
             * Properties of an ObsoleteUpdateEventBusDisposed.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @interface IObsoleteUpdateEventBusDisposed
             * @property {string|null} [busId] ObsoleteUpdateEventBusDisposed busId
             */

            /**
             * Constructs a new ObsoleteUpdateEventBusDisposed.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @classdesc Represents an ObsoleteUpdateEventBusDisposed.
             * @implements IObsoleteUpdateEventBusDisposed
             * @constructor
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDisposed=} [properties] Properties to set
             */
            function ObsoleteUpdateEventBusDisposed(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ObsoleteUpdateEventBusDisposed busId.
             * @member {string} busId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed
             * @instance
             */
            ObsoleteUpdateEventBusDisposed.prototype.busId = "";

            /**
             * Creates a new ObsoleteUpdateEventBusDisposed instance using the specified properties.
             * @function create
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDisposed=} [properties] Properties to set
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed} ObsoleteUpdateEventBusDisposed instance
             */
            ObsoleteUpdateEventBusDisposed.create = function create(properties) {
                return new ObsoleteUpdateEventBusDisposed(properties);
            };

            /**
             * Encodes the specified ObsoleteUpdateEventBusDisposed message. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed.verify|verify} messages.
             * @function encode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDisposed} message ObsoleteUpdateEventBusDisposed message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateEventBusDisposed.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.busId != null && message.hasOwnProperty("busId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.busId);
                return writer;
            };

            /**
             * Encodes the specified ObsoleteUpdateEventBusDisposed message, length delimited. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateEventBusDisposed} message ObsoleteUpdateEventBusDisposed message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateEventBusDisposed.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ObsoleteUpdateEventBusDisposed message from the specified reader or buffer.
             * @function decode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed} ObsoleteUpdateEventBusDisposed
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateEventBusDisposed.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.busId = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ObsoleteUpdateEventBusDisposed message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed} ObsoleteUpdateEventBusDisposed
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateEventBusDisposed.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ObsoleteUpdateEventBusDisposed message.
             * @function verify
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ObsoleteUpdateEventBusDisposed.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.busId != null && message.hasOwnProperty("busId"))
                    if (!$util.isString(message.busId))
                        return "busId: string expected";
                return null;
            };

            /**
             * Creates an ObsoleteUpdateEventBusDisposed message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed} ObsoleteUpdateEventBusDisposed
             */
            ObsoleteUpdateEventBusDisposed.fromObject = function fromObject(object) {
                if (object instanceof $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed)
                    return object;
                let message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed();
                if (object.busId != null)
                    message.busId = String(object.busId);
                return message;
            };

            /**
             * Creates a plain object from an ObsoleteUpdateEventBusDisposed message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed} message ObsoleteUpdateEventBusDisposed
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ObsoleteUpdateEventBusDisposed.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.busId = "";
                if (message.busId != null && message.hasOwnProperty("busId"))
                    object.busId = message.busId;
                return object;
            };

            /**
             * Converts this ObsoleteUpdateEventBusDisposed to JSON.
             * @function toJSON
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateEventBusDisposed
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ObsoleteUpdateEventBusDisposed.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ObsoleteUpdateEventBusDisposed;
        })();

        ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall = (function() {

            /**
             * Properties of an ObsoleteUpdateIncomingCall.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @interface IObsoleteUpdateIncomingCall
             * @property {number|Long|null} [callId] ObsoleteUpdateIncomingCall callId
             * @property {string|null} [busId] ObsoleteUpdateIncomingCall busId
             * @property {dialog.IObsoletePeer|null} [peer] ObsoleteUpdateIncomingCall peer
             * @property {google.protobuf.IStringValue|null} [displayName] ObsoleteUpdateIncomingCall displayName
             * @property {google.protobuf.IInt32Value|null} [attemptIndex] ObsoleteUpdateIncomingCall attemptIndex
             * @property {dialog.IObsoleteOutPeer|null} [outPeer] ObsoleteUpdateIncomingCall outPeer
             */

            /**
             * Constructs a new ObsoleteUpdateIncomingCall.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @classdesc Represents an ObsoleteUpdateIncomingCall.
             * @implements IObsoleteUpdateIncomingCall
             * @constructor
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateIncomingCall=} [properties] Properties to set
             */
            function ObsoleteUpdateIncomingCall(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ObsoleteUpdateIncomingCall callId.
             * @member {number|Long} callId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall
             * @instance
             */
            ObsoleteUpdateIncomingCall.prototype.callId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ObsoleteUpdateIncomingCall busId.
             * @member {string} busId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall
             * @instance
             */
            ObsoleteUpdateIncomingCall.prototype.busId = "";

            /**
             * ObsoleteUpdateIncomingCall peer.
             * @member {dialog.IObsoletePeer|null|undefined} peer
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall
             * @instance
             */
            ObsoleteUpdateIncomingCall.prototype.peer = null;

            /**
             * ObsoleteUpdateIncomingCall displayName.
             * @member {google.protobuf.IStringValue|null|undefined} displayName
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall
             * @instance
             */
            ObsoleteUpdateIncomingCall.prototype.displayName = null;

            /**
             * ObsoleteUpdateIncomingCall attemptIndex.
             * @member {google.protobuf.IInt32Value|null|undefined} attemptIndex
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall
             * @instance
             */
            ObsoleteUpdateIncomingCall.prototype.attemptIndex = null;

            /**
             * ObsoleteUpdateIncomingCall outPeer.
             * @member {dialog.IObsoleteOutPeer|null|undefined} outPeer
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall
             * @instance
             */
            ObsoleteUpdateIncomingCall.prototype.outPeer = null;

            /**
             * Creates a new ObsoleteUpdateIncomingCall instance using the specified properties.
             * @function create
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateIncomingCall=} [properties] Properties to set
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall} ObsoleteUpdateIncomingCall instance
             */
            ObsoleteUpdateIncomingCall.create = function create(properties) {
                return new ObsoleteUpdateIncomingCall(properties);
            };

            /**
             * Encodes the specified ObsoleteUpdateIncomingCall message. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall.verify|verify} messages.
             * @function encode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateIncomingCall} message ObsoleteUpdateIncomingCall message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateIncomingCall.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.callId != null && message.hasOwnProperty("callId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.callId);
                if (message.busId != null && message.hasOwnProperty("busId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.busId);
                if (message.peer != null && message.hasOwnProperty("peer"))
                    $root.dialog.ObsoletePeer.encode(message.peer, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.displayName != null && message.hasOwnProperty("displayName"))
                    $root.google.protobuf.StringValue.encode(message.displayName, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.attemptIndex != null && message.hasOwnProperty("attemptIndex"))
                    $root.google.protobuf.Int32Value.encode(message.attemptIndex, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.outPeer != null && message.hasOwnProperty("outPeer"))
                    $root.dialog.ObsoleteOutPeer.encode(message.outPeer, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ObsoleteUpdateIncomingCall message, length delimited. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateIncomingCall} message ObsoleteUpdateIncomingCall message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateIncomingCall.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ObsoleteUpdateIncomingCall message from the specified reader or buffer.
             * @function decode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall} ObsoleteUpdateIncomingCall
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateIncomingCall.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.callId = reader.int64();
                        break;
                    case 2:
                        message.busId = reader.string();
                        break;
                    case 3:
                        message.peer = $root.dialog.ObsoletePeer.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.displayName = $root.google.protobuf.StringValue.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.attemptIndex = $root.google.protobuf.Int32Value.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.outPeer = $root.dialog.ObsoleteOutPeer.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ObsoleteUpdateIncomingCall message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall} ObsoleteUpdateIncomingCall
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateIncomingCall.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ObsoleteUpdateIncomingCall message.
             * @function verify
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ObsoleteUpdateIncomingCall.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.callId != null && message.hasOwnProperty("callId"))
                    if (!$util.isInteger(message.callId) && !(message.callId && $util.isInteger(message.callId.low) && $util.isInteger(message.callId.high)))
                        return "callId: integer|Long expected";
                if (message.busId != null && message.hasOwnProperty("busId"))
                    if (!$util.isString(message.busId))
                        return "busId: string expected";
                if (message.peer != null && message.hasOwnProperty("peer")) {
                    let error = $root.dialog.ObsoletePeer.verify(message.peer);
                    if (error)
                        return "peer." + error;
                }
                if (message.displayName != null && message.hasOwnProperty("displayName")) {
                    let error = $root.google.protobuf.StringValue.verify(message.displayName);
                    if (error)
                        return "displayName." + error;
                }
                if (message.attemptIndex != null && message.hasOwnProperty("attemptIndex")) {
                    let error = $root.google.protobuf.Int32Value.verify(message.attemptIndex);
                    if (error)
                        return "attemptIndex." + error;
                }
                if (message.outPeer != null && message.hasOwnProperty("outPeer")) {
                    let error = $root.dialog.ObsoleteOutPeer.verify(message.outPeer);
                    if (error)
                        return "outPeer." + error;
                }
                return null;
            };

            /**
             * Creates an ObsoleteUpdateIncomingCall message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall} ObsoleteUpdateIncomingCall
             */
            ObsoleteUpdateIncomingCall.fromObject = function fromObject(object) {
                if (object instanceof $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall)
                    return object;
                let message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall();
                if (object.callId != null)
                    if ($util.Long)
                        (message.callId = $util.Long.fromValue(object.callId)).unsigned = false;
                    else if (typeof object.callId === "string")
                        message.callId = parseInt(object.callId, 10);
                    else if (typeof object.callId === "number")
                        message.callId = object.callId;
                    else if (typeof object.callId === "object")
                        message.callId = new $util.LongBits(object.callId.low >>> 0, object.callId.high >>> 0).toNumber();
                if (object.busId != null)
                    message.busId = String(object.busId);
                if (object.peer != null) {
                    if (typeof object.peer !== "object")
                        throw TypeError(".dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall.peer: object expected");
                    message.peer = $root.dialog.ObsoletePeer.fromObject(object.peer);
                }
                if (object.displayName != null) {
                    if (typeof object.displayName !== "object")
                        throw TypeError(".dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall.displayName: object expected");
                    message.displayName = $root.google.protobuf.StringValue.fromObject(object.displayName);
                }
                if (object.attemptIndex != null) {
                    if (typeof object.attemptIndex !== "object")
                        throw TypeError(".dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall.attemptIndex: object expected");
                    message.attemptIndex = $root.google.protobuf.Int32Value.fromObject(object.attemptIndex);
                }
                if (object.outPeer != null) {
                    if (typeof object.outPeer !== "object")
                        throw TypeError(".dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall.outPeer: object expected");
                    message.outPeer = $root.dialog.ObsoleteOutPeer.fromObject(object.outPeer);
                }
                return message;
            };

            /**
             * Creates a plain object from an ObsoleteUpdateIncomingCall message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall} message ObsoleteUpdateIncomingCall
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ObsoleteUpdateIncomingCall.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.callId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.callId = options.longs === String ? "0" : 0;
                    object.busId = "";
                    object.peer = null;
                    object.displayName = null;
                    object.attemptIndex = null;
                    object.outPeer = null;
                }
                if (message.callId != null && message.hasOwnProperty("callId"))
                    if (typeof message.callId === "number")
                        object.callId = options.longs === String ? String(message.callId) : message.callId;
                    else
                        object.callId = options.longs === String ? $util.Long.prototype.toString.call(message.callId) : options.longs === Number ? new $util.LongBits(message.callId.low >>> 0, message.callId.high >>> 0).toNumber() : message.callId;
                if (message.busId != null && message.hasOwnProperty("busId"))
                    object.busId = message.busId;
                if (message.peer != null && message.hasOwnProperty("peer"))
                    object.peer = $root.dialog.ObsoletePeer.toObject(message.peer, options);
                if (message.displayName != null && message.hasOwnProperty("displayName"))
                    object.displayName = $root.google.protobuf.StringValue.toObject(message.displayName, options);
                if (message.attemptIndex != null && message.hasOwnProperty("attemptIndex"))
                    object.attemptIndex = $root.google.protobuf.Int32Value.toObject(message.attemptIndex, options);
                if (message.outPeer != null && message.hasOwnProperty("outPeer"))
                    object.outPeer = $root.dialog.ObsoleteOutPeer.toObject(message.outPeer, options);
                return object;
            };

            /**
             * Converts this ObsoleteUpdateIncomingCall to JSON.
             * @function toJSON
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateIncomingCall
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ObsoleteUpdateIncomingCall.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ObsoleteUpdateIncomingCall;
        })();

        ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled = (function() {

            /**
             * Properties of an ObsoleteUpdateCallHandled.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @interface IObsoleteUpdateCallHandled
             * @property {number|Long|null} [callId] ObsoleteUpdateCallHandled callId
             * @property {google.protobuf.IInt32Value|null} [attemptIndex] ObsoleteUpdateCallHandled attemptIndex
             */

            /**
             * Constructs a new ObsoleteUpdateCallHandled.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @classdesc Represents an ObsoleteUpdateCallHandled.
             * @implements IObsoleteUpdateCallHandled
             * @constructor
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateCallHandled=} [properties] Properties to set
             */
            function ObsoleteUpdateCallHandled(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ObsoleteUpdateCallHandled callId.
             * @member {number|Long} callId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled
             * @instance
             */
            ObsoleteUpdateCallHandled.prototype.callId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ObsoleteUpdateCallHandled attemptIndex.
             * @member {google.protobuf.IInt32Value|null|undefined} attemptIndex
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled
             * @instance
             */
            ObsoleteUpdateCallHandled.prototype.attemptIndex = null;

            /**
             * Creates a new ObsoleteUpdateCallHandled instance using the specified properties.
             * @function create
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateCallHandled=} [properties] Properties to set
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled} ObsoleteUpdateCallHandled instance
             */
            ObsoleteUpdateCallHandled.create = function create(properties) {
                return new ObsoleteUpdateCallHandled(properties);
            };

            /**
             * Encodes the specified ObsoleteUpdateCallHandled message. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled.verify|verify} messages.
             * @function encode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateCallHandled} message ObsoleteUpdateCallHandled message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateCallHandled.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.callId != null && message.hasOwnProperty("callId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.callId);
                if (message.attemptIndex != null && message.hasOwnProperty("attemptIndex"))
                    $root.google.protobuf.Int32Value.encode(message.attemptIndex, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ObsoleteUpdateCallHandled message, length delimited. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateCallHandled} message ObsoleteUpdateCallHandled message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateCallHandled.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ObsoleteUpdateCallHandled message from the specified reader or buffer.
             * @function decode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled} ObsoleteUpdateCallHandled
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateCallHandled.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.callId = reader.int64();
                        break;
                    case 2:
                        message.attemptIndex = $root.google.protobuf.Int32Value.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ObsoleteUpdateCallHandled message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled} ObsoleteUpdateCallHandled
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateCallHandled.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ObsoleteUpdateCallHandled message.
             * @function verify
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ObsoleteUpdateCallHandled.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.callId != null && message.hasOwnProperty("callId"))
                    if (!$util.isInteger(message.callId) && !(message.callId && $util.isInteger(message.callId.low) && $util.isInteger(message.callId.high)))
                        return "callId: integer|Long expected";
                if (message.attemptIndex != null && message.hasOwnProperty("attemptIndex")) {
                    let error = $root.google.protobuf.Int32Value.verify(message.attemptIndex);
                    if (error)
                        return "attemptIndex." + error;
                }
                return null;
            };

            /**
             * Creates an ObsoleteUpdateCallHandled message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled} ObsoleteUpdateCallHandled
             */
            ObsoleteUpdateCallHandled.fromObject = function fromObject(object) {
                if (object instanceof $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled)
                    return object;
                let message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled();
                if (object.callId != null)
                    if ($util.Long)
                        (message.callId = $util.Long.fromValue(object.callId)).unsigned = false;
                    else if (typeof object.callId === "string")
                        message.callId = parseInt(object.callId, 10);
                    else if (typeof object.callId === "number")
                        message.callId = object.callId;
                    else if (typeof object.callId === "object")
                        message.callId = new $util.LongBits(object.callId.low >>> 0, object.callId.high >>> 0).toNumber();
                if (object.attemptIndex != null) {
                    if (typeof object.attemptIndex !== "object")
                        throw TypeError(".dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled.attemptIndex: object expected");
                    message.attemptIndex = $root.google.protobuf.Int32Value.fromObject(object.attemptIndex);
                }
                return message;
            };

            /**
             * Creates a plain object from an ObsoleteUpdateCallHandled message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled} message ObsoleteUpdateCallHandled
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ObsoleteUpdateCallHandled.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.callId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.callId = options.longs === String ? "0" : 0;
                    object.attemptIndex = null;
                }
                if (message.callId != null && message.hasOwnProperty("callId"))
                    if (typeof message.callId === "number")
                        object.callId = options.longs === String ? String(message.callId) : message.callId;
                    else
                        object.callId = options.longs === String ? $util.Long.prototype.toString.call(message.callId) : options.longs === Number ? new $util.LongBits(message.callId.low >>> 0, message.callId.high >>> 0).toNumber() : message.callId;
                if (message.attemptIndex != null && message.hasOwnProperty("attemptIndex"))
                    object.attemptIndex = $root.google.protobuf.Int32Value.toObject(message.attemptIndex, options);
                return object;
            };

            /**
             * Converts this ObsoleteUpdateCallHandled to JSON.
             * @function toJSON
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallHandled
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ObsoleteUpdateCallHandled.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ObsoleteUpdateCallHandled;
        })();

        ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed = (function() {

            /**
             * Properties of an ObsoleteUpdateCallDisposed.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @interface IObsoleteUpdateCallDisposed
             * @property {number|Long|null} [callId] ObsoleteUpdateCallDisposed callId
             * @property {google.protobuf.IInt32Value|null} [attemptIndex] ObsoleteUpdateCallDisposed attemptIndex
             * @property {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed.ObsoleteDisposalReason|null} [reason] ObsoleteUpdateCallDisposed reason
             */

            /**
             * Constructs a new ObsoleteUpdateCallDisposed.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @classdesc Represents an ObsoleteUpdateCallDisposed.
             * @implements IObsoleteUpdateCallDisposed
             * @constructor
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateCallDisposed=} [properties] Properties to set
             */
            function ObsoleteUpdateCallDisposed(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ObsoleteUpdateCallDisposed callId.
             * @member {number|Long} callId
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed
             * @instance
             */
            ObsoleteUpdateCallDisposed.prototype.callId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ObsoleteUpdateCallDisposed attemptIndex.
             * @member {google.protobuf.IInt32Value|null|undefined} attemptIndex
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed
             * @instance
             */
            ObsoleteUpdateCallDisposed.prototype.attemptIndex = null;

            /**
             * ObsoleteUpdateCallDisposed reason.
             * @member {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed.ObsoleteDisposalReason} reason
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed
             * @instance
             */
            ObsoleteUpdateCallDisposed.prototype.reason = 0;

            /**
             * Creates a new ObsoleteUpdateCallDisposed instance using the specified properties.
             * @function create
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateCallDisposed=} [properties] Properties to set
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed} ObsoleteUpdateCallDisposed instance
             */
            ObsoleteUpdateCallDisposed.create = function create(properties) {
                return new ObsoleteUpdateCallDisposed(properties);
            };

            /**
             * Encodes the specified ObsoleteUpdateCallDisposed message. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed.verify|verify} messages.
             * @function encode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateCallDisposed} message ObsoleteUpdateCallDisposed message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateCallDisposed.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.callId != null && message.hasOwnProperty("callId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.callId);
                if (message.attemptIndex != null && message.hasOwnProperty("attemptIndex"))
                    $root.google.protobuf.Int32Value.encode(message.attemptIndex, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.reason != null && message.hasOwnProperty("reason"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.reason);
                return writer;
            };

            /**
             * Encodes the specified ObsoleteUpdateCallDisposed message, length delimited. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateCallDisposed} message ObsoleteUpdateCallDisposed message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateCallDisposed.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ObsoleteUpdateCallDisposed message from the specified reader or buffer.
             * @function decode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed} ObsoleteUpdateCallDisposed
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateCallDisposed.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.callId = reader.int64();
                        break;
                    case 2:
                        message.attemptIndex = $root.google.protobuf.Int32Value.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.reason = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ObsoleteUpdateCallDisposed message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed} ObsoleteUpdateCallDisposed
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateCallDisposed.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ObsoleteUpdateCallDisposed message.
             * @function verify
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ObsoleteUpdateCallDisposed.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.callId != null && message.hasOwnProperty("callId"))
                    if (!$util.isInteger(message.callId) && !(message.callId && $util.isInteger(message.callId.low) && $util.isInteger(message.callId.high)))
                        return "callId: integer|Long expected";
                if (message.attemptIndex != null && message.hasOwnProperty("attemptIndex")) {
                    let error = $root.google.protobuf.Int32Value.verify(message.attemptIndex);
                    if (error)
                        return "attemptIndex." + error;
                }
                if (message.reason != null && message.hasOwnProperty("reason"))
                    switch (message.reason) {
                    default:
                        return "reason: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                return null;
            };

            /**
             * Creates an ObsoleteUpdateCallDisposed message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed} ObsoleteUpdateCallDisposed
             */
            ObsoleteUpdateCallDisposed.fromObject = function fromObject(object) {
                if (object instanceof $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed)
                    return object;
                let message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed();
                if (object.callId != null)
                    if ($util.Long)
                        (message.callId = $util.Long.fromValue(object.callId)).unsigned = false;
                    else if (typeof object.callId === "string")
                        message.callId = parseInt(object.callId, 10);
                    else if (typeof object.callId === "number")
                        message.callId = object.callId;
                    else if (typeof object.callId === "object")
                        message.callId = new $util.LongBits(object.callId.low >>> 0, object.callId.high >>> 0).toNumber();
                if (object.attemptIndex != null) {
                    if (typeof object.attemptIndex !== "object")
                        throw TypeError(".dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed.attemptIndex: object expected");
                    message.attemptIndex = $root.google.protobuf.Int32Value.fromObject(object.attemptIndex);
                }
                switch (object.reason) {
                case "OBSOLETE_DISPOSAL_REASON_UNKNOWN":
                case 0:
                    message.reason = 0;
                    break;
                case "OBSOLETE_DISPOSAL_REASON_REJECTED":
                case 1:
                    message.reason = 1;
                    break;
                case "OBSOLETE_DISPOSAL_REASON_BUSY":
                case 2:
                    message.reason = 2;
                    break;
                case "OBSOLETE_DISPOSAL_REASON_ENDED":
                case 3:
                    message.reason = 3;
                    break;
                case "OBSOLETE_DISPOSAL_REASON_ANSWER_TIMEOUT":
                case 4:
                    message.reason = 4;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from an ObsoleteUpdateCallDisposed message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed} message ObsoleteUpdateCallDisposed
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ObsoleteUpdateCallDisposed.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.callId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.callId = options.longs === String ? "0" : 0;
                    object.attemptIndex = null;
                    object.reason = options.enums === String ? "OBSOLETE_DISPOSAL_REASON_UNKNOWN" : 0;
                }
                if (message.callId != null && message.hasOwnProperty("callId"))
                    if (typeof message.callId === "number")
                        object.callId = options.longs === String ? String(message.callId) : message.callId;
                    else
                        object.callId = options.longs === String ? $util.Long.prototype.toString.call(message.callId) : options.longs === Number ? new $util.LongBits(message.callId.low >>> 0, message.callId.high >>> 0).toNumber() : message.callId;
                if (message.attemptIndex != null && message.hasOwnProperty("attemptIndex"))
                    object.attemptIndex = $root.google.protobuf.Int32Value.toObject(message.attemptIndex, options);
                if (message.reason != null && message.hasOwnProperty("reason"))
                    object.reason = options.enums === String ? $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed.ObsoleteDisposalReason[message.reason] : message.reason;
                return object;
            };

            /**
             * Converts this ObsoleteUpdateCallDisposed to JSON.
             * @function toJSON
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ObsoleteUpdateCallDisposed.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * ObsoleteDisposalReason enum.
             * @name dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateCallDisposed.ObsoleteDisposalReason
             * @enum {string}
             * @property {number} OBSOLETE_DISPOSAL_REASON_UNKNOWN=0 OBSOLETE_DISPOSAL_REASON_UNKNOWN value
             * @property {number} OBSOLETE_DISPOSAL_REASON_REJECTED=1 OBSOLETE_DISPOSAL_REASON_REJECTED value
             * @property {number} OBSOLETE_DISPOSAL_REASON_BUSY=2 OBSOLETE_DISPOSAL_REASON_BUSY value
             * @property {number} OBSOLETE_DISPOSAL_REASON_ENDED=3 OBSOLETE_DISPOSAL_REASON_ENDED value
             * @property {number} OBSOLETE_DISPOSAL_REASON_ANSWER_TIMEOUT=4 OBSOLETE_DISPOSAL_REASON_ANSWER_TIMEOUT value
             */
            ObsoleteUpdateCallDisposed.ObsoleteDisposalReason = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "OBSOLETE_DISPOSAL_REASON_UNKNOWN"] = 0;
                values[valuesById[1] = "OBSOLETE_DISPOSAL_REASON_REJECTED"] = 1;
                values[valuesById[2] = "OBSOLETE_DISPOSAL_REASON_BUSY"] = 2;
                values[valuesById[3] = "OBSOLETE_DISPOSAL_REASON_ENDED"] = 3;
                values[valuesById[4] = "OBSOLETE_DISPOSAL_REASON_ANSWER_TIMEOUT"] = 4;
                return values;
            })();

            return ObsoleteUpdateCallDisposed;
        })();

        ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState = (function() {

            /**
             * Properties of an ObsoleteUpdateForceReloadState.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @interface IObsoleteUpdateForceReloadState
             * @property {Array.<dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.IObsoleteForceReloadField>|null} [fields] ObsoleteUpdateForceReloadState fields
             */

            /**
             * Constructs a new ObsoleteUpdateForceReloadState.
             * @memberof dialog.ObsoleteWeakUpdateBox
             * @classdesc Represents an ObsoleteUpdateForceReloadState.
             * @implements IObsoleteUpdateForceReloadState
             * @constructor
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateForceReloadState=} [properties] Properties to set
             */
            function ObsoleteUpdateForceReloadState(properties) {
                this.fields = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ObsoleteUpdateForceReloadState fields.
             * @member {Array.<dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.IObsoleteForceReloadField>} fields
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState
             * @instance
             */
            ObsoleteUpdateForceReloadState.prototype.fields = $util.emptyArray;

            /**
             * Creates a new ObsoleteUpdateForceReloadState instance using the specified properties.
             * @function create
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateForceReloadState=} [properties] Properties to set
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState} ObsoleteUpdateForceReloadState instance
             */
            ObsoleteUpdateForceReloadState.create = function create(properties) {
                return new ObsoleteUpdateForceReloadState(properties);
            };

            /**
             * Encodes the specified ObsoleteUpdateForceReloadState message. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.verify|verify} messages.
             * @function encode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateForceReloadState} message ObsoleteUpdateForceReloadState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateForceReloadState.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.fields != null && message.fields.length)
                    for (let i = 0; i < message.fields.length; ++i)
                        $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField.encode(message.fields[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ObsoleteUpdateForceReloadState message, length delimited. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.IObsoleteUpdateForceReloadState} message ObsoleteUpdateForceReloadState message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteUpdateForceReloadState.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ObsoleteUpdateForceReloadState message from the specified reader or buffer.
             * @function decode
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState} ObsoleteUpdateForceReloadState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateForceReloadState.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.fields && message.fields.length))
                            message.fields = [];
                        message.fields.push($root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ObsoleteUpdateForceReloadState message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState} ObsoleteUpdateForceReloadState
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteUpdateForceReloadState.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ObsoleteUpdateForceReloadState message.
             * @function verify
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ObsoleteUpdateForceReloadState.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.fields != null && message.hasOwnProperty("fields")) {
                    if (!Array.isArray(message.fields))
                        return "fields: array expected";
                    for (let i = 0; i < message.fields.length; ++i) {
                        let error = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField.verify(message.fields[i]);
                        if (error)
                            return "fields." + error;
                    }
                }
                return null;
            };

            /**
             * Creates an ObsoleteUpdateForceReloadState message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState} ObsoleteUpdateForceReloadState
             */
            ObsoleteUpdateForceReloadState.fromObject = function fromObject(object) {
                if (object instanceof $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState)
                    return object;
                let message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState();
                if (object.fields) {
                    if (!Array.isArray(object.fields))
                        throw TypeError(".dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.fields: array expected");
                    message.fields = [];
                    for (let i = 0; i < object.fields.length; ++i) {
                        if (typeof object.fields[i] !== "object")
                            throw TypeError(".dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.fields: object expected");
                        message.fields[i] = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField.fromObject(object.fields[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from an ObsoleteUpdateForceReloadState message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState
             * @static
             * @param {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState} message ObsoleteUpdateForceReloadState
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ObsoleteUpdateForceReloadState.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.fields = [];
                if (message.fields && message.fields.length) {
                    object.fields = [];
                    for (let j = 0; j < message.fields.length; ++j)
                        object.fields[j] = $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField.toObject(message.fields[j], options);
                }
                return object;
            };

            /**
             * Converts this ObsoleteUpdateForceReloadState to JSON.
             * @function toJSON
             * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ObsoleteUpdateForceReloadState.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            ObsoleteUpdateForceReloadState.ObsoleteForceReloadField = (function() {

                /**
                 * Properties of an ObsoleteForceReloadField.
                 * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState
                 * @interface IObsoleteForceReloadField
                 * @property {google.protobuf.IEmpty|null} [reloadDialogs] ObsoleteForceReloadField reloadDialogs
                 * @property {google.protobuf.IEmpty|null} [reloadContacts] ObsoleteForceReloadField reloadContacts
                 * @property {dialog.IObsoletePeersList|null} [reloadHistory] ObsoleteForceReloadField reloadHistory
                 */

                /**
                 * Constructs a new ObsoleteForceReloadField.
                 * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState
                 * @classdesc Represents an ObsoleteForceReloadField.
                 * @implements IObsoleteForceReloadField
                 * @constructor
                 * @param {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.IObsoleteForceReloadField=} [properties] Properties to set
                 */
                function ObsoleteForceReloadField(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ObsoleteForceReloadField reloadDialogs.
                 * @member {google.protobuf.IEmpty|null|undefined} reloadDialogs
                 * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField
                 * @instance
                 */
                ObsoleteForceReloadField.prototype.reloadDialogs = null;

                /**
                 * ObsoleteForceReloadField reloadContacts.
                 * @member {google.protobuf.IEmpty|null|undefined} reloadContacts
                 * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField
                 * @instance
                 */
                ObsoleteForceReloadField.prototype.reloadContacts = null;

                /**
                 * ObsoleteForceReloadField reloadHistory.
                 * @member {dialog.IObsoletePeersList|null|undefined} reloadHistory
                 * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField
                 * @instance
                 */
                ObsoleteForceReloadField.prototype.reloadHistory = null;

                // OneOf field names bound to virtual getters and setters
                let $oneOfFields;

                /**
                 * ObsoleteForceReloadField field.
                 * @member {"reloadDialogs"|"reloadContacts"|"reloadHistory"|undefined} field
                 * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField
                 * @instance
                 */
                Object.defineProperty(ObsoleteForceReloadField.prototype, "field", {
                    get: $util.oneOfGetter($oneOfFields = ["reloadDialogs", "reloadContacts", "reloadHistory"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new ObsoleteForceReloadField instance using the specified properties.
                 * @function create
                 * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField
                 * @static
                 * @param {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.IObsoleteForceReloadField=} [properties] Properties to set
                 * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField} ObsoleteForceReloadField instance
                 */
                ObsoleteForceReloadField.create = function create(properties) {
                    return new ObsoleteForceReloadField(properties);
                };

                /**
                 * Encodes the specified ObsoleteForceReloadField message. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField.verify|verify} messages.
                 * @function encode
                 * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField
                 * @static
                 * @param {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.IObsoleteForceReloadField} message ObsoleteForceReloadField message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ObsoleteForceReloadField.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.reloadDialogs != null && message.hasOwnProperty("reloadDialogs"))
                        $root.google.protobuf.Empty.encode(message.reloadDialogs, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.reloadContacts != null && message.hasOwnProperty("reloadContacts"))
                        $root.google.protobuf.Empty.encode(message.reloadContacts, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.reloadHistory != null && message.hasOwnProperty("reloadHistory"))
                        $root.dialog.ObsoletePeersList.encode(message.reloadHistory, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ObsoleteForceReloadField message, length delimited. Does not implicitly {@link dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField
                 * @static
                 * @param {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.IObsoleteForceReloadField} message ObsoleteForceReloadField message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ObsoleteForceReloadField.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an ObsoleteForceReloadField message from the specified reader or buffer.
                 * @function decode
                 * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField} ObsoleteForceReloadField
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ObsoleteForceReloadField.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.reloadDialogs = $root.google.protobuf.Empty.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message.reloadContacts = $root.google.protobuf.Empty.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.reloadHistory = $root.dialog.ObsoletePeersList.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an ObsoleteForceReloadField message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField} ObsoleteForceReloadField
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ObsoleteForceReloadField.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an ObsoleteForceReloadField message.
                 * @function verify
                 * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ObsoleteForceReloadField.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    let properties = {};
                    if (message.reloadDialogs != null && message.hasOwnProperty("reloadDialogs")) {
                        properties.field = 1;
                        {
                            let error = $root.google.protobuf.Empty.verify(message.reloadDialogs);
                            if (error)
                                return "reloadDialogs." + error;
                        }
                    }
                    if (message.reloadContacts != null && message.hasOwnProperty("reloadContacts")) {
                        if (properties.field === 1)
                            return "field: multiple values";
                        properties.field = 1;
                        {
                            let error = $root.google.protobuf.Empty.verify(message.reloadContacts);
                            if (error)
                                return "reloadContacts." + error;
                        }
                    }
                    if (message.reloadHistory != null && message.hasOwnProperty("reloadHistory")) {
                        if (properties.field === 1)
                            return "field: multiple values";
                        properties.field = 1;
                        {
                            let error = $root.dialog.ObsoletePeersList.verify(message.reloadHistory);
                            if (error)
                                return "reloadHistory." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates an ObsoleteForceReloadField message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField} ObsoleteForceReloadField
                 */
                ObsoleteForceReloadField.fromObject = function fromObject(object) {
                    if (object instanceof $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField)
                        return object;
                    let message = new $root.dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField();
                    if (object.reloadDialogs != null) {
                        if (typeof object.reloadDialogs !== "object")
                            throw TypeError(".dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField.reloadDialogs: object expected");
                        message.reloadDialogs = $root.google.protobuf.Empty.fromObject(object.reloadDialogs);
                    }
                    if (object.reloadContacts != null) {
                        if (typeof object.reloadContacts !== "object")
                            throw TypeError(".dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField.reloadContacts: object expected");
                        message.reloadContacts = $root.google.protobuf.Empty.fromObject(object.reloadContacts);
                    }
                    if (object.reloadHistory != null) {
                        if (typeof object.reloadHistory !== "object")
                            throw TypeError(".dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField.reloadHistory: object expected");
                        message.reloadHistory = $root.dialog.ObsoletePeersList.fromObject(object.reloadHistory);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an ObsoleteForceReloadField message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField
                 * @static
                 * @param {dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField} message ObsoleteForceReloadField
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ObsoleteForceReloadField.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (message.reloadDialogs != null && message.hasOwnProperty("reloadDialogs")) {
                        object.reloadDialogs = $root.google.protobuf.Empty.toObject(message.reloadDialogs, options);
                        if (options.oneofs)
                            object.field = "reloadDialogs";
                    }
                    if (message.reloadContacts != null && message.hasOwnProperty("reloadContacts")) {
                        object.reloadContacts = $root.google.protobuf.Empty.toObject(message.reloadContacts, options);
                        if (options.oneofs)
                            object.field = "reloadContacts";
                    }
                    if (message.reloadHistory != null && message.hasOwnProperty("reloadHistory")) {
                        object.reloadHistory = $root.dialog.ObsoletePeersList.toObject(message.reloadHistory, options);
                        if (options.oneofs)
                            object.field = "reloadHistory";
                    }
                    return object;
                };

                /**
                 * Converts this ObsoleteForceReloadField to JSON.
                 * @function toJSON
                 * @memberof dialog.ObsoleteWeakUpdateBox.ObsoleteUpdateForceReloadState.ObsoleteForceReloadField
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ObsoleteForceReloadField.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return ObsoleteForceReloadField;
            })();

            return ObsoleteUpdateForceReloadState;
        })();

        return ObsoleteWeakUpdateBox;
    })();

    dialog.ObsoleteServiceUpdate = (function() {

        /**
         * Properties of an ObsoleteServiceUpdate.
         * @memberof dialog
         * @interface IObsoleteServiceUpdate
         * @property {google.protobuf.IBytesValue|null} [obsoleteUpdate] ObsoleteServiceUpdate obsoleteUpdate
         */

        /**
         * Constructs a new ObsoleteServiceUpdate.
         * @memberof dialog
         * @classdesc Represents an ObsoleteServiceUpdate.
         * @implements IObsoleteServiceUpdate
         * @constructor
         * @param {dialog.IObsoleteServiceUpdate=} [properties] Properties to set
         */
        function ObsoleteServiceUpdate(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ObsoleteServiceUpdate obsoleteUpdate.
         * @member {google.protobuf.IBytesValue|null|undefined} obsoleteUpdate
         * @memberof dialog.ObsoleteServiceUpdate
         * @instance
         */
        ObsoleteServiceUpdate.prototype.obsoleteUpdate = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * ObsoleteServiceUpdate update.
         * @member {"obsoleteUpdate"|undefined} update
         * @memberof dialog.ObsoleteServiceUpdate
         * @instance
         */
        Object.defineProperty(ObsoleteServiceUpdate.prototype, "update", {
            get: $util.oneOfGetter($oneOfFields = ["obsoleteUpdate"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ObsoleteServiceUpdate instance using the specified properties.
         * @function create
         * @memberof dialog.ObsoleteServiceUpdate
         * @static
         * @param {dialog.IObsoleteServiceUpdate=} [properties] Properties to set
         * @returns {dialog.ObsoleteServiceUpdate} ObsoleteServiceUpdate instance
         */
        ObsoleteServiceUpdate.create = function create(properties) {
            return new ObsoleteServiceUpdate(properties);
        };

        /**
         * Encodes the specified ObsoleteServiceUpdate message. Does not implicitly {@link dialog.ObsoleteServiceUpdate.verify|verify} messages.
         * @function encode
         * @memberof dialog.ObsoleteServiceUpdate
         * @static
         * @param {dialog.IObsoleteServiceUpdate} message ObsoleteServiceUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObsoleteServiceUpdate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.obsoleteUpdate != null && message.hasOwnProperty("obsoleteUpdate"))
                $root.google.protobuf.BytesValue.encode(message.obsoleteUpdate, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ObsoleteServiceUpdate message, length delimited. Does not implicitly {@link dialog.ObsoleteServiceUpdate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dialog.ObsoleteServiceUpdate
         * @static
         * @param {dialog.IObsoleteServiceUpdate} message ObsoleteServiceUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObsoleteServiceUpdate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ObsoleteServiceUpdate message from the specified reader or buffer.
         * @function decode
         * @memberof dialog.ObsoleteServiceUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dialog.ObsoleteServiceUpdate} ObsoleteServiceUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObsoleteServiceUpdate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteServiceUpdate();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.obsoleteUpdate = $root.google.protobuf.BytesValue.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ObsoleteServiceUpdate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dialog.ObsoleteServiceUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dialog.ObsoleteServiceUpdate} ObsoleteServiceUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObsoleteServiceUpdate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ObsoleteServiceUpdate message.
         * @function verify
         * @memberof dialog.ObsoleteServiceUpdate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ObsoleteServiceUpdate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.obsoleteUpdate != null && message.hasOwnProperty("obsoleteUpdate")) {
                properties.update = 1;
                {
                    let error = $root.google.protobuf.BytesValue.verify(message.obsoleteUpdate);
                    if (error)
                        return "obsoleteUpdate." + error;
                }
            }
            return null;
        };

        /**
         * Creates an ObsoleteServiceUpdate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dialog.ObsoleteServiceUpdate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dialog.ObsoleteServiceUpdate} ObsoleteServiceUpdate
         */
        ObsoleteServiceUpdate.fromObject = function fromObject(object) {
            if (object instanceof $root.dialog.ObsoleteServiceUpdate)
                return object;
            let message = new $root.dialog.ObsoleteServiceUpdate();
            if (object.obsoleteUpdate != null) {
                if (typeof object.obsoleteUpdate !== "object")
                    throw TypeError(".dialog.ObsoleteServiceUpdate.obsoleteUpdate: object expected");
                message.obsoleteUpdate = $root.google.protobuf.BytesValue.fromObject(object.obsoleteUpdate);
            }
            return message;
        };

        /**
         * Creates a plain object from an ObsoleteServiceUpdate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dialog.ObsoleteServiceUpdate
         * @static
         * @param {dialog.ObsoleteServiceUpdate} message ObsoleteServiceUpdate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ObsoleteServiceUpdate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.obsoleteUpdate != null && message.hasOwnProperty("obsoleteUpdate")) {
                object.obsoleteUpdate = $root.google.protobuf.BytesValue.toObject(message.obsoleteUpdate, options);
                if (options.oneofs)
                    object.update = "obsoleteUpdate";
            }
            return object;
        };

        /**
         * Converts this ObsoleteServiceUpdate to JSON.
         * @function toJSON
         * @memberof dialog.ObsoleteServiceUpdate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ObsoleteServiceUpdate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ObsoleteServiceUpdate;
    })();

    /**
     * ObsoleteTypingType enum.
     * @name dialog.ObsoleteTypingType
     * @enum {string}
     * @property {number} OBSOLETE_TYPINGTYPE_UNKNOWN=0 OBSOLETE_TYPINGTYPE_UNKNOWN value
     * @property {number} OBSOLETE_TYPINGTYPE_TEXT=1 OBSOLETE_TYPINGTYPE_TEXT value
     */
    dialog.ObsoleteTypingType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "OBSOLETE_TYPINGTYPE_UNKNOWN"] = 0;
        values[valuesById[1] = "OBSOLETE_TYPINGTYPE_TEXT"] = 1;
        return values;
    })();

    dialog.ObsoleteWeakUpdateCommand = (function() {

        /**
         * Properties of an ObsoleteWeakUpdateCommand.
         * @memberof dialog
         * @interface IObsoleteWeakUpdateCommand
         * @property {dialog.IObsoletePeersList|null} [subscribeToOnlines] ObsoleteWeakUpdateCommand subscribeToOnlines
         * @property {dialog.IObsoletePeersList|null} [unsubscribeFromOnlines] ObsoleteWeakUpdateCommand unsubscribeFromOnlines
         * @property {google.protobuf.IEmpty|null} [dropOnlineSubscriptions] ObsoleteWeakUpdateCommand dropOnlineSubscriptions
         * @property {dialog.ObsoleteWeakUpdateCommand.IObsoleteMyTyping|null} [myTyping] ObsoleteWeakUpdateCommand myTyping
         * @property {dialog.IObsoletePeersList|null} [subscribeToTypings] ObsoleteWeakUpdateCommand subscribeToTypings
         * @property {dialog.IObsoletePeersList|null} [unsubscribeFromTypings] ObsoleteWeakUpdateCommand unsubscribeFromTypings
         * @property {google.protobuf.IEmpty|null} [dropTypingSubscriptions] ObsoleteWeakUpdateCommand dropTypingSubscriptions
         * @property {google.protobuf.IEmpty|null} [subscribeToEventBusUpdates] ObsoleteWeakUpdateCommand subscribeToEventBusUpdates
         * @property {dialog.ObsoleteWeakUpdateCommand.IObsoleteMyOnline|null} [myOnline] ObsoleteWeakUpdateCommand myOnline
         */

        /**
         * Constructs a new ObsoleteWeakUpdateCommand.
         * @memberof dialog
         * @classdesc Represents an ObsoleteWeakUpdateCommand.
         * @implements IObsoleteWeakUpdateCommand
         * @constructor
         * @param {dialog.IObsoleteWeakUpdateCommand=} [properties] Properties to set
         */
        function ObsoleteWeakUpdateCommand(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ObsoleteWeakUpdateCommand subscribeToOnlines.
         * @member {dialog.IObsoletePeersList|null|undefined} subscribeToOnlines
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @instance
         */
        ObsoleteWeakUpdateCommand.prototype.subscribeToOnlines = null;

        /**
         * ObsoleteWeakUpdateCommand unsubscribeFromOnlines.
         * @member {dialog.IObsoletePeersList|null|undefined} unsubscribeFromOnlines
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @instance
         */
        ObsoleteWeakUpdateCommand.prototype.unsubscribeFromOnlines = null;

        /**
         * ObsoleteWeakUpdateCommand dropOnlineSubscriptions.
         * @member {google.protobuf.IEmpty|null|undefined} dropOnlineSubscriptions
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @instance
         */
        ObsoleteWeakUpdateCommand.prototype.dropOnlineSubscriptions = null;

        /**
         * ObsoleteWeakUpdateCommand myTyping.
         * @member {dialog.ObsoleteWeakUpdateCommand.IObsoleteMyTyping|null|undefined} myTyping
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @instance
         */
        ObsoleteWeakUpdateCommand.prototype.myTyping = null;

        /**
         * ObsoleteWeakUpdateCommand subscribeToTypings.
         * @member {dialog.IObsoletePeersList|null|undefined} subscribeToTypings
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @instance
         */
        ObsoleteWeakUpdateCommand.prototype.subscribeToTypings = null;

        /**
         * ObsoleteWeakUpdateCommand unsubscribeFromTypings.
         * @member {dialog.IObsoletePeersList|null|undefined} unsubscribeFromTypings
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @instance
         */
        ObsoleteWeakUpdateCommand.prototype.unsubscribeFromTypings = null;

        /**
         * ObsoleteWeakUpdateCommand dropTypingSubscriptions.
         * @member {google.protobuf.IEmpty|null|undefined} dropTypingSubscriptions
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @instance
         */
        ObsoleteWeakUpdateCommand.prototype.dropTypingSubscriptions = null;

        /**
         * ObsoleteWeakUpdateCommand subscribeToEventBusUpdates.
         * @member {google.protobuf.IEmpty|null|undefined} subscribeToEventBusUpdates
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @instance
         */
        ObsoleteWeakUpdateCommand.prototype.subscribeToEventBusUpdates = null;

        /**
         * ObsoleteWeakUpdateCommand myOnline.
         * @member {dialog.ObsoleteWeakUpdateCommand.IObsoleteMyOnline|null|undefined} myOnline
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @instance
         */
        ObsoleteWeakUpdateCommand.prototype.myOnline = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * ObsoleteWeakUpdateCommand command.
         * @member {"subscribeToOnlines"|"unsubscribeFromOnlines"|"dropOnlineSubscriptions"|"myTyping"|"subscribeToTypings"|"unsubscribeFromTypings"|"dropTypingSubscriptions"|"subscribeToEventBusUpdates"|"myOnline"|undefined} command
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @instance
         */
        Object.defineProperty(ObsoleteWeakUpdateCommand.prototype, "command", {
            get: $util.oneOfGetter($oneOfFields = ["subscribeToOnlines", "unsubscribeFromOnlines", "dropOnlineSubscriptions", "myTyping", "subscribeToTypings", "unsubscribeFromTypings", "dropTypingSubscriptions", "subscribeToEventBusUpdates", "myOnline"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ObsoleteWeakUpdateCommand instance using the specified properties.
         * @function create
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @static
         * @param {dialog.IObsoleteWeakUpdateCommand=} [properties] Properties to set
         * @returns {dialog.ObsoleteWeakUpdateCommand} ObsoleteWeakUpdateCommand instance
         */
        ObsoleteWeakUpdateCommand.create = function create(properties) {
            return new ObsoleteWeakUpdateCommand(properties);
        };

        /**
         * Encodes the specified ObsoleteWeakUpdateCommand message. Does not implicitly {@link dialog.ObsoleteWeakUpdateCommand.verify|verify} messages.
         * @function encode
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @static
         * @param {dialog.IObsoleteWeakUpdateCommand} message ObsoleteWeakUpdateCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObsoleteWeakUpdateCommand.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.subscribeToOnlines != null && message.hasOwnProperty("subscribeToOnlines"))
                $root.dialog.ObsoletePeersList.encode(message.subscribeToOnlines, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.unsubscribeFromOnlines != null && message.hasOwnProperty("unsubscribeFromOnlines"))
                $root.dialog.ObsoletePeersList.encode(message.unsubscribeFromOnlines, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.dropOnlineSubscriptions != null && message.hasOwnProperty("dropOnlineSubscriptions"))
                $root.google.protobuf.Empty.encode(message.dropOnlineSubscriptions, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.myTyping != null && message.hasOwnProperty("myTyping"))
                $root.dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping.encode(message.myTyping, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.subscribeToTypings != null && message.hasOwnProperty("subscribeToTypings"))
                $root.dialog.ObsoletePeersList.encode(message.subscribeToTypings, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.unsubscribeFromTypings != null && message.hasOwnProperty("unsubscribeFromTypings"))
                $root.dialog.ObsoletePeersList.encode(message.unsubscribeFromTypings, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.dropTypingSubscriptions != null && message.hasOwnProperty("dropTypingSubscriptions"))
                $root.google.protobuf.Empty.encode(message.dropTypingSubscriptions, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.subscribeToEventBusUpdates != null && message.hasOwnProperty("subscribeToEventBusUpdates"))
                $root.google.protobuf.Empty.encode(message.subscribeToEventBusUpdates, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.myOnline != null && message.hasOwnProperty("myOnline"))
                $root.dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline.encode(message.myOnline, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ObsoleteWeakUpdateCommand message, length delimited. Does not implicitly {@link dialog.ObsoleteWeakUpdateCommand.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @static
         * @param {dialog.IObsoleteWeakUpdateCommand} message ObsoleteWeakUpdateCommand message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ObsoleteWeakUpdateCommand.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ObsoleteWeakUpdateCommand message from the specified reader or buffer.
         * @function decode
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dialog.ObsoleteWeakUpdateCommand} ObsoleteWeakUpdateCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObsoleteWeakUpdateCommand.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteWeakUpdateCommand();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.subscribeToOnlines = $root.dialog.ObsoletePeersList.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.unsubscribeFromOnlines = $root.dialog.ObsoletePeersList.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.dropOnlineSubscriptions = $root.google.protobuf.Empty.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.myTyping = $root.dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.subscribeToTypings = $root.dialog.ObsoletePeersList.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.unsubscribeFromTypings = $root.dialog.ObsoletePeersList.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.dropTypingSubscriptions = $root.google.protobuf.Empty.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.subscribeToEventBusUpdates = $root.google.protobuf.Empty.decode(reader, reader.uint32());
                    break;
                case 12:
                    message.myOnline = $root.dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ObsoleteWeakUpdateCommand message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dialog.ObsoleteWeakUpdateCommand} ObsoleteWeakUpdateCommand
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ObsoleteWeakUpdateCommand.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ObsoleteWeakUpdateCommand message.
         * @function verify
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ObsoleteWeakUpdateCommand.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.subscribeToOnlines != null && message.hasOwnProperty("subscribeToOnlines")) {
                properties.command = 1;
                {
                    let error = $root.dialog.ObsoletePeersList.verify(message.subscribeToOnlines);
                    if (error)
                        return "subscribeToOnlines." + error;
                }
            }
            if (message.unsubscribeFromOnlines != null && message.hasOwnProperty("unsubscribeFromOnlines")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.dialog.ObsoletePeersList.verify(message.unsubscribeFromOnlines);
                    if (error)
                        return "unsubscribeFromOnlines." + error;
                }
            }
            if (message.dropOnlineSubscriptions != null && message.hasOwnProperty("dropOnlineSubscriptions")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.google.protobuf.Empty.verify(message.dropOnlineSubscriptions);
                    if (error)
                        return "dropOnlineSubscriptions." + error;
                }
            }
            if (message.myTyping != null && message.hasOwnProperty("myTyping")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping.verify(message.myTyping);
                    if (error)
                        return "myTyping." + error;
                }
            }
            if (message.subscribeToTypings != null && message.hasOwnProperty("subscribeToTypings")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.dialog.ObsoletePeersList.verify(message.subscribeToTypings);
                    if (error)
                        return "subscribeToTypings." + error;
                }
            }
            if (message.unsubscribeFromTypings != null && message.hasOwnProperty("unsubscribeFromTypings")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.dialog.ObsoletePeersList.verify(message.unsubscribeFromTypings);
                    if (error)
                        return "unsubscribeFromTypings." + error;
                }
            }
            if (message.dropTypingSubscriptions != null && message.hasOwnProperty("dropTypingSubscriptions")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.google.protobuf.Empty.verify(message.dropTypingSubscriptions);
                    if (error)
                        return "dropTypingSubscriptions." + error;
                }
            }
            if (message.subscribeToEventBusUpdates != null && message.hasOwnProperty("subscribeToEventBusUpdates")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.google.protobuf.Empty.verify(message.subscribeToEventBusUpdates);
                    if (error)
                        return "subscribeToEventBusUpdates." + error;
                }
            }
            if (message.myOnline != null && message.hasOwnProperty("myOnline")) {
                if (properties.command === 1)
                    return "command: multiple values";
                properties.command = 1;
                {
                    let error = $root.dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline.verify(message.myOnline);
                    if (error)
                        return "myOnline." + error;
                }
            }
            return null;
        };

        /**
         * Creates an ObsoleteWeakUpdateCommand message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dialog.ObsoleteWeakUpdateCommand} ObsoleteWeakUpdateCommand
         */
        ObsoleteWeakUpdateCommand.fromObject = function fromObject(object) {
            if (object instanceof $root.dialog.ObsoleteWeakUpdateCommand)
                return object;
            let message = new $root.dialog.ObsoleteWeakUpdateCommand();
            if (object.subscribeToOnlines != null) {
                if (typeof object.subscribeToOnlines !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateCommand.subscribeToOnlines: object expected");
                message.subscribeToOnlines = $root.dialog.ObsoletePeersList.fromObject(object.subscribeToOnlines);
            }
            if (object.unsubscribeFromOnlines != null) {
                if (typeof object.unsubscribeFromOnlines !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateCommand.unsubscribeFromOnlines: object expected");
                message.unsubscribeFromOnlines = $root.dialog.ObsoletePeersList.fromObject(object.unsubscribeFromOnlines);
            }
            if (object.dropOnlineSubscriptions != null) {
                if (typeof object.dropOnlineSubscriptions !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateCommand.dropOnlineSubscriptions: object expected");
                message.dropOnlineSubscriptions = $root.google.protobuf.Empty.fromObject(object.dropOnlineSubscriptions);
            }
            if (object.myTyping != null) {
                if (typeof object.myTyping !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateCommand.myTyping: object expected");
                message.myTyping = $root.dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping.fromObject(object.myTyping);
            }
            if (object.subscribeToTypings != null) {
                if (typeof object.subscribeToTypings !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateCommand.subscribeToTypings: object expected");
                message.subscribeToTypings = $root.dialog.ObsoletePeersList.fromObject(object.subscribeToTypings);
            }
            if (object.unsubscribeFromTypings != null) {
                if (typeof object.unsubscribeFromTypings !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateCommand.unsubscribeFromTypings: object expected");
                message.unsubscribeFromTypings = $root.dialog.ObsoletePeersList.fromObject(object.unsubscribeFromTypings);
            }
            if (object.dropTypingSubscriptions != null) {
                if (typeof object.dropTypingSubscriptions !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateCommand.dropTypingSubscriptions: object expected");
                message.dropTypingSubscriptions = $root.google.protobuf.Empty.fromObject(object.dropTypingSubscriptions);
            }
            if (object.subscribeToEventBusUpdates != null) {
                if (typeof object.subscribeToEventBusUpdates !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateCommand.subscribeToEventBusUpdates: object expected");
                message.subscribeToEventBusUpdates = $root.google.protobuf.Empty.fromObject(object.subscribeToEventBusUpdates);
            }
            if (object.myOnline != null) {
                if (typeof object.myOnline !== "object")
                    throw TypeError(".dialog.ObsoleteWeakUpdateCommand.myOnline: object expected");
                message.myOnline = $root.dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline.fromObject(object.myOnline);
            }
            return message;
        };

        /**
         * Creates a plain object from an ObsoleteWeakUpdateCommand message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @static
         * @param {dialog.ObsoleteWeakUpdateCommand} message ObsoleteWeakUpdateCommand
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ObsoleteWeakUpdateCommand.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.subscribeToOnlines != null && message.hasOwnProperty("subscribeToOnlines")) {
                object.subscribeToOnlines = $root.dialog.ObsoletePeersList.toObject(message.subscribeToOnlines, options);
                if (options.oneofs)
                    object.command = "subscribeToOnlines";
            }
            if (message.unsubscribeFromOnlines != null && message.hasOwnProperty("unsubscribeFromOnlines")) {
                object.unsubscribeFromOnlines = $root.dialog.ObsoletePeersList.toObject(message.unsubscribeFromOnlines, options);
                if (options.oneofs)
                    object.command = "unsubscribeFromOnlines";
            }
            if (message.dropOnlineSubscriptions != null && message.hasOwnProperty("dropOnlineSubscriptions")) {
                object.dropOnlineSubscriptions = $root.google.protobuf.Empty.toObject(message.dropOnlineSubscriptions, options);
                if (options.oneofs)
                    object.command = "dropOnlineSubscriptions";
            }
            if (message.myTyping != null && message.hasOwnProperty("myTyping")) {
                object.myTyping = $root.dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping.toObject(message.myTyping, options);
                if (options.oneofs)
                    object.command = "myTyping";
            }
            if (message.subscribeToTypings != null && message.hasOwnProperty("subscribeToTypings")) {
                object.subscribeToTypings = $root.dialog.ObsoletePeersList.toObject(message.subscribeToTypings, options);
                if (options.oneofs)
                    object.command = "subscribeToTypings";
            }
            if (message.unsubscribeFromTypings != null && message.hasOwnProperty("unsubscribeFromTypings")) {
                object.unsubscribeFromTypings = $root.dialog.ObsoletePeersList.toObject(message.unsubscribeFromTypings, options);
                if (options.oneofs)
                    object.command = "unsubscribeFromTypings";
            }
            if (message.dropTypingSubscriptions != null && message.hasOwnProperty("dropTypingSubscriptions")) {
                object.dropTypingSubscriptions = $root.google.protobuf.Empty.toObject(message.dropTypingSubscriptions, options);
                if (options.oneofs)
                    object.command = "dropTypingSubscriptions";
            }
            if (message.subscribeToEventBusUpdates != null && message.hasOwnProperty("subscribeToEventBusUpdates")) {
                object.subscribeToEventBusUpdates = $root.google.protobuf.Empty.toObject(message.subscribeToEventBusUpdates, options);
                if (options.oneofs)
                    object.command = "subscribeToEventBusUpdates";
            }
            if (message.myOnline != null && message.hasOwnProperty("myOnline")) {
                object.myOnline = $root.dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline.toObject(message.myOnline, options);
                if (options.oneofs)
                    object.command = "myOnline";
            }
            return object;
        };

        /**
         * Converts this ObsoleteWeakUpdateCommand to JSON.
         * @function toJSON
         * @memberof dialog.ObsoleteWeakUpdateCommand
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ObsoleteWeakUpdateCommand.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        ObsoleteWeakUpdateCommand.ObsoleteMyTyping = (function() {

            /**
             * Properties of an ObsoleteMyTyping.
             * @memberof dialog.ObsoleteWeakUpdateCommand
             * @interface IObsoleteMyTyping
             * @property {dialog.IObsoletePeer|null} [peer] ObsoleteMyTyping peer
             * @property {dialog.ObsoleteTypingType|null} [type] ObsoleteMyTyping type
             * @property {boolean|null} [start] ObsoleteMyTyping start
             */

            /**
             * Constructs a new ObsoleteMyTyping.
             * @memberof dialog.ObsoleteWeakUpdateCommand
             * @classdesc Represents an ObsoleteMyTyping.
             * @implements IObsoleteMyTyping
             * @constructor
             * @param {dialog.ObsoleteWeakUpdateCommand.IObsoleteMyTyping=} [properties] Properties to set
             */
            function ObsoleteMyTyping(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ObsoleteMyTyping peer.
             * @member {dialog.IObsoletePeer|null|undefined} peer
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping
             * @instance
             */
            ObsoleteMyTyping.prototype.peer = null;

            /**
             * ObsoleteMyTyping type.
             * @member {dialog.ObsoleteTypingType} type
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping
             * @instance
             */
            ObsoleteMyTyping.prototype.type = 0;

            /**
             * ObsoleteMyTyping start.
             * @member {boolean} start
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping
             * @instance
             */
            ObsoleteMyTyping.prototype.start = false;

            /**
             * Creates a new ObsoleteMyTyping instance using the specified properties.
             * @function create
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping
             * @static
             * @param {dialog.ObsoleteWeakUpdateCommand.IObsoleteMyTyping=} [properties] Properties to set
             * @returns {dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping} ObsoleteMyTyping instance
             */
            ObsoleteMyTyping.create = function create(properties) {
                return new ObsoleteMyTyping(properties);
            };

            /**
             * Encodes the specified ObsoleteMyTyping message. Does not implicitly {@link dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping.verify|verify} messages.
             * @function encode
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping
             * @static
             * @param {dialog.ObsoleteWeakUpdateCommand.IObsoleteMyTyping} message ObsoleteMyTyping message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteMyTyping.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.peer != null && message.hasOwnProperty("peer"))
                    $root.dialog.ObsoletePeer.encode(message.peer, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.type != null && message.hasOwnProperty("type"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                if (message.start != null && message.hasOwnProperty("start"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.start);
                return writer;
            };

            /**
             * Encodes the specified ObsoleteMyTyping message, length delimited. Does not implicitly {@link dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping
             * @static
             * @param {dialog.ObsoleteWeakUpdateCommand.IObsoleteMyTyping} message ObsoleteMyTyping message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteMyTyping.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ObsoleteMyTyping message from the specified reader or buffer.
             * @function decode
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping} ObsoleteMyTyping
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteMyTyping.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.peer = $root.dialog.ObsoletePeer.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.type = reader.int32();
                        break;
                    case 3:
                        message.start = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ObsoleteMyTyping message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping} ObsoleteMyTyping
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteMyTyping.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ObsoleteMyTyping message.
             * @function verify
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ObsoleteMyTyping.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.peer != null && message.hasOwnProperty("peer")) {
                    let error = $root.dialog.ObsoletePeer.verify(message.peer);
                    if (error)
                        return "peer." + error;
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                if (message.start != null && message.hasOwnProperty("start"))
                    if (typeof message.start !== "boolean")
                        return "start: boolean expected";
                return null;
            };

            /**
             * Creates an ObsoleteMyTyping message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping} ObsoleteMyTyping
             */
            ObsoleteMyTyping.fromObject = function fromObject(object) {
                if (object instanceof $root.dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping)
                    return object;
                let message = new $root.dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping();
                if (object.peer != null) {
                    if (typeof object.peer !== "object")
                        throw TypeError(".dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping.peer: object expected");
                    message.peer = $root.dialog.ObsoletePeer.fromObject(object.peer);
                }
                switch (object.type) {
                case "OBSOLETE_TYPINGTYPE_UNKNOWN":
                case 0:
                    message.type = 0;
                    break;
                case "OBSOLETE_TYPINGTYPE_TEXT":
                case 1:
                    message.type = 1;
                    break;
                }
                if (object.start != null)
                    message.start = Boolean(object.start);
                return message;
            };

            /**
             * Creates a plain object from an ObsoleteMyTyping message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping
             * @static
             * @param {dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping} message ObsoleteMyTyping
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ObsoleteMyTyping.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.peer = null;
                    object.type = options.enums === String ? "OBSOLETE_TYPINGTYPE_UNKNOWN" : 0;
                    object.start = false;
                }
                if (message.peer != null && message.hasOwnProperty("peer"))
                    object.peer = $root.dialog.ObsoletePeer.toObject(message.peer, options);
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.dialog.ObsoleteTypingType[message.type] : message.type;
                if (message.start != null && message.hasOwnProperty("start"))
                    object.start = message.start;
                return object;
            };

            /**
             * Converts this ObsoleteMyTyping to JSON.
             * @function toJSON
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyTyping
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ObsoleteMyTyping.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ObsoleteMyTyping;
        })();

        ObsoleteWeakUpdateCommand.ObsoleteMyOnline = (function() {

            /**
             * Properties of an ObsoleteMyOnline.
             * @memberof dialog.ObsoleteWeakUpdateCommand
             * @interface IObsoleteMyOnline
             * @property {boolean|null} [online] ObsoleteMyOnline online
             */

            /**
             * Constructs a new ObsoleteMyOnline.
             * @memberof dialog.ObsoleteWeakUpdateCommand
             * @classdesc Represents an ObsoleteMyOnline.
             * @implements IObsoleteMyOnline
             * @constructor
             * @param {dialog.ObsoleteWeakUpdateCommand.IObsoleteMyOnline=} [properties] Properties to set
             */
            function ObsoleteMyOnline(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ObsoleteMyOnline online.
             * @member {boolean} online
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline
             * @instance
             */
            ObsoleteMyOnline.prototype.online = false;

            /**
             * Creates a new ObsoleteMyOnline instance using the specified properties.
             * @function create
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline
             * @static
             * @param {dialog.ObsoleteWeakUpdateCommand.IObsoleteMyOnline=} [properties] Properties to set
             * @returns {dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline} ObsoleteMyOnline instance
             */
            ObsoleteMyOnline.create = function create(properties) {
                return new ObsoleteMyOnline(properties);
            };

            /**
             * Encodes the specified ObsoleteMyOnline message. Does not implicitly {@link dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline.verify|verify} messages.
             * @function encode
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline
             * @static
             * @param {dialog.ObsoleteWeakUpdateCommand.IObsoleteMyOnline} message ObsoleteMyOnline message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteMyOnline.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.online != null && message.hasOwnProperty("online"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.online);
                return writer;
            };

            /**
             * Encodes the specified ObsoleteMyOnline message, length delimited. Does not implicitly {@link dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline
             * @static
             * @param {dialog.ObsoleteWeakUpdateCommand.IObsoleteMyOnline} message ObsoleteMyOnline message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ObsoleteMyOnline.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ObsoleteMyOnline message from the specified reader or buffer.
             * @function decode
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline} ObsoleteMyOnline
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteMyOnline.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.online = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ObsoleteMyOnline message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline} ObsoleteMyOnline
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ObsoleteMyOnline.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ObsoleteMyOnline message.
             * @function verify
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ObsoleteMyOnline.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.online != null && message.hasOwnProperty("online"))
                    if (typeof message.online !== "boolean")
                        return "online: boolean expected";
                return null;
            };

            /**
             * Creates an ObsoleteMyOnline message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline} ObsoleteMyOnline
             */
            ObsoleteMyOnline.fromObject = function fromObject(object) {
                if (object instanceof $root.dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline)
                    return object;
                let message = new $root.dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline();
                if (object.online != null)
                    message.online = Boolean(object.online);
                return message;
            };

            /**
             * Creates a plain object from an ObsoleteMyOnline message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline
             * @static
             * @param {dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline} message ObsoleteMyOnline
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ObsoleteMyOnline.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.online = false;
                if (message.online != null && message.hasOwnProperty("online"))
                    object.online = message.online;
                return object;
            };

            /**
             * Converts this ObsoleteMyOnline to JSON.
             * @function toJSON
             * @memberof dialog.ObsoleteWeakUpdateCommand.ObsoleteMyOnline
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ObsoleteMyOnline.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ObsoleteMyOnline;
        })();

        return ObsoleteWeakUpdateCommand;
    })();

    return dialog;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Empty = (function() {

            /**
             * Properties of an Empty.
             * @memberof google.protobuf
             * @interface IEmpty
             */

            /**
             * Constructs a new Empty.
             * @memberof google.protobuf
             * @classdesc Represents an Empty.
             * @implements IEmpty
             * @constructor
             * @param {google.protobuf.IEmpty=} [properties] Properties to set
             */
            function Empty(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new Empty instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.IEmpty=} [properties] Properties to set
             * @returns {google.protobuf.Empty} Empty instance
             */
            Empty.create = function create(properties) {
                return new Empty(properties);
            };

            /**
             * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Empty.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Empty.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Empty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Empty} Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Empty.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Empty();
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
             * Decodes an Empty message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Empty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Empty} Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Empty.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Empty message.
             * @function verify
             * @memberof google.protobuf.Empty
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Empty.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates an Empty message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Empty
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Empty} Empty
             */
            Empty.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Empty)
                    return object;
                return new $root.google.protobuf.Empty();
            };

            /**
             * Creates a plain object from an Empty message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.Empty} message Empty
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Empty.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this Empty to JSON.
             * @function toJSON
             * @memberof google.protobuf.Empty
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Empty.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Empty;
        })();

        protobuf.DoubleValue = (function() {

            /**
             * Properties of a DoubleValue.
             * @memberof google.protobuf
             * @interface IDoubleValue
             * @property {number|null} [value] DoubleValue value
             */

            /**
             * Constructs a new DoubleValue.
             * @memberof google.protobuf
             * @classdesc Represents a DoubleValue.
             * @implements IDoubleValue
             * @constructor
             * @param {google.protobuf.IDoubleValue=} [properties] Properties to set
             */
            function DoubleValue(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DoubleValue value.
             * @member {number} value
             * @memberof google.protobuf.DoubleValue
             * @instance
             */
            DoubleValue.prototype.value = 0;

            /**
             * Creates a new DoubleValue instance using the specified properties.
             * @function create
             * @memberof google.protobuf.DoubleValue
             * @static
             * @param {google.protobuf.IDoubleValue=} [properties] Properties to set
             * @returns {google.protobuf.DoubleValue} DoubleValue instance
             */
            DoubleValue.create = function create(properties) {
                return new DoubleValue(properties);
            };

            /**
             * Encodes the specified DoubleValue message. Does not implicitly {@link google.protobuf.DoubleValue.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.DoubleValue
             * @static
             * @param {google.protobuf.IDoubleValue} message DoubleValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DoubleValue.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 1 =*/9).double(message.value);
                return writer;
            };

            /**
             * Encodes the specified DoubleValue message, length delimited. Does not implicitly {@link google.protobuf.DoubleValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.DoubleValue
             * @static
             * @param {google.protobuf.IDoubleValue} message DoubleValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DoubleValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DoubleValue message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.DoubleValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.DoubleValue} DoubleValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DoubleValue.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.DoubleValue();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.double();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DoubleValue message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.DoubleValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.DoubleValue} DoubleValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DoubleValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DoubleValue message.
             * @function verify
             * @memberof google.protobuf.DoubleValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DoubleValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (typeof message.value !== "number")
                        return "value: number expected";
                return null;
            };

            /**
             * Creates a DoubleValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.DoubleValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.DoubleValue} DoubleValue
             */
            DoubleValue.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.DoubleValue)
                    return object;
                let message = new $root.google.protobuf.DoubleValue();
                if (object.value != null)
                    message.value = Number(object.value);
                return message;
            };

            /**
             * Creates a plain object from a DoubleValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.DoubleValue
             * @static
             * @param {google.protobuf.DoubleValue} message DoubleValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DoubleValue.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.value = 0;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.json && !isFinite(message.value) ? String(message.value) : message.value;
                return object;
            };

            /**
             * Converts this DoubleValue to JSON.
             * @function toJSON
             * @memberof google.protobuf.DoubleValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DoubleValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DoubleValue;
        })();

        protobuf.FloatValue = (function() {

            /**
             * Properties of a FloatValue.
             * @memberof google.protobuf
             * @interface IFloatValue
             * @property {number|null} [value] FloatValue value
             */

            /**
             * Constructs a new FloatValue.
             * @memberof google.protobuf
             * @classdesc Represents a FloatValue.
             * @implements IFloatValue
             * @constructor
             * @param {google.protobuf.IFloatValue=} [properties] Properties to set
             */
            function FloatValue(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FloatValue value.
             * @member {number} value
             * @memberof google.protobuf.FloatValue
             * @instance
             */
            FloatValue.prototype.value = 0;

            /**
             * Creates a new FloatValue instance using the specified properties.
             * @function create
             * @memberof google.protobuf.FloatValue
             * @static
             * @param {google.protobuf.IFloatValue=} [properties] Properties to set
             * @returns {google.protobuf.FloatValue} FloatValue instance
             */
            FloatValue.create = function create(properties) {
                return new FloatValue(properties);
            };

            /**
             * Encodes the specified FloatValue message. Does not implicitly {@link google.protobuf.FloatValue.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.FloatValue
             * @static
             * @param {google.protobuf.IFloatValue} message FloatValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FloatValue.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 5 =*/13).float(message.value);
                return writer;
            };

            /**
             * Encodes the specified FloatValue message, length delimited. Does not implicitly {@link google.protobuf.FloatValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.FloatValue
             * @static
             * @param {google.protobuf.IFloatValue} message FloatValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FloatValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FloatValue message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.FloatValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.FloatValue} FloatValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FloatValue.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.FloatValue();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.float();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a FloatValue message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.FloatValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.FloatValue} FloatValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FloatValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a FloatValue message.
             * @function verify
             * @memberof google.protobuf.FloatValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FloatValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (typeof message.value !== "number")
                        return "value: number expected";
                return null;
            };

            /**
             * Creates a FloatValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.FloatValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.FloatValue} FloatValue
             */
            FloatValue.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.FloatValue)
                    return object;
                let message = new $root.google.protobuf.FloatValue();
                if (object.value != null)
                    message.value = Number(object.value);
                return message;
            };

            /**
             * Creates a plain object from a FloatValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.FloatValue
             * @static
             * @param {google.protobuf.FloatValue} message FloatValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FloatValue.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.value = 0;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.json && !isFinite(message.value) ? String(message.value) : message.value;
                return object;
            };

            /**
             * Converts this FloatValue to JSON.
             * @function toJSON
             * @memberof google.protobuf.FloatValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FloatValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return FloatValue;
        })();

        protobuf.Int64Value = (function() {

            /**
             * Properties of an Int64Value.
             * @memberof google.protobuf
             * @interface IInt64Value
             * @property {number|Long|null} [value] Int64Value value
             */

            /**
             * Constructs a new Int64Value.
             * @memberof google.protobuf
             * @classdesc Represents an Int64Value.
             * @implements IInt64Value
             * @constructor
             * @param {google.protobuf.IInt64Value=} [properties] Properties to set
             */
            function Int64Value(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Int64Value value.
             * @member {number|Long} value
             * @memberof google.protobuf.Int64Value
             * @instance
             */
            Int64Value.prototype.value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new Int64Value instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Int64Value
             * @static
             * @param {google.protobuf.IInt64Value=} [properties] Properties to set
             * @returns {google.protobuf.Int64Value} Int64Value instance
             */
            Int64Value.create = function create(properties) {
                return new Int64Value(properties);
            };

            /**
             * Encodes the specified Int64Value message. Does not implicitly {@link google.protobuf.Int64Value.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Int64Value
             * @static
             * @param {google.protobuf.IInt64Value} message Int64Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Int64Value.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.value);
                return writer;
            };

            /**
             * Encodes the specified Int64Value message, length delimited. Does not implicitly {@link google.protobuf.Int64Value.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Int64Value
             * @static
             * @param {google.protobuf.IInt64Value} message Int64Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Int64Value.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Int64Value message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Int64Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Int64Value} Int64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Int64Value.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Int64Value();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Int64Value message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Int64Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Int64Value} Int64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Int64Value.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Int64Value message.
             * @function verify
             * @memberof google.protobuf.Int64Value
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Int64Value.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isInteger(message.value) && !(message.value && $util.isInteger(message.value.low) && $util.isInteger(message.value.high)))
                        return "value: integer|Long expected";
                return null;
            };

            /**
             * Creates an Int64Value message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Int64Value
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Int64Value} Int64Value
             */
            Int64Value.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Int64Value)
                    return object;
                let message = new $root.google.protobuf.Int64Value();
                if (object.value != null)
                    if ($util.Long)
                        (message.value = $util.Long.fromValue(object.value)).unsigned = false;
                    else if (typeof object.value === "string")
                        message.value = parseInt(object.value, 10);
                    else if (typeof object.value === "number")
                        message.value = object.value;
                    else if (typeof object.value === "object")
                        message.value = new $util.LongBits(object.value.low >>> 0, object.value.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from an Int64Value message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Int64Value
             * @static
             * @param {google.protobuf.Int64Value} message Int64Value
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Int64Value.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.value = options.longs === String ? "0" : 0;
                if (message.value != null && message.hasOwnProperty("value"))
                    if (typeof message.value === "number")
                        object.value = options.longs === String ? String(message.value) : message.value;
                    else
                        object.value = options.longs === String ? $util.Long.prototype.toString.call(message.value) : options.longs === Number ? new $util.LongBits(message.value.low >>> 0, message.value.high >>> 0).toNumber() : message.value;
                return object;
            };

            /**
             * Converts this Int64Value to JSON.
             * @function toJSON
             * @memberof google.protobuf.Int64Value
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Int64Value.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Int64Value;
        })();

        protobuf.UInt64Value = (function() {

            /**
             * Properties of a UInt64Value.
             * @memberof google.protobuf
             * @interface IUInt64Value
             * @property {number|Long|null} [value] UInt64Value value
             */

            /**
             * Constructs a new UInt64Value.
             * @memberof google.protobuf
             * @classdesc Represents a UInt64Value.
             * @implements IUInt64Value
             * @constructor
             * @param {google.protobuf.IUInt64Value=} [properties] Properties to set
             */
            function UInt64Value(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UInt64Value value.
             * @member {number|Long} value
             * @memberof google.protobuf.UInt64Value
             * @instance
             */
            UInt64Value.prototype.value = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Creates a new UInt64Value instance using the specified properties.
             * @function create
             * @memberof google.protobuf.UInt64Value
             * @static
             * @param {google.protobuf.IUInt64Value=} [properties] Properties to set
             * @returns {google.protobuf.UInt64Value} UInt64Value instance
             */
            UInt64Value.create = function create(properties) {
                return new UInt64Value(properties);
            };

            /**
             * Encodes the specified UInt64Value message. Does not implicitly {@link google.protobuf.UInt64Value.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.UInt64Value
             * @static
             * @param {google.protobuf.IUInt64Value} message UInt64Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UInt64Value.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.value);
                return writer;
            };

            /**
             * Encodes the specified UInt64Value message, length delimited. Does not implicitly {@link google.protobuf.UInt64Value.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.UInt64Value
             * @static
             * @param {google.protobuf.IUInt64Value} message UInt64Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UInt64Value.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a UInt64Value message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.UInt64Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.UInt64Value} UInt64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UInt64Value.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.UInt64Value();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a UInt64Value message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.UInt64Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.UInt64Value} UInt64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UInt64Value.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a UInt64Value message.
             * @function verify
             * @memberof google.protobuf.UInt64Value
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UInt64Value.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isInteger(message.value) && !(message.value && $util.isInteger(message.value.low) && $util.isInteger(message.value.high)))
                        return "value: integer|Long expected";
                return null;
            };

            /**
             * Creates a UInt64Value message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.UInt64Value
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.UInt64Value} UInt64Value
             */
            UInt64Value.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.UInt64Value)
                    return object;
                let message = new $root.google.protobuf.UInt64Value();
                if (object.value != null)
                    if ($util.Long)
                        (message.value = $util.Long.fromValue(object.value)).unsigned = true;
                    else if (typeof object.value === "string")
                        message.value = parseInt(object.value, 10);
                    else if (typeof object.value === "number")
                        message.value = object.value;
                    else if (typeof object.value === "object")
                        message.value = new $util.LongBits(object.value.low >>> 0, object.value.high >>> 0).toNumber(true);
                return message;
            };

            /**
             * Creates a plain object from a UInt64Value message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.UInt64Value
             * @static
             * @param {google.protobuf.UInt64Value} message UInt64Value
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UInt64Value.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.value = options.longs === String ? "0" : 0;
                if (message.value != null && message.hasOwnProperty("value"))
                    if (typeof message.value === "number")
                        object.value = options.longs === String ? String(message.value) : message.value;
                    else
                        object.value = options.longs === String ? $util.Long.prototype.toString.call(message.value) : options.longs === Number ? new $util.LongBits(message.value.low >>> 0, message.value.high >>> 0).toNumber(true) : message.value;
                return object;
            };

            /**
             * Converts this UInt64Value to JSON.
             * @function toJSON
             * @memberof google.protobuf.UInt64Value
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UInt64Value.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UInt64Value;
        })();

        protobuf.Int32Value = (function() {

            /**
             * Properties of an Int32Value.
             * @memberof google.protobuf
             * @interface IInt32Value
             * @property {number|null} [value] Int32Value value
             */

            /**
             * Constructs a new Int32Value.
             * @memberof google.protobuf
             * @classdesc Represents an Int32Value.
             * @implements IInt32Value
             * @constructor
             * @param {google.protobuf.IInt32Value=} [properties] Properties to set
             */
            function Int32Value(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Int32Value value.
             * @member {number} value
             * @memberof google.protobuf.Int32Value
             * @instance
             */
            Int32Value.prototype.value = 0;

            /**
             * Creates a new Int32Value instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Int32Value
             * @static
             * @param {google.protobuf.IInt32Value=} [properties] Properties to set
             * @returns {google.protobuf.Int32Value} Int32Value instance
             */
            Int32Value.create = function create(properties) {
                return new Int32Value(properties);
            };

            /**
             * Encodes the specified Int32Value message. Does not implicitly {@link google.protobuf.Int32Value.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Int32Value
             * @static
             * @param {google.protobuf.IInt32Value} message Int32Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Int32Value.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.value);
                return writer;
            };

            /**
             * Encodes the specified Int32Value message, length delimited. Does not implicitly {@link google.protobuf.Int32Value.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Int32Value
             * @static
             * @param {google.protobuf.IInt32Value} message Int32Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Int32Value.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Int32Value message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Int32Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Int32Value} Int32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Int32Value.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Int32Value();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Int32Value message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Int32Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Int32Value} Int32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Int32Value.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Int32Value message.
             * @function verify
             * @memberof google.protobuf.Int32Value
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Int32Value.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isInteger(message.value))
                        return "value: integer expected";
                return null;
            };

            /**
             * Creates an Int32Value message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Int32Value
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Int32Value} Int32Value
             */
            Int32Value.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Int32Value)
                    return object;
                let message = new $root.google.protobuf.Int32Value();
                if (object.value != null)
                    message.value = object.value | 0;
                return message;
            };

            /**
             * Creates a plain object from an Int32Value message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Int32Value
             * @static
             * @param {google.protobuf.Int32Value} message Int32Value
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Int32Value.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.value = 0;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = message.value;
                return object;
            };

            /**
             * Converts this Int32Value to JSON.
             * @function toJSON
             * @memberof google.protobuf.Int32Value
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Int32Value.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Int32Value;
        })();

        protobuf.UInt32Value = (function() {

            /**
             * Properties of a UInt32Value.
             * @memberof google.protobuf
             * @interface IUInt32Value
             * @property {number|null} [value] UInt32Value value
             */

            /**
             * Constructs a new UInt32Value.
             * @memberof google.protobuf
             * @classdesc Represents a UInt32Value.
             * @implements IUInt32Value
             * @constructor
             * @param {google.protobuf.IUInt32Value=} [properties] Properties to set
             */
            function UInt32Value(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UInt32Value value.
             * @member {number} value
             * @memberof google.protobuf.UInt32Value
             * @instance
             */
            UInt32Value.prototype.value = 0;

            /**
             * Creates a new UInt32Value instance using the specified properties.
             * @function create
             * @memberof google.protobuf.UInt32Value
             * @static
             * @param {google.protobuf.IUInt32Value=} [properties] Properties to set
             * @returns {google.protobuf.UInt32Value} UInt32Value instance
             */
            UInt32Value.create = function create(properties) {
                return new UInt32Value(properties);
            };

            /**
             * Encodes the specified UInt32Value message. Does not implicitly {@link google.protobuf.UInt32Value.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.UInt32Value
             * @static
             * @param {google.protobuf.IUInt32Value} message UInt32Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UInt32Value.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.value);
                return writer;
            };

            /**
             * Encodes the specified UInt32Value message, length delimited. Does not implicitly {@link google.protobuf.UInt32Value.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.UInt32Value
             * @static
             * @param {google.protobuf.IUInt32Value} message UInt32Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UInt32Value.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a UInt32Value message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.UInt32Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.UInt32Value} UInt32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UInt32Value.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.UInt32Value();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a UInt32Value message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.UInt32Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.UInt32Value} UInt32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UInt32Value.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a UInt32Value message.
             * @function verify
             * @memberof google.protobuf.UInt32Value
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UInt32Value.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isInteger(message.value))
                        return "value: integer expected";
                return null;
            };

            /**
             * Creates a UInt32Value message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.UInt32Value
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.UInt32Value} UInt32Value
             */
            UInt32Value.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.UInt32Value)
                    return object;
                let message = new $root.google.protobuf.UInt32Value();
                if (object.value != null)
                    message.value = object.value >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a UInt32Value message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.UInt32Value
             * @static
             * @param {google.protobuf.UInt32Value} message UInt32Value
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UInt32Value.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.value = 0;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = message.value;
                return object;
            };

            /**
             * Converts this UInt32Value to JSON.
             * @function toJSON
             * @memberof google.protobuf.UInt32Value
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UInt32Value.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UInt32Value;
        })();

        protobuf.BoolValue = (function() {

            /**
             * Properties of a BoolValue.
             * @memberof google.protobuf
             * @interface IBoolValue
             * @property {boolean|null} [value] BoolValue value
             */

            /**
             * Constructs a new BoolValue.
             * @memberof google.protobuf
             * @classdesc Represents a BoolValue.
             * @implements IBoolValue
             * @constructor
             * @param {google.protobuf.IBoolValue=} [properties] Properties to set
             */
            function BoolValue(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BoolValue value.
             * @member {boolean} value
             * @memberof google.protobuf.BoolValue
             * @instance
             */
            BoolValue.prototype.value = false;

            /**
             * Creates a new BoolValue instance using the specified properties.
             * @function create
             * @memberof google.protobuf.BoolValue
             * @static
             * @param {google.protobuf.IBoolValue=} [properties] Properties to set
             * @returns {google.protobuf.BoolValue} BoolValue instance
             */
            BoolValue.create = function create(properties) {
                return new BoolValue(properties);
            };

            /**
             * Encodes the specified BoolValue message. Does not implicitly {@link google.protobuf.BoolValue.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.BoolValue
             * @static
             * @param {google.protobuf.IBoolValue} message BoolValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BoolValue.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.value);
                return writer;
            };

            /**
             * Encodes the specified BoolValue message, length delimited. Does not implicitly {@link google.protobuf.BoolValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.BoolValue
             * @static
             * @param {google.protobuf.IBoolValue} message BoolValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BoolValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a BoolValue message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.BoolValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.BoolValue} BoolValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BoolValue.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.BoolValue();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a BoolValue message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.BoolValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.BoolValue} BoolValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BoolValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BoolValue message.
             * @function verify
             * @memberof google.protobuf.BoolValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BoolValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (typeof message.value !== "boolean")
                        return "value: boolean expected";
                return null;
            };

            /**
             * Creates a BoolValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.BoolValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.BoolValue} BoolValue
             */
            BoolValue.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.BoolValue)
                    return object;
                let message = new $root.google.protobuf.BoolValue();
                if (object.value != null)
                    message.value = Boolean(object.value);
                return message;
            };

            /**
             * Creates a plain object from a BoolValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.BoolValue
             * @static
             * @param {google.protobuf.BoolValue} message BoolValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BoolValue.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.value = false;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = message.value;
                return object;
            };

            /**
             * Converts this BoolValue to JSON.
             * @function toJSON
             * @memberof google.protobuf.BoolValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BoolValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return BoolValue;
        })();

        protobuf.StringValue = (function() {

            /**
             * Properties of a StringValue.
             * @memberof google.protobuf
             * @interface IStringValue
             * @property {string|null} [value] StringValue value
             */

            /**
             * Constructs a new StringValue.
             * @memberof google.protobuf
             * @classdesc Represents a StringValue.
             * @implements IStringValue
             * @constructor
             * @param {google.protobuf.IStringValue=} [properties] Properties to set
             */
            function StringValue(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * StringValue value.
             * @member {string} value
             * @memberof google.protobuf.StringValue
             * @instance
             */
            StringValue.prototype.value = "";

            /**
             * Creates a new StringValue instance using the specified properties.
             * @function create
             * @memberof google.protobuf.StringValue
             * @static
             * @param {google.protobuf.IStringValue=} [properties] Properties to set
             * @returns {google.protobuf.StringValue} StringValue instance
             */
            StringValue.create = function create(properties) {
                return new StringValue(properties);
            };

            /**
             * Encodes the specified StringValue message. Does not implicitly {@link google.protobuf.StringValue.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.StringValue
             * @static
             * @param {google.protobuf.IStringValue} message StringValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StringValue.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.value);
                return writer;
            };

            /**
             * Encodes the specified StringValue message, length delimited. Does not implicitly {@link google.protobuf.StringValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.StringValue
             * @static
             * @param {google.protobuf.IStringValue} message StringValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StringValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StringValue message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.StringValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.StringValue} StringValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StringValue.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.StringValue();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.value = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a StringValue message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.StringValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.StringValue} StringValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StringValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a StringValue message.
             * @function verify
             * @memberof google.protobuf.StringValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StringValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isString(message.value))
                        return "value: string expected";
                return null;
            };

            /**
             * Creates a StringValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.StringValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.StringValue} StringValue
             */
            StringValue.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.StringValue)
                    return object;
                let message = new $root.google.protobuf.StringValue();
                if (object.value != null)
                    message.value = String(object.value);
                return message;
            };

            /**
             * Creates a plain object from a StringValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.StringValue
             * @static
             * @param {google.protobuf.StringValue} message StringValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StringValue.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.value = "";
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = message.value;
                return object;
            };

            /**
             * Converts this StringValue to JSON.
             * @function toJSON
             * @memberof google.protobuf.StringValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StringValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return StringValue;
        })();

        protobuf.BytesValue = (function() {

            /**
             * Properties of a BytesValue.
             * @memberof google.protobuf
             * @interface IBytesValue
             * @property {Uint8Array|null} [value] BytesValue value
             */

            /**
             * Constructs a new BytesValue.
             * @memberof google.protobuf
             * @classdesc Represents a BytesValue.
             * @implements IBytesValue
             * @constructor
             * @param {google.protobuf.IBytesValue=} [properties] Properties to set
             */
            function BytesValue(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BytesValue value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.BytesValue
             * @instance
             */
            BytesValue.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new BytesValue instance using the specified properties.
             * @function create
             * @memberof google.protobuf.BytesValue
             * @static
             * @param {google.protobuf.IBytesValue=} [properties] Properties to set
             * @returns {google.protobuf.BytesValue} BytesValue instance
             */
            BytesValue.create = function create(properties) {
                return new BytesValue(properties);
            };

            /**
             * Encodes the specified BytesValue message. Does not implicitly {@link google.protobuf.BytesValue.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.BytesValue
             * @static
             * @param {google.protobuf.IBytesValue} message BytesValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BytesValue.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified BytesValue message, length delimited. Does not implicitly {@link google.protobuf.BytesValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.BytesValue
             * @static
             * @param {google.protobuf.IBytesValue} message BytesValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BytesValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a BytesValue message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.BytesValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.BytesValue} BytesValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BytesValue.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.BytesValue();
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
             * @memberof google.protobuf.BytesValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.BytesValue} BytesValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BytesValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BytesValue message.
             * @function verify
             * @memberof google.protobuf.BytesValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BytesValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };

            /**
             * Creates a BytesValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.BytesValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.BytesValue} BytesValue
             */
            BytesValue.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.BytesValue)
                    return object;
                let message = new $root.google.protobuf.BytesValue();
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from a BytesValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.BytesValue
             * @static
             * @param {google.protobuf.BytesValue} message BytesValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BytesValue.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.value = options.bytes === String ? "" : [];
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this BytesValue to JSON.
             * @function toJSON
             * @memberof google.protobuf.BytesValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BytesValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return BytesValue;
        })();

        return protobuf;
    })();

    return google;
})();

export { $root as default };
