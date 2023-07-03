interface IFormatResult {
    success: boolean;
    data: any;
}

export const formatResponse = (data: any) : IFormatResult => ({
    success: true,
    data
})