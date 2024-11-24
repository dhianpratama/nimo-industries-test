import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class GetSearchHistoryResponseDto {
    @IsString()
    searchQuery!: string

    @IsNumber()
    @IsOptional()
    result?: number;

	@IsString()
	status!: string;

    @IsDate()
    timestamp!: Date;

    static factory(searchQuery: string, result: number, status: string, timestamp: Date): GetSearchHistoryResponseDto {
		const response = new GetSearchHistoryResponseDto();
		response.searchQuery = searchQuery;
        response.result = result;
        response.status = status;
        response.timestamp = timestamp;
		return response;
	}
}