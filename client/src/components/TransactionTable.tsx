import {FC} from "react";
import {FaTrash} from "react-icons/fa";
import {Form, useLoaderData} from "react-router-dom";
import {IResponseTransactionLoader} from "../types/types.ts";
import {FormatDate} from "../helper/date.helper.ts";
import {FormatToUSD} from "../helper/amount.helper.ts";

const TransactionTable: FC = () => {
    const { transactions } = useLoaderData() as IResponseTransactionLoader

    return (
        <>
            <div className='bg-slate-800 px-8 py-4 mt-4 rounded-md'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <td className='font-bold'> № </td>
                            <td className='font-bold'> Title </td>
                            <td className='font-bold'> Amount($) </td>
                            <td className='font-bold'> Category </td>
                            <td className='font-bold'> Data </td>
                            <td className='text-right'> Action </td>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td> {index + 1} </td>
                                <td> {transaction.title} </td>
                                <td
                                    className={
                                        transaction.type === 'income'
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                    }
                                >
                                    { transaction.type === 'income'
                                        ? `+ ${FormatToUSD.format(transaction.amount)}`
                                        : `- ${FormatToUSD.format(transaction.amount)}`
                                    }
                                </td>
                                <td> {transaction.category?.title || 'Other'} </td>
                                <td> {FormatDate(transaction.createdAt)} </td>
                                <td>
                                    <Form
                                        method='delete'
                                        action='/transactions'
                                    >
                                        <input type='hidden' name='id' value={transaction.id}/>
                                        <button
                                            className='btn hover:btn-red ml-auto'>
                                            <FaTrash/>
                                        </button>
                                    </Form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TransactionTable;