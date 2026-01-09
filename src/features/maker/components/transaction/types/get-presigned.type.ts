export interface GetPresignedUrlsResponse {
  message: string;
  urls: { s3_key: string; presigned_url: string }[];
  expires_in: number;
}
