import type {
  UrlPreviewData,
  UpdatePopoverText,
  UpdateSuccessForIconSwap,
  ActionPillOptions,
} from "./url-preview/types";
export const URL_PREVIEW_CONSTANTS = {
  STAGING_URL:
    "https://api-dot-staging-fullspectrum.appspot.com/api/v2/util/url/meta",
  PRODUCTION_URL: "https://api.anywhereworks.com/api/v2/util/url/meta",
};

export const token: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImQxNzJhY2MxMDJjMGRhYWQzNThiZmM5ZDYwZWEyMWJhOWVjY2I2ZWUifQ.eyJpc3MiOiJodHRwczovL2FueXdoZXJlLnN0YWdpbmcuYW55d2hlcmVhdXRoLmNvbSIsImlhdCI6MTc0NjE3MTYwMywicHJval9pZCI6InNldG1vcmUiLCJ0eXBlIjoidXNlciIsInN1YiI6Ilk4UVJhNmFPcW82U3VCcFFWT1JSSnB4d1oxckN3SHlRIiwiZXhwIjoxNzQ2Nzc2NDAzLCJqdGkiOiIyOWZlZmJSYTYxVkM0MkFzIn0.SjRtVaLY8aQxbpVZk35Hj8XcKtCg1hqYKwPpVJD_Zj5YhC-Rv7G_wi5oWr7AQCtqMU02WHXqOioTwGPyswiz7XedfBlY1mfSxwsBQ9UuU3rldGE6ugHwWY1tvSKIdMOTbwGePs264UHy_PDFUiYgqR30X63waMwj_vdEK-hF_9hIXRj1JVSFofiG6axXRvYTLYjzxdpN3obN8rSq-nxbPfAJgxZQiI8VvA6OPTQ52lYtXDjAVoRQ6fNxSqUw4gG0Ujx3LerKQcEMDgeUZDRdRPjARy-DyugQ6xH3L6V-Qd0-GjT7MFCTz3vlmsxOSOYAlu9fJE55uHo0ScrfUg-tAQ";

const environment = {
  staging: URL_PREVIEW_CONSTANTS.STAGING_URL,
  production: URL_PREVIEW_CONSTANTS.PRODUCTION_URL,
};

export const getMetaDataEndpoint = (env: "staging" | "production"): string =>
  environment[env];

/**
 * Copies the given text to the clipboard.
 * This implementation uses the latest Clipboard API available in modern browsers.
 *
 * @param {string} text - The text to copy.
 * @returns {Promise<void>} A promise that resolves when the text is successfully copied.
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Failed to copy text:", error);
    throw error;
  }
}
type CopyAction = {
  metaData: UrlPreviewData;
  clickedActionPillOption: ActionPillOptions | undefined;
  updatePopoverText: UpdatePopoverText | undefined;
  event?: React.MouseEvent<HTMLElement>;
};
type AddToLearnAction = {
  metaData: UrlPreviewData;
  clickedActionPillOption: ActionPillOptions | undefined;
  updatePopoverText: UpdatePopoverText | undefined;
  updateSuccessStateForIconSwap: UpdateSuccessForIconSwap | undefined;
  event?: React.MouseEvent<HTMLElement>;
};
export const CopyAction = ({
  metaData,
  updatePopoverText,
  clickedActionPillOption,
}: CopyAction) => {
  copyToClipboard(metaData.url);
  if (!updatePopoverText || !clickedActionPillOption) return;
  updatePopoverText(clickedActionPillOption.id, `Copied`);
  setTimeout(() => {
    updatePopoverText(clickedActionPillOption.id, "Copy");
  }, 2000);
};
export const ShareAction = (metaData: UrlPreviewData) => {
  alert(metaData.url);
};
export const AddToLearn = ({
  metaData,
  clickedActionPillOption,
  updatePopoverText,
  updateSuccessStateForIconSwap,
}: AddToLearnAction) => {
  console.log(metaData.adaptiveuMeta);
  if (!updatePopoverText || !clickedActionPillOption) return;
  updatePopoverText(clickedActionPillOption.id, "Added to Learn");
  setTimeout(() => {
    updatePopoverText(clickedActionPillOption.id, "Add to Learn");
  }, 2000);
  if (!updateSuccessStateForIconSwap) return;
  updateSuccessStateForIconSwap(clickedActionPillOption.id, true);
};
export const shareAction = () => {};

export const addToLearn = () => {};
