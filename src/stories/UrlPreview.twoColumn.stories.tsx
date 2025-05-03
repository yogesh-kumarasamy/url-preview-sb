import { Meta, StoryObj } from "@storybook/react";
import {
  token,
  getMetaDataEndpoint,
  CopyAction,
  ShareAction,
  AddToLearn,
} from "../util";
import { UrlPreview } from "../url-preview/TwoColumnLayout";
import {
  AdaptiveUFilledIcon,
  AdaptiveUIcon,
  ClipboardCopyIcon,
  ShareIcon,
} from "@adaptavant/eds-core";
const meta = {
  component: UrlPreview,
  title: "UrlPreview/Two Column Visual States",
  tags: ["autodocs"],
  args: {
    accessToken: token,
    metadataApiUrl: getMetaDataEndpoint("staging"),
    actionPillOptions: [
      {
        id: "copy",
        popOverText: "Copy",
        icons: { initialState: ClipboardCopyIcon },
        clickHandler: ({
          metaData,
          clickedActionPillOption,
          updatePopoverText,
        }) => {
          CopyAction({
            metaData,
            clickedActionPillOption,
            updatePopoverText,
          });
        },
      },
      {
        id: "share",
        popOverText: "Share",
        icons: { initialState: ShareIcon },
        clickHandler: ({ metaData }) => {
          ShareAction(metaData);
        },
      },
      {
        id: "addToLearn",
        popOverText: "Add To Learn",
        icons: {
          initialState: AdaptiveUIcon,
          successState: AdaptiveUFilledIcon,
        },
        clickHandler: ({
          metaData,
          clickedActionPillOption,
          updatePopoverText,
          updateSuccessStateForIconSwap,
        }) => {
          AddToLearn({
            metaData,
            clickedActionPillOption,
            updatePopoverText,
            updateSuccessStateForIconSwap,
          });
        },
        onlyShow: (metaData) => Boolean(metaData.adaptiveuMeta),
      },
    ],
  },
} satisfies Meta<typeof UrlPreview>;
export default meta;
type Story = StoryObj<typeof meta>;

export const UrlPreviewWithPortraitImage: Story = {
  name: "With Portrait Image",
  args: {
    previewUrl: "https://portraitimage.com",
  },
};
export const UrlPreviewWithSquareImage: Story = {
  name: "With Square Image",
  args: {
    previewUrl: "https://squareimage.com",
  },
};
export const UrlPreviewWithAdaptiveUContent: Story = {
  name: "AdaptiveU Square Image: Less Content",
  args: {
    previewUrl:
      "https://anywhere.adaptiveu.io/anywhereworks/link/ep-90-how-to-figure-out-your-future-with-worldrenowned-life-coach-marie-forleo-working-hard-hardly-working-podcast-on-spotify",
  },
};
