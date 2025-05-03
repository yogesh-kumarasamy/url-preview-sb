## History

- It was maintained in frontoffice commons repo and built on top of webcomponent in a very old tech stack
- Non EDS compliant

## Goals

- Build component from scratch in react in a reusable way
- Strongly introduce typings
- Build on top of EDS
- Generate stable previews
- Work with UX team to streamline the preview UI

## Responsibility of the component

- get any sort of url from the chat input
- identify the source of the url whether it's video source or any other page source and generate preview based on the data
- if it's video it will identify the source from the following,

* vimeo.com
* teleport
* youtube
* loom

- if it's vimeo.com we hit the external api to collect meta data to build the preview and for the rest of the sources we rely on our open api which does the web scraping and provide us the meta data in the response
- if it's non video resource

* google.co.in
* yahoo.com
* medium.com and so on everything will be scraped by our own url and meta data will be given through api.

## Current standing

- Right now its coexisting inside the anywhere-default repo and it will be moved as a package soon once the monorepo migration is done.
- And it's built with the idea of having this component in any project but not just in baseapp.
- so the props were designed thoughtful to keep the component lightweight. it will just consume url and access token from the host app. it need have the intelligence of differentiating environment and it will offload that area to the host app to do it.
- I need to check whether the api is micro service or not

Decisions:

- Image preview failure fallback will be handled on its own and not in the url preview component(earlier it was redirected to url preview component)
- All the previews are stable now and all the elements will be stacked one below each other like slack and no different visual states maintained(earlier gmeet link has different view)
- Figma not followed but connected with vishal
- action items streamlined(all will be placed below image and it will stay forever,no hover will be shown) because earlier few hover state maintained and in few cases it was shown right below the image in video preview
- link icon next to title was removed
- image/video container follows the below based on the image's intrinsic dimension from the api,

* square
* portrait
* landscape

- og image from google meet - we should replace it by our own
- single column / two column layout - have to check with vishal on that
- teleport videos will not have any previews to it, will only fallback as the plain url.

Storybook:
Stories had been developed in isolation and waiting for monorepo migration to be done to raise the PR on that
