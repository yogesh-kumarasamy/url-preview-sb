import type {
  UrlPreviewCompProps,
  PreviewCompProps,
  ActionPopOverText,
  ActionPillProps,
  UpdatePopoverText,
  ActionIconSuccess,
  UpdateSuccessForIconSwap,
  ActionPillOptions,
  FallbackPreviewCompProps,
} from "./types";
import {
  Box,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  TextLink,
  Tooltip,
  Track,
} from "@adaptavant/eds-core";
import type { IconProps } from "@adaptavant/eds-core";
import { useImageOrientation, useUrlMetaData } from "./hooks";
import { useState } from "react";
import cn from "classnames";

const ActionPill = ({
  metaData,
  actionPillOptions,
  className = "",
  ...rest
}: ActionPillProps) => {
  const [popOverText, setPopoverText] = useState<ActionPopOverText>(
    actionPillOptions
      ? actionPillOptions.reduce((acc, item) => {
          acc[item.id] = item.popOverText;
          return acc;
        }, {} as ActionPopOverText)
      : {}
  );
  const [isIconSuccess, setIsIconSuccess] = useState<ActionIconSuccess>(
    actionPillOptions
      ? actionPillOptions.reduce((acc, item) => {
          acc[item.id] = false;
          return acc;
        }, {} as ActionIconSuccess)
      : {}
  );

  const updatePopoverText: UpdatePopoverText = (id, newText) => {
    setPopoverText((prevTexts) => ({
      ...prevTexts,
      [id]: newText,
    }));
  };
  const updateSuccessStateForIconSwap: UpdateSuccessForIconSwap = (
    id,
    isSuccess
  ) => {
    setIsIconSuccess((prev) => ({
      ...prev,
      [id]: isSuccess,
    }));
  };

  const classes = cn(
    "flex",
    "flex-row",
    "text-secondary",
    "text-body-12",
    "z-20",
    "rounded-full",
    "bg-[#ffffff]",
    "justify-center",
    "items-center",
    "px-2",
    "py-1",
    "overflow-hidden",
    className
  );

  // Helper function: returns the proper icon component
  const getActionIcon = (
    action: ActionPillOptions
  ): React.ComponentType<IconProps> => {
    if (isIconSuccess[action.id] && action.icons.successState) {
      return action.icons.successState;
    }
    return action.icons.initialState || (() => null);
  };

  return (
    <Box as="div" className={classes} {...rest}>
      {actionPillOptions
        ?.filter((action) => action?.onlyShow?.(metaData) ?? true)
        ?.map((action, index) => (
          <Box
            key={index}
            as="div"
            data-testid={`action-pill-${action.id}`}
            className={`inline-flex ${index === 0 ? "pl-0" : "pl-1"}`}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              if (isIconSuccess[action.id]) return;
              action.clickHandler({
                metaData,
                clickedActionPillOption: action,
                updatePopoverText,
                updateSuccessStateForIconSwap,
                event: e,
              });
            }}
          >
            <Tooltip content={popOverText[action.id] || ""}>
              {({ triggerProps }) => (
                <IconButton
                  size="small"
                  isDisabled={isIconSuccess[action.id]}
                  aria-label={action.popOverText}
                  variant="neutralTertiary"
                  className={`h-4 w-4`}
                  data-testid={`action-pill-icon-${action.id}`}
                  icon={() => {
                    const IconComponent = getActionIcon(action);
                    return <IconComponent />;
                  }}
                  {...triggerProps}
                />
              )}
            </Tooltip>
          </Box>
        ))}
    </Box>
  );
};

const LoaderSkeleton = () => (
  <Box className="w-full py-2" data-testid="loader-skeleton">
    <Box
      as="article"
      className="flex w-[90%] border-l-[3px] border-solid border-secondary pl-4"
    >
      <Stack className="w-full animate-pulse gap-2">
        {/* Heading skeleton */}
        <Box
          as="div"
          className="rounded h-5 w-full bg-neutral-secondary-pressed"
        ></Box>
        {/* Description skeleton */}
        <Box as="div" className="flex flex-col w-full gap-1">
          <div className="rounded h-3 w-full bg-neutral-secondary-pressed"></div>
          <div className="rounded h-3 w-5/6 bg-neutral-secondary-pressed"></div>
        </Box>
        {/* Favicon + Link */}
        <Box as="div" className="flex w-full gap-1">
          <div className="rounded h-3 w-[16px] grow-0 bg-neutral-secondary-pressed"></div>
          <div className="rounded h-3 w-[50%] bg-neutral-secondary-pressed"></div>
        </Box>
        {/* Image skeleton */}
        <Box as="div" className="aspect-video w-[300px]">
          <div className="rounded h-[168px] bg-neutral-secondary-pressed" />
        </Box>
      </Stack>
    </Box>
  </Box>
);

const Overlay = () => {
  return (
    <Box
      as="div"
      className="pointer-events-none absolute inset-0 z-10 bg-[#000000] bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-50"
    ></Box>
  );
};
// Intentionally kept for design review
// const TwoColumnLayout = ({
//   metaData,
//   imageContainerClass,
//   hiddenPreviewElements,
//   actionPillOptions,
// }: PreviewCompProps) => {
//   const [isHovered, setIsHovered] = useState(false);
//   return (
//     <Box
//       as="article"
//       className="flex w-full cursor-pointer border-l-[3px] border-solid border-secondary px-4"
//       onClick={() => {
//         window.open(metaData.url, "_blank");
//       }}
//       onMouseEnter={() => {
//         setIsHovered(true);
//       }}
//       onMouseLeave={() => {
//         setIsHovered(false);
//       }}
//     >
//       <Track
//         className="flex items-start gap-2"
//         classNames={{ center: "flex h-full" }}
//         railStart={
//           metaData.imageUrl && (
//             <Box
//               as="figure"
//               className={`${imageContainerClass} group relative z-10 mr-0.5 overflow-hidden`}
//             >
//               <Image
//                 className="absolute inset-0 h-full w-full object-cover object-center"
//                 alt={metaData.title}
//                 src={metaData.imageUrl}
//               />
//               {hiddenPreviewElements?.actionPill ? null : (
//                 <>
//                   <ActionPill
//                     metaData={metaData}
//                     actionPillOptions={actionPillOptions}
//                     className={`absolute bottom-1 right-1 ${
//                       isHovered ? "" : "hidden"
//                     } `}
//                    data-testid="action-pill"

//                   />
//                   <Overlay />
//                 </>
//               )}
//             </Box>
//           )
//         }
//       >
//         <Stack className="flex h-full w-full gap-0.5 overflow-hidden">
//           {metaData.title && (
//             <Heading
//               as="h1"
//               className="text-left text-primary text-heading-14 line-clamp-1 w-full"
//             >
//               {metaData.title}
//             </Heading>
//           )}
//           {metaData.desc && (
//             <Text
//               as="p"
//               className="text-secondary text-body-12 line-clamp-2 w-full pt-0.5"
//             >
//               {metaData.desc}
//             </Text>
//           )}
//           {metaData.source && (
//             <Track
//               className="mt-auto w-full gap-2 pt-0.5"
//               railStart={
//                 metaData.iconSrc && (
//                   <Image
//                     className="h-[20px] w-[20px] object-cover object-center"
//                     alt={metaData.title}
//                     src={metaData.iconSrc}
//                   />
//                 )
//               }
//             >
//               <TextLink
//                 className="text-tertiary text-body-12 line-clamp-1 hover:text-tertiary"
//                 href={metaData.url}
//                 variant="neutralSecondary"
//               >
//                 {metaData.source}
//               </TextLink>
//             </Track>
//           )}
//         </Stack>
//       </Track>
//     </Box>
//   );
// };
const SingleColumnLayout = ({
  metaData,
  imageContainerClass,
  hiddenPreviewElements,
  actionPillOptions,
}: PreviewCompProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Box
      as="article"
      className="flex group relative w-full cursor-pointer border-l-[3px] border-solid border-secondary px-4"
      onClick={() => {
        window.open(metaData.url, "_blank");
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      data-testid="hover-target"
    >
      <Stack className="w-full gap-0.5 overflow-hidden">
        {metaData.title && (
          <Heading
            as="h1"
            className="text-left text-primary text-heading-14 line-clamp-1 w-full"
          >
            {metaData.title}
          </Heading>
        )}
        {metaData.desc && (
          <Text
            as="p"
            className="text-secondary text-body-12 line-clamp-2 w-full pt-0.5"
          >
            {metaData.desc}
          </Text>
        )}
        {metaData.url && (
          <Track
            className="w-full gap-2 pt-0.5"
            railStart={
              metaData.iconSrc && (
                <Image
                  className="h-[20px] w-[20px] object-cover object-center"
                  alt={metaData.title}
                  src={metaData.iconSrc}
                  data-testid="favicon"
                />
              )
            }
          >
            <TextLink
              className="text-secondary text-body-12 line-clamp-1 hover:text-secondary"
              href={metaData.url}
              variant="neutralSecondary"
              data-testid="source"
            >
              {metaData.source}
            </TextLink>
          </Track>
        )}

        {metaData.imageUrl && (
          <Box
            as="figure"
            className={`${imageContainerClass} relative mt-0.5 overflow-hidden`}
            data-testid="preview-image-container"
          >
            <Image
              className="absolute inset-0 h-full w-full object-cover object-center"
              alt={metaData.title}
              src={metaData.imageUrl}
              data-testid="preview-image"
            />
            {hiddenPreviewElements?.actionPill ? null : (
              <ActionPill
                metaData={metaData}
                actionPillOptions={actionPillOptions}
                className={`absolute bottom-2 right-2 z-50 ${
                  isHovered ? "" : "hidden"
                }`}
                data-testid="action-pill"
              />
            )}
            {hiddenPreviewElements?.actionPill ? null : <Overlay />}
          </Box>
        )}
        {!metaData.imageUrl &&
          (hiddenPreviewElements?.actionPill ? null : (
            <ActionPill
              metaData={metaData}
              actionPillOptions={actionPillOptions}
              className={`absolute right-2 top-1/2 -translate-y-1/2 transform ${
                isHovered ? "" : "hidden"
              }`}
              data-testid="action-pill"
            />
          ))}
      </Stack>
    </Box>
  );
};
const FallbackPreview = ({
  previewUrl,
  actionPillOptions,
  hiddenPreviewElements,
  ...props
}: FallbackPreviewCompProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Box {...props} className="w-full py-2" data-testid="fallback-preview">
      <Box
        as="article"
        className="flex relative w-full cursor-pointer border-l-[3px] border-solid border-secondary pl-4"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
          window.open(previewUrl, "_blank");
        }}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        data-testid="hover-target"
      >
        <Stack className="w-full gap-0.5 overflow-hidden">
          <TextLink
            href={previewUrl}
            variant="neutralSecondary"
            className="text-body-12 pointer-events-none"
          >
            {previewUrl}
          </TextLink>
        </Stack>
        {hiddenPreviewElements?.actionPill ? null : (
          <ActionPill
            metaData={{
              url: previewUrl,
              iconSrc: "",
              title: "",
              desc: "",
              source: "",
              imageUrl: "",
            }}
            actionPillOptions={actionPillOptions}
            className={`absolute right-2 top-1/2 -translate-y-1/2 transform ${
              isHovered ? "" : "hidden"
            }`}
          />
        )}
      </Box>
    </Box>
  );
};
export const UrlPreview = ({
  previewUrl,
  accessToken,
  metadataApiUrl,
  hiddenPreviewElements,
  actionPillOptions,
  ...props
}: UrlPreviewCompProps) => {
  const { isLoading, metaData } = useUrlMetaData(
    previewUrl,
    accessToken,
    metadataApiUrl
  );

  const orientation = useImageOrientation(metaData?.imageUrl, null);

  // Intentionally kept portrait and square same as the image is square to maintain the width. Design review item
  const imageContainerClass = orientation
    ? {
        square: "aspect-square w-full max-w-[8rem]", // 128px
        portrait: "aspect-square w-full max-w-[8rem]", // 128px
        landscape: "aspect-video w-full max-w-[22.5rem]", // 360px
      }[orientation]
    : "";

  if (isLoading) return <LoaderSkeleton />;
  if (!metaData)
    return (
      <FallbackPreview
        previewUrl={previewUrl}
        hiddenPreviewElements={hiddenPreviewElements}
        actionPillOptions={actionPillOptions}
        {...props}
      />
    );
  return (
    <Box {...props} className="w-full py-2">
      {/* {
        orientation && orientation !== 'landscape' && (
          <TwoColumnLayout
            metaData={metaData}
          imageContainerClass={imageContainerClass}
          hiddenPreviewElements={hiddenPreviewElements}
          actionPillOptions={actionPillOptions}
          />
        )
        // )
      }
      {
        orientation === 'landscape' && (
          <SingleColumnLayout
            metaData={metaData}
          imageContainerClass={imageContainerClass}
          hiddenPreviewElements={hiddenPreviewElements}
          actionPillOptions={actionPillOptions}
          />
        )
      } */}
      {
        <SingleColumnLayout
          metaData={metaData}
          imageContainerClass={imageContainerClass}
          hiddenPreviewElements={hiddenPreviewElements}
          actionPillOptions={actionPillOptions}
        />
      }
    </Box>
  );
};
