import { SVGAttributes } from "react";
import { Link } from "@inertiajs/react";

interface ApplicationLogoProps extends SVGAttributes<SVGElement> {
    width?: string | number;
    height?: string | number;
    href?: string;
    clickable?: boolean;
}

export default function ApplicationLogo({
    width = "100%",
    height = "100%",
    href = "/",
    clickable = true,
    ...props
}: ApplicationLogoProps) {
    const logo = (
        <svg
            id="logo-35"
            width={width}
            height={height}
            viewBox="0 0 50 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {" "}
            <path
                d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                className="ccompli1"
                fill="#007AFF"
            ></path>{" "}
            <path
                d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                className="ccustom"
                fill="#312ECB"
            ></path>{" "}
        </svg>
    );

    return clickable ? (
        <Link href={href} className="cursor-pointer">
            {logo}
        </Link>
    ) : (
        logo
    );
}
