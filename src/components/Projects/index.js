import React, { useEffect, useState } from "react";

const fetchProjects = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/api/projects`);
    if (!res.ok) throw new Error("Network error");
    return await res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
};

const Projects = () => {
  const [toggle, setToggle] = useState("all");
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchProjects();
      setProjectList(data);
    })();
  }, []);

  return (
    <>
      <style>{`
        /* ================= FILTER BUTTONS ================= */
        .filter-bar{
          display:flex;
          justify-content:flex-start;
          margin-bottom:20px;
        }

        .filter-btn{
          border:2px solid #c15b12ff;
          background:transparent;
          color:#fff;
          padding:8px 16px;
          font-size:13px;
          cursor:pointer;
        }

        .filter-btn:first-child{border-radius:6px 0 0 6px;}
        .filter-btn:last-child{border-radius:0 6px 6px 0;}

        .filter-btn.active{
          background:#c15b12ff;
          color:#fff;
        }

        /* ================= RESPONSIVE MARGINS ================= */
        /* 💻 Laptop + Desktop */
        .abc{
          margin-left:60px;
          margin-right:60px;
        }

        /* 📱 Phone */
        @media (max-width:575px){
          .abc{
            margin-left:20px;
            margin-right:20px;
          }
        }

        /* 📱 Tablet */
        @media (min-width:576px) and (max-width:991px){
          .abc{
            margin-left:40px;
            margin-right:40px;
          }
        }

        /* ================= GRID ================= */
        .project-grid{
          display:grid;
          gap:14px;
          width:100%;
        }

        @media (max-width:575px){
          .project-grid{
            grid-template-columns:repeat(2, minmax(150px,1fr));
          }
        }

        @media (min-width:576px) and (max-width:991px){
          .project-grid{
            grid-template-columns:repeat(3,1fr);
          }
        }

        @media (min-width:992px){
          .project-grid{
            grid-template-columns:repeat(3,1fr);
            gap:50px;
          }
        }

        /* ================= PROJECT CARD ================= */
        .project-card{
          background:#0f0f1a;
          border-radius:16px;
          padding:10px;
          margin-top:30px;
          border:1px solid rgb(146, 92, 240);
          height:100%;
          display:flex;
          flex-direction:column;
          align-items:center;
          transition:0.3s ease;
        }

        .project-card:hover{
          transform:scale(1.02);
          box-shadow:rgba(23, 92, 230, 0.25) 0px 12px 30px;
        }

        /* IMAGE */
        .image-box{
          position:relative;
          width:100%;
        }

        .image-box img{
          width:100%;
          height:170px;
          object-fit:cover;
          border-radius:12px;
        }

        /* HOVER OVERLAY */
        .image-overlay{
          position:absolute;
          inset:0;
          background:rgba(0,0,0,0.65);
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:10px;
          opacity:0;
          transition:.3s;
          border-radius:12px;
        }

        .image-box:hover .image-overlay{
          opacity:1;
        }

        .overlay-btn{
          background:#c15b12ff;
          color:#fff;
          padding:6px 14px;
          border-radius:20px;
          font-size:12px;
          text-decoration:none;
        }

        /* TAGS */
        .project-tags{
          display:flex;
          flex-wrap:wrap;
          gap:5px;
          justify-content:center;
          margin:6px 0;
        }

        .tag{
          font-size:11px;
          padding:4px 8px;
          border-radius:12px;
          background:#2c1d42;
          color:#c9a6ff;
        }

        /* TEXT */
        .project-card h3{
          font-size:15px;
          margin:6px 0 2px;
          text-align:center;
          color:#fff;
          width:100%;
        }

        .project-card p{
          font-size:12.5px;
          line-height:1.4;
          text-align:center;
          color:#aaa;
        }

        /* PHONE + TABLET */
        @media (max-width:991px){
          .project-card{
            padding:2px;
          }

          .image-box img{
            height:100px;
          }

          .project-tags{
            gap:2px;
          }
        }

        @media (max-width:575px){
          .filter-btn{
            padding:4px !important;
          }

          .project-card h3{
            text-align:left;
            padding-left:10px;
          }
        }

        /* DESKTOP */
        @media (min-width:992px){
          .project-card{
            align-items:flex-start;
          }

          .project-card h3,
          .project-card p{
            text-align:left;
          }

          .project-tags{
            justify-content:flex-start;
          }
        }
      `}</style>

      <section id="projects" className="py-5">
        <div className="abc">
          <h2 className="fw-bold text-light">Projects</h2>
          <p className="text-secondary mb-4">
            I have worked on web apps, android apps and UI/UX projects.
          </p>

          <div className="filter-bar">
            {["all","web app","android app","UI/UX Designer"].map(item => (
              <button
                key={item}
                className={`filter-btn ${toggle===item ? "active":""}`}
                onClick={() => setToggle(item)}
              >
                {item==="all"
                  ? "All"
                  : item==="web app"
                  ? "Web Apps"
                  : item==="android app"
                  ? "Android Apps"
                  : "UI/UX Designer"}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {(toggle==="all"
              ? projectList
              : projectList.filter(p => p.category===toggle)
            ).map(project => (
              <div className="project-card" key={project.id}>
                <div className="image-box">
                  <img src={project.image} alt={project.title} />
                  <div className="image-overlay">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="overlay-btn">
                        View Code
                      </a>
                    )}
                    {(project.demo || project.webapp) && (
                      <a href={project.demo || project.webapp} target="_blank" rel="noreferrer" className="overlay-btn">
                        View Web Page
                      </a>
                    )}
                  </div>
                </div>

                <div className="project-tags">
                  {project.tags?.map((tag,i)=>(
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>

                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
