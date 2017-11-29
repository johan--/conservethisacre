export class Response<T> {
    /**
     * Flags if response was successfull
     */
    ok: boolean;

    /**
     * Response status code. 200 - is for OK
     */
    status: number;

    /**
     * If response was not ok, contains error message
     */
    message?: string;

    /**
     * Data response containse (for OK responses)
     */
    data?: T;


    /**
     * Creates response that contains information about error
     */
    static error<T>(status: number, message: string) : Response<T> {
        return {ok: false, status, message, data : null};
    }

    /**
     * Creates response that contains information about error
     */
    static success<T>(data: T) : Response<T> {
        return {ok: true, status : 200, data};
    }
}