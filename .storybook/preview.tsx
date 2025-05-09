import type { Preview } from "@storybook/react";
import "../src/index.css";
import "./storybook-overrides.css";
import EDSWrapper from "../src/EdsWrapper";
import React from "react";
import { initialize, mswLoader } from "msw-storybook-addon";

import { http, HttpResponse } from "msw";
import * as MockData from "../msw/mocks/mockDataForUrlPreviewComponent";

import { getMetaDataEndpoint } from "../src/util";

if (import.meta.env.PROD) {
  initialize({
    serviceWorker: {
      url: "/url-preview-sb/storybook-static/mockServiceWorker.js",
      options: {
        // The scope defines the URL prefix that the service worker will control.
        // Here it will only control URLs under "/storybook-static/"
        scope: "/url-preview-sb/storybook-static/",
      },
    },
  });
} else {
  // In development, initialize normally (or skip service worker registration)
  initialize();
}

const globalHandlers = [
  http.post(getMetaDataEndpoint("staging"), async ({ request }) => {
    const body = await request.json();
    console.log(Array.isArray(body));
    if (body && Array.isArray(body)) {
      const url = body[0];
      if (url.includes("google.co.in")) {
        return HttpResponse.json(MockData.mockDataForGoogle, { status: 200 });
      }
      if (url.includes("yahoo.com")) {
        return HttpResponse.json(MockData.mockDataForYahoo, { status: 200 });
      }
      if (url.includes("youtu")) {
        return HttpResponse.json(MockData.mockDataForYoutube, { status: 200 });
      }
      if (url.includes("loom")) {
        return HttpResponse.json(MockData.mockDataForLoom, { status: 200 });
      }
      if (url.includes("teleport.video")) {
        return HttpResponse.json(MockData.mockDataForTeleport, { status: 200 });
      }
      if (url.includes("adaptiveu")) {
        return HttpResponse.json(MockData.mockDataForAdaptiveU, {
          status: 200,
        });
      }
      if (
        url.includes(
          "https://github.com/Adaptavant/anywhereworks-default/pull/3066"
        )
      ) {
        return HttpResponse.json(MockData.mockDataForGithubPR, {
          status: 200,
        });
      }
      if (url.includes("goodreads")) {
        return HttpResponse.json(MockData.mockDataForGoodReads, {
          status: 200,
        });
      }
      if (url.includes("meet.google.com")) {
        return HttpResponse.json(MockData.mockDataForGoogleMeet, {
          status: 200,
        });
      }
      if (
        url.includes(
          "https://anywhereworks.atlassian.net/wiki/spaces/~63bcbf1150b9490924dc37a7/pages/750387424/Shipping+101+Self-paced+learning"
        )
      ) {
        return HttpResponse.json(MockData.mockDataForConfluence, {
          status: 200,
        });
      }
      if (url.includes("setmore.com")) {
        return HttpResponse.json(MockData.mockDataForSetmore, {
          status: 200,
        });
      }
      if (url.includes("x.com")) {
        return HttpResponse.json(MockData.mockDataForTwitter, { status: 200 });
      }
      if (url.includes("noimage.com")) {
        return HttpResponse.json(MockData.mockDataForNoImage, { status: 200 });
      }
      if (url.includes("nodescription.com")) {
        return HttpResponse.json(MockData.mockDataForNoDescription, {
          status: 200,
        });
      }
      if (url.includes("nonadativeucontent.com")) {
        return HttpResponse.json(MockData.mockDataForNonAdaptiveUContent, {
          status: 200,
        });
      }
      if (url.includes("adativeucontent.com")) {
        return HttpResponse.json(MockData.mockDataForAdaptiveUContent, {
          status: 200,
        });
      }
      if (url.includes("portraitimage.com")) {
        return HttpResponse.json(MockData.mockDataForPortraitImage, {
          status: 200,
        });
      }
      if (url.includes("squareimage.com")) {
        return HttpResponse.json(MockData.mockDataForSquareImage, {
          status: 200,
        });
      }
      if (url.includes("landscapeimage.com")) {
        return HttpResponse.json(MockData.mockDataForLandscapeImage, {
          status: 200,
        });
      }
      if (url.includes("vimeo.com")) {
        return HttpResponse.json(MockData.mockDataForVimeo, {
          status: 200,
        });
      }
      if (url.includes("longtext.com")) {
        return HttpResponse.json(MockData.mockDataForLongText, {
          status: 200,
        });
      }
      if (url.includes("nopreview")) {
        return HttpResponse.json(MockData.mockDataForNoPreview, {
          status: 200,
        });
      }
      if (url.includes("meet.google")) {
        return HttpResponse.json(MockData.mockDataForGoogleMeet, {
          status: 200,
        });
      }
    }
    return HttpResponse.json(
      { error: "Unexpected request body" },
      { status: 400 }
    );
  }),
];

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    msw: {
      handlers: globalHandlers,
    },
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <EDSWrapper>
        <div className="pl-4 w-1/2 hover:bg-neutral-hover cursor-pointer">
          <Story />
        </div>
      </EDSWrapper>
    ),
  ],
};

export default preview;
