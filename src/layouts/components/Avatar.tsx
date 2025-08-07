import { BUCKET_URL } from "@/lib/constant";
import { cn } from "@/lib/utils/shadcn";
import Image from "next/image";
import { ComponentProps } from "react";
import Gravatar from "react-gravatar";

type ImageProps = Omit<ComponentProps<typeof Image>, "src">;

type Props = ImageProps & { src: string; email: string; preview?: boolean };
export default function Avatar(props: Props) {
  if (props.src) {
    const { src, preview, ...rest } = props;
    const source = src?.startsWith("http") ? src : `${BUCKET_URL}/${src}`;
    return <Image src={preview ? src : source} {...rest} />;
  } else if (props.email) {
    const { email, ...rest } = props;

    return (
      // @ts-ignore
      <Gravatar
        email={props.email || ""}
        className={cn("rounded-full", rest.className)}
        alt={rest.alt}
        height={rest.height}
        width={rest.width}
      />
    );
  }
}
