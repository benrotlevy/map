import { useEffect, useState, useRef } from "react";

export const ReadCsv = ({ saveJsonToState }) => {
    const [selectedFile, setSelectedFile] = useState("");
    const fileInput = useRef();

    useEffect(() => {
        // console.log(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                changeToJson(reader.result);
            };
            reader.readAsText(selectedFile);
        }
    }, [selectedFile]);

    const changeToJson = (txt) => {
        // console.log(txt);
        let lines = txt.split("\n").filter((line) => line && line !== "\r");
        // console.log(lines);

        let result = [];

        let headers = lines[0].split(",");
        // console.log(headers);
        let longIndex, latIndex;
        headers.forEach((header, index) => {
            if (header === "Longitude") longIndex = index;
            if (header === "Latitude") latIndex = index;
        });
        for (let i = 1; i < lines.length; i++) {
            let obj = {};
            let currentline = lines[i].split(",");
            // console.log(currentline);

            obj.lng = currentline[longIndex];
            obj.lat = currentline[latIndex];

            result.push(obj);
        }

        // result.pop();

        let json = JSON.stringify(result);

        // json = json.replaceAll("\\r", "");
        // json = json.replaceAll('""', '"id"');

        console.log(json);

        // saveJsonToState(json);
    };

    // const handleFileSelect = (e) => {
    //     setSelectedFile(fileInput.current.files[0]);
    // };

    return (
        <div>
            <label htmlFor="file">Upload csv file:</label>
            <input
                type="file"
                id="file"
                name="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                ref={fileInput}
            />
        </div>
    );
};
