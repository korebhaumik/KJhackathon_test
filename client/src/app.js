import { React, useState, useEffect, useCallback } from "react";
import "./style.css";
const App = () => {
  const [data, setData] = useState({});
  const [num, setNum] = useState("");
  const [output, setOutput] = useState("");
  const [uploadInput, setUploadInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/value");
      const value = await response.json();
      setData(value);
    };
    fetchData();
  }, []);
  // console.log(data);

  let handleFileSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", uploadInput);

    try {
      let res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        mode: "no-cors",
        body: data,
      });

      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200 || 201) {
        console.log("Image uploaded successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(
    //   JSON.stringify({
    //     number: num,
    //   })
    // );
    try {
      let res = await fetch("http://localhost:5000/add_number", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: num,
        }),
      });

      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200 || 201) {
        setNum("");
        setOutput(resJson);
        console.log("Number updated successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div>hello</div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            value={num}
            name="nv"
            placeholder="Enter a number"
            onChange={(e) => setNum(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>

        <div>
          {typeof output.numbers === "undefined" ? (
            <p></p>
          ) : (
            <h1>{output.numbers}</h1>
          )}
        </div>
        <form onSubmit={handleFileSubmit}>
          <input
            type="file"
            onChange={(e) => {
              setUploadInput(e.target.files[0]);
            }}
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    </>
  );
};

export default App;
