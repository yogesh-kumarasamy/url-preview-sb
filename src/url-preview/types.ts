import type { IconProps } from "@adaptavant/eds-core";

// AdaptiveUMeta holds the nested meta information from AdaptiveU
export interface AdaptiveUMeta {
  type: string;
  title: string;
  university: string;
}
export interface UrlMetaData {
  imageUrl: string;
  requestUrl?: string;
  url: string;
  urlType?: string; // TEXT | VIDEO | PAGE | IMAGE
  title: string;
  desc: string;
  baseUri: string;
  fileName?: string;
  source: string;
  iconSrc: string;
  adaptiveuMeta: AdaptiveUMeta;
}

export interface UrlPreviewData {
  imageUrl: string;
  url: string;
  title: string;
  desc: string;
  source: string;
  iconSrc: string;
  adaptiveuMeta?: AdaptiveUMeta;
}

export enum UrlPreviewType {
  VIDEO = "VIDEO",
  PAGE = "PAGE",
  IMAGE = "IMAGE",
}

export type Orientation = "square" | "portrait" | "landscape" | null;

// The complete response shape is an object having a 'urlMeta' property
export interface UrlMetaResponse {
  ok: boolean;
  data?: {
    urlMeta: Record<string, UrlMetaData>;
  };
}
export interface UrlMetaErrorResponse {
  ok: boolean;
  errors: [
    {
      code: string;
      message: string;
    }
  ];
}

export interface HiddenPreviewElements {
  actionPill?: boolean;
}
export interface ClickHandlerParams {
  metaData: UrlPreviewData;
  clickedActionPillOption?: ActionPillOptions;
  updatePopoverText?: UpdatePopoverText;
  updateSuccessStateForIconSwap?: UpdateSuccessForIconSwap;
  event?: React.MouseEvent<HTMLDivElement>;
}
export interface ActionPillOptions {
  id: string;
  icons: {
    initialState: (props: IconProps) => React.ReactNode;
    successState?: (props: IconProps) => React.ReactNode;
  };
  popOverText: string;
  clickHandler: (params: ClickHandlerParams) => void;
  onlyShow?: (metaData: UrlPreviewData) => boolean;
}
export interface UrlPreviewCompProps {
  previewUrl: string;
  accessToken: string;
  metadataApiUrl: string;
  hiddenPreviewElements?: HiddenPreviewElements;
  actionPillOptions: ActionPillOptions[];
}
export interface PreviewCompProps {
  metaData: UrlPreviewData;
  imageContainerClass?: string;
  hiddenPreviewElements?: HiddenPreviewElements;
  actionPillOptions: ActionPillOptions[];
}
export interface FallbackPreviewCompProps {
  previewUrl: string;
  hiddenPreviewElements?: HiddenPreviewElements;
  actionPillOptions: ActionPillOptions[];
}
export type ActionPopOverText = Record<string, string>;
export type ActionIconSuccess = Record<string, boolean>;

export interface ActionPillProps {
  metaData: UrlPreviewData;
  actionPillOptions?: ActionPillOptions[];
  className?: string;
}
export type UpdatePopoverText = (id: string, newText: string) => void;
export type UpdateSuccessForIconSwap = (id: string, isSuccess: boolean) => void;
