import {
  AdaptiveUFilledIcon,
  AdaptiveUIcon,
  ClipboardCopyIcon,
  ShareIcon,
} from "@adaptavant/eds-core";
import { AddToLearn, CopyAction, ShareAction } from "../util";
import { ActionPillOptions } from "./types";

export const copyAction: ActionPillOptions = {
  id: "copy",
  popOverText: "Copy",
  icons: { initialState: ClipboardCopyIcon },
  clickHandler: ({ metaData, clickedActionPillOption, updatePopoverText }) => {
    CopyAction({
      metaData,
      clickedActionPillOption,
      updatePopoverText,
    });
  },
};
export const shareAction: ActionPillOptions = {
  id: "share",
  popOverText: "Share",
  icons: { initialState: ShareIcon },
  clickHandler: ({ metaData }) => {
    ShareAction(metaData);
  },
};
export const addToLearnAction: ActionPillOptions = {
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
};

export const actionPillOptions: ActionPillOptions[] = [
  copyAction,
  shareAction,
  addToLearnAction,
];
