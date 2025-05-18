import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

export default function RTE({name, control, label, defaultValue = ""}){
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}

            <Controller 
                name = {name || "content"} // The name of the field in the form state. This is used to identify the field in the form.
                control = {control} // The control object is used to manage the form state. It is passed to the Controller component to bind the field to the form state.

                // The render prop is a function that returns a React element. It receives the field object as an argument, which contains the value and onChange function.
                // The field object is used to bind the input to the form state. The value is the current value of the input, and onChange is a function that updates the value in the form state.
                render = {({field: {onChange}}) => {

                    <Editor // TinyMCE editor. Reference: https://www.tiny.cloud/docs/tinymce/latest/react-ref/
                    
                        initialValue = {defaultValue}
                        init = {{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],

                            //The toolbar option defines the presence, order, and grouping of toolbar buttons. Use a space-separated list to specify the toolbar buttons for TinyMCE. Create toolbar groups by using the “|” pipe character between button names.
                            toolbar: "undo redo | blocks | images | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onEditorChange = {onChange} //onChange is a function that updates the value in the form state.
                        //onEditorChange is a function that is called when the editor content changes. It receives the new content as an argument.
                    />
                }}
            />
        </div>
    )
}