import {Link} from "@inertiajs/react";

interface BreadCrumbProps {
    breadCrumbs? : {
        title: string;
        url: string;
        disabled?: boolean;
        params?: {}
    }[]
}

export const BreadCrumb = ({breadCrumbs}: BreadCrumbProps) => {
    return (
        <div className="md:flex hidden">
            {
                breadCrumbs?.map((item, index) => (
                    <ol key={index} className="flex">
                        <li >
                            {
                                item.disabled === false ? (
                                    <Link
                                        href={route(item.url, item?.params ?? item?.params)}
                                        className="text-sky-700 transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    >{item.title}</Link
                                    >
                                ): (
                                    <li className="text-neutral-500 dark:text-neutral-400">{item.title}</li>
                                )
                            }
                        </li>
                        {
                            index < breadCrumbs.length - 1 && (
                                <li>
                                    <span className="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
                                </li>
                            )
                        }
                    </ol>
                ))
            }
        </div>
    )
}
