"use client"
import NavTitle from '@/components/common/admin/reuseable/nav-title'
import TextEditor from '@/components/common/admin/reuseable/text-editor';
import { Button } from '@/components/ui';
import React, { useState } from 'react'

export default function Terms() {
    const [content, setContent] = useState("");

    const handleSave = () => {
        console.log("Blog content:", content);
        // save to API or database here
    };
    return (
        <div>
            <NavTitle title='Terms & Conditions' subTitle='You can manage the Terms & Conditions section of MyTSV from here.' />
            <TextEditor value={content} onChange={setContent} />
            <div className='mt-3 flex justify-end'>
                <Button onClick={()=>handleSave()} variant={"primary"} className={"rounded-sm px-20"}>Save</Button>
            </div>
        </div>
    )
}
