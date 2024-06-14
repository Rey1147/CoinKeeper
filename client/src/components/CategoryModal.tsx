import {FC} from "react";
import {Form} from "react-router-dom";
import {ICategoryModal} from "../types/types.ts";

const CategoryModal: FC<ICategoryModal> = ({type, id,setVisibleModal}) => {
    return (
        <div className='fixed top-0 left-0 bottom-0 rigth-0 w-full h-full bg-black/50 flex justify-center items-center'>
            <Form
                action='/categories'
                method={type}
                onSubmit={() => setVisibleModal(false)}
                className='grid gap-3 w-[300px] p-5 rounded-md bg-slate-900'
            >
                <label htmlFor='title'>
                    <p> Category Title </p>
                    <input className='input w-full mt-2' type='text' name='title' placeholder='Title....'/>
                    <input type='hidden' name='id' value={id}/>
                </label>
                <div className='flex items-center gap-2'>
                    <button className='btn btn-green' type='submit'>
                        {type === 'patch' ? 'Save' : 'Create'}
                    </button>
                    <button
                        onClick={() => setVisibleModal(false)}
                        className='btn btn-red'
                    > Close </button>
                </div>
            </Form>
        </div>
    )
}

export default CategoryModal