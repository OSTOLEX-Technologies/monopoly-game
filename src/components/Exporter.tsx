import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";
import {useThree} from "@react-three/fiber";
import {useEffect} from "react";

function download(content: string, fileName: string, contentType: string) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

export function Exporter() {
    const {scene} = useThree()
    const exporter = new GLTFExporter();

    useEffect(() =>{
        exporter.parse( scene, function ( gltf ) {
            const decoder = new TextDecoder();
            download(decoder.decode(gltf as ArrayBuffer), "scene.json", "text/plain" );
            // gltf to string
            // console.log(decoder.decode(gltf as ArrayBuffer));
        },
            (error) => console.error(error),
        {
            binary: true,
            maxTextureSize: 4096,
            includeCustomExtensions: true
        }
        ); // you will have to provide the options here
    })

    return (<></>)
}