import { TableCell, TableRow } from "@/Components/ui/table";
import ActionComponent from "./action-component";

interface TableItemProps {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
    index: number;
}

const TableItem = ({ user, index }: TableItemProps) => {
    return (
        <>
            <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                    <ActionComponent
                        id={user.id}
                        name={user.name}
                        email={user.email}
                        role={user.role}
                    />
                </TableCell>
            </TableRow>
        </>
    );
};

export default TableItem;
