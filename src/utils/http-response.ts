interface HttpResponse<T> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    status: string;

    [key: string]: T;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    count?: number;
}

export default HttpResponse;

