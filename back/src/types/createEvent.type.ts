export type CreateEventType = {
  title: string;
  description: string | undefined | null;
  images: {
    gallery: Object | undefined | null;
    header: Object | undefined | null;
  };
  isFeatured: Boolean;
  startDate: Date;
  stopDate: Date;
};