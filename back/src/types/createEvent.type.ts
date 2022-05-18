export type CreateEventType = {
  title: string;
  description: string | undefined | null;
  images: {
      gallery: Array<string> | undefined | null,
      header: string | undefined | null
    }
  isFeatured: Boolean;
  startDate: Date;
  stopDate: Date;
}