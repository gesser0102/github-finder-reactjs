import { HiOutlineExternalLink } from "react-icons/hi";
const RepoCard = ({ name, htmlUrl, language, description }) => {
  return (
    <>
      <div
        className={
          "mb-2 rounded-md card bg-gray-800 transition hover:bg-gray-900 h-36"
        }
      >
        <div className="card-body inline">
          <h3 className="mb-4 text-xl font-semibold hover:text-gray-400">
            <a href={htmlUrl} target={"_blank"} rel={"noreferrer"}>
              <HiOutlineExternalLink className={"inline mr-1"} />
              {name}
            </a>
          </h3>
          <p className="mb-3">{description}</p>
          <div
            className={`mr-2 badge ${
              language === "JavaScript"
                ? "badge-primary"
                : language === "CSS"
                ? "badge-secondary"
                : language === "HTML"
                ? "badge-success"
                : language === "CSS"
                ? "badge-ghost"
                : language === "Python"
                ? "badge-warning"
                : language === "Java"
                ? "badge-error"
                : "badge-info"
            } badge-lg`}
          >
            {language}
          </div>
        </div>
      </div>
    </>
  );
};

export default RepoCard;
