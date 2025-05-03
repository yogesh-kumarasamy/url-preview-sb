import EDSWrapper from "./EdsWrapper";
import { UrlPreview } from "./url-preview/TwoColumnLayout";
import { token } from "./util"; // get it from Resource.getUserAccessToken() in base app
import { getMetaDataEndpoint } from "./util";
import {
  ClipboardCopyIcon,
  ShareIcon,
  AdaptiveUIcon,
  AdaptiveUFilledIcon,
  Box,
} from "@adaptavant/eds-core";
import { CopyAction, ShareAction, AddToLearn } from "./util";
function App() {
  // The host app has to handle the endpoint and token, In our case it's base app
  const apiUrl = getMetaDataEndpoint("staging");
  return (
    <EDSWrapper>
      {/* apiUrl is the meta api endpoint and access token is the user access token, urlTopreview is the url posted from the chat */}
      {/* Host apps like base app has to provide access token and apiUrl for this component to function properly, This will just handle the logic inside and don't maintain any intelligence to 
        find the component is hosted in staging or prod environment */}
      {/* key is for react to effectively identify the component when multiple instance of this same comp renders */}
      <Box
        as="div"
        className="flex flex-col relative left-52 top-20 w-1/2 overflow-hidden"
      >
        <UrlPreview
          metadataApiUrl={apiUrl}
          previewUrl="https://vimeo.com/76979871"
          accessToken={token}
          actionPillOptions={[
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
          ]}
          key="1"
        />
        <UrlPreview
          metadataApiUrl={apiUrl}
          previewUrl="https://anywhere.adaptiveu.io/anywhereworks/link/coding-with-an-ai-pair-programmer-getting-started-with-github-copilot"
          accessToken={token}
          actionPillOptions={[
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
          ]}
          key="1"
        />
        <UrlPreview
          metadataApiUrl={apiUrl}
          previewUrl="https://anywhere.adaptiveu.io/anywhereworks/link/coding-with-an-ai-pair-programmer-getting-started-with-github-copilot"
          accessToken={token}
          actionPillOptions={[
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
          ]}
          key="1"
        />
        <UrlPreview
          metadataApiUrl={apiUrl}
          previewUrl="https://anywhere.adaptiveu.io/anywhereworks/link/ep-90-how-to-figure-out-your-future-with-worldrenowned-life-coach-marie-forleo-working-hard-hardly-working-podcast-on-spotify"
          accessToken={token}
          actionPillOptions={[
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
          ]}
          key="1"
        />
      </Box>
    </EDSWrapper>
  );
}

export default App;
