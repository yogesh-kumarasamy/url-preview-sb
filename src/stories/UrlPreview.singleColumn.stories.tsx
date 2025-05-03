import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import {
  token,
  getMetaDataEndpoint,
  CopyAction,
  ShareAction,
  AddToLearn,
} from "../util";

declare global {
  interface Window {
    token?: string;
  }
}
import { UrlPreview } from "../url-preview";
import {
  AdaptiveUFilledIcon,
  AdaptiveUIcon,
  ClipboardCopyIcon,
  ShareIcon,
} from "@adaptavant/eds-core";
const meta = {
  component: UrlPreview,
  title: "UrlPreview/Single Column Visual States",
  tags: ["autodocs"],
  args: {
    accessToken: window?.token || token,
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
export const LoadingState: Story = {
  args: {
    previewUrl: "",
    accessToken: "",
  },
};
export const UrlPreviewNoImage: Story = {
  name: "NoImageVideoContent",
  args: {
    previewUrl: "https://noimage.com",
  },
};
export const UrlPreviewNoDesc: Story = {
  name: "NoDescription",
  args: {
    previewUrl: "https://nodescription.com",
  },
};
export const UrlPreviewWithoutAddToLearnButton: Story = {
  name: "Action Pill: Non AdaptiveU Content",
  args: {
    previewUrl: "https://nonadativeucontent.com",
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Adjust this selector to target the correct element
    const previewEl = await canvas.findByTestId("hover-target");

    await userEvent.hover(previewEl);
  },
};
export const UrlPreviewWithAddToLearnButton: Story = {
  name: "Action Pill: AdaptiveU Content",
  args: {
    previewUrl: "https://adativeucontent.com",
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Adjust this selector to target the correct element
    const previewEl = await canvas.findByTestId("hover-target");

    await userEvent.hover(previewEl);
  },
};

export const ActionPillWithoutImage: Story = {
  name: "Action Pill: No Image Preview",
  args: {
    previewUrl: "https://noimage.com",
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Adjust this selector to target the correct element
    const previewEl = await canvas.findByTestId("hover-target");

    await userEvent.hover(previewEl);
  },
};
export const ActionPillWithoutPreview: Story = {
  name: "Action Pill: No Preview",
  args: {
    previewUrl: "https://nopreview.com",
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Adjust this selector to target the correct element
    const previewEl = await canvas.findByTestId("hover-target");

    await userEvent.hover(previewEl);
  },
};
export const ActionPillCopyHover: Story = {
  name: "Action Pill: Copy Hover",
  args: {
    previewUrl: "https://adativeucontent.com",
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Adjust this selector to target the correct element
    const previewEl = await canvas.findByTestId("hover-target");

    await userEvent.hover(previewEl);
    const copy = await canvas.findByTestId("action-pill-icon-copy");
    await userEvent.hover(copy);
  },
};
export const ActionPillCopyClicked: Story = {
  name: "Action Pill: Copy Clicked",
  args: {
    previewUrl: "https://adativeucontent.com",
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Adjust this selector to target the correct element
    // Adjust this selector to target the correct element
    const previewEl = await canvas.findByTestId("hover-target");

    await userEvent.hover(previewEl);
    const copy = await canvas.findByTestId("action-pill-icon-copy");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await userEvent.click(copy);
  },
};
export const ActionPillShareHover: Story = {
  name: "Action Pill: Share Hover",
  args: {
    previewUrl: "https://adativeucontent.com",
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Adjust this selector to target the correct element
    const previewEl = await canvas.findByTestId("hover-target");

    await userEvent.hover(previewEl);
    const share = await canvas.findByTestId("action-pill-icon-share");
    await userEvent.hover(share);
  },
};
export const ActionPillAddToLearnHover: Story = {
  name: "Action Pill: Add to Learn Hover",
  args: {
    previewUrl: "https://adativeucontent.com",
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Adjust this selector to target the correct element
    const previewEl = await canvas.findByTestId("hover-target");

    await userEvent.hover(previewEl);
    const addToLearn = await canvas.findByTestId("action-pill-icon-addToLearn");
    await userEvent.hover(addToLearn);
  },
};
export const ActionPillAddToLearnClicked: Story = {
  name: "Action Pill: Add to Learn Clicked",
  args: {
    previewUrl: "https://adativeucontent.com",
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Adjust this selector to target the correct element
    const previewEl = await canvas.findByTestId("hover-target");

    await userEvent.hover(previewEl);
    const addToLearn = await canvas.findByTestId("action-pill-icon-addToLearn");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    await userEvent.click(addToLearn);
  },
};
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
export const UrlPreviewWithLandscapeImage: Story = {
  name: "With Landscape Image",
  args: {
    previewUrl: "https://landscapeimage.com",
  },
};
export const UrlPreviewWithLongTitle: Story = {
  name: "With Long Title Description and Link Texts",
  args: {
    previewUrl: "https://longtext.com",
  },
};
export const UrlPreviewForTeleport: Story = {
  name: "Video Preview: Teleport Without Play Icon",
  args: {
    previewUrl: "https://teleport.video/video/message/v1/fG0QJcIPv6YQ",
  },
};
export const UrlPreviewForYoutube: Story = {
  name: "Video Preview: Youtube Without Play Icon",
  args: {
    previewUrl: "https://www.youtube.com/watch?v=Nob0PasRbGg",
  },
};
export const UrlPreviewForLoom: Story = {
  name: "Video Preview: Loom Without Play Icon",
  args: {
    previewUrl: "https://www.loom.com/share/3fac3d8a5108484bbce3ffaba7aef9cd",
  },
};
export const UrlPreviewForVimeo: Story = {
  name: "Video Preview: Vimeo Without Play Icon",
  args: {
    previewUrl: "https://vimeo.com/76979871",
  },
};
export const UrlPreviewForGoogleMeet: Story = {
  name: "Preview: Google Meet",
  args: {
    previewUrl: "https://meet.google.com/evb-xogq-sqv",
  },
};
export const UrlPreviewWithoutPreview: Story = {
  name: "No Preview",
  args: {
    previewUrl: "https://nopreview.com",
  },
};
export const UrlPreviewWithoutActionPill: Story = {
  name: "Hidden Action Pill: In Share Link popup",
  args: {
    previewUrl: "https://nodescription.com",
    hiddenPreviewElements: {
      actionPill: true,
    },
  },
};
