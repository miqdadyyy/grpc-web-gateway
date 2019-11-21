import * as $protobuf from "protobufjs";
/** Status enum. */
namespace Status {

    /** UNKNOWN value */
    let UNKNOWN: number;

    /** OK value */
    let OK: number;

    /** CANCELLED value */
    let CANCELLED: number;

    /** INVALID_ARGUMENT value */
    let INVALID_ARGUMENT: number;

    /** DEADLINE_EXCEEDED value */
    let DEADLINE_EXCEEDED: number;

    /** NOT_FOUND value */
    let NOT_FOUND: number;

    /** ALREADY_EXISTS value */
    let ALREADY_EXISTS: number;

    /** PERMISSION_DENIED value */
    let PERMISSION_DENIED: number;

    /** UNAUTHENTICATED value */
    let UNAUTHENTICATED: number;

    /** RESOURCE_EXHAUSTED value */
    let RESOURCE_EXHAUSTED: number;

    /** FAILED_PRECONDITION value */
    let FAILED_PRECONDITION: number;

    /** ABORTED value */
    let ABORTED: number;

    /** OUT_OF_RANGE value */
    let OUT_OF_RANGE: number;

    /** UNIMPLEMENTED value */
    let UNIMPLEMENTED: number;

    /** INTERNAL value */
    let INTERNAL: number;

    /** UNAVAILABLE value */
    let UNAVAILABLE: number;

    /** DATA_LOSS value */
    let DATA_LOSS: number;
}

/** Represents a ServiceRequestBody. */
export class ServiceRequestBody implements IServiceRequestBody {

    /**
     * Constructs a new ServiceRequestBody.
     * @param [properties] Properties to set
     */
    constructor(properties?: IServiceRequestBody);

    /** ServiceRequestBody ping. */
    public ping?: (IPing|null);

    /** ServiceRequestBody pong. */
    public pong?: (IPong|null);

    /** ServiceRequestBody body. */
    public body?: ("ping"|"pong");

    /**
     * Creates a new ServiceRequestBody instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ServiceRequestBody instance
     */
    public static create(properties?: IServiceRequestBody): ServiceRequestBody;

    /**
     * Encodes the specified ServiceRequestBody message. Does not implicitly {@link ServiceRequestBody.verify|verify} messages.
     * @param message ServiceRequestBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IServiceRequestBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ServiceRequestBody message, length delimited. Does not implicitly {@link ServiceRequestBody.verify|verify} messages.
     * @param message ServiceRequestBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IServiceRequestBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ServiceRequestBody message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ServiceRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ServiceRequestBody;

    /**
     * Decodes a ServiceRequestBody message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ServiceRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ServiceRequestBody;

    /**
     * Verifies a ServiceRequestBody message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ServiceRequestBody message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ServiceRequestBody
     */
    public static fromObject(object: { [k: string]: any }): ServiceRequestBody;

    /**
     * Creates a plain object from a ServiceRequestBody message. Also converts values to other types if specified.
     * @param message ServiceRequestBody
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ServiceRequestBody, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ServiceRequestBody to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Ping. */
export class Ping implements IPing {

    /**
     * Constructs a new Ping.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPing);

    /**
     * Creates a new Ping instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Ping instance
     */
    public static create(properties?: IPing): Ping;

    /**
     * Encodes the specified Ping message. Does not implicitly {@link Ping.verify|verify} messages.
     * @param message Ping message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPing, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Ping message, length delimited. Does not implicitly {@link Ping.verify|verify} messages.
     * @param message Ping message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPing, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Ping message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Ping;

    /**
     * Decodes a Ping message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Ping;

    /**
     * Verifies a Ping message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Ping message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Ping
     */
    public static fromObject(object: { [k: string]: any }): Ping;

    /**
     * Creates a plain object from a Ping message. Also converts values to other types if specified.
     * @param message Ping
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Ping, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Ping to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Pong. */
export class Pong implements IPong {

    /**
     * Constructs a new Pong.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPong);

    /**
     * Creates a new Pong instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Pong instance
     */
    public static create(properties?: IPong): Pong;

    /**
     * Encodes the specified Pong message. Does not implicitly {@link Pong.verify|verify} messages.
     * @param message Pong message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPong, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Pong message, length delimited. Does not implicitly {@link Pong.verify|verify} messages.
     * @param message Pong message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPong, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Pong message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Pong
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Pong;

    /**
     * Decodes a Pong message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Pong
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Pong;

    /**
     * Verifies a Pong message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Pong message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Pong
     */
    public static fromObject(object: { [k: string]: any }): Pong;

    /**
     * Creates a plain object from a Pong message. Also converts values to other types if specified.
     * @param message Pong
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Pong, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Pong to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Request. */
export class Request implements IRequest {

    /**
     * Constructs a new Request.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRequest);

    /** Request id. */
    public id: string;

    /** Request unary. */
    public unary?: (IUnaryRequestBody|null);

    /** Request stream. */
    public stream?: (IStreamRequestBody|null);

    /** Request push. */
    public push?: (IPushRequestBody|null);

    /** Request end. */
    public end?: (IEndRequestBody|null);

    /** Request cancel. */
    public cancel?: (ICancelRequestBody|null);

    /** Request service. */
    public service?: (IServiceRequestBody|null);

    /** Request body. */
    public body?: ("unary"|"stream"|"push"|"end"|"cancel"|"service");

    /**
     * Creates a new Request instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Request instance
     */
    public static create(properties?: IRequest): Request;

    /**
     * Encodes the specified Request message. Does not implicitly {@link Request.verify|verify} messages.
     * @param message Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Request message, length delimited. Does not implicitly {@link Request.verify|verify} messages.
     * @param message Request message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Request message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Request;

    /**
     * Decodes a Request message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Request
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Request;

    /**
     * Verifies a Request message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Request message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Request
     */
    public static fromObject(object: { [k: string]: any }): Request;

    /**
     * Creates a plain object from a Request message. Also converts values to other types if specified.
     * @param message Request
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Request to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** ResponseType enum. */
namespace ResponseType {

    /** UNKNOWN value */
    let UNKNOWN: number;

    /** UNARY value */
    let UNARY: number;

    /** STREAM value */
    let STREAM: number;
}

/** Represents an UnaryRequestBody. */
export class UnaryRequestBody implements IUnaryRequestBody {

    /**
     * Constructs a new UnaryRequestBody.
     * @param [properties] Properties to set
     */
    constructor(properties?: IUnaryRequestBody);

    /** UnaryRequestBody service. */
    public service: string;

    /** UnaryRequestBody method. */
    public method: string;

    /** UnaryRequestBody payload. */
    public payload: Uint8Array;

    /** UnaryRequestBody metadata. */
    public metadata: { [k: string]: string };

    /** UnaryRequestBody responseType. */
    public responseType: ResponseType;

    /**
     * Creates a new UnaryRequestBody instance using the specified properties.
     * @param [properties] Properties to set
     * @returns UnaryRequestBody instance
     */
    public static create(properties?: IUnaryRequestBody): UnaryRequestBody;

    /**
     * Encodes the specified UnaryRequestBody message. Does not implicitly {@link UnaryRequestBody.verify|verify} messages.
     * @param message UnaryRequestBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IUnaryRequestBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified UnaryRequestBody message, length delimited. Does not implicitly {@link UnaryRequestBody.verify|verify} messages.
     * @param message UnaryRequestBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IUnaryRequestBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an UnaryRequestBody message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns UnaryRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UnaryRequestBody;

    /**
     * Decodes an UnaryRequestBody message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns UnaryRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UnaryRequestBody;

    /**
     * Verifies an UnaryRequestBody message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an UnaryRequestBody message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns UnaryRequestBody
     */
    public static fromObject(object: { [k: string]: any }): UnaryRequestBody;

    /**
     * Creates a plain object from an UnaryRequestBody message. Also converts values to other types if specified.
     * @param message UnaryRequestBody
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: UnaryRequestBody, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this UnaryRequestBody to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a StreamRequestBody. */
export class StreamRequestBody implements IStreamRequestBody {

    /**
     * Constructs a new StreamRequestBody.
     * @param [properties] Properties to set
     */
    constructor(properties?: IStreamRequestBody);

    /** StreamRequestBody service. */
    public service: string;

    /** StreamRequestBody method. */
    public method: string;

    /** StreamRequestBody metadata. */
    public metadata: { [k: string]: string };

    /** StreamRequestBody responseType. */
    public responseType: ResponseType;

    /**
     * Creates a new StreamRequestBody instance using the specified properties.
     * @param [properties] Properties to set
     * @returns StreamRequestBody instance
     */
    public static create(properties?: IStreamRequestBody): StreamRequestBody;

    /**
     * Encodes the specified StreamRequestBody message. Does not implicitly {@link StreamRequestBody.verify|verify} messages.
     * @param message StreamRequestBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IStreamRequestBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified StreamRequestBody message, length delimited. Does not implicitly {@link StreamRequestBody.verify|verify} messages.
     * @param message StreamRequestBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IStreamRequestBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a StreamRequestBody message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns StreamRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StreamRequestBody;

    /**
     * Decodes a StreamRequestBody message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns StreamRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StreamRequestBody;

    /**
     * Verifies a StreamRequestBody message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a StreamRequestBody message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns StreamRequestBody
     */
    public static fromObject(object: { [k: string]: any }): StreamRequestBody;

    /**
     * Creates a plain object from a StreamRequestBody message. Also converts values to other types if specified.
     * @param message StreamRequestBody
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: StreamRequestBody, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this StreamRequestBody to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a PushRequestBody. */
export class PushRequestBody implements IPushRequestBody {

    /**
     * Constructs a new PushRequestBody.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPushRequestBody);

    /** PushRequestBody payload. */
    public payload: Uint8Array;

    /** PushRequestBody metadata. */
    public metadata: { [k: string]: string };

    /**
     * Creates a new PushRequestBody instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PushRequestBody instance
     */
    public static create(properties?: IPushRequestBody): PushRequestBody;

    /**
     * Encodes the specified PushRequestBody message. Does not implicitly {@link PushRequestBody.verify|verify} messages.
     * @param message PushRequestBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPushRequestBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PushRequestBody message, length delimited. Does not implicitly {@link PushRequestBody.verify|verify} messages.
     * @param message PushRequestBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPushRequestBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PushRequestBody message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PushRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PushRequestBody;

    /**
     * Decodes a PushRequestBody message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PushRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PushRequestBody;

    /**
     * Verifies a PushRequestBody message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PushRequestBody message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PushRequestBody
     */
    public static fromObject(object: { [k: string]: any }): PushRequestBody;

    /**
     * Creates a plain object from a PushRequestBody message. Also converts values to other types if specified.
     * @param message PushRequestBody
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PushRequestBody, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PushRequestBody to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an EndRequestBody. */
export class EndRequestBody implements IEndRequestBody {

    /**
     * Constructs a new EndRequestBody.
     * @param [properties] Properties to set
     */
    constructor(properties?: IEndRequestBody);

    /**
     * Creates a new EndRequestBody instance using the specified properties.
     * @param [properties] Properties to set
     * @returns EndRequestBody instance
     */
    public static create(properties?: IEndRequestBody): EndRequestBody;

    /**
     * Encodes the specified EndRequestBody message. Does not implicitly {@link EndRequestBody.verify|verify} messages.
     * @param message EndRequestBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IEndRequestBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified EndRequestBody message, length delimited. Does not implicitly {@link EndRequestBody.verify|verify} messages.
     * @param message EndRequestBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IEndRequestBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an EndRequestBody message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns EndRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): EndRequestBody;

    /**
     * Decodes an EndRequestBody message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns EndRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): EndRequestBody;

    /**
     * Verifies an EndRequestBody message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an EndRequestBody message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns EndRequestBody
     */
    public static fromObject(object: { [k: string]: any }): EndRequestBody;

    /**
     * Creates a plain object from an EndRequestBody message. Also converts values to other types if specified.
     * @param message EndRequestBody
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: EndRequestBody, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this EndRequestBody to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a CancelRequestBody. */
export class CancelRequestBody implements ICancelRequestBody {

    /**
     * Constructs a new CancelRequestBody.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICancelRequestBody);

    /** CancelRequestBody reason. */
    public reason: string;

    /**
     * Creates a new CancelRequestBody instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CancelRequestBody instance
     */
    public static create(properties?: ICancelRequestBody): CancelRequestBody;

    /**
     * Encodes the specified CancelRequestBody message. Does not implicitly {@link CancelRequestBody.verify|verify} messages.
     * @param message CancelRequestBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICancelRequestBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CancelRequestBody message, length delimited. Does not implicitly {@link CancelRequestBody.verify|verify} messages.
     * @param message CancelRequestBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICancelRequestBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CancelRequestBody message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CancelRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CancelRequestBody;

    /**
     * Decodes a CancelRequestBody message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CancelRequestBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CancelRequestBody;

    /**
     * Verifies a CancelRequestBody message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CancelRequestBody message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CancelRequestBody
     */
    public static fromObject(object: { [k: string]: any }): CancelRequestBody;

    /**
     * Creates a plain object from a CancelRequestBody message. Also converts values to other types if specified.
     * @param message CancelRequestBody
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CancelRequestBody, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CancelRequestBody to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a Response. */
export class Response implements IResponse {

    /**
     * Constructs a new Response.
     * @param [properties] Properties to set
     */
    constructor(properties?: IResponse);

    /** Response id. */
    public id: string;

    /** Response unary. */
    public unary?: (IUnaryResponseBody|null);

    /** Response push. */
    public push?: (IPushResponseBody|null);

    /** Response end. */
    public end?: (IEndResponseBody|null);

    /** Response error. */
    public error?: (IErrorResponseBody|null);

    /** Response body. */
    public body?: ("unary"|"push"|"end"|"error");

    /**
     * Creates a new Response instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Response instance
     */
    public static create(properties?: IResponse): Response;

    /**
     * Encodes the specified Response message. Does not implicitly {@link Response.verify|verify} messages.
     * @param message Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Response message, length delimited. Does not implicitly {@link Response.verify|verify} messages.
     * @param message Response message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Response message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Response;

    /**
     * Decodes a Response message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Response
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Response;

    /**
     * Verifies a Response message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Response message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Response
     */
    public static fromObject(object: { [k: string]: any }): Response;

    /**
     * Creates a plain object from a Response message. Also converts values to other types if specified.
     * @param message Response
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Response to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an UnaryResponseBody. */
export class UnaryResponseBody implements IUnaryResponseBody {

    /**
     * Constructs a new UnaryResponseBody.
     * @param [properties] Properties to set
     */
    constructor(properties?: IUnaryResponseBody);

    /** UnaryResponseBody payload. */
    public payload: Uint8Array;

    /**
     * Creates a new UnaryResponseBody instance using the specified properties.
     * @param [properties] Properties to set
     * @returns UnaryResponseBody instance
     */
    public static create(properties?: IUnaryResponseBody): UnaryResponseBody;

    /**
     * Encodes the specified UnaryResponseBody message. Does not implicitly {@link UnaryResponseBody.verify|verify} messages.
     * @param message UnaryResponseBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IUnaryResponseBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified UnaryResponseBody message, length delimited. Does not implicitly {@link UnaryResponseBody.verify|verify} messages.
     * @param message UnaryResponseBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IUnaryResponseBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an UnaryResponseBody message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns UnaryResponseBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UnaryResponseBody;

    /**
     * Decodes an UnaryResponseBody message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns UnaryResponseBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UnaryResponseBody;

    /**
     * Verifies an UnaryResponseBody message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an UnaryResponseBody message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns UnaryResponseBody
     */
    public static fromObject(object: { [k: string]: any }): UnaryResponseBody;

    /**
     * Creates a plain object from an UnaryResponseBody message. Also converts values to other types if specified.
     * @param message UnaryResponseBody
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: UnaryResponseBody, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this UnaryResponseBody to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents a PushResponseBody. */
export class PushResponseBody implements IPushResponseBody {

    /**
     * Constructs a new PushResponseBody.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPushResponseBody);

    /** PushResponseBody payload. */
    public payload: Uint8Array;

    /**
     * Creates a new PushResponseBody instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PushResponseBody instance
     */
    public static create(properties?: IPushResponseBody): PushResponseBody;

    /**
     * Encodes the specified PushResponseBody message. Does not implicitly {@link PushResponseBody.verify|verify} messages.
     * @param message PushResponseBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPushResponseBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PushResponseBody message, length delimited. Does not implicitly {@link PushResponseBody.verify|verify} messages.
     * @param message PushResponseBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPushResponseBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PushResponseBody message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PushResponseBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PushResponseBody;

    /**
     * Decodes a PushResponseBody message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PushResponseBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PushResponseBody;

    /**
     * Verifies a PushResponseBody message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PushResponseBody message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PushResponseBody
     */
    public static fromObject(object: { [k: string]: any }): PushResponseBody;

    /**
     * Creates a plain object from a PushResponseBody message. Also converts values to other types if specified.
     * @param message PushResponseBody
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PushResponseBody, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PushResponseBody to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an EndResponseBody. */
export class EndResponseBody implements IEndResponseBody {

    /**
     * Constructs a new EndResponseBody.
     * @param [properties] Properties to set
     */
    constructor(properties?: IEndResponseBody);

    /**
     * Creates a new EndResponseBody instance using the specified properties.
     * @param [properties] Properties to set
     * @returns EndResponseBody instance
     */
    public static create(properties?: IEndResponseBody): EndResponseBody;

    /**
     * Encodes the specified EndResponseBody message. Does not implicitly {@link EndResponseBody.verify|verify} messages.
     * @param message EndResponseBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IEndResponseBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified EndResponseBody message, length delimited. Does not implicitly {@link EndResponseBody.verify|verify} messages.
     * @param message EndResponseBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IEndResponseBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an EndResponseBody message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns EndResponseBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): EndResponseBody;

    /**
     * Decodes an EndResponseBody message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns EndResponseBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): EndResponseBody;

    /**
     * Verifies an EndResponseBody message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an EndResponseBody message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns EndResponseBody
     */
    public static fromObject(object: { [k: string]: any }): EndResponseBody;

    /**
     * Creates a plain object from an EndResponseBody message. Also converts values to other types if specified.
     * @param message EndResponseBody
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: EndResponseBody, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this EndResponseBody to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Represents an ErrorResponseBody. */
export class ErrorResponseBody implements IErrorResponseBody {

    /**
     * Constructs a new ErrorResponseBody.
     * @param [properties] Properties to set
     */
    constructor(properties?: IErrorResponseBody);

    /** ErrorResponseBody status. */
    public status: Status;

    /** ErrorResponseBody message. */
    public message: string;

    /** ErrorResponseBody metadata. */
    public metadata: { [k: string]: string };

    /**
     * Creates a new ErrorResponseBody instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ErrorResponseBody instance
     */
    public static create(properties?: IErrorResponseBody): ErrorResponseBody;

    /**
     * Encodes the specified ErrorResponseBody message. Does not implicitly {@link ErrorResponseBody.verify|verify} messages.
     * @param message ErrorResponseBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IErrorResponseBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ErrorResponseBody message, length delimited. Does not implicitly {@link ErrorResponseBody.verify|verify} messages.
     * @param message ErrorResponseBody message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IErrorResponseBody, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ErrorResponseBody message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ErrorResponseBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ErrorResponseBody;

    /**
     * Decodes an ErrorResponseBody message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ErrorResponseBody
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ErrorResponseBody;

    /**
     * Verifies an ErrorResponseBody message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ErrorResponseBody message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ErrorResponseBody
     */
    public static fromObject(object: { [k: string]: any }): ErrorResponseBody;

    /**
     * Creates a plain object from an ErrorResponseBody message. Also converts values to other types if specified.
     * @param message ErrorResponseBody
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ErrorResponseBody, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ErrorResponseBody to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
