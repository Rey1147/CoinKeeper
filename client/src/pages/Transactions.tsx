import {FC} from "react";
import TransactionForm from "../components/TransactionForm.tsx";
import {instance} from "../api/axios.api.ts";
import {ICategory, INewTransaction, IResponseTransactionLoader, ITransaction} from "../types/types.ts";
import {toast} from "react-toastify";
import TransactionTable from "../components/TransactionTable.tsx";
import {useLoaderData} from "react-router-dom";
import {FormatToUSD} from "../helper/amount.helper.ts";
import Chart from "../components/Chart.tsx";

export const transactionLoader = async () => {
    const categories = await instance.get<ICategory[]>('/categories')
    const transactions = await instance.get<ITransaction[]>('/transactions')
    const totalIncome = await instance.get<number>('/transactions/income/find')
    const totalExpense = await instance.get<number>('/transactions/expense/find')

    const data = {
        categories: categories.data,
        transactions: transactions.data,
        totalIncome: totalIncome.data,
        totalExpense: totalExpense.data
    }
    return data
}

export const transactionAction = async ({ request }: any) => {
    switch (request.method) {
        case 'POST': {
            const formData = await request.formData()
            const newTransaction: INewTransaction = {
                title: formData.get('title'),
                amount: +formData.get('amount'),
                category: formData.get('category'),
                type: formData.get('type')
            }
            await instance.post('/transactions', newTransaction)
            toast.success('Transaction added')
            return null
        }
        case 'DELETE': {
            const formData = await request.formData()
            const transactionId = formData.get('id')
            await instance.delete(`/transactions/transaction/${transactionId}`)
            toast.success('Transaction deleted')
            return null
        }
    }
}

const Transactions: FC = () => {
    const {totalIncome, totalExpense} = useLoaderData() as IResponseTransactionLoader


    return (
        <>
            <div className='grid grid-cols-3 gap-4 mt-4 items-start'>
                <div className='grid col-span-2'>
                    <TransactionForm/>
                </div>

                <div className='flex flex-col items-center'>
                    <div className='grid grid-cols-2 gap-3 rounded-md bg-slate-800 p-3'>
                        <div>
                            <p className='uppercase text-md font-bold text-center'>
                                Total Income:
                            </p>
                            <p className='bg-green-600 p-1 rounded-sm text-center mt-2'> {FormatToUSD.format(totalIncome)} </p>
                        </div>
                        <div>
                            <p className='uppercase text-md font-bold text-center'>
                                Total Expense:
                            </p>
                            <p className='bg-red-500 p-1 rounded-sm text-center mt-2'> {FormatToUSD.format(totalExpense)} </p>
                        </div>
                    </div>
                    <div className='mt-2 rounded-md bg-slate-800 p-6'>
                        <Chart totalIncome={totalIncome} totalExpense={totalExpense}/>
                    </div>
                </div>
            </div>

            <h1 className='my-5'>
                <TransactionTable limit={6}/>
            </h1>
        </>
    )
}


export default Transactions