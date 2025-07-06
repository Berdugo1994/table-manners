// import { Player } from "@/app/store/playerStore";
// import { Expense } from "@/app/types/expense";
// import {
//   Button,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow,
// } from "@heroui/react";
// import React from "react";

// export default function AddExpenseModal({
//   setExpenses,
//   expenses,
//   players,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   setExpenses: (expenses: Expense[]) => void;
//   expenses: Expense[];
//   players: Player[];
// }) {
//   const playersMap = React.useMemo(() => {
//     return players.reduce((acc, player) => {
//       acc[player.id] = player.name;
//       return acc;
//     }, {} as Record<string, string>);
//   }, [players]);

//   const namesOfLine = React.useCallback(
//     (ids: number[]) => {
//       if (Object.keys(playersMap).length === 0) return [];
//       return ids.map((id) => playersMap[id]).join(", ");
//     },
//     [playersMap]
//   );
//   const onSelectionChange = React.useCallback(
//     (ids: number[], index: number) => {
//       setExpenses(
//         expenses.map((expense, i) =>
//           i === index ? { ...expense, playersIds: ids } : expense
//         )
//       );
//     },
//     [expenses]
//   );

//   return (
//     <Modal>
//       <ModalContent>
//         <ModalHeader>Non-Related Expenses</ModalHeader>
//         <ModalBody>
//           <Table>
//             <TableHeader>
//               <TableColumn>Name</TableColumn>
//               <TableColumn>Amount</TableColumn>
//               <TableColumn>Players</TableColumn>
//             </TableHeader>
//             <TableBody>
//               {expenses.map((expense, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{expense.name}</TableCell>
//                   <TableCell>{expense.amount}</TableCell>
//                   <TableCell>
//                     <Dropdown>
//                       <DropdownTrigger>
//                         <Button className="capitalize" variant="bordered">
//                           {namesOfLine(expense.playersIds)}
//                         </Button>
//                       </DropdownTrigger>
//                       <DropdownMenu
//                         disallowEmptySelection
//                         aria-label="Multiple selection example"
//                         closeOnSelect={false}
//                         selectedKeys={expense.playersIds}
//                         selectionMode="multiple"
//                         variant="flat"
//                         onSelectionChange={(keys) =>
//                           onSelectionChange(
//                             Array.from(keys).map((key) => Number(key)),
//                             index
//                           )
//                         }
//                       >
//                         {players.map((player) => (
//                           <DropdownItem key={player.id}>
//                             {player.name}
//                           </DropdownItem>
//                         ))}
//                       </DropdownMenu>
//                     </Dropdown>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </ModalBody>
//       </ModalContent>
//     </Modal>
//   );
// }
