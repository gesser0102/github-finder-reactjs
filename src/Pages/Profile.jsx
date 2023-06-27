import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import Loader from "../Components/Loader";
import RepoCard from "../Components/RepoCard";
import Fade from "react-reveal/Fade";
import { IoLocationSharp } from "react-icons/io5";
import { BiGitRepoForked } from "react-icons/bi";
import CountUp from "react-countup";

const Profile = () => {
  let { username } = useParams();

  const [data, setData] = useState([]);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const apiCall = setTimeout(() => {
      axios
        .get(`https://api.github.com/users/${username}`)
        .then((res) => setData(res.data));
      axios
        .get(`https://api.github.com/users/${username}/repos`)
        .then((res) => setRepos(res.data));
    }, 1500);
    return () => clearTimeout(apiCall);
  }, [username]);

  return (
    <>
      <div className="items-center flex flex-col mb-0 px-5 h-auto">
        {data.length !== 0 ? (
          <>
            <Fade>
              <div className="card lg:card-side bg-slate-800 flex mt-5 md:px-5 py-5 w-full md:w-5/12">
                <div className="avatar items-center pt-3 flex-col">
                  <div className="mb-3 border-4 border-white rounded-full w-40 h-40 ">
                    <img alt="avatar" src={data.avatar_url} />
                  </div>
                  <div className="card-actions pb-8 sm:pb-0">
                    <a target="blank" href={`${data.html_url}` } className="btn btn-outline ">
                      <BsGithub className="mr-2 text-lg" />
                      Ver GitHub
                    </a>
                  </div>
                </div>
                <div className="card-body gap-4 flex ml-5 sm:ml-0 justify-center items-center p-0 sm:p-5">
                  <h1 className="card-title text-3xl">{data.name}</h1>
                  <span className="text-sm">{data.login}</span>
                  {data.location &&  
                    <div className="location mt-3 flex items-center">
                      <IoLocationSharp />
                      <p className="ml-2 text-xl">{data.location}</p>
                    </div>}
                  <div className="bg-slate-800 py-5 stats">
                    <div className="stat bg-transparent ">
                      <div className="stat-figure text-white">
                        <BiGitRepoForked className={"text-3xl md:text-5xl"} />
                      </div>
                      <div className="stat-title pr-5">Repositórios</div>
                      <div className="stat-value pr-5 text-3xl md:text-4xl">
                        <CountUp duration={5} end={data.public_repos} />
                      </div>
                    </div>
                    <div className="stat bg-transparent">
                      <div className="stat-figure text-white">
                        <FaUsers className={"text-3xl md:text-5xl"} />
                      </div>
                      <div className="stat-title pr-5">Seguidores</div>
                      <div
                        className="stat-value pr-5 text-3xl md:text-4xl"
                        style={{ width: "100px", height: "50px" }}
                      >
                        <CountUp duration={5} end={data.followers} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
            <div className="grid w-12/12 h-2/5 mt-10">
              <h1 className="text-3xl text-center font-bold ">Repositórios:</h1>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5 mt-5">
                {repos.slice(0, 21).map((repo, i) => (
                  <Fade delay={i * 150} key={i}>
                    <RepoCard
                      key={repo.id}
                      name={repo.name}
                      htmlUrl={repo.html_url}
                      language={repo.language}
                    />
                  </Fade>
                ))}
              </div>
              {data.public_repos > 21 && (
                <a
                  href={`${data.html_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline mt-5 mb-5 w-full"
                >
                  Ver todos os repositórios
                </a>
              )}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Profile;
