import { useState, useEffect } from "react";

const UseFetch = (url, type, bodyData) => {
    const [data, setData] = useState(null);
    console.log(url, type, bodyData);


    const postData = () => {
        console.log("post data");
        fetch(url, requestOptions)
            .then((res) => res.json())
            .then((data) => setData(data), console.log(data))
            .catch(err => console.log(err));

        // return 
    }
    // useEffect(() => {
    console.log("hello");
    if (type === "POST") {
        postData();
    } else {
        fetch(url).
            then(res => res.json()).then(data => setData(data)).catch(err => console.log(err));
    }
    // }
    // , [url]);

    return "hi";
};

export default UseFetch;