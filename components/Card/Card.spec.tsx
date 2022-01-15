import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import Card from "./Card";

type MockImageProps = {
  src: string;
  alt: string;
};

jest.mock(
  "next/image",
  () =>
    function Image({ src, alt }: MockImageProps) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} />;
    }
);

const cardProps: ComponentProps<typeof Card> = {
  name: "",
  phone: "",
  email: "",
  src: "",
  alt: "",
  isFavored: false,
};

describe("Card Test", () => {
  it("should show name of cat", () => {
    render(<Card {...cardProps} name="sydney" />);

    expect(
      screen.getByRole("heading", {
        name: /sydney/i,
      })
    ).toBeInTheDocument();
  });

  it("should show phone number", () => {
    render(<Card {...cardProps} phone="111-1111-1111" />);

    expect(screen.getByText(/111-1111-1111/i)).toBeInTheDocument();
  });

  it("should show email", () => {
    render(<Card {...cardProps} email="python@gmail.com" />);

    expect(screen.getByText(/python@gmail.com/i)).toBeInTheDocument();
  });

  it("should show email", () => {
    render(<Card {...cardProps} email="python@gmail.com" />);

    expect(screen.getByText(/python@gmail.com/i)).toBeInTheDocument();
  });

  it("should show image with correct src", () => {
    render(<Card {...cardProps} src="/images/sydney.jpg" alt="cute cat" />);

    expect(screen.getByAltText(/cute cat/i)).toHaveAttribute(
      "src",
      "/images/sydney.jpg"
    );
  });
});
