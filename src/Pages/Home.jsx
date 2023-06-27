import { useState } from "react";
import { Link } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Loader from "../Components/Loader";
import { FaSearch } from "react-icons/fa";
import React from "react";
import { toast } from "react-toastify";
import Flip from "react-reveal/Flip";

import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

const Home = () => {
  const [input, setInput] = useState([]);
  const [User, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState([]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      axios
        .get(`https://api.github.com/search/users?q=${input}`)
        .then((res) => {
          if (res.data.items.length === 0) {
            toast.error("Usuario não encontrado!!!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else {
            setUser(res.data.items);
            setTotalItemCount(res.data);
          }
        });
      setLoading(false);
    }, 1200);
  };
  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    axios
      .get(`https://api.github.com/search/users?q=${input}&page=${currentPage}`)
      .then((res) => setUser(res.data.items));
  };

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="gap-2 flex-col mt-5 flex justify-center items-center">
          <div className="w-32 h-32">
            <img src="./img/github.png" alt="" />
          </div>
          <h1 h1 className="text-4xl text-center">
            GitHub Profile Finder
          </h1>
        </div>

        <form form className="form-control my-5">
          <div className="flex justify-center space-x-3 ">
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setUser([]);
              }}
              type="search"
              placeholder="Insira um usuário"
              className="w-4/6  input input-primary bg-slate-800 input-bordered  lg:w-2/6"
              required
            />
            <button onClick={onSubmitHandler} className="btn btn-primary">
              <FaSearch className="text-lg" />
            </button>
          </div>
        </form>

        <div className="pagination text-center mr-0 sm:mr-12">
          {User.length ? (
            <ReactPaginate
              className={"p-5"}
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={
                totalItemCount.total_count
                  ? totalItemCount.total_count > 999
                    ? 32
                    : Math.ceil(totalItemCount.total_count / 30)
                  : 0
              }
              marginPagesDisplayed={3}
              pageRangeDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName={"btn-group flex justify-center p-5"}
              pageClassName={"btn"}
              pageLinkClassName={"page-link"}
              previousClassName={"btn bg-slate-800"}
              previousLinkClassName={"page-link"}
              nextClassName={"btn bg-slate-800"}
              nextLinkClassName={"page-link"}
              breakClassName={"btn bg-slate-800"}
              breakLinkClassName={"page-link"}
              activeClassName={"btn-active"}
            />
          ) : (
            ""
          )}
        </div>

        <div className="flex w-5/6 flex-wrap mx-auto ">
          {loading ? (
            <Loader />
          ) : (
            User.map((user, i) => {
              return (
                <div key={i} className="mx-auto mb-5">
                  <Flip left delay={i * 100} key={i}>
                    <div className="card card-bordered shadow-2xl bg-slate-800 flex pt-5  border-2 border-white transition hover:bg-indigo-600 w-72">
                      <div className="avatar flex items-center justify-center">
                        <div className="rounded-full border-4 border-white w-28 h-28 ">
                          <img alt="avatar" src={user.avatar_url} />
                        </div>
                      </div>

                      <div className="card-body flex items-center">
                        <h1 className="card-title text-2xl">{user.login}</h1>
                        <div>
                          <Link
                            to={`/${user.login}`}
                            className="btn btn-outline"
                          >
                            <BsGithub className="mr-2 text-lg" />
                            Ver Detalhes
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Flip>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
