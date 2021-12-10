import React from 'react';
import api, {getApi} from "../../../apis";

import {FontAwesomeIcon} from  "@fortawesome/react-fontawesome"

import "./styles.scss"
import {faPen, faTrash} from "@fortawesome/pro-solid-svg-icons";
import {Link} from "react-router-dom";

const DatabaseFiles = () => {

    const [state, setState] = React.useState({
        markdownFiles: [],
        databaseFiles: []
    })

    const contentRef = React.useRef()
    const databaseFileChooser = React.useRef()
    const markdownFileChooser = React.useRef()

    const [fileContent, setFileContent] = React.useState({
        json: "",
        path: ""
    })

    React.useEffect(()=>{


        getApi().get("/api/files").then(res=>{
            if(res.status >= 200 && res.status <= 400){
                setState({
                    markdownFiles: res.data.markdownFiles,
                    databaseFiles: res.data.databaseFiles
                })
            }
        })

    }, [])

    function clickOnFile(file){
        getApi().get(`/api/get-file-content?path=${file.path}`, {
            responseType: "json"
        }).then(response=>{
            let json = JSON.stringify(response.data, undefined, 6)
            setFileContent({path: file.path, json: json})
        })
    }

    function fileUpdate(){
        let s = prompt("Are You Sure to Save File in Server")
        if(s !== null) {
            let text = contentRef.current.value
            if(text){
                try {
                    let a = JSON.parse(text)
                    if(typeof a !== "string"){ // this is json file
                        getApi().post(`/api/save-file-content`, {path: fileContent.path, data: a}).then(res=>{
                            console.log(res)
                            if(res.status === 201) {
                                setFileContent("")
                            }
                        })
                    }

                } catch (ex){
                    alert("Bad Format JSON FILE")
                }

            }

        }
    }


    function renderFileContent(){
        return (
            <div className="file_content">
                <pre>
                    <code>
                        <textarea className="editor" defaultValue={fileContent.json} ref={contentRef}>
                            {/*{fileContent.json}*/}
                        </textarea>
                    </code>
                </pre>
                <div>
                    <button onClick={fileUpdate} className="btn btn-primary mr-2">Save</button>
                    <button onClick={()=>setFileContent({path: "", json: ""})} className="btn btn-info">Discard</button>
                </div>
            </div>
        )
    }

    function renderTable(data){
        return (
            <table className="files_table">
                <thead>
                <tr>
                    <th>Edit</th>
                    <th>Name</th>
                    <th>Modify At</th>
                    <th>Size</th>
                    <th>Path</th>
                </tr>
                </thead>
                <tbody>

                { data && data.map(md=>(

                    <tr>
                        <td className="text-blue-700 my-1 cursor-pointer">
                            <div className="flex items-center">
                                <FontAwesomeIcon onClick={()=>clickOnFile(md)}  icon={faPen} />
                                <FontAwesomeIcon className="ml-2" onClick={()=>handleDeleteFile(md)} icon={faTrash} />
                            </div>
                        </td>

                        <td className="text-blue-700 my-1 px-1">
                            <span className="text-sm text-blue-700 my-2 cursor-pointer">{md.name}</span>
                        </td>
                        <td className="text-blue-700 my-1 px-4">
                                         <span className="text-xs whitespace-nowrap">
                                             {new Date(md.modifyTime).toDateString()}
                                             {" "} {new Date(md.modifyTime).toLocaleTimeString()}
                                            </span>
                        </td>
                        <td className="text-blue-700 my-1 px-4">
                            <span className="text-sm text-blue-700 my-2 cursor-pointer">{md.size}</span>
                        </td>
                        <td className="text-blue-700 my-1">
                            <span className="text-sm text-blue-700 my-2 cursor-pointer">{md.path}</span>
                        </td>

                    </tr>
                )) }

                </tbody>
            </table>
        )
    }

    function handleFileChange(e) {
        const {name, files} = e.target

        let formData = new FormData()

        formData.append(name, files[0])
        formData.append("dirType", name)

        getApi().post("/api/file-upload", formData).then(response=>{
            if(response.status === 201){
                console.log(response.data)
                alert("file upload success")
            }

        }).catch(ex=>{
            alert("file upload fail")
            console.log(ex.message)
        })
    }

    function handleDeleteFile(file) {
        if(file.dir === true){
            return alert("You can delete a Directory.")
        }
        getApi().delete(`/api/file-delete?path=${file.path}`).then(res=>{
            if(res.status === 201){
                alert(res.data.message)
            } else {
                alert("file delete fail")
            }
        }).catch(ex=>{
            alert(ex.message)
        })
    }



    return (
        <div className="container px-2">
            <h1 className="text-center mt-2">Server Database Files</h1>
            <button className="btn">
                <Link to="/admin/dashboard">Back to Dashboard</Link>
            </button>

            { fileContent && fileContent.path && renderFileContent() }

            <div className="flex flex-col justify-between">
                <div className="mt-4">
                    <div className="flex mb-1 items-center">
                        <h4>Markdown Files</h4>
                        <button
                            onClick={()=>markdownFileChooser.current && markdownFileChooser.current.click()}
                            className="ml-5">Upload a Markdown File</button>
                        <input onChange={handleFileChange} name="database" type="file" ref={databaseFileChooser}  hidden={true}/>
                        <input onChange={handleFileChange} name="markdown" type="file" ref={markdownFileChooser} hidden={true}/>
                    </div>
                    <div className="overflow-x-auto">
                        {renderTable(state.markdownFiles)}
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex mb-1 items-center">
                        <h4>Database Files</h4>
                        <button
                            onClick={()=>databaseFileChooser.current && databaseFileChooser.current.click()}
                            className="ml-5">Upload a Database File</button>
                    </div>
                    <div className="overflow-x-auto">
                        {renderTable(state.databaseFiles)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatabaseFiles;