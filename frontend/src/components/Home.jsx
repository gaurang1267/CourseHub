import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Link } from "react-router-dom";
import "./Home.css";

const HomePage = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);
  return (
    <>
      <div className="context">
        <h1>Welcome to CourseHub</h1>
        <span>Start your learning journey with us!</span>
        <span>Browse through all our courses by clicking the button below</span>

        <Link to="/courses">
          <a href="" className="context__link">
            View Courses
          </a>
        </Link>
      </div>

      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 60,
          particles: {
            move: {
              bounce: false,
              direction: "none",
              enable: true,
              outModes: "out",
              random: false,
              speed: 0.5,
              straight: false,
            },
            number: { density: { enable: true, area: 1000 }, value: 100 },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          themes: [
            {
              name: "light",
              default: {
                value: true,
                mode: "light",
              },
              options: {
                background: {
                  color: "#fff",
                },
                particles: {
                  color: {
                    value: "#0d47a1",
                  },
                },
              },
            },
            {
              name: "dark",
              default: {
                value: true,
                mode: "dark",
              },
              options: {
                background: {
                  color: "#0d47a1",
                },
                particles: {
                  color: {
                    value: "#fff",
                  },
                },
              },
            },
          ],
        }}
      />
    </>
  );
};

export default HomePage;
