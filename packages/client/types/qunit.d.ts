
interface Assert {
  currentUrl(
    expectedUrl: string,
    expectedQueryParams?: {
      [key: string]: string
    }
  ): void;
}
