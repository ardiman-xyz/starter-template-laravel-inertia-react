import { TableCell, TableRow } from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Component } from "@/types/app";

interface TablteItemProps {
    item: Component;
    index: number;
}

export const TableItem = ({ item, index }: TablteItemProps) => {
    const handleClick = (id: number) => {
        //
    };

    return (
        <>
            <TableRow
                key={index}
                onClick={() => handleClick(item.id)}
                className="cursor-pointer group"
            >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="capitalize">
                    <span className="group-hover:underline group-hover:text-blue-800 transition-colors">
                        {item.name}
                    </span>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell className="text-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant={"ghost"}>
                                <Menu className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Hapus</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* <Link
                                    href={route("instrument.detail", item.id)}
                                >
                                    <Button>
                                        <Settings className="w-4 h-4 mr-2" />
                                        Setting
                                    </Button>
                                </Link> */}
                </TableCell>
            </TableRow>
        </>
    );
};
