import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UrlPreview } from "./index";
import EDSWrapper from "../EdsWrapper";
import { useUrlMetaData, useImageOrientation } from "./hooks";
import { actionPillOptions, copyAction } from "./testUtil";
import { UrlPreviewCompProps } from "./types";

import { beforeAll } from "vitest";

beforeAll(() => {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: {
      writeText: vi.fn().mockResolvedValue(undefined),
      readText: vi.fn().mockResolvedValue(""),
    },
  });
});
// Mock hooks
vi.mock("./hooks", () => ({
  useUrlMetaData: vi.fn(),
  useImageOrientation: vi.fn(),
}));

const WrappedUrlPreview = (props: UrlPreviewCompProps) => (
  <EDSWrapper>
    <UrlPreview {...props} />
  </EDSWrapper>
);

describe("UrlPreview Component", () => {
  const mockUseUrlMetaData = useUrlMetaData as vi.Mock;
  const mockUseImageOrientation = useImageOrientation as vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the loader skeleton when isLoading is true", () => {
    mockUseUrlMetaData.mockReturnValue({ isLoading: true });
    render(
      <WrappedUrlPreview
        previewUrl="https://example.com"
        accessToken="token"
        metadataApiUrl="api"
        actionPillOptions={actionPillOptions}
      />
    );
    expect(screen.getByTestId("loader-skeleton")).toBeInTheDocument();
  });

  it("renders fallback preview when no metadata is available", () => {
    mockUseUrlMetaData.mockReturnValue({
      isLoading: false,
      metaData: null,
    });
    render(
      <WrappedUrlPreview
        previewUrl="https://example.com"
        accessToken="token"
        metadataApiUrl="api"
        actionPillOptions={actionPillOptions}
      />
    );

    expect(screen.getByTestId("fallback-preview")).toBeInTheDocument();
    expect(screen.getByText("https://example.com")).toBeInTheDocument();
  });

  it("renders single column layout with metadata", () => {
    const mockMetaData = {
      url: "https://example.com",
      title: "Example Title",
      desc: "Example Description",
      source: "example.com",
      iconSrc: "https://example.com/icon.png",
      imageUrl: "https://example.com/image.jpg",
    };
    mockUseUrlMetaData.mockReturnValue({
      isLoading: false,
      metaData: mockMetaData,
    });
    mockUseImageOrientation.mockReturnValue("landscape");

    render(
      <WrappedUrlPreview
        previewUrl="https://example.com"
        accessToken="token"
        metadataApiUrl="api"
        actionPillOptions={actionPillOptions}
      />
    );

    expect(screen.getByText("Example Title")).toBeInTheDocument();
    expect(screen.getByText("Example Description")).toBeInTheDocument();
    expect(screen.getByTestId("favicon")).toHaveAttribute(
      "src",
      mockMetaData.iconSrc
    );
    expect(screen.getByTestId("source")).toHaveTextContent(mockMetaData.source);
    expect(screen.getByTestId("preview-image")).toHaveAttribute(
      "src",
      mockMetaData.imageUrl
    );
    expect(screen.getByTestId("action-pill")).toBeInTheDocument();
  });

  it("renders action pills when metadata is available", () => {
    const mockMetaData = {
      url: "https://example.com",
      title: "Example Title",
      desc: "Example Description",
      source: "example.com",
      iconSrc: "https://example.com/icon.png",
      imageUrl: "https://example.com/image.jpg",
    };
    const mockActionPillOptions = [{ ...copyAction, clickHandler: vi.fn() }];
    mockUseUrlMetaData.mockReturnValue({
      isLoading: false,
      metaData: mockMetaData,
    });
    mockUseImageOrientation.mockReturnValue("landscape");

    render(
      <WrappedUrlPreview
        previewUrl="https://example.com"
        accessToken="token"
        metadataApiUrl="api"
        actionPillOptions={mockActionPillOptions}
      />
    );

    const actionPill = screen.getByTestId("action-pill-copy");
    const svgElement = actionPill.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("action-pill-copy"));
    expect(mockActionPillOptions[0].clickHandler).toHaveBeenCalled();
  });

  it("hides action pills when hiddenPreviewElements.actionPill is true", () => {
    const mockMetaData = {
      url: "https://example.com",
      title: "Example Title",
      desc: "Example Description",
      source: "example.com",
      iconSrc: "https://example.com/icon.png",
      imageUrl: "https://example.com/image.jpg",
    };
    mockUseUrlMetaData.mockReturnValue({
      isLoading: false,
      metaData: mockMetaData,
    });
    mockUseImageOrientation.mockReturnValue("landscape");

    const mockActionPillOptions = [copyAction];

    render(
      <WrappedUrlPreview
        previewUrl="https://example.com"
        accessToken="token"
        metadataApiUrl="api"
        actionPillOptions={mockActionPillOptions}
        hiddenPreviewElements={{ actionPill: true }}
      />
    );

    expect(screen.queryByTestId("action-pill-copy")).not.toBeInTheDocument();
  });

  it("handles click on fallback preview to open the URL", () => {
    mockUseUrlMetaData.mockReturnValue({ isLoading: false, metaData: null });
    window.open = vi.fn();

    const mockActionPillOptions = [copyAction];

    render(
      <WrappedUrlPreview
        previewUrl="https://example.com"
        accessToken="token"
        metadataApiUrl="api"
        actionPillOptions={mockActionPillOptions}
      />
    );
    fireEvent.click(screen.getByTestId("hover-target"));
    expect(window.open).toHaveBeenCalledWith("https://example.com", "_blank");
  });

  it("handles hover state for action pills", () => {
    const mockMetaData = {
      url: "https://example.com",
      title: "Example Title",
      desc: "Example Description",
      source: "example.com",
      iconSrc: "https://example.com/icon.png",
      imageUrl: "https://example.com/image.jpg",
    };
    mockUseUrlMetaData.mockReturnValue({
      isLoading: false,
      metaData: mockMetaData,
    });
    mockUseImageOrientation.mockReturnValue("landscape");

    const mockActionPillOptions = [copyAction];

    render(
      <WrappedUrlPreview
        previewUrl="https://example.com"
        accessToken="token"
        metadataApiUrl="api"
        actionPillOptions={mockActionPillOptions}
      />
    );

    const hoverTarget = screen.getByTestId("hover-target");
    fireEvent.mouseEnter(hoverTarget);

    expect(screen.getByTestId("action-pill")).not.toHaveClass("hidden");
    expect(screen.getByTestId("action-pill-copy")).toBeVisible();

    fireEvent.mouseLeave(hoverTarget);
    expect(screen.getByTestId("action-pill")).toHaveClass("hidden");
    expect(screen.getByTestId("action-pill-copy")).toBeVisible();
  });
  it("handles copied correctly", () => {
    const mockMetaData = {
      url: "https://example.com",
      title: "Example Title",
      desc: "Example Description",
      source: "example.com",
      iconSrc: "https://example.com/icon.png",
      imageUrl: "https://example.com/image.jpg",
    };
    mockUseUrlMetaData.mockReturnValue({
      isLoading: false,
      metaData: mockMetaData,
    });
    mockUseImageOrientation.mockReturnValue("landscape");

    const mockActionPillOptions = [copyAction];

    render(
      <WrappedUrlPreview
        previewUrl="https://example.com"
        accessToken="token"
        metadataApiUrl="api"
        actionPillOptions={mockActionPillOptions}
      />
    );

    fireEvent.click(screen.getByTestId("action-pill-copy"));
    const popover = screen.getByRole("tooltip");
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveTextContent("Copied");
  });
  it("handles click function correctly", () => {
    const mockMetaData = {
      url: "https://example.com",
      title: "Example Title",
      desc: "Example Description",
      source: "example.com",
      iconSrc: "https://example.com/icon.png",
      imageUrl: "https://example.com/image.jpg",
    };
    mockUseUrlMetaData.mockReturnValue({
      isLoading: false,
      metaData: mockMetaData,
    });
    mockUseImageOrientation.mockReturnValue("landscape");

    const mockActionPillOptions = [{ ...copyAction, clickHandler: vi.fn() }];

    render(
      <WrappedUrlPreview
        previewUrl="https://example.com"
        accessToken="token"
        metadataApiUrl="api"
        actionPillOptions={mockActionPillOptions}
      />
    );

    fireEvent.click(screen.getByTestId("action-pill-copy"));
    expect(mockActionPillOptions[0].clickHandler).toHaveBeenCalled();
  });
  it("handles portrait image orientation", () => {
    const mockMetaData = {
      url: "https://example.com",
      title: "Example Title",
      desc: "Example Description",
      source: "example.com",
      iconSrc: "https://example.com/icon.png",
      imageUrl: "https://example.com/image.jpg",
    };
    mockUseUrlMetaData.mockReturnValue({
      isLoading: false,
      metaData: mockMetaData,
    });
    mockUseImageOrientation.mockReturnValue("portrait");

    render(
      <WrappedUrlPreview
        previewUrl="https://example.com"
        accessToken="token"
        metadataApiUrl="api"
        actionPillOptions={actionPillOptions}
      />
    );

    expect(screen.getByTestId("preview-image-container")).toHaveClass(
      "aspect-square"
    );
  });
  it("handles square image orientation", () => {
    const mockMetaData = {
      url: "https://example.com",
      title: "Example Title",
      desc: "Example Description",
      source: "example.com",
      iconSrc: "https://example.com/icon.png",
      imageUrl: "https://example.com/image.jpg",
    };
    mockUseUrlMetaData.mockReturnValue({
      isLoading: false,
      metaData: mockMetaData,
    });
    mockUseImageOrientation.mockReturnValue("square");

    render(
      <WrappedUrlPreview
        previewUrl="https://example.com"
        accessToken="token"
        metadataApiUrl="api"
        actionPillOptions={actionPillOptions}
      />
    );

    expect(screen.getByTestId("preview-image-container")).toHaveClass(
      "aspect-square"
    );
  });
  it("handles landscape image orientation", () => {
    const mockMetaData = {
      url: "https://example.com",
      title: "Example Title",
      desc: "Example Description",
      source: "example.com",
      iconSrc: "https://example.com/icon.png",
      imageUrl: "https://example.com/image.jpg",
    };
    mockUseUrlMetaData.mockReturnValue({
      isLoading: false,
      metaData: mockMetaData,
    });
    mockUseImageOrientation.mockReturnValue("landscape");

    render(
      <WrappedUrlPreview
        previewUrl="https://example.com"
        accessToken="token"
        metadataApiUrl="api"
        actionPillOptions={actionPillOptions}
      />
    );

    expect(screen.getByTestId("preview-image-container")).toHaveClass(
      "aspect-video"
    );
  });
});
