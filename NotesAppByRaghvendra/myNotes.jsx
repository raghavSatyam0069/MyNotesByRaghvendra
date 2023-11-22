import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function MyNotes(props) {
  const { notes } = props;
  // console.log(notes);
  const [openArr, setOpenArr] = useState([]);

  const handleOpen = (index) => {
    // console.log(index);
    let openArr1 = [...openArr];
    let checkInd = openArr1.findIndex((k) => k.title === notes[index].title);
    // console.log(checkInd);
    if (checkInd > -1) {
      openArr1.splice(checkInd, 1);
    } else {
      openArr1.push(notes[index]);
    }
    // console.log(openArr1);
    setOpenArr(openArr1);
  };
  return (
    <div className="container">
      <Link to={`/note/Add/index`}>
        <button className="btn nbtn  btn-success text-white my-2">ADD+</button>
      </Link>
      <br />

      {notes.map((k, index) => {
        let check =
          openArr.findIndex((o1) => o1.title === k.title) > -1 ? true : false;
        // console.log(check);
        return (
          <div className="border p-4 my-2 rounded-4" key={index}>
            <div className="row">
              <div className="col-lg-10 col-sm-12">
                <h3 className="onHover" onClick={() => handleOpen(index)}>
                  <span className="title">Title -</span>
                  <span className="text-info title">{k.title}</span>
                  {check ? (
                    <i className="fa-solid fa-chevron-up"></i>
                  ) : (
                    <i className="fa-solid fa-chevron-down"></i>
                  )}
                </h3>
                {check ? (
                  <div className="desc">
                    <span className="deshead">Description-</span>
                    {k.description}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-2 col-sm-12">
                <Link to={`/note/Edit/${index}`}>
                  <button className="btn btn-info text-white mx-1 nbtn">
                    Edit
                  </button>
                </Link>
                <Link to={`/delNote/${index}`}>
                  <button className="btn btn-danger text-white nbtn">
                    Delete
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default MyNotes;
