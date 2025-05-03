`https://gist.github.com/protrolium/8831763` - For youtube preview image based on video id
// https://developer.vimeo.com/api/oembed/videos#table-3
// There is no type packages available for it
//https://vimeo.com/api/oembed.json?url=https:%2F%2Fvimeo.com%2F76979871 - example response to see it in browser

Tested URL's:

Non video resoureces
https://www.google.co.in/

Video Resources:

Checklist:

- setup vite -done
- setup tailwind css - done
- setup vite with storybook - done
- load component in storybook - done
- setup msw for api mocking - done

- cache layer to prevent unnecessary calls - done
- Full visual state with all data - done
- Loading state - done
- Partial state - done

          {/* {previewActionOptions
            // ?.filter((item) => {
            //   if (item.condition) {
            //     return item.condition(metaData as UrlMetaData);
            //   }
            //   return true;
            // })
            ?.map(({ icon: Icon, label, clickHandler }, index) => (
              <li
                className={`flex items-center gap-1 ${index === 0 ? 'pl-0' : 'pl-[10px]'}`}
                onClick={(e) => clickHandler(e, (metaData as UrlMetaData) || (metaData as VimeoMetaData))}
                key={index}
              >
                <Icon size="16" tone="neutralSecondary" className="h-3 w-3" />
                <Text className="text-body-12">{label}</Text>
              </li>
            ))} */}


            <UrlPreview
            apiUrl={getMetaDataEndpoint('staging')}
            urlToPreview={url}
            accessToken={Resources.getUserAccessToken()}
            key={key}
            previewActionOptions={[
              {
                label: 'Copy',
                icon: <ClipboardCopyIcon />,
                clickHandler: (e, metaData) => {
                  e.stopPropagation();
                  const { url } = metaData;
                  copyAction(e, url);
                },
              },
              {
                label: 'Share',
                icon: <ShareIcon />,
                clickHandler: (e, metaData) => {
                  e.stopPropagation();
                  const { url } = metaData;
                  shareAction(url);
                },
              },
              {
                label: 'Add To Learn',
                icon: <AddIcon />,
                clickHandler: (e, metaData) => {
                  e.stopPropagation();
                  addToLearn(e, metaData);
                },
                // condition: (metaData) => Boolean(metaData.adaptiveU),
              },
            ]}
          />
