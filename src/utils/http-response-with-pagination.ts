interface HttpResponseWithPagination<T> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    status: string;

    [key: string]: T;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    from: number;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    to: number;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    totalCount: number;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    totalPages: number;
}

export default HttpResponseWithPagination;

